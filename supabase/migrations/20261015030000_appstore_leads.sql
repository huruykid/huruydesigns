-- Intake leads from huruy.tech/appstore.
-- Written only by the appstore-lead edge function (service role). RLS is on with no
-- policies, so the browser's publishable key can neither read nor write this table.
CREATE TABLE IF NOT EXISTS public.appstore_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254),
  app_url text NOT NULL CHECK (char_length(app_url) BETWEEN 8 AND 500),
  stage text NOT NULL CHECK (stage IN ('not-submitted', 'rejected', 'testflight', 'not-started')),
  developer_account text CHECK (developer_account IS NULL OR char_length(developer_account) <= 80),
  details text CHECK (details IS NULL OR char_length(details) <= 2000),
  notified boolean NOT NULL DEFAULT false
);

ALTER TABLE public.appstore_leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS appstore_leads_created_at_idx ON public.appstore_leads (created_at DESC);
