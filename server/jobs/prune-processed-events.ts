import { events } from '../store/events'
import type { Job } from './loader'

const job: Job = {
  name: 'prune-processed-events',
  schedule: '0 4 * * *',
  async run() {
    const removed = events.pruneOlderThan(30)
    if (removed > 0) console.log(`[jobs] pruned ${removed} processed webhook events`)
  },
}

export default job
