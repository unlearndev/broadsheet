export type SubscriberStatus = 'active' | 'unsubscribed'

export interface Subscriber {
  id: string
  email: string
  name: string | null
  status: SubscriberStatus
  tier: 'free' | 'paid'
  renewsAt: string | null
  token: string
  createdAt: string
}

export interface IssueStats {
  recipients: number
  opens: number
  clicks: number
}

export type IssueStatus = 'draft' | 'scheduled' | 'sent'

export interface Issue {
  id: string
  title: string
  slug: string
  body: string
  status: IssueStatus
  scheduledFor: string | null
  sentAt: string | null
  stats: IssueStats | null
  createdAt: string
}
