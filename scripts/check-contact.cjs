const assert = require("node:assert/strict");
const fs = require("node:fs");
const Module = require("node:module");
const path = require("node:path");
const test = require("node:test");
const ts = require("typescript");

const file = path.resolve("src/app/api/contact/route.ts");
const compiled = ts.transpileModule(fs.readFileSync(file, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
}).outputText;
const route = new Module(file, module);
route.filename = file;
route.paths = Module._nodeModulePaths(path.dirname(file));
route._compile(compiled, file);

test("contact validates requests and uses one provider idempotency key for retries", async () => {
  const previousFetch = global.fetch;
  const saved = { key: process.env.RESEND_API_KEY, from: process.env.RESEND_FROM_EMAIL, to: process.env.CONTACT_RECEIVER_EMAIL };
  const deliveries = [];
  const acceptedKeys = new Set();
  global.fetch = async (url, options) => {
    const key = options.headers["Idempotency-Key"];
    deliveries.push({ url, key, ...JSON.parse(options.body) });
    acceptedKeys.add(key);
    return new Response("{}", { status: 200 });
  };
  process.env.RESEND_API_KEY = "local-test-key";
  process.env.RESEND_FROM_EMAIL = "Studio <sender@example.com>";
  process.env.CONTACT_RECEIVER_EMAIL = "hello@rarestar.studio";

  const valid = {
    name: "Alex", email: "alex@example.com", organization: "Example",
    kind: "campaign", location: "Bengaluru", message: "We have a local campaign.",
    submissionId: "11111111-1111-4111-8111-111111111111",
    context: { venue: "cafe", daypart: "morning", sampleMessage: "Hello, neighbourhood." }
  };
  const request = (body, origin = "https://stringtheoryads.in") => new Request("https://stringtheoryads.in/api/contact", {
    method: "POST", headers: { "content-type": "application/json", host: "stringtheoryads.in", origin }, body: JSON.stringify(body)
  });

  try {
    assert.equal((await route.exports.POST(request(valid, "https://other.example"))).status, 403);
    assert.equal((await route.exports.POST(request({ ...valid, email: "bad-email" }))).status, 400);
    assert.equal((await route.exports.POST(request({ ...valid, kind: "campaign", location: "" }))).status, 400);
    assert.equal((await route.exports.POST(request({ ...valid, context: { venue: "toString", daypart: "morning" } }))).status, 400);
    assert.equal((await route.exports.POST(request({ ...valid, kind: "careers", portfolio: "javascript:alert(1)" }))).status, 400);
    assert.equal((await route.exports.POST(request({ ...valid, website: "bot.example" }))).status, 200);
    assert.equal(deliveries.length, 0);
    assert.equal((await route.exports.POST(request(valid))).status, 200);
    assert.equal((await route.exports.POST(request(valid))).status, 200);
    assert.equal(acceptedKeys.size, 1);
    assert.equal(deliveries[0].key, deliveries[1].key);
    assert.equal(deliveries[0].url, "https://api.resend.com/emails");
    assert.deepEqual(deliveries[0].to, ["hello@rarestar.studio"]);
    assert.equal(deliveries[0].reply_to, "alex@example.com");
    assert.match(deliveries[0].text, /Café \/ Morning/);
    assert.match(deliveries[0].text, /Hello, neighbourhood/);
    assert.equal((await route.exports.POST(request({ ...valid, kind: "careers", organization: "", location: "", portfolio: "https://example.com" }))).status, 200);
    assert.equal((await route.exports.POST(request({ ...valid, kind: "venue", screenStatus: "yes" }))).status, 200);
    global.fetch = async () => new Response("{}", { status: 500 });
    assert.equal((await route.exports.POST(request(valid))).status, 503);
  } finally {
    global.fetch = previousFetch;
    for (const [name, value] of Object.entries({ RESEND_API_KEY: saved.key, RESEND_FROM_EMAIL: saved.from, CONTACT_RECEIVER_EMAIL: saved.to })) {
      if (value === undefined) delete process.env[name]; else process.env[name] = value;
    }
  }
});
