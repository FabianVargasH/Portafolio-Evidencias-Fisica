import { useMemo, useState } from 'react'
import LineChartCard from '../../components/ui/LineChartCard'
import { P } from '../../components/ui/Cited'
import { LEAF, cycleStats, simulate } from '../../lib/physics/regen'
import { UDDS_MPH } from './udds'
import BalanceBars from './BalanceBars'

const f = (v: number, d = 2) => v.toLocaleString('es', { minimumFractionDigits: d, maximumFractionDigits: d })
const stats = cycleStats(UDDS_MPH)
const sinReg = simulate(UDDS_MPH, { ...LEAF, pMaxReg: 0 }).totals

export default function RegenExplorer() {
  const [pKw, setPKw] = useState(LEAF.pMaxReg / 1000)
  const { rows, totals: t } = useMemo(() => simulate(UDDS_MPH, { ...LEAF, pMaxReg: pKw * 1000 }), [pKw])
  const ahorro = (1 - t.eNeta / sinReg.eNeta) * 100

  return (
    <>
      <P>
        Ciclo de conducción real: UDDS de la EPA [1]. Datos de entrada verificados: {stats.n} datos (0 a {stats.duracionS} s),
        velocidad máxima {f(stats.vMaxMph, 1)} mph, distancia {f(stats.distMi)} mi y {stats.paradas} paradas, valores que
        coinciden con los publicados [5]. Con ese perfil de velocidad y los parámetros del Nissan Leaf [2], el trabajo en
        cada segundo es W = ΔE<sub>c</sub> + W<sub>aire</sub> + W<sub>rod</sub>: si es positivo lo aporta el motor y si es
        negativo lo absorben los frenos.
      </P>

      <LineChartCard
        title="Gráfica 1. Velocidad del ciclo UDDS (datos reales de la EPA)"
        data={rows} xKey="t" xLabel="Tiempo (s)" yLabel="Velocidad (km/h)"
        series={[{ key: 'vKmh', name: 'Velocidad', color: '#4d9bff' }]}
      />

      <label style={{ display: 'block', margin: '12px 0' }}>
        Potencia máxima de regeneración: <strong>{pKw} kW</strong> (el Leaf llega a 80 kW [2]; 0 kW equivale a no regenerar)
        <input type="range" min={0} max={80} step={1} value={pKw} onChange={e => setPKw(+e.target.value)} style={{ width: '100%' }} />
      </label>
      <p className="muted">
        Nota: el control es de apoyo para ver cómo el límite del motor cambia el reparto entre energía recuperada y energía
        disipada; el recurso sigue siendo la visualización de datos del ciclo real.
      </p>

      <LineChartCard
        title="Gráfica 2. Potencia en la batería durante el ciclo (cálculo propio)"
        data={rows} xKey="t" xLabel="Tiempo (s)" yLabel="Potencia (kW)"
        series={[{ key: 'pBat', name: 'P batería (+ entrega, − recupera)', color: '#f59e0b' }]}
      />
      <LineChartCard
        title="Gráfica 3. Energía acumulada de la batería durante el ciclo (cálculo propio)"
        data={rows} xKey="t" xLabel="Tiempo (s)" yLabel="Energía acumulada (kWh)"
        series={[
          { key: 'eBruta', name: 'Entregada', color: '#f87171' },
          { key: 'eRec', name: 'Recuperada', color: '#34d399' },
          { key: 'eNeta', name: 'Neta', color: '#e8ecf5' },
        ]}
      />
      <BalanceBars t={t} />

      <P>
        Con {pKw} kW: la batería entrega {f(t.eBruta)} kWh, recupera {f(t.eRec)} kWh y el consumo neto es {f(t.eNeta)} kWh en{' '}
        {f(t.distKm, 1)} km ({f(t.whKm, 0)} Wh/km). Los frenos de fricción disipan {f(t.eFriccion)} kWh. Regenerar reduce el
        consumo neto {f(ahorro, 1)} % frente a no regenerar ({f(sinReg.eNeta)} kWh).
      </P>
      <P>
        Lectura: la frenada más exigente de este ciclo pide {f(t.pFrenadoMax, 1)} kW a las ruedas (a resolución de 1 s), así
        que por encima de ese valor el límite del motor ya no cambia el resultado; el límite de 80 kW [2] solo importa en
        frenadas más fuertes que las del UDDS.
      </P>
      <p className="muted">
        Fuentes de los datos: velocidad contra tiempo del UDDS [1]; masa, Cd, área frontal, coeficiente de rodadura y
        potencia máxima de regeneración del Nissan Leaf [2]. Supuestos propios: densidad del aire 1,2 kg/m³, eficiencia de
        tracción 0,90 y eficiencia de regeneración 0,78, elegidas para que el viaje de ida y vuelta (≈ 0,70) sea compatible
        con lo medido en [3]. Se ignoran accesorios, pendiente y viento.
      </p>
    </>
  )
}