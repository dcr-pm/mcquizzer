-- Inbound emails table for Resend webhook
CREATE TABLE IF NOT EXISTS inbound_emails (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  resend_email_id text,
  from_email text NOT NULL,
  from_name text,
  to_email text NOT NULL,
  subject text,
  body_text text,
  body_html text,
  headers jsonb,
  created_at timestamptz DEFAULT now()
);

-- Index for querying by date and sender
CREATE INDEX idx_inbound_emails_created_at ON inbound_emails(created_at DESC);
CREATE INDEX idx_inbound_emails_from ON inbound_emails(from_email);

-- RLS: only service role can insert (webhook)
ALTER TABLE inbound_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on inbound_emails"
  ON inbound_emails
  FOR ALL
  USING (true)
  WITH CHECK (true);
