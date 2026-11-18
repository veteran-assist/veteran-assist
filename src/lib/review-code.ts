import { hit, RULES, waitText } from "@/lib/rate-limit";
import { safeEqual } from "@/lib/safe-equal";

/** A review code shorter than this is treated as not configured (the inbox stays locked). */
export const MIN_REVIEW_CODE_LENGTH = 24;

/**
 * Check a keeper's review code. Returns null when allowed, otherwise a message.
 * - The code must be set in FEEDBACK_REVIEW_CODE and be 24+ characters.
 * - Attempts are throttled per visitor (RULES.reviewCode: 30 per 15 minutes).
 * - The code is never logged.
 */
export async function checkReviewCode(code: string): Promise<string | null> {
  const expected = process.env.FEEDBACK_REVIEW_CODE?.trim() ?? "";
  const isDev = process.env.NODE_ENV !== "production";
  if (!expected || expected.length < MIN_REVIEW_CODE_LENGTH) {
    if (isDev && !expected) return null;
    return "Inbox is locked on the published site until a review code of 24 or more characters is set.";
  }
  try {
    const rate = await hit(RULES.reviewCode);
    if (!rate.allowed) {
      return `Too many tries. Please wait ${waitText(rate.retryAfterSeconds)} and try again.`;
    }
  } catch {
    return "The inbox is not available right now. Try again later.";
  }
  if (!code || !safeEqual(code, expected)) return "That review code is not right.";
  return null;
}
