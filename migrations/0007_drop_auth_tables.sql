-- Veteran Assist has no accounts or sign-in. Drop the unused auth tables from
-- migration 0001 so no account, session, IP address or token data can exist.
drop table if exists "verification" cascade;
drop table if exists "account" cascade;
drop table if exists "session" cascade;
drop table if exists "user" cascade;
