import { Hono } from 'hono'
import { getFlags } from '../lib/flags'

const flags = new Hono()

flags.get('/', (c) => c.json(getFlags()))

export default flags
