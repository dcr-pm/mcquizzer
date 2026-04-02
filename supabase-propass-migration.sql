-- ==============================================
-- SF Quizzer - ProPass Codes Migration
-- Run this in your Supabase SQL Editor
-- ==============================================

-- 1. ProPass codes table
CREATE TABLE IF NOT EXISTS propass_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  max_uses INTEGER DEFAULT NULL,  -- NULL = unlimited
  times_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. ProPass redemption log
CREATE TABLE IF NOT EXISTS propass_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code_id UUID REFERENCES propass_codes(id),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  redeemed_at TIMESTAMPTZ DEFAULT now()
);

-- 3. No RLS on propass_codes — accessed via service role key only
-- (serverless function uses SUPABASE_SERVICE_ROLE_KEY which bypasses RLS)

-- 4. Insert your ProPass codes
INSERT INTO propass_codes (code, description, max_uses) VALUES
  ('BETATESTER', 'Beta testers - unlimited uses', NULL),
  ('FRIENDS100', 'Friends & family access', 50),
  ('SFQUIZFREE', 'Free access promo code', 100);
