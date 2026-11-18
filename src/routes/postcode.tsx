import { useMemo, useRef, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Landmark, MapPin, PhoneCall, Scale, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Disclaimer } from "@/components/disclaimer";
import { FeedbackPanel } from "@/components/feedback-panel";
import { LastChecked } from "@/components/last-checked";
import { pageTitle } from "@/lib/brand";
import { lookupPostcode, type PostcodeResult } from "@/lib/postcode";
import {
  AEC_FIND,
  APH_MEMBERS,
  DVA_LOCATIONS,
  DVA_STRUCTURE,
  LOOKUP_CAVEAT,
  POSTCODE_LAST_CHECKED,
  nationalSupports,
} from "@/content/postcode/support";
import { HOUSE_SOURCE } from "@/content/postcode/house";
import { SENATE_SOURCE } from "@/content/postcode/senate";

type Search = { pc?: string };

function parsePcParam(raw: unknown): string | undefined {
  let digits = "";
  if (typeof raw === "number" && Number.isInteger(raw)) {
    digits = String(raw).padStart(4, "0").slice(-4);
  } else if (typeof raw === "string") {
    digits = raw.replace(/\D/g, "").slice(0, 4);
  }
  return digits.length ? digits : undefined;
}

function digitsOf(raw: string): string {
  return raw.replace(/\D/g, "").slice(0, 4);
}

export const Route = createFileRoute("/postcode")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    pc: parsePcParam(search.pc),
  }),
  head: () => ({
    meta: [
      { title: pageTitle("Find local support") },
      {
        name: "description",
        content:
          "Enter an Australian postcode to see sitting federal members, senators, DVA offices, advocates, and local support. Runs in your browser.",
      },
    ],
  }),
  component: PostcodePage,
});

function PostcodePage() {
  const { pc: fromUrl } = Route.useSearch();
  const [value, setValue] = useState(() => fromUrl ?? "");
  const [tried, setTried] = useState(Boolean(fromUrl && fromUrl.length === 4));
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const result = useMemo(() => lookupPostcode(value), [value]);
  const looking = value.length === 4;
  const hasHit = Boolean(result && (result.knownToMap || result.states.length > 0));
  const unknown = Boolean(looking && result && result.states.length === 0 && !result.knownToMap);

  function reveal() {
    inputRef.current?.blur();
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <p className="text-sm font-semibold tracking-wide text-forest uppercase">Tools</p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">
        Find local support
      </h1>
      <p className="mt-3 text-lg leading-7 text-ink-soft">
        Four-digit postcode, then Find. Sitting federal member, senators, DVA’s state office, and
        the official registers. Nothing is sent to us.
      </p>

      <form
        className="mt-6 rounded-md border border-rule bg-card p-5"
        onSubmit={(e) => {
          e.preventDefault();
          setTried(true);
          if (digitsOf(value).length === 4) reveal();
        }}
      >
        <label htmlFor="pc" className="text-sm font-semibold text-ink">
          Australian postcode
        </label>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Input
            ref={inputRef}
            id="pc"
            name="pc"
            inputMode="numeric"
            autoComplete="off"
            maxLength={4}
            placeholder="3000"
            value={value}
            onChange={(e) => {
              const next = digitsOf(e.target.value);
              setValue(next);
              if (next.length === 4) setTried(true);
            }}
            className="h-14 max-w-40 font-display text-3xl tracking-[0.2em] tabular-nums"
            aria-describedby="pc-privacy"
          />
          <Button type="submit" className="h-14 px-6">
            Find
          </Button>
        </div>
        <p id="pc-privacy" className="mt-3 text-sm leading-6 text-muted">
          Lookup runs in this browser. We do not store postcodes. Do not type a street address.
        </p>
        <p className="mt-2 text-ink type-body" aria-live="polite">
          {looking && hasHit && result ? (
            <>
              <strong>{result.postcode}</strong>
              {result.electorates[0]
                ? ` — ${result.electorates.map((e) => e.electorate).join(" / ")}${
                    result.electorates[0].member ? `, ${result.electorates[0].member.name}` : ""
                  }`
                : result.states.length
                  ? ` — ${result.states.join(", ")}`
                  : ""}
              . Details below.
            </>
          ) : looking && unknown ? (
            <>{value} is not in this map. Try the AEC search linked below.</>
          ) : tried && value.length !== 4 ? (
            <>Enter four digits, for example 3000.</>
          ) : (
            <>Type four digits, then Find.</>
          )}
        </p>
      </form>

      <div ref={resultsRef} id="pc-results" className="scroll-mt-32">
        {unknown ? (
          <p className="mt-6 rounded-md border border-warn/40 bg-warn-bg px-4 py-3 type-body">
            {value} is not a postcode this map knows. Australian postcodes run from 0200 to 7999.
            Confirm on the{" "}
            <a className="font-semibold underline" href={AEC_FIND} target="_blank" rel="noreferrer">
              AEC electorate search
            </a>
            .
          </p>
        ) : null}

        {hasHit && result ? <Results result={result} /> : null}
      </div>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">What this will not do</h2>
        <ul className="mt-3 space-y-2 type-body text-ink-soft">
          <li className="border-l-2 border-forest/40 pl-4">
            It will not pick your street. If the postcode spans electorates, only the AEC can say
            which side of the line you are on.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            It will not list every VAN desk, every RSL sub-branch, or a named ATDP advocate. Those
            registers change. Use the official search.
          </li>
          <li className="border-l-2 border-forest/40 pl-4">
            A local member can raise a case with DVA. They cannot extend a VRB, ART, or FOI
            deadline. Count that window first —{" "}
            <Link to="/deadlines" className="font-semibold text-forest underline">
              What clock am I on?
            </Link>
          </li>
        </ul>
      </section>

      <LastChecked
        className="mt-8"
        date={POSTCODE_LAST_CHECKED}
        sourceLabel="AEC Find my electorate"
        sourceHref={AEC_FIND}
      />
      <p className="mt-2 text-sm leading-6 text-muted">{HOUSE_SOURCE}</p>
      <p className="mt-1 text-sm leading-6 text-muted">{SENATE_SOURCE}</p>
      <p className="mt-1 text-sm leading-6 text-muted">
        Postcode-to-division rows are from an AEC-derived locality file (pmcau/AustralianElectorates).
        The AEC last updated its public electorate search on 16 September 2026. Their search may
        show next-election boundaries; the sitting member is still the person elected last time or
        at a later by-election.
      </p>

      <div className="mt-10">
        <FeedbackPanel compact />
      </div>
      <div className="mt-8">
        <Disclaimer lastChecked={POSTCODE_LAST_CHECKED} />
      </div>
    </main>
  );
}

