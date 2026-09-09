import { Hono } from 'hono'
import { isValidEmail } from '../../shared/validation'
import { sendTemplate } from '../emails/render'
import { exportSubscribersCsv } from '../lib/export/csvExporter'
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
  return c.body(exportSubscribersCsv(repo.all()))
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
