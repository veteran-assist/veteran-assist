/**
 * The part of a client IP address that rate limits should count.
 *
 * IPv4: the whole address.
 * IPv6: the first four groups (the /64). One home or phone connection is
 * normally given a whole /64, so counting full IPv6 addresses would let one
 * person rotate through billions of addresses and skip the per-visitor limit.
 */
export function rateLimitSubject(ip: string): string {
  const raw = ip.trim().toLowerCase().replace(/^\[|\]$/g, "").split("%")[0] ?? "";
  if (!raw) return "unknown";

  if (!raw.includes(":")) return raw; // IPv4
  // IPv4-mapped IPv6 (::ffff:203.0.113.7) is really an IPv4 visitor.
  const mapped = raw.match(/^::ffff:(\d{1,3}(?:\.\d{1,3}){3})$/);
  if (mapped) return mapped[1]!;

  const groups = expandIpv6(raw);
  if (!groups) return raw;
  return `${groups.slice(0, 4).join(":")}::/64`;
}

function expandIpv6(addr: string): string[] | null {
  const halves = addr.split("::");
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  const missing = 8 - head.length - tail.length;
  if (halves.length === 1 && head.length !== 8) return null;
  if (missing < 0) return null;
  const groups = [...head, ...Array(halves.length === 2 ? missing : 0).fill("0"), ...tail];
  if (groups.length !== 8 || groups.some((g) => !/^[0-9a-f]{1,4}$/.test(g))) return null;
  return groups.map((g) => g.replace(/^0+(?=.)/, ""));
}
