import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";
import { pathToFileURL } from "node:url";

execFileSync(
  "npx",
  ["esbuild", "src/content/search.ts", "--bundle", "--platform=node", "--format=esm", "--outfile=/tmp/va-search-test.mjs"],
  { stdio: "ignore" },
);
const { searchContent } = await import(pathToFileURL("/tmp/va-search-test.mjs").href);

function top(q) {
  return searchContent(q, 5);
}

function titles(q) {
  return top(q).map((h) => h.title);
}

test("tinnitus opens on the pilot or the card treatment guide", () => {
  const hits = top("tinnitus");
  assert.ok(hits.length, "expected a hit");
  assert.match(hits[0].href, /pi-after-liability|treatment-on-your-card/);
  assert.match(`${hits[0].title} ${hits[0].snippet}`, /tinnitus/i);
});

test("hearing finds that same line or the calculator", () => {
  const hits = top("hearing");
  assert.ok(hits.some((h) => /hearing|tinnitus|calculator/i.test(`${h.title} ${h.snippet} ${h.href}`)));
});

test("a one-letter typo in a long word still finds tinnitus", () => {
  const hits = top("tinitus");
  assert.ok(hits.some((h) => /tinnitus/i.test(`${h.title} ${h.snippet}`)));
});

test("five points opens on the five-point gate, not the contact guide", () => {
  const first = titles("five points")[0] ?? "";
  assert.match(first, /baseline|five-point|five point|impairment|GARP/i);
  assert.doesNotMatch(first, /single points|five things/i);
});

test("5 points opens on the baseline or the calculator", () => {
  const first = titles("5 points")[0] ?? "";
  assert.match(first, /baseline|calculator|5 points|impairment/i);
  assert.doesNotMatch(first, /single points|five things|allied/i);
});

test("cap opens on the allied-health cap, not incapacity", () => {
  const first = titles("cap")[0] ?? "";
  assert.match(first, /cap/i);
  assert.doesNotMatch(first, /incapacity/i);
});

test("ART does not open on Start here", () => {
  const first = titles("ART")[0] ?? "";
  assert.doesNotMatch(first, /start here/i);
  assert.match(titles("ART").join(" | "), /ART|Tribunal|Review/i);
});

test("one condition finds the MyService rule", () => {
  const blob = top("one condition")
    .map((h) => `${h.title} ${h.snippet}`)
    .join(" | ");
  assert.match(blob, /one condition/i);
});

test("44 and 40 finds the combined-values example", () => {
  const first = top("44 and 40")[0];
  assert.ok(first);
  assert.match(`${first.title} ${first.snippet} ${first.href}`, /44|calculator|WPI|combined/i);
  assert.doesNotMatch(first.title, /complaint|how the claim was handled/i);
});

test("cleaner finds household services", () => {
  const blob = top("cleaner")
    .map((h) => `${h.title} ${h.snippet} ${h.href}`)
    .join(" | ");
  assert.match(blob, /household/i);
});

test("Keogh finds the minister", () => {
  const hit = top("Keogh")[0];
  assert.ok(hit);
  assert.match(hit.title, /Keogh/);
  assert.equal(hit.href, "/people");
});

test("goldcard and 5000 and expedite find the real pages", () => {
  assert.match(top("goldcard").map((h) => h.title).join(" "), /Gold Card/i);
  assert.match(top("5000").map((h) => `${h.title} ${h.snippet}`).join(" "), /5,000|5000|allied/i);
  assert.match(top("expedite").map((h) => `${h.title} ${h.href}`).join(" "), /expedition/i);
});

test("home care does not open on the home page", () => {
  const first = top("home care")[0];
  assert.ok(first);
  assert.notEqual(first.href, "/");
  assert.match(`${first.title} ${first.snippet} ${first.href}`, /home care|VHC|household/i);
});

test("a word the site never uses returns nothing", () => {
  assert.deepEqual(searchContent("zzzzqqqq"), []);
});

// ---- Plain words veterans type (October 2026 review) ----------------------------

function firstHref(q) {
  return top(q)[0]?.href ?? "";
}

test("every main page is found by its own name", () => {
  const pages = {
    privacy: "/privacy",
    terms: "/terms",
    about: "/about",
    feedback: "/feedback",
    glossary: "/glossary",
    letters: "/letters",
    guides: "/guides",
    playbooks: "/playbooks",
    pathfinder: "/pathfinder",
    deadlines: "/deadlines",
    contacts: "/contacts",
    postcode: "/postcode",
    "my file": "/file",
    "what changed": "/transition",
    calculator: "/calculator",
  };
  for (const [q, href] of Object.entries(pages)) {
    assert.equal(firstHref(q), href, `"${q}" should open ${href}`);
  }
});

test("recent changes opens the full list, not the 1 July page", () => {
  assert.equal(firstHref("recent changes"), "/changes");
  assert.equal(firstHref("older changes"), "/changes");
  assert.equal(firstHref("what changed"), "/transition");
});

test("Ask is gone and is never offered", () => {
  for (const q of ["ask", "ask a question", "ask ai"]) {
    assert.ok(!top(q).some((h) => h.href === "/ask"), `"${q}" offered /ask`);
  }
});

