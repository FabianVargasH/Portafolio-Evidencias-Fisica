import { useMemo, useState } from 'react'
import LineChartCard from '../../components/ui/LineChartCard'
import { fyN, fSimple, EXP } from '../../lib/physics/tire'

const f = (v: number, d = 2) => v.toLocaleString('es', { maximumFractionDigits: d })

export default function TireLoadChart() {
  const [n, setN] = useState(4.5)
  const [e, setE] = useState(EXP)

  const data = useMemo(
    () => Array.from({ length: 33 }, (_, i) => {
      const k = 1 + i * 0.25
      return { n: k, simple: fSimple(k * 1000) / 1000, real: fyN(k * 1000, e) / 1000 }
    }),
    [e]
  )
  const real = fyN(n * 1000, e) / 1000
  const simple = fSimple(n * 1000) / 1000
  const dif = (1 - real / simple) * 100

  return (
    <>
      <LineChartCard
        title="Gráfica 2. Fuerza lateral máxima vs. carga vertical (modelo ilustrativo)"
        data={data} xKey="n" xLabel="Carga vertical N (kN)" yLabel="Fuerza lateral máx. (kN)"
        series={[
          { key: 'simple', name: 'Modelo simple μ·N', color: '#9aa4b8' },
          { key: 'real', name: 'Modelo con sensibilidad a la carga', color: '#f87171' },
        ]}
        mark={{ x: n, y: real }}
      />
      <label style={{ display: 'block', margin: '12px 0' }}>
        Carga vertical: <strong>{f(n, 1)} kN</strong>
        <input type="range" min={1} max={9} step={0.1} value={n} onChange={ev => setN(+ev.target.value)} style={{ width: '100%' }} />
      </label>
      <label style={{ display: 'block', margin: '12px 0' }}>
        Sensibilidad a la carga n: <strong>{f(e)}</strong> (n = 1 es el modelo simple)
        <input type="range" min={0.7} max={1} step={0.01} value={e} onChange={ev => setE(+ev.target.value)} style={{ width: '100%' }} />
      </label>
      <p>Nota: Se agregaron barras interactivas con el mismo objetivo que la anterior, visualizar el comportamiento de los valores con datos variables, pero manteniendo la visualización de datos solicitada</p>
      <p>
        Con N = {f(n, 1)} kN: modelo simple {f(simple)} kN, modelo con sensibilidad {f(real)} kN
        ({f(dif, 1)} % menos agarre).
      </p>
      <p>
        Modelo ilustrativo, no es una medición. Ancla: μ = 1,6 con 2,2 kN [3]; la sensibilidad n es un parámetro propio.
      </p>
    </>
  )
}