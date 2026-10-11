import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import TopicSection from '../components/layout/TopicSection'
import { topics } from '../topics/registry'
import SideNav from '../components/layout/SideNav'

export default function TopicPage() {
  const { id } = useParams()
  const i = topics.findIndex(t => t.id === id)
  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (i < 0) return <p>Tema no encontrado. <Link to="/">Volver al inicio</Link></p>

  const prev = topics[i - 1]
  const next = topics[i + 1]
  return (
    <div className="layout">
      <SideNav />
      <div>
        <TopicSection topic={topics[i]} />
        <div className="pager">
          {prev ? (
            <Link to={`/${prev.id}`} className="pager-link prev">
              <span className="dir"><span className="arr" aria-hidden>←</span> Anterior</span>
              <strong>Tema {prev.num}: {prev.title}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/${next.id}`} className="pager-link next">
              <span className="dir">Siguiente <span className="arr" aria-hidden>→</span></span>
              <strong>Tema {next.num}: {next.title}</strong>
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  )
}