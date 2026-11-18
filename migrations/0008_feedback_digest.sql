-- A read-only summary of feedback for the daily report.
-- It leaves out the contact email and shortens long messages. The report logs in
-- as feedback_reader, a role that can read only this view (created by hand in
-- Neon; its password is not in this repository).
-- Changing a site_feedback column used here needs this view dropped first.
CREATE OR REPLACE VIEW public.feedback_digest AS
SELECT
  created_at,
  kind,
  page_path,
  left(message, 600) AS message,
  (contact IS NOT NULL AND contact <> '') AS left_email
FROM public.site_feedback;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'feedback_reader') THEN
    GRANT SELECT ON public.feedback_digest TO feedback_reader;
  END IF;
END $$;
