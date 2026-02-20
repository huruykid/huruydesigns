
-- Fix case_study_images RLS: keep public read, restrict write to authenticated users
DROP POLICY IF EXISTS "Anyone can insert images" ON public.case_study_images;
DROP POLICY IF EXISTS "Anyone can update images" ON public.case_study_images;

CREATE POLICY "Authenticated users can insert images"
  ON public.case_study_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update images"
  ON public.case_study_images FOR UPDATE
  TO authenticated
  USING (true);

-- Fix storage bucket policies: keep public read, restrict write to authenticated users
DROP POLICY IF EXISTS "Public upload access" ON storage.objects;
DROP POLICY IF EXISTS "Public update access" ON storage.objects;

CREATE POLICY "Authenticated uploads only"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'case-study-images');

CREATE POLICY "Authenticated updates only"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'case-study-images');
