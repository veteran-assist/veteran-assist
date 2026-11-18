import type { LetterTemplate } from "./types";

function v(values: Record<string, string>, key: string, fallback = "[to complete]") {
  const raw = values[key]?.trim();
  return raw ? raw : fallback;
}

export const letters: LetterTemplate[] = [
  {
    slug: "expedition",
    title: "Request for expedition / priority action",
    summary: "Ask DVA to action a flagged or hardship claim, with dates and evidence, in a form that later supports CDDA.",
    to: "Your DVA delegate or team mailbox, copied to yourself",
    relatedGuides: ["delays", "hardship-asp"],
    fields: [
      { key: "fullName", label: "Your full name", placeholder: "Alex Taylor", required: true },
      { key: "fileNo", label: "DVA file / client number", placeholder: "NSM… or client number" },
      { key: "claimNo", label: "Claim number", placeholder: "ILC / SPI / ASP / INC…", required: true },
      { key: "claimType", label: "What the claim is for", placeholder: "e.g. hardship / ASP / incapacity / PI" },
      { key: "lodged", label: "Date lodged", placeholder: "3 February 2026" },
      { key: "flagged", label: "Date flagged for expedition (if any)", placeholder: "10 February 2026" },
      { key: "delegate", label: "Delegate or team (if known)", placeholder: "Name or position number" },
      { key: "harm", label: "What the delay is doing now", placeholder: "Unpaid invoices, housing, children, medical…", multiline: true, required: true },
      { key: "ask", label: "The decision you need", placeholder: "Determine the ASP request / pay incapacity from [date]…" },
    ],
    build: (values) => `Dear Delegate${v(values, "delegate", "") ? ` (${v(values, "delegate")})` : ""},

I am writing about claim ${v(values, "claimNo")} (${v(values, "claimType", "compensation / support")}), lodged ${v(values, "lodged", "[date]")}${v(values, "flagged", "") !== "[to complete]" ? `, flagged for expedition on ${v(values, "flagged")}` : ""}.

Client name: ${v(values, "fullName")}
File / client number: ${v(values, "fileNo", "as per MyService")}

I request that this claim be actioned as a priority.

Why it cannot wait
${v(values, "harm")}

I have attached supporting documents. I ask that you:

1. Confirm, in writing, what (if anything) is outstanding from me.
2. Confirm the next action DVA will take, and a date for that action.
3. ${v(values, "ask", "Determine the claim.")}

If the file cannot be actioned because of a backlog, please say so in writing and still give a date. If it was flagged for expedition, please explain how that flag was applied.

I am happy to receive the reply by email.

Yours faithfully
${v(values, "fullName")}
`,
  },
  {
    slug: "follow-up",
    title: "Follow-up on unanswered correspondence",
    summary: "A second (or third) chase that records the silence without sounding like a barrage.",
    to: "The same contact as the last letter",
    relatedGuides: ["delays", "contact-restrictions"],
    fields: [
      { key: "fullName", label: "Your full name", placeholder: "Alex Taylor", required: true },
      { key: "claimNo", label: "Claim number", placeholder: "ILC / SPI / ASP…", required: true },
      { key: "priorDate", label: "Date of your last letter or call", placeholder: "1 March 2026", required: true },
      { key: "priorAsk", label: "What you asked then", placeholder: "Status and outstanding items", multiline: true },
      { key: "days", label: "Business days with no substantive reply", placeholder: "10" },
    ],
    build: (values) => `Dear Delegate,

This is a follow-up to my correspondence of ${v(values, "priorDate")} about claim ${v(values, "claimNo")}.

I asked:
${v(values, "priorAsk")}

I have not had a substantive reply in ${v(values, "days", "10")} business days. Please respond in writing with:

1. Current status of the claim.
2. Anything outstanding from me.
3. The next DVA action and a date.

I will not send further chaser emails this fortnight other than this letter, so that the file stays readable.

Yours faithfully
${v(values, "fullName")}
`,
  },
  {
    slug: "foi-request",
    title: "FOI / personal information request",
    summary: "A scoped request for the file, notes, call recordings, and the documents behind a SPOC or delay.",
    to: "Information.Access@dva.gov.au or the DVA FOI webform",
    relatedGuides: ["foi", "contact-restrictions", "cdda"],
    fields: [
      { key: "fullName", label: "Your full name", placeholder: "Alex Taylor", required: true },
      { key: "dob", label: "Date of birth", placeholder: "DD/MM/YYYY" },
      { key: "fileNo", label: "DVA file / client number", placeholder: "NSM…" },
      { key: "phone", label: "Phone number (for call recordings)", placeholder: "04xx xxx xxx" },
      { key: "from", label: "Date range from", placeholder: "1 January 2023" },
      { key: "to", label: "Date range to", placeholder: "today" },
      { key: "claims", label: "Claim numbers to include", placeholder: "list them", multiline: true },
      { key: "extra", label: "Anything extra (SPOC file, offset advice, expedition policy)", placeholder: "optional", multiline: true },
    ],
    build: (values) => `Information Access Unit
Department of Veterans’ Affairs
GPO Box 9998
Brisbane QLD 4001
Information.Access@dva.gov.au

Freedom of Information Act 1982 — request for documents / personal information

Name: ${v(values, "fullName")}
Date of birth: ${v(values, "dob")}
DVA file / client number: ${v(values, "fileNo")}
Contact phone: ${v(values, "phone")}

I request access to the following documents for the period ${v(values, "from")} to ${v(values, "to")}:

1. The complete claim files, including file notes, emails, attachments, and briefs, for:
${v(values, "claims")}

2. Call recordings and associated metadata for calls involving ${v(values, "phone", "my number")} in that period.

3. Documents recording the names and position numbers of officers who actioned those files in that period.

4. Any document recording a single point of contact, communication plan, challenging behaviour protocol, or mutually respectful behaviour arrangement that applies to me, and the documents considered in making that arrangement.

${v(values, "extra", "") ? `5. ${v(values, "extra")}` : ""}

I am the person the documents are about. Please treat this as a request for my personal information (including any administrative / PIR pathway) as well as a request under the Freedom of Information Act 1982. I am willing to receive documents electronically. I can provide proof of identity.

Please acknowledge an FOI request within 14 days and decide within the statutory period. If you intend to transfer, consult, charge, or extend, please tell me in writing.

Yours faithfully
${v(values, "fullName")}
`,
  },
  {
    slug: "foi-internal-review",
    title: "FOI internal review",
    summary: "Ask another DVA officer to remake an FOI decision that refused, delayed, or over-redacted your file.",
    to: "Information.Access@dva.gov.au",
    relatedGuides: ["foi", "delays"],
    fields: [
      { key: "fullName", label: "Your full name", placeholder: "Alex Taylor", required: true },
      { key: "fileNo", label: "DVA file / client number", placeholder: "NSM…" },
      { key: "ref", label: "FOI reference on the decision letter", placeholder: "as on the letter", required: true },
      { key: "dated", label: "Date of the FOI decision", placeholder: "DD/MM/YYYY", required: true },
      { key: "problem", label: "What is wrong with the decision", placeholder: "refused / no decision in time / over-redacted / charges", required: true, multiline: true },
      { key: "want", label: "What you still need released", placeholder: "file notes, recordings, …", multiline: true },
    ],
    build: (values) => `Information Access Unit
Department of Veterans’ Affairs
GPO Box 9998
Brisbane QLD 4001
Information.Access@dva.gov.au

Freedom of Information Act 1982 — request for internal review

Name: ${v(values, "fullName")}
DVA file / client number: ${v(values, "fileNo")}
FOI reference: ${v(values, "ref")}
Decision dated: ${v(values, "dated")}

I request internal review of the FOI decision identified above.

The decision is wrong, incomplete, or out of time because:
${v(values, "problem")}

I still seek access to:
${v(values, "want")}

Please have a different officer remake the decision within 30 days. Please send the internal review decision and any further documents electronically.

If DVA does not decide this internal review in time, I intend to apply to the Australian Information Commissioner for IC review.

Yours faithfully
${v(values, "fullName")}
`,
  },
  {
    slug: "ombudsman",
    title: "Commonwealth Ombudsman complaint",
    summary: "A scoped investigation request about delay, expedition, or communication — not a second merits appeal.",
    to: "Commonwealth Ombudsman (online complaint form)",
    relatedGuides: ["ombudsman", "delays"],
    fields: [
      { key: "fullName", label: "Your full name", placeholder: "Alex Taylor", required: true },
      { key: "claimNo", label: "Main claim number(s)", placeholder: "…", required: true },
      { key: "lodged", label: "Date lodged", placeholder: "…" },
      { key: "dvaComplaint", label: "What you already asked DVA to do, and when", placeholder: "Complaint date and outcome", multiline: true, required: true },
      { key: "problem", label: "What went wrong (facts, dates)", placeholder: "timeline", multiline: true, required: true },
      { key: "questions", label: "Questions you want investigated", placeholder: "e.g. how was the expedition flag applied?", multiline: true },
      { key: "outcome", label: "What you want", placeholder: "A decision by [date]; an explanation; CDDA referral", multiline: true },
    ],
    build: (values) => `Complaint about the Department of Veterans’ Affairs

Name: ${v(values, "fullName")}
Claim number(s): ${v(values, "claimNo")}
Lodged: ${v(values, "lodged")}

Agency complaint already made
${v(values, "dvaComplaint")}

What happened
${v(values, "problem")}

I ask the Ombudsman to investigate the following:
${v(values, "questions", "Whether DVA’s handling of this claim was unreasonable, including delay after any expedition flag, and whether communication restrictions (if any) were appropriate and reviewed.")}

Outcome sought
${v(values, "outcome")}

I attach a timeline and key letters. This complaint is about administration. I understand the Ombudsman does not replace the Veterans’ Review Board on the merits of a rating.

${v(values, "fullName")}
`,
  },
  {
    slug: "cdda-application",
    title: "CDDA application to DVA",
    summary: "A skeleton that maps facts to RMG 409 and forces a quantum table. Replace every placeholder with documents.",
    to: "DVA (CDDA / legal / the address on DVA’s CDDA information)",
    relatedGuides: ["cdda", "delays"],
    fields: [
      { key: "fullName", label: "Your full name", placeholder: "Alex Taylor", required: true },
      { key: "fileNo", label: "DVA file / client number", placeholder: "…" },
      { key: "incidents", label: "Incidents (dates + what happened)", placeholder: "One paragraph per incident", multiline: true, required: true },
      { key: "rmg", label: "Which RMG 409 categories you rely on", placeholder: "e.g. unreasonable lapse in procedures (expedition flag ignored); incorrect advice on offsets", multiline: true },
      { key: "loss", label: "Detriment and how you calculated it", placeholder: "Line items", multiline: true, required: true },
      { key: "contain", label: "What you did to contain the loss", placeholder: "e.g. chased the claim, used Open Arms, borrowed from family", multiline: true },
    ],
    build: (values) => `Application under the Scheme for Compensation for Detriment caused by Defective Administration (CDDA)
Resource Management Guide 409

Applicant: ${v(values, "fullName")}
DVA file / client number: ${v(values, "fileNo")}
Agency: Department of Veterans’ Affairs

1. Defective administration
I say DVA’s administration was defective in the following respects:

${v(values, "incidents")}

Mapped to RMG 409:
${v(values, "rmg")}

2. Detriment
The defective administration caused the following detriment (personal injury / economic loss). Workings are attached.

${v(values, "loss")}

3. Causation
But for the administration described above, this detriment would not have occurred, or would have been materially less. Statutory entitlements I am owed under the MRCA/DRCA/VEA are a separate matter; this application is for the extra harm caused by the administration itself.

4. Steps to contain the loss
${v(values, "contain")}

5. Other remedies
I have pursued (or am pursuing) the underlying compensation decisions through DVA and, where available, the Veterans’ Review Board. Those processes do not compensate the administrative detriment described here.

6. Outcome sought
An assessment of this application on the papers, a written decision with reasons, and payment of compensation sufficient to restore me — as far as money can — to the position I would have been in if the defective administration had not occurred.

Attachments: chronology, correspondence, medical evidence of aggravation (if claimed), invoices and workings.

${v(values, "fullName")}
`,
  },
  {
    slug: "written-reasons",
    title: "Request for written reasons / workings",
    summary: "Get the table, the offset calculation, or the clinical basis for a discounted specialist report.",
    to: "The delegate named on the decision",
    relatedGuides: ["appeals-vrb-art", "incapacity-offsets", "medical-evidence"],
    fields: [
      { key: "fullName", label: "Your full name", placeholder: "Alex Taylor", required: true },
      { key: "claimNo", label: "Claim number", placeholder: "…", required: true },
      { key: "decisionDate", label: "Date of decision", placeholder: "…" },
      { key: "want", label: "What you want explained", placeholder: "e.g. GARP M table and why Dr X’s 50% was not accepted; incapacity offset workings", multiline: true, required: true },
    ],
    build: (values) => `Dear Delegate,

I refer to the decision dated ${v(values, "decisionDate")} on claim ${v(values, "claimNo")}.

Please provide written reasons and workings covering:

${v(values, "want")}

In particular, if a treating specialist report was not followed, please say whether an AHPRA-registered practitioner reviewed the file and, if so, identify the report. If an offset was applied, please provide the arithmetic (normal weekly earnings, step-down, each offset amount, and the weekly result).

I need this to consider review rights. Please send it electronically.

Yours faithfully
${v(values, "fullName")}
`,
  },
  {
    slug: "specialist-brief",
    title: "Briefing letter to a treating specialist",
    summary: "A letter you send to your doctor so the report answers DVA’s actual question and the impairment tables.",
    to: "Your treating specialist",
    relatedGuides: ["medical-evidence", "permanent-impairment"],
    fields: [
      { key: "docName", label: "Doctor’s name", placeholder: "Dr …", required: true },
      { key: "fullName", label: "Your full name", placeholder: "Alex Taylor", required: true },
      { key: "claimNo", label: "Claim number", placeholder: "…" },
      { key: "question", label: "DVA’s question / what the report is for", placeholder: "Liability / PI under GARP M chapter … / incapacity", multiline: true, required: true },
      { key: "history", label: "Short chronology for the doctor", placeholder: "Service, onset, key incidents, current function", multiline: true },
      { key: "tables", label: "Descriptors or tables you want addressed", placeholder: "e.g. psychiatric table — need for supervision, disturbance of behaviour", multiline: true },
    ],
    build: (values) => `Dear ${v(values, "docName")},

Thank you for continuing to treat me. I have a live DVA claim (${v(values, "claimNo")}) and I need a report that DVA can actually use.

The question DVA has asked / the decision this report needs to support
${v(values, "question")}

Relevant history (from my records — please correct anything that does not match your clinical view)
${v(values, "history")}

Could the report please address, as far as you can:

1. Diagnosis.
2. Relationship to service and/or aggravation (including by later events if that is your opinion).
3. Current functional impact, written against the following descriptors / tables where you are comfortable doing so:
${v(values, "tables")}
4. Treatment already provided, whether the condition is stable, and prognosis.
5. Capacity for work, study, and vocational rehabilitation if you have a view.

I am not asking you to be my advocate. I am asking you to write a complete clinical opinion so a non-clinician delegate is not left to fill gaps. Please bill this as a report if that is your usual practice.

Yours faithfully
${v(values, "fullName")}
`,
  },
  {
    slug: "household-services",
    title: "Household services / attendant care claim cover letter",
    summary:
      "A cover note for D9319 or D1351 that ties each domestic or personal-care task to an accepted condition and who lives in the house.",
    to: "hhs@dva.gov.au (and keep a copy)",
    relatedGuides: ["household-services", "hardship-asp"],
    fields: [
      { key: "fullName", label: "Your full name", placeholder: "Alex Taylor", required: true },
      { key: "fileNo", label: "DVA file / client number", placeholder: "NSM… or client number" },
      { key: "claimType", label: "What you are claiming", placeholder: "Household services (D9319) / attendant care (D1351) / both", required: true },
      { key: "conditions", label: "Accepted conditions this is based on", placeholder: "As on your Confirmation of Accepted Conditions letter", multiline: true, required: true },
      { key: "tasks", label: "Tasks you can no longer do (and why)", placeholder: "e.g. vacuuming — lumbar and knee; showering on bad days — …", multiline: true, required: true },
      { key: "household", label: "Who lives in the house, and what they can reasonably do unpaid", placeholder: "I live alone / partner works full-time and …", multiline: true, required: true },
      { key: "vhc", label: "Are you already on Veterans’ Home Care?", placeholder: "No / Yes — domestic assistance 2 hours a fortnight …" },
      { key: "ask", label: "What you want DVA to do", placeholder: "Accept the claim for investigation, arrange an OT assessment, determine weekly hours" },
    ],
    build: (values) => `Household Services team
Department of Veterans’ Affairs
hhs@dva.gov.au
GPO Box 9998
Brisbane QLD 4001

Claim for ${v(values, "claimType", "household services")}

Name: ${v(values, "fullName")}
File / client number: ${v(values, "fileNo", "as per MyService")}

I lodge this claim under the Military Rehabilitation and Compensation Act 2004. I am unable to manage the household / personal-care tasks below because of accepted service-related conditions, and I ask DVA to assess a reasonable requirement for compensation.

Accepted conditions this claim relies on
${v(values, "conditions")}

Tasks I can no longer manage, and why
${v(values, "tasks")}

Who lives in the house
${v(values, "household")}

Current Veterans’ Home Care (if any)
${v(values, "vhc", "None / not known. Please tell me in writing if an approval on this claim would stop any VHC service I already have.")}

I attach the claim form and a copy of my Confirmation of Accepted Conditions (if held). I ask that you:

1. Confirm in writing that the claim has been received and give a claim number.
2. ${v(values, "ask", "Accept the claim for investigation and arrange an assessment.")}
3. Tell me if anything is outstanding from me.

Please send correspondence by email.

Yours faithfully
${v(values, "fullName")}
`,
  },
  {
    slug: "vrb-holding",
    title: "VRB holding application",
    summary:
      "Protect the time limit this week. You can supplement the medical case later. The letter is the clock — count it on Deadlines first.",
    to: "reviews@vrb.gov.au or the VRB Justice Portal (vrb.gov.au/how-apply)",
    relatedGuides: ["appeals-vrb-art", "medical-evidence"],
    fields: [
      { key: "fullName", label: "Your full name", placeholder: "Alex Taylor", required: true },
      { key: "fileNo", label: "DVA file / client number", placeholder: "NSM… or client number" },
      { key: "claimNo", label: "Claim number on the decision", placeholder: "ILC / SPI / INC…", required: true },
      { key: "decisionDate", label: "Date of the DVA decision", placeholder: "as on the letter", required: true },
      { key: "received", label: "Date you received the letter", placeholder: "if different" },
      { key: "want", label: "What you want changed", placeholder: "Accept liability for … / increase the GARP M rating for …", required: true, multiline: true },
      { key: "why", label: "Why the decision is wrong (short)", placeholder: "Specialist report of [date] was not followed. Table …", multiline: true },
    ],
    build: (values) => `Veterans’ Review Board
reviews@vrb.gov.au
GPO Box 1631
Sydney NSW 2001

Application for review

Name: ${v(values, "fullName")}
DVA file / client number: ${v(values, "fileNo", "as per the decision letter")}
Claim number: ${v(values, "claimNo")}
Decision dated: ${v(values, "decisionDate")}
${v(values, "received", "") !== "[to complete]" && v(values, "received") ? `Date received: ${v(values, "received")}` : ""}

I apply to the Veterans’ Review Board for review of the decision identified above.

The decision I want
${v(values, "want")}

Why the decision is wrong
${v(values, "why", "I will file a short comparison of the DVA rating and the treating specialist’s rating, with the GARP M descriptors, as soon as it is ready. I lodge now so the time limit is protected.")}

I ask the Board to accept this as an application. I will send further evidence. Please confirm receipt in writing.

Yours faithfully
${v(values, "fullName")}
`,
  },
  {
    slug: "foi-24ab",
    title: "FOI practical refusal (s 24AB) consultation reply",
    summary:
      "A short reply that keeps the request alive. Silence in the 14-day consultation period is treated as withdrawal of the whole request.",
    to: "Information.Access@dva.gov.au — same FOI reference as the notice",
    relatedGuides: ["foi"],
    fields: [
      { key: "fullName", label: "Your full name", placeholder: "Alex Taylor", required: true },
      { key: "ref", label: "FOI reference on the notice", placeholder: "LEX …", required: true },
      { key: "dated", label: "Date of the practical refusal notice", placeholder: "as on the letter", required: true },
      { key: "narrow", label: "How you are narrowing the request", placeholder: "Limit to claim numbers …, date range …, file notes and call recordings only", required: true, multiline: true },
      { key: "keep", label: "What you still need (named documents)", placeholder: "File notes, emails, recordings for …", multiline: true },
    ],
    build: (values) => `Information Access Unit
Department of Veterans’ Affairs
Information.Access@dva.gov.au

Freedom of Information Act 1982 s 24AB — consultation response

Name: ${v(values, "fullName")}
FOI reference: ${v(values, "ref")}
Notice dated: ${v(values, "dated")}

I received a practical refusal notice on the request above. This is my consultation response within the period in s 24AB. I do not withdraw the request.

I revise the request as follows
${v(values, "narrow")}

I still seek
${v(values, "keep", "The documents as narrowed above, electronically if possible.")}

Please confirm in writing that the request remains on foot and is no longer the subject of a practical refusal, or write if you still consider s 24AB applies to this narrowed scope.

Yours faithfully
${v(values, "fullName")}
`,
  },
  {
    slug: "srdp-election",
    title: "SRDP offer: workings, or record a decline",
    summary:
      "Eligibility is not the same as taking the payment. Ask for the comparison in writing before the 12-month election runs. The choice to take SRDP cannot be undone.",
    to: "The DVA officer named on the SRDP offer, copied to yourself",
    relatedGuides: ["permanent-impairment", "incapacity-offsets"],
    fields: [
      { key: "fullName", label: "Your full name", placeholder: "Alex Taylor", required: true },
      { key: "fileNo", label: "DVA file / client number", placeholder: "NSM…" },
      { key: "offerDate", label: "Date of the written SRDP offer", placeholder: "as on the letter", required: true },
      { key: "intent", label: "What this letter is", placeholder: "Request for workings / decline the payment / not yet electing", required: true },
      { key: "ask", label: "What you need in writing", placeholder: "Weekly SRDP after offsets vs current incapacity; Gold Card / TPI / MRCAETS if I decline", multiline: true },
    ],
    build: (values) => `Department of Veterans’ Affairs

Special Rate Disability Pension — response to written offer

Name: ${v(values, "fullName")}
DVA file / client number: ${v(values, "fileNo", "as per the offer")}
Offer dated: ${v(values, "offerDate")}

Purpose of this letter: ${v(values, "intent")}

I understand that eligibility for SRDP and a choice to receive the SRDP payment are not the same. DVA’s published position is that once I am eligible, even if I do not take the payment, a Veteran Card — All Conditions embossed TPI, the high rate of the MRCA Supplement, and MRCAETS for dependent children can attach. I also understand that a choice to receive SRDP cannot later be changed, and that financial advice is required before the payment can commence.

I ask you to provide, in writing, before I make any election:

${v(values, "ask", "1. The weekly SRDP rate after all offsets, compared with my current incapacity payments.\n2. Confirmation of Gold Card (TPI), MRCA Supplement rate, and MRCAETS if I am eligible and I decline the payment.\n3. The last date by which I must elect.")}

I do not, by sending this letter, elect to receive SRDP. If I later elect or decline, I will say so in a separate signed letter.

Yours faithfully
${v(values, "fullName")}
`,
  },
];

export function getLetter(slug: string) {
  return letters.find((l) => l.slug === slug);
}
