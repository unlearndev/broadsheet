import { Hono } from 'hono'
import { escapeHtml, paragraphs } from '../emails/layout'
import { allIssues } from '../store/issues'

const archive = new Hono()

archive.get('/:slug', (c) => {
  const issue = allIssues().find((candidate) => candidate.slug === c.req.param('slug') && candidate.status === 'sent')
  if (!issue) return c.html('<h1>Not found</h1>', 404)

  return c.html(`<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"><title>${escapeHtml(issue.title)}</title></head>
  <body style="font-family: Georgia, serif; max-width: 640px; margin: 48px auto; padding: 0 24px; line-height: 1.6;">
    <h1>${escapeHtml(issue.title)}</h1>
    ${paragraphs(issue.body)}
  </body>
</html>`)
})

export default archive
