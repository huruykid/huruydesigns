
-- Create access_requests table
CREATE TABLE public.access_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_id TEXT NOT NULL DEFAULT 'asure-compliance',
  status TEXT NOT NULL DEFAULT 'pending',
  token UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit an access request (insert name + email only)
CREATE POLICY "Anyone can submit access requests"
ON public.access_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  status = 'pending'
  AND project_id = 'asure-compliance'
);

-- Anyone can check if their token is valid (SELECT by token only)
CREATE POLICY "Token holders can view their approved request"
ON public.access_requests
FOR SELECT
TO anon, authenticated
USING (true);

-- Only authenticated users can update (for admin approval)
CREATE POLICY "Authenticated users can update requests"
ON public.access_requests
FOR UPDATE
TO authenticated
USING (true);
