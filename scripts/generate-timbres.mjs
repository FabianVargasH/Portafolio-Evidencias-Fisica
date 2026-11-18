import fs from 'node:fs'
const SR = 44100, F0 = 440, DUR = 2.5, RMS = 0.2, NH = 12
const W0 = Math.round(0.5 * SR), WL = SR // ventana de análisis: 1,0 s = 440 períodos exactos
const TIMBRES = [
  { id: 'suave', name: 'Suave', amps: [1, 0.3, 0.1] },
  { id: 'brillante', name: 'Brillante', amps: Array.from({ length: NH }, (_, i) => 1 / (i + 1)) },
]
fs.mkdirSync('public/audio', { recursive: true })

const synth = amps => {
  const N = Math.round(SR * DUR), x = new Float64Array(N)
  for (let i = 0; i < N; i++) {
    const t = i / SR
    let y = 0
    amps.forEach((a, k) => { y += a * Math.sin(2 * Math.PI * F0 * (k + 1) * t) })
    x[i] = y * Math.min(1, t / 0.05, (DUR - t) / 0.2)
  }
  const g = RMS / Math.sqrt(x.slice(W0, W0 + WL).reduce((s, v) => s + v * v, 0) / WL)
  return x.map(v => v * g)
}

const wav = x => {
  const b = Buffer.alloc(44 + 2 * x.length)
  b.write('RIFF', 0); b.writeUInt32LE(36 + 2 * x.length, 4); b.write('WAVEfmt ', 8)
  b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22)
  b.writeUInt32LE(SR, 24); b.writeUInt32LE(2 * SR, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34)
  b.write('data', 36); b.writeUInt32LE(2 * x.length, 40)
  x.forEach((v, i) => b.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(v * 32767))), 44 + 2 * i))
  return b
}

const read = file => {
  const b = fs.readFileSync(file)
  return Float64Array.from({ length: (b.length - 44) / 2 }, (_, i) => b.readInt16LE(44 + 2 * i) / 32768)
}

const harm = (x, n) => {
  let re = 0, im = 0
  for (let i = 0; i < WL; i++) {
    const p = 2 * Math.PI * n * F0 * (i / SR)
    re += x[W0 + i] * Math.cos(p); im += x[W0 + i] * Math.sin(p)
  }
  return (2 / WL) * Math.hypot(re, im)
}

const out = TIMBRES.map(({ id, name, amps }) => {
  const file = `public/audio/timbre-${id}.wav`
  fs.writeFileSync(file, wav(synth(amps)))
  const x = read(file) // el análisis sale del archivo ya escrito, no de la síntesis
  const harmonics = Array.from({ length: NH }, (_, i) => ({ n: i + 1, f: F0 * (i + 1), a: +harm(x, i + 1).toFixed(4) }))
  const n0 = Math.round(1.0 * SR), np = Math.round((4 * SR) / F0)
  const wave = Array.from({ length: np + 1 }, (_, i) => [+((1000 * i) / SR).toFixed(3), +x[n0 + i].toFixed(4)])
  const peak = Math.max(...x.map(Math.abs))
  const rms = Math.sqrt(x.slice(W0, W0 + WL).reduce((s, v) => s + v * v, 0) / WL)
  const sa = harmonics.reduce((s, h) => s + h.a, 0)
  const cen = harmonics.reduce((s, h) => s + h.f * h.a, 0) / sa
  console.log(id, 'bytes', fs.statSync(file).size, 'dur', (x.length / SR).toFixed(2), 's pico', peak.toFixed(3), 'rms', rms.toFixed(3), 'centroide', cen.toFixed(0), 'Hz')
  console.log('  armónicos', harmonics.map(h => `${h.n}:${h.a}`).join(' '))
  return { id, name, centroid: Math.round(cen), wave, harmonics }
})

fs.writeFileSync('src/lib/physics/timbreData.ts',
`// Generado por scripts/generate-timbres.mjs a partir de public/audio/*.wav (A4 = ${F0} Hz, ${SR} Hz, 16 bits, mono).
// wave: [ms, amplitud] de 4 períodos desde t = 1,000 s. harmonics: amplitud medida del armónico n en la ventana 0,5 s a 1,5 s.
export const F0 = ${F0}
export interface Timbre { id: string; name: string; centroid: number; wave: [number, number][]; harmonics: { n: number; f: number; a: number }[] }
export const TIMBRES: Timbre[] = ${JSON.stringify(out)}
`)