export const APP_NAME = "Veteran Assist";
export const APP_TAGLINE = "Independent Australian DVA field guide — by a veteran, for veterans";

export function pageTitle(page: string): string {
  return `${page} — ${APP_NAME}`;
}
