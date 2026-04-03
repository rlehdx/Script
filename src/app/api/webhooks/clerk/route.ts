import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error('[clerk-webhook] CLERK_WEBHOOK_SECRET is not set');
    return new Response('CLERK_WEBHOOK_SECRET not configured', { status: 500 });
  }

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('[clerk-webhook] Supabase env vars missing');
    return new Response('Supabase not configured', { status: 500 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('[clerk-webhook] Signature verification failed:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  if (evt.type === 'user.created') {
    const { id, email_addresses } = evt.data;

    // email_addresses may be empty in test webhooks — use fallback
    const email = email_addresses?.[0]?.email_address ?? `${id}@unknown.local`;

    console.log('[clerk-webhook] Creating user:', { id, email });

    const { error } = await supabase.from('users').upsert(
      {
        clerk_user_id: id,
        email,
        plan_type: 'starter',
        scripts_used_this_month: 0,
        billing_cycle_start: new Date().toISOString(),
      },
      { onConflict: 'clerk_user_id', ignoreDuplicates: true }
    );

    if (error) {
      console.error('[clerk-webhook] Supabase insert error:', JSON.stringify(error));
      return new Response(`Database Error: ${error.message}`, { status: 500 });
    }

    console.log('[clerk-webhook] User created successfully:', id);
  }

  return new Response('Success', { status: 200 });
}
