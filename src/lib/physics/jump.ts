export interface Jump { v0: number; gu: number; gd: number; vx: number }

export const solve = ({ v0, gu, gd, vx }: Jump) => {
  const h = v0 * v0 / (2 * gu)
  const tUp = v0 / gu
  const tDown = Math.sqrt(2 * h / gd)
  const T = tUp + tDown
  return { h, tUp, tDown, T, R: vx * T }
}

export const yAt = (j: Jump, t: number) => {
  const { v0, gu, gd } = j
  const tUp = v0 / gu
  if (t <= tUp) return v0 * t - 0.5 * gu * t * t
  const s = t - tUp
  return Math.max(0, v0 * v0 / (2 * gu) - 0.5 * gd * s * s)
}

export const path = (j: Jump, n = 120) => {
  const { T } = solve(j)
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = (T * i) / n
    return { t, x: j.vx * t, y: yAt(j, t) }
  })
}

export const fromApex = (h: number, th: number) => ({ g: (2 * h) / (th * th), v0: (2 * h) / th })