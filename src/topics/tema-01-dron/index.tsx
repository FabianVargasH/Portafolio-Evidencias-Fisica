import LineChartCard from '../../components/ui/LineChartCard'
import PathChart from '../../components/ui/PathChart'
import type { TopicContent } from '../../types/topic'
import { ACC, VMAX, data, route } from './data'
import { text } from './text'

const marks = route.map((p, i) => ({ label: 'ABCD'[i], ...p }))
const X = '#4d9bff', Y = '#f59e0b', M = '#e8ecf5'

export const content: TopicContent = {
  ...text,
  recurso: (
    <>
      <p>
        Perfiles de posición, velocidad y aceleración de un dron que recorre la ruta A → B → C → D y se detiene en cada punto.
        Cada tramo se compone de aceleración constante, velocidad constante y frenado, con las ecuaciones del MRUA y el MRU.
      </p>
      <div className="charts">
        <PathChart title="Ruta declarada (vista desde arriba)" data={data} marks={marks} />
        <LineChartCard title="Posición en función del tiempo" data={data} xKey="t" xLabel="Tiempo (s)" yLabel="Posición (m)"
          series={[{ key: 'x', name: 'x(t)', color: X }, { key: 'y', name: 'y(t)', color: Y }]} />
        <LineChartCard title="Velocidad en función del tiempo" data={data} xKey="t" xLabel="Tiempo (s)" yLabel="Velocidad (m/s)"
          series={[{ key: 'vx', name: 'vx', color: X }, { key: 'vy', name: 'vy', color: Y }, { key: 'v', name: '|v|', color: M }]} />
        <LineChartCard title="Aceleración en función del tiempo" step data={data} xKey="t" xLabel="Tiempo (s)" yLabel="Aceleración (m/s²)"
          series={[{ key: 'ax', name: 'ax', color: X }, { key: 'ay', name: 'ay', color: Y }]} />
      </div>
      <p className="muted">
        Fuente de los datos: cálculo propio (kinematics.ts) a partir de la ruta declarada A(0, 0) → B(300, 0) → C(300, 200) → D(0, 200), en metros,
        con velocidad máxima de {VMAX} m/s y aceleración de {ACC} m/s². Simplificación: PX4 usa curvas S con jerk limitado;
        aquí se emplea el perfil trapezoidal, más simple.
      </p>
    </>
  ),
}