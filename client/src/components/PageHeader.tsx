import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { PUBLICATION } from '../../../shared/publication'
import PublicationMark from './PublicationMark'

/** "The Context Window / Dashboard", so it's always clear which newsletter you're managing. */
export default function PageHeader({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="section-header">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/"><PublicationMark size={22} />{PUBLICATION}</Link>
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" aria-hidden="true">
          <path d="M16 4 8 20" />
        </svg>
        <h1>{title}</h1>
      </nav>
      {children}
    </div>
  )
}
