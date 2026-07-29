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
const FAVORITES_INDEX_KEY = 'favorites:index:v1';
const FAVORITE_KEY_PREFIX = 'favorites:item:';
const FAVORITE_SLUG_PREFIX = 'favorites:slug:';
const MAX_FAVORITE_NODES = 500;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathParts = url.pathname.split('/').filter(Boolean);

    if (url.pathname === '/api/auth/verify') {
      const denied = requireAdmin(request, env);
      if (denied) return denied;
      return jsonResponse({
        error: false,
        protected: Boolean(getAdminToken(env)),
      });
    }

    if (url.pathname === '/api/servers') {
      const denied = requireAdmin(request, env);
      if (denied) return denied;
      return handleServersApi(request, ctx);
    }

    if (url.pathname === '/api/favorites' || url.pathname.startsWith('/api/favorites/')) {
      return handleFavoritesApi(request, env);
    }

    if (pathParts.length === 2 && pathParts[0] === 'sub') {
      return handleSubscription(request, env, '', pathParts[1]);
    }

    if (pathParts.length === 3 && pathParts[1] === 'sub') {
      return handleSubscription(request, env, pathParts[0], pathParts[2]);
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

async function handleFavoritesApi(request, env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'access-control-allow-headers': 'content-type,authorization,x-admin-token',
      },
    });
  }

  const denied = requireAdmin(request, env);
  if (denied) return denied;

  if (!env || !env.SUBSCRIPTIONS) {
    return jsonResponse(
      {
        error: true,
        code: 'KV_NOT_CONFIGURED',
        message: '收藏夹存储尚未配置,请先为 Worker 绑定名为 SUBSCRIPTIONS 的 Cloudflare KV 命名空间',
      },
      503
    );
  }

  const url = new URL(request.url);
  const parts = url.pathname.split('/').filter(Boolean);
  const favoriteId = parts[2] || '';
  const childResource = parts[3] || '';

  try {
    if (request.method === 'GET' && !favoriteId) {
      const favorites = await listFavorites(env.SUBSCRIPTIONS);
      return jsonResponse({
        error: false,
        favorites: favorites.map(toFavoriteSummary),
      });
    }

    if (request.method === 'GET' && favoriteId && !childResource) {
      const favorite = await getFavoriteById(env.SUBSCRIPTIONS, favoriteId);
      if (!favorite) return jsonResponse({ error: true, message: '收藏夹不存在' }, 404);
      return jsonResponse({ error: false, favorite: toFavoriteSummary(favorite) });
    }

    if (request.method === 'POST' && !favoriteId) {
      const body = await readJsonBody(request);
      const name = validateFavoriteName(body.name);
      const slug = validateFavoriteSlug(body.slug);
      const existingId = await env.SUBSCRIPTIONS.get(FAVORITE_SLUG_PREFIX + slug);
      if (existingId) {
        return jsonResponse({ error: true, message: '订阅地址后缀已被使用,请换一个' }, 409);
      }

      const now = new Date().toISOString();
      const favorite = {
        id: crypto.randomUUID(),
        name,
        slug,
        createdAt: now,
        updatedAt: now,
        nodes: [],
      };
      const ids = await getFavoriteIds(env.SUBSCRIPTIONS);
      ids.push(favorite.id);
      await Promise.all([
        env.SUBSCRIPTIONS.put(FAVORITE_KEY_PREFIX + favorite.id, JSON.stringify(favorite)),
        env.SUBSCRIPTIONS.put(FAVORITE_SLUG_PREFIX + slug, favorite.id),
        env.SUBSCRIPTIONS.put(FAVORITES_INDEX_KEY, JSON.stringify(ids)),
      ]);
      return jsonResponse({ error: false, favorite: toFavoriteSummary(favorite) }, 201);
    }

    if (request.method === 'PUT' && favoriteId && !childResource) {
      const favorite = await getFavoriteById(env.SUBSCRIPTIONS, favoriteId);
      if (!favorite) return jsonResponse({ error: true, message: '收藏夹不存在' }, 404);
      const body = await readJsonBody(request);
      const nextName = validateFavoriteName(body.name);
      const nextSlug = validateFavoriteSlug(body.slug);

      if (nextSlug !== favorite.slug) {
        const existingId = await env.SUBSCRIPTIONS.get(FAVORITE_SLUG_PREFIX + nextSlug);
        if (existingId && existingId !== favorite.id) {
          return jsonResponse({ error: true, message: '订阅地址后缀已被使用,请换一个' }, 409);
        }
      }

      const oldSlug = favorite.slug;
      favorite.name = nextName;
      favorite.slug = nextSlug;
      favorite.updatedAt = new Date().toISOString();
      const writes = [
        env.SUBSCRIPTIONS.put(FAVORITE_KEY_PREFIX + favorite.id, JSON.stringify(favorite)),
        env.SUBSCRIPTIONS.put(FAVORITE_SLUG_PREFIX + nextSlug, favorite.id),
      ];
      if (oldSlug !== nextSlug) writes.push(env.SUBSCRIPTIONS.delete(FAVORITE_SLUG_PREFIX + oldSlug));
      await Promise.all(writes);
      return jsonResponse({ error: false, favorite: toFavoriteSummary(favorite) });
    }

    if (request.method === 'DELETE' && favoriteId && !childResource) {
      const favorite = await getFavoriteById(env.SUBSCRIPTIONS, favoriteId);
      if (!favorite) return jsonResponse({ error: true, message: '收藏夹不存在' }, 404);
      const ids = (await getFavoriteIds(env.SUBSCRIPTIONS)).filter((id) => id !== favorite.id);
      await Promise.all([
        env.SUBSCRIPTIONS.delete(FAVORITE_KEY_PREFIX + favorite.id),
        env.SUBSCRIPTIONS.delete(FAVORITE_SLUG_PREFIX + favorite.slug),
        env.SUBSCRIPTIONS.put(FAVORITES_INDEX_KEY, JSON.stringify(ids)),
      ]);
      return jsonResponse({ error: false });
    }

    if (request.method === 'POST' && favoriteId && childResource === 'nodes') {
      const favorite = await getFavoriteById(env.SUBSCRIPTIONS, favoriteId);
      if (!favorite) return jsonResponse({ error: true, message: '收藏夹不存在' }, 404);
      const body = await readJsonBody(request);
      if (!Array.isArray(body.servers) || body.servers.length === 0) {
        return jsonResponse({ error: true, message: '请至少提供一个节点' }, 400);
      }

      const incoming = body.servers.map(sanitizeServerSnapshot);
      const byKey = new Map((favorite.nodes || []).map((node) => [serverKey(node), node]));
      incoming.forEach((node) => byKey.set(serverKey(node), node));
      if (byKey.size > MAX_FAVORITE_NODES) {
        return jsonResponse(
          { error: true, message: '单个收藏夹最多可保存 ' + MAX_FAVORITE_NODES + ' 个节点' },
          400
        );
      }
      favorite.nodes = Array.from(byKey.values());
      favorite.updatedAt = new Date().toISOString();
      await env.SUBSCRIPTIONS.put(FAVORITE_KEY_PREFIX + favorite.id, JSON.stringify(favorite));
      return jsonResponse({
        error: false,
        favorite: toFavoriteSummary(favorite),
        added: incoming.length,
      });
    }

    if (request.method === 'DELETE' && favoriteId && childResource === 'nodes') {
      const favorite = await getFavoriteById(env.SUBSCRIPTIONS, favoriteId);
      if (!favorite) return jsonResponse({ error: true, message: '收藏夹不存在' }, 404);
      const body = await readJsonBody(request);
      const keys = new Set(Array.isArray(body.keys) ? body.keys.map(String) : []);
      if (keys.size === 0) return jsonResponse({ error: true, message: '请提供要移除的节点' }, 400);
      const before = (favorite.nodes || []).length;
      favorite.nodes = (favorite.nodes || []).filter((node) => !keys.has(serverKey(node)));
      favorite.updatedAt = new Date().toISOString();
      await env.SUBSCRIPTIONS.put(FAVORITE_KEY_PREFIX + favorite.id, JSON.stringify(favorite));
      return jsonResponse({
        error: false,
        favorite: toFavoriteSummary(favorite),
        removed: before - favorite.nodes.length,
      });
    }

    return jsonResponse({ error: true, message: '不支持的收藏夹操作' }, 405);
  } catch (err) {
    const status = err && err.status ? err.status : 500;
    return jsonResponse(
      { error: true, message: err && err.message ? err.message : '收藏夹操作失败' },
      status
    );
  }
}

