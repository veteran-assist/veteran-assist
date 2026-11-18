-- Voluntary site feedback only. No claim files. No accounts.
create table if not exists site_feedback (
  id text primary key,
  created_at timestamptz not null default now(),
  kind text not null,
  page_path text not null default '',
  message text not null,
  contact text,
  status text not null default 'new'
);

create index if not exists site_feedback_created_at_idx on site_feedback (created_at desc);
