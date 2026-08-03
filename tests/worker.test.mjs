import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import test from 'node:test';

class MemoryKv {
  constructor() {
    this.values = new Map();
  }

  async get(key, type) {
    if (!this.values.has(key)) return null;
    const value = this.values.get(key);
    return type === 'json' ? JSON.parse(value) : value;
  }

  async put(key, value) {
    this.values.set(key, String(value));
  }

  async delete(key) {
    this.values.delete(key);
  }
}

const source = await fs.readFile(new URL('../worker.js', import.meta.url), 'utf8');
const workerModule = await import('data:text/javascript;base64,' + Buffer.from(source).toString('base64'));
const worker = workerModule.default;

function request(path, options) {
  return new Request('https://example.com' + path, options);
}

async function json(response) {
  return response.json();
}

test('favorite lifecycle produces a Mihomo subscription', async () => {
  const env = { SUBSCRIPTIONS: new MemoryKv(), ADMIN_TOKEN: 'test-secret' };

  const missingPageAuth = await worker.fetch(request('/api/auth/verify'), env, {});
  assert.equal(missingPageAuth.status, 401);
  const verified = await worker.fetch(
    request('/api/auth/verify', {
      headers: { authorization: 'Bearer test-secret' },
    }),
    env,
    {}
  );
  assert.equal(verified.status, 200);
  assert.equal((await json(verified)).protected, true);

  const missingReadAuth = await worker.fetch(request('/api/favorites'), env, {});
  assert.equal(missingReadAuth.status, 401);

  const missingAuth = await worker.fetch(
    request('/api/favorites', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: '日本节点', slug: 'japan-fast' }),
    }),
    env,
    {}
  );
  assert.equal(missingAuth.status, 401);

  const createResponse = await worker.fetch(
    request('/api/favorites', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer test-secret',
      },
      body: JSON.stringify({ name: '日本节点', slug: 'japan-fast' }),
    }),
    env,
    {}
  );
  assert.equal(createResponse.status, 201);
  const created = (await json(createResponse)).favorite;
  assert.equal(created.nodeCount, 0);

  const emptySubscriptionResponse = await worker.fetch(
    request('/test-secret/sub/japan-fast'),
    env,
    {}
  );
  assert.equal(emptySubscriptionResponse.status, 200);
  assert.equal(await emptySubscriptionResponse.text(), 'proxies: []\n');

  const ovpn = [
    'client',
    'dev tun',
    'proto udp',
    'remote 203.0.113.10 1194',
    'cipher AES-256-CBC',
    'auth SHA256',
    '<ca>',
    'TEST-CA',
    '</ca>',
    '<cert>',
    'TEST-CERT',
    '</cert>',
    '<key>',
    'TEST-KEY',
    '</key>',
  ].join('\n');
  const server = {
    hostName: 'public-vpn-test',
    ip: '203.0.113.10',
    countryLong: 'Japan',
    countryShort: 'JP',
    configDataBase64: Buffer.from(ovpn).toString('base64'),
  };

  const addResponse = await worker.fetch(
    request('/api/favorites/' + created.id + '/nodes', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer test-secret',
      },
      body: JSON.stringify({ servers: [server, server] }),
    }),
    env,
    {}
  );
  assert.equal(addResponse.status, 200);
  const added = (await json(addResponse)).favorite;
  assert.equal(added.nodeCount, 1);
  assert.equal(added.nodes[0].ip, server.ip);

  assert.equal((await worker.fetch(request('/sub/japan-fast'), env, {})).status, 401);
  assert.equal((await worker.fetch(request('/wrong-secret/sub/japan-fast'), env, {})).status, 401);
  const subscriptionResponse = await worker.fetch(
    request('/test-secret/sub/japan-fast'),
    env,
    {}
  );
  assert.equal(subscriptionResponse.status, 200);
  assert.match(subscriptionResponse.headers.get('content-type'), /text\/yaml/);
  const yaml = await subscriptionResponse.text();
  assert.match(yaml, /^proxies:\n  - name:/);
  assert.match(yaml, /type: openvpn/);
  assert.match(yaml, /server: 203\.0\.113\.10/);
  assert.match(yaml, /ca: \|/);

  const updateResponse = await worker.fetch(
    request('/api/favorites/' + created.id, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer test-secret',
      },
      body: JSON.stringify({ name: '备用节点', slug: 'backup' }),
    }),
    env,
    {}
  );
  assert.equal(updateResponse.status, 200);
  assert.equal((await worker.fetch(request('/test-secret/sub/japan-fast'), env, {})).status, 404);
  assert.equal((await worker.fetch(request('/test-secret/sub/backup'), env, {})).status, 200);

  const removeResponse = await worker.fetch(
    request('/api/favorites/' + created.id + '/nodes', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: 'Bearer test-secret',
      },
      body: JSON.stringify({ keys: ['public-vpn-test|203.0.113.10'] }),
    }),
    env,
    {}
  );
  assert.equal((await json(removeResponse)).favorite.nodeCount, 0);

  const deleteResponse = await worker.fetch(
    request('/api/favorites/' + created.id, {
      method: 'DELETE',
      headers: { authorization: 'Bearer test-secret' },
    }),
    env,
    {}
  );
  assert.equal(deleteResponse.status, 200);
  assert.equal((await worker.fetch(request('/test-secret/sub/backup'), env, {})).status, 404);
});

test('favorites API explains a missing KV binding', async () => {
  const response = await worker.fetch(request('/api/favorites'), {}, {});
  assert.equal(response.status, 503);
  assert.equal((await json(response)).code, 'KV_NOT_CONFIGURED');
});

test('an unprotected deployment keeps the legacy subscription route', async () => {
  const env = { SUBSCRIPTIONS: new MemoryKv() };
  const verified = await worker.fetch(request('/api/auth/verify'), env, {});
  assert.equal(verified.status, 200);
  assert.equal((await json(verified)).protected, false);
});
