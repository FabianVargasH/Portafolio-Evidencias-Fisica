import { useState } from 'react'
import LineChartCard from '../../components/ui/LineChartCard'
import { muT, fmaxT, serie, N_FIJA, MU_PICO, T_OPT } from '../../lib/physics/tire'

const data = serie(muT, 20, 180, 2).map(p => ({ t: p.x, mu: p.y }))
const f = (v: number, d = 2) => v.toLocaleString('es', { maximumFractionDigits: d })

export default function TireTempChart() {
  const [t, setT] = useState(60)
  const mu = muT(t)
  const estado = mu >= 0.9 * MU_PICO ? 'En la ventana óptima' : t < T_OPT ? 'Llanta fría' : 'Llanta sobrecalentada'

  return (
    <>
      <LineChartCard
        title="Gráfica 1. Coeficiente de agarre μ vs. temperatura de la llanta (modelo ilustrativo)"
        data={data} xKey="t" xLabel="Temperatura de la llanta (°C)" yLabel="μ (adimensional)"
        series={[{ key: 'mu', name: 'μ (modelo)', color: '#f87171' }]}
        mark={{ x: t, y: mu }}
      />
      <label style={{ display: 'block', margin: '12px 0' }}>
        Temperatura: <strong>{t} °C</strong>
        <input type="range" min={20} max={180} step={1} value={t} onChange={e => setT(+e.target.value)} style={{ width: '100%' }} />
      </label>
      <p>
        {estado}: μ = <strong>{f(mu)}</strong>. Con N = {f(N_FIJA / 1000, 1)} kN, F<sub>máx</sub> = μ·N ={' '}
        <strong>{f(fmaxT(t) / 1000)} kN</strong>.
      </p>
      <p>
        Modelo ilustrativo, no es una medición. El pico cerca de 100 °C sigue a [4] y el rango estrecho de operación se
        respalda con [5]; la forma de campana, su asimetría y los anchos son supuestos propios.
      </p>
    </>
  )
}