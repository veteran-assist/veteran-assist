export type ProcessingStream = {
  type: string;
  onHand: number;
  veterans: number | null;
  allocateDays: number | null;
  processDays: number | null;
  dvaDays: number | null;
  externalDays: number | null;
  outstandingAgeDays: number;
  /** Claims received in the last 12 months, where DVA publishes it. */
  intake12m?: number | null;
  /** Claims determined in the last 12 months, where DVA publishes it. */
  determined12m?: number | null;
  note?: string;
};

export const processingTimes = {
  asAt: "30 September 2026",
  pageUpdated: "23 October 2026",
  lastChecked: "26 October 2026",
  sourceLabel: "DVA Conditions and claims processing times",
  sourceHref:
    "https://www.dva.gov.au/access-benefits/claims-and-compensation-for-illness-or-injury/conditions-and-claims-processing-times",
  headlineType: "MRCA initial liability",
  headlineDays: 116,
  streams: [
    {
      type: "MRCA initial liability",
      onHand: 29201,
      veterans: 21374,
      allocateDays: 13,
      processDays: 116,
      dvaDays: 83,
      externalDays: 33,
      outstandingAgeDays: 193,
      intake12m: 30133,
      determined12m: 24139,
    },
    {
      type: "MRCA permanent impairment",
      onHand: 17908,
      veterans: 17908,
      allocateDays: 146,
      processDays: 171,
      dvaDays: 123,
      externalDays: 47,
      outstandingAgeDays: 185,
      intake12m: 19324,
      determined12m: 11260,
      note: "Allocation is after initial liability is determined, or lodgement, whichever is later.",
    },
    {
      type: "Historical initial liability (DRCA / VEA)",
      onHand: 25298,
      veterans: 16129,
      allocateDays: null,
      processDays: null,
      dvaDays: null,
      externalDays: null,
      outstandingAgeDays: 301,
      intake12m: null,
      determined12m: 28547,
      note: "307 of these (1.2%) are over 800 days old. DVA did not publish a last-12-months process time for this stream.",
    },
    {
      type: "DRCA permanent impairment",
      onHand: 31820,
      veterans: 9320,
      allocateDays: null,
      processDays: null,
      dvaDays: null,
      externalDays: null,
      outstandingAgeDays: 269,
      intake12m: null,
      determined12m: 18101,
      note: "DVA did not publish a last-12-months process time for this stream.",
    },
  ] satisfies ProcessingStream[],
  caveat:
    "Copied from DVA’s 30 September 2026 data (page last updated 23 October 2026). DVA now publishes averages, not a single all-claims median. “Process” time includes allocation and excludes time DVA is waiting on you or a third party. Your claim can be faster or slower. If this site and the official page disagree, the official page wins.",
  presumptiveNote:
    "From 1 July 2026, if you are claiming an eligible presumptive-liability condition and provide a confirmed diagnosis from an appropriately qualified medical practitioner, DVA says the claim may be determined in less than 2 weeks as part of the allocation process. That is not the 116-day average, and it is not a guarantee.",
};
