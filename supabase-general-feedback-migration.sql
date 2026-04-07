-- ==============================================
-- SF Quizzer - General Feedback Migration
-- Run this in your Supabase SQL Editor
-- ==============================================

-- 1. General feedback table (separate from quiz question feedback)
CREATE TABLE IF NOT EXISTS general_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  display_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Enable RLS
ALTER TABLE general_feedback ENABLE ROW LEVEL SECURITY;

-- 3. Users can insert their own feedback
CREATE POLICY "Users can insert own feedback"
  ON general_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 4. Only service role can read all feedback (admin dashboard)
-- No SELECT policy for regular users - feedback is write-only for them
