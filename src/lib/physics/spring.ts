export interface Spring { k: number; c: number; m: number }
export type Regime = 'sub' | 'crit' | 'sobre'

export const w0 = ({ k, m }: Spring) => Math.sqrt(k / m)
export const zeta = ({ k, c, m }: Spring) => c / (2 * Math.sqrt(k * m))
export const cCrit = ({ k, m }: Spring) => 2 * Math.sqrt(k * m)
export const wd = (s: Spring) => { const z = zeta(s); return z < 1 ? w0(s) * Math.sqrt(1 - z * z) : 0 }
export const regime = (z: number): Regime => (z < 0.98 ? 'sub' : z > 1.02 ? 'sobre' : 'crit')
export const overshoot = (z: number) => (z < 1 ? Math.exp((-Math.PI * z) / Math.sqrt(1 - z * z)) : 0)

// desplazamiento respecto al objetivo con x(0) = 1 (todo el recorrido) y v(0) = 0
export const disp = (s: Spring, t: number) => {
  const w = w0(s), z = zeta(s)
  if (z < 1 - 1e-6) {
    const d = w * Math.sqrt(1 - z * z)
    return Math.exp(-z * w * t) * (Math.cos(d * t) + ((z * w) / d) * Math.sin(d * t))
  }
  if (z <= 1 + 1e-6) return Math.exp(-w * t) * (1 + w * t)
  const q = w * Math.sqrt(z * z - 1), r1 = -z * w + q, r2 = -z * w - q
  return (-r2 * Math.exp(r1 * t) + r1 * Math.exp(r2 * t)) / (r1 - r2)
}

export const pos = (s: Spring, t: number) => 1 - disp(s, t)

// integración por fotogramas (Euler semi-implícito), como lo haría un bucle de animación
export const euler = (s: Spring, dt: number, tMax: number) => {
  const n = Math.round(tMax / dt)
  const out = [1]
  let x = 1, v = 0
  for (let i = 0; i < n; i++) {
    v += ((-s.k * x - s.c * v) / s.m) * dt
    x += v * dt
    out.push(x)
  }
  return out
}

// último instante con |x| > tol; null si no se asienta dentro de tMax
export const settleFrom = (xs: number[], dt: number, tol = 0.02) => {
  let last = -1
  for (let i = 0; i < xs.length; i++) if (Math.abs(xs[i]) > tol) last = i
  return last >= xs.length - 1 ? null : (last + 1) * dt
}

export const settle = (s: Spring, tol = 0.02, tMax = 10, dt = 1 / 240) =>
  settleFrom(Array.from({ length: Math.round(tMax / dt) + 1 }, (_, i) => disp(s, i * dt)), dt, tol)