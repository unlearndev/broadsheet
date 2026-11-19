import { PUBLICATION } from '../../../shared/publication'

/** "The Context Window" -> "CW" */
const initials = PUBLICATION.split(' ')
  .filter((word) => word !== 'The')
  .map((word) => word[0])
  .join('')

export default function PublicationMark({ size }: { size: number }) {
  return (
    <span
      className="publication-mark"
      aria-hidden="true"
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.24), fontSize: Math.max(10, Math.round(size * 0.34)) }}
    >
      {initials}
    </span>
  )
}
