import axios from 'axios'
import type { Issue, Subscriber } from '../../shared/types'

const client = axios.create({ baseURL: '/api' })

export const api = {
  issues: () => client.get<Issue[]>('/issues').then((res) => res.data),
  issue: (id: string) => client.get<Issue>(`/issues/${id}`).then((res) => res.data),
  createIssue: (input: { title: string; body: string }) =>
    client.post<Issue>('/issues', input).then((res) => res.data),
  updateIssue: (id: string, input: { title: string; body: string }) =>
    client.put<Issue>(`/issues/${id}`, input).then((res) => res.data),
  subscribers: () => client.get<Subscriber[]>('/subscribers').then((res) => res.data),
}
