interface Props {
  title: string
  body: string
  onChange: (body: string) => void
}

export default function LegacyEditor({ title, body, onChange }: Props) {
  return (
    <>
      <textarea value={body} onChange={(e) => onChange(e.target.value)} rows={18} placeholder="Write something worth reading" />
      <div className="preview">
        <h2>{title}</h2>
        {body.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </>
  )
}
