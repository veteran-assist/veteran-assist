import type { PathNode, PathResult } from "./types";

export const pathNodes: Record<string, PathNode> = {
  start: {
    id: "start",
    question: "What is the main problem today?",
    help: "Pick the closest fit. A partner or carer can answer this for the veteran. You can run this again for a second problem.",
    options: [
      { id: "unsafe", label: "Someone is not safe", next: "result-crisis" },
      {
        id: "helping",
        label: "I am a partner, family member or friend helping a veteran",
        next: "result-helping",
        group: "Helping someone else",
      },
      {
        id: "money",
        label: "I need money or family support this month",
        next: "money-kind",
        group: "Money",
      },
      {
        id: "house",
        label: "I cannot do the housework or keep the house going",
        next: "result-hhs",
        group: "Money",
      },
      {
        id: "decision",
        label: "I have a decision I disagree with",
        next: "decision-type",
        group: "A letter or a decision",
      },
      {
        id: "deadline",
        label: "I have a letter and I need the review deadline",
        next: "result-deadline",
        group: "A letter or a decision",
      },
      { id: "file", label: "I want my documents / the file", next: "file-kind", group: "My file" },
      {
        id: "stuck",
        label: "A claim has gone quiet or is overdue",
        next: "stuck-hardship",
        group: "Something else",
      },
      {
        id: "lodge",
        label: "I need to lodge or work out which claim to make",
        next: "result-lodge",
        group: "Something else",
      },
      {
        id: "medical",
        label: "Medical evidence — DVA wants more, or ignored a report",
        next: "result-medical",
        group: "Something else",
      },
      {
        id: "restricted",
        label: "DVA has restricted how I can contact them",
        next: "result-restricted",
        group: "Something else",
      },
      {
        id: "cdda",
        label: "The way they handled it caused extra harm",
        next: "cdda-ready",
        group: "Something else",
      },
      {
        id: "abuse",
        label: "Sexual or physical abuse during service",
        next: "result-abuse",
        group: "Something else",
      },
    ],
  },
  "stuck-hardship": {
    id: "stuck-hardship",
    question: "Is there a financial or health reason this cannot wait in the ordinary queue?",
    options: [
      {
        id: "yes",
        label: "Yes — hardship, housing, children, or deteriorating health",
        next: "result-stuck-urgent",
      },
      { id: "no", label: "No — it is just sitting there", next: "result-stuck" },
      {
        id: "request",
        label: "They asked me for something and I have not sent it yet",
        next: "result-stuck-you",
      },
    ],
  },
  "money-kind": {
    id: "money-kind",
    question: "What kind of support is the gap?",
    options: [
      { id: "crisis", label: "Crisis / family function (not just low cash)", next: "result-asp" },
      {
        id: "wage",
        label: "I cannot work — incapacity looks wrong, jumped, or is nil",
        next: "result-incapacity",
      },
      { id: "house", label: "I cannot keep the house going (cleaning, care)", next: "result-hhs" },
      { id: "unsafe", label: "Someone is unsafe tonight", next: "result-crisis" },
    ],
  },
  "decision-type": {
    id: "decision-type",
    question: "What did the decision do?",
    options: [
      { id: "liability", label: "Refused or limited liability", next: "result-vrb" },
      {
        id: "pi",
        label: "Permanent impairment rating too low / specialist ignored",
        next: "result-vrb",
      },
      {
        id: "offset",
        label: "Incapacity offset or redemption I think is wrong",
        next: "result-offset",
      },
      {
        id: "no-letter",
        label: "There is no decision yet — they just will not act",
        next: "stuck-hardship",
      },
    ],
  },
  "cdda-ready": {
    id: "cdda-ready",
    question:
      "Do you already have a timeline and documents (letters, flags, invoices), or are you still missing the file?",
    options: [
      { id: "have", label: "I have enough to write it", next: "result-cdda" },
      { id: "file", label: "I still need the file / notes", next: "file-kind" },
    ],
  },
  "file-kind": {
    id: "file-kind",
    question: "What do you need from Information Access?",
    help: "PIR is faster for your own papers. FOI is the path with review rights.",
    options: [
      { id: "own", label: "My claim file, notes, or call recordings", next: "result-file" },
      {
        id: "review",
        label: "They already refused, redacted heavily, or did not decide in time",
        next: "result-foi-review",
      },
      {
        id: "policy",
        label: "How DVA decides things (policy, not just my file)",
        next: "result-file-policy",
      },
    ],
  },
};

