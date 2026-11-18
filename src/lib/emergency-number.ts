/**
 * Linkify turns a bare "000" into a tap-to-call link for emergency services. "000" is also the
 * tail of every round dollar amount ("$5,000", "40,000 km"), and a tap on that must never dial.
 * Pass the index where a "000" match starts; true means it is part of a larger number.
 */
export function isPartOfNumber(text: string, index: number): boolean {
  const before = text[index - 1] ?? "";
  const after = text.slice(index + 3, index + 5);
  return /[\d,.$]/.test(before) || /^,?\d/.test(after);
}
