-- Leads captured by the /appstore chat assistant.
-- One row per conversation, written only by the appstore-chat edge function (service
-- role) as the visitor shares details; RLS is on with no policies, so the browser's
-- publishable key can neither read nor write it.
CREATE TABLE IF NOT EXISTS public.appstore_chat_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL UNIQUE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  name text CHECK (name IS NULL OR char_length(name) <= 120),
  email text CHECK (email IS NULL OR char_length(email) <= 254),
  phone text CHECK (phone IS NULL OR char_length(phone) <= 40),
  app_name text CHECK (app_name IS NULL OR char_length(app_name) <= 120),
  app_link text CHECK (app_link IS NULL OR char_length(app_link) <= 500),
  stack text CHECK (stack IS NULL OR char_length(stack) <= 80),
  stage text CHECK (stage IS NULL OR stage IN ('not-submitted', 'rejected', 'testflight', 'not-started', 'unknown')),
  guidelines text[] NOT NULL DEFAULT '{}',
  issue_summary text CHECK (issue_summary IS NULL OR char_length(issue_summary) <= 1500),
  interest text CHECK (interest IS NULL OR interest IN ('interested', 'exploring', 'not-now', 'unknown')),
  package_fit text CHECK (package_fit IS NULL OR char_length(package_fit) <= 80),
  developer_account text CHECK (developer_account IS NULL OR char_length(developer_account) <= 80),
  turns integer NOT NULL DEFAULT 0,
  transcript jsonb NOT NULL DEFAULT '[]'::jsonb,
  notified boolean NOT NULL DEFAULT false
);

ALTER TABLE public.appstore_chat_leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS appstore_chat_leads_created_at_idx ON public.appstore_chat_leads (created_at DESC);
CREATE INDEX IF NOT EXISTS appstore_chat_leads_email_idx ON public.appstore_chat_leads (email) WHERE email IS NOT NULL;
