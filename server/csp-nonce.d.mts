export function currentCspNonce(): string | undefined;
export function runWithCspNonce<T>(fn: () => T): T;
