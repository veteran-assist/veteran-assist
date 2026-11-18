import type { GlossaryEntry } from "./types";

export const glossary: GlossaryEntry[] = [
  {
    term: "Accepted condition",
    definition:
      "An injury or disease DVA has accepted as related to service. Most later payments hang off this.",
    see: ["lodge-a-claim"],
  },
  {
    term: "ART",
    aka: ["Administrative Review Tribunal"],
    definition:
      "Replaced the AAT in October 2024. Second-tier merits review after the VRB for most veterans’ compensation decisions. Two official wordings: ART.gov.au counts 3 calendar months from when you receive the VRB decision; DVA’s single-review page says from a VRB decision. If those dates differ, the Deadlines tool shows both. Three calendar months, not 90 days. Count it on the Deadlines tool.",
    see: ["appeals-vrb-art"],
  },
  {
    term: "ASP",
    aka: ["Acute Support Package"],
    definition:
      "Short-term DVA-funded services (not cash) when a veteran or related person is in crisis because of new and challenging circumstances. Phone request — no form. New requests from 1 July 2026 are under the MRCA.",
    see: ["hardship-asp"],
  },
  {
    term: "ATDP",
    aka: ["Advocacy Training and Development Program"],
    definition:
      "The training and accreditation system for ESO compensation and wellbeing advocates. Find one on the Advocacy Register.",
    see: ["advocates"],
  },
  {
    term: "CDDA",
    aka: ["RMG 409"],
    definition:
      "Scheme for Compensation for Detriment caused by Defective Administration. Discretionary payment when agency administration was defective and caused loss, even though there is no legal liability.",
    see: ["cdda"],
  },
  {
    term: "CSC / MSBS",
    definition:
      "Commonwealth Superannuation Corporation / Military Superannuation and Benefits Scheme. Invalidity pensions from here are often offset against DVA incapacity.",
    see: ["incapacity-offsets"],
  },
  {
    term: "DRCA",
    aka: ["Safety, Rehabilitation and Compensation (Defence-related Claims) Act 1988"],
    definition:
      "Closed to new rehabilitation and compensation claims from 1 July 2026. Existing payments continue. Worsening PI after that date is generally assessed under MRCA/GARP M.",
    see: ["vets-act-2026"],
  },
  {
    term: "Douglas",
    aka: ["Douglas v FCT [2020] FCAFC 220"],
    definition:
      "Full Federal Court tax case treating certain MSBS invalidity benefits as lump sums for tax. DVA’s position is that it does not rewrite compensation offsets. Arguable, not settled, as an offset theory.",
    see: ["incapacity-offsets"],
  },
  { term: "DVA", definition: "Department of Veterans’ Affairs. Independent of this site." },
  {
    term: "Expedition",
    definition:
      "A request that a claim be actioned ahead of the ordinary queue because of urgency (hardship, clinical risk). A flag without action is still a delay.",
    see: ["delays"],
  },
  {
    term: "FOI",
    aka: ["Freedom of Information"],
    definition:
      "Legal right under the FOI Act 1982 to documents an agency holds. Use it for your claim file, call recordings, and the papers behind a SPOC. 14 days to acknowledge, 30 days to decide (extensions happen). Your own personal information is not charged. A practical refusal notice (s 24AB) gives 14 days after the day you are given it — silence is treated as withdrawal of the whole request. Review: internal review, then OAIC.",
    see: ["foi"],
  },
  {
    term: "PIR",
    aka: ["Personal Information Request"],
    definition:
      "DVA’s administrative path to your own personal information — often faster than FOI, no charge, aim 30 days. No OAIC review. If the release is thin, lodge FOI for the same documents.",
    see: ["foi"],
  },
  {
    term: "D8601",
    aka: ["Information Access Application"],
    definition:
      "DVA paper form for FOI or personal information requests if you are not using the webforms. Email or post to Information.Access@dva.gov.au with proof of identity.",
    see: ["foi"],
  },
  {
    term: "GARP M",
    aka: ["Guide to Determining Impairment and Compensation 2026"],
    definition:
      "The single impairment assessment tool from 1 July 2026. Chapter 26 is a Baseline Impairment Rating of impairment already compensated. Chapter 25 Step 2 requires an increase of at least five impairment points above that baseline before further MRCA PI is payable. Conversion of old VEA/DRCA ratings is in those chapters. Do not accept a baseline from anyone but DVA.",
    see: ["permanent-impairment", "vets-act-2026"],
  },
  {
    term: "Gold Card / White Card",
    aka: ["Veteran Card", "Veteran Card – All Conditions", "Veteran Card – Specific Conditions"],
    definition:
      "DVA treatment cards, now officially called Veteran Cards. The White Card (Veteran Card – Specific Conditions) covers accepted conditions, and can cover mental health treatment. The Gold Card (Veteran Card – All Conditions) covers all conditions. Under the MRCA it usually comes from 60 combined impairment points (s 281), or eligibility for SRDP or the Additional Disablement Amount. Under the VEA it comes from a 100% disability pension, or qualifying service and age 70. A veteran under 70 on a Service Pension can also get it with 30 MRCA points. Someone covered by the DRCA before 1 July 2026 needs 60 points and either a new MRCA condition or a 5-point worsening. Confirm on the live DVA Veteran Card page. Car, rego and other concessions are set by the ATO and each state. Some take any Gold Card; others need it printed TPI, EDA or War Widow(er), or a DVA letter showing your points.",
    see: ["gold-card-concessions", "permanent-impairment"],
  },
  {
    term: "Household services (HHS)",
    aka: ["D9319"],
    definition:
      "Compensation for routine domestic tasks (cleaning, laundry, meals, shopping, some garden work) you can no longer manage because of accepted conditions. Form D9319 to hhs@dva.gov.au. New claims from 1 July 2026 are under MRCA, including for VEA-accepted conditions. Different from Veterans’ Home Care.",
    see: ["household-services"],
  },
  {
    term: "Attendant care",
    aka: ["D1351"],
    definition:
      "Compensation for regular personal care you can no longer do — bathing, toileting, grooming, dressing, feeding. Not nursing. Form D1351 (doctor completes part) to hhs@dva.gov.au. Separate weekly cap from household services.",
    see: ["household-services"],
  },
  {
    term: "VHC",
    aka: ["Veterans’ Home Care"],
    definition:
      "Domestic assistance, home and garden maintenance, personal care, and respite for Gold or White Card holders with functional limitation. Call 1300 550 450. Not the same as household services compensation. Approving HHS generally stops VHC domestic/garden; approving attendant care generally stops VHC personal care.",
    see: ["household-services"],
  },
  {
    term: "Incapacity payments",
    definition:
      "Wage replacement while accepted conditions stop you working. Different from PI. From 1 July 2026 VEA general-rate DCP and MRCA incapacity can both be paid; only above-general-rate DCP is reduced by incapacity. CSC / MSBS invalidity pensions are a different offset and often still collapse the weekly rate. Only paid for accepted conditions; claim in MyService or on D1360 with a medical certificate and payslips.",
    see: ["incapacity-offsets"],
  },
  {
    term: "Liability",
    definition:
      "The decision that a condition is service-related. The gate for almost everything else.",
    see: ["lodge-a-claim"],
  },
  {
    term: "MRCA",
    aka: ["Military Rehabilitation and Compensation Act 2004"],
    definition:
      "The Act that now covers new claims from 1 July 2026, in an “improved” form under the VETS Act.",
    see: ["vets-act-2026"],
  },
  {
    term: "MyService",
    definition:
      "DVA’s online portal for lodging and tracking claims. Initial liability in MyService is one condition per claim (DVA how-to, 18 September 2026). Accepted conditions for your Veteran Card are listed there — White Card holders can show that list to a GP.",
  },
  {
    term: "NEL",
    aka: ["Non-economic loss"],
    definition:
      "The pain, suffering, and loss-of-amenities part of some PI assessments. Delegates sometimes rewrite these scores — get the basis in writing.",
    see: ["medical-evidence"],
  },
  {
    term: "NLHC",
    aka: ["Non-Liability Health Care"],
    definition:
      "DVA-paid treatment for any mental health condition without having to prove service caused it. Usually available after one day of full-time ADF service. Not a compensation claim. Call 1800 VETERAN or NLHC@dva.gov.au.",
    see: ["abuse-support"],
  },
  {
    term: "OAIC",
    definition:
      "Office of the Australian Information Commissioner. IC review of FOI decisions (no fee). Published windows: 60 days from written notice of an access refusal or charge decision, 30 days if you object to access being given to someone else — check the letter.",
    see: ["foi"],
  },
  {
    term: "Open Arms",
    definition: "Free 24/7 veterans and families counselling. 1800 011 046. Not a claims advocate.",
  },
  {
    term: "PI",
    aka: ["Permanent impairment"],
    definition:
      "Tax-free payment for permanent non-economic loss from accepted conditions. GARP M from 1 July 2026. Periodic, lump, or mix under MRCA.",
    see: ["permanent-impairment", "pi-after-liability"],
  },
  {
    term: "SoP",
    aka: ["Statement of Principles"],
    definition:
      "RMA instruments listing factors that connect a condition to service. Match your facts to a factor — unless presumptive liability applies.",
    see: ["lodge-a-claim", "presumptive-liability"],
  },
  {
    term: "Presumptive liability",
    definition:
      "From 1 July 2026, DVA can accept listed conditions as service-related without proving a SoP factor, if you lodge after that date with a confirmed diagnosis and meet the service/onset tests. Not automatic, not for pre-1 July claims. DVA says an eligible claim may be determined in less than two weeks. Confirm on DVA’s presumptive-liability page and Determination F2026L00740.",
    see: ["presumptive-liability", "lodge-a-claim"],
  },
  {
    term: "MEPI",
    aka: ["Medical Expenses Privately Incurred", "D1181"],
    definition:
      "Reimbursement of out-of-pocket treatment, listed on the MBS, DVA fee schedules, RPBS or RAP, if you hold a Veteran Card. Lodge the MEPI webform (fastest) or paper D1181. Receipts, not quotes. Unsolicited medical assessments without a DVA TRN are not MEPI.",
    see: ["allied-health", "treatment-on-your-card"],
  },
  {
    term: "Treatment cycle",
    definition:
      "The current GP-referral loop for a block of allied-health visits on a Veteran Card. The 2026 Budget proposed replacing it as part of a $5,000 yearly cap package. On 17 September 2026 the Minister took the cap off the table and did not say the cycle has already been abolished. Until DVA publishes a replacement, assume you still need the referral your provider asks for.",
    see: ["allied-health"],
  },
  {
    term: "Travel for treatment",
    definition:
      "From 1 July 2026, travel for Veteran Card treatment is assessed under the improved MRCA. The rules, the 68 cent kilometre rate, flights and accommodation are on the travel guide.",
    see: ["travel-for-treatment"],
  },
  {
    term: "SPOC",
    aka: ["Single point of contact"],
    definition:
      "A restricted communication arrangement. Ask for the documents, reasonable adjustments, and an advocate in the channel.",
    see: ["contact-restrictions"],
  },
  {
    term: "SRDP",
    aka: ["Special Rate Disability Pension"],
    definition:
      "Periodic MRCA payment for severe ongoing incapacity meeting statutory tests (including 50+ MRCA impairment points and a work test). Eligibility and election are not the same: DVA says once you are eligible, even if you decline the payment, you get a Veteran Card — All Conditions embossed TPI, high-rate MRCA Supplement, and MRCAETS for dependent children. Election is 12 months from the written offer and irreversible. Run the numbers against PI and incapacity before you choose.",
    see: ["permanent-impairment"],
  },
  {
    term: "VEA",
    aka: ["Veterans’ Entitlements Act 1986"],
    definition:
      "Closed to new rehabilitation and compensation claims from 1 July 2026. Existing Disability Compensation Payments continue.",
    see: ["vets-act-2026"],
  },
  {
    term: "Veteran Health Check",
    aka: [
      "One-off Veterans’ Health Check",
      "Annual Veterans’ Health Check",
      "ADF Post-discharge GP Health Assessment",
    ],
    definition:
      "A GP health assessment for former ADF members. DVA’s provider pages say the one-off check is open to anyone who served at least one day, at any time after leaving, and they do not need to be a DVA client. It was formerly called the ADF Post-discharge GP Health Assessment. An annual check, once a year for up to five years, is for people who left on or after 1 July 2019 and hold a Veteran Card. DVA’s provider pages (updated 29 January 2024 and 16 November 2021) do not say whether the result is sent to DVA. Ask your GP, or DVA on 1800 838 372.",
  },
  {
    term: "Education Scheme (MRCAETS)",
    aka: ["MRCAETS", "VCES", "Veterans’ Children Education Scheme"],
    definition:
      "DVA support for eligible children in full-time education or training. DVA’s Education Scheme page (updated 29 September 2026) says that from 1 July 2026 there is one scheme, the MRCAETS, and that the VCES was folded into it, with children already in the VCES moved across automatically. Who qualifies depends on the veteran’s rate or impairment points, and DVA lists the pathways on that page. Claims go through MyService or DVA’s student claim forms. Contact: 1800 838 372 or educationschemes@dva.gov.au.",
  },
  {
    term: "Veteran Payment",
    definition:
      "An interim, income- and assets-tested payment while DVA assesses an MRCA liability claim for a mental health condition, if you cannot work more than 8 hours a week. Apply after you lodge the liability claim. It stops 42 days after the claim is decided and cannot be paid at the same time as incapacity payments, the Disability Support Pension or JobSeeker (DVA, updated 15 October 2026).",
    see: ["incapacity-offsets", "hardship-asp"],
  },
  {
    term: "VETS Act",
    definition:
      "Veterans’ Entitlements, Treatment and Support (Simplification and Harmonisation) legislation that took effect 1 July 2026: one Act for new claims, GARP M, grandfathered payments. See What changed in the top menu for the traps.",
    see: ["vets-act-2026"],
  },
  {
    term: "Redemption",
    aka: ["commutation", "lump sum incapacity"],
    definition: `Converting ongoing MRCA incapacity payments into a single lump sum. Only available if weekly entitlement is below a ceiling. DVA’s MRCA rates page (20 September 2026 – 31 December 2026) lists the lump sum redemption level as $287.94 gross per week — check the live figure. A DRCA redemption is not one of the three SRDP incapacity tests.`,
    see: ["incapacity-offsets"],
  },
  {
    term: "Baseline impairment rating",
    aka: ["Chapter 26"],
    definition:
      "Under GARP M 2026, a number representing impairment already compensated. Chapter 25 Step 2 requires at least five impairment points above this baseline before further MRCA PI is payable. Only DVA’s figure counts.",
    see: ["permanent-impairment", "vets-act-2026"],
  },
  {
    term: "VRB",
    aka: ["Veterans’ Review Board"],
    definition:
      "First external, informal, no-fee merits review of most DVA compensation decisions. For most decisions from 21 April 2025 you have 12 months. VEA pension rate and attendant allowance: 3 months. Check the letter. Count it on the Deadlines tool.",
    see: ["appeals-vrb-art"],
  },
  {
    term: "WPI",
    aka: ["Whole person impairment", "combined values"],
    definition:
      "Combined impairment points under GARP M, using C = round(A + B − AB/100), highest first — not simple addition. 44 and 40 combine to 66, not 84. Being 4 combined points short of Gold Card is not 4 points on a new letter: a new independent condition is combined with the old total, so it has to be larger. Worsening an existing rating replaces that number, then the set is recombined. The calculator on this site does that locally.",
    see: ["permanent-impairment"],
  },
];
