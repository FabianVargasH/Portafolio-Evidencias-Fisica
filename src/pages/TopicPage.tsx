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
          {prev ? <Link to={`/${prev.id}`}>← Tema {prev.num}</Link> : <span />}
          {next ? <Link to={`/${next.id}`}>Tema {next.num} →</Link> : <span />}
        </div>
      </div>
    </div>
  )
}