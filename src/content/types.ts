export type CalloutTone = "info" | "warn" | "crisis" | "action";

export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; tone: CalloutTone; title: string; text: string }
  | { type: "steps"; items: { title: string; text: string }[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "prompt"; title: string; text: string };

export type OfficialLink = { label: string; href: string };

export type Guide = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  updated: string;
  lastChecked?: string;
  tags: string[];
  related: string[];
  officialLinks: OfficialLink[];
  blocks: ContentBlock[];
};

export type Playbook = {
  slug: string;
  title: string;
  summary: string;
  when: string;
  minutes: string;
  relatedGuides: string[];
  relatedLetters: string[];
  steps: { title: string; detail: string; doneHint?: string }[];
  watchOuts: string[];
};

export type LetterField = {
  key: string;
  label: string;
  placeholder: string;
  multiline?: boolean;
  required?: boolean;
};

export type LetterTemplate = {
  slug: string;
  title: string;
  summary: string;
  to: string;
  relatedGuides: string[];
  fields: LetterField[];
  build: (values: Record<string, string>) => string;
};

export type GlossaryEntry = {
  term: string;
  aka?: string[];
  definition: string;
  see?: string[];
};

export type ResourceLink = {
  name: string;
  href: string;
  note: string;
  kind: "official" | "crisis" | "advocate" | "review" | "info";
};

export type PathNode = {
  id: string;
  question: string;
  help?: string;
  options: { id: string; label: string; next: string; group?: string }[];
};

export type PathResult = {
  id: string;
  title: string;
  summary: string;
  doNow: string[];
  then: string[];
  guides: string[];
  playbooks: string[];
  letters: string[];
  contacts: string[];
  caution: string;
};
