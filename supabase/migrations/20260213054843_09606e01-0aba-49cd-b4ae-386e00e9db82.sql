
-- Create case_study_images table
CREATE TABLE public.case_study_images (
  project_id TEXT NOT NULL,
  slot TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (project_id, slot)
);

-- Enable RLS
ALTER TABLE public.case_study_images ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Anyone can view images"
  ON public.case_study_images FOR SELECT
  USING (true);

-- Public insert/update (portfolio site, no auth needed)
CREATE POLICY "Anyone can insert images"
  ON public.case_study_images FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update images"
  ON public.case_study_images FOR UPDATE
  USING (true);

-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('case-study-images', 'case-study-images', true);

-- Storage policies: public read
CREATE POLICY "Public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'case-study-images');

-- Storage policies: public upload
CREATE POLICY "Public upload access"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'case-study-images');

-- Storage policies: public update (overwrite)
CREATE POLICY "Public update access"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'case-study-images');
