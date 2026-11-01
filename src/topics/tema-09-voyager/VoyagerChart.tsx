import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { FLYBYS, series, jump } from '../../lib/physics/voyager'
import { P } from '../../components/ui/Cited'

const MUTED = '#9aa4b8'
const f = (x: number) => x.toLocaleString('es', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

export default function VoyagerChart() {
  return (
    <div style={{ background: '#121827', border: '1px solid #1f2940', borderRadius: 8, padding: 16, margin: '12px 0' }}>
      <P>
        Rapidez |v| de la Voyager 2 respecto al Sol, calculada por mí a partir de los vectores de velocidad de JPL
        Horizons [1]. Las líneas punteadas marcan las fechas de los cuatro encuentros [2]. Entre encuentros la rapidez
        baja porque el Sol sigue frenando a la sonda; el cambio de rapidez por el planeta ocurre en cada encuentro y,
        como muestra la tabla, no siempre es una ganancia.
      </P>
      <h4 style={{ margin: '16px 0', color: '#f1f5f9', fontSize: '1rem', fontWeight: 600 }}>
        Gráfica. Rapidez de la Voyager 2 respecto al Sol
      </h4>
      <div style={{ height: 350, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series} margin={{ top: 24, right: 30, left: 20, bottom: 24 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2940" />
            <XAxis dataKey="t" type="number" domain={[1977, 2027]} stroke={MUTED}
              ticks={[1977, 1985, 1995, 2005, 2015, 2026]} tickFormatter={t => String(Math.floor(t))}
              label={{ value: 'Año', position: 'insideBottomRight', offset: -10, fill: MUTED }} />
              <YAxis width={60} stroke={MUTED} domain={[(m: number) => Math.floor(m) - 1, (M: number) => Math.ceil(M) + 1]}
                label={{ value: 'Rapidez (km/s)', angle: -90, position: 'insideLeft', fill: MUTED }} />
            <Tooltip contentStyle={{ backgroundColor: '#121827', borderColor: '#1f2940', color: '#cbd5e1' }}
              labelFormatter={t => `Año: ${Number(t).toFixed(2)}`}
              formatter={v => [`${Number(v).toFixed(2)} km/s`, 'Rapidez']} />
            {FLYBYS.map(p => (
              <ReferenceLine key={p.planet} x={p.t} stroke="#fbbf24" strokeDasharray="4 4"
                label={{ value: p.planet, position: 'top', fill: MUTED, fontSize: 11 }} />
            ))}
            <Line type="linear" dataKey="v" name="Voyager 2" stroke="#60a5fa" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <table style={{ borderCollapse: 'collapse', width: '100%', color: MUTED, marginTop: 12 }}>
        <thead>
          <tr><th align="left">Encuentro</th><th align="right">Antes (km/s)</th><th align="right">Después (km/s)</th><th align="right">Δv (km/s)</th></tr>
        </thead>
        <tbody>
          {FLYBYS.map(p => {
            const j = jump(p.t)
            return (
              <tr key={p.planet}>
                <td>{p.planet} ({p.date})</td>
                <td align="right">{f(j.a)}</td><td align="right">{f(j.b)}</td><td align="right">{f(j.d)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p className="muted">
        Antes y después se leen 0,1 años (≈ 37 días) a cada lado de la fecha del encuentro. Con datos cada 15 días no se
        resuelve el instante exacto, así que los Δv son aproximados, no valores oficiales. Datos: JPL Horizons [1]; fechas:
        NASA PDS [2]. Cálculo de |v| propio.
      </p>
      <p className="muted">
        En Neptuno el cambio es negativo: en ese encuentro la sonda no ganó rapidez respecto al Sol.
      </p>
    </div>
  )
}