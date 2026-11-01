// Física del Tema 7: restitución. Sin dependencias de React.

export const G = 9.81
/** Umbral por defecto de Box2D: 1 m/s (b2FixtureDef.restitutionThreshold). */
export const DEFAULT_THRESHOLD = 1
/** Por debajo de esta rapidez de impacto se considera reposo aunque no haya umbral (evita rebotes infinitos). */
const V_EPS = 1e-3

export interface Collision1D {
  v1f: number
  v2f: number
  pBefore: number
  pAfter: number
  kBefore: number
  kAfter: number
  kLost: number
}

/** Colisión frontal 1D con coeficiente de restitución e (fórmulas del M3). */
export function collide1D(m1: number, v1: number, m2: number, v2: number, e: number): Collision1D {
  const M = m1 + m2
  const p = m1 * v1 + m2 * v2
  const v1f = (p - m2 * e * (v1 - v2)) / M
  const v2f = (p + m1 * e * (v1 - v2)) / M
  const kBefore = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2
  const kAfter = 0.5 * m1 * v1f * v1f + 0.5 * m2 * v2f * v2f
  return { v1f, v2f, pBefore: p, pAfter: m1 * v1f + m2 * v2f, kBefore, kAfter, kLost: kBefore - kAfter }
}

export interface BallPoint { t: number; y: number }

/**
 * Pelota soltada desde h0 (m) que rebota contra el piso (y = 0).
 * Vuelo libre exacto entre rebotes; en cada impacto v' = -e·v_impacto.
 * Si la rapidez de impacto es menor que `threshold`, no hay rebote (queda en reposo),
 * como hace Box2D con restitutionThreshold. threshold = 0 desactiva el umbral
 * (aun así se detiene por debajo de V_EPS para evitar infinitos rebotes).
 */
export function bounceTrajectory(
  h0: number, e: number, threshold: number, tMax: number, dt = 0.01, g = G,
): BallPoint[] {
  const pts: BallPoint[] = [{ t: 0, y: h0 }]
  let y = h0
  let v = 0
  let t = 0
  let rest = false
  const steps = Math.round(tMax / dt)
  for (let i = 0; i < steps; i++) {
    let remaining = dt
    let guard = 0
    while (!rest && remaining > 1e-12 && guard++ < 1000) {
      const yNext = y + v * remaining - 0.5 * g * remaining * remaining
      if (yNext >= 0) {
        v -= g * remaining
        y = yNext
        remaining = 0
      } else {
        // tiempo hasta el impacto: raíz positiva de y + v·τ − g·τ²/2 = 0
        const tau = (v + Math.sqrt(v * v + 2 * g * y)) / g
        const vImpact = v - g * tau // negativo
        remaining -= tau
        y = 0
        if (e === 0 || -vImpact < Math.max(threshold, V_EPS)) {
          v = 0
          rest = true
        } else {
          v = -e * vImpact
        }
      }
    }
    t += dt
    pts.push({ t, y: rest ? 0 : Math.max(y, 0) })
  }
  return pts
}

/** Altura del n-ésimo rebote: h_n = e^(2n)·h0 (sin umbral). */
export const bounceHeight = (h0: number, e: number, n: number) => h0 * Math.pow(e, 2 * n)

/** Tiempo total hasta el reposo (serie geométrica, sin umbral): √(2h0/g)·(1+e)/(1−e). */
export function totalBounceTime(h0: number, e: number, g = G): number {
  if (e >= 1) return Infinity
  return Math.sqrt((2 * h0) / g) * ((1 + e) / (1 - e))
}