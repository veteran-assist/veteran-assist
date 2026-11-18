import { useEffect, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  addClaim,
  addEvent,
  deleteClaim,
  isFilePersisted,
  listClaims,
  listEvents,
  setFilePersisted,
  updateClaim,
  wipeFile,
  type ClaimRow,
  type EventRow,
} from "@/lib/file-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Disclaimer } from "@/components/disclaimer";
import { clockIdForClaimType } from "@/content/deadlines";
import { pageTitle } from "@/lib/brand";

export const Route = createFileRoute("/file")({
  component: FilePage,
  head: () => ({
    meta: [
      { title: pageTitle("My file") },
      {
        name: "description",
        content: "A private notepad in this browser. Claim numbers never leave the device.",
      },
    ],
  }),
});

const TYPES = ["Liability", "PI", "Incapacity", "ASP / hardship", "HHS", "FOI", "Appeal", "Other"];
const STATUSES = ["open", "waiting on me", "waiting on DVA", "decision", "closed"];
const EVENT_KINDS = ["lodged", "called", "emailed", "info request", "decision", "note"];

function daysSince(date: string | null) {
  if (!date) return null;
  const then = new Date(date.length === 10 ? `${date}T00:00:00` : date);
  if (Number.isNaN(then.getTime())) return null;
  return Math.max(0, Math.floor((Date.now() - then.getTime()) / 86400000));
}

