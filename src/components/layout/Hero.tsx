import type { PointerEvent } from 'react'
import { site } from '../../app/site'
import GravityField from './GravityField'

const mag = (e: PointerEvent<HTMLAnchorElement>) => {
  const r = e.currentTarget.getBoundingClientRect()
  const x = (e.clientX - (r.left + r.width / 2)) * 0.25
  const y = (e.clientY - (r.top + r.height / 2)) * 0.35
  e.currentTarget.style.transform = `translate(${x}px, ${y}px)`
}
const rel = (e: PointerEvent<HTMLAnchorElement>) => { e.currentTarget.style.transform = '' }

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <GravityField />
      <p className="eyebrow">{site.school} · {site.course}</p>
      <h1>{site.title}</h1>
      <p className="sub">{site.subtitle}</p>
      <p className="author">{site.name}</p>
      <a href="#tema-1" className="btn-hero" onPointerMove={mag} onPointerLeave={rel}>
        <span>Ver los temas</span>
        <span className="arr" aria-hidden>↓</span>
      </a>
    </section>
  )
}