import { Children, type ReactNode } from 'react'

const go = (n: string) => {
  const el = document.getElementById(`fuente-${n}`)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  el.style.transition = 'background .4s'
  el.style.background = 'rgba(0,106,234,.25)'
  setTimeout(() => { el.style.background = '' }, 1400)
}

export const Cite = ({ n }: { n: string }) => (
  <button
    type="button"
    onClick={() => go(n)}
    title={`Ver fuente [${n}]`}
    style={{ background: 'none', border: 0, padding: 0, margin: '0 1px', font: 'inherit', fontSize: '.8em', verticalAlign: 'super', color: 'var(--accent-text, var(--accent))', cursor: 'pointer' }}
  >
    [{n}]
  </button>
)

const parse = (c: ReactNode): ReactNode =>
  Children.map(c, x =>
    typeof x !== 'string'
      ? x
      : x.split(/(\[M?\d+\])/).map((s, i) => {
          const m = s.match(/^\[(M?\d+)\]$/)
          return m ? <Cite key={i} n={m[1]} /> : s
        })
  )

export const P = ({ children }: { children: ReactNode }) => <p>{parse(children)}</p>
export const Li = ({ children }: { children: ReactNode }) => <li>{parse(children)}</li>

export const Refs = ({ items }: { items: { n: string; body: ReactNode }[] }) => (
  <ol style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
    {items.map(r => (
      <li key={r.n} id={`fuente-${r.n}`} style={{ padding: '4px 8px', borderRadius: 6 }}>
        <b>[{r.n}]</b> {r.body}
      </li>
    ))}
  </ol>
)