const PUBLICATION = 'The Weekly Brief'

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export function paragraphs(body: string): string {
  return body
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.trim())}</p>`)
    .join('\n')
}

export function layout(content: string, unsubscribeUrl: string): string {
  return `<!doctype html>
<html>
  <body style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1b1b1f;">
    ${content}
    <hr style="border: 0; border-top: 1px solid #e6e3dc; margin: 32px 0 16px;">
    <p style="font-size: 12px; color: #6b6b73;">
      You’re getting this because you subscribed to ${PUBLICATION}.
      <a href="${unsubscribeUrl}">Unsubscribe</a>
    </p>
  </body>
</html>`
}
