-- Rate limiting counters. Keys are an HMAC of the visitor's IP address plus the
-- scope; raw IP addresses are never stored. Rows are tiny and are deleted after
-- two days by the app.
create table if not exists rate_limits (
  scope text not null,
  key_hash text not null,
  bucket bigint not null,
  hits integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (scope, key_hash, bucket)
);

create index if not exists rate_limits_updated_idx on rate_limits (updated_at);
