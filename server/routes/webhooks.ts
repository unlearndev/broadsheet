import { createHmac, timingSafeEqual } from 'node:crypto'
import { Hono } from 'hono'
import { sendTemplate } from '../emails/render'
import { env } from '../env'
import { events } from '../store/events'
import { subscribers } from '../store/SubscriberRepository'

interface PaymentEvent {
  id: string
  type: 'subscription.created' | 'subscription.renewed' | 'subscription.cancelled'
  data: {
    email: string
    renewsAt?: string
  }
}

const webhooks = new Hono()

webhooks.post('/payments', async (c) => {
  const payload = await c.req.text()
  if (!verifySignature(payload, c.req.header('x-signature'))) {
    return c.json({ error: 'Invalid signature' }, 401)
  }

  const event = JSON.parse(payload) as PaymentEvent
  if (events.seen(event.id)) {
    return c.json({ received: true })
  }
  events.remember(event.id)

  const subscriber = subscribers.findByEmail(event.data.email)
  if (!subscriber) return c.json({ received: true })

  switch (event.type) {
    case 'subscription.created':
      subscribers.update(subscriber.id, { tier: 'paid', renewsAt: event.data.renewsAt ?? null })
      await sendTemplate('upgraded', subscriber)
      break
    case 'subscription.renewed':
      subscribers.update(subscriber.id, { renewsAt: event.data.renewsAt ?? null })
      break
    case 'subscription.cancelled':
      subscribers.update(subscriber.id, { tier: 'free', renewsAt: null })
      break
  }

  return c.json({ received: true })
})

export function sign(payload: string): string {
  return createHmac('sha256', env.paymentsWebhookSecret).update(payload).digest('hex')
}

function verifySignature(payload: string, signature: string | undefined): boolean {
  if (!signature) return false
  const expected = Buffer.from(sign(payload))
  const given = Buffer.from(signature)
  return expected.length === given.length && timingSafeEqual(expected, given)
}

export default webhooks
