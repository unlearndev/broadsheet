import { Hono } from 'hono'
import { isValidEmail } from '../../shared/validation'
import { subscribers as repo } from '../store/SubscriberRepository'

const subscribers = new Hono()

subscribers.get('/', (c) => c.json(repo.all()))

subscribers.post('/', async (c) => {
  const { email, name } = await c.req.json<{ email?: string; name?: string }>()
  if (!email || !isValidEmail(email)) {
    return c.json({ errors: { email: 'Enter a valid email address.' } }, 422)
  }

  return c.json(repo.subscribe(email, name), 201)
})

export default subscribers
