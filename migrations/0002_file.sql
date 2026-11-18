create table if not exists veteran_claims (
  id text primary key,
  user_id text not null,
  title text not null,
  claim_type text not null,
  claim_number text,
  lodged_on date,
  status text not null default 'open',
  last_contact_on date,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists veteran_claims_user_id_idx on veteran_claims (user_id);

create table if not exists claim_events (
  id text primary key,
  claim_id text not null,
  user_id text not null,
  happened_on date not null,
  kind text not null,
  note text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists claim_events_claim_id_idx on claim_events (claim_id);
create index if not exists claim_events_user_id_idx on claim_events (user_id);
