// ============================================================
// VPNGate OpenVPN 节点浏览器 + Mihomo 配置转换 - Cloudflare Worker
// ============================================================
//
// 功能:
// 1. 服务端拉取 https://www.vpngate.net/api/iphone/ 的 CSV 节点列表并解析为 JSON
// 2. 提供网页界面浏览节点、预览/复制/下载 OpenVPN 原始配置
// 3. 将 OpenVPN 配置转换为 Mihomo (Clash Meta) 的 openvpn 代理配置段,预览/复制/下载
//
// 部署方式见同目录 README.md

const VPNGATE_API_URL = 'https://www.vpngate.net/api/iphone/';
const CACHE_TTL_SECONDS = 300; // 边缘缓存 5 分钟,避免每次访问都请求 vpngate.net

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/servers') {
      return handleServersApi(request, ctx);
    }

    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(HTML_PAGE, {
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-cache',
        },
      });
    }

    return new Response('Not Found', { status: 404 });
  },
};

async function handleServersApi(request, ctx) {
  const url = new URL(request.url);
  const forceRefresh = url.searchParams.get('refresh') === '1';

  const hasCacheApi = typeof caches !== 'undefined' && caches.default;
  const cacheKey = hasCacheApi ? new Request('https://vpngate-cache.internal/servers', request) : null;

  if (hasCacheApi && !forceRefresh) {
    const cached = await caches.default.match(cacheKey);
    if (cached) return cached;
  }

  let upstream;
  try {
    upstream = await fetch(VPNGATE_API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VPNGateBrowserWorker/1.0)',
        Accept: 'text/plain,*/*',
      },
    });
  } catch (err) {
    return jsonResponse(
      { error: true, message: '连接 vpngate.net 失败: ' + (err && err.message ? err.message : String(err)) },
      502
    );
  }

  if (!upstream.ok) {
    return jsonResponse({ error: true, message: 'vpngate.net 返回状态码 ' + upstream.status }, 502);
  }

  const text = await upstream.text();
  let servers;
  try {
    servers = parseVpnGateCsv(text);
  } catch (err) {
    return jsonResponse(
      { error: true, message: '解析 CSV 数据失败: ' + (err && err.message ? err.message : String(err)) },
      502
    );
  }

  if (servers.length === 0) {
    return jsonResponse(
      { error: true, message: 'vpngate.net 未返回任何有效节点数据(接口可能暂时无数据或格式发生变化)' },
      502
    );
  }

  const payload = {
    error: false,
    updatedAt: new Date().toISOString(),
    count: servers.length,
    servers,
  };

  const response = jsonResponse(payload, 200, CACHE_TTL_SECONDS);

  if (hasCacheApi) {
    ctx.waitUntil(caches.default.put(cacheKey, response.clone()));
  }

  return response;
}

function jsonResponse(obj, status, cacheSeconds) {
  const headers = {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': '*',
  };
  headers['cache-control'] = cacheSeconds ? 'public, max-age=' + cacheSeconds : 'no-store';
  return new Response(JSON.stringify(obj), { status: status || 200, headers });
}

// VPNGate CSV 格式说明 (https://www.vpngate.net/api/iphone/):
//   第 1 行: *vpn_servers
//   第 2 行: #HostName,IP,Score,Ping,Speed,CountryLong,CountryShort,NumVpnSessions,
//            Uptime,TotalUsers,TotalTraffic,LogType,Operator,Message,OpenVPN_ConfigData_Base64
//   其后每行一个节点,最后以 */ 结尾
// Operator / Message 是自由文本字段,偶尔可能包含逗号,因此:
//   - 前 13 个字段(HostName..Operator)按固定位置切分
//   - 最后一个字段固定为 Base64 配置数据(不含逗号)
//   - 两者之间剩余的部分一律合并还原为 Message
function parseVpnGateCsv(text) {
  const lines = text.split(/\r?\n/);
  const servers = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.charAt(0) === '*') continue; // *vpn_servers 或 */
    if (line.charAt(0) === '#') continue; // 表头注释行

    const parts = rawLine.split(',');
    if (parts.length < 15) continue; // 字段不足,跳过异常行

    const hostName = parts[0];
    const ip = parts[1];
    const score = parts[2];
    const ping = parts[3];
    const speed = parts[4];
    const countryLong = parts[5];
    const countryShort = parts[6];
    const numSessions = parts[7];
    const uptime = parts[8];
    const totalUsers = parts[9];
    const totalTraffic = parts[10];
    const logType = parts[11];
    const operator = parts[12];
    const configDataBase64 = parts[parts.length - 1].trim();
    const message = parts.slice(13, parts.length - 1).join(',');

    if (!ip || !configDataBase64) continue;

    servers.push({
      hostName,
      ip,
      score: Number(score) || 0,
      ping: Number(ping) || 0,
      speed: Number(speed) || 0,
      countryLong,
      countryShort,
      numSessions: Number(numSessions) || 0,
      uptime: Number(uptime) || 0,
      totalUsers: Number(totalUsers) || 0,
      totalTraffic: Number(totalTraffic) || 0,
      logType,
      operator,
      message,
      configDataBase64,
    });
  }

  return servers;
}
