import { serve } from '@hono/node-server'
import { createApp } from './app'
import { env } from './env'
import { startScheduler } from './jobs/scheduler'
import { loadDb } from './store/db'

loadDb(env.dataFile)

serve({ fetch: createApp().fetch, port: env.port }, (info) => {
  console.log(`Broadsheet API on http://localhost:${info.port}`)
})

await startScheduler()
