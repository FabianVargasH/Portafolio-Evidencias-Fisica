import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ReferenceArea, ReferenceDot, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { STAGES, V_LIM, dropIdeal, vel } from '../../lib/physics/coolant'

const G = '#1f2940', T = '#9aa4b8'
const FLOWS = [
  { key: 'row', q: 1125, name: 'Fila: 1 125 L/min', color: '#f87171' },
  { key: 'rack', q: 56.25, name: 'Rack: 56,25 L/min', color: '#fbbf24' },
  { key: 'srv', q: 5.625, name: 'Servidor: 5,625 L/min', color: '#22d3ee' },
]
const data = Array.from({ length: 160 }, (_, i) => {
  const d = +(4 * 50 ** (i / 159)).toFixed(2)
  return { d, row: vel(1125, d), rack: vel(56.25, d), srv: vel(5.625, d) }
})
const ticks = [5, 8, 10, 16, 25, 32, 50, 100, 150, 200]
const colorOf = (q: number) => FLOWS.find(f => f.q === q)!.color
const bars = STAGES.map((s, i) => ({ etapa: `${i + 1}`, kpa: dropIdeal(s) / 1000 }))
const tip = { background: '#121827', border: `1px solid ${G}` }

export default function CoolingCircuit() {
  return (
    <>
      <figure className="chart">
        <figcaption>Velocidad del fluido según el diámetro interior de la tubería, para los tres caudales del circuito (continuidad: v = Q / A)</figcaption>
        <ResponsiveContainer width="100%" height={340}>
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 28, left: 8 }}>
            <CartesianGrid stroke={G} />
            <XAxis dataKey="d" type="number" scale="log" domain={[4, 200]} ticks={ticks} allowDataOverflow stroke={T} tick={{ fill: T }}
              label={{ value: 'Diámetro interior D (mm), escala logarítmica', position: 'insideBottom', offset: -16, fill: T }} />
            <YAxis domain={[0, 4]} allowDataOverflow width={64} stroke={T} tick={{ fill: T }}
              label={{ value: 'Velocidad v (m/s)', angle: -90, position: 'insideLeft', fill: T }} />
            <Tooltip contentStyle={tip} formatter={v => `${Number(v).toFixed(2)} m/s`} labelFormatter={l => `D = ${Number(l).toFixed(1)} mm`} />
            <Legend verticalAlign="top" />
            <ReferenceArea y1={V_LIM[0]} y2={V_LIM[1]} fill="#f87171" fillOpacity={0.15} stroke="#f87171" strokeOpacity={0.4}
              label={{ value: 'límite por erosión: 1,5 a 2,1 m/s', fill: T, fontSize: 12, position: 'insideTopRight' }} />
            {FLOWS.map(f => <Line key={f.key} dataKey={f.key} name={f.name} stroke={f.color} dot={false} strokeWidth={2.5} isAnimationActive={false} />)}
            {STAGES.map((s, i) => (
              <ReferenceDot key={s.name} x={s.d} y={vel(s.q, s.d)} r={6} fill={colorOf(s.q)} stroke="#0b1020"
                label={{ value: String(i + 1), position: 'top', fill: '#e6edf7', fontSize: 13 }} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </figure>

      <figure className="chart">
        <figcaption>Caída de presión estática de Bernoulli (ideal, sin fricción) en cada etapa, respecto a la cabecera de fila</figcaption>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={bars} margin={{ top: 8, right: 16, bottom: 28, left: 8 }}>
            <CartesianGrid stroke={G} />
            <XAxis dataKey="etapa" stroke={T} tick={{ fill: T }} label={{ value: 'Etapa del circuito (numeración de la tabla)', position: 'insideBottom', offset: -16, fill: T }} />
            <YAxis width={64} stroke={T} tick={{ fill: T }} label={{ value: 'Δp ideal (kPa)', angle: -90, position: 'insideLeft', fill: T }} />
            <Tooltip contentStyle={tip} formatter={v => `${Number(v).toFixed(2)} kPa`} labelFormatter={l => `Etapa ${l}`} />
            <Bar dataKey="kpa" name="Caída ideal de presión estática" fill="#22d3ee" isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </figure>
    </>
  )
}