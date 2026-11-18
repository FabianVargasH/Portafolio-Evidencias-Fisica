export const RHO = 992.2 // kg/m³, agua a 40 °C
export const CP = 4184 // J/(kg·K)
export const V_LIM = [1.5, 2.1] // m/s, franja de velocidad máxima por erosión (OCP / ASHRAE)

export const toM3s = (lpm: number) => lpm / 60000
export const area = (dmm: number) => (Math.PI * (dmm / 1000) ** 2) / 4
export const vel = (lpm: number, dmm: number) => toM3s(lpm) / area(dmm)
export const dMin = (lpm: number, vmax: number) => Math.sqrt((4 * toM3s(lpm)) / (Math.PI * vmax)) * 1000
export const flowLpm = (kw: number, dT: number) => ((kw * 1000) / (RHO * CP * dT)) * 60000
export const pDyn = (v: number) => 0.5 * RHO * v * v

export interface Stage { name: string; q: number; d: number }
export const STAGES: Stage[] = [
  { name: 'Cabecera de fila (20 racks)', q: 1125, d: 150 },
  { name: 'Entrada del colector del rack', q: 56.25, d: 32 },
  { name: 'Ramal de un servidor', q: 5.625, d: 10 },
  { name: 'Racor de entrada del servidor', q: 5.625, d: 9 },
]

// caída ideal de presión estática respecto a la cabecera (Bernoulli sin fricción, altura constante), en Pa
export const dropIdeal = (s: Stage) => pDyn(vel(s.q, s.d)) - pDyn(vel(STAGES[0].q, STAGES[0].d))