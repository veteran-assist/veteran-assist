export type OfficialForm = {
  id: string;
  /** DVA's form number, when the form has one. Never an internal label. */
  number?: string;
  /** What it is for, in plain words. Shown first, for people who do not know form numbers. */
  task: string;
  aliases: string[];
  title: string;
  href: string;
  kind: "pdf" | "web";
};

export const officialForms: OfficialForm[] = [
  {
    id: "D2051",
    number: "D2051",
    task: "Lodge a new MRCA claim or reassessment on paper. Not if an advocate is helping: they must lodge it online in MyService",
    aliases: ["Form D2051", "form D2051", "D2051", "liability claim form", "MRCA claim form"],
    title: "Claim for Liability and/or Reassessment of Compensation",
    href: "https://www.dva.gov.au/sites/default/files/2021-08/d2051.pdf",
    kind: "pdf",
  },
  {
    id: "D2049",
    number: "D2049",
    task: "Details sheet for each condition on a D2051 claim",
    aliases: ["Form D2049", "form D2049", "D2049", "injury details sheet"],
    title: "Injury or Disease Details Sheet",
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d2049.pdf",
    kind: "pdf",
  },
  {
    id: "D0503",
    number: "D0503",
    task: "Apply for Service Pension (eligibility)",
    aliases: ["Form D0503", "form D0503", "D0503", "service pension form"],
    title: "Claim for Service Pension — Part A Eligibility",
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d0503.pdf",
    kind: "pdf",
  },
  {
    id: "D0504",
    number: "D0504",
    task: "Partner or widow(er) Service Pension claim",
    aliases: ["Form D0504", "form D0504", "D0504", "partner pension form"],
    title: "Claim for a Service Pension by a Partner, a former Partner or Widow or Widower",
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d0504_0.pdf",
    kind: "pdf",
  },
  {
    id: "D0507",
    number: "D0507",
    task: "Establish qualifying service (Commonwealth or Allied veteran)",
    aliases: ["Form D0507", "form D0507", "D0507", "qualifying service form"],
    title: "Claim to Determine Qualifying Service by a Commonwealth or Allied Veteran",
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d0507.pdf",
    kind: "pdf",
  },
  {
    id: "D3057",
    number: "D3057",
    task: "Gold Card at age 70 with qualifying service",
    aliases: ["Form D3057", "form D3057", "D3057"],
    title: "Apply for a Gold Card (age 70 with qualifying service)",
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d3057.pdf",
    kind: "pdf",
  },
  {
    id: "D1360",
    number: "D1360",
    task: "Claim incapacity payments (you cannot work, or can work less)",
    aliases: ["Form D1360", "form D1360", "D1360"],
    title: "Claim for Incapacity for Service/Work",
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d1360.pdf",
    kind: "pdf",
  },
  {
    id: "ability-to-work",
    task: "Doctor’s certificate for incapacity payments",
    aliases: ["Medical Certification – Ability to Work", "Ability to Work certificate"],
    title: "Medical Certification – Ability to Work",
    href: "https://www.dva.gov.au/sites/default/files/2025-02/DVA%20Medical%20Certification%20-%20Ability%20to%20Work.pdf",
    kind: "pdf",
  },
  {
    id: "D0800",
    number: "D0800",
    task: "Claim travel costs for treatment or a claim",
    aliases: ["Form D0800", "form D0800", "D0800", "D800"],
    title: "Claim for Travelling Expenses",
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d0800.pdf",
    kind: "pdf",
  },
  {
    id: "D9325",
    number: "D9325",
    task: "Appoint someone to help with your DVA business",
    aliases: ["Form D9325", "form D9325", "D9325"],
    title: "Appoint a third party to represent a DVA client",
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d9325.pdf",
    kind: "pdf",
  },
  {
    id: "D9378",
    number: "D9378",
    task: "Couples: consent to share information with your partner",
    aliases: ["Form D9378", "form D9378", "D9378"],
    title: "Partner Declaration and Consent",
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d9378.pdf",
    kind: "pdf",
  },
  {
    id: "D9319",
    number: "D9319",
    task: "Claim household services",
    aliases: ["Form D9319", "form D9319", "D9319"],
    title: "Claim for Household Services",
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d9319.pdf",
    kind: "pdf",
  },
  {
    id: "D1351",
    number: "D1351",
    task: "Claim attendant care",
    aliases: ["Form D1351", "form D1351", "D1351"],
    title: "Attendant Care Services Claim Form",
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d1351.pdf",
    kind: "pdf",
  },
  {
    id: "D0307",
    number: "D0307",
    task: "Claim the one-off funeral benefit",
    aliases: ["Form D0307", "form D0307", "D0307", "funeral benefit form", "funeral claim"],
    title: "Claim for Funeral Benefit",
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d0307.pdf",
    kind: "pdf",
  },
  {
    id: "D2053",
    number: "D2053",
    task: "Claim compensation or funeral costs for dependants after a death",
    aliases: ["Form D2053", "form D2053", "D2053", "dependants claim"],
    title: "Claim for Compensation for Dependants of Deceased Members",
    href: "https://www.dva.gov.au/sites/default/files/2023-01/d2053_0.pdf",
    kind: "pdf",
  },
  {
    id: "D8601",
    number: "D8601",
    task: "Ask for your DVA file (paper form)",
    aliases: ["Form D8601", "form D8601", "D8601"],
    title: "Information Access Application",
    href: "https://www.dva.gov.au/sites/default/files/2023-10/d8601.pdf",
    kind: "pdf",
  },
  {
    id: "foi-webform",
    task: "Ask for your DVA file (FOI, online)",
    aliases: ["DVA FOI webform", "FOI webform"],
    title: "DVA FOI request",
    href: "https://www.dva.gov.au/node/22523",
    kind: "web",
  },
  {
    id: "pir-webform",
    task: "Ask for your personal information (online)",
    aliases: ["PIR webform", "DVA PIR webform"],
    title: "Personal Information Request",
    href: "https://www.dva.gov.au/personal-information-request-form",
    kind: "web",
  },
  {
    id: "feedback-form",
    task: "Complain about DVA, or give feedback",
    aliases: ["DVA feedback form"],
    title: "DVA feedback / complaints",
    href: "https://www.dva.gov.au/about-us/contact-us/feedback-form/feedback",
    kind: "web",
  },
  {
    id: "D1328",
    number: "D1328",
    task: "Provider form: ask DVA to approve a treatment before it is given",
    aliases: ["Form D1328", "form D1328", "D1328"],
    title: "Treatment Prior Financial Approval Request",
    href: "https://www.dva.gov.au/node/12054",
    kind: "web",
  },
  {
    id: "D0986",
    number: "D0986",
    task: "Provider form: dental prior approval",
    aliases: ["Form D0986", "form D0986", "D0986", "dental prior approval"],
    title: "Dental Request for Prior Approval",
    href: "https://www.dva.gov.au/node/12057",
    kind: "web",
  },
  {
    id: "D9398",
    number: "D9398",
    task: "Provider form: audiology prior approval",
    aliases: ["Form D9398", "form D9398", "D9398", "audiology prior approval"],
    title: "Audiology Prior Financial Approval Request",
    href: "https://www.dva.gov.au/node/20294",
    kind: "web",
  },
  {
    id: "D9292",
    number: "D9292",
    task: "Provider form: medical imaging prior approval",
    aliases: ["Form D9292", "form D9292", "D9292", "imaging prior approval"],
    title: "Medical Imaging Prior Financial Authorisation",
    href: "https://www.dva.gov.au/node/13153",
    kind: "web",
  },
  {
    id: "mepi-webform",
    task: "Get back money you paid for treatment your card should have covered",
    aliases: ["MEPI webform", "MEPI", "D1181", "Form D1181"],
    title: "MEPI — reimbursement of privately incurred medical expenses",
    href: "https://www.dva.gov.au/node/23260",
    kind: "web",
  },
];

const byAlias = officialForms
  .flatMap((form) => form.aliases.map((alias) => ({ alias, form })))
  .sort((a, b) => b.alias.length - a.alias.length);

export const formAliasPattern = byAlias
  .map(({ alias }) => {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return `\\b${escaped}\\b`;
  })
  .join("|");

export function formHrefFor(raw: string): string | undefined {
  const needle = raw.trim();
  const hit = byAlias.find(({ alias }) => alias.toLowerCase() === needle.toLowerCase());
  return hit?.form.href;
}

export function formsById(ids: string[]): OfficialForm[] {
  return ids
    .map((id) => officialForms.find((form) => form.id === id))
    .filter((form): form is OfficialForm => Boolean(form));
}
