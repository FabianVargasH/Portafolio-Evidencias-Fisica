import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Hero from '../components/layout/Hero'
import QueAprendi from '../components/sections/QueAprendi'
import { topics } from '../topics/registry'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    const id = (location.state as { scrollTo?: string } | null)?.scrollTo
    if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 50)
  }, [location.key])

  return (
    <>
      <Hero />
      <section id="temas" className="topic">
      <h2 className="title">Temas</h2>
      <div className="grid">
        {topics.map(t => (
          <Link key={t.id} to={`/${t.id}`} className="card">
            <span className="eyebrow">Tema {t.num}</span>
            <strong>{t.title}</strong>
            <span className="tag">{t.resource}</span>
          </Link>
        ))}
      </div>
      </section>
      <QueAprendi />
    </>
  )
}