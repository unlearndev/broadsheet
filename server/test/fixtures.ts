import type { Issue, Subscriber } from '../../shared/types'

export function makeSubscriber(overrides: Partial<Subscriber> = {}): Subscriber {
  return {
    id: 'sub_1',
    email: 'ada@example.com',
    name: 'Ada',
    status: 'active',
    tier: 'free',
    renewsAt: null,
    token: 'tok_ada',
    createdAt: '2026-01-01T00:00:00Z',
    ...overrides,
  }
}

export function makeIssue(overrides: Partial<Issue> = {}): Issue {
  return {
    id: 'iss_1',
    title: 'Hello',
    slug: 'hello',
    body: 'First.\n\nSecond.',
    status: 'draft',
    scheduledFor: null,
    sentAt: null,
    createdAt: '2026-01-01T00:00:00Z',
    ...overrides,
  }
}
