import { Hono } from 'hono'
import { isValidEmail } from '../../shared/validation'
import { sendTemplate } from '../emails/render'
import { subscribers as repo } from '../store/SubscriberRepository'

const subscribers = new Hono()

subscribers.get('/', (c) => c.json(repo.all()))

subscribers.post('/', async (c) => {
  const { email, name } = await c.req.json<{ email?: string; name?: string }>()
  if (!email || !isValidEmail(email)) {
    return c.json({ errors: { email: 'Enter a valid email address.' } }, 422)
  }

  const isNew = !repo.findByEmail(email)
  const subscriber = repo.subscribe(email, name)
  if (isNew) await sendTemplate('welcome', subscriber)

  return c.json(subscriber, 201)
})

export default subscribers
