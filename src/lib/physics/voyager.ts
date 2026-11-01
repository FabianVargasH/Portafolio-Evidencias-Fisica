import { VOYAGER2_DATA } from './voyager2Data'

// Fechas de los encuentros (NASA PDS), en año decimal
export const FLYBYS = [
  { planet: 'Júpiter', date: '1979-07-09', t: 1979.52 },
  { planet: 'Saturno', date: '1981-08-26', t: 1981.65 },
  { planet: 'Urano', date: '1986-01-24', t: 1986.07 },
  { planet: 'Neptuno', date: '1989-08-25', t: 1989.65 },
]

export const series = VOYAGER2_DATA.map(([t, v]) => ({ t, v }))

export function vAt(t: number): number {
  const d = VOYAGER2_DATA
  const i = d.findIndex(p => p[0] >= t)
  if (i === -1) return d[d.length - 1][1]
  if (i === 0) return d[0][1]
  const [t0, v0] = d[i - 1], [t1, v1] = d[i]
  return v0 + ((v1 - v0) * (t - t0)) / (t1 - t0)
}

// Rapidez antes y después de un encuentro (±0,2 años ≈ 73 días)
export function jump(t: number, w = 0.1) {
  const a = vAt(t - w), b = vAt(t + w)
  return { a, b, d: b - a }
}