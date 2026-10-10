export interface Pt { x: number; y: number }
export interface Sample { t: number; x: number; y: number; vx: number; vy: number; ax: number; ay: number; v: number }

interface Leg { p: Pt; ux: number; uy: number; vp: number; ta: number; tc: number; T: number; t0: number }

const mkLeg = (p: Pt, q: Pt, vmax: number, A: number, t0: number): Leg => {
  const dx = q.x - p.x, dy = q.y - p.y, L = Math.hypot(dx, dy)
  const vp = Math.min(vmax, Math.sqrt(A * L))
  const ta = vp / A
  const tc = (L - vp * ta) / vp
  return { p, ux: dx / L, uy: dy / L, vp, ta, tc, T: 2 * ta + tc, t0 }
}

const scalar = (g: Leg, A: number, tau: number) => {
  const { ta, tc, vp, T } = g
  if (tau < ta) return { s: 0.5 * A * tau ** 2, v: A * tau, a: A }
  if (tau < ta + tc) return { s: 0.5 * vp * ta + vp * (tau - ta), v: vp, a: 0 }
  const r = Math.min(tau, T) - ta - tc
  return { s: 0.5 * vp * ta + vp * tc + vp * r - 0.5 * A * r * r, v: vp - A * r, a: -A }
}

export function simulate(route: Pt[], vmax: number, A: number, dt = 0.5): Sample[] {
  const legs: Leg[] = []
  let t0 = 0
  for (let i = 0; i < route.length - 1; i++) {
    const g = mkLeg(route[i], route[i + 1], vmax, A, t0)
    legs.push(g)
    t0 += g.T
  }
  const out: Sample[] = []
  for (let t = 0; t <= t0 + 1e-9; t += dt) {
    const g = legs.find(l => t < l.t0 + l.T) ?? legs[legs.length - 1]
    const { s, v, a } = scalar(g, A, t - g.t0)
    out.push({ t, x: g.p.x + s * g.ux, y: g.p.y + s * g.uy, vx: v * g.ux, vy: v * g.uy, ax: a * g.ux, ay: a * g.uy, v })
  }
  return out
}