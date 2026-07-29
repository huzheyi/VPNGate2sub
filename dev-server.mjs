import { webcrypto } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(projectDir, '.local-data');
const kvFile = path.join(dataDir, 'subscriptions-kv.json');
const port = Number(process.env.PORT) || 8787;
const useMockData = process.env.VPNGATE_MOCK === '1';

if (!globalThis.crypto) globalThis.crypto = webcrypto;

class LocalKv {
  constructor(file, values) {
    this.file = file;
    this.values = values;
    this.writeQueue = Promise.resolve();
  }

  static async open(file) {
    let values = {};
    try {
      values = JSON.parse(await fs.readFile(file, 'utf8'));
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
    return new LocalKv(file, values && typeof values === 'object' ? values : {});
  }

  async get(key, type) {
    if (!Object.prototype.hasOwnProperty.call(this.values, key)) return null;
    const value = this.values[key];
    return type === 'json' ? JSON.parse(value) : value;
  }

  async put(key, value) {
    this.values[key] = String(value);
    await this.persist();
  }

  async delete(key) {
    delete this.values[key];
    await this.persist();
  }

  persist() {
    this.writeQueue = this.writeQueue.then(async () => {
      await fs.mkdir(path.dirname(this.file), { recursive: true });
      const temporaryFile = this.file + '.tmp';
      await fs.writeFile(temporaryFile, JSON.stringify(this.values, null, 2), 'utf8');
      await fs.rename(temporaryFile, this.file);
    });
    return this.writeQueue;
  }
}

function mockOvpn(ip, proto) {
  return Buffer.from([
    'client',
    'dev tun',
    'proto ' + proto,
    'remote ' + ip + ' 1194',
    'cipher AES-256-CBC',
    'auth SHA256',
    '<ca>',
    'LOCAL-TEST-CA',
    '</ca>',
    '<cert>',
    'LOCAL-TEST-CERT',
    '</cert>',
    '<key>',
    'LOCAL-TEST-KEY',
    '</key>',
  ].join('\n')).toString('base64');
}

function buildMockCsv() {
  return [
    '*vpn_servers',
    '#HostName,IP,Score,Ping,Speed,CountryLong,CountryShort,NumVpnSessions,Uptime,TotalUsers,TotalTraffic,LogType,Operator,Message,OpenVPN_ConfigData_Base64',
    [
      'local-vpn-jp', '203.0.113.10', '1000', '32', '420000000', 'Japan', 'JP',
      '12', '7200000', '300', '9000000000', '2weeks', 'Local Test',
      '本地模拟 UDP 节点', mockOvpn('203.0.113.10', 'udp'),
    ].join(','),
    [
      'local-vpn-kr', '198.51.100.20', '800', '88', '210000000', 'Korea Republic of', 'KR',
      '6', '3600000', '150', '4000000000', '2weeks', 'Local Test',
      '本地模拟 TCP 节点', mockOvpn('198.51.100.20', 'tcp'),
    ].join(','),
    '*/',
  ].join('\n');
}

execFileSync(process.execPath, ['build.js'], {
  cwd: projectDir,
  stdio: 'inherit',
});

const workerSource = await fs.readFile(path.join(projectDir, 'worker.js'), 'utf8');
const workerUrl = 'data:text/javascript;base64,' + Buffer.from(workerSource).toString('base64');
const worker = (await import(workerUrl)).default;
const subscriptions = await LocalKv.open(kvFile);
const nativeFetch = globalThis.fetch;

if (useMockData) {
  globalThis.fetch = async (input, init) => {
    const url = typeof input === 'string' ? input : input.url;
    if (url === 'https://www.vpngate.net/api/iphone/') {
      return new Response(buildMockCsv(), {
        status: 200,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      });
    }
    return nativeFetch(input, init);
  };
}

const env = {
  SUBSCRIPTIONS: subscriptions,
  ADMIN_TOKEN: process.env.ADMIN_TOKEN || '',
};

const server = http.createServer(async (incoming, outgoing) => {
  try {
    const bodyChunks = [];
    for await (const chunk of incoming) bodyChunks.push(chunk);
    const body = bodyChunks.length ? Buffer.concat(bodyChunks) : undefined;
    const request = new Request(
      'http://' + (incoming.headers.host || '127.0.0.1:' + port) + incoming.url,
      {
        method: incoming.method,
        headers: incoming.headers,
        body: incoming.method === 'GET' || incoming.method === 'HEAD' ? undefined : body,
      }
    );
    const response = await worker.fetch(request, env, { waitUntil() {} });
    outgoing.writeHead(response.status, Object.fromEntries(response.headers.entries()));
    outgoing.end(Buffer.from(await response.arrayBuffer()));
  } catch (err) {
    console.error(err);
    outgoing.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    outgoing.end('Local server error: ' + (err && err.message ? err.message : String(err)));
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log('');
  console.log('VPNGate2sub 本地开发服务器已启动');
  console.log('页面地址: http://127.0.0.1:' + port);
  console.log('节点数据: ' + (useMockData ? '本地模拟数据' : '实时 VPNGate API'));
  console.log('收藏夹数据: ' + kvFile);
  console.log('按 Ctrl+C 停止');
});
