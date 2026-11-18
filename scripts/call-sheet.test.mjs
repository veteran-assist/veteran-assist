import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, statSync } from "node:fs";

const root = new URL("../", import.meta.url);

test("call sheet PDF exists, is a PDF, and the page links to it", () => {
  const pdf = readFileSync(new URL("public/call-sheet.pdf", root));
  assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
  assert.ok(statSync(new URL("public/call-sheet.pdf", root)).size > 2000);
  const page = readFileSync(new URL("src/routes/call-sheet.tsx", root), "utf8");
  assert.ok(page.includes('href="/call-sheet.pdf"'));
});

test("the PDF generator and the call sheet page quote the same DVA number and hours", () => {
  const page = readFileSync(new URL("src/routes/call-sheet.tsx", root), "utf8").replace(/\s+/g, " ");
  const gen = readFileSync(new URL("scripts/make-call-sheet-pdf.py", root), "utf8");
  for (const bit of ["1800 838 372", "+61 2 6289 1133", "131 450", "8am to 5pm local time, Monday to Friday", "form D9325"]) {
    assert.ok(page.includes(bit), `call-sheet.tsx: ${bit}`);
    assert.ok(gen.includes(bit), `make-call-sheet-pdf.py: ${bit}`);
  }
});
