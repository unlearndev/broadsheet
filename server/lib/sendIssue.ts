import type { Issue } from '../../shared/types'
import { renderTemplate } from '../emails/render'
import { NotificationChannelFactory } from '../notifications/NotificationChannelFactory'
import { updateIssue } from '../store/issues'
import { subscribers } from '../store/SubscriberRepository'

export interface SendIssueOptions {
  /** How many times to retry a failed delivery. */
  retries?: number
  /** Work out who would get it without sending anything. */
  dryRun?: boolean
  /** Delivery priority to pass to the mail provider. */
  priority?: 'low' | 'normal' | 'high'
  /** How many emails to hand to the provider at once. */
  batchSize?: number
}

const defaults: Required<SendIssueOptions> = {
  retries: 3,
  dryRun: false,
  priority: 'normal',
  batchSize: 500,
}

export interface SendResult {
  sent: number
  failed: number
}

export async function sendIssue(issue: Issue, options: SendIssueOptions = {}): Promise<SendResult> {
  if (!issue) return { sent: 0, failed: 0 }
  const { retries, dryRun } = { ...defaults, ...options }

  const recipients = subscribers.active()
  if (dryRun) return { sent: recipients.length, failed: 0 }

  const channel = NotificationChannelFactory.create('email')
  let sent = 0
  let failed = 0

  for (const subscriber of recipients) {
    const email = renderTemplate('issue', subscriber, { issue })
    if (await attempt(() => channel.send(subscriber, email), retries)) sent++
    else failed++
  }

  updateIssue(issue.id, {
    status: 'sent',
    sentAt: new Date().toISOString(),
    stats: { recipients: sent, opens: 0, clicks: 0 },
  })
  return { sent, failed }
}

async function attempt(send: () => Promise<void>, retries: number): Promise<boolean> {
  for (let i = 0; i <= retries; i++) {
    try {
      await send()
      return true
    } catch (error) {
      if (i === retries) console.error('[send] delivery failed', error)
    }
  }
  return false
}
