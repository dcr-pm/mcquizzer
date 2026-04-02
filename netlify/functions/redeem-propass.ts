import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function handler(event: any) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { userId, code } = JSON.parse(event.body || '{}');

    if (!userId || !code) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing userId or code' }),
      };
    }

    // Look up the code in the propass_codes table
    const { data: propass, error: lookupError } = await supabase
      .from('propass_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .single();

    if (lookupError || !propass) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Invalid ProPass code.' }),
      };
    }

    // Check if code is active
    if (!propass.is_active) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'This ProPass code has been deactivated.' }),
      };
    }

    // Check if code has reached max uses
    if (propass.max_uses !== null && propass.times_used >= propass.max_uses) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'This ProPass code has reached its maximum uses.' }),
      };
    }

    // Check if user is already premium
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_premium')
      .eq('id', userId)
      .single();

    if (profile?.is_premium) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'You already have premium access!' }),
      };
    }

    // Grant premium access
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        is_premium: true,
        premium_since: new Date().toISOString(),
      })
      .eq('id', userId);

    if (updateError) {
      console.error('Failed to grant premium:', updateError);
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Failed to activate premium. Please try again.' }),
      };
    }

    // Increment usage count and log redemption
    await supabase
      .from('propass_codes')
      .update({ times_used: propass.times_used + 1 })
      .eq('id', propass.id);

    await supabase.from('propass_redemptions').insert({
      code_id: propass.id,
      user_id: userId,
      code: code.toUpperCase(),
    });

    console.log(`ProPass ${code} redeemed by user ${userId}`);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (error: any) {
    console.error('ProPass redemption error:', error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message }),
    };
  }
}
