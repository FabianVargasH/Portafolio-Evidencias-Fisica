// MODELO ILUSTRATIVO: Sony no publica la curva de fuerza del DualSense.
export const K = 300
export const X0 = 0.006
export const XMAX = 0.015

export const fHap = (x: number, k = K, x0 = X0): number => (x <= x0 ? 0 : k * (x - x0))
export const uHap = (x: number, k = K, x0 = X0): number => (x <= x0 ? 0 : 0.5 * k * (x - x0) ** 2)