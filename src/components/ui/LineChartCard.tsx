import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface S { key: string; name: string; color: string }
interface Props { title: string; data: object[]; xKey: string; series: S[]; xLabel: string; yLabel: string; step?: boolean }

const G = '#1f2940', T = '#9aa4b8'

export default function LineChartCard({ title, data, xKey, series, xLabel, yLabel, step }: Props) {
  return (
    <figure className="chart">
      <figcaption>{title}</figcaption>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 8, right: 16, bottom: 24, left: 8 }}>
          <CartesianGrid stroke={G} />
          <XAxis dataKey={xKey} type="number" domain={['dataMin', 'dataMax']} stroke={T} tick={{ fill: T }}
            label={{ value: xLabel, position: 'insideBottom', offset: -14, fill: T }} />
          <YAxis width={64} stroke={T} tick={{ fill: T }}
            label={{ value: yLabel, angle: -90, position: 'insideLeft', fill: T }} />
          <Tooltip contentStyle={{ background: '#121827', border: `1px solid ${G}` }} formatter={v => Number(v).toFixed(2)} />
          <Legend verticalAlign="top" />
          {series.map(s => (
            <Line key={s.key} dataKey={s.key} name={s.name} stroke={s.color} strokeWidth={2} dot={false}
              type={step ? 'stepAfter' : 'linear'} isAnimationActive={false} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </figure>
  )
}