function FilePage() {
  const [claims, setClaims] = useState<ClaimRow[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [persist, setPersist] = useState(false);

  function refresh() {
    setClaims(listClaims());
    setPersist(isFilePersisted());
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <h1 className="font-display text-4xl font-semibold tracking-tight">My file</h1>
      <p className="mt-2 text-lg leading-7 text-ink-soft">
        A private notepad on <em>this</em> browser. Claim numbers never leave the device. Not sent
        to Veteran Assist, not sent to DVA.
      </p>
      <p className="mt-2 type-body text-ink-soft">
        Date first raised and date of last substantive response are the two dates this page tracks.
        The elapsed time is worked out from them.
      </p>
      <div className="mt-4 rounded-md border border-forest/30 bg-info-bg px-4 py-3 type-body">
        <p>
          Default: notes disappear when you close the browser. Tick “keep on this device” only on a
          computer you control. Anyone with this browser profile can read it.
        </p>
        <label className="mt-3 flex items-start gap-2">
          <input
            type="checkbox"
            className="mt-1 size-4 accent-forest"
            checked={persist}
            onChange={(e) => {
              setFilePersisted(e.target.checked);
              setPersist(e.target.checked);
              toast.message(
                e.target.checked
                  ? "File will stay in this browser until you wipe it."
                  : "File will clear when this browser session ends.",
              );
            }}
          />
          <span>Keep on this device until I wipe it</span>
        </label>
        <button
          type="button"
          className="mt-3 font-semibold text-forest underline underline-offset-2"
          onClick={() => {
            if (!window.confirm("Erase every claim and note stored in this browser? This cannot be undone.")) {
              return;
            }
            wipeFile();
            setOpenId(null);
            refresh();
            toast.success("This browser’s file is empty.");
          }}
        >
          Wipe this browser’s file now
        </button>
        {" · "}
        <Link to="/privacy" className="font-semibold text-forest underline underline-offset-2">
          Privacy
        </Link>
      </div>
      <NewClaimForm onCreated={refresh} />
      <div className="mt-8 space-y-3">
        {claims.length === 0 ? (
          <p className="rounded-md border border-rule bg-card p-5 text-ink-soft">
            No claims in this browser. Add one above, or start with the{" "}
            <Link to="/pathfinder" className="text-forest underline">
              Pathfinder
            </Link>
            .
          </p>
        ) : null}
        {claims.map((c) => (
          <ClaimCard
            key={c.id}
            claim={c}
            open={openId === c.id}
            onToggle={() => setOpenId(openId === c.id ? null : c.id)}
            onChanged={refresh}
          />
        ))}
      </div>
      <div className="mt-10">
        <Disclaimer />
      </div>
    </main>
  );
}

function NewClaimForm({ onCreated }: { onCreated: () => void }) {
  const [title, setTitle] = useState("");
  const [claimType, setClaimType] = useState(TYPES[0]);
  const [claimNumber, setClaimNumber] = useState("");
  const [lodgedOn, setLodgedOn] = useState("");
  const [firstRaisedOn, setFirstRaisedOn] = useState("");
  const [lastSubstantiveOn, setLastSubstantiveOn] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      addClaim({
        title,
        claimType,
        claimNumber,
        lodgedOn,
        firstRaisedOn: firstRaisedOn || lodgedOn,
        lastSubstantiveOn,
        notes: "",
      });
      setTitle("");
      setClaimNumber("");
      setLodgedOn("");
      setFirstRaisedOn("");
      setLastSubstantiveOn("");
      toast.success("Saved in this browser only");
      onCreated();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      className="mt-6 grid gap-3 rounded-md border border-rule bg-card p-4 sm:grid-cols-2"
    >
      <div className="sm:col-span-2">
        <Label htmlFor="title">What is this claim</Label>
        <Input
          id="title"
          className="mt-1"
          value={title}
          autoComplete="off"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Right knee PI"
          required
        />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <select
          id="type"
          className="mt-1 h-11 w-full rounded-sm border border-rule bg-card px-3"
          value={claimType}
          onChange={(e) => setClaimType(e.target.value)}
        >
          {TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="num">Claim number</Label>
        <Input
          id="num"
          className="mt-1"
          value={claimNumber}
          autoComplete="off"
          onChange={(e) => setClaimNumber(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="lodged">Lodged on</Label>
        <Input
          id="lodged"
          type="date"
          className="mt-1"
          value={lodgedOn}
          onChange={(e) => {
            setLodgedOn(e.target.value);
            if (!firstRaisedOn) setFirstRaisedOn(e.target.value);
          }}
        />
      </div>
      <div>
        <Label htmlFor="first-raised">Date first raised</Label>
        <Input
          id="first-raised"
          type="date"
          className="mt-1"
          value={firstRaisedOn}
          onChange={(e) => setFirstRaisedOn(e.target.value)}
        />
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="last-sub">Date of last substantive response</Label>
        <Input
          id="last-sub"
          type="date"
          className="mt-1"
          value={lastSubstantiveOn}
          onChange={(e) => setLastSubstantiveOn(e.target.value)}
        />
        <p className="mt-1 text-xs text-muted">
          A decision, information request, or anything that moved the file — not a “we have received
          your email”.
        </p>
      </div>
      <div className="flex items-end">
        <Button type="submit">Add to this browser</Button>
      </div>
    </form>
  );
}

function ClaimCard({
  claim,
  open,
  onToggle,
  onChanged,
}: {
  claim: ClaimRow;
  open: boolean;
  onToggle: () => void;
  onChanged: () => void;
}) {
  const raised = daysSince(claim.first_raised_on ?? claim.lodged_on);
  const sinceSubstantive = daysSince(claim.last_substantive_on);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [kind, setKind] = useState(EVENT_KINDS[0]);
  const [happenedOn, setHappenedOn] = useState(() => new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");
  const [firstRaised, setFirstRaised] = useState(claim.first_raised_on ?? "");
  const [lastSub, setLastSub] = useState(claim.last_substantive_on ?? "");

  useEffect(() => {
    if (!open) return;
    setEvents(listEvents(claim.id));
    setFirstRaised(claim.first_raised_on ?? "");
    setLastSub(claim.last_substantive_on ?? "");
  }, [open, claim.id, claim.first_raised_on, claim.last_substantive_on]);

  function onAddEvent(e: FormEvent) {
    e.preventDefault();
    addEvent({ claimId: claim.id, happenedOn, kind, note });
    setNote("");
    setEvents(listEvents(claim.id));
    onChanged();
  }

  return (
    <article className="rounded-md border border-rule bg-card">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 p-4 text-left"
      >
        <span>
          <span className="font-display block text-xl font-semibold">{claim.title}</span>
          <span className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
            <Badge>{claim.claim_type}</Badge>
            {claim.claim_number ? <span className="tabular-nums">{claim.claim_number}</span> : null}
            {raised !== null ? <span>{raised} days since first raised</span> : null}
            {sinceSubstantive !== null ? (
              <span>{sinceSubstantive} days since last substantive response</span>
            ) : (
              <span>No substantive response recorded</span>
            )}
          </span>
        </span>
        <Badge variant={claim.status === "decision" ? "default" : "paper"}>{claim.status}</Badge>
      </button>
      {open ? (
        <div className="border-t border-rule p-4">
          <div className="flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                className="rounded-sm border border-rule px-2 py-1 text-xs"
                onClick={() => {
                  updateClaim({ id: claim.id, status: s });
                  onChanged();
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor={`raised-${claim.id}`}>Date first raised</Label>
              <Input
                id={`raised-${claim.id}`}
                type="date"
                className="mt-1"
                value={firstRaised}
                onChange={(e) => {
                  setFirstRaised(e.target.value);
                  updateClaim({ id: claim.id, firstRaisedOn: e.target.value });
                  onChanged();
                }}
              />
            </div>
            <div>
              <Label htmlFor={`sub-${claim.id}`}>Last substantive response</Label>
              <Input
                id={`sub-${claim.id}`}
                type="date"
                className="mt-1"
                value={lastSub}
                onChange={(e) => {
                  setLastSub(e.target.value);
                  updateClaim({ id: claim.id, lastSubstantiveOn: e.target.value });
                  onChanged();
                }}
              />
            </div>
          </div>
          {(claim.last_substantive_on || claim.lodged_on) && (
            <p className="mt-4 type-body">
              <Link
                to="/deadlines"
                search={{
                  clock: clockIdForClaimType(claim.claim_type),
                  letter: claim.last_substantive_on || claim.lodged_on || undefined,
                }}
                className="font-semibold text-forest underline underline-offset-2"
              >
                Count this letter
              </Link>{" "}
              on Deadlines — uses the last substantive date if you have one, otherwise the lodged
              date. Check the clock type matches the letter in front of you.
            </p>
          )}
          <ul className="mt-4 space-y-2 type-body">
            {events.map((ev) => (
              <li key={ev.id} className="border-l-2 border-forest/40 pl-3">
                <span className="font-medium">{ev.kind}</span>
                <span className="ml-2 text-muted tabular-nums">{ev.happened_on}</span>
                {ev.note ? <p className="text-ink-soft">{ev.note}</p> : null}
              </li>
            ))}
          </ul>
          <form onSubmit={onAddEvent} autoComplete="off" className="mt-4 grid gap-2 sm:grid-cols-2">
            <select
              aria-label="What kind of event"
              className="h-11 rounded-sm border border-rule bg-card px-3"
              value={kind}
              onChange={(e) => setKind(e.target.value)}
            >
              {EVENT_KINDS.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
            <Input
              type="date"
              aria-label="Date it happened"
              value={happenedOn}
              onChange={(e) => setHappenedOn(e.target.value)}
            />
            <Textarea
              aria-label="What happened"
              className="min-h-20 sm:col-span-2"
              placeholder="What happened"
              value={note}
              autoComplete="off"
              onChange={(e) => setNote(e.target.value)}
            />
            <Button type="submit" size="sm">
              Add event
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => {
                if (!window.confirm("Remove this claim from this browser?")) return;
                deleteClaim(claim.id);
                onChanged();
              }}
            >
              Remove
            </Button>
          </form>
        </div>
      ) : null}
    </article>
  );
}
