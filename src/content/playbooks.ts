import type { Playbook } from "./types";

export const playbooks: Playbook[] = [
  {
    slug: "claim-is-stuck",
    title: "My claim has gone quiet",
    summary: "A short sequence for finding out whether DVA is waiting on you, waiting on a doctor, or has not acted on the file.",
    when: "No meaningful update inside the published timeframe, or a hardship flag with no action.",
    minutes: "45 minutes plus waiting time",
    relatedGuides: ["delays", "foi", "ombudsman", "cdda"],
    relatedLetters: ["expedition", "follow-up", "foi-request"],
    steps: [
      { title: "Open MyService and your email junk folder", detail: "Look for an information request, a medical appointment letter, or a decision you have not opened. Screenshot the status line." },
      { title: "Write a three-line status request", detail: "Claim number, date lodged, one question: what is outstanding from me, and when will it next be actioned? Send to the allocated contact. Use the follow-up letter." },
      { title: "If hardship is the issue, attach evidence and ask for expedition", detail: "Overdue bills, medical certificate, notice about housing or children. One page. Date it." },
      { title: "Note the date of any reply", detail: "If the reply is “backlog” with no date, a second letter can ask for the date of the next action or a decision." },
      { title: "The next steps are a DVA complaint, then the Ombudsman", detail: "Both take a timeline. A CDDA application is separate: it covers loss the delay itself caused, and it does not replace the claim." },
    ],
    watchOuts: [
      "The Contact restrictions guide covers what can lead to a contact restriction.",
      "A request sitting with your specialist is not DVA delay — call the rooms too.",
    ],
  },
  {
    slug: "need-my-file",
    title: "I need the documents DVA is holding",
    summary:
      "Check MyService, pick PIR or FOI, scope the request, lodge with identity, then diary the statutory clock.",
    when: "You need file notes, emails, call recordings, position numbers, or the papers behind a SPOC or delay.",
    minutes: "45 minutes to write; weeks to wait",
    relatedGuides: ["foi", "delays", "contact-restrictions", "cdda"],
    relatedLetters: ["foi-request", "foi-24ab", "foi-internal-review"],
    steps: [
      {
        title: "Count the FOI clock on Deadlines first",
        detail:
          "Open /deadlines. Practical refusal (s 24AB) is 14 days and silence withdraws the request. Internal review is usually 30 days. After that decision, the OAIC window is 60 days, not 30. Your letter is the source.",
      },
      {
        title: "Search MyService and your letter pile",
        detail: "Decision letters and some reports are already there. Screenshot what you have so you only ask for the rest.",
      },
      {
        title: "The two routes",
        detail: "PIR webform: your own file, quicker, no review right. FOI webform: review rights, recordings, SPOC papers, or where PIR was thin. One letter can ask for both. Policy or “how they decide” is non-personal FOI, and charges can apply.",
      },
      {
        title: "A request names what it wants",
        detail: "Claim numbers, date range, call recordings on your number, names and position numbers, SPOC/behaviour file. Use the FOI letter.",
      },
      {
        title: "Prove who you are and lodge",
        detail: "Webforms collect identity. Email or post: form D8601 plus ID. Send to Information.Access@dva.gov.au or the FOI / PIR webform. Keep a copy.",
      },
      {
        title: "Diary 14 days then 30 days",
        detail: "FOI acknowledgement 14 days, decision 30 days unless they notify an extension. PIR aims at 30 days. One written chase if they go quiet.",
      },
      {
        title: "If they refuse, delay, or over-redact",
        detail: "FOI: internal review (another officer, 30 days), then the OAIC — 60 days from the internal review decision, not 30. Check the letter. PIR: no OAIC — lodge FOI for the same documents.",
      },
    ],
    watchOuts: [
      "PIR has no Information Commissioner review.",
      "Your own personal information is free. Other FOI can be charged — wait for the estimate before you pay.",
      "Third-party consultation can extend time. A partial release still gives dates for a timeline.",
      "Do not paste claim numbers into an AI tool. Copy the letter to DVA yourself.",
    ],
  },
  {
    slug: "need-money-now",
    title: "I need support this month",
    summary: "Income, ASP, household services and crisis services are different programs. Each pays for different things.",
    when: "Rent, food, children, or household function is breaking because of accepted (or claimed) conditions and delayed payments.",
    minutes: "1–2 hours to prepare, then a phone call",
    relatedGuides: ["hardship-asp", "household-services", "incapacity-offsets"],
    relatedLetters: ["expedition", "specialist-brief", "household-services"],
    steps: [
      { title: "If anyone is unsafe, call 000 or Open Arms first", detail: "1800 011 046. ASP will not arrive tonight." },
      { title: "Different needs go to different programs", detail: "Income (incapacity / veteran payment), services DVA can pay to a provider (ASP, HHS), and one-off child costs are different DVA programs." },
      { title: "Acute Support Package is requested on 1800 VETERAN", detail: "There is no form. A request describes the new circumstance, who is affected, and the providers. The Hardship and ASP guide sets out eligibility. A written note of the call (date, who you spoke to, what was asked) is a record of it." },
      { title: "If incapacity is nil or tiny because of an offset", detail: "The calculation sheet shows DVA’s workings. The incapacity guide explains offsets and redemption offers. If the amount jumped after 1 July 2026, that can be the lawful VETS Act change." },
      { title: "Treatment you paid for yourself is a MEPI claim", detail: "Veteran Card holders can claim Medical Expenses Privately Incurred on DVA’s webform (D1181). Itemised receipts, not quotes. That is reimbursement of treatment your card should have covered — different from ASP." },
      { title: "Household services is a separate claim", detail: "Form D9319 to hhs@dva.gov.au. That is compensation for domestic tasks, not ASP. The household-services playbook sets it out." },
      { title: "Unpaid invoices are a record", detail: "A later CDDA application can rely on them if a flagged request is not actioned." },
    ],
    watchOuts: [
      "ASP is not cash and will not pay legal fees or general cost of living.",
      "Eligibility turns on crisis plus a new or newly impactful circumstance.",
      "A PI lump paid months later does not mean the hardship request was resolved.",
    ],
  },
  {
    slug: "disagree-with-decision",
    title: "I disagree with a DVA decision",
    summary: "The time limit, written reasons, and a comparison of the medical evidence for the VRB.",
    when: "You have a determination letter you think is wrong.",
    minutes: "Half a day to lodge a holding appeal, longer to brief it",
    relatedGuides: ["appeals-vrb-art", "medical-evidence", "permanent-impairment"],
    relatedLetters: ["vrb-holding", "written-reasons", "specialist-brief"],
    steps: [
      {
        title: "Find the time limit on your letter",
        detail:
          "Open /deadlines, pick the decision type, enter the date on the letter. The time limit runs from the letter, not from a forum post. The VRB holding letter is a short template for an application that can be added to later. ART after VRB is 3 calendar months, not 90 days. The Deadlines tool counts from both the notice date and the date you received it.",
      },
      { title: "Written reasons", detail: "The written-reasons letter asks for the table, the rating, and why the specialist was not followed." },
      { title: "A one-page comparison", detail: "DVA rating | specialist rating | GARP M descriptor | quote from the report. It sets the medical evidence side by side." },
      { title: "Lodge with VRB", detail: "Portal, email, or post. Claim number, decision date, what you want. Attach the comparison and the report." },
      { title: "An ATDP advocate", detail: "Free through an ex-service organisation, including when you lodge yourself. The register is advocateregister.org.au." },
    ],
    watchOuts: [
      "A missed deadline can cost the right to review. The letter is the clock.",
      "CDDA will not substitute for an appeal of the rating itself.",
      "New evidence can be given to the VRB.",
    ],
  },
  {
    slug: "dva-wants-more-medical",
    title: "DVA has asked for more medical evidence",
    summary: "DVA’s question, the specialist’s brief, and an index for the report.",
    when: "You have an information request, a medical questionnaire, or a letter saying the claim will be decided on current information.",
    minutes: "2 hours to brief, then the appointment",
    relatedGuides: ["medical-evidence", "lodge-a-claim", "delays"],
    relatedLetters: ["specialist-brief", "follow-up"],
    steps: [
      { title: "DVA’s question goes at the top of the brief", detail: "The briefing letter on this site has a place for it." },
      { title: "Send the specialist the tables and your chronology", detail: "Use the briefing letter. Attach prior reports so they do not contradict themselves by accident." },
      { title: "Five headings: diagnosis, nexus, function, stability, treatment already tried", detail: "If PI is live, the report can speak to the descriptors, not just “moderate impairment”." },
      { title: "Lodge the report with an index", detail: "“Attached: Dr X report 12 Aug 2026, 8 pages, addressing your letter of 5 May.”" },
      { title: "If DVA asks for the same thing again", detail: "A reply can give the date and the way it was sent." },
    ],
    watchOuts: [
      "A GP letter that restates your history without a diagnosis does not address the PI tables.",
      "DVA’s “we will decide on current information” date is the cut-off for a new report to be considered.",
      "A rating that differs from the specialist’s is something the VRB can review.",
    ],
  },
  {
    slug: "restricted-contact",
    title: "DVA has restricted how I can contact them",
    summary: "The documents behind the decision, reasonable adjustments, and an advocate as an additional contact.",
    when: "You have a SPOC, scheduled-contact only, or a mutually respectful behaviour letter.",
    minutes: "An afternoon",
    relatedGuides: ["contact-restrictions", "foi", "advocates", "cdda"],
    relatedLetters: ["foi-request", "follow-up"],
    steps: [
      { title: "Read the letter to the end", detail: "Note the review date, the allowed channel, and any emergency-services warning." },
      { title: "An FOI request can ask for the documents that led to it", detail: "File notes, emails, the protocol." },
      { title: "Reasonable adjustments can be requested in writing", detail: "Clinician letter + specific asks (email not phone, support person, nominated hours)." },
      { title: "An advocate can be an additional contact", detail: "They can deal with DVA on the claim when you cannot." },
      { title: "The restriction letter sets the channel", detail: "The Contact restrictions guide covers what can lead to a restriction, including abusive or threatening contact with staff." },
    ],
    watchOuts: [
      "A welfare check is a clinical matter and, later, can be part of a CDDA application.",
      "Do not discuss self-harm with the delegate — use Open Arms or 000.",
      "This is usually not a VRB matter. Use FOI, DDA adjustments, DVA review, Ombudsman.",
    ],
  },
  {
    slug: "need-household-help",
    title: "I cannot keep the house going",
    summary:
      "Household services, attendant care, VHC and ASP are different programs with different forms.",
    when: "Cleaning, laundry, meals, shopping, lawns, or personal care have slipped because of accepted conditions — or you never knew DVA paid for this.",
    minutes: "2 hours to prepare the task list and form",
    relatedGuides: ["household-services", "hardship-asp", "medical-evidence"],
    relatedLetters: ["household-services", "follow-up"],
    steps: [
      {
        title: "Get your Confirmation of Accepted Conditions",
        detail: "MyService or 1800 VETERAN. HHS is written against accepted conditions, not claimed ones.",
      },
      {
        title: "A task list matches the form to the tasks",
        detail: "Each line: task, how often, what you used to do, what you can do now, which accepted condition stops you, who else lives in the house and whether they can reasonably do it unpaid.",
      },
      {
        title: "Which program fits",
        detail: "Domestic tasks you used to do: D9319 Household Services to hhs@dva.gov.au. Personal care (bathing, dressing, feeding): D1351 Attendant Care, same mailbox, a doctor completes part of the form. Gold or White Card holders: VHC is assessed on 1300 550 450. A crisis with children or a sudden breakdown: ASP, requested on 1800 VETERAN.",
      },
      {
        title: "Send the form plus the cover letter",
        detail: "Email hhs@dva.gov.au. Keep the PDF. If you post it, GPO Box 9998 Brisbane QLD 4001, and keep a copy.",
      },
      {
        title: "The assessment",
        detail: "Usually an occupational therapist. The assessor’s report goes to DVA, and an FOI request can get a copy of it.",
      },
    ],
    watchOuts: [
      "Approving HHS generally stops VHC domestic / garden maintenance. Approving attendant care generally stops VHC personal care.",
      "DVA’s general rule is that family cannot be paid.",
      "Childcare is not attendant care. DVA’s household services wording covers childcare only in some short-term and crisis circumstances.",
      "A lapsed approval is a gap. The end date is on the determination letter.",
    ],
  },
  {
    slug: "build-cdda",
    title: "I want compensation for how the claim was handled",
    summary: "A CDDA application: timeline, RMG 409 map, causation, quantum. CDDA does not replace the underlying claim.",
    when: "The administration — not just the decision — has cost you money or health.",
    minutes: "Several sessions",
    relatedGuides: ["cdda", "delays", "foi"],
    relatedLetters: ["cdda-application"],
    steps: [
      { title: "CDDA sits alongside the statutory claim", detail: "CDDA does not replace PI, incapacity, or ASP." },
      { title: "FOI the file if you do not have the notes", detail: "You cannot map defective administration from memory." },
      { title: "Build the timeline and RMG 409 table", detail: "Each row: date, event, which RMG 409 category, document." },
      { title: "Cost the loss", detail: "Invoices, extra treatment, a defined period of lost earnings, interest if you can show it. Attach workings." },
      { title: "Lodge with DVA", detail: "The CDDA letter on this site is a template. The Ombudsman takes complaints about how a CDDA application is handled." },
    ],
    watchOuts: [
      "Discretionary. Defect plus detriment still may not pay.",
      "A later PI lump does not automatically settle a hardship-delay loss.",
      "A claim is built from line items, not a round figure.",
    ],
  },
];

export function getPlaybook(slug: string) {
  return playbooks.find((p) => p.slug === slug);
}
