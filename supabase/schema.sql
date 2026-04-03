-- ============================================================
-- Scriva — Supabase Database Schema (3-Tier Plan)
-- Run this in your Supabase SQL editor to set up the database.
-- ============================================================

-- Users table (3-tier: starter / creator / agency)
CREATE TABLE IF NOT EXISTS public.users (
  id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id           TEXT UNIQUE NOT NULL,
  email                   TEXT NOT NULL,
  plan_type               TEXT NOT NULL DEFAULT 'starter'
                            CHECK (plan_type IN ('starter', 'creator', 'agency')),
  scripts_used_this_month INTEGER NOT NULL DEFAULT 0,
  billing_cycle_start     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  stripe_customer_id      TEXT,
  stripe_subscription_id  TEXT,
  brand_voice             TEXT,   -- Agency tier: custom brand voice prompt
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Scripts table
CREATE TABLE IF NOT EXISTS public.scripts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     TEXT NOT NULL REFERENCES public.users(clerk_user_id) ON DELETE CASCADE,
  title       TEXT NOT NULL,          -- topic / subject of the script
  script_type TEXT NOT NULL,          -- YouTube, TikTok, VSL, etc.
  content     TEXT NOT NULL,          -- the generated script body
  tone        TEXT NOT NULL,
  language    TEXT NOT NULL DEFAULT 'English',
  tokens_used INTEGER NOT NULL DEFAULT 0,  -- OpenAI tokens consumed
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_clerk_user_id
  ON public.users(clerk_user_id);

CREATE INDEX IF NOT EXISTS idx_scripts_user_id_created
  ON public.scripts(user_id, created_at DESC);

-- Auto-update updated_at on users
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Row Level Security
-- ============================================================
ALTER TABLE public.users   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scripts ENABLE ROW LEVEL SECURITY;

-- NOTE: API routes use the service-role key (supabaseAdmin) which bypasses RLS.
-- These policies protect direct browser / anon-key access.

-- Users: read & update own row only
DROP POLICY IF EXISTS "Users can read own record"  ON public.users;
DROP POLICY IF EXISTS "Users can update own record" ON public.users;

CREATE POLICY "Users can read own record"
  ON public.users FOR SELECT
  USING (clerk_user_id = current_setting('request.jwt.claims', true)::jsonb->>'sub');

CREATE POLICY "Users can update own record"
  ON public.users FOR UPDATE
  USING (clerk_user_id = current_setting('request.jwt.claims', true)::jsonb->>'sub');

-- Scripts: full CRUD on own scripts only
DROP POLICY IF EXISTS "Users can read own scripts"   ON public.scripts;
DROP POLICY IF EXISTS "Users can insert own scripts" ON public.scripts;
DROP POLICY IF EXISTS "Users can delete own scripts" ON public.scripts;

CREATE POLICY "Users can read own scripts"
  ON public.scripts FOR SELECT
  USING (user_id = current_setting('request.jwt.claims', true)::jsonb->>'sub');

CREATE POLICY "Users can insert own scripts"
  ON public.scripts FOR INSERT
  WITH CHECK (user_id = current_setting('request.jwt.claims', true)::jsonb->>'sub');

CREATE POLICY "Users can delete own scripts"
  ON public.scripts FOR DELETE
  USING (user_id = current_setting('request.jwt.claims', true)::jsonb->>'sub');

-- ============================================================
-- Migration helper: if upgrading from the old schema run these
-- ============================================================
-- ALTER TABLE public.users   ADD COLUMN IF NOT EXISTS brand_voice TEXT;
-- ALTER TABLE public.users   DROP CONSTRAINT IF EXISTS users_plan_type_check;
-- ALTER TABLE public.users   ADD CONSTRAINT users_plan_type_check
--   CHECK (plan_type IN ('starter', 'creator', 'agency'));
-- UPDATE public.users SET plan_type = 'starter' WHERE plan_type = 'free';
-- UPDATE public.users SET plan_type = 'creator' WHERE plan_type = 'pro';
-- ALTER TABLE public.scripts ADD COLUMN IF NOT EXISTS title TEXT NOT NULL DEFAULT '';
-- ALTER TABLE public.scripts ADD COLUMN IF NOT EXISTS content TEXT NOT NULL DEFAULT '';
-- ALTER TABLE public.scripts ADD COLUMN IF NOT EXISTS tokens_used INTEGER NOT NULL DEFAULT 0;
