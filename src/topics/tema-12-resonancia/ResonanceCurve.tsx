import LineChartCard from '../../components/ui/LineChartCard'

const amp = (r: number, z: number) => 1 / Math.sqrt((1 - r * r) ** 2 + (2 * z * r) ** 2)
const data = Array.from({ length: 201 }, (_, i) => {
  const r = +(i / 100).toFixed(2)
  return { r, z05: amp(r, 0.05), z10: amp(r, 0.1), z30: amp(r, 0.3) }
})

export default function ResonanceCurve() {
  return (
    <LineChartCard
      title="Curva de resonancia: amplitud relativa según el amortiguamiento (cálculo propio con la ecuación del Tema)"
      data={data} xKey="r" xLabel="Frecuencia de excitación / frecuencia natural (ω/ω₀)" yLabel="Amplitud / desplazamiento estático (A/A_est)"
      series={[
        { key: 'z05', name: 'ζ = 0,05', color: '#f87171' },
        { key: 'z10', name: 'ζ = 0,10', color: '#fbbf24' },
        { key: 'z30', name: 'ζ = 0,30', color: '#22d3ee' },
      ]}
    />
  )
}