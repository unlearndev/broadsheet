import { randomUUID } from 'node:crypto'
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

  subscribe(email: string, name: string | null = null): Subscriber {
    const existing = this.findByEmail(email)
    if (existing) {
      if (!existing.isActive) this.update(existing.id, { isActive: true })
      return existing
    }

    return this.insert({
      id: `sub_${randomUUID().slice(0, 8)}`,
      email: email.trim().toLowerCase(),
      name: name?.trim() || null,
      isActive: true,
      token: randomUUID().replaceAll('-', ''),
      createdAt: new Date().toISOString(),
    })
  }
}

export const subscribers = new SubscriberRepository()
