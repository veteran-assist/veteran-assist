import { clocks } from "./deadlines";
import { officialForms } from "./forms";
import { glossary } from "./glossary";
import { guides } from "./guides";
import { letters } from "./letters";
import { pathResults } from "./pathfinder";
import { officeHolders } from "./people";
import { playbooks } from "./playbooks";
import { processingTimes } from "./processing-times";
import { rates, ratesWindowSentence } from "./rates";
import { crisisLines, resources } from "./resources";
import { headingSlug } from "../lib/slug";
import { BODY_SYSTEMS, THRESHOLDS } from "../lib/wpi";

export type SearchKind = "Guide" | "Playbook" | "Letter" | "Glossary" | "Page";

export type SearchHit = {
  href: string;
  title: string;
  kind: SearchKind;
  snippet: string;
  where?: string;
};

type Section = {
  href: string;
  title: string;
  kind: SearchKind;
  where?: string;
  heading: string;
  text: string;
  /** Whole queries that mean this page by name ("terms", "about", "deadlines"). */
  exact?: string[];
};

const STOP = new Set([
  "a",
  "an",
  "the",
  "of",
  "to",
  "and",
  "or",
  "for",
  "in",
  "on",
  "is",
  "it",
  "be",
  "this",
  "that",
  "with",
  "from",
  "your",
  "you",
  "are",
  "as",
  "at",
  "by",
  "if",
  "not",
  "i",
  "im",
  "me",
  "my",
  "do",
  "does",
  "did",
  "can",
  "how",
  "what",
  "when",
  "where",
  "who",
  "why",
  "get",
]);

/**
 * Words and phrases veterans type that the site words differently. A query word that matches a
 * trigger becomes a group: a section matches the group if it contains ANY of the alternatives.
 * Alternatives must be words the site actually uses. Phrases are matched before single words.
 * `distress` puts the crisis lines at the top of the results.
 */
type Concept = {
  triggers: string[];
  alts: string[];
  distress?: boolean;
  /** Where most people typing this should land first (must be an indexed href). */
  best?: string[];
};

