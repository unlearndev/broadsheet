import type { ReactNode } from 'react'

export default function StatCard({ icon, label, value, hint }: { icon: ReactNode; label: string; value: string; hint?: string }) {
  return (
    <div className="stat-card">
      <span className="stat-label">
        {label}
        {icon}
      </span>
      <span className="stat-body">
        <strong className="stat-value">{value}</strong>
        {hint && <span className="stat-hint">{hint}</span>}
      </span>
    </div>
  )
}
