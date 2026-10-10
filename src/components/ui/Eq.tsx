import type { ReactNode } from 'react'

export default function Eq({ children }: { children: ReactNode }) {
  return <p style={{ textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: '1.15rem', margin: '14px 0' }}>{children}</p>
}