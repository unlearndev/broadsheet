import { Hono } from 'hono'
import archive from './routes/archive'
import embed from './routes/embed'
import flags from './routes/flags'
import issues from './routes/issues'
import subscribers from './routes/subscribers'
import unsubscribe from './routes/unsubscribe'
import webhooks from './routes/webhooks'

export function createApp() {
  const app = new Hono()

  app.route('/api/issues', issues)
  app.route('/api/subscribers', subscribers)
  app.route('/api/embed', embed)
  app.route('/api/flags', flags)
  app.route('/u', unsubscribe)
  app.route('/p', archive)
  app.route('/webhooks', webhooks)

  return app
}
