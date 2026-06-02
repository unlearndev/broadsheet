import { Cron } from 'croner'
import { loadJobs } from './loader'

export async function startScheduler(): Promise<void> {
  const jobs = await loadJobs()

  for (const job of jobs) {
    new Cron(job.schedule, { name: job.name, protect: true }, async () => {
      try {
        await job.run()
      } catch (error) {
        console.error(`[jobs] ${job.name} failed`, error)
      }
    })
  }

  console.log(`[jobs] scheduled: ${jobs.map((job) => job.name).join(', ')}`)
}
