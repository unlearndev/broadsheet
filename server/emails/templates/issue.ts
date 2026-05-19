import { escapeHtml, layout, paragraphs } from '../layout'
import type { Template } from '../types'

export const issueEmail: Template = ({ issue, unsubscribeUrl }) => {
  if (!issue) throw new Error('The issue template needs an issue')

  return {
    subject: issue.title,
    html: layout(`<h1>${escapeHtml(issue.title)}</h1>\n${paragraphs(issue.body)}`, unsubscribeUrl),
    text: `${issue.title}\n\n${issue.body}\n\nUnsubscribe: ${unsubscribeUrl}`,
  }
}
