-- =========================================================================
-- Supabase Setup Script for Sadik Hasnat Portfolio
-- =========================================================================
-- How to run this:
-- 1. Go to your Supabase Project: https://supabase.com/dashboard
-- 2. Select your project (aprpzgablollwalnyedt)
-- 3. Click "SQL Editor" on the left sidebar
-- 4. Paste this entire script and click "Run"
-- =========================================================================

-- 1. Create table for portfolio dynamic content
CREATE TABLE IF NOT EXISTS public.portfolio_content (
  id TEXT PRIMARY KEY,
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.portfolio_content ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Allow public read access (for website visitors to view projects & profile)
DROP POLICY IF EXISTS "Allow public read portfolio content" ON public.portfolio_content;
CREATE POLICY "Allow public read portfolio content"
ON public.portfolio_content
FOR SELECT
TO public
USING (true);

-- 4. Policy: Allow insert access for anon key
DROP POLICY IF EXISTS "Allow anon insert portfolio content" ON public.portfolio_content;
CREATE POLICY "Allow anon insert portfolio content"
ON public.portfolio_content
FOR INSERT
TO public
WITH CHECK (true);

-- 5. Policy: Allow update access for anon key
DROP POLICY IF EXISTS "Allow anon update portfolio content" ON public.portfolio_content;
CREATE POLICY "Allow anon update portfolio content"
ON public.portfolio_content
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);
