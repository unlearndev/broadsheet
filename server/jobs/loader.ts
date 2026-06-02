import { readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

export interface Job {
  name: string
  /** Cron expression, in the server's time zone. */
  schedule: string
  run: () => Promise<void>
}

const folder = dirname(fileURLToPath(import.meta.url))
const notJobs = new Set(['loader.ts', 'scheduler.ts'])

/** Every other .ts file in this folder is a job: export one as default and it gets scheduled. */
export async function loadJobs(): Promise<Job[]> {
  const files = readdirSync(folder).filter(
    (file) => file.endsWith('.ts') && !file.endsWith('.test.ts') && !notJobs.has(file),
  )

  const modules = await Promise.all(files.map((file) => import(pathToFileURL(join(folder, file)).href)))
  return modules.map((module) => module.default as Job)
}
