import { useEffect, useState } from 'react'

export interface Flags {
  newEditor: boolean
}

const defaults: Flags = { newEditor: false }

export function useFlags(): Flags {
  const [flags, setFlags] = useState<Flags>(defaults)

  useEffect(() => {
    fetch('/api/flags')
      .then((res) => res.json() as Promise<Flags>)
      .then(setFlags)
      .catch(() => setFlags(defaults))
  }, [])

  return flags
}
