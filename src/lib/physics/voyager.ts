// src/lib/physics/voyager.ts

export type Flyby = {
  planet: string
  date: string
  year: number
  deltaV: number
}

export const VOYAGER_2_FLYBYS: Flyby[] = [
  { planet: 'Júpiter', date: '1979-07-09', year: 1979, deltaV: 10.1 },
  { planet: 'Saturno', date: '1981-08-26', year: 1981, deltaV: 4.9 },
  { planet: 'Urano', date: '1986-01-24', year: 1986, deltaV: 1.9 },
  { planet: 'Neptuno', date: '1989-08-25', year: 1989, deltaV: 0 },
]

export function buildVoyager2Series(): { t: number; v: number }[] {
  const v0 = 10.0
  const vFinal = 15.3
  const totalDelta = VOYAGER_2_FLYBYS.reduce((s, f) => s + f.deltaV, 0)
  const scale = (vFinal - v0) / totalDelta

  const points: { t: number; v: number }[] = []
  let v = v0

  // Punto de partida (1977)
  points.push({ t: 1977, v })
  
  // Agregamos puntos año a año para que la gráfica tenga resolución
  for (let year = 1978; year <= 2026; year++) {
    // Si hay un flyby en este año, sumamos su deltaV
    const flyby = VOYAGER_2_FLYBYS.find(f => f.year === year)
    if (flyby) {
      v += flyby.deltaV * scale
    }
    points.push({ t: year, v })
  }

  return points
}