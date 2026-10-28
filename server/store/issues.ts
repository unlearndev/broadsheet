import { randomUUID } from 'node:crypto'
import type { Issue } from '../../shared/types'
import { slugify } from '../lib/slug'
import { db, save } from './db'

export function allIssues(): Issue[] {
  return [...db().issues].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function findIssue(id: string): Issue | undefined {
  return db().issues.find((issue) => issue.id === id)
}

export function createIssue(input: { title: string; body: string }): Issue {
  const issue: Issue = {
    id: `iss_${randomUUID().slice(0, 8)}`,
    title: input.title,
    slug: slugify(input.title),
    body: input.body,
    status: 'draft',
    scheduledFor: null,
    sentAt: null,
    stats: null,
    createdAt: new Date().toISOString(),
  }
  db().issues.push(issue)
  save()
  return issue
}

export function updateIssue(id: string, changes: Partial<Omit<Issue, 'id'>>): Issue | undefined {
  const issue = findIssue(id)
  if (!issue) return undefined
  Object.assign(issue, changes, changes.title ? { slug: slugify(changes.title) } : {})
  save()
  return issue
}
