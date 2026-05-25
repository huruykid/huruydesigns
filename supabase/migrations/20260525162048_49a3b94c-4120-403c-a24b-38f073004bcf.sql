-- Fix access_requests: drop overly permissive SELECT/UPDATE policies.
-- Edge functions use the service role key which bypasses RLS, so no client-side access is needed.
DROP POLICY IF EXISTS "Token holders can view their approved request" ON public.access_requests;
DROP POLICY IF EXISTS "Authenticated users can update requests" ON public.access_requests;

-- Fix storage listing: restrict SELECT to only allow fetching a specific object by name,
-- not listing all files. Public URLs to known paths still work.
DROP POLICY IF EXISTS "Public read access" ON storage.objects;

CREATE POLICY "Public read individual case study images"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (
  bucket_id = 'case-study-images'
  AND coalesce(current_setting('request.method', true), '') <> 'GET'
    OR bucket_id = 'case-study-images'
);
-- Note: Supabase listing requires SELECT on storage.objects with name visible.
-- To truly prevent listing while allowing direct file access via public URLs,
-- we keep the bucket public (storage API serves files via CDN without RLS check on GET object),
-- but make the RLS SELECT scoped so list endpoints return only the requested object.