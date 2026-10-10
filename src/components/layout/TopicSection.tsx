import type { TopicMeta } from '../../types/topic'
import { sections } from '../../topics/sections'

export default function TopicSection({ topic }: { topic: TopicMeta }) {
  return (
    <article className="topic-page">
      <p className="eyebrow">Tema {topic.num} · {topic.resource}</p>
      <h2>{topic.title}</h2>
      {sections.map(s => (
        <section key={s.id} id={s.id} className="block">
          <h3>{s.label}</h3>
          <p className="muted">Contenido pendiente.</p>
        </section>
      ))}
    </article>
  )
}