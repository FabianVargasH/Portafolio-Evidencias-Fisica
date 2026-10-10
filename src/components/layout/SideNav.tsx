import { useEffect, useState } from 'react'
import { sections } from '../../topics/sections'

export default function SideNav() {
  const [active, setActive] = useState(sections[0].id)

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-20% 0px -70% 0px' }
    )
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <aside className="side">
      {sections.map(s => (
        <button key={s.id} className={s.id === active ? 'on' : ''} onClick={() => go(s.id)}>
          {s.label}
        </button>
      ))}
    </aside>
  )
}