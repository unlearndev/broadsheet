import type { Issue, Subscriber } from '../../shared/types'

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init.headers },
  })
  if (!res.ok) throw new Error(`${init.method ?? 'GET'} ${path} failed with ${res.status}`)
  return res.json() as Promise<T>
}

export const api = {
  issues: () => request<Issue[]>('/issues'),
  issue: (id: string) => request<Issue>(`/issues/${id}`),
  createIssue: (input: { title: string; body: string }) =>
    request<Issue>('/issues', { method: 'POST', body: JSON.stringify(input) }),
  updateIssue: (id: string, input: { title: string; body: string }) =>
    request<Issue>(`/issues/${id}`, { method: 'PUT', body: JSON.stringify(input) }),
  scheduleIssue: (id: string, scheduledFor: string) =>
    request<Issue>(`/issues/${id}/schedule`, { method: 'POST', body: JSON.stringify({ scheduledFor }) }),
  sendIssue: (id: string) =>
    request<{ sent: number; failed: number }>(`/issues/${id}/send`, { method: 'POST' }),
  subscribers: () => request<Subscriber[]>('/subscribers'),
  subscribe: (input: { email: string; name: string }) =>
    request<Subscriber>('/subscribers', { method: 'POST', body: JSON.stringify(input) }),
}
