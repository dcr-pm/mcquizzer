-- ==============================================
-- SF Quizzer - Premium Tier Migration
-- Run this in your Supabase SQL Editor
-- ==============================================

-- 1. Add premium columns to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_premium BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS premium_since TIMESTAMPTZ;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

-- 2. Flashcard progress tracking
CREATE TABLE IF NOT EXISTS flashcard_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  flashcard_id TEXT NOT NULL,
  cert_id TEXT NOT NULL,
  mastery TEXT DEFAULT 'new' CHECK (mastery IN ('new', 'learning', 'mastered')),
  last_reviewed TIMESTAMPTZ DEFAULT now(),
  review_count INTEGER DEFAULT 0,
  UNIQUE(user_id, flashcard_id)
);

-- 3. Practice exam history
CREATE TABLE IF NOT EXISTS exam_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  cert_id TEXT NOT NULL,
  cert_name TEXT NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  score_percent INTEGER NOT NULL,
  passed BOOLEAN NOT NULL,
  passing_score INTEGER NOT NULL,
  domain_breakdown JSONB NOT NULL,
  time_taken INTEGER NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Study session tracking
CREATE TABLE IF NOT EXISTS study_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  cert_id TEXT NOT NULL,
  domain_id TEXT,
  questions_reviewed INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Enable RLS
ALTER TABLE flashcard_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_history ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies
CREATE POLICY "Users manage own flashcard progress"
  ON flashcard_progress FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users view own exam history"
  ON exam_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users insert own exam history"
  ON exam_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users manage own study history"
  ON study_history FOR ALL
  USING (auth.uid() = user_id);
