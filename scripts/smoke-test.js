#!/usr/bin/env node
// Simple smoke test for auth: register -> login -> /me
// Usage: SMOKE_API_URL=http://localhost:4000 node scripts/smoke-test.js

const API = process.env.SMOKE_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const fetch = global.fetch || require('node-fetch');

async function req(path, opts) {
  const res = await fetch(`${API}${path}`, opts);
  const body = await res.json().catch(() => ({}));
  return { status: res.status, body };
}

(async () => {
  try {
    const ts = Date.now();
    const email = `smoke+${ts}@example.com`;
    const pw = 'Sm0ke-Test!';
    console.log('Using API:', API);

    console.log('1) Register');
    const reg = await req('/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: pw, firstName: 'Smoke', lastName: 'Test' }) });
    if (reg.status !== 201) {
      console.error('Register failed:', reg.status, reg.body);
      process.exit(2);
    }

    console.log('2) Login');
    const login = await req('/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password: pw }) });
    if (login.status !== 200) {
      console.error('Login failed:', login.status, login.body);
      process.exit(3);
    }

    const accessToken = login.body?.accessToken;
    if (!accessToken) {
      console.error('No access token returned');
      process.exit(4);
    }

    console.log('3) /me');
    const me = await req('/me', { method: 'GET', headers: { Authorization: `Bearer ${accessToken}` } });
    if (me.status !== 200) {
      console.error('/me failed:', me.status, me.body);
      process.exit(5);
    }

    console.log('Smoke test passed ✅');
    console.log('User:', me.body);
    process.exit(0);
  } catch (err) {
    console.error('Smoke test error:', err);
    process.exit(1);
  }
})();
