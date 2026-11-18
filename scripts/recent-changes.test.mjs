import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { HOME_RECENT_LIMIT, recentChanges } from "../src/content/recent-changes.ts";

test("the front page shows five recent changes and keeps the rest", () => {
  assert.equal(HOME_RECENT_LIMIT, 5);
  assert.ok(recentChanges.length > HOME_RECENT_LIMIT);
  const home = readFileSync("src/components/recent-changes.tsx", "utf8");
  assert.match(home, /slice\(0, HOME_RECENT_LIMIT\)/);
  assert.match(home, /to="\/changes"/);
  const page = readFileSync("src/routes/changes.tsx", "utf8");
  assert.match(page, /recentChanges/);
  const tree = readFileSync("src/routeTree.gen.ts", "utf8");
  assert.match(tree, /'\/changes'/);
});
