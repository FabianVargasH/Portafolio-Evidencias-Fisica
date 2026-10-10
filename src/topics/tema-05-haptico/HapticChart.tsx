import { useMemo, useState } from 'react'
import LineChartCard from '../../components/ui/LineChartCard'
import { fHap, uHap, K, X0, XMAX } from '../../lib/physics/haptic'

const f = (v: number, d = 2) => v.toLocaleString('es', { maximumFractionDigits: d })

export default function HapticChart() {
  const [k, setK] = useState(K)
  const [x0, setX0] = useState(X0 * 1000)
  const [x, setX] = useState(12)

  const data = useMemo(
    () => Array.from({ length: 31 }, (_, i) => ({ mm: i * 0.5, F: fHap((i * 0.5) / 1000, k, x0 / 1000) })),
    [k, x0]
  )
  const F = fHap(x / 1000, k, x0 / 1000)
  const U = uHap(x / 1000, k, x0 / 1000)

  return (
    <>
      <LineChartCard
        title="Fuerza restauradora vs. recorrido del gatillo (modelo ilustrativo)"
        data={data} xKey="mm" xLabel="Recorrido del gatillo x (mm)" yLabel="Fuerza (N)"
        series={[{ key: 'F', name: 'F = k(x − x₀)', color: '#f87171' }]}
        mark={{ x, y: F }}
      />
      <label style={{ display: 'block', margin: '12px 0' }}>
        Recorrido x: <strong>{f(x, 1)} mm</strong>
        <input type="range" min={0} max={XMAX * 1000} step={0.5} value={x} onChange={e => setX(+e.target.value)} style={{ width: '100%' }} />
      </label>
      <label style={{ display: 'block', margin: '12px 0' }}>
        Constante k: <strong>{k} N/m</strong>
        <input type="range" min={100} max={600} step={10} value={k} onChange={e => setK(+e.target.value)} style={{ width: '100%' }} />
      </label>
      <label style={{ display: 'block', margin: '12px 0' }}>
        Inicio del efecto x₀: <strong>{f(x0, 1)} mm</strong>
        <input type="range" min={0} max={12} step={0.5} value={x0} onChange={e => setX0(+e.target.value)} style={{ width: '100%' }} />
      </label>
      <p>
        En x = {f(x, 1)} mm: fuerza = <strong>{f(F)} N</strong>, energía equivalente ½k(x − x₀)² ={' '}
        <strong>{f(U * 1000)} mJ</strong>.
      </p>
      <p>Modelo ilustrativo, no es una medición: k, x₀ y el recorrido máximo son valores propios.</p>
    </>
  )
}