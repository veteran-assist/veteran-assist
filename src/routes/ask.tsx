import { createFileRoute, redirect } from "@tanstack/react-router";

/**
 * Ask (the built-in AI) was removed on 20 October 2026: it needed a paid xAI
 * account. Old links go to the guide with a prompt veterans can paste into
 * their own AI.
 */
export const Route = createFileRoute("/ask")({
  beforeLoad: () => {
    throw redirect({
      to: "/guides/$slug",
      params: { slug: "asking-an-ai" },
      statusCode: 301,
    });
  },
});