const CONCEPTS: Concept[] = [
  // Safety first.
  {
    triggers: [
      "suicide",
      "suicidal",
      "kill myself",
      "end it",
      "end my life",
      "want to die",
      "self harm",
      "selfharm",
      "hurt myself",
      "not coping",
      "cant cope",
      "can't cope",
      "unsafe",
      "in danger",
      "crisis",
      "breakdown",
      "help now",
      "urgent help",
    ],
    alts: ["suicide", "crisis", "unsafe", "emergency", "lifeline", "000", "counselling"],
    distress: true,
  },
  // Decisions and appeals.
  {
    triggers: [
      "knocked back",
      "knock back",
      "knockback",
      "rejected",
      "rejection",
      "denied",
      "denial",
      "turned down",
      "refused claim",
      "claim refused",
      "declined",
      "bad decision",
      "wrong decision",
      "challenge",
      "contest",
      "dispute",
    ],
    alts: ["disagree", "decision", "appeal", "vrb", "review", "dispute"],
    best: ["/guides/appeals-vrb-art", "/playbooks/disagree-with-decision"],
  },
  { triggers: ["aat", "tribunal", "court"], alts: ["art", "aat", "tribunal"] },
  // Money.
  {
    triggers: [
      "back pay",
      "backpay",
      "arrears",
      "backdate",
      "backdated",
      "backdating",
      "owed money",
      "money owed",
    ],
    alts: ["arrears", "backdating", "backdated", "backdate"],
    best: ["/deadlines"],
  },
  {
    triggers: ["payout", "pay out", "lumpsum", "lump sum", "cash out", "one off payment"],
    alts: ["lump", "redemption", "commutation", "compensation"],
  },
  {
    triggers: [
      "broke",
      "skint",
      "no money",
      "cant pay",
      "can't pay",
      "cant afford",
      "can't afford",
      "rent",
      "bills",
      "mortgage",
      "evicted",
      "eviction",
      "food",
      "struggling",
      "financial hardship",
      "money is tight",
      "money tight",
      "short of money",
      "need money",
      "need money now",
      "emergency money",
      "money now",
      "crisis payment",
      "crisis money",
      "emergency payment",
      "crisis support package",
    ],
    alts: ["hardship", "money", "acute", "asp", "rent", "bills"],
    best: ["/guides/hardship-asp"],
  },
  {
    triggers: ["pension", "income", "wage", "wages", "salary"],
    alts: ["incapacity", "pension", "srdp", "income", "work"],
    best: ["/guides/incapacity-offsets"],
  },
  {
    triggers: [
      "incap",
      "incaps",
      "incapacity",
      "stop work",
      "stop working",
      "stopped work",
      "stopping work",
      "cant work",
      "can't work",
      "unable to work",
      "unfit for work",
      "off work",
      "quit work",
      "quit my job",
      "resign",
      "resigning",
      "leave work",
      "leaving work",
      "sick leave",
      "time off work",
      "lost my job",
      "veteran payment",
      "d1360",
    ],
    alts: ["incapacity", "work", "certificate", "veteran payment"],
    best: ["/guides/incapacity-offsets#stop-work"],
  },
  {
    triggers: [
      "concession",
      "concessions",
      "discount",
      "discounts",
      "rego",
      "registration",
      "stamp duty",
      "buy a car",
      "buying a car",
      "car",
      "cars",
      "vehicle",
      "vehicles",
      "gst",
      "gst free",
      "car purchase",
      "luxury car tax",
      "licence",
      "license",
      "opal",
      "gold opal",
      "myki",
      "translink",
      "public transport",
      "energy rebate",
      "electricity",
      "gas rebate",
      "power bill",
      "council rates",
      "water rebate",
      "toll",
      "tolls",
      "fishing licence",
      "motorcycle",
    ],
    alts: ["concession", "car", "registration", "gst", "discount", "vehicle"],
    best: ["/guides/gold-card-concessions"],
  },
  {
    triggers: [
      "rejoin",
      "re join",
      "rejoining",
      "re joining",
      "reenlist",
      "re enlist",
      "re enlisting",
      "join again",
      "join the raaf",
      "join the navy",
      "join the army",
      "join the adf",
      "transfer to raaf",
      "transfer to navy",
      "recruiting",
      "recruit",
      "recruitment",
      "dfr",
      "adf careers",
      "defence jobs",
      "medically unfit",
      "unfit class",
      "class 4",
      "mec 4",
      "mec4",
      "medical standards",
    ],
    alts: ["rejoin", "join", "recruiting", "adf"],
    best: ["/guides/start-here#rejoin"],
  },
  {
    triggers: ["tpi", "totally and permanently incapacitated", "special rate"],
    alts: ["tpi", "srdp", "special"],
  },
  // Mental health.
  {
    triggers: [
      "ptsd",
      "depression",
      "depressed",
      "anxiety",
      "anxious",
      "mental health",
      "mental illness",
      "psych",
      "psychologist",
      "psychiatrist",
      "psychology",
      "counselling",
      "counseling",
      "counsellor",
      "trauma",
      "moral injury",
      "alcohol",
      "drinking",
      "gambling",
      "addiction",
    ],
    alts: [
      "mental",
      "psychiatric",
      "psychiatrist",
      "psychologist",
      "psychological",
      "nlhc",
      "counselling",
      "open arms",
    ],
    best: ["/glossary#NLHC", "/glossary#Open%20Arms", "/guides/medical-evidence#psych"],
  },
  // Help and representation.
  {
    triggers: [
      "lawyer",
      "lawyers",
      "solicitor",
      "legal aid",
      "legal advice",
      "barrister",
      "law firm",
    ],
    alts: ["lawyer", "solicitor", "legal", "advocate"],
    best: ["/guides/advocates"],
  },
  {
    triggers: [
      "rsl",
      "legacy",
      "eso",
      "ex service",
      "ex-service",
      "advocacy",
      "pension officer",
      "welfare officer",
    ],
    alts: ["advocate", "rsl", "eso", "legacy", "advocacy", "atdp"],
  },
  {
    triggers: [
      "hub",
      "hubs",
      "veterans hub",
      "families hub",
      "drop in",
      "office near me",
      "near me",
      "local",
    ],
    alts: ["hub", "postcode", "local", "near"],
  },
  {
    triggers: [
      "senator",
      "senators",
      "mp",
      "member of parliament",
      "politician",
      "local member",
      "federal member",
      "state member",
      "electorate",
    ],
    alts: ["senator", "member", "mp", "electorate", "postcode"],
  },
  {
    triggers: [
      "phone number",
      "phone",
      "call dva",
      "ring dva",
      "contact dva",
      "dva number",
      "number for dva",
    ],
    alts: ["1800", "phone", "contact", "call"],
  },
  {
    triggers: [
      "banned",
      "banned from calling",
      "cant call",
      "can't call",
      "blocked",
      "only email",
      "restricted",
      "restriction",
      "restrictions",
      "behaviour protocol",
      "spoc",
    ],
    alts: ["restrict", "spoc", "contact", "protocol", "adjustment"],
    best: ["/guides/contact-restrictions", "/playbooks/restricted-contact"],
  },
  {
    triggers: [
      "time limit",
      "time limits",
      "due date",
      "how long do i have",
      "too late",
      "late",
      "missed deadline",
      "out of time",
      "deadline",
      "deadlines",
    ],
    alts: ["deadline", "clock", "limit", "late", "extension", "month"],
    best: ["/deadlines"],
  },
  // Waiting.
  {
    triggers: [
      "how long does dva take",
      "how long does it take",
      "how long will it take",
      "how long do claims take",
      "how long",
      "wait",
      "waiting",
      "wait time",
      "wait times",
      "processing",
      "taking forever",
      "taking ages",
      "slow",
      "no answer",
      "heard nothing",
      "no response",
      "no reply",
    ],
    alts: ["delay", "processing", "wait", "stuck", "quiet", "average", "days"],
    best: ["/guides/delays", "/playbooks/claim-is-stuck"],
  },
  // Home and care.
  {
    triggers: [
      "cleaner",
      "cleaning",
      "mowing",
      "lawn",
      "lawns",
      "gardening",
      "garden",
      "housework",
      "domestic",
      "laundry",
      "meals",
    ],
    alts: ["household", "cleaning", "lawn", "garden", "domestic", "laundry"],
  },
  {
    triggers: [
      "carer",
      "caregiver",
      "personal care",
      "shower",
      "showering",
      "dressing",
      "bathing",
      "toileting",
    ],
    alts: ["attendant", "bathing", "dressing", "personal"],
  },
  { triggers: ["homecare", "home care", "vhc"], alts: ["home", "vhc"] },
  { triggers: ["nursing home", "aged care", "residential care"], alts: ["nursing", "aged"] },
  // Helpers: partners, family and friends doing the paperwork.
  {
    triggers: [
      "my partner is a veteran",
      "my husband is a veteran",
      "my wife is a veteran",
      "my dad is a veteran",
      "paperwork for",
      "helping my",
      "on behalf of",
      "do the paperwork",
      "representative",
      "nominee",
      "act on behalf",
      "dva wont talk to me",
      "dva won't talk to me",
    ],
    alts: ["helper", "representative", "d9325"],
    best: ["/guides/helping-a-veteran"],
  },
  {
    triggers: [
      "travel claim",
      "travel form",
      "claim travel",
      "travelling expenses",
      "travel expenses",
      "d0800",
      "d800",
    ],
    alts: ["travel", "forms"],
    best: ["/guides/travel-for-treatment", "/forms"],
  },
  {
    triggers: [
      "flights",
      "flight",
      "fly to appointment",
      "interstate specialist",
      "specialist in another city",
      "car hire",
      "hire car",
      "accommodation for treatment",
      "overnight stay treatment",
      "travel not complete",
    ],
    alts: ["travel", "flights", "accommodation", "interstate", "attendant"],
    best: ["/guides/travel-for-treatment"],
  },
  {
    triggers: [
      "mepi",
      "medical expense",
      "medical expenses",
      "paid out of pocket",
      "reimbursement",
      "reimbursed",
      "claim back",
      "d1181",
    ],
    alts: ["mepi", "reimburse", "reimbursement", "privately", "receipt"],
    best: ["/guides/treatment-on-your-card"],
  },
  {
    triggers: [
      "medicinal cannabis",
      "cannabis",
      "cbd",
      "thc",
      "cannabis oil",
      "cannabis flower",
      "cannabis reimbursement",
      "d9546",
    ],
    alts: ["cannabis", "medicinal", "rpbs", "prescription", "reimbursement"],
    best: ["/guides/treatment-on-your-card"],
  },
  {
    triggers: [
      "weight loss",
      "weight-loss",
      "weight loss injection",
      "obesity",
      "bmi",
      "rpbs",
      "pbs",
      "medicine not on pbs",
      "script",
      "prescription",
    ],
    alts: ["medicine", "medicines", "rpbs", "pbs", "prescription", "pharmacy"],
    best: ["/guides/treatment-on-your-card"],
  },
  {
    triggers: [
      "after the assessment",
      "after my assessment",
      "waiting for decision after assessment",
      "ready to investigate",
      "delegate allocated",
      "allocated to a delegate",
      "how long after assessment",
      "fast tracked",
      "fast-tracked",
      "expedited",
    ],
    alts: ["delegate", "allocation", "assessment", "expedite", "expedited", "decision", "wait"],
    best: ["/guides/pi-after-liability", "/guides/delays"],
  },
  {
    triggers: [
      "offset",
      "offsetting",
      "dcp offset",
      "drca lump sum",
      "lump sum and pension",
      "double dipping",
      "compensation offset",
      "paid twice",
    ],
    alts: ["offset", "offsetting", "dcp", "lump", "pension", "drca"],
    best: ["/guides/incapacity-offsets"],
  },
  {
    triggers: [
      "find a doctor",
      "find a gp",
      "find a provider",
      "find a psychologist",
      "who accepts gold card",
      "who accepts white card",
      "doctor that bills dva",
      "gp that bills dva",
      "provider that bills dva",
    ],
    alts: ["provider", "doctor", "gp", "psychologist", "accepts", "card"],
    best: ["/guides/treatment-on-your-card"],
  },
  {
    triggers: [
      "veteran health check",
      "health check",
      "post discharge",
      "post-discharge",
      "health assessment",
      "gp health assessment",
    ],
    alts: ["health", "check", "assessment", "discharge", "gp"],
  },
  {
    triggers: [
      "education scheme",
      "vces",
      "mrcaets",
      "children education",
      "child education",
      "school allowance",
      "education allowance",
      "my child study",
    ],
    alts: ["education", "scheme", "mrcaets", "vces", "children", "student"],
  },
  // Treatment.
  {
    triggers: [
      "mileage",
      "kilometres",
      "kilometers",
      "km",
      "petrol",
      "fuel",
      "transport",
      "taxi",
      "driving to appointments",
    ],
    alts: ["travel", "kilometre"],
    best: ["/guides/travel-for-treatment"],
  },
  {
    triggers: [
      "physio",
      "physiotherapy",
      "chiro",
      "chiropractor",
      "exercise physiologist",
      "dietitian",
      "podiatrist",
      "podiatry",
      "massage",
      "osteo",
      "osteopath",
      "occupational therapist",
      "ot",
    ],
    alts: ["allied", "physio", "physiotherapy"],
  },
  { triggers: ["dentist", "teeth", "dental"], alts: ["dental"] },
  {
    triggers: [
      "doctor",
      "gp",
      "medical report",
      "doctors report",
      "doctor's report",
      "medical evidence",
      "report",
    ],
    alts: ["gp", "medical", "doctor", "specialist", "report"],
    best: ["/guides/medical-evidence"],
  },
  {
    triggers: ["hearing aid", "hearing aids", "deaf", "tinnitus", "hearing loss"],
    alts: ["hearing", "tinnitus"],
    best: ["/guides/pi-after-liability", "/guides/treatment-on-your-card"],
  },
  {
    triggers: [
      "permanent impairment",
      "pi claim",
      "pi lodged",
      "lifestyle questionnaire",
      "lifestyle rating",
      "liability accepted",
    ],
    alts: ["impairment", "permanent", "lifestyle", "tinnitus"],
    best: ["/guides/pi-after-liability", "/guides/permanent-impairment"],
  },
  { triggers: ["sleep apnoea", "sleep apnea", "osa"], alts: ["sleep", "apnoea"] },
  // Cards.
  {
    triggers: [
      "goldcard",
      "gold card",
      "all conditions",
      "veteran card all conditions",
      "get a gold card",
      "get gold card",
      "qualify for gold card",
      "60 points",
      "sixty points",
    ],
    alts: ["gold", "card"],
    best: ["/guides/gold-card", "/guides/gold-card-concessions"],
  },
  {
    triggers: ["card expired", "expired card", "new card", "lost card", "replacement card"],
    alts: ["card"],
    best: ["/guides/gold-card-concessions"],
  },
  { triggers: ["whitecard", "white card"], alts: ["white"] },
  { triggers: ["dva card", "health card", "veteran card"], alts: ["card", "gold", "white"] },
  // Files and records.
  {
    triggers: [
      "my records",
      "my documents",
      "copy of my file",
      "my file",
      "records",
      "documents",
      "recordings",
      "phone calls",
    ],
    alts: ["foi", "pir", "file", "documents", "records", "recordings"],
  },
  { triggers: ["freedom of information"], alts: ["foi"] },
  // Life events.
  {
    triggers: [
      "discharge",
      "discharged",
      "medically discharged",
      "leaving defence",
      "left defence",
      "leaving the adf",
      "transitioning",
      "getting out",
      "separation",
      "separating",
      "new to dva",
      "first claim",
    ],
    alts: ["start", "transition", "discharge", "leaving", "new"],
    best: ["/guides/start-here"],
  },
  {
    triggers: ["kids", "children", "child", "school", "education", "uni", "university"],
    alts: ["children", "child", "education", "mrcaets", "young"],
  },
  {
    triggers: ["wife", "husband", "spouse", "partner", "family", "families"],
    alts: ["partner", "family", "families"],
  },
  // Changes.
  {
    triggers: [
      "july changes",
      "july 2026",
      "new law",
      "new act",
      "vets act",
      "law change",
      "changes",
    ],
    alts: ["july", "vets", "changed", "transition"],
  },
  // Site.
  {
    triggers: ["donate", "donation", "chip in", "contribute", "support the site", "payid"],
    alts: ["hosting", "chip", "payid"],
  },
  {
    triggers: ["ai", "chatgpt", "chat gpt", "grok", "gemini", "copilot", "artificial intelligence"],
    alts: ["ai", "prompt", "chatgpt", "grok", "model"],
  },
  {
    triggers: ["expedite", "expediting", "fast track", "fasttrack", "hurry up", "priority"],
    alts: ["expedition", "expedite", "priority", "urgent"],
  },
  {
    triggers: ["complain", "complaint", "complaints", "unhappy with dva", "bad service"],
    alts: ["complaint", "complain", "ombudsman", "feedback"],
    best: ["/guides/ombudsman"],
  },
];

