import assert from "node:assert/strict";
import test from "node:test";
import { rateLimitSubject } from "../src/lib/ip.ts";

test("IPv4 addresses are counted whole", () => {
  assert.equal(rateLimitSubject("203.0.113.7"), "203.0.113.7");
  assert.equal(rateLimitSubject(" 203.0.113.7 "), "203.0.113.7");
  assert.equal(rateLimitSubject("::ffff:203.0.113.7"), "203.0.113.7");
});

test("IPv6 addresses are counted per /64, so rotating the last half does not reset the limit", () => {
  const a = rateLimitSubject("2001:db8:85a3:12:1111:2222:3333:4444");
  const b = rateLimitSubject("2001:db8:85a3:12:aaaa:bbbb:cccc:dddd");
  assert.equal(a, b);
  assert.equal(a, "2001:db8:85a3:12::/64");
});

test("compressed and expanded IPv6 forms give the same subject", () => {
  assert.equal(rateLimitSubject("2001:0db8:0000:0012::1"), "2001:db8:0:12::/64");
  assert.equal(rateLimitSubject("2001:db8::12:0:0:0:1"), "2001:db8:0:12::/64");
  assert.equal(rateLimitSubject("[2001:db8::1]"), "2001:db8:0:0::/64");
});

test("different /64 networks stay separate", () => {
  assert.notEqual(rateLimitSubject("2001:db8:0:1::1"), rateLimitSubject("2001:db8:0:2::1"));
});

test("empty or unreadable input does not throw", () => {
  assert.equal(rateLimitSubject(""), "unknown");
  assert.equal(rateLimitSubject("not-an-ip"), "not-an-ip");
  assert.equal(rateLimitSubject("1:2:3"), "1:2:3");
});
