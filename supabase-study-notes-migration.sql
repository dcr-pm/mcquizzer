-- ==============================================
-- SF Quizzer - Study Notes Migration
-- Run this in your Supabase SQL Editor
-- ==============================================

-- 1. Study notes table (one note per user per question)
CREATE TABLE IF NOT EXISTS study_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_text TEXT NOT NULL,
  note TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, question_text)
);

-- 2. Enable RLS
ALTER TABLE study_notes ENABLE ROW LEVEL SECURITY;

-- 3. Users can read their own notes
CREATE POLICY "Users can read own notes"
  ON study_notes FOR SELECT
  USING (auth.uid() = user_id);

-- 4. Users can insert their own notes
CREATE POLICY "Users can insert own notes"
  ON study_notes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 5. Users can update their own notes
CREATE POLICY "Users can update own notes"
  ON study_notes FOR UPDATE
  USING (auth.uid() = user_id);

-- 6. Users can delete their own notes
CREATE POLICY "Users can delete own notes"
  ON study_notes FOR DELETE
  USING (auth.uid() = user_id);
