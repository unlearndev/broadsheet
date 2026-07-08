import { Hono } from 'hono'
import { escapeHtml } from '../emails/layout'
import { subscribers } from '../store/SubscriberRepository'

const unsubscribe = new Hono()

unsubscribe.get('/:token', (c) => {
  const subscriber = subscribers.findByToken(c.req.param('token'))

  if (!subscriber) {
    return c.html(
      page('Link not recognised', 'This unsubscribe link has expired or was copied wrong. Reply to any issue and we’ll take you off the list.'),
      404,
    )
  }

  subscribers.update(subscriber.id, { status: 'unsubscribed' })

  return c.html(page('You’re unsubscribed', `We won’t send any more issues to ${escapeHtml(subscriber.email)}.`))
})

function page(title: string, message: string): string {
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>${title}</title></head>
  <body style="font-family: Georgia, serif; max-width: 480px; margin: 80px auto; padding: 0 24px; color: #1b1b1f;">
    <h1>${title}</h1>
    <p>${message}</p>
  </body>
</html>`
}

export default unsubscribe
