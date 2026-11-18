export function CrisisBar() {
  return (
    <section aria-label="Crisis support numbers" className="bg-crisis text-crisis-fg pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-0.5 px-4 py-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:py-2">
        <p className="text-sm leading-5">
          In crisis?{" "}
          <a className="font-semibold underline underline-offset-2" href="tel:1800011046">
            Open Arms 1800 011 046
          </a>
          <span> — 24/7, free, military-aware.</span>
        </p>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm">
          <a className="font-semibold underline underline-offset-2" href="tel:1800737732">
            1800RESPECT
          </a>
          <a className="font-semibold underline underline-offset-2" href="tel:000">
            Emergency 000
          </a>
          <a className="font-semibold underline underline-offset-2" href="tel:131114">
            Lifeline 13 11 14
          </a>
        </p>
      </div>
    </section>
  );
}
