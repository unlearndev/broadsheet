import { Hono } from 'hono'
import { sendIssue } from '../lib/sendIssue'
import { allIssues, createIssue, findIssue, updateIssue } from '../store/issues'

const issues = new Hono()

issues.get('/', (c) => c.json(allIssues()))

issues.get('/:id', (c) => {
  const issue = findIssue(c.req.param('id'))
  return issue ? c.json(issue) : c.json({ error: 'Issue not found' }, 404)
})

issues.post('/', async (c) => {
  const { title, body } = await c.req.json<{ title?: string; body?: string }>()
  if (!title?.trim()) return c.json({ errors: { title: 'Give the issue a title.' } }, 422)
  return c.json(createIssue({ title: title.trim(), body: body ?? '' }), 201)
})

issues.put('/:id', async (c) => {
  const { title, body } = await c.req.json<{ title?: string; body?: string }>()
  if (title !== undefined && !title.trim()) return c.json({ errors: { title: 'Give the issue a title.' } }, 422)
  const issue = updateIssue(c.req.param('id'), {
    ...(title !== undefined && { title: title.trim() }),
    ...(body !== undefined && { body }),
  })
  return issue ? c.json(issue) : c.json({ error: 'Issue not found' }, 404)
})

issues.post('/:id/schedule', async (c) => {
  const { scheduledFor } = await c.req.json<{ scheduledFor?: string }>()
  if (!scheduledFor || Number.isNaN(Date.parse(scheduledFor)) || Date.parse(scheduledFor) < Date.now()) {
    return c.json({ errors: { scheduledFor: 'Pick a time in the future.' } }, 422)
  }

  const issue = updateIssue(c.req.param('id'), { status: 'scheduled', scheduledFor: new Date(scheduledFor).toISOString() })
  return issue ? c.json(issue) : c.json({ error: 'Issue not found' }, 404)
})

issues.post('/:id/send', async (c) => {
  const issue = findIssue(c.req.param('id'))
  if (!issue) return c.json({ error: 'Issue not found' }, 404)
  if (issue.status === 'sent') return c.json({ error: 'This issue has already been sent.' }, 409)

  return c.json(await sendIssue(issue))
})

export default issues
