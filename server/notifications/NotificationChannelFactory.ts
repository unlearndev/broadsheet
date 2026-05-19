import { EmailChannel } from './EmailChannel'
import type { NotificationChannel } from './NotificationChannel'

export type ChannelType = 'email'

export class NotificationChannelFactory {
  private static instances = new Map<ChannelType, NotificationChannel>()

  static create(type: ChannelType = 'email'): NotificationChannel {
    const existing = this.instances.get(type)
    if (existing) return existing

    let channel: NotificationChannel
    switch (type) {
      case 'email':
        channel = new EmailChannel()
        break
      default:
        throw new Error(`Unknown notification channel: ${type}`)
    }

    this.instances.set(type, channel)
    return channel
  }
}
