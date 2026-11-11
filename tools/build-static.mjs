#!/usr/bin/env node
/*
 * Optional helper. The site has no build step: this only refreshes the
 * no-JavaScript fallback in index.html so it matches js/data.js.
 *
 *   node tools/build-static.mjs
 *
 * It rewrites the text between these marker pairs in index.html:
 *   <!-- BEGIN:labs -->   ... <!-- END:labs -->
 *   <!-- BEGIN:certs -->  ... <!-- END:certs -->
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import vm from "node:vm";

const here = dirname(fileURLToPath(import.meta.url));
const site = join(here, "..");
const require = createRequire(import.meta.url);

const sandbox = { window: {} };
vm.runInNewContext(readFileSync(join(site, "js", "data.js"), "utf8"), sandbox);
const data = sandbox.window.PORTFOLIO;
if (!data) {
  console.error("js/data.js did not define window.PORTFOLIO");
  process.exit(1);
}

const render = require(join(site, "js", "render.js"));

function replaceBlock(html, name, content) {
  const begin = `<!-- BEGIN:${name} -->`;
  const end = `<!-- END:${name} -->`;
  const a = html.indexOf(begin);
  const b = html.indexOf(end);
  if (a === -1 || b === -1 || b < a) {
    console.error(`Markers for "${name}" not found in index.html`);
    process.exit(1);
  }
  return html.slice(0, a + begin.length) + "\n" + content + "\n      " + html.slice(b);
}

const file = join(site, "index.html");
let html = readFileSync(file, "utf8");
html = replaceBlock(html, "labs", render.labs(data));
html = replaceBlock(html, "certs", render.certs(data));
writeFileSync(file, html);

const count = data.labGroups.reduce((n, g) => n + g.items.length, 0);
console.log(`index.html updated: ${count} lab entries, ${data.certifications.length} certifications.`);
