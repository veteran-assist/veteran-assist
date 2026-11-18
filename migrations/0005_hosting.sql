-- Voluntary hosting contributions for the current calendar month only.
-- Amount and reference only. No names, claim numbers, or PayID of the sender.
create table if not exists hosting_contributions (
  id text primary key,
  created_at timestamptz not null default now(),
  month_key text not null,
  amount_cents integer not null,
  status text not null default 'pledged',
  reference text not null unique,
  source text not null default 'visitor',
  note text
);

create index if not exists hosting_contributions_month_idx
  on hosting_contributions (month_key, status);