/** Strip common English endings so "claims", "claiming" and "claimed" all match "claim". */
export function stem(token: string): string {
  if (token.length <= 3 || /\d/.test(token)) return token;
  if (token.endsWith("ies") && token.length > 4) return `${token.slice(0, -3)}y`;
  if (token.endsWith("sses")) return token.slice(0, -2);
  if (token.endsWith("ing") && token.length > 5) {
    const root = token.slice(0, -3);
    return /(.)\1$/.test(root) && !/(ll|ss|ff|zz)$/.test(root) ? root.slice(0, -1) : root;
  }
  if (token.endsWith("ed") && token.length > 4 && !token.endsWith("eed")) {
    const root = token.slice(0, -2);
    return /(.)\1$/.test(root) && !/(ll|ss|ff|zz)$/.test(root) ? root.slice(0, -1) : root;
  }
  if (token.endsWith("es") && /(sh|ch|x|z)es$/.test(token)) return token.slice(0, -2);
  if (token.endsWith("s") && !/(ss|us|is|as)$/.test(token)) return token.slice(0, -1);
  return token;
}

function normalize(raw: string): string {
  let s = raw.toLowerCase().replace(/['’]/g, "");
  s = s.replace(/(\d),(\d)/g, "$1$2");
  s = s.replace(/\$/g, "");
  // \u0000 is a deliberate placeholder that keeps decimals such as "2.5" together while
  // other punctuation becomes spaces. Nobody can type it, so it cannot collide.
  s = s.replace(/(\d)\.(\d)/g, "$1\u0000$2");
  // eslint-disable-next-line no-control-regex
  s = s.replace(/[^a-z0-9\u0000]+/g, " ");
  // eslint-disable-next-line no-control-regex
  s = s.replace(/\u0000/g, ".");
  return s.replace(/\s+/g, " ").trim();
}

function tokensOf(raw: string): string[] {
  return normalize(raw)
    .split(" ")
    .filter((t) => t && !STOP.has(t))
    .map(stem);
}

/** One query word (or matched phrase) and every form that counts as a match for it. */
type Group = { word: string; forms: string[]; fuzzy: boolean };

type Query = { groups: Group[]; phrase: string; distress: boolean; best: Set<string> };

const TRIGGERS = CONCEPTS.flatMap((concept) =>
  concept.triggers.map((t) => ({ trigger: normalize(t), concept })),
).sort(
  (a, b) =>
    b.trigger.split(" ").length - a.trigger.split(" ").length ||
    b.trigger.length - a.trigger.length,
);

function conceptGroup(word: string, concept: Concept): Group {
  const forms = new Set<string>();
  for (const alt of concept.alts) for (const t of tokensOf(alt)) forms.add(t);
  // A one-word trigger also matches itself ("ptsd" finds "PTSD"). A phrase does not add its
  // words one by one: "back pay" must not match every page that says "back".
  if (!word.includes(" ")) for (const t of tokensOf(word)) forms.add(t);
  return { word, forms: [...forms], fuzzy: false };
}

function parseQuery(raw: string): Query {
  let rest = ` ${normalize(raw)} `;
  const groups: Group[] = [];
  let distress = false;
  const best = new Set<string>();
  for (const { trigger, concept } of TRIGGERS) {
    if (!trigger) continue;
    const needle = ` ${trigger} `;
    if (!rest.includes(needle)) continue;
    rest = rest.split(needle).join(" ");
    groups.push(conceptGroup(trigger, concept));
    if (concept.distress) distress = true;
    for (const href of concept.best ?? []) best.add(href);
  }
  for (const token of tokensOf(rest)) {
    groups.push({ word: token, forms: [token], fuzzy: token.length >= 6 && !isNumber(token) });
  }
  // "five points" and "5 points" are the same question.
  const aboutPoints = groups.some((g) => g.forms.includes("point"));
  if (aboutPoints) {
    for (const g of groups) {
      if (g.forms.includes("5") || g.forms.includes("five"))
        g.forms = [...new Set([...g.forms, "5", "five"])];
    }
  }
  const seen = new Set<string>();
  const unique = groups.filter((g) => {
    const key = g.forms.slice().sort().join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return { groups: unique, phrase: normalize(raw), distress, best };
}

/** True when the words suggest someone may be unsafe; the search shows crisis lines first. */
export function isDistressQuery(raw: string): boolean {
  return parseQuery(raw).distress;
}

function isNumber(token: string): boolean {
  return /^\d+(\.\d+)?$/.test(token);
}

function editDistanceAtMost1(a: string, b: string): boolean {
  if (a === b) return true;
  const d = a.length - b.length;
  if (Math.abs(d) > 1) return false;
  let i = 0;
  let j = 0;
  let used = false;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (used) return false;
    used = true;
    if (d === 0) {
      i++;
      j++;
    } else if (d > 0) i++;
    else j++;
  }
  return true;
}

function tokenHits(
  group: Group,
  heading: Set<string>,
  body: Set<string>,
  fuzzyBody: string[],
): 0 | 1 | 2 {
  for (const form of group.forms) {
    if (heading.has(form)) return 2;
  }
  for (const form of group.forms) {
    if (body.has(form)) return 1;
  }
  if (!group.fuzzy) return 0;
  const form = group.forms[0]!;
  for (const candidate of fuzzyBody) {
    if (Math.abs(candidate.length - form.length) > 1) continue;
    if (editDistanceAtMost1(form, candidate)) return 1;
  }
  return 0;
}

function sentenceSnippet(text: string, query: Query): string {
  const parts = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  let best = parts[0] ?? text;
  let bestScore = -1;
  for (const part of parts) {
    const bag = new Set(tokensOf(part));
    const fuzzy = [...bag].filter((t) => t.length >= 5 && !isNumber(t));
    let score = 0;
    for (const group of query.groups) {
      score += tokenHits(group, bag, bag, fuzzy);
    }
    if (score > bestScore) {
      best = part;
      bestScore = score;
    }
  }
  const clean = best.replace(/\s+/g, " ").trim();
  return clean.length > 180 ? `${clean.slice(0, 177)}…` : clean;
}

type Indexed = Section & {
  headingSet: Set<string>;
  bodySet: Set<string>;
  fuzzyBody: string[];
  headingNorm: string;
  bodyNorm: string;
  exactSet: Set<string>;
};

function sectionScore(section: Indexed, query: Query): { score: number; complete: boolean } {
  let matched = 0;
  let headingHits = 0;
  let fuzzy = 0;
  let breadth = 0;
  for (const group of query.groups) {
    const hit = tokenHits(group, section.headingSet, section.bodySet, section.fuzzyBody);
    if (!hit) continue;
    matched++;
    // For a synonym group, a section that uses several of the words is more on-topic than one
    // that uses a single word in passing ("knocked back": appeal, VRB, disagree, review…).
    if (group.forms.length > 1)
      breadth += Math.min(3, group.forms.filter((f) => section.bodySet.has(f)).length - 1);
    if (hit === 2) headingHits++;
    else if (!group.forms.some((f) => section.bodySet.has(f))) fuzzy++;
  }
  const named = section.exactSet.has(query.phrase);
  if (!matched && !named) return { score: 0, complete: false };
  const complete = matched === query.groups.length;
  const phrase = query.phrase;
  let score = matched * 10 + headingHits * 12 + breadth * 4;
  if (complete) score += 100;
  if (phrase.length > 2 && section.headingNorm.includes(phrase)) score += 40;
  else if (phrase.length > 2 && section.bodyNorm.includes(phrase)) score += 20;
  score -= fuzzy * 6;
  if (named) score += 200;
  if (query.best.has(section.href)) score += 60 - 10 * [...query.best].indexOf(section.href);
  return { score, complete: complete || named };
}

const sections: Section[] = [];

function add(section: Section) {
  // [label](url) links read as their label.
  const text = section.text
    .replace(/\[([^\]]+)\]\((?:https?:\/\/|\/)[^)\s]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  if (!text && !section.heading.trim()) return;
  sections.push({ ...section, text });
}

function blockPlain(block: (typeof guides)[number]["blocks"][number]): string {
  switch (block.type) {
    case "p":
    case "h3":
      return block.text;
    case "ul":
    case "ol":
      return block.items.join(". ");
    case "callout":
      return `${block.title}. ${block.text}`;
    case "steps":
      return block.items.map((s) => `${s.title}. ${s.text}`).join(" ");
    case "quote":
      return block.text;
    case "prompt":
      return `${block.title}. ${block.text}`;
    default:
      return "";
  }
}

for (const guide of guides) {
  const chunks: { heading: string; id?: string; bits: string[] }[] = [
    { heading: guide.title, bits: [guide.summary, guide.tags.join(" "), guide.category] },
  ];
  for (const block of guide.blocks) {
    if (block.type === "h3") {
      chunks.push({ heading: block.text, id: block.id ?? headingSlug(block.text), bits: [] });
      continue;
    }
    chunks[chunks.length - 1]!.bits.push(blockPlain(block));
  }
  chunks[0]!.bits.push(...guide.officialLinks.map((l) => l.label));
  const seen = new Set<string>();
  for (const chunk of chunks) {
    let id = chunk.id;
    if (id) {
      if (seen.has(id)) id = `${id}-2`;
      seen.add(id);
    }
    add({
      href: id ? `/guides/${guide.slug}#${id}` : `/guides/${guide.slug}`,
      title: chunk.heading,
      kind: "Guide",
      where: chunk.heading === guide.title ? undefined : guide.title,
      heading: chunk.heading,
      text: `${chunk.bits.join(" ")} ${guide.title}`,
    });
  }
}

for (const playbook of playbooks) {
  add({
    href: `/playbooks/${playbook.slug}`,
    title: playbook.title,
    kind: "Playbook",
    heading: playbook.title,
    text: `${playbook.summary} ${playbook.when} ${playbook.watchOuts.join(" ")}`,
  });
  playbook.steps.forEach((step, i) => {
    add({
      href: `/playbooks/${playbook.slug}#step-${i + 1}`,
      title: step.title,
      kind: "Playbook",
      where: playbook.title,
      heading: step.title,
      text: `${step.detail} ${step.doneHint ?? ""}`,
    });
  });
}

for (const letter of letters) {
  add({
    href: `/letters/${letter.slug}`,
    title: letter.title,
    kind: "Letter",
    heading: letter.title,
    text: `${letter.summary} To: ${letter.to}. ${letter.fields.map((f) => f.label).join(". ")}`,
  });
}

for (const entry of glossary) {
  add({
    href: `/glossary#${encodeURIComponent(entry.term)}`,
    title: entry.term,
    kind: "Glossary",
    heading: `${entry.term} ${entry.aka?.join(" ") ?? ""}`,
    text: entry.definition,
  });
}

for (const clock of clocks) {
  add({
    href: "/deadlines",
    title: clock.label,
    kind: "Page",
    where: "What clock am I on?",
    heading: clock.label,
    text: `${clock.windowAmount} ${clock.windowUnit} from ${clock.runsFrom}. ${clock.note}`,
  });
}

for (const person of officeHolders) {
  add({
    href: "/people",
    title: person.name,
    kind: "Page",
    where: "Ministers and Commission",
    heading: `${person.name} ${person.role}`,
    text: person.note,
  });
}

for (const form of officialForms) {
  const guide =
    form.id === "D9319" || form.id === "D1351"
      ? "/guides/household-services"
      : form.id === "D8601" || form.id === "foi-webform" || form.id === "pir-webform"
        ? "/guides/foi"
        : form.id === "mepi-webform"
          ? "/guides/allied-health"
          : "/contacts";
  add({
    href: guide,
    title: form.title,
    kind: "Guide",
    where: "Form",
    heading: `${form.id} ${form.aliases.join(" ")} ${form.title}`,
    text: form.aliases.join(" "),
  });
}

for (const line of crisisLines) {
  const digits = line.phone.replace(/\D/g, "");
  add({
    href: "/contacts",
    title: line.name,
    kind: "Page",
    where: "Contacts",
    heading: `${line.name} ${line.phone} ${digits}`,
    text: line.note,
  });
}

for (const resource of resources) {
  const internal = /household|d9319|attendant|d1351/i.test(resource.name)
    ? "/guides/household-services"
    : /foi|pir|d8601|information access/i.test(resource.name)
      ? "/guides/foi"
      : /mepi|d1181/i.test(resource.name)
        ? "/guides/allied-health"
        : /acute support/i.test(resource.name)
          ? "/guides/hardship-asp"
          : /allied health/i.test(resource.name)
            ? "/guides/allied-health"
            : /review board|vrb/i.test(resource.name)
              ? "/guides/appeals-vrb-art"
              : /administrative review|art\.gov/i.test(resource.name)
                ? "/guides/appeals-vrb-art"
                : /home care/i.test(resource.name)
                  ? "/guides/household-services"
                  : "/contacts";
  add({
    href: internal,
    title: resource.name,
    kind: "Page",
    where: "Contacts",
    heading: resource.name,
    text: resource.note,
  });
}

add({
  href: "/calculator",
  title: "Whole-person impairment calculator",
  kind: "Page",
  heading: "WPI calculator impairment points Gold Card 44 and 40",
  text: `44 and 40 combine to 66, not 84. Combined values, highest first, not simple addition. ${THRESHOLDS.map((t) => `${t.label}. ${t.note}`).join(" ")} ${BODY_SYSTEMS.map((b) => b.label).join(" ")} Hearing tinnitus spine knee psychiatric.`,
});

add({
  href: "/transition#baseline",
  title: "The baseline, and the five-point gate",
  kind: "Page",
  where: "What changed on 1 July 2026",
  heading: "baseline five-point gate Chapter 26 GARP M",
  text: "A worsening is measured from a GARP M baseline. Further MRCA permanent impairment needs a new condition or at least five impairment points above that baseline. 5 points.",
});

add({
  href: "/transition#liability",
  title: "Liability and impairment are two claims",
  kind: "Page",
  where: "What changed on 1 July 2026",
  heading: "liability claim impairment claim separate lodgement dates",
  text: "A liability claim and a permanent impairment claim have separate numbers and separate lodgement dates. Which Guide applies to a later impairment claim on an earlier DRCA liability is not settled.",
});

add({
  href: "/transition#srdp",
  title: "SRDP — eligibility and election are not the same",
  kind: "Page",
  where: "What changed on 1 July 2026",
  heading: "SRDP eligibility election TPI Gold Card",
  text: "Being eligible for the Special Rate Disability Pension is not the same as choosing the payment. Election is 12 months from the written offer and irreversible.",
});

add({
  href: "/transition#redemption",
  title: "Payment rates",
  kind: "Page",
  where: "What changed on 1 July 2026",
  heading: `rates redemption ${rates.redemptionWeekly} household ${rates.hhsWeekly} attendant ${rates.attendantWeekly} SRDP ${rates.srdpWeekly}`,
  text: `${ratesWindowSentence()}. Redemption ceiling ${rates.redemptionWeekly} a week. Household services ${rates.hhsWeekly}. Attendant care ${rates.attendantWeekly}. SRDP ${rates.srdpWeekly}. PI weekly ${rates.piWeekly}. Section 80 lump sum ${rates.s80Lump}. Financial advice cap ${rates.adviceCap}.`,
});

for (const stream of processingTimes.streams) {
  add({
    href: "/",
    title: stream.type,
    kind: "Page",
    where: "Processing times",
    heading: `${stream.type} processing time wait`,
    text: `Average ${stream.processDays ?? "unpublished"} days to process. As at ${processingTimes.asAt}. Page updated ${processingTimes.pageUpdated}. These are averages, not a promise.`,
  });
}

for (const result of Object.values(pathResults)) {
  add({
    href: "/pathfinder",
    title: result.title,
    kind: "Page",
    where: "Pathfinder",
    heading: result.title,
    text: `${result.summary} ${result.doNow.join(" ")} ${result.caution}`,
  });
}

// The site's own pages, worded the way people look for them.
const PAGES: Omit<Section, "kind">[] = [
  {
    href: "/",
    title: "Home",
    heading: "Home Veteran Assist start",
    text: "Independent DVA field guide for Australian veterans. Pick what is happening: new to DVA, waiting on a claim, a decision you disagree with, money is tight. DVA processing times.",
  },
  {
    href: "/pathfinder",
    exact: ["pathfinder", "next steps", "what do i do"],
    title: "Pathfinder",
    heading: "Pathfinder what do I do next steps",
    text: "Answer a few questions about what is happening and get the next steps in order. Waiting on a claim, a decision you disagree with, money is tight, getting your file, restricted contact, abuse in service.",
  },
  {
    href: "/deadlines",
    exact: [
      "deadline",
      "deadlines",
      "time limit",
      "time limits",
      "due date",
      "clock",
      "how long to appeal",
    ],
    title: "Deadlines: what clock am I on?",
    heading: "Deadlines time limit clock due date how long to appeal",
    text: "Count the review window from your decision letter. VRB 12 months, ART 3 months after the VRB, FOI and Information Commissioner time limits, SRDP election. Three months is not 90 days.",
  },
  {
    href: "/transition",
    exact: ["what changed", "july changes", "transition", "1 july", "1 july 2026", "vets act"],
    title: "What changed on 1 July 2026",
    heading: "What changed 1 July 2026 VETS Act transition changes new law",
    text: "DRCA and VEA closed to new claims. New claims go under the improved MRCA. GARP M 2026, the baseline and five-point gate, liability and impairment claims, redemption ceiling, SRDP eligibility and election, household services and attendant care for VEA veterans.",
  },
  {
    href: "/transition#before-you-act",
    title: "Before you act on a 1 July change",
    where: "What changed on 1 July 2026",
    heading: "before you act",
    text: "Get the calculation in writing, check which Act and which Guide apply, and talk to an advocate before you withdraw, re-lodge or elect.",
  },
  {
    href: "/transition#withdrew",
    title: "If a claim was withdrawn before 1 July 2026",
    where: "What changed on 1 July 2026",
    heading: "withdrew withdrawn claim re-lodge relodge",
    text: "If a condition was withdrawn before 1 July 2026, ask which Act and which Guide apply before you re-lodge.",
  },
  {
    href: "/calculator",
    exact: ["calculator", "impairment calculator", "wpi calculator", "points calculator"],
    title: "Impairment calculator",
    heading: "impairment calculator WPI points combine combined values",
    text: "Combine impairment points the way DVA does, highest first, not simple addition. Distance to the 60-point Gold Card and other thresholds.",
  },
  {
    href: "/guides",
    exact: ["guides", "guide", "all guides"],
    title: "All guides",
    heading: "guides guide list all topics read",
    text: "Every plain-English guide: claims, delays, hardship, medical evidence, impairment, incapacity, appeals, CDDA, FOI, Ombudsman, contact restrictions, household services, advocates, abuse support, presumptive liability, allied health, using AI.",
  },
  {
    href: "/playbooks",
    exact: ["playbooks", "playbook"],
    title: "Playbooks",
    heading: "playbooks step by step what to do",
    text: "Step-by-step plans for common problems: claim gone quiet, need my file, need money now, disagree with a decision, DVA wants more medical evidence, restricted contact, household help, CDDA.",
  },
  {
    href: "/letters",
    exact: ["letters", "letter", "templates", "letter templates"],
    title: "Letter templates",
    heading: "letters letter template templates write to DVA",
    text: "Copy-ready letters you fill in and send yourself: expedition, follow-up, FOI request, internal review, Ombudsman complaint, CDDA application, written reasons, specialist brief, household services, VRB holding application, SRDP election.",
  },
  {
    href: "/call-sheet",
    exact: [
      "call sheet",
      "calling dva",
      "call log",
      "ring dva",
      "ringing dva",
      "what to ask dva",
      "what to ask dva on the phone",
      "dva phone call",
      "phone call notes",
      "dva phone call notes",
      "call notes",
      "position number",
      "call reference",
    ],
    title: "DVA call sheet",
    heading: "call sheet phone call checklist questions reference number log print",
    text: "Printable sheet for a DVA phone call. One claim, questions in order, and a log you fill in by hand. A phone promise is not a decision.",
  },
  {
    href: "/forms",
    exact: ["forms", "form", "download form", "dva forms", "official forms"],
    title: "Official forms",
    heading:
      "forms form download D9319 D1351 D8601 D3057 D1360 D0800 D9325 D9378 MEPI FOI PIR travel claim travelling expenses",
    text: "Official DVA forms the site mentions. PDFs and webforms open on DVA's site. Incapacity payments, travel costs (D0800), appointing a helper, partner consent, household services, attendant care, information access, Gold Card for age 70, MEPI, FOI and personal information.",
  },
  {
    href: "/contacts",
    exact: ["contacts", "contact", "phone numbers", "1800 veteran", "dva phone number"],
    title: "Contacts and official links",
    heading: "contacts contact phone numbers official links forms DVA phone",
    text: "1800 VETERAN (1800 838 372), Open Arms 1800 011 046, crisis lines, MyService, DVA forms and official pages.",
  },
  {
    href: "/people",
    exact: ["ministers", "minister", "commission", "people"],
    title: "Ministers and Commission",
    heading: "minister shadow minister commission commissioners people who is who",
    text: "The Minister for Veterans' Affairs, the shadow minister, the DVA Secretary and the Repatriation Commission.",
  },
  {
    href: "/postcode",
    exact: ["postcode", "local support", "near me", "find local support"],
    title: "Find local support",
    heading:
      "postcode local support near me local member MP senator advocate RSL Veterans and Families Hub",
    text: "Enter a postcode to find your federal and state members of parliament, senators, advocates on the register, RSL, Legacy, Veterans' and Families Hubs, Open Arms centres and council.",
  },
  {
    href: "/glossary",
    exact: ["glossary", "acronyms", "jargon", "meanings"],
    title: "Glossary",
    heading: "glossary acronyms meaning what does it mean jargon",
    text: "Plain-English meanings of DVA terms and acronyms: MRCA, DRCA, VEA, SRDP, TPI, GARP M, WPI, NLHC, VRB, ART, FOI, PIR, CDDA, SPOC, ASP.",
  },
  {
    href: "/file",
    exact: ["my file", "claim tracker", "tracker"],
    title: "My file",
    heading: "My file claim tracker track my claims notes",
    text: "Track your claims and contact with DVA in this browser only. Nothing is stored on our servers.",
  },
  {
    href: "/feedback",
    exact: ["feedback", "report a mistake", "suggestion"],
    title: "Feedback",
    heading: "feedback report a mistake wrong out of date suggestion",
    text: "Tell us if a page is wrong, out of date, missing something or hard to follow. Do not include your name or claim number.",
  },
  {
    href: "/about",
    exact: ["about", "about us", "about this site", "who made this"],
    title: "About Veteran Assist",
    heading: "about who made this why this exists independent not DVA",
    text: "Built by an Australian veteran for veterans. Independent of DVA and Defence. Not a lawyer, not an ATDP practice, not legal, financial or clinical advice.",
  },
  {
    href: "/changes",
    exact: ["recent changes", "older changes", "site changes", "changelog"],
    title: "Recent changes",
    heading: "recent changes older changes updates to this site",
    text: "The full list of changes to this site, newest first. The front page shows the latest five.",
  },
  {
    href: "/privacy",
    exact: ["privacy", "privacy policy"],
    title: "Privacy",
    heading: "privacy data personal information what is stored delete",
    text: "What this site stores and what stays in your browser. Feedback notes, anonymous visit counts, no tracking cookies, how to ask for deletion.",
  },
  {
    href: "/terms",
    exact: ["terms", "terms of use", "disclaimer", "conditions"],
    title: "Terms of use",
    heading: "terms of use conditions disclaimer legal advice",
    text: "Not legal, financial or clinical advice. You remain responsible for your claim. The official page wins.",
  },
  {
    href: "/hosting",
    exact: ["hosting", "donate", "donation", "payid"],
    title: "Hosting this month",
    heading: "hosting PayID chip in donate",
    text: "Optional contribution toward hosting. Not a donation, not a charity, not tax deductible.",
  },
];

for (const page of PAGES) add({ ...page, kind: "Page" });

const INDEX: Indexed[] = sections.map((section) => {
  const bodySet = new Set(tokensOf(`${section.heading} ${section.text}`));
  return {
    ...section,
    headingSet: new Set(tokensOf(section.heading)),
    bodySet,
    fuzzyBody: [...bodySet].filter((t) => t.length >= 5 && !isNumber(t)),
    headingNorm: normalize(section.heading),
    bodyNorm: normalize(`${section.heading} ${section.text}`),
    exactSet: new Set((section.exact ?? []).map(normalize)),
  };
});

const CRISIS_HITS: SearchHit[] = [
  {
    href: "tel:000",
    title: "Emergency — 000",
    kind: "Page",
    where: "If you are in immediate danger",
    snippet: "Call 000 now.",
  },
  {
    href: "tel:1800011046",
    title: "Open Arms — 1800 011 046",
    kind: "Page",
    where: "24/7, free, for veterans and families",
    snippet: "Counselling that understands military service. Call any time.",
  },
  {
    href: "tel:131114",
    title: "Lifeline — 13 11 14",
    kind: "Page",
    where: "24/7 crisis support",
    snippet: "Talk to someone now.",
  },
];

export function searchContent(q: string, limit = 10): SearchHit[] {
  const query = parseQuery(q);
  if (!query.groups.length) return [];
  const ranked = INDEX.map((section) => ({ section, ...sectionScore(section, query) })).filter(
    (row) => row.score > 0,
  );
  const complete = ranked.filter((row) => row.complete);
  const pool = (complete.length ? complete : ranked).sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  const hits: SearchHit[] = query.distress ? CRISIS_HITS.slice() : [];
  for (const hit of hits) seen.add(hit.href);
  for (const row of pool) {
    if (hits.length >= limit) break;
    if (seen.has(row.section.href)) continue;
    seen.add(row.section.href);
    hits.push({
      href: row.section.href,
      title: row.section.title,
      kind: row.section.kind,
      where: row.section.where,
      snippet: sentenceSnippet(row.section.text || row.section.heading, query),
    });
  }
  return hits;
}
