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

test("contact endpoint validates requests and sends only to the studio", async () => {
  const previousFetch = global.fetch;
  const previousKey = process.env.RESEND_API_KEY;
  const previousFrom = process.env.RESEND_FROM_EMAIL;
  let deliveries = [];
  global.fetch = async (url, options) => {
    deliveries.push({ url, ...JSON.parse(options.body) });
    return new Response("{}", { status: 200 });
  };
  process.env.RESEND_API_KEY = "local-test-key";
  process.env.RESEND_FROM_EMAIL = "Studio <sender@example.com>";

  const valid = { name: "Alex", email: "alex@example.com", organization: "Example", kind: "venue", location: "Bengaluru", message: "We have an indoor screen." };
  const request = (body, origin = "https://stringtheoryads.in") => new Request("https://stringtheoryads.in/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", host: "stringtheoryads.in", origin },
    body: JSON.stringify(body)
  });

  try {
    assert.equal((await route.exports.POST(request(valid, "https://other.example"))).status, 403);
    assert.equal((await route.exports.POST(request({ ...valid, email: "bad-email" }))).status, 400);
    assert.equal((await route.exports.POST(request({ ...valid, website: "bot.example" }))).status, 200);
    assert.equal(deliveries.length, 0);
    assert.equal((await route.exports.POST(request(valid))).status, 200);
    assert.equal(deliveries.length, 1);
    assert.equal(deliveries[0].url, "https://api.resend.com/emails");
    assert.deepEqual(deliveries[0].to, ["hello@rarestar.studio"]);
    assert.equal(deliveries[0].reply_to, "alex@example.com");
    assert.match(deliveries[0].text, /We have an indoor screen/);
    global.fetch = async () => new Response("{}", { status: 500 });
    assert.equal((await route.exports.POST(request(valid))).status, 503);
  } finally {
    global.fetch = previousFetch;
    if (previousKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = previousKey;
    if (previousFrom === undefined) delete process.env.RESEND_FROM_EMAIL; else process.env.RESEND_FROM_EMAIL = previousFrom;
  }
});
