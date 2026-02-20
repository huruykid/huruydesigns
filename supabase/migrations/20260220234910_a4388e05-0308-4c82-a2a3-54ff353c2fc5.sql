
-- Add DELETE policy for case_study_images (authenticated only)
CREATE POLICY "Authenticated users can delete images"
  ON public.case_study_images FOR DELETE
  TO authenticated
  USING (true);

-- Add DELETE policy for storage bucket (authenticated only)
CREATE POLICY "Authenticated deletes only"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'case-study-images');
