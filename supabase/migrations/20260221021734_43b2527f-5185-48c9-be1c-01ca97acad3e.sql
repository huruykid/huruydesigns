-- Drop existing upload/update policies on storage that don't restrict file types
DROP POLICY IF EXISTS "Authenticated users can upload case study images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update case study images" ON storage.objects;

-- Recreate with file type restrictions
CREATE POLICY "Authenticated users can upload case study images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'case-study-images' AND
    (storage.extension(name) IN ('png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'))
  );

CREATE POLICY "Authenticated users can update case study images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'case-study-images' AND
    (storage.extension(name) IN ('png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'))
  );