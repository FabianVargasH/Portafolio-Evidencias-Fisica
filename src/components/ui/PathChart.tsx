import { CartesianGrid, Line, LineChart, ReferenceDot, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import type { Pt } from '../../lib/physics/kinematics'

interface Props { title: string; data: Pt[]; marks: (Pt & { label: string })[] }

const G = '#1f2940', T = '#9aa4b8'

export default function PathChart({ title, data, marks }: Props) {
  return (
    <figure className="chart">
      <figcaption>{title}</figcaption>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 16, right: 24, bottom: 24, left: 8 }}>
          <CartesianGrid stroke={G} />
          <XAxis dataKey="x" type="number" domain={['dataMin - 20', 'dataMax + 20']} stroke={T} tick={{ fill: T }}ticks={[0, 100, 200, 300]}
            label={{ value: 'x (m)', position: 'insideBottom', offset: -14, fill: T }} />
          <YAxis type="number" width={64} domain={['dataMin - 20', 'dataMax + 20']} stroke={T} tick={{ fill: T }}ticks={[0, 50, 100, 150, 200]}
            label={{ value: 'y (m)', angle: -90, position: 'insideLeft', fill: T }} />
          <Line dataKey="y" stroke="#4d9bff" strokeWidth={2} dot={false} isAnimationActive={false} />
          {marks.map(m => (
            <ReferenceDot key={m.label} x={m.x} y={m.y} r={5} fill="#f59e0b" stroke="none"
              label={{ value: m.label, position: 'top', fill: '#e8ecf5' }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </figure>
  )
}