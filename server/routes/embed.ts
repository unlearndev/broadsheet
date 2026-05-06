import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { isValidEmail } from '../../shared/validation'
import { subscribers } from '../store/SubscriberRepository'

const embed = new Hono()

embed.use('*', cors({ origin: '*', allowMethods: ['POST', 'OPTIONS'] }))

embed.post('/subscribe', async (c) => {
  const contentType = c.req.header('content-type') ?? ''
  const input = contentType.includes('application/json')
    ? await c.req.json<{ email?: string }>()
    : ((await c.req.parseBody()) as { email?: string })

  if (!input.email || !isValidEmail(input.email)) {
    return c.json({ ok: false, message: 'That email address doesn’t look right.' }, 422)
  }

  subscribers.subscribe(input.email)

  // Same response whether or not they were already subscribed.
  return c.json({ ok: true, message: 'Thanks! You’re on the list.' })
})

export default embed
