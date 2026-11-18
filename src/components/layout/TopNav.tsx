import { Link, NavLink } from 'react-router-dom'
import { topics } from '../../topics/registry'

export default function TopNav() {
  return (
    <header className="nav">
      <Link to="/" className="brand">Portafolio de Física I</Link>
      <nav>
        {topics.map(t => (
          <NavLink key={t.id} to={`/${t.id}`} title={t.title} className={({ isActive }) => (isActive ? 'on' : '')}>
            T{t.num}
          </NavLink>
        ))}
        <Link to="/" state={{ scrollTo: 'que-aprendi' }} title="Cierre del portafolio: qué aprendí">
          Qué aprendí
        </Link>
      </nav>
    </header>
  )
}