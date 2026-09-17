-- Security hardening from the September 2026 portfolio audit.
-- Idempotent: the production database already carries this state (applied by hand on 2026-09-17).

-- 1. Gated case-study narrative: served by the verify-passcode edge function (service role only).
CREATE TABLE IF NOT EXISTS public.gated_content (
  project_id TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.gated_content ENABLE ROW LEVEL SECURITY;
-- No policies on purpose: anon and authenticated roles can never read it directly.

-- 2. Table-backed rate limiting for edge functions.
CREATE TABLE IF NOT EXISTS public.rate_limits (
  key TEXT PRIMARY KEY,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  count INTEGER NOT NULL DEFAULT 0
);
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.check_rate_limit(p_key TEXT, p_limit INTEGER, p_window_seconds INTEGER)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_now TIMESTAMPTZ := now();
  v_count INTEGER;
BEGIN
  INSERT INTO public.rate_limits (key, window_start, count)
  VALUES (p_key, v_now, 1)
  ON CONFLICT (key) DO UPDATE
    SET count = CASE
                  WHEN public.rate_limits.window_start < v_now - make_interval(secs => p_window_seconds) THEN 1
                  ELSE public.rate_limits.count + 1
                END,
        window_start = CASE
                  WHEN public.rate_limits.window_start < v_now - make_interval(secs => p_window_seconds) THEN v_now
                  ELSE public.rate_limits.window_start
                END
  RETURNING count INTO v_count;
  -- Opportunistic cleanup of stale windows.
  IF random() < 0.01 THEN
    DELETE FROM public.rate_limits WHERE window_start < v_now - INTERVAL '1 day';
  END IF;
  RETURN v_count <= p_limit;
END;
$$;
REVOKE ALL ON FUNCTION public.check_rate_limit(TEXT, INTEGER, INTEGER) FROM PUBLIC, anon, authenticated;

-- 3. The access-request flow is gone: the client never read ?token=, and the anon INSERT
--    policy let callers choose their own approval token.
DROP TABLE IF EXISTS public.access_requests;

-- 4. Case-study images: public read stays; writes are restricted to the site owner.
DROP POLICY IF EXISTS "Authenticated users can insert images" ON public.case_study_images;
DROP POLICY IF EXISTS "Authenticated users can update images" ON public.case_study_images;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON public.case_study_images;
DROP POLICY IF EXISTS "Owner can insert case study images" ON public.case_study_images;
DROP POLICY IF EXISTS "Owner can update case study images" ON public.case_study_images;
DROP POLICY IF EXISTS "Owner can delete case study images" ON public.case_study_images;

CREATE POLICY "Owner can insert case study images"
  ON public.case_study_images FOR INSERT TO authenticated
  WITH CHECK ((auth.jwt() ->> 'email') = 'huruydesigns@gmail.com');
CREATE POLICY "Owner can update case study images"
  ON public.case_study_images FOR UPDATE TO authenticated
  USING ((auth.jwt() ->> 'email') = 'huruydesigns@gmail.com');
CREATE POLICY "Owner can delete case study images"
  ON public.case_study_images FOR DELETE TO authenticated
  USING ((auth.jwt() ->> 'email') = 'huruydesigns@gmail.com');

-- Storage bucket: drop the no-op and authenticated-anyone policies, keep public read, owner-only writes.
DROP POLICY IF EXISTS "Authenticated uploads only" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated updates only" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated deletes only" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload case study images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update case study images" ON storage.objects;
DROP POLICY IF EXISTS "Owner uploads case study images" ON storage.objects;
DROP POLICY IF EXISTS "Owner updates case study images" ON storage.objects;
DROP POLICY IF EXISTS "Owner deletes case study images" ON storage.objects;

CREATE POLICY "Owner uploads case study images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'case-study-images' AND (auth.jwt() ->> 'email') = 'huruydesigns@gmail.com');
CREATE POLICY "Owner updates case study images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'case-study-images' AND (auth.jwt() ->> 'email') = 'huruydesigns@gmail.com');
CREATE POLICY "Owner deletes case study images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'case-study-images' AND (auth.jwt() ->> 'email') = 'huruydesigns@gmail.com');
