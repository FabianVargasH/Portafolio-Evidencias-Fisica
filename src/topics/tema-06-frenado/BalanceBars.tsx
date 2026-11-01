// src/topics/tema-06-frenado/BalanceBars.tsx
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { Totals } from '../../lib/physics/regen'

const G = '#1f2940', T = '#9aa4b8'

export default function BalanceBars({ t }: { t: Totals }) {
  const data = [
    { name: 'Recuperada en la batería', kwh: t.eRec, color: '#34d399' },
    { name: 'Pérdidas de regeneración', kwh: t.ePerdReg, color: '#fbbf24' },
    { name: 'Frenos de fricción', kwh: t.eFriccion, color: '#f87171' },
    { name: 'Arrastre aerodinámico', kwh: t.eAire, color: '#4d9bff' },
    { name: 'Rodadura', kwh: t.eRodadura, color: '#a78bfa' },
    { name: 'Pérdidas de tracción', kwh: t.ePerdTr, color: '#9aa4b8' },
  ]
  return (
    <figure className="chart">
      <figcaption>Gráfica 4. Destino de la energía que entregó la batería en el ciclo (kWh)</figcaption>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 8, right: 24, bottom: 28, left: 8 }}>
          <CartesianGrid stroke={G} horizontal={false} />
          <XAxis type="number" stroke={T} tick={{ fill: T }}
            label={{ value: 'Energía (kWh)', position: 'insideBottom', offset: -14, fill: T }} />
          <YAxis type="category" dataKey="name" width={190} stroke={T} tick={{ fill: T }} />
          
          <Tooltip
            contentStyle={{ background: '#fbfcff', border: `1px solid ${G}`, color: '#000000' }}
            formatter={v => `${Number(v).toFixed(3)} kWh (${((Number(v) / t.eBruta) * 100).toFixed(1)} %)`}
          />
          
          <Bar dataKey="kwh" isAnimationActive={false}>
            {data.map(d => <Cell key={d.name} fill={d.color} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </figure>
  )
}