test("plurals and word endings match", () => {
  assert.equal(firstHref("appeals"), firstHref("appeal"));
  assert.match(firstHref("complaints"), /ombudsman/);
  assert.match(firstHref("processing times"), /^\/(#|$)|delays/);
});

test("knocked back, rejected and denied lead to appeals", () => {
  for (const q of ["knocked back", "claim knocked back", "rejected claim", "claim denied", "knee claim rejected"]) {
    assert.match(firstHref(q), /appeals-vrb-art|disagree-with-decision/, q);
  }
});

test("waiting questions lead to the delays guide", () => {
  for (const q of ["how long does DVA take", "how long does it take", "my claim is taking forever", "wait times"]) {
    assert.match(firstHref(q), /delays|claim-is-stuck/, q);
  }
});

test("time-limit questions lead to Deadlines", () => {
  for (const q of ["time limit", "deadline", "too late to appeal", "missed deadline", "how long to appeal"]) {
    assert.match(firstHref(q), /^\/deadlines/, q);
  }
});

test("money words lead to the hardship guide, not the crisis lines", () => {
  for (const q of ["money is tight", "broke", "cant pay rent", "crisis payment"]) {
    assert.match(firstHref(q), /hardship-asp|need-money-now/, q);
  }
});

test("mental health words lead to free treatment and counselling", () => {
  for (const q of ["PTSD", "depression", "anxiety", "psychologist", "mental health"]) {
    assert.match(firstHref(q), /NLHC|Open%20Arms|psych/, q);
  }
});

test("lawyer and solicitor lead to the advocates guide", () => {
  for (const q of ["lawyer", "solicitor", "legal aid"]) assert.match(firstHref(q), /advocates/, q);
});

test("local help words lead to the postcode page", () => {
  for (const q of ["RSL", "senator", "local member", "near me", "hub"]) assert.equal(firstHref(q), "/postcode", q);
});

test("other everyday words land on the right page", () => {
  const cases = {
    "banned from calling": /contact-restrictions/,
    "medical report": /medical-evidence/,
    discharge: /start-here/,
    "leaving defence": /start-here/,
    "cant work": /incapacity-offsets/,
    mileage: /travel-for-treatment|Travel/,
    carer: /Attendant|household/,
    payout: /redemption|incapacity/,
    "phone number": /^\/contacts/,
    donate: /^\/hosting/,
  };
  for (const [q, re] of Object.entries(cases)) assert.match(firstHref(q), re, q);
});

test("words that suggest someone is unsafe put 000 and Open Arms first", () => {
  for (const q of ["suicide", "i want to kill myself", "not coping", "self harm"]) {
    const hits = top(q);
    assert.equal(hits[0]?.href, "tel:000", q);
    assert.ok(hits.some((h) => h.href === "tel:1800011046"), `${q}: Open Arms missing`);
  }
});

test("ordinary searches do not trigger the crisis lines", () => {
  for (const q of ["back pay", "knocked back", "crisis payment", "open arms", "appeal"]) {
    assert.ok(!top(q).some((h) => h.href.startsWith("tel:")), q);
  }
});

test("a phrase does not match its words one at a time", () => {
  // "back pay" used to match "Suicide Call Back Service".
  assert.ok(!top("back pay").some((h) => /call back/i.test(h.title)));
});

// ---- New content, 23 October 2026 ------------------------------------------

test("incapacity and stopping-work questions open the stop-work section", () => {
  for (const q of ["incaps", "how long for incaps", "stop work", "resign", "cant work", "Veteran Payment"]) {
    assert.equal(firstHref(q), "/guides/incapacity-offsets#stop-work", q);
  }
  // The offsets content is still where offset questions land.
  assert.match(firstHref("offset"), /incapacity-offsets/);
});

test("car, registration and concession questions open the Gold Card concessions guide", () => {
  for (const q of ["gold card concession vehicle purchase", "rego concession nsw", "stamp duty", "gst free car", "buy a car"]) {
    assert.match(firstHref(q), /gold-card-concessions/, q);
  }
});

test("re-joining and recruiting questions open the not-a-DVA-question note", () => {
  for (const q of ["rejoin RAAF", "re-enlist after medical discharge", "medically unfit class 4", "recruiting"]) {
    assert.equal(firstHref(q), "/guides/start-here#rejoin", q);
  }
});

test("getting a Gold Card goes to the how-to guide, card admin to the concessions guide", () => {
  for (const q of ["how do i get a gold card", "gold card 60 points", "qualify for gold card"]) {
    assert.match(firstHref(q), /\/guides\/gold-card(#|$)/, q);
  }
  for (const q of ["my gold card expired", "lost gold card"]) {
    assert.match(firstHref(q), /gold-card-concessions/, q);
  }
});

test("helpers and form-seekers land on the right page", () => {
  for (const q of ["my partner is a veteran", "i do the paperwork for my dad", "helping my husband with dva", "representative"]) {
    assert.match(firstHref(q), /helping-a-veteran/, q);
  }
  for (const q of ["travel claim form", "d0800"]) {
    assert.match(firstHref(q), /^\/forms/, q);
  }
});

test("phone-call searches find the call sheet", () => {
  for (const q of ["call sheet", "ring dva", "what to ask dva on the phone", "dva phone call notes"]) {
    assert.match(firstHref(q), /^\/call-sheet/, q);
  }
});
