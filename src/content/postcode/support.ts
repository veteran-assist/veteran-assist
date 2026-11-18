/** State and national support shown after a postcode lookup. Names only where verified. */

export type StateCode = "NSW" | "VIC" | "QLD" | "SA" | "WA" | "TAS" | "NT" | "ACT";

export type OfficialLink = {
  label: string;
  href: string;
  note?: string;
};

export type StateSupport = {
  code: StateCode;
  name: string;
  parliament: string;
  /** State MP finder — we do not bundle state districts. */
  findMp: OfficialLink;
  /** Optional second finder (directory vs map). */
  findMpAlt?: OfficialLink;
  findCouncil: OfficialLink;
  dvaOffice?: { name: string; address: string; note?: string };
  deputyCommissioner: { name: string; note: string };
  stateVeteransMinister: OfficialLink;
  rsl: OfficialLink;
};

export const POSTCODE_LAST_CHECKED = "17 September 2026";

export const AEC_FIND = "https://electorate.aec.gov.au/";
export const APH_MEMBERS = "https://www.aph.gov.au/Senators_and_Members";
export const ATDP_REGISTER = "https://www.advocateregister.org.au/";
export const OPEN_ARMS = "https://www.openarms.gov.au/";
export const OPEN_ARMS_CENTRES = "https://www.openarms.gov.au/about/office-locations";
export const DVA_LOCATIONS = "https://www.dva.gov.au/about-us/contact-us/location-finder";
export const DVA_STRUCTURE = "https://www.dva.gov.au/about-us/who-we-are/our-structure";
export const DVA_HUBS = "https://www.dva.gov.au/vfhubs";
export const LEGACY = "https://www.legacy.com.au/";
export const ESO_PAGE =
  "https://www.dva.gov.au/what-we-help-with/advocacy-representation-advice/what-is-an-ex-service-organisation";
export const VRB = "https://www.vrb.gov.au/";

export const nationalSupports: OfficialLink[] = [
  {
    label: "Open Arms — 1800 011 046",
    href: "tel:1800011046",
    note: "24/7 counselling for veterans and families. Free. Military-aware.",
  },
  {
    label: "1800 VETERAN (1800 838 372)",
    href: "tel:1800838372",
    note: "DVA general line. Acute Support Package is requested here — no form.",
  },
  {
    label: "ATDP Advocacy Register",
    href: ATDP_REGISTER,
    note: "Free or low-cost accredited advocates. Search by location on their site — we do not invent a local advocate list.",
  },
  {
    label: "DVA location finder (VAN offices)",
    href: DVA_LOCATIONS,
    note: "Veterans’ Access Network desks, including those inside Services Australia. Hours move.",
  },
  {
    label: "Veterans’ and Families’ Hubs",
    href: DVA_HUBS,
    note: "Walk-in wraparound sites. Not every region has one yet.",
  },
  {
    label: "Open Arms centre locations",
    href: OPEN_ARMS_CENTRES,
    note: "In-person counselling sites. Confirm hours on Open Arms.",
  },
  {
    label: "Legacy",
    href: LEGACY,
    note: "Support for families of deceased or incapacitated veterans.",
  },
  {
    label: "Ex-service organisations (DVA)",
    href: ESO_PAGE,
    note: "What an ESO does, from DVA. To find one with advocates near you, DVA points to the Advocacy Register.",
  },
  {
    label: "Veterans’ Review Board",
    href: VRB,
    note: "First external review of a DVA compensation decision. 1800 550 460. A local member does not pause the time limit.",
  },
];

