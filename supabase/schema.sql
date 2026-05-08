-- ============================================================
-- Scriva — Supabase Database Schema (3-Tier Plan)
-- Run this in your Supabase SQL editor to set up the database.
-- ============================================================

-- ============================================================
-- 1. TABLES
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
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  script_type TEXT NOT NULL,
  content     TEXT NOT NULL,
  tone        TEXT NOT NULL,
  language    TEXT NOT NULL DEFAULT 'English',
  tokens_used INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Guest usage table (비로그인 체험 — IP + 날짜 기준 하루 3개 제한)
CREATE TABLE IF NOT EXISTS public.guest_usage (
  ip    TEXT NOT NULL,
  date  DATE NOT NULL,
  count INTEGER NOT NULL DEFAULT 1,
  PRIMARY KEY (ip, date)
);

-- ============================================================
-- 2. INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_users_clerk_user_id
  ON public.users(clerk_user_id);

CREATE INDEX IF NOT EXISTS idx_scripts_user_id_created
  ON public.scripts(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_guest_usage_date
  ON public.guest_usage(date);

-- ============================================================
-- 3. TRIGGERS
-- ============================================================

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
-- 4. ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.users       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scripts     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_usage ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------
-- users: 자기 row만 읽기/수정
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Users can read own record"   ON public.users;
DROP POLICY IF EXISTS "Users can update own record" ON public.users;

CREATE POLICY "Users can read own record"
  ON public.users FOR SELECT
  USING (clerk_user_id = current_setting('request.jwt.claims', true)::jsonb->>'sub');

CREATE POLICY "Users can update own record"
  ON public.users FOR UPDATE
  USING (clerk_user_id = current_setting('request.jwt.claims', true)::jsonb->>'sub');

-- ------------------------------------------------------------
-- scripts: all access via service_role (API server only)
-- RLS blocks direct anon/authenticated access from the browser.
-- All reads/writes go through API routes using supabaseAdmin (service_role).
-- ------------------------------------------------------------
DROP POLICY IF EXISTS "Users can read own scripts"   ON public.scripts;
DROP POLICY IF EXISTS "Users can insert own scripts" ON public.scripts;
DROP POLICY IF EXISTS "Users can delete own scripts" ON public.scripts;
-- No policies needed: service_role bypasses RLS entirely.
-- Leaving RLS enabled with no policies = deny all non-service_role access.

-- ------------------------------------------------------------
-- guest_usage: service_role(API)만 접근 — anon 직접 접근 차단
-- (별도 policy 없음 = authenticated/anon 접근 불가, service_role만 우회)
-- ------------------------------------------------------------

-- ============================================================
-- 5. MIGRATION HELPER (run in Supabase SQL editor to upgrade existing schema)
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
-- CREATE TABLE IF NOT EXISTS public.guest_usage (ip TEXT NOT NULL, date DATE NOT NULL, count INTEGER NOT NULL DEFAULT 1, PRIMARY KEY (ip, date));
-- ALTER TABLE public.guest_usage ENABLE ROW LEVEL SECURITY;
--
-- If scripts.user_id was TEXT referencing clerk_user_id, migrate to UUID:
-- Step 1: Drop old FK and policies
-- ALTER TABLE public.scripts DROP CONSTRAINT IF EXISTS scripts_user_id_fkey;
-- DROP POLICY IF EXISTS "Users can read own scripts"   ON public.scripts;
-- DROP POLICY IF EXISTS "Users can insert own scripts" ON public.scripts;
-- DROP POLICY IF EXISTS "Users can delete own scripts" ON public.scripts;
-- Step 2: Convert column to UUID FK referencing users(id)
-- ALTER TABLE public.scripts ALTER COLUMN user_id TYPE UUID USING (
--   (SELECT id FROM public.users WHERE clerk_user_id = scripts.user_id LIMIT 1)
-- );
-- ALTER TABLE public.scripts ADD CONSTRAINT scripts_user_id_fkey
--   FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
