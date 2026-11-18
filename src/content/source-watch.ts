/**
 * Canonical watch-list for the Veteran Assist source-watch bot.
 * Every figure, office-holder, form, and official href this site quotes
 * should be reachable from here. The weekly Grok automation reads this file
 * and the linked sources — it does not invent replacements.
 */

export type WatchKind = "rates" | "wait" | "deadline" | "people" | "form" | "link" | "law";

export type WatchItem = {
  id: string;
  kind: WatchKind;
  /** What to compare on the official page. */
  check: string;
  files: string[];
  href: string;
  /** How often the official page usually moves. The bot still checks weekly. */
  usually: string;
};

export const SOURCE_WATCH_OWNER = "site keeper";
export const SOURCE_WATCH_TZ = "Australia/Melbourne";
export const SOURCE_WATCH_CADENCE = "Every 7 days. Not pinned to a clock time.";

export const sourceWatch: WatchItem[] = [
  {
    id: "mrca-rates",
    kind: "rates",
    check:
      "rates.ts dollar figures and currentFrom/currentTo window vs the live DVA MRCA compensation rates page. Next typical windows: 20 Mar, 1 Jul, 20 Sep, 1 Jan.",
    files: ["src/content/rates.ts"],
    href: "https://www.dva.gov.au/access-benefits/payment-rates/compensation-payment-rates/compensation-payment-rates-for-mrca",
    usually: "Four times a year",
  },
  {
    id: "processing-times",
    kind: "wait",
    check:
      "processing-times.ts streams (onHand, processDays, allocateDays, asAt) vs DVA Conditions and claims processing times. Headline is MRCA initial liability processDays. Also check intake12m and determined12m (DVA’s Intake and Determinations in the last 12 months). The delays and pi-after-liability guides say DVA publishes no time for stages after allocation (for example last assessment to decision) or for expedited claims. Remove that line if DVA starts publishing one. The home page banner (components/wait-banner.tsx) is driven by this file and sums onHand across the four streams.",
    files: [
      "src/content/processing-times.ts",
      "src/components/wait-banner.tsx",
      "src/content/guides.ts",
    ],
    href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/conditions-and-claims-processing-times",
    usually: "Monthly",
  },
  {
    id: "vrb-art-pathway",
    kind: "deadline",
    check:
      "12-month VRB window from receipt still true after 1 July 2026. ART 3 calendar months ≠ 90 days, dual wording. Confirm on DVA single review pathway (3 Jul 2026) and About the VRB (1 Jul 2026).",
    files: ["src/content/deadlines.ts"],
    href: "https://www.dva.gov.au/access-benefits/lodge-an-appeal/single-review-pathway",
    usually: "When the Act or DVA page is rewritten",
  },
  {
    id: "art-veterans",
    kind: "deadline",
    check: "ART veterans’ entitlements clock still 3 months from receipt of the VRB decision.",
    files: ["src/content/deadlines.ts"],
    href: "https://www.dva.gov.au/access-benefits/lodge-an-appeal/administrative-review-tribunal",
    usually: "When the Act or DVA page is rewritten",
  },
  {
    id: "foi-oaic",
    kind: "deadline",
    check:
      "FOI s 15(5) 30 days, s 24AB 14 days (silence = withdrawn), IC review 60 days. Confirm OAIC + FOI Act. DVA FOI guidelines still apply s 24AB.",
    files: ["src/content/deadlines.ts"],
    href: "https://www.oaic.gov.au/freedom-of-information/your-freedom-of-information-rights/freedom-of-information-reviews/information-commissioner-review",
    usually: "Rare",
  },
  {
    id: "srdp-election",
    kind: "deadline",
    check:
      "SRDP written offer still 12 months; choice still irreversible; financial advice still required before payment. Eligibility vs election wording on DVA SRDP page (updated 1 July 2026), including that eligibility alone gives a Veteran Card – All Conditions embossed TPI.",
    files: ["src/content/deadlines.ts", "src/routes/transition.tsx", "src/content/guides.ts"],
    href: "https://www.dva.gov.au/access-benefits/pensions-and-payments/support-when-you-cannot-work/eligibility-for-disability-compensation-payments/special-rate-disability-pension",
    usually: "If DVA rewrites the SRDP page",
  },
  {
    id: "ahrc-46po",
    kind: "deadline",
    check:
      "AHRC Act s 46PO(2) still 60 days from date of issue of the termination notice. Confirm latest compilation on legislation.gov.au.",
    files: ["src/content/deadlines.ts"],
    href: "https://www.legislation.gov.au/C2004A03366/latest/text",
    usually: "When the Act is amended",
  },
  {
    id: "hccc-review",
    kind: "deadline",
    check:
      "NSW HCCC: complainant still has 28 days from receipt of the assessment decision to request a review (HCC Act s 28(9)). Do not confuse with the provider’s separately specified response time during the 60-day assessment.",
    files: ["src/content/deadlines.ts"],
    href: "https://www.hccc.nsw.gov.au/Understanding-Complaints/complaints-process",
    usually: "If HCCC rewrites the complaints-process page or s 28 is amended",
  },
  {
    id: "vets-act",
    kind: "law",
    check:
      "1 July 2026 Veterans’ Entitlements, Treatment and Support Act pages still describe the live scheme. Transition page must match DVA.",
    files: ["src/routes/transition.tsx", "src/content/guides.ts"],
    href: "https://www.dva.gov.au/about-us/inquiries-and-reviews/veterans-legislation-reform",
    usually: "When DVA rewrites the reform pages",
  },
  {
    id: "garp-m",
    kind: "law",
    check: "GARP M 2026 still the in-force impairment guide (F2026L00595).",
    files: ["src/content/resources.ts", "src/routes/calculator.tsx"],
    href: "https://www.legislation.gov.au/F2026L00595/asmade/text",
    usually: "When a new compilation is registered",
  },
  {
    id: "ministers",
    kind: "people",
    check:
      "Matt Keogh still Minister for Veterans’ Affairs. Shadow, Secretary, Commissioners vs DVA structure and directory.gov.au. Do not invent names.",
    files: ["src/content/people.ts"],
    href: "https://www.dva.gov.au/about-us/who-we-are/our-structure",
    usually: "On a reshuffle or Commission appointment",
  },
  {
    id: "dva-minister-home",
    kind: "people",
    check: "minister.dva.gov.au homepage still the minister’s media home.",
    files: ["src/content/people.ts"],
    href: "https://minister.dva.gov.au/homepage",
    usually: "On a reshuffle",
  },
  {
    id: "open-arms",
    kind: "link",
    check: "Open Arms 1800 011 046 still published. Centre-locations page live.",
    files: [
      "src/content/postcode/support.ts",
      "src/content/resources.ts",
      "src/components/layout/crisis-bar.tsx",
    ],
    href: "https://www.openarms.gov.au/",
    usually: "Rare (number is stable)",
  },
  {
    id: "1800respect",
    kind: "link",
    check: "1800 737 732 still published on 1800respect.org.au.",
    files: ["src/content/resources.ts", "src/components/layout/crisis-bar.tsx"],
    href: "https://www.1800respect.org.au/",
    usually: "Rare",
  },
  {
    id: "myservice",
    kind: "link",
    check: "MyService URL still lodges claims.",
    files: ["src/content/resources.ts"],
    href: "https://www.dva.gov.au/myservice",
    usually: "Rare",
  },
  {
    id: "aec",
    kind: "link",
    check:
      "electorate.aec.gov.au still Find my electorate. Sitting members are last-election boundaries.",
    files: ["src/content/postcode/support.ts"],
    href: "https://electorate.aec.gov.au/",
    usually: "After a redistribution or election",
  },
  {
    id: "aph-members",
    kind: "people",
    check:
      "APH Senators and Members directory live. Use it before rewriting house.ts or senate.ts.",
    files: ["src/content/postcode/house.ts", "src/content/postcode/senate.ts"],
    href: "https://www.aph.gov.au/Senators_and_Members",
    usually: "By-elections and casual vacancies",
  },
  {
    id: "atdp",
    kind: "link",
    check: "advocateregister.org.au still the ATDP register.",
    files: ["src/content/postcode/support.ts", "src/content/resources.ts"],
    href: "https://www.advocateregister.org.au/",
    usually: "Rare",
  },
  {
    id: "vrb",
    kind: "link",
    check: "vrb.gov.au live. 1800 550 460 if still published.",
    files: ["src/content/postcode/support.ts", "src/content/resources.ts"],
    href: "https://www.vrb.gov.au/",
    usually: "Rare",
  },
  {
    id: "art",
    kind: "link",
    check: "art.gov.au live (AAT replacement).",
    files: ["src/content/resources.ts"],
    href: "https://www.art.gov.au/",
    usually: "Rare",
  },
  {
    id: "dva-locations",
    kind: "link",
    check: "DVA location finder live. Do not invent VAN street addresses.",
    files: ["src/content/postcode/support.ts"],
    href: "https://www.dva.gov.au/about-us/contact-us/location-finder",
    usually: "When an office moves",
  },
  {
    id: "dva-hubs",
    kind: "link",
    check: "dva.gov.au/vfhubs live.",
    files: ["src/content/postcode/support.ts"],
    href: "https://www.dva.gov.au/vfhubs",
    usually: "When a hub opens",
  },
  {
    id: "foi-webform",
    kind: "form",
    check: "DVA FOI webform (node/22523) still accepts requests.",
    files: ["src/content/forms.ts", "src/content/resources.ts"],
    href: "https://www.dva.gov.au/node/22523",
    usually: "When DVA rebuilds the FOI pages",
  },
  {
    id: "pir-webform",
    kind: "form",
    check: "Personal information request form live.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/personal-information-request-form",
    usually: "When DVA rebuilds the access pages",
  },
  {
    id: "d8601",
    kind: "form",
    check: "D8601 PDF still at this path (or find the successor and update).",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/2023-10/d8601.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "d9319",
    kind: "form",
    check: "D9319 Household Services PDF still at this path.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d9319.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "d1351",
    kind: "form",
    check: "D1351 Attendant Care PDF still at this path.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d1351.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "d2051",
    kind: "form",
    check:
      "D2051 MRCA claim PDF still at this path. DVA says paper is only for people not using an advocate.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/2021-08/d2051.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "d2049",
    kind: "form",
    check: "D2049 Injury or disease details sheet PDF still at this path.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d2049.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "d0503",
    kind: "form",
    check: "D0503 Service Pension Part A PDF still at this path.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d0503.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "d0504",
    kind: "form",
    check: "D0504 Partner or widow Service Pension PDF still at this path.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d0504_0.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "d0507",
    kind: "form",
    check: "D0507 Qualifying service PDF still at this path.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d0507.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "d0307",
    kind: "form",
    check: "D0307 Funeral benefit PDF still at this path.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d0307.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "d2053",
    kind: "form",
    check: "D2053 Dependants of deceased members PDF still at this path.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/2023-01/d2053_0.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "d3057",
    kind: "form",
    check: "D3057 Gold Card application PDF still at this path.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d3057.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "d1360",
    kind: "form",
    check: "D1360 Claim for incapacity PDF still at this path.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d1360.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "d0800",
    kind: "form",
    check: "D0800 Claim for travelling expenses PDF still at this path.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d0800.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "d9325",
    kind: "form",
    check: "D9325 Appointing a third party PDF still at this path.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d9325.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "d9378",
    kind: "form",
    check: "D9378 Partner declaration and consent PDF still at this path.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/dvaforms/d9378.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "ability-to-work",
    kind: "form",
    check: "DVA Medical Certification (Ability to Work) PDF still at this path.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/sites/default/files/2025-02/DVA%20Medical%20Certification%20-%20Ability%20to%20Work.pdf",
    usually: "When DVA republishes the form",
  },
  {
    id: "hhs-page",
    kind: "rates",
    check: "Household services official page still matches rates.hhsWeekly and the HHS guide.",
    files: ["src/content/guides.ts", "src/content/rates.ts"],
    href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/household-services-compensation",
    usually: "With the rates window",
  },
  {
    id: "asp",
    kind: "link",
    check: "Acute Support Package still ‘no form — call 1800 VETERAN’.",
    files: ["src/content/resources.ts"],
    href: "https://www.dva.gov.au/what-we-help-with/get-urgent-support/acute-support-package",
    usually: "If the programme is redesigned",
  },
  {
    id: "rma",
    kind: "link",
    check: "rma.gov.au still hosts Statements of Principles.",
    files: ["src/content/resources.ts"],
    href: "https://www.rma.gov.au/",
    usually: "Rare",
  },
  {
    id: "state-finders",
    kind: "link",
    check:
      "Every stateSupport findMp, findMpAlt, findCouncil, stateVeteransMinister, rsl href in postcode/support.ts still 200 — not 404. Replace only with the official successor. Do not invent state minister names except where an official page still names them (NSW Harris is named from a DVA 2026 media release — reconfirm).",
    files: ["src/content/postcode/support.ts"],
    href: "https://findelectorate.parliament.vic.gov.au/",
    usually: "When a parliament rebuilds its site",
  },
  {
    id: "presumptive",
    kind: "law",
    check:
      "Presumptive liability page and F2026L00740 still describe the live list. Processing-times page still carries the ‘may be determined in less than 2 weeks’ sentence if DVA still publishes it.",
    files: ["src/content/guides.ts", "src/content/processing-times.ts"],
    href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/making-a-claim-for-a-service-related-condition/presumptive-liability",
    usually: "When the Determination is amended",
  },
  {
    id: "allied-health-cap",
    kind: "law",
    check:
      "Minister’s 17 September 2026 statement still stands, or a later official page reinstates a cap. Do not revive a withdrawn cap from Facebook.",
    files: ["src/content/guides.ts"],
    href: "https://minister.dva.gov.au/news-and-media/minister/statement-veteran-allied-health-changes",
    usually: "On a Budget or minister statement",
  },
  {
    id: "incapacity-dcp-offset",
    kind: "rates",
    check:
      "dva.gov.au/incapacity-payments still says VEA DCP and MRCA incapacity can both be paid; only above-general-rate DCP is offset by incapacity.",
    files: ["src/content/guides.ts", "src/routes/transition.tsx"],
    href: "https://www.dva.gov.au/incapacity-payments",
    usually: "If offsetting policy is rewritten",
  },
  {
    id: "mepi",
    kind: "form",
    check: "MEPI webform node/23260 still accepts claims. D1181 still the paper form.",
    files: ["src/content/forms.ts", "src/content/resources.ts"],
    href: "https://www.dva.gov.au/node/23260",
    usually: "When DVA rebuilds the MEPI pages",
  },
  {
    id: "travel-68c",
    kind: "rates",
    check:
      "Private vehicle still 68 cents a kilometre under improved MRCA; 50 km minimum still gone.",
    files: ["src/content/resources.ts", "src/content/glossary.ts", "src/content/guides.ts"],
    href: "https://www.dva.gov.au/what-we-help-with/health-support/claim-travel-expenses-under-the-improved-mrca",
    usually: "When travel rates index",
  },
  {
    id: "myservice-one-condition",
    kind: "link",
    check: "MyService IL how-to still says one condition per claim.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/about-myservice/how-to-apply-for-initial-liability-in-myservice",
    usually: "When MyService is rebuilt",
  },
  {
    id: "pi-five-point",
    kind: "law",
    check:
      "Permanent impairment reform page (updated 29 May 2026) still says a worsening is measured from a GARP M baseline, compensation needs a new MRCA condition or a 5-point worsening, and PI is considered in the needs assessment after liability is accepted or can be claimed at any time in writing. The reform homepage is not this check.",
    files: ["src/routes/transition.tsx", "src/content/guides.ts"],
    href: "https://www.dva.gov.au/about-us/inquiries-and-reviews/veterans-legislation-reform/veterans-legislation-reform-resources/permanent-impairment-compensation",
    usually: "When DVA rewrites the impairment reform page",
  },
  {
    id: "gold-card",
    kind: "law",
    check:
      "Veteran Card – All Conditions page (updated 11 September 2026): MRCA 60 points, SRDP or ADA eligible; VEA 100% general rate; qualifying service and over 70; Service Pension under 70 with 30 MRCA points (or blind, 50% DCP, income/assets); ex-DRCA needs 60 points plus a new MRCA condition or a 5-point increase; RPBS $7.70 an item; replacement card within 4 weeks. Also the Veteran Card page's 2026 reissue note (old cards valid until the new one arrives). Do not move the calculator's Act-read sentence unless this page or the Act changed those thresholds.",
    files: [
      "src/routes/calculator.tsx",
      "src/lib/wpi.ts",
      "src/content/glossary.ts",
      "src/content/guides.ts",
    ],
    href: "https://www.dva.gov.au/access-benefits/veteran-card/veteran-card-all-conditions",
    usually: "If DVA rewrites the Veteran Card page",
  },
  {
    id: "repatriation-commission",
    kind: "people",
    check:
      "Commission page still names Alison Frame, Kahlil Fegan, Annabelle Wilson, Natasha Fox, and Colin Radford in those roles. The structure page often omits them. Do not invent a name.",
    files: ["src/content/people.ts"],
    href: "https://www.dva.gov.au/about-us/who-we-are/the-repatriation-commission",
    usually: "On a Commission appointment",
  },
  {
    id: "allied-health-live",
    kind: "law",
    check:
      "DVA's Budget provider-news page, not the frozen 17 September statement. This is where a reinstated cap or a changed 1 July 2027 fee promise would be written. Do not revive a cap from Facebook. Leave the 17 September event date unless this page, or a newer minister statement, replaces it.",
    files: ["src/content/guides.ts", "src/content/resources.ts"],
    href: "https://www.dva.gov.au/providers/provider-news/2026-27-federal-budget-new-measures-for-health-providers",
    usually: "On a Budget update or a later minister statement",
  },
  {
    id: "abuse-support-page",
    kind: "link",
    check:
      "DVA abuse-support page still sends veterans to the specialised team and does not require a full incident narrative on a general claim.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/what-we-help-with/health-support/injury-or-health-treatments/support-if-you-were-abused",
    usually: "If DVA rewrites the abuse-support page",
  },
  {
    id: "nlhc",
    kind: "link",
    check:
      "NLHC page still says mental-health treatment does not require proving service caused the condition, and still gives 1800 VETERAN or NLHC@dva.gov.au.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/what-we-help-with/your-mental-wellbeing/non-liability-health-care-mental-health-for-veterans",
    usually: "If DVA rewrites non-liability health care",
  },
  {
    id: "attendant-care-cap",
    kind: "rates",
    check:
      "Attendant-care weekly maximum still equals household services (rates.attendantWeekly and rates.hhsWeekly). If this page publishes a different cap, split the two figures. Do not assume they moved together. On 2 November 2026 this page still showed the 2025–26 limit while DVA’s MRCA rates page and household services page showed the 2026–27 figure; the household services guide says so, so update that line once DVA fixes this page.",
    files: ["src/content/rates.ts", "src/content/guides.ts"],
    href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/attendant-care",
    usually: "With the rates window",
  },
  {
    id: "presumptive-instrument",
    kind: "law",
    check:
      "F2026L00740 is still the in-force presumptive list, or record a later compilation. Do not update the condition list from DVA's summary page alone. Latest compilation on 15 November 2026: C01 (F2026C00964), 26 September 2026, incorporating F2026L01302, which only changed 'redress or repatriation scheme' to 'redress or reparation scheme' in section 9.",
    files: ["src/content/guides.ts"],
    href: "https://www.legislation.gov.au/F2026L00740/latest/text",
    usually: "When a new determination is registered",
  },
  {
    id: "incapacity-how-to-claim",
    kind: "form",
    check:
      "Stop-work steps in the incapacity guide: MRCA-only for new incapacity claims from 1 July 2026, MyService path (Apply now > Incapacity payments), form D1360, what the medical certificate must show, documents list, one active claim at a time, interim incapacity payments. DVA still publishes no processing time for incapacity claims (check the processing-times page too).",
    files: ["src/content/guides.ts", "src/content/glossary.ts"],
    href: "https://www.dva.gov.au/access-benefits/pensions-and-payments/support-when-you-cannot-work/what-are-incapacity-payments-and-how-to-get-them",
    usually: "A few times a year",
  },
  {
    id: "veteran-payment",
    kind: "law",
    check:
      "Veteran Payment: interim payment during an MRCA mental health liability claim; cannot work more than 8 hours a week; income and assets tested; stops 42 days after the claim is decided; not payable with incapacity payments, DSP or JobSeeker.",
    files: ["src/content/guides.ts", "src/content/glossary.ts"],
    href: "https://www.dva.gov.au/access-benefits/pensions-and-payments/support-when-you-cannot-work/veteran-payment",
    usually: "A few times a year",
  },
  {
    id: "ato-gst-car-veterans",
    kind: "law",
    check:
      "GST-free car for disabled veterans: lost a leg or both arms / permanent loss of use / TPI / SRDP or eligible; 2 years or 40,000 km intended use; not for joint purchases or full novation leases; car limit; no luxury car tax exemption. Also the DVA page's proof requirement (Veteran Card – All Conditions with TPI endorsed, or a DVA letter) and the ATO phone number it lists (13 28 66 on 24 October 2026). Check the declaration form link (ato.gov.au/forms-and-instructions/gst-free-car-disabled-veterans) still opens.",
    files: ["src/content/guides.ts"],
    href: "https://www.ato.gov.au/people-with-disability/tax-concessions-on-cars-for-people-with-disability",
    usually: "Yearly",
  },
  {
    id: "nsw-rego-concession",
    kind: "law",
    check:
      "NSW registration concession eligibility for DVA clients: Gold Card endorsed TPI / EDA / War Widow; DCP 70%+; Intermediate or EDA pension; ADA; 50+ MRCA impairment points; one vehicle; NSW resident. Transfer fee and stamp duty waived only for DCP 70%+, Intermediate/TPI/EDA pension, ADA, 50+ MRCA points (not war widows). Phone 13 22 13.",
    files: ["src/content/guides.ts"],
    href: "https://www.nsw.gov.au/driving-boating-and-transport/vehicle-registration/renewing-vehicle-registration/pensioner-concessions-and-renewals",
    usually: "Yearly",
  },
  {
    id: "nsw-veterans-concessions",
    kind: "law",
    check:
      "Service NSW veterans guide still lists the Gold Opal card, Low Income Household Rebate, Gas Rebate and E-toll concession for DVA Veteran Gold Card holders; Service NSW 13 77 88. Transport for NSW DVA Gold Card page: senior/pensioner fares.",
    files: ["src/content/guides.ts"],
    href: "https://www.service.nsw.gov.au/guide/veterans",
    usually: "Yearly, often 1 July",
  },
  {
    id: "vic-veterans-concessions",
    kind: "law",
    check:
      "vic.gov.au veterans concessions (updated 26 October 2026): rego concession for Gold Card holders not marked dependant (and War Widow/Widower); energy and water concessions for all Gold Card holders; municipal rates TPI/War Widow(er)/EDA/POW; fire services levy TPI/War Widow(er); TPI/EDA myki pass; Veterans Card – Victoria $100 off one rego. VicRoads concession holder discounts page: one personal vehicle for private use, apply in myVicRoads 5 days before due. The 13 11 71 number is on the vic.gov.au page, not the VicRoads page. If the page date changes, re-read every line.",
    files: ["src/content/guides.ts"],
    href: "https://www.vic.gov.au/concessions-veterans",
    usually: "Yearly, often 1 July",
  },
  {
    id: "qld-veterans-concessions",
    kind: "law",
    check:
      "Qld veterans concessions page (updated 6 November 2025): Q prefix; energy rebates for Gold Card holders; rates subsidy 20% up to $200; SEQ water subsidy up to $120; EM Levy 20%; free Translink travel for TPI/EDA with a Veteran Travel Card. Qld registration concession page (dated 20 December 2023): VEA 70% incapacity or MRCA 50+ points; 1 vehicle and 1 boat; form F3937; TPI/EDA Gold Card alone, otherwise a DVA letter.",
    files: ["src/content/guides.ts"],
    href: "https://www.qld.gov.au/community/getting-support-health-social-issue/veterans/financial-and-legal-support/concessions",
    usually: "Yearly, often 1 July",
  },
  {
    id: "dva-discounts-concessions",
    kind: "law",
    check:
      "DVA discounts and concessions page (updated 20 January 2026): proof by card, Services Australia confirmation or a DVA letter (some in MyService); VFN state prefix and moving interstate; the eight state and territory links used in the Gold Card guide.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/what-we-help-with/discounts-and-concessions",
    usually: "Yearly",
  },
  {
    id: "dva-mvcs",
    kind: "law",
    check:
      "Motor Vehicle Compensation Scheme page (updated 24 September 2026): modifications for an accepted condition limiting safe driving; claim via compensation form Part G; driver-trained OT; Vehicle Assistance Scheme closed to new claims.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/what-we-help-with/vehicle-costs-and-benefits/motor-vehicle-compensation-scheme",
    usually: "Rarely",
  },
  {
    id: "ada",
    kind: "law",
    check:
      "ADA page (updated 1 July 2026): age pension age; 70+ impairment points and lifestyle 6+ under GARP M; not on MRCA incapacity payments; not on SRDP or VEA EDA/TPI/TTI/INT; DVA-initiated or by request to ADApayments@dva.gov.au; card embossed EDA.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/access-benefits/pensions-and-payments/support-when-you-cannot-work/additional-disablement-amount-ada",
    usually: "If DVA rewrites the ADA page",
  },
  {
    id: "drca-gold-card",
    kind: "law",
    check:
      "DRCA veterans page (updated 11 June 2026): Gold Card at 60 points needs an MRCA initial liability claim accepted or a 5-point worsening since the previous assessment; SRDP tests (MRCA incapacity payments, 50+ points, under 10 hours' work, rehabilitation unlikely to help). Legislation reform Veteran Card page (updated 2 February 2026): no change for existing VEA Gold Card holders; MRCA eligibility unchanged.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/about-us/inquiries-and-reviews/veterans-legislation-reform/veterans-legislation-reform-resources/drca-veterans",
    usually: "If DVA rewrites the reform pages",
  },
  {
    id: "representative",
    kind: "law",
    check:
      "What is a representative (updated 16 January 2024): four levels (enquire, act, act – health, receive payment); more than one may enquire, only one may act or receive payments; both sign D9325; representative should be over 18, may need proof of identity; act duties (best interests, changes within 14 days, answer notices or overpayment); evidence when the client cannot manage their affairs (EPOA, guardianship or administration order, medical letter). MyService representation how-to (updated 4 December 2025): signed D9325 must be uploaded; Represent me / I represent; Select client. D9325 PDF: post to GPO Box 9998 Brisbane QLD 4001 or a VAN office; receive-payments account warning. D9378 form page. What to consider if you're looking for help (updated 27 August 2024): fees do not guarantee results or faster processing.",
    files: [
      "src/content/guides.ts",
      "src/content/pathfinder.ts",
      "src/content/forms.ts",
      "src/routes/forms.tsx",
    ],
    href: "https://www.dva.gov.au/what-we-help-with/advocacy-representation-advice/what-is-a-representative",
    usually: "Rarely",
  },
  {
    id: "dva-contact",
    kind: "link",
    check:
      "DVA Contact us page (updated 5 February 2026): 1800 VETERAN (1800 838 372), 8am to 5pm local time Monday to Friday; international +61 2 6289 1133; TIS 131 450; National Relay Service then 1800 838 372. Used on the call sheet, Contacts and the home page.",
    files: [
      "src/routes/call-sheet.tsx",
      "scripts/make-call-sheet-pdf.py",
      "src/content/resources.ts",
      "src/routes/index.tsx",
    ],
    href: "https://www.dva.gov.au/about-us/contact-us",
    usually: "Rarely",
  },
  {
    id: "dva-feedback-form",
    kind: "link",
    check:
      "DVA feedback and complaints page still resolves and is still where the delays and Ombudsman guides send people.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/about-us/contact-us/feedback-form/feedback",
    usually: "Rarely",
  },
  {
    id: "ombudsman-home",
    kind: "link",
    check:
      "Commonwealth Ombudsman site still resolves and its complaints route is still where the delays and Ombudsman guides say.",
    files: ["src/content/guides.ts"],
    href: "https://www.ombudsman.gov.au/",
    usually: "Rarely",
  },
  {
    id: "cdda-scheme",
    kind: "law",
    check:
      "Finance CDDA scheme page and RMG 409 still describe the scheme the cdda guide explains (who can claim, how, and the discretionary nature).",
    files: ["src/content/guides.ts"],
    href: "https://www.finance.gov.au/individuals/act-grace-payments-waiver-debts-commonwealth-compensation-detriment-caused-defective-administration-cdda/scheme-compensation-detriment-caused-defective-administration-cdda-scheme",
    usually: "Rarely",
  },
  {
    id: "dda-1992",
    kind: "law",
    check:
      "Disability Discrimination Act 1992 latest compilation still supports what the contact-restrictions guide says about reasonable adjustments.",
    files: ["src/content/guides.ts"],
    href: "https://www.legislation.gov.au/C2004A04426/latest/text",
    usually: "When the Act is amended",
  },
  {
    id: "foi-requests-page",
    kind: "rates",
    check:
      "DVA FOI requests page (updated 1 October 2025 when last read): processing charges (search and retrieval $15/hour; decision-making free for 5 hours then $20/hour; photocopying 10c/page), the deposit rule, and the 14-day acknowledgement and 30-day decision times quoted in the foi guide.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/what-we-help-with/accessing-information/freedom-of-information/freedom-of-information-requests",
    usually: "Rarely",
  },
  {
    id: "pi-after-liability",
    kind: "wait",
    check:
      "MRCA PI still 146 days to allocate, 171 days to process (47 external, 123 with DVA), outstanding age 185 days; DRCA PI on-hand age 269 days. As-at date on the conditions page. Do not revive an older snapshot table.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/conditions-and-claims-processing-times",
    usually: "Monthly",
  },
  {
    id: "tinnitus-pilot",
    kind: "link",
    check:
      "Pilot still April 2026, under 60, undetermined MRCA PI tinnitus, letter refers to Hearing Australia, book on the number in the letter. FAQ must not be quoted as publishing 1300 489 470.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/sites/default/files/2026-08/Frequently-Asked-Questions-Improved-Acces-to-Treatment-for-Tinnitus-Pilot.pdf",
    usually: "If DVA rewrites the pilot",
  },
  {
    id: "tinnitus-pilot-news",
    kind: "link",
    check:
      "10 March 2026 news still ties the pilot to MRCA s 73 reasonable rehabilitative treatment.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/news/latest-stories/improving-access-to-early-assessment-and-treatment-for-tinnitus",
    usually: "If DVA rewrites the pilot",
  },
  {
    id: "hearing-services",
    kind: "link",
    check:
      "Tinnitus program still All Conditions, or Specific Conditions with tinnitus accepted. GP refers. Provider needs approval before treatment.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/what-we-help-with/health-support/hearing-services",
    usually: "A few times a year",
  },
  {
    id: "prior-approval",
    kind: "link",
    check:
      "Approvals page still says each time, endeavour to respond within 28 days, health.approval@dva.gov.au, and still names D1328, D0986, D9398 and D9292.",
    files: ["src/content/guides.ts", "src/content/forms.ts"],
    href: "https://www.dva.gov.au/providers/fees-claims/approvals-for-providers",
    usually: "A few times a year",
  },
  {
    id: "d1328",
    kind: "form",
    check: "D1328 treatment prior approval form page still live.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/node/12054",
    usually: "When DVA rebuilds forms",
  },
  {
    id: "d0986",
    kind: "form",
    check: "D0986 dental prior approval form page still live.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/node/12057",
    usually: "When DVA rebuilds forms",
  },
  {
    id: "d9398",
    kind: "form",
    check: "D9398 audiology prior approval form page still live.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/node/20294",
    usually: "When DVA rebuilds forms",
  },
  {
    id: "d9292",
    kind: "form",
    check: "D9292 imaging prior approval form page still live.",
    files: ["src/content/forms.ts"],
    href: "https://www.dva.gov.au/node/13153",
    usually: "When DVA rebuilds forms",
  },
  {
    id: "mepi-page",
    kind: "link",
    check:
      "MEPI page still says check the provider accepts the card, no repeat reimbursement for providers who refuse the card except exceptional circumstances, webform plus D1181, in-time versus out-of-time (out-of-time only in exceptional circumstances), and claim-linked costs go to the Initial Liability Claims Delegate.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/what-we-help-with/health-support/help-to-cover-healthcare-costs/medical-expenses-privately-incurred-mepi",
    usually: "A few times a year",
  },
  {
    id: "health-services-funded",
    kind: "link",
    check:
      "Health services page still lists acupuncture by Medicare-registered GPs as funded where clinically required, and still says DVA does not fund alternative therapies (naturopathy, iridology, homeopathy).",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/what-we-help-with/health-support/health-services-for-the-veteran-community",
    usually: "A few times a year",
  },
  {
    id: "white-card",
    kind: "link",
    check: "Veteran Card – Specific Conditions page still limits cover to accepted conditions.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/access-benefits/veteran-card/veteran-card-specific-conditions",
    usually: "If DVA rewrites the card pages",
  },
  {
    id: "medicinal-cannabis",
    kind: "link",
    check:
      "treatment-on-your-card 'Medicinal cannabis': funding via the RPBS only, case by case, the listed conditions (chronic pain, CINV, palliative care, wasting, spasticity, refractory paediatric epilepsy), reimbursement on D1181 to pharmacy.reimbursement@dva.gov.au plus D9546 for a non-RPBS product, and that DVA cannot name prescribers. Page updated 1 September 2026. No product names on this site.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/what-we-help-with/health-support/help-to-cover-healthcare-costs/manage-medicine-and-keep-costs-down/medicinal-cannabis",
    usually: "When the framework changes",
  },
  {
    id: "travel-page",
    kind: "rates",
    check:
      "Improved MRCA travel page: 68c/km, accommodation and meal rates from 1 July 2026, PWATA, attendant, air may need prior approval, no published car-hire rule, no published lodgement time limit.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/what-we-help-with/health-support/claim-travel-expenses-under-the-improved-mrca",
    usually: "When travel rates index",
  },
  {
    id: "travel-closest",
    kind: "link",
    check:
      "30 September 2026 notice still says use the closest appropriate provider and email transport.claims@dva.gov.au before a long trip. Treatment approval is not travel approval.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/news/latest-stories/choose-the-closest-appropriate-healthcare-provider-when-you-travel-for-treatment",
    usually: "If DVA rewrites the travel notices",
  },
  {
    id: "travel-july-2026",
    kind: "law",
    check:
      "2 June 2026 notice still says the 50 km minimum ended for MRCA/DRCA private vehicle from 1 July 2026.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/news/latest-stories/claiming-travel-reimbursements-from-1-july-2026",
    usually: "Rarely",
  },
  {
    id: "travel-processing",
    kind: "wait",
    check:
      "Funded-services page: MyService travel claims generally 14 days, mail or email generally 30 days. Do not invent a meaning for a MyService status word. Also the MEPI table (14-day commitment for webform claims with full documents; September 2026 webform average 12 days, all-claims median 52 and average 75) and the prior-approval table (September 2026 median 12 days, average 58).",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/about-us/what-we-do/overview-of-dva-benefits-and-services/processing-times-for-access-to-dva-funded-services",
    usually: "Monthly",
  },
  {
    id: "what-is-an-advocate",
    kind: "link",
    check:
      "Advocacy Register lists ESOs, not individual advocates. ATDP training only for ESOs that do not charge a fee; incidental costs may be asked.",
    files: ["src/content/guides.ts"],
    href: "https://www.dva.gov.au/what-we-help-with/advocacy-representation-advice/what-is-an-advocate",
    usually: "A few times a year",
  },
  {
    id: "veteran-health-check",
    kind: "link",
    check:
      "glossary.ts 'Veteran Health Check': one-off eligibility (served at least one day, any time after leaving, not required to be a DVA client), annual check (left on or after 1 July 2019, Veteran Card, up to five years) and the former name. The provider pages were last updated 29 January 2024 and 16 November 2021, so look for a newer public-facing DVA page. Check whether DVA says if the result goes to DVA.",
    files: ["src/content/glossary.ts", "src/content/search.ts"],
    href: "https://www.dva.gov.au/providers/programs-services-information-for-providers/veterans-health-check-for-providers",
    usually: "Rarely",
  },
  {
    id: "education-scheme",
    kind: "link",
    check:
      "glossary.ts 'Education Scheme (MRCAETS)': one scheme from 1 July 2026 (VCES folded into MRCAETS), the contact number and email, and the student claim route. DVA page updated 29 September 2026.",
    files: ["src/content/glossary.ts", "src/content/search.ts"],
    href: "https://www.dva.gov.au/what-we-help-with/education-and-employment/support-for-students/education-scheme",
    usually: "A few times a year",
  },
  {
    id: "rpbs-medicines",
    kind: "link",
    check:
      "treatment-on-your-card 'Other medicines': White Card covers scripts for a covered condition, some items and anything not on the PBS or RPBS schedules need DVA approval, provider line 1800 552 580. The page was last updated 1 January 2024. Check whether DVA has published anything on weight-loss medicines.",
    files: ["src/content/guides.ts", "src/content/search.ts"],
    href: "https://www.dva.gov.au/what-we-help-with/health-support/help-to-cover-healthcare-costs/manage-medicine-and-keep-costs-down/concessional-medicines-under-the-rpbs",
    usually: "Rarely",
  },
  {
    id: "dcp-offsetting",
    kind: "law",
    check:
      "incapacity-offsets 'Other compensation and a VEA Disability Compensation Payment': same-incapacity test (effects, not names), periodic dollar-for-dollar, lump sum converted with actuarial tables, DRCA PI lump sum against above-general-rate DCP for claims lodged 1 July 2004 to before 1 July 2026. Page updated 1 July 2026 and describes the pre-1 July 2026 rules.",
    files: ["src/content/guides.ts", "src/content/search.ts"],
    href: "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/what-to-know-about-multiple-claims/disability-compensation-payment-and-compensation-offsetting",
    usually: "A few times a year",
  },
  {
    id: "csc-retro-invalidity",
    kind: "wait",
    check:
      "CSC, not DVA, decides retrospective invalidity. Member guide still publishes no fixed number of days.",
    files: ["src/content/guides.ts"],
    href: "https://www.csc.gov.au/members/manage-super/Sickness-and-injury/ADF-medical-transition/Member-guide",
    usually: "A few times a year",
  },
];