export const stateSupport: Record<StateCode, StateSupport> = {
  NSW: {
    code: "NSW",
    name: "New South Wales",
    parliament: "NSW",
    findMp: {
      label: "NSW Electoral Commission — find my electorate",
      href: "https://elections.nsw.gov.au/elections/find-my-electorate",
      note: "Address lookup for your state district. Then open the sitting member on NSW Parliament’s current members list (parliament.nsw.gov.au/members). State districts are not federal electorates.",
    },
    findCouncil: {
      label: "NSW local government directory",
      href: "https://www.olg.nsw.gov.au/public/local-government-directory/",
    },
    dvaOffice: {
      name: "NSW DVA office",
      address: "Tower B, Centennial Plaza, 280 Elizabeth Street, Surry Hills NSW 2010",
      note: "1800 VETERAN. Confirm hours and in-person desks on the DVA location finder.",
    },
    deputyCommissioner: {
      name: "Katrina Jocumsen",
      note: "Listed as Deputy Commissioner NSW/ACT on DVA’s structure page (as at 2 February 2026). Acting names appear on later charts — confirm before you write.",
    },
    stateVeteransMinister: {
      label: "The Hon David Harris MP — NSW Minister for Veterans",
      href: "https://www.veterans.nsw.gov.au/",
      note: "Named on a DVA joint media release in 2026 (Richmond Veterans’ and Families’ Hub). Confirm on veterans.nsw.gov.au before you write — state portfolios move.",
    },
    rsl: { label: "RSL NSW", href: "https://www.rslnsw.org.au/" },
  },
  VIC: {
    code: "VIC",
    name: "Victoria",
    parliament: "Victoria",
    findMp: {
      label: "Victorian Parliament member search",
      href: "https://www.parliament.vic.gov.au/members/member-search/?member-status=current&page=1&pageSize=10&sortType=2",
      note: "Current Legislative Assembly and Council members. Victoria has one Assembly member and five Council members for each address.",
    },
    findMpAlt: {
      label: "Find electorate by address (Parliament map)",
      href: "https://findelectorate.parliament.vic.gov.au/",
    },
    findCouncil: {
      label: "Know Your Council (Victoria)",
      href: "https://www.vic.gov.au/know-your-council",
    },
    dvaOffice: {
      name: "Victoria DVA office",
      address: "300 Latrobe Street, Melbourne VIC 3000",
      note: "1800 VETERAN. Confirm on the DVA location finder — VAN desks also sit in regional Services Australia offices.",
    },
    deputyCommissioner: {
      name: "Michael Harper",
      note: "Listed as Deputy Commissioner Victoria on DVA’s structure page (as at 2 February 2026). Confirm before you write.",
    },
    stateVeteransMinister: {
      label: "Victorian Minister for Veterans — confirm the name",
      href: "https://www.vic.gov.au/concessions-veterans",
      note: "The 2026–27 Victorian Budget veterans paper (25 May 2026) names Natalie Suleyman MP. Portfolios move — confirm on vic.gov.au before you write.",
    },
    rsl: { label: "RSL Victoria", href: "https://www.rslvic.com.au/" },
  },
  QLD: {
    code: "QLD",
    name: "Queensland",
    parliament: "Queensland",
    findMp: {
      label: "ECQ — where is my electorate",
      href: "https://www.ecq.qld.gov.au/electoral-boundaries/where-is-my-electorate",
      note: "Address lookup for the district used at the last state election. A June 2026 redistribution does not apply to sitting members until the October 2028 election. Then use Queensland Parliament current members for contact details.",
    },
    findCouncil: {
      label: "Queensland local government directory",
      href: "https://www.dlgwv.qld.gov.au/local-government/for-the-community/local-government-directory",
    },
    dvaOffice: {
      name: "Queensland DVA office",
      address: "Level 6, 480 Queen Street, Brisbane QLD 4000",
      note: "Entry via Adelaide Street. 1800 VETERAN. Confirm on the DVA location finder.",
    },
    deputyCommissioner: {
      name: "Tara Hatzismalis",
      note: "Listed as Deputy Commissioner Queensland on DVA’s structure page (as at 2 February 2026).",
    },
    stateVeteransMinister: {
      label: "Queensland ministers (confirm the veterans portfolio)",
      href: "https://www.qld.gov.au/government/premier-ministers-departments/ministers-departments",
      note: "We will not invent a name. Use the official ministerial list (updated 24 October 2026).",
    },
    rsl: { label: "RSL Queensland", href: "https://rslqld.org/" },
  },
  SA: {
    code: "SA",
    name: "South Australia",
    parliament: "South Australia",
    findMp: {
      label: "ECSA — find your SA district",
      href: "https://www.ecsa.sa.gov.au/map",
      note: "Address lookup on the Electoral Commission of SA map. Then open the sitting member on Parliament of SA member search.",
    },
    findCouncil: {
      label: "SA councils listing",
      href: "https://www.lga.sa.gov.au/sa-councils/councils-listing",
    },
    dvaOffice: {
      name: "South Australia DVA office",
      address: "Level 10, RAA Place, 91 King William Street, Adelaide SA 5000",
      note: "1800 VETERAN. Confirm on the DVA location finder.",
    },
    deputyCommissioner: {
      name: "Jennifer Buckler",
      note: "Listed as Deputy Commissioner South Australia on DVA’s structure page (as at 2 February 2026).",
    },
    stateVeteransMinister: {
      label: "SA ministers (confirm the veterans portfolio)",
      href: "https://www.premier.sa.gov.au/the-team",
      note: "We will not invent a name.",
    },
    rsl: { label: "RSL SA", href: "https://rslsa.org.au/" },
  },
  WA: {
    code: "WA",
    name: "Western Australia",
    parliament: "Western Australia",
    findMp: {
      label: "Find a WA member (postcode or suburb)",
      href: "https://www.parliament.wa.gov.au/MemberList",
      note: "Parliament of WA current members. Search by surname, electorate, postcode or suburb.",
    },
    findCouncil: {
      label: "WA local government directory (WALGA)",
      href: "https://walga.asn.au/your-local-government/local-government-directory",
    },
    deputyCommissioner: {
      name: "Samantha Patuto",
      note: "Listed as Deputy Commissioner Western Australia on DVA’s structure page (as at 2 February 2026).",
    },
    stateVeteransMinister: {
      label: "WA ministers (confirm Veterans Issues)",
      href: "https://www.wa.gov.au/government/premier-and-cabinet-ministers",
      note: "The portfolio existed under a previous ministry. Use the current ministerial list — we will not reuse a 2023 name.",
    },
    rsl: { label: "RSL WA", href: "https://rslwa.org.au/" },
  },
  TAS: {
    code: "TAS",
    name: "Tasmania",
    parliament: "Tasmania",
    findMp: {
      label: "TEC MyReps — who represents you",
      href: "https://www.tec.tas.gov.au/services/MyReps/Index.php",
      note: "Tasmanian Electoral Commission address lookup (last updated 31 July 2026). House of Assembly and Legislative Council members for that address.",
    },
    findCouncil: {
      label: "Tasmanian councils (LGAT)",
      href: "https://www.lgat.tas.gov.au/tasmanian-councils",
    },
    dvaOffice: {
      name: "Tasmania DVA office",
      address: "254–286 Liverpool Street, Hobart TAS 7000",
      note: "1800 VETERAN. Confirm on the DVA location finder.",
    },
    deputyCommissioner: {
      name: "Sally Dennington",
      note: "Listed as Deputy Commissioner Tasmania on DVA’s structure page (as at 2 February 2026).",
    },
    stateVeteransMinister: {
      label: "Tasmanian ministers (confirm the veterans portfolio)",
      href: "https://www.premier.tas.gov.au/your-government",
      note: "We will not invent a name.",
    },
    rsl: { label: "RSL Tasmania", href: "https://rsltas.org.au/" },
  },
  NT: {
    code: "NT",
    name: "Northern Territory",
    parliament: "Northern Territory",
    findMp: {
      label: "NT Legislative Assembly members",
      href: "https://parliament.nt.gov.au/members",
    },
    findCouncil: {
      label: "NT local government",
      href: "https://nt.gov.au/community/local-councils-remote-communities-and-homelands",
    },
    dvaOffice: {
      name: "Northern Territory DVA office",
      address: "1 Briggs Street, Darwin NT 0800",
      note: "1800 VETERAN. An older DVA page also listed Winnellie — confirm the live address on the location finder before you travel.",
    },
    deputyCommissioner: {
      name: "Kacie Austin",
      note: "Listed as Deputy Commissioner Northern Territory on DVA’s structure page (as at 2 February 2026).",
    },
    stateVeteransMinister: {
      label: "NT ministers (confirm the veterans portfolio)",
      href: "https://parliament.nt.gov.au/members/ministry",
      note: "We will not invent a name.",
    },
    rsl: { label: "RSL (national — confirm the NT branch)", href: "https://www.rsl.org.au/" },
  },
  ACT: {
    code: "ACT",
    name: "Australian Capital Territory",
    parliament: "ACT",
    findMp: {
      label: "ACT Legislative Assembly members",
      href: "https://www.parliament.act.gov.au/members/current",
      note: "The ACT has no local councils. MLAs cover the territory’s electorates (not the same as the three federal seats).",
    },
    findCouncil: {
      label: "Access Canberra (territory services)",
      href: "https://www.act.gov.au/",
      note: "No local government layer in the ACT.",
    },
    dvaOffice: {
      name: "ACT DVA / VAN",
      address: "National office: 18 Marcus Clarke Street, Canberra ACT 2601 (no in-person client services). VAN: Services Australia, 2–6 Bowes Street, Phillip ACT 2602.",
      note: "Use Phillip for in-person. Confirm on the DVA location finder.",
    },
    deputyCommissioner: {
      name: "Katrina Jocumsen",
      note: "NSW/ACT Deputy Commissioner on DVA’s structure page (as at 2 February 2026).",
    },
    stateVeteransMinister: {
      label: "ACT ministers (confirm the veterans portfolio)",
      href: "https://www.parliament.act.gov.au/members/current",
      note: "We will not invent a name. July 2026 cabinet list is on the Assembly current-members page.",
    },
    rsl: { label: "RSL ACT", href: "https://www.rslact.org.au/" },
  },
};

export const LOOKUP_CAVEAT =
  "A postcode can sit in more than one federal electorate, more than one council, and (rarely) more than one state. The sitting MP is the person elected on the last federal election or by-election boundaries — not a future redistribution. Confirm on the AEC before you write. Writing to a member does not pause a VRB, ART, or FOI time limit.";
