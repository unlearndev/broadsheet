import { Hono } from 'hono'
import embed from './routes/embed'
import issues from './routes/issues'
import subscribers from './routes/subscribers'

export function createApp() {
  const app = new Hono()

  app.route('/api/issues', issues)
  app.route('/api/subscribers', subscribers)
  app.route('/api/embed', embed)

  return app
}
