-- ==============================================
-- MarketingCloud Quizzer - Supabase Setup Script
-- Run this in your Supabase SQL Editor
-- ==============================================

-- 1. Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  total_quizzes INTEGER DEFAULT 0,
  total_correct INTEGER DEFAULT 0,
  total_questions_answered INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create quiz_history table
CREATE TABLE quiz_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  category_id TEXT NOT NULL,
  category_name TEXT NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  points_earned INTEGER NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create feedback table
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  feedback TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 6. RLS Policies for quiz_history
CREATE POLICY "Users can view their own quiz history"
  ON quiz_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz history"
  ON quiz_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 7. RLS Policies for feedback
CREATE POLICY "Users can insert their own feedback"
  ON feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 8. Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 9. Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 10. Seed initial leaderboard data
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_user_meta_data)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'alex@example.com', crypt('placeholder', gen_salt('bf')), now(), '{"display_name": "Alex Johnson"}'),
  ('00000000-0000-0000-0000-000000000002', 'sam@example.com', crypt('placeholder', gen_salt('bf')), now(), '{"display_name": "Sam Wilson"}'),
  ('00000000-0000-0000-0000-000000000003', 'taylor@example.com', crypt('placeholder', gen_salt('bf')), now(), '{"display_name": "Taylor Reed"}'),
  ('00000000-0000-0000-0000-000000000004', 'jordan@example.com', crypt('placeholder', gen_salt('bf')), now(), '{"display_name": "Jordan Lee"}'),
  ('00000000-0000-0000-0000-000000000005', 'casey@example.com', crypt('placeholder', gen_salt('bf')), now(), '{"display_name": "Casey Smith"}');

-- The trigger will auto-create profiles, now update their points
UPDATE profiles SET points = 2450, level = 25 WHERE id = '00000000-0000-0000-0000-000000000001';
UPDATE profiles SET points = 1980, level = 20 WHERE id = '00000000-0000-0000-0000-000000000002';
UPDATE profiles SET points = 1750, level = 18 WHERE id = '00000000-0000-0000-0000-000000000003';
UPDATE profiles SET points = 1620, level = 17 WHERE id = '00000000-0000-0000-0000-000000000004';
UPDATE profiles SET points = 1480, level = 15 WHERE id = '00000000-0000-0000-0000-000000000005';