export const SOURCE_WATCH_RULES = [
  "Content policy: explain what stays stable (how a process works, what to do first, what a term means) and link the official page for it. A figure that changes (a rate, a wait time, a phone line or hours, a deadline) must carry an as-at date or be replaced by a link and one line. If a figure does not help the reader decide anything, drop it.",
  "Every new guide with outside facts needs an official https link in officialLinks that is also listed in this file, or scripts/freshness.test.mjs fails. A guide not re-checked for 60 days shows a 'Not checked recently' notice to readers.",
  "Official DVA / AEC / APH / parliament / legislation.gov.au page wins. This site yields.",
  "Do not invent rates, wait times, street addresses, emails, or office-holder names.",
  "Do not lodge. Do not give legal advice. Do not waive Australian Consumer Law. Do not rewrite a guide's sentences. Change a number, a date, a URL, or a name only when the official page states it.",
  "A 404 is a defect. Find the official replacement or flag it in the source-watch report — do not drop the link silently.",
  "A timeout or a 403 is not a 404 and not a change. Leave that page's lastChecked. Open the page and read the figure. A homepage that loads is not a check of a dollar amount.",
  "Update a page's own lastChecked only after you have opened its official source and the figure still matches, or you have corrected it. Do not stamp the whole site with one date.",
  "publishedOn, asAt, and pageUpdated are the official page's dates. Do not replace them with the day you checked.",
  "An event date is not a check date. Keep phrases such as 'taken off the table on 17 September 2026' and 'DVA how-to, 18 September 2026' unless that official page now shows a different date.",
  "If the official figure still matches, move lastChecked only. Do not reword the sentence.",
  "The glossary and the impairment calculator are split. Do not move the glossary disclaimer, or the calculator sentence that says the Act paths were last read on an earlier date, unless you re-read those words against the Act.",
  "Do not move the delays guide, the contact-restrictions guide, or POSTCODE_LAST_CHECKED unless you opened that page's own source: the DVA feedback form, the Disability Discrimination Act, or the sitting-member roll.",
  "Do not wholesale rewrite house.ts or senate.ts because a third-party scrape looks different. Change a sitting member only when APH or a by-election result confirms it.",
  "Do not add a personal name. The project stays anonymous.",
  "If any page you opened prints a different 1800 VETERAN (1800 838 372) or Open Arms (1800 011 046) number, update every copy of that number. Do not change a number because a page failed to load.",
  "If nothing moved, say so in one short report and do not open an empty pull request. If something moved, change the files, run the tests, open a pull request to main, and list every edit. Do not force-push.",
] as const;
