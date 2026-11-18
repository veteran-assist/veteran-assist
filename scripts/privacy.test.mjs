import assert from "node:assert/strict";
import test from "node:test";
import { findPii } from "../src/lib/privacy.ts";

// Ordinary text a veteran types into Feedback. None of these may be blocked.
const allow = [
  "How do I lodge a VRB application?",
  "What changed on 1 July 2026 that can cost me money?",
  "I have 40 and 25 impairment points. How are they combined?",
  // Words that start with a state abbreviation used to look like file numbers.
  "I actually got a letter from DVA, what now?",
  "I live in Victoria, who can help me?",
  "Is there an advocate in Tasmania?",
  "Does incapacity payment replace my salary?",
  "I'm not satisfied with my decision, can I appeal?",
  "What activities count for household services?",
  "Are there any sanctions if I miss a deadline?",
  "Is my warranty on the hearing aids covered?",
  "Who do I call in NSW or the ACT?",
  "Can I claim ASP in 2026?",
  "Does the VEA 1986 still apply to me?",
  // Numbers next to ordinary words used to look like street addresses.
  "Do I have 3 months to court after the VRB?",
  "I have 2 Federal Court cases running.",
  "It has been 30 days to Court and nothing.",
  // Asking about a field is not giving a date of birth.
  "What do I put for date of birth on the D9319?",
  "Do I need my DOB on the FOI form?",
  "I was born in Queensland. Does that matter?",
  // Dates on their own are deadline questions, not identifiers.
  "My decision letter is dated 12/03/2026. When is the VRB deadline?",
  "I got the letter on 3 March 2026.",
  // Asking how lodging works, or whether someone else can lodge, is the point of the site.
  "How do I lodge my claim?",
  "Should I file my claim online or on paper?",
  "I want to lodge this review myself",
  "Can an advocate lodge it for me?",
  "Who can represent me at the VRB?",
  "Can my advocate be my representative at the VRB?",
  "Can you send me the D9319 form?",
  "Where do I send this letter?",
  // Phone numbers the site itself publishes.
  "Is 1800 838 372 the right number for DVA?",
  "Should I call 13 11 14 or Open Arms?",
];

// Identifiers that must never be sent.
const block = [
  "My claim number is NSM12345",
  "my file is nsm33446",
  "Service number VX123456",
  "Reference QLD12345 please",
  "Claim ILC-123456 is stuck",
  "Call me on 0412 345 678",
  "My TFN is 123 456 789",
  "Email me at someone@example.com",
  "My DOB is 12/03/1985",
  "date of birth: 4 July 1979",
  "I was born on 1 Jan 1980",
  "I live at 12 Smith Street",
  "Send it to 4 Banksia Cres",
];

test("ordinary questions are not blocked", () => {
  for (const q of allow) {
    assert.deepEqual(findPii(q), [], `should allow: ${q}`);
  }
});

test("identifiers are blocked", () => {
  for (const q of block) {
    assert.notDeepEqual(findPii(q), [], `should block: ${q}`);
  }
});

test("a note that mentions a state, a deadline and the DVA number is not blocked", () => {
  const answer =
    "In Victoria and Tasmania, Veterans' and Families Hubs can help. You actually have 3 months to court after the VRB decision. Call 1800 838 372.";
  assert.deepEqual(findPii(answer), []);
});
