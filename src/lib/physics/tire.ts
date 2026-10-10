// MODELO ILUSTRATIVO: no son mediciones de una llanta real.
// Anclas citadas: mu_pico=1,6 a 2200 N (Vorotovic 2013), T_opt~100 °C (Miyashita y Persson).
// El resto (anchos, piso, exponente) son parámetros propios.

export type Pt = { x: number; y: number }

export const T_OPT = 100
export const MU_PICO = 1.6
export const MU_MIN = 0.6
export const S_FRIO = 30
export const S_CALIENTE = 50
export const N_FIJA = 4500

export const N_REF = 2200
export const MU_REF = 1.6
export const EXP = 0.85

export const muT = (t: number): number => {
  const s = t < T_OPT ? S_FRIO : S_CALIENTE
  const g = Math.exp(-0.5 * ((t - T_OPT) / s) ** 2)
  return MU_MIN + (MU_PICO - MU_MIN) * g
}

export const fmaxT = (t: number, n = N_FIJA): number => muT(t) * n

export const muN = (n: number, e = EXP): number => MU_REF * (n / N_REF) ** (e - 1)

export const fyN = (n: number, e = EXP): number => muN(n, e) * n

export const fSimple = (n: number): number => MU_REF * n

export const serie = (
  f: (x: number) => number,
  a: number,
  b: number,
  paso: number
): Pt[] => {
  const r: Pt[] = []
  for (let x = a; x <= b + 1e-9; x += paso) r.push({ x, y: f(x) })
  return r
}