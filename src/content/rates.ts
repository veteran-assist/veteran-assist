/** Single source for DVA MRCA dollar figures quoted on this site. Check the live page. */

export const rates = {
  lastChecked: "26 October 2026",
  publishedOn: "11 September 2026",
  currentFrom: "20 September 2026",
  currentTo: "31 December 2026",
  sourceLabel: "DVA compensation payment rates for MRCA",
  sourceHref:
    "https://www.dva.gov.au/access-benefits/payment-rates/compensation-payment-rates/compensation-payment-rates-for-mrca",
  redemptionWeekly: "$287.94",
  hhsWeekly: "$633.47",
  attendantWeekly: "$633.47",
  srdpWeekly: "$977.95",
  piWeekly: "$447.39",
  s80Lump: "$115,175.42",
  adviceCap: "$3,397.18",
  adaWeekly: "$532.60",
};

export function ratesWindowSentence(): string {
  return `DVA’s MRCA compensation payment rates, current ${rates.currentFrom} to ${rates.currentTo} (page last updated ${rates.publishedOn}; this site last checked ${rates.lastChecked})`;
}
