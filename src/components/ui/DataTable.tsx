import type { ReactNode } from 'react'
import { P } from './Cited'

export const DataTable = ({ caption, head, rows }: { caption?: string; head: string[]; rows: ReactNode[][] }) => (
  <div className="tbl-wrap">
    <table className="tbl">
      {caption && <caption>{caption}</caption>}
      <thead>
        <tr>{head.map(h => <th key={h} scope="col">{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>{r.map((c, j) => <td key={j}><P>{c}</P></td>)}</tr>
        ))}
      </tbody>
    </table>
  </div>
)