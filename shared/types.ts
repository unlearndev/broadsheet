export interface Subscriber {
  id: string
  email: string
  name: string | null
  isActive: boolean
  tier: 'free' | 'paid'
  renewsAt: string | null
  token: string
  createdAt: string
}

export type IssueStatus = 'draft' | 'scheduled' | 'sent'

export interface Issue {
  id: string
  title: string
  body: string
  status: IssueStatus
  scheduledFor: string | null
  sentAt: string | null
  createdAt: string
}
