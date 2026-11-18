export type RecentChange = {
  date: string;
  text: string;
  href?: string;
};

/** Newest lines shown on the front page. The rest stay in this list, on /changes. */
export const HOME_RECENT_LIMIT = 5;

/** Newest first. One line each. Dates are when the change shipped. */
export const recentChanges: RecentChange[] = [
  {
    date: "14 November 2026",
    text: "Deadlines: the “Extension?” row is gone. The page now says the letter, or the body it names, states what applies once a date has passed, and no longer says a missed deadline always ends the right. Several guide, glossary and contacts lines now say what DVA’s pages say rather than what to do. Reading times are now worked out from each guide’s text.",
    href: "/deadlines",
  },
  {
    date: "12 November 2026",
    text: "Using your Veteran Card: what DVA’s pages say about medicinal cannabis (RPBS funding, listed conditions, reimbursement forms) and other medicines. Incapacity and offsets: how DVA says other compensation reduces a VEA Disability Compensation Payment. Delays: DVA publishes no time for the stages after allocation.",
    href: "/guides/treatment-on-your-card",
  },
  {
    date: "6 November 2026",
    text: "Glossary: added the Veteran Health Check and the Education Scheme (the VCES became part of the MRCAETS on 1 July 2026). Search now finds travel, reimbursement and provider questions more easily.",
    href: "/glossary",
  },
  {
    date: "2 November 2026",
    text: "Call sheet: download it as a two-page A4 PDF that prints the same on any device.",
    href: "/call-sheet",
  },
  {
    date: "2 November 2026",
    text: "Call sheet now prints as two full A4 pages: the questions and notes on page 1, two call logs on page 2.",
    href: "/call-sheet",
  },
  {
    date: "2 November 2026",
    text: "Pathfinder results and Playbooks now state DVA’s process and offer templates, and say they are general information, not advice.",
    href: "/pathfinder",
  },
  {
    date: "2 November 2026",
    text: "Household services and Gold Card concessions guides shortened to what DVA and the state pages say. Advice-style lines removed site-wide; the Pathfinder now says “Next steps”.",
    href: "/guides/household-services",
  },
  {
    date: "2 November 2026",
    text: "Using your Veteran Card: MEPI and prior-approval wait times from DVA, the in-time and out-of-time MEPI rule, and acupuncture. Three guides also shortened.",
    href: "/guides/treatment-on-your-card",
  },
  {
    date: "1 November 2026",
    text: "New guide: what happens after liability is accepted, including DVA’s PI waits and the tinnitus pilot.",
    href: "/guides/pi-after-liability",
  },
  {
    date: "1 November 2026",
    text: "New guide: using a Veteran Card for treatment, prior approval, and claiming money back.",
    href: "/guides/treatment-on-your-card",
  },
  {
    date: "1 November 2026",
    text: "New guide: travel for treatment, including the kilometre rate, flights, and accommodation.",
    href: "/guides/travel-for-treatment",
  },
  {
    date: "30 October 2026",
    text: "Terms and Privacy updated: where your information is held, how to report a problem, and what to do if a deadline is close.",
    href: "/terms",
  },
  {
    date: "30 October 2026",
    text: "Forms page: removed D2582, because DVA has closed the VEA to new compensation claims. The paper MRCA claim form now says an advocate must lodge online.",
    href: "/forms",
  },
  {
    date: "29 October 2026",
    text: "Forms page now includes the main claim, Service Pension, qualifying service and funeral forms.",
    href: "/forms",
  },
  {
    date: "25 October 2026",
    text: "After an FOI internal review, you have 60 days to go to the OAIC, not 30.",
    href: "/guides/foi",
  },
  {
    date: "24 October 2026",
    text: "Front page shows DVA’s published wait times, and the sum of claims yet to be finalised.",
    href: "/guides/delays",
  },
  {
    date: "24 October 2026",
    text: "Printable call sheet for when you ring DVA.",
    href: "/call-sheet",
  },
  {
    date: "24 October 2026",
    text: "Guide for the person helping a veteran.",
    href: "/guides/helping-a-veteran",
  },
  {
    date: "24 October 2026",
    text: "Forms page with official download links, including D3057, D1360, D0800 and D9325.",
    href: "/forms",
  },
  {
    date: "24 October 2026",
    text: "Gold Card is the first link, including on a phone, and the guide starts with what you do first.",
    href: "/guides/gold-card",
  },
];
