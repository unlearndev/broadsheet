import type { Subscriber } from '../../shared/types'
import { BaseRepository } from './BaseRepository'
import { db } from './db'

export class SubscriberRepository extends BaseRepository<Subscriber> {
  protected collection(): Subscriber[] {
    return db().subscribers
  }

  findByEmail(email: string): Subscriber | undefined {
    return this.findBy('email', email.trim().toLowerCase())
  }

  findByToken(token: string): Subscriber | undefined {
    return this.findBy('token', token)
  }

  active(): Subscriber[] {
    return this.where((subscriber) => subscriber.isActive)
  }
}

export const subscribers = new SubscriberRepository()
