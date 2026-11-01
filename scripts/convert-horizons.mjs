import fs from 'node:fs'
const raw = fs.readFileSync('data/horizons-voyager2.txt', 'utf8')
const rows = raw.split('$$SOE')[1].split('$$EOE')[0].trim().split('\n')
const pts = rows.map(l => {
  const c = l.split(',')
  const jd = +c[0], v = Math.hypot(+c[5], +c[6], +c[7])
  return [+(2000 + (jd - 2451545) / 365.25).toFixed(3), +v.toFixed(2)]
})
fs.writeFileSync('src/lib/physics/voyager2Data.ts',
`// Rapidez de Voyager 2 respecto al Sol, |v| calculada de JPL Horizons (cuerpo -32, centro 500@10, paso 15 d). [año, km/s]
export const VOYAGER2_DATA: [number, number][] = ${JSON.stringify(pts)}
`)
console.log(pts.length, 'puntos; último:', pts.at(-1))