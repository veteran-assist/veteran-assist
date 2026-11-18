import type { Guide } from "./types";
import { rates, ratesWindowSentence } from "./rates";

export const guideCategories = [
  "Getting started",
  "Money and hardship",
  "Evidence",
  "Decisions and appeals",
  "Complaints and delay",
  "How DVA treats you",
] as const;

export const guides: Guide[] = [
  {
    slug: "start-here",
    title: "Start here: how DVA claims actually work",
    summary:
      "A plain map of liability, treatment, permanent impairment, incapacity, and hardship — and what changed on 1 July 2026.",
    category: "Getting started",
    updated: "August 2026",
    lastChecked: "19 October 2026",
    tags: ["MyService", "MRCA", "VETS Act", "liability", "overview"],
    related: [
      "vets-act-2026",
      "lodge-a-claim",
      "gold-card",
      "advocates",
      "helping-a-veteran",
      "household-services",
      "hardship-asp",
      "presumptive-liability",
      "asking-an-ai",
    ],
    officialLinks: [
      { label: "DVA MyService", href: "https://www.dva.gov.au/myservice" },
      { label: "Call 1800 VETERAN", href: "tel:1800838372" },
      { label: "What changed on 1 July 2026 (this site)", href: "/transition" },
      {
        label: "Legislation reform resources",
        href: "https://www.dva.gov.au/about-us/inquiries-and-reviews/veterans-legislation-reform",
      },
    ],
    blocks: [
      {
        type: "callout",
        tone: "info",
        title: "Check your letter",
        text: "Time limits, eligibility, and rates change. Check your decision letter and the official page. An ATDP-accredited advocate can help before you act on a live claim.",
      },
      {
        type: "p",
        text: "DVA is not one claim. It is a stack of different decisions that look similar in MyService but do different jobs. Each has its own clock and its own payment.",
      },
      {
        type: "h3",
        text: "The five decisions that matter",
        id: "five-decisions",
      },
      {
        type: "ol",
        items: [
          "Liability — DVA accepts that a condition is related to service. Nothing else (PI, incapacity, many treatment items) can finish until this is in.",
          "Treatment — gold/white card coverage, GP/specialist, pharmaceuticals, some allied health. Often starts once liability is accepted, sometimes earlier for mental health. The proposed $5,000 yearly allied-health cap was taken off the table on 17 September 2026.",
          "Permanent impairment (PI) — a tax-free payment for non-economic loss once the impairment is stable. Assessed with GARP M from 1 July 2026.",
          "Incapacity payments — wage replacement while you cannot work because of accepted conditions. Offset against some other income. Different from PI.",
          "Support around the edges — Acute Support Package, household services (cleaning, laundry, meals, garden), attendant care, rehabilitation, Veteran Payment (legacy rules), CDDA if administration itself caused extra harm. Household services are a separate claim.",
        ],
      },
      {
        type: "callout",
        tone: "action",
        title: "What to do first if you are overwhelmed",
        text: "Write down every live claim number, the date it was lodged, what it is actually for (liability / PI / incapacity / hardship), and the last time a human answered. The Pathfinder starts from that list. Each claim type has its own path.",
      },
      {
        type: "h3",
        text: "What 1 July 2026 changed",
        id: "july-2026",
      },
      {
        type: "p",
        text: "New claims from 1 July 2026 use one Act. Payments you already have stay. The Veterans’ Entitlements, Treatment and Support (Simplification and Harmonisation) Act — the VETS Act — closed the VEA and DRCA to new rehabilitation and compensation claims from that date. New claims are considered under an improved MRCA. Worsening of old VEA/DRCA conditions can still be compensated, but permanent impairment on the worsening is generally assessed under the MRCA using GARP M. The traps — the Chapter 26 baseline, the five-point gate, the redemption ceiling, and SRDP eligibility versus election — are on What changed, in the top menu, not only in this overview.",
      },
      {
        type: "p",
        text: "If you already have accepted conditions under the old Acts, those acceptances and current rates are grandfathered. You do not lose them because the law changed. You may, however, need a new MRCA claim for a new condition or for worsening PI.",
      },
      {
        type: "callout",
        tone: "action",
        title: "Some new claims are not the 116-day average",
        text: "From 1 July 2026, listed conditions with a confirmed diagnosis can be accepted as service-related without proving a Statement of Principles factor. DVA’s processing-times page (updated 23 October 2026) says an eligible presumptive-liability claim may be determined in less than two weeks. That is not every claim. Read Presumptive liability before you wait like the ordinary queue.",
      },
      {
        type: "h3",
        text: "Who can help you for free",
        id: "help",
      },
      {
        type: "ul",
        items: [
          "An ATDP-accredited compensation advocate through an ex-service organisation — find one at advocateregister.org.au.",
          "Open Arms (1800 011 046) for counselling. They do not run your claim, but they can keep you functioning while you do.",
          "DVA on 1800 VETERAN (1800 838 372) for process questions and the Acute Support Package (no form — it is a phone request).",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Keep a paper trail",
        text: "Every phone call: date, time, who you spoke to (name and position number if given), what you asked, what they said. The [DVA call sheet](/call-sheet) prints those lines for you. Screenshot MyService status. Save PDFs of letters. This file is the difference between “I think they delayed me” and a CDDA or Ombudsman complaint that can be tested.",
      },
      {
        type: "h3",
        text: "Joining or re-joining the ADF is not a DVA question",
        id: "rejoin",
      },
      {
        type: "p",
        text: "Whether you can re-join after a medical discharge, move to another Service, or get a recruiting “medically unfit” decision reviewed is decided by Defence Force Recruiting, not DVA. The medical standards they apply are not published, so this site cannot tell you what evidence will change a decision. Ask Defence Force Recruiting through ADF Careers (adfcareers.gov.au), and ask them in writing which condition the decision rests on and what evidence they would consider.",
      },
      {
        type: "p",
        text: "The part that is DVA’s business: incapacity payments are reduced or stop when you earn, and you must tell DVA about any work. If you receive incapacity payments or a CSC invalidity benefit, DVA and CSC are the ones who can say what re-joining would do to them.",
      },
    ],
  },
  {
    slug: "vets-act-2026",
    title: "The VETS Act: what 1 July 2026 actually did",
    summary:
      "One Act for new claims, GARP M for impairment, grandfathered payments, and why old DRCA/VEA files still matter.",
    category: "Getting started",
    updated: "August 2026",
    lastChecked: "1 November 2026",
    tags: ["VETS Act", "MRCA", "GARP M", "grandparenting", "SRDP"],
    related: [
      "start-here",
      "permanent-impairment",
      "lodge-a-claim",
      "presumptive-liability",
      "incapacity-offsets",
    ],
    officialLinks: [
      { label: "What changed on 1 July 2026 (this site)", href: "/transition" },
      {
        label: "Conditions and claims processing times (DVA)",
        href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/conditions-and-claims-processing-times",
      },
      {
        label: "Veterans’ legislation reform (DVA)",
        href: "https://www.dva.gov.au/about-us/inquiries-and-reviews/veterans-legislation-reform",
      },
      {
        label: "DVA permanent impairment reform page",
        href: "https://www.dva.gov.au/about-us/inquiries-and-reviews/veterans-legislation-reform/veterans-legislation-reform-resources/permanent-impairment-compensation",
      },
      {
        label: "GARP M 2026 (legislation)",
        href: "https://www.legislation.gov.au/F2026L00595/asmade/text",
      },
    ],
    blocks: [
      {
        type: "callout",
        tone: "warn",
        title: "Read the traps page, not only this overview",
        text: "This guide is the shape of the reform. The things that actually cost money — liability versus impairment lodgement dates, the Chapter 26 baseline, the five-point gate, the $287.94 redemption ceiling, and SRDP eligibility versus election — are on What changed on 1 July 2026 (top menu). We do not know which Guide applies to a PI claim lodged after 1 July 2026 on a DRCA liability claim lodged before it. We will not guess.",
      },
      {
        type: "p",
        text: "From 1 July 2026, Australia no longer runs three live compensation systems for new claims. The VEA and DRCA closed to new rehabilitation and compensation claims. New claims are determined under an improved Military Rehabilitation and Compensation Act 2004 (MRCA). That is the practical core of the VETS Act.",
      },
      {
        type: "h3",
        text: "Which Act is my claim under?",
        id: "which-act",
      },
      {
        type: "ul",
        items: [
          "Claims lodged from 1 July 2026 are MRCA, regardless of when you served. DVA’s processing-times page (updated 23 October 2026) says the MRCA applies to all claims lodged from that date, irrespective of when you were injured or when you served.",
          "Initial liability and permanent impairment claims received before 1 July 2026 continue under the VEA, DRCA or MRCA rules that applied to them. DVA calls this the tri-Act system for those files.",
          "The traps that cost money — lodgement dates, the Chapter 26 baseline, and SRDP — are on [What changed on 1 July 2026](/transition). This box does not repeat that page.",
        ],
      },
      {
        type: "p",
        text: "“DVA offered to assess under VEA or MRCA instead of DRCA: what about offsets?” Confirm from source, and from the letter in front of you. This site will not guess which offset rule applies to an offer you have not read.",
      },
      {
        type: "p",
        text: "“Can points from different Acts combine for the Gold Card?” Confirm from source. The [Gold Card guide](/guides/gold-card) already sets out the DRCA paths DVA has published, including a new MRCA condition or a 5-point worsening.",
      },
      {
        type: "h3",
        text: "What is protected",
        id: "protected",
      },
      {
        type: "ul",
        items: [
          "Payments you were already receiving under VEA or DRCA continue. Periodic rates still index.",
          "Accepted conditions stay accepted. You do not re-prove liability for an old acceptance just because the Act changed.",
          "A DRCA lump sum already paid is not clawed back because of the reform.",
          "If a DRCA or VEA claim was lodged before 1 July 2026 and later accepted, PI for that claim is generally still assessed under the old Act. Worsening claimed after 1 July 2026 is the point where MRCA/GARP M usually takes over.",
        ],
      },
      {
        type: "h3",
        text: "GARP M is now the impairment tool",
        id: "garp",
      },
      {
        type: "p",
        text: "Each old Act used a different impairment guide. From 1 July 2026 the Guide to Determining Impairment and Compensation 2026 (GARP M) is the single tool. It includes new chapters so prior VEA/DRCA ratings can be converted to a baseline, and any worsening is measured as an increase from that baseline rather than starting from zero.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "The converted baseline is what later worsening is measured from",
        text: "If DVA converts an old DRCA percentage into GARP M points, that converted figure becomes the baseline, and any later worsening is measured as an increase from it. The conversion table and the specialist report behind the original rating are the documents that show how the figure was reached.",
      },
      {
        type: "h3",
        text: "MRCA PI shape (weekly, lump, or mix)",
        id: "pi-shape",
      },
      {
        type: "p",
        text: "Under the improved MRCA, permanent impairment can be paid as a weekly amount (usually fortnightly), converted to an age-based lump sum, or a combination. Extra payment under MRCA section 80 can apply if you have at least 80 impairment points and an eligible young person, on a new accepted condition or a 5-point worsening. Financial advice is required for some veterans before a lump sum. An age-based lump is not automatically the better deal — especially if you are younger. Run the numbers, including what happens for dependants if you die, before you commute.",
      },
      {
        type: "h3",
        text: "What this site will not tell you",
        id: "limits",
      },
      {
        type: "p",
        text: "We will not pick your pathway election or invent a combined impairment score. Those turn on your actual determinations, medical reports, and the GARP M tables in force. Bring the documents. Which Act each live claim sits under matters from 1 July 2026, because existing payments continue under the old rules while new claims go under the MRCA.",
      },
      {
        type: "p",
        text: "Presumptive liability is the other 1 July change that actually speeds some files: listed conditions with a confirmed diagnosis, lodged from that date, can be accepted without proving a SoP factor. Read that guide before you wait out the 116-day average.",
      },
    ],
  },
  {
    slug: "lodge-a-claim",
    title: "How to lodge a claim that can actually be decided",
    summary:
      "MyService, what to attach, Statements of Principles, and how to stop sequential information requests eating six months.",
    category: "Getting started",
    updated: "August 2026",
    lastChecked: "19 October 2026",
    tags: ["MyService", "SoP", "liability", "evidence", "lodgement"],
    related: ["medical-evidence", "start-here", "delays", "presumptive-liability"],
    officialLinks: [
      { label: "MyService", href: "https://www.dva.gov.au/myservice" },
      {
        label: "How to apply for Initial Liability in MyService",
        href: "https://www.dva.gov.au/about-myservice/how-to-apply-for-initial-liability-in-myservice",
      },
      { label: "RMA Statements of Principles", href: "https://www.rma.gov.au/" },
      {
        label: "Presumptive liability (DVA)",
        href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/making-a-claim-for-a-service-related-condition/presumptive-liability",
      },
    ],
    blocks: [
      {
        type: "p",
        text: "From 1 July 2026 a new compensation claim is an MRCA claim, regardless of when you served. You still lodge through MyService where you can. You can also lodge through an advocate. A phone claim still needs the attachments, or it sits.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Name the condition the way a doctor would",
            text: "“Bad back” is not a claim. “Lumbar spondylosis” or “chronic adjustment disorder with anxiety” can be matched to a Statement of Principles, or to the presumptive list. If you are unsure, lodge the diagnosis your treating specialist has already written, not a guess.",
          },
          {
            title: "Check presumptive liability before you grind the SoP",
            text: "Claims lodged from 1 July 2026 for a listed condition, with a confirmed diagnosis, can be accepted without proving the SoP link. That is not every condition and not every old claim. Read the presumptive-liability guide. If you are not on the list, find the SoP next.",
          },
          {
            title: "Find the Statement of Principles (SoP) if presumptive does not apply",
            text: "The Repatriation Medical Authority publishes SoPs that list the factors DVA uses to connect a condition to service. If you meet a factor (for example, a defined period of weight-bearing, a documented incident, a specified number of flying hours), say so in the claim and point to the evidence.",
          },
          {
            title: "Lodge one initial-liability condition at a time in MyService",
            text: "DVA’s MyService how-to (updated 18 September 2026) says you can only submit an Initial Liability claim for one condition at a time in MyService. A second condition is a second claim. An advocate can still lodge on paper if that is the better pack.",
          },
          {
            title: "Attach a closed pack, not a breadcrumb",
            text: "Service history or PMKeys print, incident or unit records if you have them, GP and specialist letters that actually diagnose the condition, imaging, and a short chronology. One PDF pack beats twelve “please see previous email” threads.",
          },
          {
            title: "Say what you want decided",
            text: "Liability only? Liability plus PI? Incapacity? Household services? If you need treatment now, say that. Delegates decide the question in front of them. An unspoken PI request is not a PI claim.",
          },
          {
            title: "Keep a lodgement receipt",
            text: "Screenshot the MyService confirmation, note the claim number, and diary a follow-up at the published processing timeframe — not “when I remember”. If it is a presumptive claim with a diagnosis attached, diary two weeks, not 116 days, then chase once.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "When DVA asks for the same thing again",
        text: "A reply to an information request can list its attachments in a numbered index. If DVA asks again for something already provided, a reply can give the date and document name of the earlier send.",
      },
      {
        type: "h3",
        text: "Conditions that usually need a specialist, not just a GP",
        id: "specialist",
      },
      {
        type: "ul",
        items: [
          "Psychiatric conditions — treating psychiatrist reports carry more weight than a GP mental health care plan alone, especially for PI tables.",
          "Hearing, tinnitus, barotrauma — audiology plus ENT.",
          "Musculoskeletal PI — orthopaedic or occupational physician, with range-of-motion and functional limits written to the GARP M tables.",
          "Skin — dermatologist if you are claiming ongoing treatment and ADL impact.",
          "Vision / refractive change after hyperbaric exposure — optometrist or ophthalmologist with a documented history of exposure.",
        ],
      },
    ],
  },
  {
    slug: "delays",
    title: "When a claim is stuck: delay that is just slow, and delay that is defective",
    summary:
      "How to chase a live claim, when to ask for expedition, and when delay itself becomes a CDDA or Ombudsman issue.",
    category: "Complaints and delay",
    updated: "August 2026",
    lastChecked: "1 November 2026",
    tags: ["delay", "expedition", "Ombudsman", "CDDA", "MyService"],
    related: ["cdda", "ombudsman", "foi", "hardship-asp", "pi-after-liability"],
    officialLinks: [
      {
        label: "DVA feedback and complaints",
        href: "https://www.dva.gov.au/about-us/contact-us/feedback-form/feedback",
      },
      { label: "Commonwealth Ombudsman", href: "https://www.ombudsman.gov.au/" },
      {
        label: "Conditions and claims processing times (DVA)",
        href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/conditions-and-claims-processing-times",
      },
      {
        label: "CSC — retrospective invalidity (member guide)",
        href: "https://www.csc.gov.au/members/manage-super/Sickness-and-injury/ADF-medical-transition/Member-guide",
      },
    ],
    blocks: [
      {
        type: "p",
        text: "DVA publishes processing timeframes. A claim sitting inside those timeframes is slow and infuriating; it is not, by itself, defective administration. A claim that has been flagged for expedition because of financial hardship or deteriorating mental health, and then left untouched for weeks with no substantive action, is a different animal. The file has to show the flag, the date, and the silence.",
      },
      {
        type: "h3",
        text: "How long DVA says it takes",
        id: "how-long",
      },
      {
        type: "p",
        text: "These figures are averages, not a promise. Your file can be faster or much slower. “To process” includes the time to allocate and leaves out time DVA is waiting on you or someone else. “Age of files still waiting” is a different measure, so the two cannot be compared. As at 30 September 2026, from DVA’s conditions and claims processing times page (updated 23 October 2026).",
      },
      {
        type: "ul",
        items: [
          "MRCA initial liability: 13 days on average to allocate to a claims support officer. Claims received in the last 12 months averaged 116 days to process. The average age of files still waiting is 193 days.",
          "MRCA permanent impairment: 146 days on average to allocate to a claims support officer, counted from the liability decision or from lodgement, whichever is later. Claims received in the last 12 months averaged 171 days to process (47 days waiting for external information and 123 days with DVA). The average age of outstanding claims is 185 days. The step-by-step is on [Liability accepted. Now what?](/guides/pi-after-liability).",
          "Historical initial liability (DRCA and VEA still on hand): average age 301 days as at 30 September 2026. DVA does not publish a separate “to decision” average for this stream on that page.",
          "DRCA permanent impairment still on hand: average age 269 days as at 30 September 2026.",
          "Incapacity: that page does not publish a processing time. Confirm from source before you quote one.",
          "Expedited claims, and the stages after allocation (for example from the last assessment to a decision): that page publishes no time for them.",
        ],
      },
      {
        type: "p",
        text: "An older DVA snapshot used different day counts and a different date range. Use the live page, not a copied table. Retrospective invalidity is decided by CSC, not DVA. CSC’s member guide says demand has increased, each assessment varies, and it does not publish a fixed number of days.",
      },
      {
        type: "h3",
        text: "The steps in a written follow-up",
        id: "chase",
      },
      {
        type: "ol",
        items: [
          "Check MyService and any unopened letters. Many “delays” are a request sitting in the portal.",
          "A written follow-up to the allocated delegate or team gives the claim number, lodgement date, what needs deciding, and a question: “What is the current status, what is outstanding from me, and when will it next be actioned?”",
          "If there is no reply, the same letter can be sent again marked as a second request.",
          "If hardship or a mental health crisis is the reason it cannot wait, a written request for expedition can say so and attach evidence (medical certificate, overdue bills, notice of eviction, child support).",
          "If there is still nothing, there are three separate routes: a DVA complaint, the Commonwealth Ombudsman, and (if the delay itself caused extra loss) a CDDA claim. They are not substitutes for each other.",
        ],
      },
      {
        type: "callout",
        tone: "action",
        title: "What a request to expedite can include",
        text: "If you phone, use the [DVA call sheet](/call-sheet) and get a call reference. A written request can give the date lodged, the published timeframe, days elapsed, why the delay is causing harm now, the decision needed, and evidence of harm. The expedition letter on this site is a template.",
      },
      {
        type: "h3",
        text: "Backlog versus failure to prioritise",
        id: "two-stories",
      },
      {
        type: "p",
        text: "A reply of “there is a backlog” answers a different question from whether a file flagged as urgent was treated as urgent. They are different matters for the Commonwealth Ombudsman to look at.",
      },
      {
        type: "h3",
        text: "What delay is not",
        id: "not",
      },
      {
        type: "ul",
        items: [
          "A medical report DVA is still waiting on from your specialist is not DVA delay. Chase the specialist too.",
          "A PI claim that cannot start because liability is not accepted yet is not a PI delay. It is a liability delay.",
          "A payment that was made, but you disagree with the rate, is a decision. That is a review matter, not a delay.",
        ],
      },
      {
        type: "quote",
        text: "A written question can ask DVA what the claim is waiting on and the date by which a decision is expected. The follow-up letter has wording for that.",
      },
    ],
  },
  {
    slug: "hardship-asp",
    title: "Hardship, the Acute Support Package, and needing money this month",
    summary:
      "What ASP actually funds, who is eligible after 1 July 2026, what it will not pay, and how to ask without a form.",
    category: "Money and hardship",
    updated: "August 2026",
    lastChecked: "25 October 2026",
    tags: ["ASP", "hardship", "family", "incapacity", "crisis"],
    related: ["delays", "incapacity-offsets", "household-services", "cdda"],
    officialLinks: [
      {
        label: "Acute Support Package (DVA)",
        href: "https://www.dva.gov.au/what-we-help-with/get-urgent-support/acute-support-package",
      },
      { label: "Apply by calling 1800 VETERAN", href: "tel:1800838372" },
    ],
    blocks: [
      {
        type: "callout",
        tone: "crisis",
        title: "If you are in immediate danger",
        text: "Call 000. Open Arms is 1800 011 046 (24/7). ASP is not an emergency service and DVA says so on the page. Do not wait on a package if the house is unsafe tonight.",
      },
      {
        type: "p",
        text: "The Defence, Veterans’ and Families’ Acute Support Package is short-term, flexible support when a veteran or related person is in, or at risk of, crisis because of new and challenging life circumstances. From 1 July 2026 all new ASP requests are assessed under the MRCA. Existing packages continue until they expire.",
      },
      {
        type: "h3",
        text: "Who can get it (plain version)",
        id: "who",
      },
      {
        type: "ul",
        items: [
          "Veterans or serving members under 65 on (or eligible for) incapacity payments, SRDP, special/intermediate rate DCP, or Veteran Payment — including some nil-rate incapacity situations with a current medical certificate.",
          "Some former partners under 65, and a wide class of related persons (partners, parents, children, siblings, people in a parent-like role) who are in crisis connected to the veteran’s wellbeing. Related persons do not always have to live with the veteran.",
          "Some bereaved partners and bereaved parents, with higher caps, where the death was service-related (including suicide) and was less than two years ago.",
        ],
      },
      {
        type: "h3",
        text: "What it pays, and the caps",
        id: "caps",
      },
      {
        type: "p",
        text: "DVA pays providers directly. Typical funded services: help around the home, support for children (childcare, tutoring, sport), short courses or group activities to get someone back into the community, and some counselling for lifestyle or psychosocial issues. For veterans, former partners, or related persons the published maxima are $7,500 in the first 12 months and $5,000 in the second. Bereaved partners/parents have a much higher cap ($27,835 each 12 months over a continuous 24-month period). Extra child amounts apply in the early school years. Check the live DVA page — these figures match DVA’s page as last updated on 19 August 2026.",
      },
      {
        type: "h3",
        text: "What it will not do",
        id: "wont",
      },
      {
        type: "ul",
        items: [
          "It is not cash in your account. It is not income support and it is not a substitute for incapacity payments.",
          "It does not pay medical or dental treatment, legal fees, or general cost-of-living pressure.",
          "“Chronic” hardship with no recent change of circumstances is the usual reason a request stalls. The policy language is about a new or newly impactful situation you did not control, causing a breakdown in how the family functions.",
        ],
      },
      {
        type: "callout",
        tone: "action",
        title: "There is no form",
        text: "Call 1800 VETERAN (1800 838 372). A request describes the new circumstance, who is affected (including children), what needs funding, and which providers are involved. A follow-up email repeating the request puts it in writing. If a delegate says they are “awaiting policy advice”, the complaint steps in the [Delays guide](/guides/delays) apply.",
      },
      {
        type: "p",
        text: "If children are in the house, say so. Per-child needs (education, care, extra-curricular) are exactly what the package is built to fund, but they are not inferred. Name the child, the need, and a provider. If you are later arguing detriment for CDDA, unpaid invoices and a stalled ASP request are the exhibits.",
      },
      {
        type: "callout",
        tone: "info",
        title: "ASP is not household services",
        text: "ASP is short-term crisis support, requested by phone, paid to providers, with published dollar caps. Household services (and attendant care) are compensation for domestic or personal-care tasks you can no longer do because of accepted conditions. Different form, different mailbox (hhs@dva.gov.au), different weekly cap, often an OT assessment. If the house is not getting cleaned because of an accepted condition, lodge Household Services as well — do not wait for ASP to become a cleaner.",
      },
    ],
  },
  {
    slug: "medical-evidence",
    title: "Medical evidence that actually moves a claim",
    summary:
      "What a useful specialist report contains, how GARP M tables get used, and what to do when a delegate rewrites your psychiatrist.",
    category: "Evidence",
    updated: "August 2026",
    lastChecked: "19 October 2026",
    tags: ["WPI", "GARP M", "psychiatrist", "specialist", "AHPRA"],
    related: ["permanent-impairment", "lodge-a-claim", "appeals-vrb-art", "contact-restrictions"],
    officialLinks: [
      { label: "GARP M 2026", href: "https://www.legislation.gov.au/F2026L00595/asmade/text" },
    ],
    blocks: [
      {
        type: "p",
        text: "DVA does not need another letter that says you are unwell. It needs a report that diagnoses a condition, links it to service (or to aggravation), describes function in the language of the impairment tables, and says whether the condition is stable.",
      },
      {
        type: "h3",
        text: "Brief the specialist in writing",
        id: "brief",
      },
      {
        type: "p",
        text: "A specialist report is most useful when it addresses diagnosis, causation or aggravation, current function, treatment already tried, stability, and prognosis, in the language of the impairment tables. The specialist briefing letter in Letters is a template that sets out the claim number, DVA’s question, the relevant GARP M chapter, a one-page chronology and previous reports.",
      },
      {
        type: "h3",
        text: "Psychiatric reports",
        id: "psych",
      },
      {
        type: "ul",
        items: [
          "A diagnosis using accepted criteria.",
          "Functional impact written against the psychiatric table descriptors — thinking, behaviour, self-care, need for supervision, reaction to ordinary stress.",
          "If administrative processes (delay, restricted contact, a welfare check) have aggravated symptoms, the psychiatrist should say so as a clinical opinion, not as a legal conclusion.",
          "Comment on capacity for work, study, and vocational rehabilitation if incapacity is live.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "When DVA adjusts a treating psychiatrist’s rating",
        text: "If DVA discounts a treating psychiatrist’s WPI range, marks the report with an “irregularity”, or changes Non-Economic Loss scores, a written question can ask for the clinical basis for the adjustment and whether an AHPRA-registered psychiatrist reviewed the file. The Veterans’ Review Board is the first external review of the decision.",
      },
      {
        type: "h3",
        text: "Physical conditions and hardship",
        id: "physical",
      },
      {
        type: "p",
        text: "Ankle, shoulder, elbow, knee, skin, hearing, migraine, and sleep conditions can affect whether a person can sit in a claims process, work, or manage self-care. Combined impairment, household services, and incapacity can each depend on physical limits as well as mental ones.",
      },
      {
        type: "h3",
        text: "Stability and “reasonable treatment”",
        id: "stable",
      },
      {
        type: "p",
        text: "PI waits on permanence. If DVA says you have not had “reasonable treatment”, a written question can ask which treatment it means, which clinician recommended it, and why the treatment already done does not count.",
      },
    ],
  },
  {
    slug: "gold-card",
    title: "Gold Card: how veterans actually get one",
    summary:
      "Under 70, the Gold Card (Veteran Card – All Conditions) can come from impairment points rather than a form. The steps are: conditions accepted, conditions rated, and how the points combine.",
    category: "Getting started",
    updated: "24 October 2026",
    lastChecked: "24 October 2026",
    tags: ["Gold Card", "MRCA", "60 points", "SRDP", "ADA", "GARP M", "how to get", "points"],
    related: [
      "gold-card-concessions",
      "permanent-impairment",
      "lodge-a-claim",
      "vets-act-2026",
      "medical-evidence",
      "treatment-on-your-card",
    ],
    officialLinks: [
      {
        label: "Veteran Card – All Conditions (DVA)",
        href: "https://www.dva.gov.au/access-benefits/veteran-card/veteran-card-all-conditions",
      },
      {
        label: "Permanent impairment compensation (DVA)",
        href: "https://www.dva.gov.au/about-us/inquiries-and-reviews/veterans-legislation-reform/veterans-legislation-reform-resources/permanent-impairment-compensation",
      },
      {
        label: "Special Rate Disability Pension (DVA)",
        href: "https://www.dva.gov.au/access-benefits/pensions-and-payments/support-when-you-cannot-work/eligibility-for-disability-compensation-payments/special-rate-disability-pension",
      },
      {
        label: "Additional Disablement Amount (DVA)",
        href: "https://www.dva.gov.au/access-benefits/pensions-and-payments/support-when-you-cannot-work/additional-disablement-amount-ada",
      },
      {
        label: "DRCA veterans and the Gold Card (DVA)",
        href: "https://www.dva.gov.au/about-us/inquiries-and-reviews/veterans-legislation-reform/veterans-legislation-reform-resources/drca-veterans",
      },
      {
        label: "Veteran Card changes from 1 July 2026 (DVA)",
        href: "https://www.dva.gov.au/about-us/inquiries-and-reviews/veterans-legislation-reform/veterans-legislation-reform-resources/veteran-card",
      },
      {
        label: "Gold Card form for age 70 (D3057)",
        href: "https://www.dva.gov.au/about-us/dva-forms/apply-gold-card",
      },
      { label: "Impairment points calculator on this site", href: "/calculator" },
    ],
    blocks: [
      {
        type: "callout",
        tone: "action",
        title: "Start here",
        text: "On the impairment-points route you do not apply for the Gold Card separately. It arrives after DVA decides your service-related conditions add up to enough impairment points. So the card depends on three things: conditions accepted, conditions rated, and how the ratings combine. The four steps below follow that order.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Get into MyService and see what DVA already has",
            text: "Register for MyService through myGov. It shows the conditions DVA has accepted as caused by your service (your accepted conditions). If you have a White Card, those are the conditions it covers. Write the list down. That list is what the points come from.",
          },
          {
            title: "Claim every condition you have a diagnosis for",
            text: "A condition that has never been claimed gives no points. In MyService a condition is lodged one at a time. The [lodging a claim guide](/guides/lodge-a-claim) covers what a claim includes.",
          },
          {
            title: "Get your accepted conditions rated",
            text: "Each accepted condition is given an impairment rating in points. DVA’s permanent impairment page (updated 29 May 2026) says this is considered in the needs assessment after DVA accepts a condition, and that you can also ask for it at any time in writing. The [permanent impairment guide](/guides/permanent-impairment) explains how ratings are built.",
          },
          {
            title: "Read the combined figure on your decision letter",
            text: "DVA combines the ratings into one number. If that combined number is 60 or more under the MRCA (the Act that covers all new claims since 1 July 2026), DVA sends the card. There is usually no separate Gold Card form for this. If the letter says 60 or more and no card arrives, call 1800 VETERAN (1800 838 372).",
          },
        ],
      },
      {
        type: "h3",
        text: "Points combine. They do not add up.",
        id: "combine",
      },
      {
        type: "p",
        text: "Ratings are combined using the method in DVA’s impairment guide (GARP M), largest first. Each new rating counts only against what is left of 100, so the total grows more slowly than adding them up.",
      },
      {
        type: "ul",
        items: [
          "44 and 40 combine to 66, not 84.",
          "If you are on 56 combined, a new 4-point condition takes you to about 58, not 60.",
          "On this site’s calculator, someone on 56 needs a new condition rated about 8 points to reach 60.",
          "A worsening of a condition you already have is different: the new rating replaces the old one, then everything is combined again.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Check your own numbers",
        text: "The [impairment points calculator](/calculator) does this maths on your device. It is an estimate: it does not know DVA’s tables or your lifestyle rating. Your decision letter is the real number.",
      },
      {
        type: "h3",
        text: "If you are short of 60",
        id: "short",
      },
      {
        type: "ul",
        items: [
          "A diagnosed condition that was never claimed adds nothing. Each condition that is accepted and rated adds to the combined figure.",
          "If an accepted condition has got worse, ask for it to be reassessed. Since 1 July 2026, DVA measures a worsening from a starting rating (baseline) under GARP M, not from zero.",
          "Before you lodge anything new on an old VEA or DRCA file, read [What changed on 1 July 2026](/transition). A new claim can change which rules apply to you.",
        ],
      },
      {
        type: "h3",
        text: "Other ways to get the card",
        id: "other-ways",
      },
      {
        type: "p",
        text: "Points are the most common way, but not the only one. DVA’s [Veteran Card – All Conditions page](https://www.dva.gov.au/access-benefits/veteran-card/veteran-card-all-conditions) (updated 11 September 2026) also lists these:",
      },
      {
        type: "ul",
        items: [
          "Special Rate Disability Pension (SRDP): being eligible is enough. You do not have to take the payment (see below).",
          "Additional Disablement Amount (ADA), for veterans of age pension age with high impairment (see below).",
          "Qualifying service and over 70: DVA sends the card automatically. If it has not arrived, download form D3057 (PDF). That form is only for this age-70 route, not for points.",
          "Under 70 and on a Service Pension, plus one of: blind in both eyes, at least 30 MRCA impairment points, a Disability Compensation Payment at 50% of the general rate or more, or income and assets under the limits on DVA’s page.",
          "Under the VEA: a Disability Compensation Payment at 100% of the general rate or more, or an extra amount for specific disabilities.",
          "Ex-prisoner of war, British Commonwealth Occupation Force service in Japan (16 August 1945 to 28 April 1952), or the British Nuclear Test program.",
          "Family: War Widow(er)’s Pension, the Orphan’s Pension, and some partners and children of a veteran whose death is accepted. The full list is in [who gets the Gold Card](/guides/gold-card-concessions#who).",
        ],
      },
      {
        type: "h3",
        text: "If you can no longer work: SRDP",
        id: "srdp",
      },
      {
        type: "p",
        text: "DVA’s [Special Rate Disability Pension page](https://www.dva.gov.au/access-benefits/pensions-and-payments/support-when-you-cannot-work/eligibility-for-disability-compensation-payments/special-rate-disability-pension) (updated 1 July 2026) says that once you are eligible for SRDP, even if you choose not to take the payment, you get a Gold Card printed TPI. DVA’s DRCA veterans page (updated 11 June 2026) lists the tests:",
      },
      {
        type: "ul",
        items: [
          "you are receiving MRCA incapacity payments;",
          "you have 50 or more impairment points;",
          "your treating specialists confirm you cannot work more than 10 hours a week; and",
          "they confirm rehabilitation is unlikely to improve your ability to work.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Eligible is not the same as electing",
        text: "DVA offers the SRDP payment in writing. You then have 12 months from the date of the offer to accept. You must get independent financial advice first, and once you choose to receive SRDP it cannot be changed. The card comes with eligibility, so taking the payment is not needed to get the card.",
      },
      {
        type: "h3",
        text: "If you are age pension age: ADA",
        id: "ada",
      },
      {
        type: "p",
        text: "DVA’s [Additional Disablement Amount page](https://www.dva.gov.au/access-benefits/pensions-and-payments/support-when-you-cannot-work/additional-disablement-amount-ada) (updated 1 July 2026) says it is for veterans who are age pension age or older, have at least 70 impairment points and a lifestyle rating of at least 6, are not on MRCA incapacity payments, and are not receiving SRDP or the EDA, Special Rate (TPI), Temporary Special Rate or Intermediate Rate under the VEA. DVA can start the claim itself from what it already holds, or you can ask by email at ADApayments@dva.gov.au. The card that comes with it is printed EDA.",
      },
      {
        type: "h3",
        text: "If your conditions were accepted under the DRCA",
        id: "drca",
      },
      {
        type: "callout",
        tone: "warn",
        title: "60 points alone is not enough",
        text: "DVA’s DRCA veterans page (updated 11 June 2026) says a former DRCA veteran needs 60 or more impairment points and either a new condition accepted under the MRCA (claims from 1 July 2026), or an increase of at least 5 impairment points since the previous assessment. If neither has happened, the first step is a new claim or a reassessment, not a Gold Card request.",
      },
      {
        type: "h3",
        text: "Already have a Gold Card?",
        id: "already",
      },
      {
        type: "p",
        text: "Keep it. DVA’s legislation reform page on the Veteran Card (updated 2 February 2026) says VEA Gold Card holders have no change to their entitlements, and MRCA eligibility stays the same. What the card pays for, and the car, transport and bill concessions, are in [Gold Card: what it covers](/guides/gold-card-concessions).",
      },
      {
        type: "h3",
        text: "The law, briefly",
        id: "law",
      },
      {
        type: "p",
        text: "The 60-point route is section 281 of the Military Rehabilitation and Compensation Act 2004. In plain terms: once DVA (for the Commission) has decided your impairment from one or more service conditions is 60 or more points, and it stays at 60 or more, you are entitled to treatment for any condition provided after that decision. Subsection (2) limits this when your only condition is a single aggravated injury or disease: then the impairment from the aggravation (or material contribution) itself has to be, and stay, 60 or more points.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Last checked 24 October 2026",
        text: "Sources: DVA Veteran Card – All Conditions (updated 11 September 2026); DVA permanent impairment compensation (updated 29 May 2026); DVA Special Rate Disability Pension (updated 1 July 2026); DVA Additional Disablement Amount (updated 1 July 2026); DVA DRCA veterans (updated 11 June 2026); DVA legislation reform Veteran Card page (updated 2 February 2026); MRCA section 281 on AustLII (accessed 24 October 2026). The worked examples use this site’s calculator and are estimates. If an official page says something different, the official page wins.",
      },
    ],
  },
  {
    slug: "permanent-impairment",
    title: "Permanent impairment, GARP M, and the 80-point questions",
    summary:
      "How PI is assessed after 1 July 2026, weekly versus lump sum, section 80, SRDP, and why combined ratings matter.",
    category: "Evidence",
    updated: "August 2026",
    lastChecked: "19 October 2026",
    tags: ["PI", "GARP M", "SRDP", "section 80", "lump sum", "gold card", "combined values"],
    related: [
      "gold-card",
      "vets-act-2026",
      "medical-evidence",
      "incapacity-offsets",
      "pi-after-liability",
    ],
    officialLinks: [
      {
        label: "DVA PI compensation (reform)",
        href: "https://www.dva.gov.au/about-us/inquiries-and-reviews/veterans-legislation-reform/veterans-legislation-reform-resources/permanent-impairment-compensation",
      },
      { label: "What changed on 1 July 2026 (this site)", href: "/transition" },
      { label: "WPI calculator on this site", href: "/calculator" },
    ],
    blocks: [
      {
        type: "p",
        text: "Permanent impairment compensation is for non-economic loss — pain, suffering, loss of amenities — from accepted conditions that are permanent. It is not wage replacement. It is generally tax-free. Under the improved MRCA you can take it as a periodic payment, an age-based lump sum, or a mix. Financial advice is required in some cases before a lump.",
      },
      {
        type: "h3",
        text: "How a rating is built",
        id: "rating",
      },
      {
        type: "ol",
        items: [
          "Each accepted condition is assessed against the relevant GARP M chapter.",
          "Ratings are combined using the GARP M combining rules (not simple addition).",
          "Lifestyle / non-economic loss components may still be argued — read the current tables rather than an old DRCA NEL questionnaire.",
          "Old VEA/DRCA ratings can be converted to a GARP M baseline. Worsening is the increase from that baseline.",
        ],
      },
      {
        type: "callout",
        tone: "action",
        title: "Combine points before you guess at Gold Card",
        text: "Ratings combine with a diminishing formula, not simple addition. 44 and 40 is 66 combined, not 84. Being 4 combined points short of Gold Card is not the same as needing 4 more on a new letter — a new independent condition is combined with what you already have, so it has to be larger. The impairment calculator (top menu) does that locally. MRCA Gold Card is usually 60 combined points (s 281). DRCA-only veterans generally need a new MRCA condition or a 5-point worsening after 1 July 2026. Estimate only.",
      },
      {
        type: "h3",
        text: "Section 80 and children",
        id: "s80",
      },
      {
        type: "p",
        text: "MRCA section 80 is an additional PI payment where the veteran has at least 80 impairment points and there is an eligible young person. After 1 July 2026 it can be triggered by a new accepted condition or a 5-point worsening, and the class of eligible recipients is broader than some older advice suggested. If you have children and you are near that threshold, a one- or two-point fight on a table is not academic.",
      },
      {
        type: "h3",
        text: "SRDP",
        id: "srdp",
      },
      {
        type: "p",
        text: "The Special Rate Disability Pension is a periodic MRCA payment for veterans with severe, ongoing incapacity who meet the statutory tests (including impairment and work tests). Eligibility and election are not the same thing. DVA’s own page (last updated 1 July 2026) says that once you are eligible for SRDP, even if you choose not to receive the SRDP payment, you get a Veteran Card — All Conditions embossed TPI, the high-rate MRCA Supplement, and MRCAETS for dependent children. Ask for the eligibility assessment, not the payment. The election is irreversible and you have 12 months from the written offer. See What changed on 1 July 2026.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Lump sums and children",
        text: "An age-based PI lump may be poor value if you are relatively young. It also changes what is left for dependants compared with a periodic payment plus death benefits. That is estate and super territory as well as DVA territory — take the succession part to a lawyer. This site will not invent a commutation figure.",
      },
    ],
  },
  {
    slug: "incapacity-offsets",
    title: "Incapacity payments, offsets, and the Douglas argument",
    summary:
      "How wage replacement is calculated, what gets offset, and why Douglas [2020] FCAFC 220 is a tax case — not a magic wand.",
    category: "Money and hardship",
    updated: "August 2026",
    lastChecked: "19 October 2026",
    tags: [
      "incapacity",
      "incaps",
      "stop work",
      "Veteran Payment",
      "D1360",
      "offset",
      "Douglas",
      "MSBS",
      "CSC",
      "redemption",
    ],
    related: ["hardship-asp", "cdda", "permanent-impairment"],
    officialLinks: [
      {
        label: "DVA — What are incapacity payments and how to get them",
        href: "https://www.dva.gov.au/access-benefits/pensions-and-payments/support-when-you-cannot-work/what-are-incapacity-payments-and-how-to-get-them",
      },
      {
        label: "DVA — How to apply for incapacity payments in MyService",
        href: "https://www.dva.gov.au/about-myservice/how-to-apply-for-incapacity-payments-in-myservice",
      },
      {
        label: "DVA — Veteran Payment",
        href: "https://www.dva.gov.au/access-benefits/pensions-and-payments/support-when-you-cannot-work/veteran-payment",
      },
      {
        label: "DVA — Faster access to incapacity payments",
        href: "https://www.dva.gov.au/access-benefits/pensions-and-payments/support-when-you-cannot-work/what-are-incapacity-payments-and-how-to-get-them/faster-access-to-incapacity-payments",
      },
      { label: "DVA — Incapacity payments", href: "https://www.dva.gov.au/incapacity-payments" },
      {
        label: "DVA — Disability Compensation Payment and compensation offsetting",
        href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/what-to-know-about-multiple-claims/disability-compensation-payment-and-compensation-offsetting",
      },
      {
        label: "Douglas v Commissioner of Taxation [2020] FCAFC 220",
        href: "https://www.austlii.edu.au/cgi-bin/viewdoc/au/cases/cth/FCAFC/2020/220.html",
      },
      {
        label: "What changed on 1 July 2026 — incapacity (this site)",
        href: "/transition#redemption",
      },
    ],
    blocks: [
      {
        type: "p",
        text: "Incapacity payments replace earnings you lose because accepted conditions stop you working. They are calculated from normal weekly earnings (often an indexed service salary), step down after 45 weeks, and then have other amounts offset. The offset is where veterans and DVA most often part company.",
      },
      {
        type: "h3",
        text: "Stopping work: how to start incapacity payments",
        id: "stop-work",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Nobody can honestly tell you how long it takes",
        text: "DVA does not publish a processing time for incapacity claims. Its processing-times page covers liability and permanent impairment only. What you control is whether DVA has everything it needs on day one.",
      },
      {
        type: "steps",
        items: [
          {
            title: "Check the condition is already accepted",
            text: "Incapacity is only paid for conditions DVA has accepted as service-related. If the condition stopping you working is not accepted yet, the liability claim has to be decided first, and that is most of the wait. Look in MyService for your accepted conditions.",
          },
          {
            title: "Lodge the incapacity claim the day you stop",
            text: "In MyService: Apply now, then Incapacity payments. Or use form D1360. From 1 July 2026 every new incapacity claim is decided under the MRCA, even if the condition was accepted under the VEA or DRCA. You can only have one incapacity claim open at a time.",
          },
          {
            title: "Attach the medical certificate DVA asks for",
            text: "It must say you are unfit for work, which conditions cause it, how unfit (all work, some work, or with restrictions), any restrictions, and the start and end dates. DVA has a “Medical Certification – Ability to Work” form your GP or specialist can use. Payments stop if certificates are not supplied when asked.",
          },
          {
            title: "Attach earnings and tax documents",
            text: "Recent payslips or other proof of civilian earnings, proof of military earnings and allowances if relevant, proof of discharge, and a tax file number declaration. You can submit without them, but DVA will not decide the claim until they arrive.",
          },
          {
            title: "If the condition is mental health and not yet accepted",
            text: "Look at the Veteran Payment. It is an interim payment while DVA assesses an MRCA liability claim for a mental health condition, if you cannot work more than 8 hours a week. It is income and assets tested, and you apply for it after you lodge the liability claim. It cannot be paid at the same time as incapacity payments.",
          },
          {
            title: "If entitlement is accepted but the amount is held up",
            text: "DVA can make interim incapacity payments when your entitlement is established but the final amount is waiting on information from another agency, such as your rank and pay from Defence or your CSC superannuation. Ask for them. Read any overpayment warning before you agree.",
          },
          {
            title: "If money is short while you wait",
            text: "Call 1800 VETERAN (1800 838 372) and ask about the Acute Support Package. See the hardship guide.",
          },
        ],
      },
      {
        type: "p",
        text: "If you are in a DVA rehabilitation plan with a return-to-work focus and an accepted MRCA mental health condition, DVA’s “faster access” arrangement lets your rehabilitation provider restart incapacity payments without a new claim if you have to cut hours or stop.",
      },
      {
        type: "callout",
        tone: "action",
        title: "Before you resign",
        text: "Talk to an accredited advocate (advocateregister.org.au) first. Leave versus resignation, a CSC invalidity benefit, and your normal-earnings figure can all change what you end up with. Once you are paid, you must tell DVA about any work, study, or income change.",
      },
      {
        type: "callout",
        tone: "action",
        title: "If the fortnightly amount jumped after 1 July 2026",
        text: "A payment that looks doubled may not be a mistake. DVA’s incapacity page says VEA Disability Compensation Payments continue and you may also be paid MRCA incapacity at the same time. From 1 July 2026 only above-general-rate DCP (Special, Intermediate, Temporary Special, loss-of-earnings allowance) is reduced by incapacity — the general-rate amount can still be paid. DRCA incapacity generally moved to MRCA rates (current ADF salary, remuneration loading, no notional super deduction). CSC / MSBS invalidity is a different offset and usually still bites. The calculation sheet shows DVA’s workings, and What changed on 1 July 2026 explains the rules.",
      },
      {
        type: "h3",
        text: "Other compensation and a VEA Disability Compensation Payment",
        id: "dcp-offset",
      },
      {
        type: "p",
        text: "A different set of rules applies to a VEA Disability Compensation Payment (DCP). DVA’s page on compensation offsetting (updated 1 July 2026) says it describes the rules in place before 1 July 2026. It says a DCP is reduced when you get other compensation, including DRCA or MRCA payments, for the same incapacity, so that you are not paid twice for it. To decide whether it is the same incapacity, DVA says it looks at the effects of the injuries, not what they are called. What DVA says about how it works:",
      },
      {
        type: "ul",
        items: [
          "Periodic payments reduce the DCP dollar for dollar, for the part of the DCP paid for that incapacity.",
          "A lump sum is turned into a fortnightly amount, using an actuarial table, and applied to the DCP. DVA says offsetting usually lasts for life.",
          "A DRCA permanent impairment lump sum can also reduce an above-general-rate DCP or allowance, on claims lodged from 1 July 2004 to before 1 July 2026. DVA says this applies whether or not the incapacity is the same.",
        ],
      },
      {
        type: "p",
        text: "DVA says offsetting can be complex and asks people to contact it for advice specific to their circumstances before making decisions. This site does not say how it applies to your case.",
      },
      {
        type: "h3",
        text: "Where offsets are disputed",
        id: "fight",
      },
      {
        type: "p",
        text: "If you receive a CSC / MSBS invalidity pension, DVA will usually offset it dollar-for-dollar against incapacity, which can collapse a weekly payment to a token amount. DVA’s published position has been that this is what the DRCA/MRCA offsetting provisions require, and that the 2024 tax amendments and the Douglas case do not change how offsets work. The calculation sheet sent with the decision shows how DVA applied the offset.",
      },
      {
        type: "h3",
        text: "What Douglas actually decided",
        id: "douglas",
      },
      {
        type: "p",
        text: "Douglas v Commissioner of Taxation [2020] FCAFC 220 is a tax case. The Full Federal Court treated certain MSBS invalidity benefits as lump sums for tax purposes rather than as an income stream. Veterans have used that characterisation to argue that a super invalidity benefit should not be treated as ongoing “earnings” or “income” for offset. DVA’s counter is straightforward: tax characterisation is not the same as the words of the offsetting section, and later tax law changes were not written to rewrite compensation offsets.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "The other side of this argument, before you spend a year on it",
        text: "A tribunal or court can accept Douglas for tax and still hold that the offsetting section captures the pension you actually receive each fortnight. “DVA is applying policy over statute” is only a winning line if the statute, on its words, does not capture the payment. Get the section cited in your decision letter, read it, and consider an ATO private ruling only for the tax question — it will not bind DVA on offsets. This is reasonably arguable in some DRCA pre-1 July 2021 fact patterns; it is not a sure thing.",
      },
      {
        type: "h3",
        text: "Redemption / commutation offers",
        id: "redemption",
      },
      {
        type: "p",
        text: "DVA sometimes offers to redeem future incapacity as a lump. The offer will use a multiplier and whatever weekly rate they say is payable after offsets. A low weekly rate multiplied out is a small lump. The lump depends on the weekly rate, so a wrong weekly rate (wrong normal earnings, wrong offset, ignored indexation) carries into the offer. The weekly figure is a decision that can be disputed separately. The site’s three-scenario letters set out the figures with no offset, a partial offset, and DVA’s figure.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Redemption has a weekly ceiling",
        text: `MRCA redemption is only available if weekly incapacity is below ${rates.redemptionWeekly} gross. ${ratesWindowSentence()}. If the 1 July 2026 incapacity increase pushed you over that ceiling, the lump is unavailable by operation of law. See What changed on 1 July 2026 (redemption heading). A DRCA redemption is not one of the three SRDP incapacity tests.`,
      },
      {
        type: "p",
        text: "Normal weekly earnings disputes are often more winnable than Douglas. If they used a 2002 base salary and ignored later indexation or a higher comparable rank rate, that is arithmetic plus records. Payslips, service history, and an indexed Navy/Army/RAAF pay scale will do more than case-law rhetoric.",
      },
    ],
  },
  {
    slug: "appeals-vrb-art",
    title: "Appeals: VRB first, then the Administrative Review Tribunal",
    summary:
      "The dispute in order: read the letter, then the Veterans’ Review Board, then the Tribunal. Time limits are on the letter.",
    category: "Decisions and appeals",
    updated: "August 2026",
    lastChecked: "19 October 2026",
    tags: ["VRB", "ART", "appeal", "time limits", "review"],
    related: ["medical-evidence", "lodge-a-claim", "cdda"],
    officialLinks: [
      { label: "Veterans’ Review Board", href: "https://www.vrb.gov.au/" },
      {
        label: "DVA single review pathway",
        href: "https://www.dva.gov.au/access-benefits/lodge-an-appeal/single-review-pathway",
      },
      { label: "What clock am I on? (this site)", href: "/deadlines" },
      {
        label: "ART — veterans’ entitlements",
        href: "https://www.dva.gov.au/access-benefits/lodge-an-appeal/administrative-review-tribunal",
      },
    ],
    blocks: [
      {
        type: "callout",
        tone: "warn",
        title: "Read the rights paragraph on the decision letter",
        text: "Time limits are not folklore. They are on the letter. For many decisions made from 21 April 2025 you have 12 months to apply to the VRB, but VEA pension rate and attendant allowance are 3 months. For a VEA entitlement or death decision the limit is 12 months, but DVA says maximum arrears (backdating) only apply if you apply within 3 months. ART after VRB is 3 calendar months, not 90 days (DVA single review pathway, updated 3 July 2026). Older DRCA reconsideration can still be 30 days then 60 days to the ART. If you only remember one number, remember: lodge early, and if you are late, ask for an extension in the same application. Use the Deadlines tool in the top menu to count the window.",
      },
      {
        type: "h3",
        text: "The dispute, in order",
        id: "dispute",
      },
      {
        type: "ol",
        items: [
          "Read the rights paragraph on the decision letter before you read anything else. That paragraph is the clock. It is not the same on every letter.",
          "Veterans’ Review Board (VRB). For most compensation decisions this is the first review outside DVA. No fee. Informal. You do not need a lawyer. It looks at the merits, and new medical evidence is often the point. You do not skip the Board and start at a court.",
          "Administrative Review Tribunal (ART). Only if you still disagree after the VRB decision. It replaced the AAT in October 2024. It is more formal. DVA says 3 months from a VRB decision. That is three calendar months, not 90 days. If the date on the notice and the date you received it differ, the Deadlines tool shows both expiry dates.",
          "Stop if there is no decision yet. A delay is not an appeal. CDDA and an Ombudsman complaint are not VRB matters. Those are different pages on this site.",
        ],
      },
      {
        type: "h3",
        text: "Veterans’ Review Board",
        id: "vrb",
      },
      {
        type: "p",
        text: "The VRB is the first external review for most compensation decisions. It is informal, no fee, and you do not need a lawyer. You can apply via the VRB Justice Portal, email, post, or phone. Take an advocate if you can. The VRB looks at the merits — it can stand in DVA’s shoes. New medical evidence is not only allowed, it is often the whole point.",
      },
      {
        type: "ul",
        items: [
          "Put the decision date and claim number on the application.",
          "Say what you want changed (liability accepted, a higher GARP M rating, a different date of effect).",
          "Attach the treating specialist report that DVA discounted, and a short table: DVA rating / specialist rating / table descriptor.",
          "If DVA overrode a specialist without a qualified medical opinion, say that as a fact about the file, not as an insult.",
        ],
      },
      {
        type: "h3",
        text: "Administrative Review Tribunal",
        id: "art",
      },
      {
        type: "p",
        text: "The ART replaced the AAT in October 2024. For most veterans’ matters you go to the VRB first, then the ART if you still disagree. ART is more formal. No fee for VEA/DRCA/MRCA reviews. DVA’s wording (updated 3 July 2026): “For ART appeals, you have 3 months from a VRB decision.” That is three calendar months, not 90 days. ART has discretion out to 12 months; late lodgement can affect backdating. Apply through the ART site. Get advice before you turn a winnable VRB medical dispute into a full tribunal fight you cannot resource.",
      },
      {
        type: "h3",
        text: "What not to appeal to VRB",
        id: "not",
      },
      {
        type: "p",
        text: "CDDA is not a VRB matter. Ombudsman complaints are not a VRB matter. A live delay with no decision yet has nothing to review — force a decision, or complain. Some contact-restriction / SPOC decisions may have a different review path; check the letter.",
      },
    ],
  },
  {
    slug: "cdda",
    title: "CDDA: compensation when DVA’s administration caused extra harm",
    summary:
      "RMG 409, what “defective administration” means, how to quantify detriment, and why this is discretionary.",
    category: "Complaints and delay",
    updated: "August 2026",
    lastChecked: "19 October 2026",
    tags: ["CDDA", "RMG 409", "delay", "detriment", "Finance"],
    related: ["delays", "ombudsman", "hardship-asp", "contact-restrictions"],
    officialLinks: [
      {
        label: "CDDA scheme (Finance)",
        href: "https://www.finance.gov.au/individuals/act-grace-payments-waiver-debts-commonwealth-compensation-detriment-caused-defective-administration-cdda/scheme-compensation-detriment-caused-defective-administration-cdda-scheme",
      },
      {
        label: "RMG 409",
        href: "https://www.finance.gov.au/publications/resource-management-guides/scheme-compensation-detriment-caused-defective-administration-rmg-409",
      },
    ],
    blocks: [
      {
        type: "p",
        text: "The Scheme for Compensation for Detriment caused by Defective Administration (CDDA) is how a Commonwealth agency can pay you when it has no legal liability but a moral one: its administration was defective, and that defect caused you loss. It is discretionary. Winning the “they stuffed up” argument does not automatically produce a cheque.",
      },
      {
        type: "h3",
        text: "What counts as defective administration",
        id: "defective",
      },
      {
        type: "p",
        text: "RMG 409 describes defective administration in four useful buckets. Map every incident on your file to one of them, with dates and names.",
      },
      {
        type: "ol",
        items: [
          "A specific and unreasonable lapse in following existing procedures that would normally have applied (for example, an expedition flag that was never actioned).",
          "A failure to institute or to adjust procedures that were appropriate in the circumstances (for example, no workable process for “acute” support, or no disability adjustment in how the department communicates with you).",
          "Giving advice that was, in all the circumstances, incorrect or ambiguous.",
          "Failing to give advice that was in the agency’s power to give, or that it was reasonably capable of obtaining.",
        ],
      },
      {
        type: "h3",
        text: "Detriment has to be caused by the defect",
        id: "detriment",
      },
      {
        type: "p",
        text: "Three kinds: personal injury (including mental injury), pure economic loss, and property damage. You need a calculation, how you worked it out, and what you did to contain the loss. “I had a bad year” is not a quantum. Unpaid invoices while an ASP request sat idle, extra medical costs after a particular administrative event, interest on a delayed lump, a specific period of lost earnings because a decision was late — those can be costed.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Use other remedies first",
        text: "If VRB can still fix the underlying decision, or if a payment you are owed under the Act has simply not been processed, that is usually not CDDA — that is getting the statutory payment made, with arrears. CDDA is for the extra harm the bad administration caused on top. Agencies will reject claims that are really just a second go at the compensation claim.",
      },
      {
        type: "h3",
        text: "How to put a CDDA application together",
        id: "how",
      },
      {
        type: "steps",
        items: [
          {
            title: "Timeline",
            text: "Every relevant date: lodgement, flags, letters, phone calls, welfare checks, SPOC imposition, decisions, complaints. Attach the documents.",
          },
          {
            title: "Map to RMG 409",
            text: "For each incident: which paragraph, why it was defective (not just disappointing), and who owned the file.",
          },
          {
            title: "Causation",
            text: "One paragraph per loss: but for this administrative failure, this loss would not have happened. Medical opinion helps for mental injury.",
          },
          {
            title: "Quantum table",
            text: "Line items, dates, amounts and evidence. A round number with no line items behind it is not a costing.",
          },
          {
            title: "Lodge with DVA",
            text: "The agency that caused the detriment investigates it. Keep a copy. If they stall, the Ombudsman can look at how the CDDA claim itself is being handled.",
          },
        ],
      },
      {
        type: "p",
        text: "A lump-sum PI payment received later is a separate matter from a CDDA claim for hardship or delay. They are different losses: PI is the statutory entitlement for impairment, not compensation for how long DVA took to process a flagged hardship request.",
      },
    ],
  },
  {
    slug: "foi",
    title: "Get your file: FOI and personal information requests",
    summary:
      "The file shows what DVA recorded about a delay, a SPOC or a medical override. PIR is faster. FOI is the path with review rights. Both are ways to get the papers.",
    category: "Complaints and delay",
    updated: "August 2026",
    lastChecked: "25 October 2026",
    tags: [
      "FOI",
      "PIR",
      "OAIC",
      "file",
      "call recordings",
      "exemptions",
      "D8601",
      "internal review",
      "IC review",
    ],
    related: ["delays", "cdda", "ombudsman", "contact-restrictions"],
    officialLinks: [
      {
        label: "What clock am I on? (this site)",
        href: "/deadlines",
      },
      {
        label: "FOI request webform",
        href: "https://www.dva.gov.au/node/22523",
      },
      {
        label: "Personal Information Request webform",
        href: "https://www.dva.gov.au/personal-information-request-form",
      },
      {
        label: "Form D8601 — Information Access Application (PDF)",
        href: "https://www.dva.gov.au/sites/default/files/2023-10/d8601.pdf",
      },
      {
        label: "DVA FOI requests (process page)",
        href: "https://www.dva.gov.au/what-we-help-with/accessing-information/freedom-of-information/freedom-of-information-requests",
      },
      {
        label: "Personal information requests (PIR)",
        href: "https://www.dva.gov.au/what-we-help-with/accessing-information/personal-information-requests",
      },
      { label: "Information Access email", href: "mailto:Information.Access@dva.gov.au" },
      {
        label: "OAIC — Information Commissioner review",
        href: "https://www.oaic.gov.au/freedom-of-information/your-freedom-of-information-rights/freedom-of-information-reviews/information-commissioner-review",
      },
      {
        label: "Freedom of Information Act 1982",
        href: "https://www.legislation.gov.au/C2004A02562/latest/text",
      },
    ],
    blocks: [
      {
        type: "callout",
        tone: "action",
        title: "Two doors, one mailbox",
        text: "For your own file, DVA wants you to try a Personal Information Request first — it is administrative, aims for 30 days, and has no charge. It has no OAIC review. A Freedom of Information request is a legal right under the FOI Act 1982: 14 days to acknowledge, 30 days to decide (extensions happen), and review rights if they refuse, delay, or over-redact. Many veterans send both in one letter: treat this as my personal information and as an FOI request. Use the DVA FOI webform, the PIR webform, email Information.Access@dva.gov.au, or post to Information Access Unit, GPO Box 9998, Brisbane QLD 4001. Form D8601 is the paper application if you are not using a webform.",
      },
      {
        type: "h3",
        text: "Look in MyService before you lodge",
        id: "myservice",
      },
      {
        type: "p",
        text: "Decision letters, some medical reports, and claim status are often already in MyService. Asking Information Access for a letter you can download tonight wastes a month. Screenshot what you already have, then ask for what is missing: file notes, internal emails, call recordings, position numbers, the papers behind a SPOC.",
      },
      {
        type: "h3",
        text: "PIR or FOI?",
        id: "which",
      },
      {
        type: "ul",
        items: [
          "Your own claim file, payments history, records of contact, impairment reports — start with PIR if you only need the documents quickly. DVA says no fees, aim 30 days, and no statement of reasons. If what comes back is thin, lodge FOI. PIR itself cannot be taken to the OAIC.",
          "You need review rights, call recordings, names and position numbers, SPOC/behaviour papers, or you already tried PIR — lodge FOI. Your own personal information under FOI is also free of charges.",
          "Policy, expedition criteria, how a team decides offsets — that is often non-personal FOI. Check CLIK and the FOI disclosure log first. Non-personal FOI can attract processing charges. DVA must quote an estimate before they bill you.",
        ],
      },
      {
        type: "h3",
        text: "Ask for named things, not “everything”",
        id: "ask",
      },
      {
        type: "ul",
        items: [
          "The complete claim file for listed claim numbers, including file notes, emails, attachments, and briefs, for a date range.",
          "Call recordings and metadata for calls involving your number in that range.",
          "Names and position numbers of officers who actioned those files in that range.",
          "Any SPOC, communication plan, challenging-behaviour or mutually respectful behaviour protocol that applies to you, and the documents considered.",
          "Internal advice about offsets, ASP, expedition, or a specific decision — expecting some s 47C / 47E redactions.",
        ],
      },
      {
        type: "p",
        text: "A scoped request is faster and more usable. “All documents DVA has ever held about me” is how you get a 12-month consultation and a folder you cannot read.",
      },
      {
        type: "h3",
        text: "How to lodge",
        id: "lodge",
      },
      {
        type: "steps",
        items: [
          {
            title: "Proof of identity",
            text: "DVA will not release your personal information without it. The FOI and PIR webforms collect identity and consent up front. If you email or post, complete form D8601 (Information Access Application) and attach copies of ID as the form asks. An advocate or family member needs your consent on file, or legal authority if the veteran has died.",
          },
          {
            title: "Send it three ways if you want a paper trail",
            text: "Webform is what DVA calls easiest. Also email the same scope to Information.Access@dva.gov.au so you have a sent item. Keep a copy of what you submitted. Phone 1800 VETERAN (1800 838 372) if you need the Information Access team — it does not replace the written request.",
          },
          {
            title: "Diary the clock",
            text: "FOI: acknowledgement within 14 days; decision within 30 days unless they notify an extension (you agree, the request is large, or they must consult third parties). PIR: DVA aims to finish within 30 days and will contact you if the scope is unclear. If they go quiet, chase once in writing, then internal review / OAIC on the FOI, not on the PIR.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Practical refusal (s 24AB) is a 14-day trap",
        text: "If DVA sends a practical refusal notice, you have 14 days after the day you are given the notice to consult. If you do not respond within the consultation period, your FOI request is taken to have been withdrawn. Doing nothing loses the whole request. Even a short reply narrowing what you asked for keeps it alive. Count it on the Deadlines tool.",
      },
      {
        type: "h3",
        text: "Charges (only some FOI)",
        id: "charges",
      },
      {
        type: "p",
        text: "No application fee. Your own personal information — FOI or PIR — is not charged. Other FOI requests may be. DVA’s published processing rates (as at the October 2025 FOI page): search and retrieval $15/hour; decision-making free for the first five hours then $20/hour; photocopying 10c/page. If they intend to charge, they must write with an estimate and a deposit before processing. You can contend the charge. Check the live DVA FOI page — do not treat those dollar figures as frozen.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Exemptions you will see",
        text: "Section 47C (deliberative), 47F (personal privacy of other people), and 47E(d) (certain operations of agencies) are commonly claimed. Partial release is still useful. Third-party consultation can extend time, and those people may infer that you asked even if DVA does not name you. A document that shows a welfare-check was triggered by claim frustration rather than imminent risk is worth the redactions around it.",
      },
      {
        type: "h3",
        text: "If they refuse, delay, or over-redact",
        id: "review",
      },
      {
        type: "ol",
        items: [
          "Internal review — email Information Access and ask another officer to remake the FOI decision. DVA and the OAIC treat this as the faster first step. Agencies have 30 days to decide an internal review.",
          "Information Commissioner review (OAIC) — no fee. OAIC’s published limits: 60 days after written notice of an access refusal or a charge decision, and 30 days if you object to access being given to someone else. OAIC does not publish a shorter limit for an internal review decision, so lodge as soon as you can. The decision letter is the clock. You can ask OAIC for more time, but it only gives it for valid reasons. Apply on the OAIC site. Deemed refusal (no decision in time) can also go to the OAIC.",
          "PIR has no OAIC review. If the PIR release is inadequate, lodge FOI for the same documents so the statutory rights attach.",
        ],
      },
      {
        type: "p",
        text: "Wrong personal information on the file can be corrected under the Privacy Act (APP 13). That is a separate ask: what is wrong, what it should say, and the evidence. It is not a VRB appeal.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Do not paste the file into an AI",
        text: "The letter generator stays in this browser. Feedback blocks claim numbers and dates of birth. If you use your own AI, do not paste the letter or your file into it. Copy the finished letter yourself to DVA.",
      },
    ],
  },
  {
    slug: "ombudsman",
    title: "Complaining to the Commonwealth Ombudsman",
    summary:
      "When DVA’s own complaint process has failed, what the Ombudsman can do, and how to write a complaint they can investigate.",
    category: "Complaints and delay",
    updated: "August 2026",
    lastChecked: "19 October 2026",
    tags: ["Ombudsman", "complaint", "delay", "investigation"],
    related: ["delays", "cdda", "foi"],
    officialLinks: [
      { label: "Commonwealth Ombudsman complaints", href: "https://www.ombudsman.gov.au/" },
      {
        label: "DVA feedback form",
        href: "https://www.dva.gov.au/about-us/contact-us/feedback-form/feedback",
      },
    ],
    blocks: [
      {
        type: "p",
        text: "The Commonwealth Ombudsman can investigate whether DVA’s administration was wrong, unfair, or unreasonable. The Ombudsman cannot overturn a VRB-style merits decision and cannot order a CDDA payment, but can recommend action, including that DVA look at CDDA, expedition, or a better explanation. Use DVA’s own complaint channels first unless there is a good reason not to.",
      },
      {
        type: "h3",
        text: "A complaint that can be investigated",
        id: "write",
      },
      {
        type: "ul",
        items: [
          "Who you are, which claim numbers, what decision or delay you are talking about.",
          "A short timeline (one page).",
          "What you already asked DVA to do, and their response (or silence).",
          "The specific questions you want investigated — not a life story. Example: how many hardship files flagged for expedition in February were still untouched at week seven; what triage rules applied; whether a welfare check affected priority.",
          "The outcome you want: a decision by a date, an explanation, a referral to CDDA, better communication.",
        ],
      },
      {
        type: "p",
        text: "Keep Royal Commission findings and reputational arguments for one paragraph at most. Investigators work from documents and statutory functions. Attach the expedition flag, not an essay about trust.",
      },
    ],
  },
  {
    slug: "contact-restrictions",
    title: "Single points of contact, behaviour protocols, and reasonable adjustments",
    summary:
      "What to do if DVA restricts how you can speak to them, and how to keep the file about your disability rather than your tone.",
    category: "How DVA treats you",
    updated: "August 2026",
    lastChecked: "17 September 2026",
    tags: ["SPOC", "DDA", "reasonable adjustments", "welfare check", "communication"],
    related: ["cdda", "foi", "medical-evidence", "advocates"],
    officialLinks: [
      {
        label: "Disability Discrimination Act 1992",
        href: "https://www.legislation.gov.au/C2004A04426/latest/text",
      },
    ],
    blocks: [
      {
        type: "p",
        text: "DVA can impose a communication plan: a single point of contact, scheduled calls only, no extra emails, and a warning that disclosures of self-harm may be referred to police or DVA Security. They will usually cite a “mutually respectful behaviour” policy. Sometimes that is a response to genuine risk. Sometimes it is a response to a veteran who has been made angry by unanswered claims. Your job is not to win that moral argument in a phone call. It is to get the restriction documented, adjusted, and, if it is harming the claim, reviewed.",
      },
      {
        type: "h3",
        text: "Do these five things immediately",
        id: "five",
      },
      {
        type: "ol",
        items: [
          "Ask in writing for the documents that led to the restriction, the review date, and the name of the decision-maker. FOI if they do not send them.",
          "Nominate an advocate or support person as an additional contact so the claim does not freeze when you are unwell.",
          "Ask for reasonable adjustments under the Disability Discrimination Act 1992: written communication if calls spike your symptoms, extra time, a support person on the line, contact during nominated hours. Attach a treating clinician letter that describes the disability and the adjustment, not your grievance.",
          "For scheduled calls, use the [DVA call sheet](/call-sheet): one claim, the questions in order, and a written log. If contact is email only, put the same questions in the email.",
          "Stop the rapid-fire follow-ups that triggered it. One letter a fortnight, copied to the SPOC, with a numbered list, is enough. Frequency is what they will use against you.",
          "If a police welfare check happens, record the date and what was said. Ask your psychiatrist, later, whether that event aggravated symptoms. That opinion is for CDDA and for any later DDA argument. It is not a reason to call the station.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "The file will try to make this about you",
        text: "A behaviour protocol is easy for a later reader to treat as proof you are difficult. Reframe it, in writing, as a disability and delay issue: the restriction was imposed after X months of unanswered correspondence about Y claim, and it has reduced your ability to prosecute the claim. Keep every message short and calm. Short, calm documents survive.",
      },
      {
        type: "p",
        text: "Do not threaten staff. Do not use insulting language in emails you will later attach to an Ombudsman complaint. If you are in crisis, call Open Arms or 000, not the delegate. The DVA letter will have already told you that self-harm disclosures can be referred out — that is a reason to use clinical channels, not a reason to stay silent about being unwell in a medical report.",
      },
    ],
  },
  {
    slug: "household-services",
    title: "Household services, attendant care, and help at home",
    summary:
      "DVA can pay for cleaning, laundry, meals, shopping, and some garden work if accepted conditions stop you doing them. VEA veterans can claim from 1 July 2026.",
    category: "Money and hardship",
    updated: "November 2026",
    lastChecked: "2 November 2026",
    tags: [
      "HHS",
      "household services",
      "attendant care",
      "VHC",
      "OT",
      "ADL",
      "cleaning",
      "laundry",
      "gardening",
      "domestic",
      "D9319",
    ],
    related: ["hardship-asp", "medical-evidence", "delays", "start-here"],
    officialLinks: [
      {
        label: "Household services compensation (DVA)",
        href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/household-services-compensation",
      },
      {
        label: "Attendant care (DVA)",
        href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/attendant-care",
      },
      {
        label: "Help with cleaning and housekeeping (HHS vs VHC)",
        href: "https://www.dva.gov.au/what-we-help-with/care-at-home-and-aged-care-services/living-independently/help-with-cleaning-and-housekeeping",
      },
      {
        label: "Form D9319 — Claim for Household Services (PDF)",
        href: "https://www.dva.gov.au/sites/default/files/dvaforms/d9319.pdf",
      },
      {
        label: "Form D1351 — Attendant Care Services (PDF)",
        href: "https://www.dva.gov.au/sites/default/files/dvaforms/d1351.pdf",
      },
      { label: "Email the claim to hhs@dva.gov.au", href: "mailto:hhs@dva.gov.au" },
      { label: "Veterans’ Home Care assessment — 1300 550 450", href: "tel:1300550450" },
      {
        label: "1 July 2026 reform: HHS, attendant care, and VHC",
        href: "https://www.dva.gov.au/about-us/inquiries-and-reviews/veterans-legislation-reform/veterans-legislation-reform-resources/household-services-attendant-care-and-veterans-home-care",
      },
    ],
    blocks: [
      {
        type: "callout",
        tone: "action",
        title: "Household services is a compensation claim",
        text: "If accepted conditions stop you doing domestic work such as cleaning, laundry, ironing, shopping, meals, lawns or gardening, DVA can pay for help. DVA’s page (updated 10 August 2026) ties it to an accepted service-related injury or condition. It is not a Gold Card benefit. From 1 July 2026, veterans with conditions accepted under the VEA can claim too. The form is D9319, emailed to hhs@dva.gov.au.",
      },
      {
        type: "p",
        text: "DVA runs three programs that can look alike. Household services and attendant care are compensation, tied to accepted conditions. Veterans’ Home Care (VHC) is a card-holder program, tied to functional limitation. Acute Support Package (ASP) is short-term crisis support.",
      },
      {
        type: "h3",
        text: "The three programs",
        id: "three",
      },
      {
        type: "ul",
        items: [
          "Household services (HHS): compensation for domestic tasks you can no longer manage because of an accepted service-related condition. DVA lists cleaning, shopping, laundry, ironing, lawn mowing, gardening, meal preparation, and childcare in some short-term and crisis circumstances. Form D9319 to hhs@dva.gov.au. There is a weekly maximum.",
          "Attendant care: compensation for regular, essential personal care you can no longer do: bathing, toileting, grooming, dressing, feeding. It does not pay for nursing or medical care. Form D1351 (your medical provider completes part of it) to the same mailbox. It has its own weekly maximum.",
          "Veterans’ Home Care (VHC): domestic assistance, home and garden maintenance, personal care and respite for Gold Card or White Card holders who live at home and have a functional limitation. Phone 1300 550 450. Co-payments and service limits apply. Respite is only through VHC.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "VHC and compensation do not overlap",
        text: "DVA says you cannot receive VHC Domestic Assistance or Home and Garden Maintenance while you receive Household Services, or VHC Personal Care while you receive Attendant Care. Respite Care is only available through VHC (DVA reform page, updated 11 December 2025). Attendant care is personal care of you; DVA’s position is that childcare and domestic duties are not attendant care, so they fall under household services.",
      },
      {
        type: "h3",
        text: "Who can claim household services after 1 July 2026",
        id: "who",
      },
      {
        type: "p",
        text: "DVA’s published test (household services page, updated 10 August 2026) is: you are unable to manage household tasks because of your accepted service-related injury or condition, and you are assessed as having a reasonable requirement for household services. New claims lodged on or after 1 July 2026 are determined under the improved MRCA, regardless of when or where you served, when the injury occurred, or which Act first accepted the condition.",
      },
      {
        type: "ul",
        items: [
          "MRCA veterans: no change to the pathway.",
          "DRCA veterans: existing household services compensation continues without interruption until the renewal date on the determination letter, then is reviewed under the MRCA.",
          "VEA veterans: from 1 July 2026 you can lodge household services and attendant care claims on the strength of VEA-accepted conditions.",
          "A Gold Card is not part of DVA’s test. It asks for accepted conditions and a reasonable requirement. For household services, DVA’s reform page also says you must have been responsible for the specific domestic tasks before the injury or illness.",
          "Attendant care requires that you live at home.",
        ],
      },
      {
        type: "h3",
        text: "What is paid, and what is not",
        id: "what",
      },
      {
        type: "p",
        text: "Support can be short-term (for example recovery from surgery) or ongoing if the condition is lasting. DVA can reimburse you or pay the provider directly. Household services do not include nursing care, which is Community Nursing, not HHS.",
      },
      {
        type: "ul",
        items: [
          "DVA’s page says that, as a general rule, it cannot pay family to provide household services. DVA says it must consider whether it is reasonable for a member of your household to help with specific tasks without being paid.",
          "DVA lists childcare only in some short-term and crisis circumstances. ASP is the separate short-term crisis program; see [Hardship and ASP](/guides/hardship-asp).",
          "Once a claim is approved, you choose the provider. DVA’s page says it must hold an ABN and have completed Working with Children, Working with Vulnerable People and police checks. Providers send invoices through DVA’s Provider Upload Page.",
        ],
      },
      {
        type: "h3",
        text: "Weekly maximums",
        id: "caps",
      },
      {
        type: "p",
        text: `Household services and attendant care each have a legislated weekly maximum, and DVA cannot approve more. The two limits are separate. ${ratesWindowSentence()}.`,
      },
      {
        type: "ul",
        items: [
          `Household services, MRCA (all new claims from 1 July 2026): ${rates.hhsWeekly} a week from ${rates.currentFrom}.`,
          `Attendant care, MRCA: ${rates.attendantWeekly} a week from ${rates.currentFrom}. DVA’s own attendant care page still shows the 2025–26 limit; its MRCA rates page and its household services page show the 2026–27 figure.`,
          "DVA’s household services page also gives the DRCA maximum and the standard maximum hourly rate that providers may charge for the calendar year.",
        ],
      },
      {
        type: "h3",
        text: "How a claim runs",
        id: "lodge",
      },
      {
        type: "p",
        text: "From DVA’s household services and attendant care pages (both updated 10 August 2026):",
      },
      {
        type: "ol",
        items: [
          "Complete the claim form: D9319 for household services, D1351 for attendant care (your medical provider completes part of D1351). The accepted conditions are listed in MyService, or ask on 1800 VETERAN (1800 838 372).",
          "Email it to hhs@dva.gov.au, or post it to GPO Box 9998, Brisbane QLD 4001. The site’s [household services letter](/letters/household-services) is a template for a cover note.",
          "DVA confirms eligibility and may refer you for an assessment. The assessor recommends the services and the level of support.",
          "DVA tells you whether it is approved. DVA’s page says it reimburses you or pays the provider directly, and that you should keep receipts from providers.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "If you hold a Veteran Card and have no household services claim",
        text: "VHC starts with an assessment through the VHC Assessment Agency on 1300 550 450. DVA’s published wording for the call is that you hold a Veteran Card, need help with a task around the home, and are asking for an assessment. 1800 VETERAN can tell you which program applies.",
      },
      {
        type: "h3",
        text: "Reviews and changes",
        id: "reviews",
      },
      {
        type: "ul",
        items: [
          "DVA says services are reviewed regularly. The end date of an approval is on the determination letter.",
          "DVA says to tell it if the help you need changes, you plan to move, you close a rehabilitation plan, you are hospitalised, enter respite care or go on holidays, plan to move overseas, or are receiving or applying for NDIS or My Aged Care services.",
          "The determination letter states your review rights and time limit. For most MRCA compensation decisions the first external review is the VRB: see [Appeals](/guides/appeals-vrb-art).",
        ],
      },
    ],
  },
  {
    slug: "advocates",
    title: "Working with an advocate (and when to do it yourself)",
    summary:
      "ATDP advocates, what they can and cannot do, and how to brief one so you are not starting from zero.",
    category: "Getting started",
    updated: "August 2026",
    lastChecked: "1 November 2026",
    tags: ["ATDP", "ESO", "advocate", "VRB"],
    related: ["start-here", "appeals-vrb-art", "lodge-a-claim"],
    officialLinks: [
      { label: "ATDP Advocacy Register", href: "https://www.advocateregister.org.au/" },
      {
        label: "What is an advocate? (DVA)",
        href: "https://www.dva.gov.au/what-we-help-with/advocacy-representation-advice/what-is-an-advocate",
      },
      {
        label: "What to consider if you are looking for help (DVA)",
        href: "https://www.dva.gov.au/what-we-help-with/advocacy-representation-advice/what-to-consider-if-youre-looking-for-help",
      },
      {
        label: "ATDP program (DVA)",
        href: "https://www.dva.gov.au/what-we-help-with/advocacy-representation-advice/for-advocates-ex-service-organisations/the-advocacy-training-and-development-program",
      },
    ],
    blocks: [
      {
        type: "p",
        text: "Accredited advocates through ex-service organisations are free or low-cost. Find one on the ATDP Advocacy Register. Compensation advocates help with claims and VRB. Wellbeing advocates help with the rest of life. They are not your lawyer and they are not DVA.",
      },
      {
        type: "h3",
        text: "Finding one",
        id: "finding",
      },
      {
        type: "p",
        text: "DVA’s “What is an advocate?” page (updated 13 October 2026) says to use the Advocacy Register. The register lists ex-service organisations — RSL, Legacy, Partners of Veterans and others — with their address, contact details and the level of advocate they have. It does not list individual advocates. Contact the organisation. DVA says those organisations will try to assist you even if you do not meet their membership rules. ATDP training is only for advocates at organisations that do not charge a fee for advocacy. They may ask a small amount for incidental costs. For a local organisation, use the [postcode tool](/postcode).",
      },
      {
        type: "h3",
        text: "Free or paid?",
        id: "paid",
      },
      {
        type: "p",
        text: "Before you sign with anyone who charges, ask three things: the fee basis, whether any fee is a percentage of a payout, and whether they are ATDP accredited. DVA’s page on looking for help (updated 27 August 2024) says using a provider that charges fees does not guarantee results or faster processing. This site will not add fee rules that are not on an official page.",
      },
      {
        type: "h3",
        text: "If your advocate leaves",
        id: "leaves",
      },
      {
        type: "p",
        text: "The organisation can change who is listed against it on the register. To change who can act for you with DVA, appoint the new person. DVA’s MyService representation page (updated 4 December 2025) says that needs a D9325 signed by both of you. Confirm from source if a phone call alone is enough in your case.",
      },
      {
        type: "h3",
        text: "Brief them like a busy person",
        id: "brief",
      },
      {
        type: "ul",
        items: [
          "One-page chronology.",
          "List of live claim numbers and what each is for.",
          "The decision you want changed, and by when.",
          "The three best medical reports, not the whole box.",
          "Any SPOC or communication limit, so they can be the channel.",
        ],
      },
      {
        type: "p",
        text: "You can self-represent. Many people do. Self-representing is not a reason to skip the register — a two-hour advocate review of a VRB application still pays for itself. If an advocate goes quiet, chase them the same way you would chase DVA, then find another. The register exists because quality varies.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Lawyers",
        text: "For ART, complex offset litigation, DDA, or estate/super questions, you may need a lawyer. Advocacy and legal work are different.",
      },
    ],
  },
  {
    slug: "abuse-support",
    title: "If you were sexually or physically abused in service",
    summary:
      "Treatment first (you do not have to prove service caused the mental health condition), then a sensitive compensation path, then Ombudsman reparation if that still fits.",
    category: "How DVA treats you",
    updated: "August 2026",
    lastChecked: "19 October 2026",
    tags: [
      "abuse",
      "sexual assault",
      "physical abuse",
      "NLHC",
      "Open Arms",
      "Ombudsman",
      "redress",
    ],
    related: [
      "hardship-asp",
      "medical-evidence",
      "lodge-a-claim",
      "advocates",
      "contact-restrictions",
    ],
    officialLinks: [
      {
        label: "DVA — Support if you were abused",
        href: "https://www.dva.gov.au/what-we-help-with/health-support/injury-or-health-treatments/support-if-you-were-abused",
      },
      {
        label: "Non-Liability Health Care (mental health)",
        href: "https://www.dva.gov.au/what-we-help-with/your-mental-wellbeing/non-liability-health-care-mental-health-for-veterans",
      },
      { label: "Open Arms", href: "https://www.openarms.gov.au/" },
      { label: "1800RESPECT", href: "https://www.1800respect.org.au/" },
      {
        label: "Defence Force Ombudsman — reporting abuse",
        href: "https://www.ombudsman.gov.au/complaints/defence-force-complaints/reporting-abuse",
      },
      { label: "National Redress Scheme", href: "https://www.nationalredress.gov.au/" },
    ],
    blocks: [
      {
        type: "callout",
        tone: "crisis",
        title: "If you are unsafe now",
        text: "Call 000. Open Arms 1800 011 046 is 24/7 and military-aware. 1800RESPECT (1800 737 732) is the national sexual assault and family violence line. You do not have to start a DVA claim tonight.",
      },
      {
        type: "p",
        text: "DVA has a published path for people who experienced sexual or physical abuse in the ADF. It is separate from “tell the whole story to whoever answers 1800 VETERAN.” Treatment can start without a liability fight. Compensation is a different door. Reparation / redress is a third. They are separate processes.",
      },
      {
        type: "h3",
        text: "1. Treatment — Non-Liability Health Care",
        id: "nlhc",
      },
      {
        type: "p",
        text: "DVA can pay for treatment of any mental health condition whether or not it was caused by service. Anyone who served full-time in the ADF, even for a day, can usually get this. Reservists with qualifying service may also. It is not a compensation claim. If you already have a White Card issued on transition, mental health treatment is often already on it — you do not re-apply. Otherwise call 1800 VETERAN (1800 838 372) or email NLHC@dva.gov.au.",
      },
      {
        type: "h3",
        text: "2. Compensation — specialised abuse team",
        id: "claim",
      },
      {
        type: "p",
        text: "New claims that contend sexual or physical abuse are meant to go to a dedicated team trained with Phoenix Australia. A social worker can be the single point of contact so you are not retelling the incident to every assessor. For the claim to succeed DVA still has to be satisfied that the abuse occurred, that it is linked to service, and that it caused or contributed to a diagnosed condition.",
      },
      {
        type: "ul",
        items: [
          "You can support the incident with a statutory declaration. DVA’s published position is that a credible statutory declaration is accepted as sufficient evidence of abuse in the absence of contradictory information.",
          "A police report is not described as a requirement for treatment. Do not assume you must report to ADF investigative service to get NLHC.",
          "If you already received an ADF redress or reparation payment, DVA has a streamlining policy that can treat that payment as evidence of the incident — diagnosis and SoP timing still have to be met.",
          "Compensation is not the same as a reparation or National Redress payment. One does not automatically produce the other.",
        ],
      },
      {
        type: "h3",
        text: "3. Ombudsman reparation and National Redress",
        id: "redress",
      },
      {
        type: "p",
        text: "The Defence Abuse Response Taskforce closed in 2016. The Defence Force Ombudsman can still take reports of abuse in Defence and, in some cases, make a reparation payment. Childhood sexual abuse in an institution can go to the National Redress Scheme. Those schemes use a different standard of proof to DVA legislation. A redress payment does not mean DVA must accept liability.",
      },
      {
        type: "h3",
        text: "What to do in order",
        id: "order",
      },
      {
        type: "ol",
        items: [
          "If you are unwell tonight: Open Arms or 000. Not the claims mailbox.",
          "Get mental health treatment on NLHC / White Card running. That is the fastest DVA door.",
          "If you want compensation, ask 1800 VETERAN to put the claim with the specialised abuse team and for a social-worker contact. Lodge through MyService or an advocate. Attach diagnosis. You can add a statutory declaration later.",
          "If you also want Ombudsman reparation or National Redress, that is a separate application. Note the dates.",
          "How much of the incident is retold is the person’s choice.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "This page is process, not counselling",
        text: "Veteran Assist does not investigate abuse and does not lodge for you. Do not type incident detail into feedback or into an AI tool. Keep the real file with you, Open Arms, or an advocate you trust.",
      },
    ],
  },
  {
    slug: "presumptive-liability",
    title: "Presumptive liability: when DVA does not make you prove the SoP",
    summary:
      "Claims lodged from 1 July 2026 for a listed condition, with a confirmed diagnosis, can be accepted as service-related without proving a Statement of Principles factor. Not every claim. Not a skip of the diagnosis.",
    category: "Getting started",
    updated: "September 2026",
    lastChecked: "26 October 2026",
    tags: ["presumptive", "liability", "SoP", "MyService", "diagnosis", "VETS Act"],
    related: ["lodge-a-claim", "start-here", "medical-evidence", "delays", "abuse-support"],
    officialLinks: [
      {
        label: "DVA — Presumptive liability",
        href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/making-a-claim-for-a-service-related-condition/presumptive-liability",
      },
      {
        label: "DVA — Conditions and claims processing times",
        href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/conditions-and-claims-processing-times",
      },
      {
        label: "Presumptive Liability Determination 2026 (F2026L00740)",
        href: "https://www.legislation.gov.au/F2026L00740/latest/text",
      },
      {
        label: "How to apply for Initial Liability in MyService",
        href: "https://www.dva.gov.au/about-myservice/how-to-apply-for-initial-liability-in-myservice",
      },
    ],
    blocks: [
      {
        type: "callout",
        tone: "warn",
        title: "This is not “automatic, no evidence”",
        text: "A presumption is not automatic acceptance. DVA’s own page (last updated 7 August 2026) still requires a confirmed diagnosis, and the service/onset tests for that condition. Clear evidence that something other than service caused it can knock the presumption out. Pre-1 July claims stay on the old path.",
      },
      {
        type: "p",
        text: "From 1 July 2026, the improved MRCA lets DVA accept listed injuries and diseases as service-related without you proving a Statement of Principles factor. That is presumptive liability. You do not lodge a separate “presumptive” form. If the claim is eligible, DVA assesses it that way.",
      },
      {
        type: "h3",
        text: "Who it can apply to",
        id: "who",
      },
      {
        type: "ul",
        items: [
          "The claim was lodged on or after 1 July 2026.",
          "You have a confirmed diagnosis of a condition on the Commission’s list.",
          "Your service meets the criteria written for that condition (type of service, length, onset window — they are not all the same).",
        ],
      },
      {
        type: "p",
        text: "DVA’s public categories (not a complete list of names — confirm on the official page and the Determination) include: cancers prescribed for ADF firefighters; 30 or more conditions for Point Cook firefighters (1957–1986); 30 or more for F-111 deseal/reseal workers; 40 or more linked to specified workplace exposures; 80 or more common service-related conditions, including some sequelae of an already accepted condition; and some conditions linked to veterans who have experienced abuse.",
      },
      {
        type: "callout",
        tone: "info",
        title: "We will not paste 247 condition names here",
        text: "The live list is the Determination and DVA’s presumptive-liability page. If this site and those pages disagree, those pages win. An advocate or the RMA SoP is still the check if you are not sure you are on the list.",
      },
      {
        type: "h3",
        text: "How long it can take",
        id: "time",
      },
      {
        type: "p",
        text: "DVA’s Conditions and claims processing times page (last updated 23 October 2026) says: if you are claiming an eligible presumptive-liability condition and provide a confirmed diagnosis from an appropriately qualified medical practitioner, your claim may be determined in less than two weeks as part of the allocation process. That is a “may”. The same page still publishes 116 days as the last-12-months average for all MRCA initial liability. Do not treat two weeks as a guarantee, and do not treat 116 days as your fate if you are actually on the list with a diagnosis attached.",
      },
      {
        type: "h3",
        text: "What to do",
        id: "do",
      },
      {
        type: "ol",
        items: [
          "Get a diagnosis in writing from an appropriately qualified practitioner before you lodge, or attach the one you already have.",
          "Lodge from 1 July 2026 as an MRCA initial-liability claim. In MyService that is one condition per claim (DVA how-to, 18 September 2026).",
          "A presumptive-liability claim still needs a confirmed diagnosis from an appropriately qualified medical practitioner. DVA’s processing-times page says so.",
          "If DVA then runs the ordinary SoP path anyway, ask in writing whether they considered presumptive liability and, if not, why.",
        ],
      },
      {
        type: "callout",
        tone: "action",
        title: "If the claim was lodged before 1 July 2026",
        text: "Presumption does not apply to that lodgement. DVA says those claims follow the arrangements that applied then. Re-lodging the same condition after 1 July to “get on the list” can restart the clock and is not advice this site will give you. Ask DVA in writing which Act and which path apply to the live claim number.",
      },
    ],
  },
  {
    slug: "allied-health",
    title: "Allied health: the $5,000 cap is off the table",
    summary:
      "On 17 September 2026 the Minister took the proposed $5,000 yearly allied-health cap off the table. Treatment continues as it does today. Provider fee increases are still promised from 1 July 2027. The GP treatment cycle has not been declared gone.",
    category: "How DVA treats you",
    updated: "September 2026",
    lastChecked: "19 October 2026",
    tags: ["allied health", "physio", "psychology", "treatment cycle", "Veteran Card", "cap"],
    related: ["start-here", "hardship-asp", "household-services", "treatment-on-your-card"],
    officialLinks: [
      {
        label: "Minister Keogh — statement on veteran allied health changes (17 September 2026)",
        href: "https://minister.dva.gov.au/news-and-media/minister/statement-veteran-allied-health-changes",
      },
      {
        label: "DVA — 2026–27 Budget measures for health providers",
        href: "https://www.dva.gov.au/providers/provider-news/2026-27-federal-budget-new-measures-for-health-providers",
      },
      {
        label: "MEPI — reimbursement of privately incurred medical expenses",
        href: "https://www.dva.gov.au/what-we-help-with/health-support/help-to-cover-healthcare-costs/medical-expenses-privately-incurred-mepi",
      },
    ],
    blocks: [
      {
        type: "callout",
        tone: "action",
        title: "If a group told you physio is being cut on 1 July 2027",
        text: "That was the Budget proposal. It is not the current rule. On 17 September 2026 the Minister for Veterans’ Affairs said the Government is taking the proposed $5,000 threshold off the table. Nothing in that statement changes treatment you can already get on a Veteran Card today.",
      },
      {
        type: "p",
        text: "The 2026–27 Budget paired two ideas: a large increase in fees DVA pays allied-health providers from 1 July 2027, and a $5,000 yearly monetary limit for Veteran Card holders on those services, with an un-designed ‘clinical need’ exception. Open Arms counselling was never inside that limit. The proposal filled Facebook groups for months. Senate votes in the week of 8–10 September 2026 opposed it; those votes did not repeal it. The Minister’s 17 September statement did the work that matters for veterans: the threshold is off the table.",
      },
      {
        type: "h3",
        text: "What is still true",
        id: "still",
      },
      {
        type: "ul",
        items: [
          "Treatment under a Veteran Card today is not capped at $5,000.",
          "The Government said it will keep the commitment to raise allied-health provider fees from 1 July 2027. That is a provider-fee change, not a cut to your card. Confirm closer to that date on DVA’s provider pages.",
          "The current treatment cycle — going back to the GP after a set number of allied-health visits for a new referral — was going to be replaced as part of the same package. The Minister did not say that cycle has already been abolished. Until DVA publishes a replacement, assume you still need the GP referral your provider asks for.",
          "If you paid a doctor or allied-health provider out of pocket for treatment your card should have covered, that is MEPI, not a cap fight. Use DVA’s MEPI webform (D1181). Quotes and estimates are not receipts.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Last checked 19 October 2026",
        text: "If DVA or the Minister publishes a different rule after this date, the official page wins. This site will not keep a campaign page about a cap that has been withdrawn.",
      },
    ],
  },
  {
    slug: "gold-card-concessions",
    title: "Gold Card: what it covers and the concessions it can unlock",
    summary:
      "DVA now calls it the Veteran Card – All Conditions. It pays for treatment. Car, rego, transport and bill concessions are set by the ATO and each state, and many depend on how you got the card.",
    category: "Money and hardship",
    updated: "24 October 2026",
    lastChecked: "25 October 2026",
    tags: [
      "Gold Card",
      "Veteran Card",
      "All Conditions",
      "concession",
      "concessions",
      "discount",
      "car",
      "vehicle",
      "registration",
      "rego",
      "stamp duty",
      "GST",
      "NSW",
      "Victoria",
      "Queensland",
      "Opal",
      "myki",
      "energy rebate",
      "TPI",
      "expired card",
    ],
    related: [
      "gold-card",
      "permanent-impairment",
      "incapacity-offsets",
      "hardship-asp",
      "treatment-on-your-card",
    ],
    officialLinks: [
      {
        label: "DVA — Veteran Card – All Conditions (the Gold Card)",
        href: "https://www.dva.gov.au/access-benefits/veteran-card/veteran-card-all-conditions",
      },
      {
        label: "DVA — Veteran Cards and the 2026 reissue",
        href: "https://www.dva.gov.au/access-benefits/veteran-card",
      },
      {
        label: "DVA — Discounts and concessions (links to every state)",
        href: "https://www.dva.gov.au/what-we-help-with/discounts-and-concessions",
      },
      {
        label: "DVA — Supply of cars or car parts GST-free",
        href: "https://www.dva.gov.au/what-we-help-with/vehicle-costs-and-benefits/supply-of-cars-or-car-parts-gst-free",
      },
      {
        label: "ATO — Tax concessions on cars for people with disability",
        href: "https://www.ato.gov.au/people-with-disability/tax-concessions-on-cars-for-people-with-disability",
      },
      {
        label: "ATO — GST declaration for disabled veterans",
        href: "https://www.ato.gov.au/forms-and-instructions/gst-free-car-disabled-veterans",
      },
      {
        label: "NSW — Registration concessions for pensioners and veterans",
        href: "https://www.nsw.gov.au/driving-boating-and-transport/driving-nsw/vehicle-registration/renewing-vehicle-registration/pensioner-concessions-and-renewals",
      },
      { label: "Service NSW — Veterans", href: "https://www.service.nsw.gov.au/guide/veterans" },
      {
        label: "Victoria — Concessions and discounts for veterans",
        href: "https://www.vic.gov.au/concessions-veterans",
      },
      {
        label: "Queensland — Concessions for veterans",
        href: "https://www.qld.gov.au/community/getting-support-health-social-issue/veterans/financial-and-legal-support/concessions",
      },
      {
        label: "VicRoads — Registration concessions",
        href: "https://www.vicroads.vic.gov.au/registrations/manage-registrations/concession-discounts/concession-holder-discounts",
      },
      {
        label: "Queensland — Registration concession for veterans",
        href: "https://www.qld.gov.au/transport/registration/fees/concession/senior",
      },
      {
        label: "DVA — Motor Vehicle Compensation Scheme",
        href: "https://www.dva.gov.au/what-we-help-with/vehicle-costs-and-benefits/motor-vehicle-compensation-scheme",
      },
    ],
    blocks: [
      {
        type: "callout",
        tone: "info",
        title: "Same card, new name, new look",
        text: "DVA now calls the Gold Card the Veteran Card – All Conditions, and the White Card the Veteran Card – Specific Conditions. DVA’s [Veteran Card page](https://www.dva.gov.au/access-benefits/veteran-card) (updated 29 October 2026) says new-look cards started going out in July 2026 and some people may not get theirs until October. Current cards stay valid until the new one arrives, even if they read expired. DVA asks card holders to keep their postal address up to date in MyService.",
      },
      {
        type: "p",
        text: "The Gold Card is a treatment card. Discounts on cars, rego, transport and bills come from the ATO, each state and territory, and councils, and each sets its own rule. Some accept any Gold Card. Others want it printed TPI, EDA or War Widow(er), or want a DVA letter showing your impairment points or pension percentage.",
      },
      {
        type: "h3",
        text: "What the card covers, and how people get it",
        id: "covers",
      },
      {
        type: "ul",
        items: [
          "Cover: clinically needed treatment for all conditions in Australia. See [Using your Veteran Card](/guides/treatment-on-your-card).",
          "How people qualify: see [Gold Card: how veterans actually get one](/guides/gold-card), and DVA’s [Veteran Card – All Conditions page](https://www.dva.gov.au/access-benefits/veteran-card/veteran-card-all-conditions) (updated 11 September 2026).",
          "Unless the card is printed TPI, EDA, POW or War Widow(er), it does not show how you qualified. Many concessions turn on that reason: TPI, SRDP, impairment points, a disability pension percentage, or age and qualifying service. Your DVA decision letters and MyService show what you receive.",
        ],
      },
      {
        type: "h3",
        text: "Showing it to a concession provider",
        id: "proof",
      },
      {
        type: "ul",
        items: [
          "Some offices accept the card. Some want a DVA letter, for example one showing impairment points, and some want those points to come from overseas war service.",
          "DVA says you can produce some of these letters yourself in MyService, or call 1800 VETERAN (1800 838 372) and DVA will email or post one.",
          "The card is in MyService and can be added to the myGov wallet in the myGov app. Some offices check online through Services Australia, using the Veteran File Number on your card.",
          "Your Veteran File Number starts with the state you lived in when it was issued: N for NSW, Q for Queensland, and so on. DVA says some states want that letter to match where you live now. If you get income support from DVA, DVA says you must tell it you moved. Otherwise you can still ask DVA for a new number and card.",
        ],
      },
      {
        type: "h3",
        text: "Buying a car GST-free (all states)",
        id: "gst",
      },
      {
        type: "p",
        text: "This is not about the Gold Card itself. The ATO lets an eligible veteran buy or lease a car, or buy car parts, without GST. Because of your ADF service (or service in another Commonwealth armed force), you must have lost a leg or both arms, have total and permanent loss of use of a leg or both arms, receive a TPI pension, or receive (or be assessed as eligible for) SRDP. A Gold Card from 60 points or age 70 does not on its own meet that test.",
      },
      {
        type: "ul",
        items: [
          "DVA says the dealer has to agree to supply the car GST-free.",
          "The ATO form is the [Declaration for an exemption of GST on a car or car parts – disabled veterans](https://www.ato.gov.au/forms-and-instructions/gst-free-car-disabled-veterans). It goes to the dealer with a Gold Card printed TPI, or a DVA letter confirming eligibility.",
          "The ATO says the exemption does not apply if the car is bought jointly with anyone else, a partner included, or leased under a full novation arrangement.",
          "You must intend to use the car for personal transport for at least 2 years or 40,000 km.",
          "GST still applies to the part of the price above the ATO car limit. Modifications made only to adapt the car for your disability are not counted. There is no luxury car tax exemption for veterans.",
          "If GST was paid that should not have been, the dealer refunds it on the completed declaration. The ATO cannot refund it directly.",
          "DVA’s page lists the ATO on 13 28 66. A motorcycle is different: DVA runs a separate Motorcycle GST Rebate Scheme for serious service-related conditions.",
        ],
      },
      {
        type: "h3",
        text: "New South Wales",
        id: "nsw",
      },
      {
        type: "p",
        text: "Registration ([Transport for NSW](https://www.nsw.gov.au/driving-boating-and-transport/driving-nsw/vehicle-registration/renewing-vehicle-registration/pensioner-concessions-and-renewals), updated 1 July 2026). You must live in NSW. You pay no registration fee, motor vehicle tax or conditional registration fee on one vehicle if you have any of these:",
      },
      {
        type: "ul",
        items: [
          "A Gold Card printed TPI, EDA or War Widow(er).",
          "A DVA statement showing a Disability Compensation Payment of 70% or more, an Intermediate or EDA pension, an Additional Disablement Amount, or 50 or more impairment points under the MRCA.",
          "A Pensioner Concession Card (including one from DVA) with a NSW address.",
        ],
      },
      {
        type: "p",
        text: "Stamp duty and the transfer fee are waived only for DVA clients with a Disability Compensation Payment of 70% or more, an Intermediate, TPI or EDA pension, an Additional Disablement Amount, or 50 or more MRCA impairment points. War Widow(er)s are not on that list. NSW asks for points assessed under the MRCA, so points assessed under the DRCA may not count. A Gold Card that came only from age and qualifying service is not on the NSW list. Service NSW checks eligibility electronically at renewal, and interstate concession cards are not accepted.",
      },
      {
        type: "p",
        text: "Other NSW concessions are on the [Service NSW veterans page](https://www.service.nsw.gov.au/guide/veterans): a Gold Opal card (senior and pensioner fares, open to any Gold Card holder, per [Transport for NSW](https://transportnsw.info/tickets-fares/eligibility-concessions/dva-veteran-gold-cards)); energy bill rebates and e-toll concessions, which Gold Card holders may qualify for; and driver, fishing and boat licences and the Spectacles Program, which say “eligible DVA card” without saying which cards count (Service NSW: 13 77 88).",
      },
      {
        type: "h3",
        text: "Victoria",
        id: "vic",
      },
      {
        type: "p",
        text: "From the Victorian Government’s [concessions for veterans page](https://www.vic.gov.au/concessions-veterans) (updated 26 October 2026).",
      },
      {
        type: "ul",
        items: [
          "Registration: a Gold Card qualifies unless it is marked Dependant. Cards marked War Widow or War Widower qualify. [VicRoads](https://www.vicroads.vic.gov.au/registrations/manage-registrations/concession-discounts/concession-holder-discounts) says it covers one personal vehicle used privately, and to apply in myVicRoads (Vehicles & Registration) at least 5 days before rego is due. The Victorian page gives VicRoads on 13 11 71. The Victorian page also accepts written DVA confirmation of 40 or more MRCA impairment points, or of a VEA entitlement under section 22 (at the 100% rate), 23, 24, 25 or 104.",
          "Buying a vehicle: a motor vehicle duty (stamp duty) exemption with that same DVA written confirmation, limited to one vehicle per concession card (VicRoads: 13 11 71). The page also lists a stamp duty concession on low-cost new homes and part discounts on mid-range homes for Gold Card holders (State Revenue Office: 13 21 61).",
          "Energy and water: the electricity, gas, water and sewerage concessions are open to all Gold Card holders.",
          "Council rates concession: only cards marked TPI, War Widow(er), EDA or POW. The fire services property levy concession: only TPI and War Widow(er).",
          "Public transport: a concession myki pass for cards printed TPI or EDA. Other veteran myki concessions need proof of overseas service.",
          "The Veterans Card – Victoria is separate. Any Victorian who served in the ADF can get it, with or without a Gold Card. The state page lists $100 off one vehicle’s registration.",
        ],
      },
      {
        type: "h3",
        text: "Queensland",
        id: "qld",
      },
      {
        type: "p",
        text: "Registration ([Queensland Transport](https://www.qld.gov.au/transport/registration/fees/concession/senior), page dated 20 December 2023). You must live in Queensland and be assessed at a 70% degree of incapacity or more under the VEA, or 50 or more impairment points under the MRCA. The concession covers 1 vehicle and 1 recreational boat, and only 1 concession per spousal couple. The form is F3937. A Gold Card printed TPI or EDA is accepted on its own. Any other Gold Card, or a White Card, needs a DVA letter confirming your incapacity or impairment as well.",
      },
      {
        type: "p",
        text: "From Queensland’s [concessions for veterans page](https://www.qld.gov.au/community/getting-support-health-social-issue/veterans/financial-and-legal-support/concessions) (updated 6 November 2025). That page says your DVA card needs the Q prefix.",
      },
      {
        type: "ul",
        items: [
          "Electricity and gas rebates: Gold Card holders may be eligible. Criteria apply.",
          "Council rates subsidy: may be up to 20% off, capped at $200 a year. South East Queensland water subsidy: may be up to $120 a year. Emergency Management Levy: 20% off on the home you own and live in.",
          "Queensland Rail long-distance travel: Gold Card holders marked War Widow or War Widower get four pension rail entitlements a calendar year. TPI or EDA Gold Card holders with a Translink TPI/EDA Veteran Travel Card get one free return trip a fortnight (1300 131 722).",
          "Translink: free travel for TPI and EDA Gold Card holders with a TPI/EDA Veteran Travel Card. The old 50% veteran concession fare is gone; Translink now charges a flat 50-cent fare.",
        ],
      },
      {
        type: "h3",
        text: "Other states and territories",
        id: "states",
      },
      {
        type: "p",
        text: "Each one sets its own list. These are the official pages DVA links to. Councils and private businesses run their own discounts.",
      },
      {
        type: "ul",
        items: [
          "[Western Australia](https://www.wa.gov.au/organisation/department-of-communities/concessions-available-western-australia)",
          "[South Australia](https://www.sa.gov.au/topics/care-and-support/concessions)",
          "[Tasmania](https://www.concessions.tas.gov.au/)",
          "[ACT](https://www.act.gov.au/money-and-tax/cost-of-living-support)",
          "[Northern Territory](https://nt.gov.au/community/concessions-and-payments)",
        ],
      },
      {
        type: "h3",
        text: "If a service-related condition affects your driving",
        id: "mvcs",
      },
      {
        type: "p",
        text: "DVA’s [Motor Vehicle Compensation Scheme](https://www.dva.gov.au/what-we-help-with/vehicle-costs-and-benefits/motor-vehicle-compensation-scheme) (updated 24 September 2026) can pay part or all of the cost of modifying a car, or a modified car, if an accepted condition means you cannot drive or be driven safely without changes. DVA’s eligibility rules for it do not mention the Gold Card. It is requested through the compensation claim form (vehicle modifications, Part G) or through your needs or rehabilitation assessor, and a driver-trained occupational therapist assesses what is needed. The older Vehicle Assistance Scheme is closed to new claims.",
      },
    ],
  },
  {
    slug: "asking-an-ai",
    title: "Asking an AI without being misled",
    summary:
      "A prompt you can paste into any AI. It cannot make an answer verified. It can stop the model pretending it checked.",
    category: "Getting started",
    updated: "19 October 2026",
    lastChecked: "19 October 2026",
    tags: ["AI", "prompt", "Grok", "ChatGPT", "check the page"],
    related: ["start-here", "lodge-a-claim", "appeals-vrb-art", "advocates"],
    officialLinks: [
      { label: "DVA — the page that wins", href: "https://www.dva.gov.au/" },
      { label: "Terms of this site", href: "/terms" },
      { label: "Privacy — do not paste your file", href: "/privacy" },
    ],
    blocks: [
      {
        type: "callout",
        tone: "warn",
        title: "A prompt is not verification",
        text: "No instruction can make Grok, ChatGPT, or any other model tell the truth. This one forces it to say “Not checked” when it has not opened the official page. Your decision letter, and that page, still win.",
      },
      {
        type: "p",
        text: "Confident answers waste months. “You are entitled.” “The rate is definitely.” “This case means DVA must.” Those sentences feel like progress. They are the model filling a gap. The way to shorten that is to ban the gap before you ask the question.",
      },
      {
        type: "h3",
        text: "What to paste, and what to leave out",
      },
      {
        type: "p",
        text: "Paste the prompt, then ask a general process question under it. Do not paste your name, claim number, date of birth, address, or medical file. A model that asks for the file is asking for more than it needs. Refuse. Many AI apps keep what you type and can use it to train their models unless you turn that off in their settings. Assume anything you paste could be seen again.",
      },
      {
        type: "h3",
        text: "Copy this into the AI",
        id: "prompt",
      },
      {
        type: "prompt",
        title: "The prompt",
        text: `You are helping an Australian veteran understand a Department of Veterans' Affairs (DVA) process. You are not DVA, not Defence, not a lawyer, and not a financial adviser. You do not decide claims and you do not lodge anything.

Rules:
- Do not say "you are entitled", "you will win", or "DVA must". State the test and who decides.
- Every dollar figure, time limit, form number, and office-holder name must name the official page and the date printed on that page. If you have not opened that page, write "Not checked" and stop. Do not estimate.
- A date on a letter and the date the letter arrived are different clocks. Use the letter. Do not treat 12 months, 3 months, or 60 days as universal.
- A compensation dispute usually goes to the Veterans' Review Board first. The Administrative Review Tribunal comes after a VRB decision. Do not skip the Board. Do not call the old Administrative Appeals Tribunal the current path. Do not invent the time limit. If you have not opened the decision letter and DVA's single review pathway, write "Not checked".
- Liability and permanent impairment are different claims. Being eligible for the Special Rate Disability Pension is not the same as choosing to take the payment.
- Do not guess which Act applies (MRCA, DRCA, or VEA). If the decision letter and the lodgement date are not in the question, say you cannot tell.
- Do not use a Facebook post, another veteran's outcome, or a tax case as the rule for a DVA payment.
- Do not ask for a name, claim number, date of birth, address, or medical file. If one is pasted, do not repeat it. Answer the process only.
- If you are unsure, say so in one sentence and point to https://www.dva.gov.au/

Answer in plain Australian English. Then list the official page to open, the date on that page, and the one next step. If you cannot list the page and the date, you have not answered.`,
      },
      {
        type: "h3",
        text: "Sentences that mean stop",
      },
      {
        type: "ul",
        items: [
          "“DVA must” or “you will win.” Nobody using a chat window decides that.",
          "“The rate is definitely” with no page and no date. That number may be from last year.",
          "“This case settles it.” A tax case, or another veteran’s outcome, is not your letter.",
          "“I have calculated your payment.” It does not have your file, and it should not.",
          "A time limit stated as if every letter uses it. The letter is the clock.",
          "“Skip the VRB and go to the Tribunal.” For most compensation decisions the Board comes first.",
        ],
      },
      {
        type: "h3",
        text: "The dispute, on its own page",
        id: "dispute",
      },
      {
        type: "p",
        text: "Do not ask the model to design the appeal. The order is already set. The full page is Appeals: VRB first, then the Administrative Review Tribunal, linked below. Deadlines, in the top menu, counts the window. The letter still wins.",
      },
      {
        type: "ol",
        items: [
          "Read the rights paragraph on the decision. That is the clock. It is not the same for every letter.",
          "Veterans’ Review Board (VRB). For most compensation decisions this is the first review outside DVA. No fee. Informal. It can look at the merits, and new medical evidence is often the point. You do not start at a court.",
          "Administrative Review Tribunal (ART). Only if you still disagree after the VRB. It replaced the AAT. It is more formal. DVA says 3 months from a VRB decision. That is three calendar months, not 90 days. If the notice date and the day you received it differ, the Deadlines tool shows both expiry dates.",
          "Some fights are not this path. A delay with no decision yet has nothing to review. CDDA and the Ombudsman are not VRB appeals. VEA pension rate and attendant allowance can be a shorter clock. Older DRCA letters can still say 30 days, then 60.",
        ],
      },
      {
        type: "h3",
        text: "What to do with the answer",
      },
      {
        type: "ol",
        items: [
          "If it says “Not checked”, it has not answered. Open the official page yourself, or ask again only after you have pasted the relevant sentences from that page.",
          "If it names a page, open that page. Read the date on it. If the date and the model’s date disagree, the page wins.",
          "If a time limit is involved, use the date on your letter and the date you received it. Do not use the model’s calendar.",
          "If you are about to act on a live claim, take the question to an accredited advocate. The prompt does not replace one.",
        ],
      },
    ],
  },
  {
    slug: "helping-a-veteran",
    title: "Helping a veteran with their DVA file",
    summary:
      "For a partner, family member, or friend doing the administration. DVA will not discuss the file until the veteran appoints you on form D9325.",
    category: "Getting started",
    updated: "24 October 2026",
    lastChecked: "24 October 2026",
    tags: [
      "representative",
      "D9325",
      "D9378",
      "family",
      "partner",
      "wife",
      "husband",
      "carer",
      "helping",
      "paperwork",
      "power of attorney",
      "advocate",
      "MyService",
    ],
    related: ["advocates", "lodge-a-claim", "foi", "start-here"],
    officialLinks: [
      {
        label: "What is a representative (DVA)",
        href: "https://www.dva.gov.au/what-we-help-with/advocacy-representation-advice/what-is-a-representative",
      },
      {
        label: "How to apply for representation in MyService (DVA)",
        href: "https://www.dva.gov.au/about-myservice/myservice-for-advocates/how-to-apply-for-representation-in-myservice",
      },
      {
        label: "Form D9325 (DVA)",
        href: "https://www.dva.gov.au/about-us/dva-forms/appointing-third-party-represent-dva-client",
      },
      {
        label: "What is consent (DVA)",
        href: "https://www.dva.gov.au/what-we-help-with/advocacy-representation-advice/what-is-consent",
      },
      {
        label: "Form D9378 Partner Declaration and Consent (DVA)",
        href: "https://www.dva.gov.au/about-us/dva-forms/partner-declaration-and-consent",
      },
      {
        label: "What to consider if you are looking for help (DVA)",
        href: "https://www.dva.gov.au/what-we-help-with/advocacy-representation-advice/what-to-consider-if-youre-looking-for-help",
      },
      { label: "Advocacy Register", href: "https://www.advocateregister.org.au/" },
    ],
    blocks: [
      {
        type: "callout",
        tone: "warn",
        title: "DVA will not talk to you yet",
        text: "Until the veteran appoints you, DVA will not discuss the file, the claim, or the payments with you. That is the privacy rule, not a refusal of the claim. The appointment is form D9325, signed by both of you. This page is for the helper. It is not legal advice.",
      },
      {
        type: "h3",
        text: "Do this first",
        id: "first",
      },
      {
        type: "steps",
        items: [
          {
            title: "Choose the permission together",
            text: "DVA has four. Enquire: DVA can tell you about payments, debts and where a claim is up to. Act: you can lodge claims, sign forms, report changes and book travel. Act – health: the same, but only for medical treatment matters. Receive payments: the veteran’s DVA money is paid to you. More than one person can enquire. Only one person can act or receive payments.",
          },
          {
            title: "Fill in D9325 and both sign it",
            text: "The form is the same whichever way you hand it in. The veteran fills in their part, you fill in yours, and you sign the acceptance and declaration. DVA says a representative should be over 18. DVA may ask you for proof of identity.",
          },
          {
            title: "Hand it in",
            text: "Online: in MyService, go to Representation and choose Represent me (the veteran) or I represent (you). Upload the signed D9325. MyService can pre-fill the form for you. On paper: post it to Department of Veterans’ Affairs, GPO Box 9998, Brisbane QLD 4001, or take it to a VAN office.",
          },
          {
            title: "Wait until DVA has actioned it",
            text: "Until then, DVA still cannot tell you anything. Once it is done, the arrangement shows on the Representation screen in both of your MyService accounts. If the veteran said yes to online access, you then reach their record through Select client, in your own name.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Read this before you choose “receive payments”",
        text: "The D9325 form says that giving account details means the veteran agrees for their payments to be sent to you. To chase a claim, enquire is enough. To lodge and sign for them, choose act. Choose receive payments only if the veteran wants their DVA money paid to you.",
      },
      {
        type: "h3",
        text: "What you agree to",
        id: "agree",
      },
      {
        type: "p",
        text: "DVA’s representative page (updated 16 January 2024) says a person permitted to act must:",
      },
      {
        type: "ul",
        items: [
          "act in the veteran’s best interests, taking their wishes into account;",
          "tell DVA about changes in the veteran’s circumstances within 14 days (28 days if outside Australia);",
          "answer DVA’s notices about the veteran’s pension. If you do not, DVA treats it as the veteran not meeting their obligations, and it can lead to an overpayment.",
        ],
      },
      {
        type: "h3",
        text: "What you can do while you wait",
        id: "before",
      },
      {
        type: "ul",
        items: [
          "Build a chronology: service, the condition, the first symptom, the diagnosis, every letter and its date.",
          "Collect the medical reports and the decision letters. Photograph or scan them.",
          "List the accepted conditions and the claim numbers from the letters already in the house.",
          "Draft the letter or the claim answers. The veteran still signs, or you lodge only after the appointment is in place.",
          "Print the [DVA call sheet](/call-sheet) for the first call after the appointment is in place. It keeps the claim number, the questions and the call reference on one page.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Do not share the MyService login",
        text: "The shortcut people take is to use the veteran’s myGov and MyService password. That is not an appointment. It leaves no record of who did what, and it fails the moment the veteran changes the password or DVA asks who is on the call. D9325 is the path that lets you act in your own name.",
      },
      {
        type: "h3",
        text: "Couples: the partner consent form",
        id: "couples",
      },
      {
        type: "p",
        text: "D9378 Partner Declaration and Consent is a different form. DVA uses it so both members of a couple agree to share personal and financial information, and its examples are claims for income support pensions and the Commonwealth Seniors Health Card. It does not appoint you to act on the veteran’s claims. That is still D9325.",
      },
      {
        type: "h3",
        text: "You are not the advocate",
        id: "not-advocate",
      },
      {
        type: "p",
        text: "An ATDP-trained advocate works through an ex-service organisation that does not charge for advocacy. Find one at advocateregister.org.au. A partner doing the filing is a representative, not an advocate. DVA’s page on looking for help (updated 27 August 2024) says using a provider that charges fees does not guarantee results or faster processing. You can have an advocate and still be the person who keeps the papers.",
      },
      {
        type: "h3",
        text: "If the veteran can no longer manage their affairs",
        id: "cannot-sign",
      },
      {
        type: "p",
        text: "DVA’s representative page says the person representing them must provide legal and medical evidence. It gives these examples: an enduring power of attorney; a guardianship or administration order from a court or tribunal; or a certified letter or report from a medical professional confirming the veteran has lost decision-making capacity. This is Part C of D9325. Whether a particular document is valid is a state law question. Take that part to a solicitor. D9325 only covers DVA. Other agencies and banks have their own processes.",
      },
      {
        type: "h3",
        text: "What this does not do",
        id: "limits",
      },
      {
        type: "ul",
        items: [
          "It does not pay you for helping. Household services generally cannot be paid to family. That rule is on the household-services guide.",
          "It is not the whole file. With online access you can see what is in the veteran’s MyService. A copy of the full DVA file is still a personal information request or an FOI request.",
          "It does not cover other departments. D9325 is DVA only.",
        ],
      },
    ],
  },
  {
    slug: "pi-after-liability",
    title: "Liability accepted. Now what? The permanent impairment claim, step by step",
    summary:
      "Liability and permanent impairment are two claims. This is the order of events, DVA’s published waits, and what happens while you wait.",
    category: "Getting started",
    updated: "November 2026",
    lastChecked: "1 November 2026",
    tags: ["PI", "permanent impairment", "liability", "wait", "tinnitus", "lifestyle", "delegate"],
    related: ["permanent-impairment", "delays", "medical-evidence", "gold-card", "advocates"],
    officialLinks: [
      {
        label: "Conditions and claims processing times (DVA)",
        href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/conditions-and-claims-processing-times",
      },
      {
        label: "Tinnitus pilot (DVA news, 10 March 2026)",
        href: "https://www.dva.gov.au/news/latest-stories/improving-access-to-early-assessment-and-treatment-for-tinnitus",
      },
      {
        label: "Tinnitus pilot FAQ (DVA PDF)",
        href: "https://www.dva.gov.au/sites/default/files/2026-08/Frequently-Asked-Questions-Improved-Acces-to-Treatment-for-Tinnitus-Pilot.pdf",
      },
      {
        label: "Hearing services, including the tinnitus program (DVA)",
        href: "https://www.dva.gov.au/what-we-help-with/health-support/hearing-services",
      },
      { label: "How a rating is built (this site)", href: "/guides/permanent-impairment" },
    ],
    blocks: [
      {
        type: "p",
        text: "Liability says the condition is service-related. Permanent impairment (PI) pays for lasting loss once DVA assesses it. They are two claims, often with two numbers. If liability is not accepted, a PI claim cannot finish. The map of the stack is on [Start here](/guides/start-here). How points combine is on the [permanent impairment guide](/guides/permanent-impairment). This page is the order of events and the waits.",
      },
      {
        type: "h3",
        text: "The order of events",
        id: "order",
      },
      {
        type: "ol",
        items: [
          "Lodge the PI claim in MyService. If you are not using an advocate, the paper claim is D2051 with a D2049 details sheet for each condition. An advocate must lodge online.",
          "DVA allocates the claim. The published wait is to a claims support officer, not a promise of when a delegate will decide.",
          "They may ask for medical evidence, or book an assessment. Answer once, with a closed pack. Use the [medical evidence guide](/guides/medical-evidence), the [playbook for when DVA wants more](/playbooks/dva-wants-more-medical), and the [specialist briefing letter](/letters/specialist-brief).",
          "They may send a lifestyle questionnaire. It is about how the condition affects daily life. This site will not tell you which answer scores higher. Use the form named on the letter.",
          "You get a determination letter. Where the Act allows a choice, the letter or a later offer sets out weekly, lump sum, or a mix. The shape of that choice is on the permanent impairment guide. The letter is the clock for any review.",
        ],
      },
      {
        type: "h3",
        text: "How long DVA says it takes",
        id: "waits",
      },
      {
        type: "p",
        text: "As at 30 September 2026, on DVA’s conditions and claims processing times page (updated 23 October 2026). These are averages, not a promise. Individual waits vary widely.",
      },
      {
        type: "ul",
        items: [
          "MRCA PI averaged 146 days to allocate to a claims support officer after the liability decision or lodgement, whichever is later.",
          "MRCA PI claims received in the last 12 months averaged 171 days to process. DVA splits that as 47 days waiting for external information and 123 days with DVA.",
          "The average age of outstanding MRCA PI claims is 185 days.",
          "DRCA PI claims still on hand averaged 269 days of age.",
          "The page publishes no time for the stages after allocation, such as from the last medical assessment to a decision, or from a claims support officer to a delegate. It also publishes no time for claims DVA has expedited.",
        ],
      },
      {
        type: "h3",
        text: "Treatment and stability",
        id: "treatment",
      },
      {
        type: "p",
        text: "DVA’s tinnitus-pilot news (10 March 2026) says that when DVA judges whether an impairment is likely to continue indefinitely (MRCA section 73), it looks at how long it has lasted, the likelihood of improvement, and whether all reasonable rehabilitative treatment has been undertaken. So refusing treatment, including surgery, can come up. The effect of a refusal is decided on the individual file.",
      },
      {
        type: "h3",
        text: "The tinnitus pilot",
        id: "tinnitus",
      },
      {
        type: "p",
        text: "The pilot started in April 2026. DVA’s FAQ says it currently applies to veterans under 60 with an undetermined MRCA PI claim for tinnitus. If you are in it, DVA sends a letter referring you to Hearing Australia for a fully funded assessment and treatment. Book on the number in that letter. The FAQ publishes no public booking line, and says calling the number on the letter is how Hearing Australia identifies you as a pilot participant. Being referred is not a rejection, and treatment under the pilot needs no separate prior-approval request. Outside the pilot, see [Using your Veteran Card](/guides/treatment-on-your-card).",
      },
      {
        type: "h3",
        text: "Adding conditions, and increases",
        id: "later",
      },
      {
        type: "p",
        text: "Points combine. Use the [calculator](/calculator) as an estimate, then read the [Gold Card guide](/guides/gold-card). A worsening is measured from the baseline, not from zero. The [permanent impairment guide](/guides/permanent-impairment) has the combining rule. For a new condition or a reassessment on paper, D2051 is still DVA’s “Claim for Liability and/or Reassessment of Compensation”, and only if an advocate is not lodging it for you. Check your letter before you rely on a form number from a group.",
      },
      {
        type: "h3",
        text: "If it stalls",
        id: "stalls",
      },
      {
        type: "p",
        text: "A published average is not a reason to leave a flagged file untouched. Use the [delays guide](/guides/delays), the [claim is stuck playbook](/playbooks/claim-is-stuck), and the [expedition letter](/letters/expedition). If you ring, use the [call sheet](/call-sheet).",
      },
    ],
  },
  {
    slug: "treatment-on-your-card",
    title: "Using your Veteran Card for treatment: cover, prior approval, and getting money back",
    summary:
      "What the two cards cover, when a provider needs approval first, and how to claim money you already paid.",
    category: "How DVA treats you",
    updated: "November 2026",
    lastChecked: "1 November 2026",
    tags: [
      "Veteran Card",
      "Gold Card",
      "White Card",
      "prior approval",
      "MEPI",
      "treatment",
      "pharmacy",
    ],
    related: [
      "gold-card",
      "gold-card-concessions",
      "allied-health",
      "household-services",
      "travel-for-treatment",
      "pi-after-liability",
    ],
    officialLinks: [
      {
        label: "Veteran Card – Specific Conditions (DVA)",
        href: "https://www.dva.gov.au/access-benefits/veteran-card/veteran-card-specific-conditions",
      },
      {
        label: "Veteran Card – All Conditions (DVA)",
        href: "https://www.dva.gov.au/access-benefits/veteran-card/veteran-card-all-conditions",
      },
      {
        label: "Approvals for providers (DVA)",
        href: "https://www.dva.gov.au/providers/fees-claims/approvals-for-providers",
      },
      {
        label: "Medical expenses privately incurred (DVA)",
        href: "https://www.dva.gov.au/what-we-help-with/health-support/help-to-cover-healthcare-costs/medical-expenses-privately-incurred-mepi",
      },
      {
        label: "Hearing services (DVA)",
        href: "https://www.dva.gov.au/what-we-help-with/health-support/hearing-services",
      },
      {
        label: "Health services for the veteran community (DVA)",
        href: "https://www.dva.gov.au/what-we-help-with/health-support/health-services-for-the-veteran-community",
      },
      {
        label: "Processing times for funded services (DVA)",
        href: "https://www.dva.gov.au/about-us/what-we-do/overview-of-dva-benefits-and-services/processing-times-for-access-to-dva-funded-services",
      },
      {
        label: "Medicinal cannabis (DVA)",
        href: "https://www.dva.gov.au/what-we-help-with/health-support/help-to-cover-healthcare-costs/manage-medicine-and-keep-costs-down/medicinal-cannabis",
      },
      {
        label: "Concessional medicines under the RPBS (DVA)",
        href: "https://www.dva.gov.au/what-we-help-with/health-support/help-to-cover-healthcare-costs/manage-medicine-and-keep-costs-down/concessional-medicines-under-the-rpbs",
      },
    ],
    blocks: [
      {
        type: "h3",
        text: "Two cards, two scopes",
        id: "cards",
      },
      {
        type: "ul",
        items: [
          "Veteran Card – All Conditions (Gold) covers clinically necessary treatment for all conditions. How people get that card is on the [Gold Card guide](/guides/gold-card).",
          "Veteran Card – Specific Conditions (White) covers accepted conditions. DVA’s Specific Conditions page lists what else can sit on a White Card, including some mental health treatment.",
          "Accepted conditions are listed in MyService. You can also ask on 1800 VETERAN (1800 838 372).",
        ],
      },
      {
        type: "h3",
        text: "Is a nearby condition covered?",
        id: "nearby",
      },
      {
        type: "p",
        text: "A new problem next to an accepted one (bursitis beside an accepted joint is the usual example) is DVA’s decision. It may fall under the accepted condition, or it may need its own claim. If the provider or DVA says it is not covered, lodge it as its own condition: see [Lodge a claim](/guides/lodge-a-claim).",
      },
      {
        type: "h3",
        text: "Prior approval",
        id: "approval",
      },
      {
        type: "p",
        text: "DVA’s approvals page for providers (updated 18 November 2025) says DVA must approve some services before it will pay. They include services with no MBS item, fees above the DVA schedule, some medicines, some dental, and admission to a non-contracted hospital. Your provider asks, not you. Approval is needed each time, even if the same service was approved before. On DVA’s times page (updated 15 October 2026), approvals took a median of 12 days and an average of 58 days in September 2026. DVA says the time depends on the clinical information supplied.",
      },
      {
        type: "p",
        text: "If an approval sits, use the [call sheet](/call-sheet) and the [delays guide](/guides/delays). A phone promise is not an approval.",
      },
      {
        type: "h3",
        text: "Got a bill? Paid it yourself?",
        id: "mepi",
      },
      {
        type: "p",
        text: "Check before the appointment that the provider accepts your Veteran Card. DVA will not reimburse repeat visits to a provider who does not, unless exceptional circumstances apply.",
      },
      {
        type: "p",
        text: "If you paid yourself, DVA’s MEPI page (updated 20 August 2026) says it may reimburse items on the MBS, a DVA fee schedule, the RPBS or the Rehabilitation Appliances Program, if you hold a Veteran Card. There are two cases:",
      },
      {
        type: "ul",
        items: [
          "In time: you paid after your condition’s date of eligibility but before DVA told you it was accepted. DVA will consider the reasonable cost.",
          "Out of time: you paid after DVA told you. DVA considers this only in exceptional circumstances.",
        ],
      },
      {
        type: "p",
        text: "Apply with the MEPI webform. Paper form D1181 is the fallback. Services, investigations or treatments linked to a compensation claim do not go through MEPI: DVA says to contact your Initial Liability Claims Delegate.",
      },
      {
        type: "p",
        text: "DVA commits to approving webform claims within 14 days when all documents are supplied. In September 2026 the webform average was 12 days. Across all claims, including paper and email, the median was 52 days and the average 75 days (DVA’s times page, updated 15 October 2026).",
      },
      {
        type: "h3",
        text: "Travel, providers, tinnitus, and allied health",
        id: "elsewhere",
      },
      {
        type: "ul",
        items: [
          "Travel for treatment, including flights and accommodation: [Travel for treatment](/guides/travel-for-treatment).",
          "To find a provider who accepts the card, ask before you book, or call 1800 VETERAN (1800 838 372). DVA’s medicinal cannabis page points people who need a new doctor to Healthdirect’s Service Finder.",
          "Tinnitus treatment outside a PI claim: DVA’s hearing services page (updated 30 September 2026) says it may be available on an All Conditions card, or a Specific Conditions card with tinnitus accepted. Your GP refers you to an audiologist or an ear, nose and throat specialist, and the provider needs DVA approval first. The PI pilot is separate: see [Liability accepted. Now what?](/guides/pi-after-liability).",
          "Allied health still uses the treatment cycle until DVA says otherwise. See the [allied health guide](/guides/allied-health).",
          "What DVA funds: DVA’s health services page (updated 19 August 2026) lists acupuncture by Medicare-registered GPs among the services it funds where clinically required. It says DVA does not fund alternative therapies, and names naturopathy, iridology and homeopathy. On a White Card, cover depends on your accepted conditions. If you are unsure, ask DVA on 1800 838 372 before you book.",
        ],
      },
      {
        type: "h3",
        text: "Medicinal cannabis",
        id: "cannabis",
      },
      {
        type: "p",
        text: "A doctor prescribes it. DVA’s medicinal cannabis page (updated 1 September 2026) says funding is decided case by case, and only where DVA already has liability for a condition on its list and standard treatments have not worked. The list is chronic pain, chemotherapy-induced nausea and vomiting, palliative care indications, anorexia and wasting associated with chronic illness, spasticity from neurological conditions, and refractory paediatric epilepsy. DVA says it cannot fund it where use is not proven, and gives treatment of a mental health condition as an example.",
      },
      {
        type: "p",
        text: "DVA says it funds medicinal cannabis only through the RPBS, on an authority prescription your doctor gets approved first, from a pharmacy that can dispense RPBS items. If you paid privately, DVA says reimbursement is not guaranteed and is not a way to fund ongoing treatment. Its page names form D1181 with the pharmacy receipt, sent to pharmacy.reimbursement@dva.gov.au. For a product not supplied on an RPBS authority prescription, it also asks for form D9546 from your treating doctor. DVA says it cannot name doctors who prescribe it or recommend providers. To look for one, its page points to Healthdirect’s Service Finder, or 1800 838 372.",
      },
      {
        type: "h3",
        text: "Other medicines",
        id: "medicines",
      },
      {
        type: "p",
        text: "DVA’s page on concessional medicines under the RPBS (last updated 1 January 2024) says a White Card covers a script for a condition the card covers, and a Gold Card any assessed clinical need. It says some items need DVA’s approval before prescribing, and any item not on the PBS or RPBS schedules does, and that your provider can ask DVA’s pharmacy advisory line on 1800 552 580. That page does not mention weight-loss medicines, and this site has not found a DVA page that sets rules for them. Your doctor can ask DVA whether a particular item is available.",
      },
    ],
  },
  {
    slug: "travel-for-treatment",
    title: "Travel for treatment: what DVA covers and how to claim it",
    summary:
      "Who can claim, the kilometre rate, flights and accommodation, and what to do when a MyService travel claim sits.",
    category: "Money and hardship",
    updated: "November 2026",
    lastChecked: "1 November 2026",
    tags: ["travel", "D0800", "kilometre", "flights", "accommodation", "taxi", "reimbursement"],
    related: ["treatment-on-your-card", "delays"],
    officialLinks: [
      {
        label: "Claim travel expenses under the improved MRCA (DVA)",
        href: "https://www.dva.gov.au/what-we-help-with/health-support/claim-travel-expenses-under-the-improved-mrca",
      },
      {
        label: "Travel for treatment (DVA)",
        href: "https://www.dva.gov.au/what-we-help-with/health-support/travel-for-treatment",
      },
      {
        label: "Closest appropriate provider (DVA, 30 September 2026)",
        href: "https://www.dva.gov.au/news/latest-stories/choose-the-closest-appropriate-healthcare-provider-when-you-travel-for-treatment",
      },
      {
        label: "What changed for travel from 1 July 2026 (DVA)",
        href: "https://www.dva.gov.au/news/latest-stories/claiming-travel-reimbursements-from-1-july-2026",
      },
      {
        label: "Processing times for funded services, including travel (DVA)",
        href: "https://www.dva.gov.au/about-us/what-we-do/overview-of-dva-benefits-and-services/processing-times-for-access-to-dva-funded-services",
      },
    ],
    blocks: [
      {
        type: "p",
        text: "From 1 July 2026, travel for treatment is assessed under the improved MRCA. DVA’s travel page (updated 16 September 2026) says the program helps clients and an attendant with transport to treatment covered by the Veteran Card, inside Australia. The dollar rules below are from DVA’s “Claim travel expenses under the improved MRCA” page (updated 9 July 2026) unless another date is named.",
      },
      {
        type: "h3",
        text: "Who can claim",
        id: "who",
      },
      {
        type: "ul",
        items: [
          "A Veteran Card – All Conditions or Specific Conditions, for treatment that card covers.",
          "Also, on that page: a medical examination DVA asks for, gathering evidence for a Veterans’ Review Board hearing, or attending that hearing.",
          "Not covered, on that page: Administrative Review Tribunal hearings, treatment outside Australia, and regular rehabilitation program activities.",
          "Some older travel, including travel for a service pension claim or a disability compensation claim lodged before 1 July 2026, stays under the VEA. Check your letter if you are unsure which Act applies.",
        ],
      },
      {
        type: "h3",
        text: "Private vehicle",
        id: "car",
      },
      {
        type: "p",
        text: "Reimbursement is 68 cents a kilometre. Parking and road tolls can be reimbursed. DVA’s 2 June 2026 notice says that from 1 July 2026 the old 50 kilometre minimum no longer applies to MRCA and DRCA private-vehicle travel, so short trips can be claimed. You do not need a receipt for the kilometres themselves. Keep a note of the date, the provider, and the kilometres.",
      },
      {
        type: "h3",
        text: "Public transport, taxis, and car hire",
        id: "other-transport",
      },
      {
        type: "p",
        text: "DVA says it can reimburse public transport (bus, train, ferry), taxi or rideshare, and air travel, which may need prior approval. If you are travelling to the place where appropriate treatment is available, the full fare is reimbursed. DVA’s page gives no rule for car hire, so ask DVA before you hire one.",
      },
      {
        type: "h3",
        text: "Interstate and air travel",
        id: "air",
      },
      {
        type: "p",
        text: "Travel is assessed to the Place Where Appropriate Treatment is Available (PWATA): the closest approved provider who can give the treatment you need. You can still see a provider further away, but if they are not the PWATA, DVA may not pay the full cost. DVA’s 30 September 2026 notice says to email transport.claims@dva.gov.au before you book a long trip, and that treatment approval and travel compensation are separate decisions. DVA’s claims page says only that air travel “may need prior approval”, so ask before you buy a ticket.",
      },
      {
        type: "h3",
        text: "Accommodation, meals, and an attendant",
        id: "stay",
      },
      {
        type: "p",
        text: "If an overnight stay was reasonable, you and a travel attendant can be reimbursed. An attendant is a responsible person who helps with physical, emotional or practical needs. A partner, family member or friend qualifies, and they need no medical qualification. DVA may reimburse their transport, accommodation and meals the same way as yours. Standard rates from 1 July 2026:",
      },
      {
        type: "ul",
        items: [
          "Subsidised accommodation: $141.00 a night per person.",
          "Private accommodation: $59.60 a night per person.",
          "Meals: $19.10 per person for a 101 to 400 kilometre round trip; $38.80 for 400 kilometres or more; $108.50 with an overnight stay.",
          "Commercial accommodation: receipts required. DVA uses Australian Taxation Office rates as a guide, and capital cities are higher (the page lists Sydney at $230). You can ask DVA to pay above the guide if you explain the extra cost.",
          "Private accommodation and meals at these rates need no receipt up front. Keep anything DVA may ask for.",
        ],
      },
      {
        type: "h3",
        text: "How to claim, and a claim that sits",
        id: "claim",
      },
      {
        type: "p",
        text: "Claim in MyService as soon as you can after the trip. The paper fallback is [D0800](/forms), Claim for Travelling Expenses. DVA’s travel page publishes no time limit for lodging, so lodge promptly and follow any date on a letter. DVA’s funded-services page (updated 15 October 2026) says travel reimbursements lodged in MyService will generally be processed within 14 days, and mail or email within 30 days. In September 2026 the average was 19 days and the median 9 days. DVA does not define MyService status words such as “not complete”. If a claim sits past those times, use the [call sheet](/call-sheet) and the [delays guide](/guides/delays), ask what is missing, and get the answer in writing.",
      },
    ],
  },
];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function guidesByCategory() {
  const map = new Map<string, Guide[]>();
  for (const g of guides) {
    const list = map.get(g.category) ?? [];
    list.push(g);
    map.set(g.category, list);
  }
  return map;
}
