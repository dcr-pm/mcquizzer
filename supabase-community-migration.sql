-- ==============================================
-- SF Quizzer - Community Features Migration
-- Run this in your Supabase SQL Editor
-- ==============================================

-- 1. Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  subscribed BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Blog posts (managed by founder in Supabase table editor)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Darren Ross',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies
CREATE POLICY "Users manage own newsletter subscription"
  ON newsletter_subscribers FOR ALL
  USING (auth.uid() = user_id);

-- Blog posts are readable by all authenticated users
CREATE POLICY "Anyone can read published blog posts"
  ON blog_posts FOR SELECT
  USING (published = true);