async function handleSubscription(request, env, pathToken, rawSlug) {
  if (request.method !== 'GET') return new Response('Method Not Allowed', { status: 405 });
  if (!env || !env.SUBSCRIPTIONS) {
    return new Response('SUBSCRIPTIONS KV is not configured', { status: 503 });
  }

  const expected = getAdminToken(env);
  let supplied = '';
  let slug;
  try {
    supplied = decodeURIComponent(pathToken || '');
    slug = validateFavoriteSlug(decodeURIComponent(rawSlug || ''));
  } catch (err) {
    return new Response('Invalid subscription path', { status: 400 });
  }
  if (expected && !constantTimeEqual(supplied, expected)) {
    return new Response('Unauthorized subscription path', {
      status: 401,
      headers: { 'cache-control': 'no-store' },
    });
  }

  const favoriteId = await env.SUBSCRIPTIONS.get(FAVORITE_SLUG_PREFIX + slug);
  if (!favoriteId) return new Response('Subscription not found', { status: 404 });
  const favorite = await getFavoriteById(env.SUBSCRIPTIONS, favoriteId);
  if (!favorite) return new Response('Subscription not found', { status: 404 });

  const segments = [];
  for (const server of favorite.nodes || []) {
    try {
      const raw = decodeBase64Utf8(server.configDataBase64);
      segments.push(buildServerMihomoSegment(server, parseServerOvpnConfig(raw)));
    } catch (err) {
      // 单个节点损坏时跳过,避免整个订阅地址不可用。
    }
  }
  const yaml = 'proxies:\n' + segments.map((segment) => indentYaml(segment, 2)).join('\n') + '\n';
  return new Response(yaml, {
    status: 200,
    headers: {
      'content-type': 'text/yaml; charset=utf-8',
      'content-disposition': 'inline; filename="' + slug + '.yaml"',
      'cache-control': 'no-store',
      'access-control-allow-origin': '*',
      'profile-title': encodeURIComponent(favorite.name),
    },
  });
}

