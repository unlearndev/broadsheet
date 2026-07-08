/**
 * One-off: rewrite every stored subscriber from `isActive` to `status`.
 * Run once per environment: npm run migrate:status
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { env } from '../server/env'

const data = JSON.parse(readFileSync(env.dataFile, 'utf8'))
let migrated = 0

for (const subscriber of data.subscribers) {
  if ('isActive' in subscriber) {
    subscriber.status = subscriber.isActive === false ? 'unsubscribed' : 'active'
    delete subscriber.isActive
    migrated++
  }
}

writeFileSync(env.dataFile, JSON.stringify(data, null, 2))
console.log(`Migrated ${migrated} of ${data.subscribers.length} subscribers in ${env.dataFile}`)
