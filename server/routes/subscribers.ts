import { Hono } from 'hono'
import { stream } from 'hono/streaming'
import { isValidEmail } from '../../shared/validation'
import { sendTemplate } from '../emails/render'
import { subscriberCsvLines } from '../lib/export/streamCsv'
import { subscribers as repo } from '../store/SubscriberRepository'

const subscribers = new Hono()

subscribers.get('/', (c) => {
  const query = c.req.query('q')?.trim()
  const results = query ? repo.search(query) : repo.all()
  console.log('DEBUG search', { query, results: results.length })

  return c.json(results)
})

subscribers.get('/export', (c) => {
  c.header('Content-Type', 'text/csv; charset=utf-8')
  c.header('Content-Disposition', 'attachment; filename="subscribers.csv"')
  return stream(c, async (out) => {
    for (const line of subscriberCsvLines(repo.all())) {
      await out.write(line)
    }
  })
})

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
