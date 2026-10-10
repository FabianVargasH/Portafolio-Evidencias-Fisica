import { site } from '../../app/site'

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <p className="eyebrow">{site.school} · {site.course}</p>
      <h1>{site.title}</h1>
      <p className="sub">{site.subtitle}</p>
      <p className="author">{site.name}</p>
      <a href="#tema-1" className="btn">Ver los temas</a>
    </section>
  )
}