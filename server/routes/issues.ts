import { Hono } from 'hono'
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

export default issues
