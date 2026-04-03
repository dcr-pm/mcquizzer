-- Testimonials table
CREATE TABLE testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  display_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Anyone signed in can read all testimonials
CREATE POLICY "Anyone can read testimonials"
  ON testimonials FOR SELECT
  TO authenticated
  USING (true);

-- Users can insert their own testimonials
CREATE POLICY "Users can insert own testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own testimonials
CREATE POLICY "Users can delete own testimonials"
  ON testimonials FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