export const pathResults: Record<string, PathResult> = {
  "result-stuck": {
    id: "result-stuck",
    title: "A claim that has gone quiet: the written steps DVA offers",
    summary:
      "A status letter asks DVA where the claim is. If there is still no next action, the next steps are a DVA complaint and the Commonwealth Ombudsman.",
    doNow: [
      "Check MyService and junk mail for an unanswered request.",
      "The follow-up letter on this site gives the claim number and asks three questions: status, what is outstanding from you, and the date of the next action.",
      "Save a PDF of what you sent.",
      "If you ring, print the [DVA call sheet](/call-sheet) first: one claim, the questions in order, and the reference number before you hang up.",
    ],
    then: [
      "With no reply, the next steps are a DVA complaint and then the Commonwealth Ombudsman. The [Delays guide](/guides/delays) sets them out.",
      "A reply of “backlog” with no date can be answered by asking for the date of the next action.",
    ],
    guides: ["delays", "foi", "pi-after-liability"],
    playbooks: ["claim-is-stuck", "need-my-file"],
    letters: ["follow-up", "expedition"],
    contacts: ["1800 VETERAN — 1800 838 372", "DVA feedback form"],
    caution:
      "The Contact restrictions guide covers what can lead to a contact restriction.",
  },
  "result-stuck-urgent": {
    id: "result-stuck-urgent",
    title: "Hardship while a claim is waiting",
    summary:
      "A request to expedite can give the lodgement date, any earlier flag, and evidence of harm.",
    doNow: [
      "The expedition letter on this site is a template for that request, with evidence such as bills, a medical certificate or notice about children.",
      "Acute Support Package is requested by phone on 1800 VETERAN. There is no ASP form.",
      "If anyone is unsafe, Open Arms 1800 011 046 or 000 first.",
    ],
    then: [
      "The Commonwealth Ombudsman takes complaints about DVA’s administration, including a flagged request with no action.",
      "Invoices and bills can later support a CDDA application. CDDA does not replace the underlying claim.",
    ],
    guides: ["delays", "hardship-asp", "ombudsman", "cdda"],
    playbooks: ["claim-is-stuck", "need-money-now"],
    letters: ["expedition", "ombudsman"],
    contacts: ["1800 VETERAN — 1800 838 372", "Open Arms — 1800 011 046", "Commonwealth Ombudsman"],
    caution:
      "Expedition is not a payment. ASP is not cash. Expedition, ASP and incapacity are separate requests.",
  },
  "result-stuck-you": {
    id: "result-stuck-you",
    title: "DVA is waiting on you",
    summary: "A claim waiting on you is not DVA delay. The information request lists what DVA needs.",
    doNow: [
      "The information request lists each item DVA needs.",
      "For a medical request, the specialist briefing letter is a template. DVA’s “decide on current information” date is the cut-off for a new report.",
      "An index can list each document, its date, and the request item it answers.",
    ],
    then: [
      "If the document was already sent, a reply can give the date it was sent.",
    ],
    guides: ["lodge-a-claim", "medical-evidence", "delays"],
    playbooks: ["dva-wants-more-medical"],
    letters: ["specialist-brief", "follow-up"],
    contacts: ["Your treating rooms", "1800 VETERAN if the request is unreadable"],
    caution: "Missing DVA’s deadline can mean they decide without the report you are waiting on.",
  },
  "result-asp": {
    id: "result-asp",
    title: "Acute Support Package is requested by phone",
    summary:
      "ASP funds providers for a new crisis. It will not pay your rent as cash. Eligibility is specific. The guide sets it out.",
    doNow: [
      "A request describes the new or newly impactful circumstance, who is affected, the service needed, and the provider. The [Hardship and ASP guide](/guides/hardship-asp) sets out eligibility.",
      "The request is made by phone on 1800 VETERAN (1800 838 372).",
      "A written note of the call (date, who you spoke to, what was asked) is a record of it.",
    ],
    then: [
      "If an ASP request is not actioned, the complaint steps in the [Delays guide](/guides/delays) apply.",
      "Household services are a different claim (OT). Incapacity is a different claim. They run separately.",
    ],
    guides: ["hardship-asp", "household-services"],
    playbooks: ["need-money-now"],
    letters: ["expedition"],
    contacts: ["1800 VETERAN — 1800 838 372"],
    caution:
      "Published ASP caps (from 1 July 2026 DVA page) are modest for veterans ($7,500 then $5,000) and higher for some bereaved families. Check the live page.",
  },
  "result-incapacity": {
    id: "result-incapacity",
    title: "Incapacity payments: DVA’s workings and the offsets",
    summary:
      "A jump after 1 July 2026 can be the VETS Act uplift and the DCP offsetting change. Douglas is a tax case.",
    doNow: [
      "The calculation sheet shows NWE, loading, each offset and the weekly result. The written-reasons letter asks for it.",
      "If the amount changed after 1 July, [What changed on 1 July 2026](/transition) explains the VETS Act changes.",
      "A redemption offer is calculated from the weekly rate DVA says is payable.",
      "ASP is a separate request and does not depend on the incapacity decision.",
    ],
    then: [
      "The earnings base DVA used can be compared with service records.",
      "The incapacity guide sets out DVA’s position on Douglas.",
    ],
    guides: ["incapacity-offsets", "hardship-asp"],
    playbooks: ["need-money-now", "disagree-with-decision"],
    letters: ["written-reasons", "expedition"],
    contacts: ["1800 VETERAN", "ATDP advocate — advocateregister.org.au"],
    caution:
      "VEA general-rate DCP and MRCA incapacity can both be paid from 1 July 2026. CSC invalidity is a different offset. An ATO private ruling will not bind DVA on offsets.",
  },
  "result-hhs": {
    id: "result-hhs",
    title: "Household services are a separate claim",
    summary:
      "Cleaning, laundry, meals, shopping, and some garden work can be paid if accepted conditions stop you doing them. VEA-accepted conditions count from 1 July 2026.",
    doNow: [
      "Accepted conditions are listed in MyService, or on 1800 VETERAN.",
      "The claim form is D9319 (household services) and/or D1351 (attendant care; a doctor completes part), emailed to hhs@dva.gov.au. The site’s cover letter is a template.",
      "Veterans’ Home Care (1300 550 450) is a separate program for Gold or White Card holders.",
    ],
    then: [
      "An assessor, usually an occupational therapist, assesses the need and recommends the level of support.",
      "An FOI request can get a copy of the assessment. The approval end date is on the determination letter.",
      "Acute Support Package (1800 VETERAN) is the separate short-term crisis program. Attendant care is personal care of the veteran, not childcare.",
    ],
    guides: ["household-services", "hardship-asp"],
    playbooks: ["need-household-help", "need-money-now"],
    letters: ["household-services", "follow-up", "foi-request"],
    contacts: [
      "hhs@dva.gov.au — Household Services / Attendant Care",
      "VHC Assessment Agency — 1300 550 450",
      "1800 VETERAN — 1800 838 372",
    ],
    caution:
      "Approving HHS generally stops VHC domestic / garden maintenance. Approving attendant care generally stops VHC personal care. DVA’s general rule is that family cannot be paid. Check the live weekly cap on the official page before you quote a dollar figure.",
  },
  "result-crisis": {
    id: "result-crisis",
    title: "Use clinical and emergency channels first",
    summary:
      "DVA claims processes are not crisis response. Get people safe, then come back to the file.",
    doNow: [
      "If there is immediate danger, call 000.",
      "Open Arms 1800 011 046, 24/7.",
      "Lifeline 13 11 14.",
    ],
    then: [
      "When you are able, a clinician can document how DVA processes are affecting you. That letter can support adjustments and, later, a CDDA application.",
    ],
    guides: ["hardship-asp", "contact-restrictions"],
    playbooks: ["need-money-now"],
    letters: [],
    contacts: ["000", "Open Arms — 1800 011 046", "Lifeline — 13 11 14"],
    caution:
      "DVA communication-plan letters often say self-harm disclosures may be referred to police. Use Open Arms or 000, not the claims mailbox, for that disclosure.",
  },
  "result-vrb": {
    id: "result-vrb",
    title: "Appealing to the Veterans’ Review Board",
    summary: "VRB is the first external review. Informal, no fee. New evidence is expected.",
    doNow: [
      "The review-rights paragraph on the letter gives the time limit. A short holding application can be lodged and added to later.",
      "The Deadlines tool estimates the window. ART after VRB is 3 months, not 90 days.",
      "The written-reasons letter asks DVA for reasons if the decision letter gives few.",
      "A one-page table can set out the medical evidence: DVA rating | specialist rating | descriptor.",
    ],
    then: [
      "Applications are lodged via vrb.gov.au. An ATDP advocate can help, including when you lodge yourself.",
      "ART is the next step if VRB fails — more formal, still no fee for these Acts.",
    ],
    guides: ["appeals-vrb-art", "medical-evidence", "permanent-impairment"],
    playbooks: ["disagree-with-decision"],
    letters: ["vrb-holding", "written-reasons", "specialist-brief"],
    contacts: ["VRB — vrb.gov.au", "Advocacy Register — advocateregister.org.au"],
    caution: "CDDA is not a review of the rating. They are different remedies.",
  },
  "result-offset": {
    id: "result-offset",
    title: "Offsets and redemption offers",
    summary:
      "A redemption offer is calculated from the weekly rate DVA says is payable, so the workings show what it rests on.",
    doNow: [
      "The workings show NWE, step-down and each offset. The written-reasons letter asks for them.",
      "Redemption is only available below a weekly incapacity ceiling. The [incapacity guide](/guides/incapacity-offsets) explains it.",
      "The indexation of the service salary DVA used can be checked against the incapacity guide.",
    ],
    then: [
      "The incapacity guide sets out DVA’s position on Douglas.",
      "VRB/ART may be available depending on the decision — check the letter.",
    ],
    guides: ["incapacity-offsets", "appeals-vrb-art"],
    playbooks: ["disagree-with-decision"],
    letters: ["written-reasons"],
    contacts: ["ATDP advocate", "1800 VETERAN"],
    caution:
      "DVA’s position is that Douglas is about tax, not DRCA/MRCA offsets. You need the section in your decision, not a forum summary.",
  },
  "result-helping": {
    id: "result-helping",
    title: "DVA will not discuss the file until the veteran appoints you",
    summary:
      "A partner, family member, or friend can do the papers. They cannot get information from DVA until form D9325 is signed by both and approved.",
    doNow: [
      "The permission is chosen with the veteran. Enquire is enough to chase a claim. Act lets you lodge and sign. Act – health covers medical matters only. Receive payments means the money is paid to the helper, so it is only for when the veteran wants that.",
      "Fill in D9325 together. Both of you sign it.",
      "Hand it in: upload it in MyService (Representation), or post it to GPO Box 9998, Brisbane QLD 4001.",
      "While you wait, build the chronology and collect the reports. Do not use the veteran's MyService login.",
    ],
    then: [
      "When DVA has actioned it, the arrangement shows on both your MyService Representation screens. Act in your own name.",
      "When you ring DVA, use the [DVA call sheet](/call-sheet) and keep it as the log.",
      "An ATDP advocate is a different role, through an ex-service organisation that does not charge. The register is advocateregister.org.au.",
      "If the veteran can no longer manage their affairs, DVA asks for legal and medical evidence, such as an enduring power of attorney, a guardianship or administration order, or a doctor's letter. Questions about those documents go to a solicitor.",
    ],
    guides: ["helping-a-veteran", "advocates", "foi"],
    playbooks: [],
    letters: [],
    contacts: ["MyService", "Advocacy Register — advocateregister.org.au"],
    caution:
      "D9325 covers DVA only. Only one person can act or receive payments. More than one can enquire. Couples on income support may also need D9378, a separate partner consent form.",
  },
  "result-lodge": {
    id: "result-lodge",
    title: "New claims from 1 July 2026 are MRCA claims",
    summary:
      "One condition per MyService initial-liability claim. DVA’s presumptive-liability list is separate from the Statements of Principles. A claim needs a diagnosis.",
    doNow: [
      "A claim names each condition by the doctor’s diagnosis.",
      "DVA’s presumptive-liability page and the Determination list the conditions covered. Otherwise rma.gov.au lists the Statement of Principles factors.",
      "DVA’s how-to (18 September 2026) is to lodge in MyService one initial-liability condition at a time, or via an advocate, with service history and reports.",
    ],
    then: [
      "Existing VEA/DRCA payments continue under the old rules.",
      "If a condition was withdrawn before 1 July 2026, [What changed on 1 July 2026](/transition) explains which Act applies.",
      "Treatment and hardship support are separate requests from the claim.",
    ],
    guides: ["lodge-a-claim", "presumptive-liability", "vets-act-2026", "start-here", "advocates"],
    playbooks: ["dva-wants-more-medical"],
    letters: ["specialist-brief"],
    contacts: ["MyService", "Advocacy Register"],
    caution:
      "Liability is the gate. A PI request with no accepted condition will sit. Presumptive still needs a confirmed diagnosis, and only for claims lodged from 1 July 2026.",
  },
  "result-deadline": {
    id: "result-deadline",
    title: "Count the clock on the letter, not from memory",
    summary:
      "The letter is the source. The Deadlines tool is a guide.",
    doNow: [
      "Find the review-rights paragraph on the letter in front of you. It names who you write to, and how long you have.",
      "Open the Deadlines tool, pick the decision type that matches that paragraph, and enter the date on the letter.",
    ],
    then: [
      "If the date on the letter has passed, the review-rights paragraph, or the body it names, says what applies. This site cannot say whether a late application is accepted.",
      "An ATDP advocate is free for a Veterans’ Review Board or Administrative Review Tribunal matter.",
      "Only if the letter is about Freedom of Information, and it says practical refusal: you have 14 days. Saying nothing withdraws the request; a reply, including a narrower request, does not.",
    ],
    guides: ["appeals-vrb-art", "foi"],
    playbooks: ["disagree-with-decision"],
    letters: ["vrb-holding", "written-reasons", "foi-24ab", "srdp-election"],
    contacts: ["VRB — vrb.gov.au", "Advocacy Register"],
    caution: "This site does not lodge. Your letter states the actual time limit.",
  },
  "result-medical": {
    id: "result-medical",
    title: "Medical questions go to the specialist",
    summary:
      "DVA decisions turn on the medical evidence: diagnosis, nexus, function and stability.",
    doNow: [
      "The specialist briefing letter sets out DVA’s question and the tables for the specialist.",
      "If a report was not followed, the written-reasons letter asks DVA to say why and who reviewed it.",
      "The original report is evidence at the VRB.",
    ],
    then: [
      "For PI, the [permanent impairment guide](/guides/permanent-impairment) covers stability and “reasonable treatment”, which a specialist’s report can address.",
    ],
    guides: ["medical-evidence", "permanent-impairment", "pi-after-liability", "appeals-vrb-art"],
    playbooks: ["dva-wants-more-medical"],
    letters: ["specialist-brief", "written-reasons"],
    contacts: ["Your treating specialist", "ATDP advocate"],
    caution: "A GP letter that restates history without a diagnosis does not address the PI tables.",
  },
  "result-restricted": {
    id: "result-restricted",
    title: "Contact restrictions: documents, adjustments and an advocate",
    summary:
      "The decision, and the documents behind it, can be asked for in writing.",
    doNow: [
      "An FOI request can ask for the SPOC / behaviour file and the documents considered.",
      "Reasonable adjustments under the DDA can be requested in writing, with a clinician’s letter.",
      "An advocate can be added as an additional contact.",
    ],
    then: [
      "The restriction letter sets the allowed channel and the review date.",
      "If a welfare check happened, a clinician’s letter can describe the clinical impact.",
    ],
    guides: ["contact-restrictions", "foi", "advocates"],
    playbooks: ["restricted-contact", "need-my-file"],
    letters: ["foi-request", "follow-up"],
    contacts: ["Advocacy Register", "Open Arms if you are unwell — 1800 011 046"],
    caution: "This is usually not a VRB matter. Do not discuss self-harm in the claims mailbox.",
  },
  "result-file": {
    id: "result-file",
    title: "Look in MyService first. If it is not there, ask for your own file",
    summary:
      "Your own information is free. One way of asking is faster. The other gives you a right of review if the release is thin.",
    doNow: [
      "Look in MyService for letters and reports you already have.",
      "If what you need is not there, your own file can be requested. A request that names the documents is narrower than one for “everything”, and a broad request can draw a practical refusal notice.",
    ],
    then: [
      "A personal information request is the faster ask. It has no review if the release is thin.",
      "A Freedom of Information request is the one with a right of review. Use it for notes, emails, and call recordings. Diary 14 days for an acknowledgement and 30 days for a decision.",
      "If the personal information release is thin, lodge Freedom of Information for the same documents so the review right attaches.",
      "If Freedom of Information stalls or blacks out too much, ask for an internal review, then the Information Commissioner.",
    ],
    guides: ["foi"],
    playbooks: ["need-my-file"],
    letters: ["foi-request", "foi-24ab"],
    contacts: ["Information.Access@dva.gov.au", "FOI webform", "PIR webform", "OAIC"],
    caution:
      "Some sentences may be blacked out. That does not mean the request failed. The letter should name the section, often 47C, 47E, or 47F.",
  },
  "result-foi-review": {
    id: "result-foi-review",
    title: "Internal review first, then the Information Commissioner",
    summary: "PIR cannot go to the OAIC. FOI can. Time limits are on the decision letter.",
    doNow: [
      "Read the FOI decision (or note that none arrived in time — deemed refusal).",
      "Send the FOI internal review letter to Information.Access@dva.gov.au. Another officer remakes it. 30 days.",
      "Diary OAIC: 60 days from written notice of an access refusal or charge decision. No fee. Apply on the OAIC site.",
    ],
    then: [
      "If PIR was the only request, FOI is the route with review rights and a statutory clock.",
      "A partial release still gives dates for a delay timeline (Ombudsman, CDDA).",
    ],
    guides: ["foi", "delays", "ombudsman"],
    playbooks: ["need-my-file"],
    letters: ["foi-internal-review", "foi-request", "foi-24ab"],
    contacts: ["Information.Access@dva.gov.au", "OAIC"],
    caution:
      "The dates on the letter set the clock.",
  },
  "result-file-policy": {
    id: "result-file-policy",
    title: "Search what is already published, then FOI the gap",
    summary:
      "CLIK, the Information Publication Scheme, and the FOI disclosure log are free. Non-personal FOI can attract charges.",
    doNow: [
      "Search CLIK and DVA’s FOI disclosure log for the policy you think exists.",
      "If it is not there, an FOI request for a named instrument, or the documents that guided a named decision type, is narrower than one for “all policy”.",
      "If DVA quotes a charge, wait for the estimate. You can contend it. Your own personal information is not charged.",
    ],
    then: ["Internal review and OAIC still apply to FOI refusals and charges."],
    guides: ["foi"],
    playbooks: ["need-my-file"],
    letters: ["foi-request"],
    contacts: ["Information.Access@dva.gov.au", "FOI webform", "OAIC"],
    caution:
      "A policy FOI is not a VRB appeal. It will not change last month’s PI rating by itself.",
  },
  "result-cdda": {
    id: "result-cdda",
    title: "CDDA is extra harm from bad administration — not a second PI claim",
    summary:
      "Map incidents to RMG 409, prove causation, cost the loss. Keep the statutory claim running in parallel.",
    doNow: [
      "A CDDA application sets out a timeline and a costed loss, with line items.",
      "The CDDA letter on this site is a template. The application goes to DVA.",
      "If the underlying decision is disputed, the VRB is a separate route.",
    ],
    then: ["If DVA sits on the CDDA application itself, that handling can go to the Ombudsman."],
    guides: ["cdda", "delays", "ombudsman"],
    playbooks: ["build-cdda"],
    letters: ["cdda-application"],
    contacts: ["DVA", "Commonwealth Ombudsman", "Finance RMG 409 (read it)"],
    caution:
      "Discretionary. Other remedies first. A later PI lump does not automatically erase a hardship-delay loss — but DVA may take a different view.",
  },
  "result-abuse": {
    id: "result-abuse",
    title: "Treatment and compensation are separate routes",
    summary:
      "NLHC mental health does not need you to prove service caused the condition. Compensation goes to DVA’s abuse team. Reparation is a different door.",
    doNow: [
      "If you are unsafe: 000. Open Arms 1800 011 046. 1800RESPECT 1800 737 732.",
      "Get Non-Liability Health Care / White Card mental health running — 1800 VETERAN or NLHC@dva.gov.au. This is not the compensation claim.",
      "If you want compensation, ask for the specialised sexual and physical abuse team and a social-worker contact. A statutory declaration can support the incident.",
    ],
    then: [
      "Defence Force Ombudsman reparation and National Redress are separate from DVA compensation.",
      "Do not put incident detail into an AI tool or this site’s feedback form.",
    ],
    guides: ["abuse-support", "hardship-asp", "advocates"],
    playbooks: ["need-money-now"],
    letters: ["follow-up"],
    contacts: [
      "Open Arms — 1800 011 046",
      "1800RESPECT — 1800 737 732",
      "1800 VETERAN — 1800 838 372",
      "NLHC@dva.gov.au",
    ],
    caution:
      "Incident detail goes to DVA’s specialised team, not a general claims inbox.",
  },
};

export function nodeForStart(start?: string | null): string {
  const map: Record<string, string> = {
    stuck: "stuck-hardship",
    money: "money-kind",
    decision: "decision-type",
    helping: "result-helping",
    lodge: "result-lodge",
    deadline: "result-deadline",
    medical: "result-medical",
    restricted: "result-restricted",
    file: "file-kind",
    cdda: "cdda-ready",
    house: "result-hhs",
    abuse: "result-abuse",
    unsafe: "result-crisis",
  };
  if (start && map[start]) return map[start];
  return "start";
}
