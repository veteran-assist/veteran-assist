import assert from "node:assert/strict";
import test from "node:test";
import { houseByElectorate, houseMembers } from "../src/content/postcode/house.ts";
import { senators, senatorsFor } from "../src/content/postcode/senate.ts";
import { stateSupport } from "../src/content/postcode/support.ts";
import pcMap from "../src/content/postcode/pc-map.json" with { type: "json" };

function lookup(pc) {
  const ids = pcMap.postcodes[pc] ?? [];
  const electorates = ids.map((id) => {
    const electorate = pcMap.electorates[id];
    return { electorate, member: houseByElectorate[electorate] ?? null };
  });
  const states = [...new Set(electorates.map((e) => e.member?.state).filter(Boolean))];
  return {
    electorates,
    states,
    spansElectorates: electorates.length > 1,
    spansStates: states.length > 1,
    senators: states.flatMap((s) => senatorsFor(s)),
    support: states.map((s) => stateSupport[s]),
  };
}

test("150 sitting House members, no Sussan Ley, Farley sits Farrer", () => {
  assert.equal(houseMembers.length, 150);
  assert.equal(houseMembers.filter((m) => m.name === "Sussan Ley").length, 0);
  assert.equal(houseByElectorate.Farrer.name, "David Farley");
  assert.equal(houseByElectorate.Farrer.party, "One Nation");
  assert.equal(houseByElectorate["New England"].name, "Barnaby Joyce");
  assert.equal(houseByElectorate["New England"].party, "One Nation");
  assert.equal(houseByElectorate.Wentworth.party, "Community Strong");
  assert.equal(houseByElectorate.Warringah.party, "Community Strong");
  assert.equal(houseByElectorate.Burt.name, "Matt Keogh");
});

test("76 senators, twelve per state", () => {
  assert.equal(senators.length, 76);
  assert.equal(senatorsFor("NSW").length, 12);
  assert.equal(senatorsFor("VIC").length, 12);
  assert.equal(senatorsFor("ACT").length, 2);
  assert.equal(senatorsFor("NT").length, 2);
  assert.ok(senators.some((s) => s.name === "Dave Sharma" && s.state === "NSW"));
  assert.ok(senators.some((s) => s.name === "Jacinta Nampijinpa Price" && s.party === "Country Liberal"));
});

test("Melbourne CBD maps to Melbourne and Sarah Witty", () => {
  const r = lookup("3000");
  assert.equal(r.electorates.length, 1);
  assert.equal(r.electorates[0].electorate, "Melbourne");
  assert.equal(r.electorates[0].member?.name, "Sarah Witty");
  assert.deepEqual(r.states, ["VIC"]);
  assert.equal(r.senators.length, 12);
});

test("Albury 2640 spans Farrer and Riverina", () => {
  const r = lookup("2640");
  assert.equal(r.spansElectorates, true);
  assert.deepEqual(r.electorates.map((e) => e.electorate).sort(), ["Farrer", "Riverina"]);
  assert.equal(r.electorates.find((e) => e.electorate === "Farrer")?.member?.name, "David Farley");
  assert.equal(r.electorates.find((e) => e.electorate === "Riverina")?.member?.name, "Michael McCormack");
});

test("Armidale 2350 is New England", () => {
  const r = lookup("2350");
  assert.equal(r.electorates[0].electorate, "New England");
  assert.equal(r.electorates[0].member?.name, "Barnaby Joyce");
});

test("Sydney 2000 is Tanya Plibersek", () => {
  const r = lookup("2000");
  assert.equal(r.electorates[0].member?.name, "Tanya Plibersek");
});

test("Canberra 2600 spans Bean and Canberra", () => {
  const r = lookup("2600");
  assert.deepEqual(r.electorates.map((e) => e.electorate).sort(), ["Bean", "Canberra"]);
  assert.deepEqual(r.states, ["ACT"]);
  assert.ok(r.senators.some((s) => s.name === "David Pocock"));
});

test("Wentworth 2027 is Spender, Community Strong", () => {
  const r = lookup("2027");
  assert.ok(r.electorates.some((e) => e.member?.name === "Allegra Spender" && e.member.party === "Community Strong"));
});

test("0872 can span NT and SA", () => {
  const r = lookup("0872");
  assert.equal(r.spansStates, true);
  assert.ok(r.states.includes("NT"));
  assert.ok(r.states.includes("SA"));
});

test("every mapped division has a sitting member", () => {
  for (const name of pcMap.electorates) {
    assert.ok(houseByElectorate[name], `missing member for ${name}`);
  }
  assert.equal(pcMap.electorates.length, 150);
});

test("QLD veterans minister is an official-page link, not an invented name", () => {
  assert.match(stateSupport.QLD.stateVeteransMinister.label, /confirm/i);
  assert.match(stateSupport.NSW.stateVeteransMinister.label, /David Harris/);
});

test("state parliament finders use live 2026 URLs, not retired pages", () => {
  assert.match(stateSupport.VIC.findMp.href, /parliament\.vic\.gov\.au\/members\/member-search/);
  assert.match(stateSupport.VIC.findMpAlt.href, /findelectorate\.parliament\.vic\.gov\.au/);
  assert.equal(stateSupport.NSW.findMp.href, "https://elections.nsw.gov.au/elections/find-my-electorate");
  assert.equal(stateSupport.QLD.findMp.href, "https://www.ecq.qld.gov.au/electoral-boundaries/where-is-my-electorate");
  assert.equal(stateSupport.SA.findMp.href, "https://www.ecsa.sa.gov.au/map");
  assert.equal(stateSupport.WA.findMp.href, "https://www.parliament.wa.gov.au/MemberList");
  assert.match(stateSupport.TAS.findMp.href, /MyReps/);
  assert.equal(stateSupport.ACT.findMp.href, "https://www.parliament.act.gov.au/members/current");
  assert.doesNotMatch(JSON.stringify(stateSupport), /find-my-local-members|member-search\.aspx|Find-your-Member|findmember\.nsf/);
});
