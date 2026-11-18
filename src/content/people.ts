export type OfficeHolder = {
  role: string;
  name: string;
  note: string;
  href: string;
};

export const peopleUpdated = "19 October 2026";

export const officeHolders: OfficeHolder[] = [
  {
    role: "Minister for Veterans’ Affairs (and Defence Personnel)",
    name: "The Hon Matt Keogh MP",
    note: "The minister responsible for DVA in the House. Portfolio media and speeches.",
    href: "https://minister.dva.gov.au/homepage",
  },
  {
    role: "Shadow Minister for Veterans’ Affairs",
    name: "The Hon Michael McCormack MP",
    note: "Opposition spokesperson. Confirm on directory.gov.au — shadow portfolios move.",
    href: "https://www.directory.gov.au/commonwealth-parliament/shadow-ministers/shadow-minister-veterans-affairs",
  },
  {
    role: "Secretary, DVA / President, Repatriation Commission",
    name: "Alison Frame",
    note: "Departmental head and President of the Repatriation Commission (from 13 April 2023). The separate MRCC was merged into the Repatriation Commission on 1 July 2026.",
    href: "https://www.dva.gov.au/about-us/who-we-are/the-repatriation-commission",
  },
  {
    role: "Repatriation Commissioner",
    name: "Kahlil Fegan DSC AM",
    note: "Commissioner on the Repatriation Commission (from September 2023).",
    href: "https://www.dva.gov.au/about-us/who-we-are/the-repatriation-commission",
  },
  {
    role: "Veteran Family Commissioner",
    name: "Annabelle Wilson",
    note: "Family voice on the Commission (from August 2025).",
    href: "https://www.dva.gov.au/about-us/who-we-are/the-repatriation-commission",
  },
  {
    role: "Commissioner representing Defence",
    name: "Lieutenant General Natasha Fox AO CSC",
    note: "Added when the Commission expanded on 1 July 2026.",
    href: "https://www.dva.gov.au/about-us/who-we-are/the-repatriation-commission",
  },
  {
    role: "Commissioner representing Comcare",
    name: "Colin Radford",
    note: "Added when the Commission expanded on 1 July 2026.",
    href: "https://www.dva.gov.au/about-us/who-we-are/the-repatriation-commission",
  },
];

export const peopleCaveat =
  "Titles and names change with elections, reshuffles, and appointments. Check the linked official page before you write to anyone. This site is not affiliated with them.";
