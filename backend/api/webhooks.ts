import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const router = Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil' as Parameters<typeof Stripe>[1]['apiVersion'],
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const relevantEvents = new Set([
  'checkout.session.completed',
  'invoice.paid',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'customer.deleted',
]);

function createServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

/**
 * POST /api/webhooks/stripe
 *
 * Handles Stripe webhook events.
 * NOTE: This route requires raw body parsing (set up in server.ts).
 */
router.post('/stripe', async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    res.status(400).json({ error: 'Missing stripe-signature header' });
    return;
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body as Buffer, sig, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    res.status(400).json({
      error: err instanceof Error ? err.message : 'Webhook signature verification failed',
    });
    return;
  }

  if (!relevantEvents.has(event.type)) {
    res.json({ received: true, processed: false });
    return;
  }

  const supabase = createServiceClient();

  try {
    // Idempotency check
    const { data: existingEvent } = await supabase
      .from('stripe_webhook_events')
      .select('event_id, processed_at')
      .eq('event_id', event.id)
      .maybeSingle();

    if (existingEvent?.processed_at) {
      res.json({ received: true, processed: false, reason: 'already_processed' });
      return;
    }

    if (!existingEvent) {
      await supabase.from('stripe_webhook_events').insert({
        event_id: event.id,
        event_type: event.type,
      });
    }

    // Handle events
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === 'subscription') {
          const subscriptionId = session.subscription as string;
          const customerId = session.customer as string;
          await handleSubscriptionChange(supabase, subscriptionId, customerId);
        }
        break;
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionChange(supabase, subscription.id, subscription.customer as string);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await supabase
          .from('subscriptions')
          .update({ subscription_status: 'canceled', subscription_plan: 'free' })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }
      case 'customer.deleted': {
        const customer = event.data.object as Stripe.Customer;
        await supabase
          .from('subscriptions')
          .update({ stripe_customer_id: null, stripe_subscription_id: null })
          .eq('stripe_customer_id', customer.id);
        break;
      }
    }

    // Mark event as processed
    await supabase
      .from('stripe_webhook_events')
      .update({ processed_at: new Date().toISOString() })
      .eq('event_id', event.id);

    res.json({ received: true, processed: true });
  } catch (error) {
    console.error('Stripe webhook processing error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Webhook processing failed',
    });
  }
});

async function handleSubscriptionChange(
  supabase: ReturnType<typeof createServiceClient>,
  subscriptionId: string,
  customerId: string
) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const plan = subscription.status === 'active' ? 'pro' : 'free';

  await supabase
    .from('subscriptions')
    .update({
      stripe_subscription_id: subscriptionId,
      subscription_plan: plan,
      subscription_status: subscription.status === 'active' ? 'active' : 'canceled',
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    })
    .eq('stripe_customer_id', customerId);
}

export default router;
