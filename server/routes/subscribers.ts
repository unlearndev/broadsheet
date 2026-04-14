import { Hono } from 'hono'
import { subscribers as repo } from '../store/SubscriberRepository'

const subscribers = new Hono()

subscribers.get('/', (c) => c.json(repo.all()))

export default subscribers
