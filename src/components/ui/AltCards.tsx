import type { ReactNode } from 'react'
import { P } from './Cited'

export const AltCards = ({ items }: { items: { title: string; text: ReactNode }[] }) => (
  <div className="alts">
    {items.map((a, i) => (
      <div key={a.title} className="alt">
        <span className="alt-n" aria-hidden>{i + 1}</span>
        <h4>{a.title}</h4>
        <P>{a.text}</P>
      </div>
    ))}
  </div>
)

export const GainCost = ({ gain, cost }: { gain: ReactNode; cost: ReactNode }) => (
  <div className="gc">
    <div className="gc-box gain"><h4>Qué se gana</h4><P>{gain}</P></div>
    <div className="gc-box cost"><h4>Qué cuesta</h4><P>{cost}</P></div>
  </div>
)