function requireAdmin(request, env) {
  const expected = getAdminToken(env);
  if (!expected) return null;
  const authorization = request.headers.get('authorization') || '';
  const supplied = authorization.startsWith('Bearer ')
    ? authorization.slice(7).trim()
    : (request.headers.get('x-admin-token') || '').trim();
  if (constantTimeEqual(supplied, expected)) return null;
  return jsonResponse(
    { error: true, code: 'UNAUTHORIZED', message: '访问密码不正确或尚未输入' },
    401
  );
}

function getAdminToken(env) {
  return env && typeof env.ADMIN_TOKEN === 'string' ? env.ADMIN_TOKEN.trim() : '';
}

function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function readJsonBody(request) {
  let body;
  try {
    body = await request.json();
  } catch (err) {
    const parseError = new Error('请求内容必须是有效的 JSON');
    parseError.status = 400;
    throw parseError;
  }
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    const typeError = new Error('请求内容格式不正确');
    typeError.status = 400;
    throw typeError;
  }
  return body;
}

function validateFavoriteName(value) {
  const name = String(value || '').trim();
  if (!name || name.length > 60) {
    const err = new Error('收藏夹名称长度必须为 1-60 个字符');
    err.status = 400;
    throw err;
  }
  return name;
}

function validateFavoriteSlug(value) {
  const slug = String(value || '').trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9_-]{0,63}$/.test(slug)) {
    const err = new Error('订阅地址后缀须为 1-64 位小写字母、数字、短横线或下划线,且必须以字母或数字开头');
    err.status = 400;
    throw err;
  }
  return slug;
}

