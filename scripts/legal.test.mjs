import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

/*
 * Guards the legal and privacy wording that protects readers and the publisher.
 * These are plain text checks on the source. They are deliberately blunt: if one fails,
 * the change removed a protection. Do not "fix" the test. Ask the owner first (AGENTS.md
 * sections 11 and 13).
 */

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8").replace(/\s+/g, " ");

const terms = read("src/routes/terms.tsx");
const privacy = read("src/routes/privacy.tsx");
const disclaimer = read("src/components/disclaimer.tsx");
const calculator = read("src/routes/calculator.tsx");
const deadlines = read("src/routes/deadlines.tsx");
const contact = read("src/lib/contact.ts");

test("footer disclaimer keeps its core statements", () => {
  for (const phrase of [
    "is independent of DVA and Defence",
    "The publisher is not an Australian legal practitioner",
    "not a law firm and not an ATDP practice",
    "Nothing here is legal, financial, or clinical advice",
    "Check your decision letter and the official page before you act",
    "Australian Consumer Law rights are not excluded",
  ]) {
    assert.ok(disclaimer.includes(phrase), `disclaimer.tsx is missing: "${phrase}"`);
  }
});

test("terms keep the Australian Consumer Law box and the no-advice statements", () => {
  for (const phrase of [
    "Australian Consumer Law is not excluded.",
    "We do not write a total waiver",
    "Not legal advice. Not a law practice.",
    "Not a place that lodges claims",
    "do not wait on this site",
    "Tell us about a problem",
  ]) {
    assert.ok(terms.includes(phrase), `terms.tsx is missing: "${phrase}"`);
  }
});

test("terms do not claim the visitor has read or agreed by browsing", () => {
  assert.ok(
    !terms.includes("Using the site means you have read this page"),
    "Do not tell visitors they have read the page just by using the site.",
  );
});

test("terms and privacy give a way to report a problem", () => {
  assert.ok(terms.includes('to="/feedback"'), "terms.tsx must link to /feedback");
  assert.ok(privacy.includes('to="/feedback"'), "privacy.tsx must link to /feedback");
});

test("privacy page is dated and says where data is held", () => {
  assert.match(privacy, /Last updated \d{1,2} [A-Z][a-z]+ \d{4}\./);
  assert.ok(privacy.includes("Who holds it, and where"));
  assert.ok(privacy.includes("a database in Sydney"));
  assert.ok(privacy.includes("outside Australia"));
});

test("privacy page does not use absolute security claims", () => {
  for (const phrase of ["nothing on the server to steal", "cannot be hacked", "completely secure", "100% secure"]) {
    assert.ok(!privacy.toLowerCase().includes(phrase), `privacy.tsx must not say: "${phrase}"`);
  }
  assert.ok(privacy.includes("no website can promise it will never be breached"));
});

test("calculators keep the 'estimate, not an entitlement' wording", () => {
  assert.ok(calculator.includes("An estimate, not an entitlement"), "calculator.tsx");
  assert.ok(deadlines.includes("An estimate, not an entitlement"), "deadlines.tsx");
});

test("the contact email is read in one place only", () => {
  assert.ok(contact.includes("VITE_PRIVACY_CONTACT_EMAIL"));
  assert.ok(!terms.includes("import.meta.env"), "terms.tsx should import contactEmail");
  assert.ok(!privacy.includes("import.meta.env"), "privacy.tsx should import contactEmail");
});

test("Pathfinder results and Playbooks carry the 'general information, not advice' line", () => {
  const pathfinder = read("src/routes/pathfinder.tsx");
  const playbook = read("src/routes/playbooks/$slug.tsx");
  assert.ok(pathfinder.includes("It is general information, not advice on what to do."), "pathfinder.tsx result page");
  assert.ok(playbook.includes("It is general information, not advice on what to do."), "playbooks/$slug.tsx");
});

test("AGENTS.md carries the legal guardrails", () => {
  const agents = read("AGENTS.md");
  assert.ok(agents.includes("## 13. Legal guardrails"));
});

test("about and privacy name who runs the site and say there are no automated decisions", () => {
  const about = read("src/routes/about.tsx");
  assert.match(about, /Last updated \d{1,2} [A-Z][a-z]+ \d{4}\./);
  assert.ok(about.includes("Who runs this site"));
  assert.ok(about.includes("The publisher is not named, by choice"));
  assert.ok(about.includes("no government or ex-service organisation funding"));
  assert.ok(privacy.includes("Who is responsible for this site"));
  assert.ok(privacy.includes("The publisher is not named, by choice"));
  assert.ok(privacy.includes("Automated decisions"));
  assert.ok(privacy.includes("does not use any computer program to make, or help make, decisions about people"));
  assert.ok(privacy.includes("This site has none to describe"));
});

test("advice-style and unsourced phrases stay out of the content", () => {
  // A ratchet, not a full check. Add to this list when a new kind of advice-style line is removed.
  // See AGENTS.md section 13 ("Information, not advice").
  const files = [
    "src/content/guides.ts",
    "src/content/playbooks.ts",
    "src/content/pathfinder.ts",
    "src/content/resources.ts",
    "src/content/glossary.ts",
    "src/content/search.ts",
    "src/content/deadlines.ts",
    "src/routes/transition.tsx",
    "src/routes/deadlines.tsx",
    "src/routes/calculator.tsx",
    "src/routes/contacts.tsx",
    "src/routes/index.tsx",
    "src/routes/about.tsx",
    "src/routes/file.tsx",
  ];
  const banned = [
    "Most veterans never",
    "Most veterans have never",
    "highest-leverage",
    "tough it out",
    "walk in and hope",
    "Do not perform wellness",
    "do not sign the redemption",
    "Do not sign a redemption",
    "we recommend",
    "I recommend",
    "hardship rant",
    "unforced error",
    "delay evidence",
    "grind a Statement",
    "Hold any redemption",
    "Save the legal theory",
    "not by volume",
    "Dispute the weekly figure",
    "10 business days",
    "does not make things worse",
    "hard to ignore",
    // Added 14 November 2026. Deadlines must never imply a time limit can be extended, and the
    // site does not tell readers when to lodge or what to argue (AGENTS.md section 13).
    "extension may still be available",
    "not always the end",
    "Get advice quickly",
    "lodge by the earlier",
    "lodge by that earlier",
    "Break that loop",
    "argue a delay",
    "be ready to argue",
    "before you argue",
    "delay tactic",
    "Prefer these over",
    "most veterans miss",
    "without anyone telling you",
    "catches people",
    "Facebook advice",
    "scream that into submission",
    "not a vibe",
    "side quest",
    // A blanket claim that a missed time limit always ends the right. Some bodies can allow late
    // applications, and the site cannot say which (AGENTS.md section 13).
    "costs the right itself",
  ];
  for (const file of files) {
    const text = read(file);
    for (const phrase of banned) {
      assert.ok(!text.includes(phrase), `${file} contains "${phrase}". AGENTS.md section 13: information, not advice.`);
    }
  }
});
