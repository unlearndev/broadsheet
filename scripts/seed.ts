import { copyFileSync } from 'node:fs'
import { env } from '../server/env'

copyFileSync('data/seed.json', env.dataFile)
console.log(`Reset ${env.dataFile} from data/seed.json`)