function Results({ result }: { result: PostcodeResult }) {
  return (
    <div className="mt-8 space-y-8">
      <aside className="rounded-md border border-gold/50 bg-warn-bg px-4 py-3 text-ink type-body">
        <p className="font-semibold">Confirm on the AEC before you write.</p>
        <p className="mt-1">{LOOKUP_CAVEAT}</p>
        <a
          className="mt-2 inline-flex min-h-11 items-center font-semibold text-forest underline underline-offset-2"
          href={AEC_FIND}
          target="_blank"
          rel="noreferrer"
        >
          AEC — Find my electorate
        </a>
      </aside>

      <section>
        <SectionHead
          icon={Landmark}
          kicker="House of Representatives"
          title={
            result.spansElectorates
              ? `This postcode sits in ${result.electorates.length} electorates`
              : result.electorates[0]
                ? `Federal member for ${result.electorates[0].electorate}`
                : "Federal member"
          }
        />
        {!result.knownToMap ? (
          <p className="mt-3 text-ink-soft type-body">
            No division is bundled for {result.postcode}. The state below is from the postcode
            range only. Use the AEC search.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {result.electorates.map((hit) => (
              <li key={hit.electorate} className="rounded-md border border-rule bg-card p-4">
                <p className="text-sm font-semibold tracking-wide text-forest uppercase">
                  Division of {hit.electorate}
                  {hit.member ? ` · ${hit.member.state}` : ""}
                </p>
                {hit.member ? (
                  <>
                    <p className="font-display mt-1 text-2xl font-semibold">{hit.member.name}</p>
                    <p className="mt-1 text-ink-soft type-body">{hit.member.party}</p>
                  </>
                ) : (
                  <p className="mt-1 text-ink-soft type-body">
                    Sitting member not in this list — use APH.
                  </p>
                )}
                <p className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                  <a
                    className="font-semibold text-forest underline underline-offset-2"
                    href={APH_MEMBERS}
                    target="_blank"
                    rel="noreferrer"
                  >
                    APH directory
                  </a>
                  <a
                    className="font-semibold text-forest underline underline-offset-2"
                    href={AEC_FIND}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Confirm this division
                  </a>
                </p>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-sm leading-6 text-muted">
          We do not publish guessed emails. Use the member’s APH page or electorate office. Matt
          Keogh is the Minister for Veterans’ Affairs — that is a different letter to your local
          member.{" "}
          <Link to="/people" className="font-semibold text-forest underline">
            Ministers and Commission
          </Link>
          .
        </p>
      </section>

      <section>
        <SectionHead
          icon={Users}
          kicker="Senate"
          title={
            result.states.length === 1
              ? `Senators for ${result.support[0]?.name ?? result.states[0]}`
              : "Senators for these states"
          }
        />
        {result.spansStates ? (
          <p className="mt-2 text-ink-soft type-body">
            This postcode is associated with more than one state. Both Senate teams are listed.
          </p>
        ) : null}
        <ul className="mt-4 divide-y divide-rule rounded-md border border-rule bg-card">
          {result.senators.map((s) => (
            <li key={`${s.state}-${s.name}`} className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3">
              <p className="font-semibold">{s.name}</p>
              <p className="text-sm text-muted">
                {s.party} · {s.state}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-3 type-body">
          <a
            className="font-semibold text-forest underline underline-offset-2"
            href={APH_MEMBERS}
            target="_blank"
            rel="noreferrer"
          >
            Confirm on the APH directory
          </a>
        </p>
      </section>

      {result.support.map((st) => (
        <section key={st.code}>
          <SectionHead icon={Building2} kicker={st.name} title="State, DVA, and council" />
          <div className="mt-4 space-y-3">
            <InfoCard title="DVA Deputy Commissioner">
              <p className="font-display text-xl font-semibold">{st.deputyCommissioner.name}</p>
              <p className="mt-1 text-ink-soft type-body">{st.deputyCommissioner.note}</p>
              <Ext href={DVA_STRUCTURE} label="DVA structure page" />
            </InfoCard>
            {st.dvaOffice ? (
              <InfoCard title={st.dvaOffice.name}>
                <p className="type-body">{st.dvaOffice.address}</p>
                {st.dvaOffice.note ? (
                  <p className="mt-1 text-ink-soft type-body">{st.dvaOffice.note}</p>
                ) : null}
                <Ext href={DVA_LOCATIONS} label="DVA location finder" />
              </InfoCard>
            ) : (
              <InfoCard title="DVA office">
                <p className="text-ink-soft type-body">
                  Use the official location finder for the current WA address and VAN desks. We
                  will not guess a street.
                </p>
                <Ext href={DVA_LOCATIONS} label="DVA location finder" />
              </InfoCard>
            )}
            <InfoCard title="State veterans minister">
              <p className="font-semibold">{st.stateVeteransMinister.label}</p>
              {st.stateVeteransMinister.note ? (
                <p className="mt-1 text-ink-soft type-body">{st.stateVeteransMinister.note}</p>
              ) : null}
              <Ext href={st.stateVeteransMinister.href} label="Official page" />
            </InfoCard>
            <InfoCard title="State parliament">
              <p className="text-ink-soft type-body">
                {st.findMp.note ?? "State districts are not federal electorates."}
              </p>
              <Ext href={st.findMp.href} label={st.findMp.label} />
              {st.findMpAlt ? <Ext href={st.findMpAlt.href} label={st.findMpAlt.label} /> : null}
            </InfoCard>
            <InfoCard title="Local government">
              {result.councils.length ? (
                <>
                  <p className="text-ink-soft type-body">
                    Council name{result.councils.length > 1 ? "s" : ""} commonly tied to this
                    postcode. Confirm before you write — postcodes cross LGA lines.
                  </p>
                  <ul className="mt-2 list-disc pl-5 type-body">
                    {result.councils.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-ink-soft type-body">
                  No council name is bundled for this postcode. Use the official directory.
                </p>
              )}
              <Ext href={st.findCouncil.href} label={st.findCouncil.label} />
            </InfoCard>
            <InfoCard title="RSL state branch">
              <Ext href={st.rsl.href} label={st.rsl.label} />
            </InfoCard>
          </div>
        </section>
      ))}

      <section>
        <SectionHead icon={Scale} kicker="Advocates and support" title="Use the live registers" />
        <ul className="mt-4 space-y-3">
          {nationalSupports.map((item) => (
            <li key={item.label} className="rounded-md border border-rule bg-card p-4">
              <a
                href={item.href}
                className="font-semibold text-forest underline underline-offset-2"
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {item.label}
              </a>
              {item.note ? <p className="mt-1 text-ink-soft type-body">{item.note}</p> : null}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-ink-soft type-body">
          For a live claim, an ATDP-accredited advocate is usually the better first call than a
          political office.{" "}
          <Link to="/guides/$slug" params={{ slug: "advocates" }} className="font-semibold text-forest underline">
            Advocates guide
          </Link>
          .
        </p>
      </section>

      <section className="rounded-md bg-crisis p-5 text-crisis-fg">
        <p className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
          <PhoneCall className="size-4" /> If you are not safe
        </p>
        <p className="font-display mt-2 text-2xl font-semibold">Open Arms 1800 011 046</p>
        <p className="mt-2 opacity-90 type-body">
          24/7. Or 000. This lookup is not a crisis service.
        </p>
      </section>
    </div>
  );
}

function SectionHead({
  icon: Icon,
  kicker,
  title,
}: {
  icon: typeof MapPin;
  kicker: string;
  title: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-sm bg-paper-2 text-forest">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-sm font-semibold tracking-wide text-forest uppercase">{kicker}</p>
        <h2 className="font-display text-2xl font-semibold">{title}</h2>
      </div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-md border border-rule bg-card p-4">
      <p className="text-sm font-semibold tracking-wide text-forest uppercase">{title}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Ext({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="mt-2 inline-flex min-h-11 items-center font-semibold text-forest underline underline-offset-2"
      target="_blank"
      rel="noreferrer"
    >
      {label}
    </a>
  );
}