function sanitizeServerSnapshot(server) {
  if (!server || typeof server !== 'object') {
    const err = new Error('节点数据格式不正确');
    err.status = 400;
    throw err;
  }
  const configDataBase64 = String(server.configDataBase64 || '').replace(/\s+/g, '');
  if (!configDataBase64 || configDataBase64.length > 200000) {
    const err = new Error('节点 OpenVPN 配置为空或过大');
    err.status = 400;
    throw err;
  }
  try {
    decodeBase64Utf8(configDataBase64);
  } catch (err) {
    const invalid = new Error('节点 OpenVPN 配置不是有效的 Base64 数据');
    invalid.status = 400;
    throw invalid;
  }
  return {
    hostName: String(server.hostName || '').slice(0, 255),
    ip: String(server.ip || '').slice(0, 64),
    countryLong: String(server.countryLong || '').slice(0, 120),
    countryShort: String(server.countryShort || '').slice(0, 8),
    configDataBase64,
  };
}

function serverKey(server) {
  return String(server.hostName || '') + '|' + String(server.ip || '');
}

async function getFavoriteIds(kv) {
  const ids = await kv.get(FAVORITES_INDEX_KEY, 'json');
  return Array.isArray(ids) ? ids.filter((id) => typeof id === 'string') : [];
}

async function getFavoriteById(kv, id) {
  if (!/^[a-zA-Z0-9-]{1,80}$/.test(String(id || ''))) return null;
  return kv.get(FAVORITE_KEY_PREFIX + id, 'json');
}

async function listFavorites(kv) {
  const ids = await getFavoriteIds(kv);
  const items = await Promise.all(ids.map((id) => getFavoriteById(kv, id)));
  return items.filter(Boolean);
}

function toFavoriteSummary(favorite) {
  return {
    id: favorite.id,
    name: favorite.name,
    slug: favorite.slug,
    createdAt: favorite.createdAt,
    updatedAt: favorite.updatedAt,
    nodeCount: Array.isArray(favorite.nodes) ? favorite.nodes.length : 0,
    nodeKeys: Array.isArray(favorite.nodes) ? favorite.nodes.map(serverKey) : [],
    nodes: Array.isArray(favorite.nodes)
      ? favorite.nodes.map((node) => ({
          key: serverKey(node),
          hostName: node.hostName,
          ip: node.ip,
          countryShort: node.countryShort,
        }))
      : [],
  };
}

function decodeBase64Utf8(base64) {
  const binary = atob(String(base64 || '').replace(/\s+/g, ''));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder('utf-8', { fatal: true }).decode(bytes);
}

