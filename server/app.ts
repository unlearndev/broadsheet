import { Hono } from 'hono'
import issues from './routes/issues'
import subscribers from './routes/subscribers'

export function createApp() {
  const app = new Hono()

  app.route('/api/issues', issues)
  app.route('/api/subscribers', subscribers)

  return app
}
