import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import ts from 'typescript';

// Exercise the real route, replacing only environment and network I/O.
const require = createRequire(import.meta.url);
const source = readFileSync(
  new URL('../app/api/infinitepay/checkout/route.ts', import.meta.url),
  'utf8',
);
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;
const env = {
  INFINITEPAY_HANDLE: 'test-only',
  NEXT_PUBLIC_SITE_URL: 'https://www.saberio.com.br/',
};
let networkCalls = 0;
let sentBody;
let provider = async () =>
  Response.json({ url: 'https://checkout.infinitepay.io/test-only' });
const routeModule = { exports: {} };
vm.runInNewContext(compiled, {
  exports: routeModule.exports,
  require,
  process: { env },
  URL,
  Error,
  AbortSignal,
  fetch: async (_url, options) => {
    networkCalls++;
    sentBody = JSON.parse(options.body);
    assert.ok(options.signal);
    return provider();
  },
});
const post = (body) =>
  routeModule.exports.POST(
    new Request('http://localhost/api/infinitepay/checkout', {
      method: 'POST',
      body,
    }),
  );

for (const body of [
  '{',
  'null',
  '[]',
  '{}',
  '{"plan":"toString"}',
  '{"plan":"__proto__"}',
  '{"plan":12}',
]) {
  assert.equal((await post(body)).status, 400);
}
assert.equal(networkCalls, 0, 'Invalid plans must not reach the provider');
env.INFINITEPAY_HANDLE = '';
assert.equal((await post('{"plan":"sementinha"}')).status, 503);
assert.equal(networkCalls, 0);
env.INFINITEPAY_HANDLE = 'test-only';
for (const [plan, price] of Object.entries({
  sementinha: 50000,
  crescer: 178000,
  'voar-alto': 580000,
  grandao: 1500000,
})) {
  const response = await post(JSON.stringify({ plan }));
  assert.equal(response.status, 200);
  assert.equal(
    (await response.json()).checkoutUrl,
    'https://checkout.infinitepay.io/test-only',
  );
  assert.equal(sentBody.items[0].price, price);
  assert.equal(
    sentBody.redirect_url,
    'https://www.saberio.com.br/pagamento-concluido',
  );
}
for (const invalid of [
  null,
  {},
  { url: 'javascript:alert(1)' },
  { url: 'http://example.com' },
  { url: 'https://user:pass@example.com' },
]) {
  provider = async () => Response.json(invalid);
  assert.equal((await post('{"plan":"crescer"}')).status, 502);
}
provider = async () => new Response('invalid-json');
assert.equal((await post('{"plan":"crescer"}')).status, 502);
provider = async () => new Response('', { status: 500 });
assert.equal((await post('{"plan":"crescer"}')).status, 502);
provider = async () => {
  throw new Error('network unavailable');
};
assert.equal((await post('{"plan":"crescer"}')).status, 502);
provider = async () => {
  const error = new Error('timed out');
  error.name = 'TimeoutError';
  throw error;
};
assert.equal((await post('{"plan":"crescer"}')).status, 504);
console.log(
  'Checkout checks passed: validation, all prices, provider errors, safe redirects, timeout. No external requests.',
);
