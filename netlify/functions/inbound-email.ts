import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const RESEND_API_KEY = process.env.RESEND_API_KEY!;

export async function handler(event: any) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const payload = JSON.parse(event.body || '{}');

    if (payload.type !== 'email.received') {
      return { statusCode: 200, body: JSON.stringify({ ignored: true }) };
    }

    const { email_id, from, to, subject } = payload.data;

    // Fetch full email content from Resend API (webhook only has metadata)
    const resendRes = await fetch(`https://api.resend.com/emails/${email_id}`, {
      headers: { Authorization: `Bearer ${RESEND_API_KEY}` },
    });

    let bodyText = '';
    let bodyHtml = '';
    let headers = null;

    if (resendRes.ok) {
      const emailData = await resendRes.json();
      bodyText = emailData.text || '';
      bodyHtml = emailData.html || '';
      headers = emailData.headers || null;
    }

    // Parse "from" field - can be "Name <email>" string
    let fromEmail = from || '';
    let fromName = '';
    const fromMatch = from?.match(/^(.+?)\s*<(.+?)>$/);
    if (fromMatch) {
      fromName = fromMatch[1].trim();
      fromEmail = fromMatch[2].trim();
    }

    // Parse "to" field - array of strings
    const toEmail = Array.isArray(to) ? to[0] : (to || '');

    const { error } = await supabase.from('inbound_emails').insert({
      resend_email_id: email_id,
      from_email: fromEmail,
      from_name: fromName,
      to_email: toEmail,
      subject: subject || '(no subject)',
      body_text: bodyText,
      body_html: bodyHtml,
      headers,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to save email' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err: any) {
    console.error('Inbound email error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
