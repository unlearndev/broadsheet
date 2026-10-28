export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatPercent(ratio: number): string {
  return `${(ratio * 100).toFixed(1)}%`
}
