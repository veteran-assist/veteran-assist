/**
 * Optional contact email for Terms and Privacy. Set VITE_PRIVACY_CONTACT_EMAIL in Vercel
 * (Production) and redeploy to show it. When unset, both pages point to Feedback only.
 * It is a build-time value, so changing it needs a new deployment.
 */
export const contactEmail: string | undefined =
  (import.meta.env.VITE_PRIVACY_CONTACT_EMAIL as string | undefined)?.trim() || undefined;
