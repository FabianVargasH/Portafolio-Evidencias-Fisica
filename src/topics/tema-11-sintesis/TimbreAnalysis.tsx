import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import LineChartCard from '../../components/ui/LineChartCard'
import { TIMBRES } from '../../lib/physics/timbreData'

const G = '#1f2940', T = '#9aa4b8'
const [A, B] = TIMBRES
const COL = { suave: '#fbbf24', brillante: '#22d3ee' }
const wave = A.wave.map(([ms, y], i) => ({ ms, suave: y, brillante: B.wave[i][1] }))
const spec = A.harmonics.map((h, i) => ({ f: h.f, suave: h.a, brillante: B.harmonics[i].a }))
const src = (id: string) => `${import.meta.env.BASE_URL}audio/timbre-${id}.wav`

const Player = ({ id, title, note }: { id: string; title: string; note: string }) => (
  <figure className="chart">
    <figcaption>{title}</figcaption>
    <audio controls preload="metadata" src={src(id)} aria-label={title} style={{ width: '100%' }}>
      Tu navegador no admite audio incrustado.
    </audio>
    <p className="muted" style={{ margin: '.5rem 0 0', fontSize: 13 }}>{note}</p>
  </figure>
)

export default function TimbreAnalysis() {
  return (
    <>
      <div className="charts">
        <Player id="suave" title="Muestra A: timbre suave (A₁ = 1; A₂ = 0,3; A₃ = 0,1)" note="A4 = 440 Hz, 2,5 s, mono, 44,1 kHz, 16 bits. Síntesis propia." />
        <Player id="brillante" title="Muestra B: timbre brillante (Aₙ = 1/n, n = 1 a 12)" note="A4 = 440 Hz, 2,5 s, mono, 44,1 kHz, 16 bits. Síntesis propia." />
      </div>

      <LineChartCard
        title="Forma de onda de las dos muestras: cuatro períodos desde t = 1,000 s (medida en los archivos .wav)"
        data={wave} xKey="ms" xLabel="Tiempo desde t = 1,000 s (ms)" yLabel="Amplitud (fracción de la escala completa)"
        series={[
          { key: 'suave', name: 'Muestra A (suave)', color: COL.suave },
          { key: 'brillante', name: 'Muestra B (brillante)', color: COL.brillante },
        ]}
      />

      <figure className="chart">
        <figcaption>Contenido armónico: amplitud de cada armónico fₙ = n · 440 Hz (ventana de 0,5 s a 1,5 s de cada .wav)</figcaption>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={spec} margin={{ top: 8, right: 16, bottom: 24, left: 8 }}>
            <CartesianGrid stroke={G} />
            <XAxis dataKey="f" stroke={T} tick={{ fill: T }} label={{ value: 'Frecuencia fₙ (Hz)', position: 'insideBottom', offset: -14, fill: T }} />
            <YAxis width={64} stroke={T} tick={{ fill: T }} label={{ value: 'Amplitud Aₙ', angle: -90, position: 'insideLeft', fill: T }} />
            <Tooltip contentStyle={{ background: '#121827', border: `1px solid ${G}` }} formatter={v => Number(v).toFixed(4)} labelFormatter={l => `${l} Hz`} />
            <Legend verticalAlign="top" />
            <Bar dataKey="suave" name="Muestra A (suave)" fill={COL.suave} isAnimationActive={false} />
            <Bar dataKey="brillante" name="Muestra B (brillante)" fill={COL.brillante} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </figure>
    </>
  )
}