function parseServerOvpnConfig(raw) {
  const result = {
    remoteHost: null, remotePort: null, proto: null,
    cipher: null, auth: null, compLzo: null, dev: null,
    ca: null, cert: null, key: null, tlsCrypt: null, tlsAuth: null,
    keyDirection: null, authUserPass: false, mtu: null,
    ping: null, pingRestart: null,
  };
  const blockTagMap = {
    '<ca>': 'ca', '</ca>': 'ca',
    '<cert>': 'cert', '</cert>': 'cert',
    '<key>': 'key', '</key>': 'key',
    '<tls-crypt>': 'tlsCrypt', '</tls-crypt>': 'tlsCrypt',
    '<tls-auth>': 'tlsAuth', '</tls-auth>': 'tlsAuth',
  };
  let block = null;
  let blockLines = [];
  for (const rawLine of String(raw || '').split(/\r\n|\r|\n/)) {
    const trimmed = rawLine.trim();
    if (Object.prototype.hasOwnProperty.call(blockTagMap, trimmed)) {
      const isClose = trimmed.startsWith('</');
      const key = blockTagMap[trimmed];
      if (!isClose) {
        block = key;
        blockLines = [];
      } else {
        result[key] = blockLines.join('\n').trim();
        block = null;
      }
      continue;
    }
    if (block) {
      blockLines.push(rawLine.replace(/\r$/, ''));
      continue;
    }
    if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith(';')) continue;
    const spaceIdx = trimmed.indexOf(' ');
    const directive = (spaceIdx === -1 ? trimmed : trimmed.slice(0, spaceIdx)).toLowerCase();
    const args = spaceIdx === -1 ? '' : trimmed.slice(spaceIdx + 1).trim();
    switch (directive) {
      case 'remote': {
        const parts = args.split(/\s+/);
        result.remoteHost = parts[0];
        if (parts[1]) result.remotePort = parts[1];
        break;
      }
      case 'proto':
        result.proto = args.toLowerCase().startsWith('tcp') ? 'tcp' : 'udp';
        break;
      case 'port':
        if (!result.remotePort) result.remotePort = args;
        break;
      case 'cipher':
        result.cipher = args;
        break;
      case 'data-ciphers':
        if (!result.cipher) result.cipher = args.split(':')[0].trim();
        break;
      case 'auth':
        result.auth = args;
        break;
      case 'comp-lzo':
        result.compLzo = args || 'yes';
        break;
      case 'dev':
      case 'dev-type':
        result.dev = args.toLowerCase().startsWith('tap') ? 'tap' : 'tun';
        break;
      case 'key-direction':
        result.keyDirection = args;
        break;
      case 'auth-user-pass':
        result.authUserPass = true;
        break;
      case 'tun-mtu':
      case 'link-mtu':
        if (!result.mtu) result.mtu = args;
        break;
      case 'ping':
        result.ping = args;
        break;
      case 'ping-restart':
        result.pingRestart = args;
        break;
      case 'keepalive': {
        const parts = args.split(/\s+/);
        if (parts[0]) result.ping = parts[0];
        if (parts[1]) result.pingRestart = parts[1];
        break;
      }
      default:
        break;
    }
  }
  return result;
}

function buildServerMihomoSegment(server, parsed) {
  const lines = [];
  const name = 'VPNGate-' + (server.countryShort || '??') + '-' + server.ip;
  lines.push('- name: ' + quoteYaml(name));
  lines.push('  type: openvpn');
  lines.push('  server: ' + (parsed.remoteHost || server.ip));
  lines.push('  port: ' + (parsed.remotePort || 1194));
  lines.push('  proto: ' + (parsed.proto || 'udp'));
  lines.push('  udp: true');
  if (parsed.authUserPass) {
    lines.push('  # 该配置需要用户名/密码认证 (auth-user-pass),请自行填写凭据');
    lines.push('  # username: "your-username"');
    lines.push('  # password: "your-password"');
  }
  if (parsed.cipher) lines.push('  cipher: ' + parsed.cipher);
  if (parsed.auth) lines.push('  auth: ' + parsed.auth);
  if (parsed.ca) {
    lines.push('  ca: |');
    lines.push(indentYaml(parsed.ca, 4));
  }
  if (parsed.cert) {
    lines.push('  cert: |');
    lines.push(indentYaml(parsed.cert, 4));
  }
  if (parsed.key) {
    lines.push('  key: |');
    lines.push(indentYaml(parsed.key, 4));
  }
  const tlsKey = parsed.tlsCrypt || parsed.tlsAuth;
  if (tlsKey) {
    lines.push('  tls-crypt: |');
    lines.push(indentYaml(tlsKey, 4));
  }
  if (parsed.compLzo) {
    lines.push('  comp-lzo: ' + (/^(yes|no|adaptive)$/i.test(parsed.compLzo) ? parsed.compLzo : 'yes'));
  }
  if (parsed.mtu) lines.push('  mtu: ' + parsed.mtu);
  if (parsed.ping) lines.push('  ping: ' + parsed.ping);
  if (parsed.pingRestart) lines.push('  ping-restart: ' + parsed.pingRestart);
  return lines.join('\n');
}

function quoteYaml(value) {
  return '"' + String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

function indentYaml(value, spaces) {
  const pad = ' '.repeat(spaces);
  return String(value).replace(/\r\n/g, '\n').split('\n').map((line) => pad + line).join('\n');
}

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
