// MODELO DE BALANCE DE ENERGÍA DE UN VEHÍCULO ELÉCTRICO SOBRE UN CICLO DE CONDUCCIÓN.
// Entrada real: velocidad contra tiempo (UDDS). Todo lo demás se calcula aquí con trabajo y energía cinética.
// Parámetros del vehículo (Nissan Leaf 2014): Knoop (2019), arXiv:1905.11654. Eficiencias: supuestos propios
// anclados en Boretti (2013), SAE 2013-01-2872. Densidad del aire: supuesto propio.

export const MPH_A_MS = 0.44704
export const G = 9.81

export interface Params {
  m: number        // masa (kg)
  cd: number       // coeficiente de arrastre
  area: number     // área frontal (m²)
  cr: number       // coeficiente de rodadura
  rho: number      // densidad del aire (kg/m³)
  pMaxReg: number  // potencia máxima de regeneración (W)
  etaTr: number    // eficiencia de tracción (batería → ruedas)
  etaReg: number   // eficiencia de regeneración (ruedas → batería)
}

export const LEAF: Params = {
  m: 1525, cd: 0.28, area: 2.59, cr: 0.006, rho: 1.2, pMaxReg: 80_000, etaTr: 0.9, etaReg: 0.78,
}

export interface Row {
  t: number      // s
  vKmh: number   // km/h
  pBat: number   // kW (+ la batería entrega, − la batería recibe)
  eBruta: number // kWh acumulados que la batería entregó
  eRec: number   // kWh acumulados que la batería recuperó
  eNeta: number  // kWh acumulados netos (eBruta − eRec)
}

export interface Totals {
  eTraccion: number   // trabajo de tracción en las ruedas (kWh)
  eAire: number       // trabajo contra el arrastre aerodinámico (kWh)
  eRodadura: number   // trabajo contra la rodadura (kWh)
  eFrenado: number    // energía que los frenos deben quitar al vehículo (kWh)
  eRegMec: number     // parte del frenado absorbida por el motor (kWh)
  eFriccion: number   // parte disipada en frenos de fricción (kWh)
  eBruta: number      // energía que entrega la batería (kWh)
  eRec: number        // energía que recupera la batería (kWh)
  ePerdTr: number     // pérdidas de tracción (kWh)
  ePerdReg: number    // pérdidas de regeneración (kWh)
  eNeta: number       // energía neta de la batería (kWh)
  distKm: number
  whKm: number        // consumo neto (Wh/km)
  pFrenadoMax: number // kW, mayor potencia de frenado pedida a las ruedas (resolución de 1 s)
}

const J_KWH = 1 / 3.6e6

export function simulate(mph: number[], p: Params = LEAF): { rows: Row[]; totals: Totals } {
  const v = mph.map(x => x * MPH_A_MS)
  const cda = p.cd * p.area
  let tr = 0, aire = 0, rod = 0, reg = 0, fric = 0, dist = 0, bruta = 0, rec = 0, pPico = 0
  const rows: Row[] = [{ t: 0, vKmh: 0, pBat: 0, eBruta: 0, eRec: 0, eNeta: 0 }]

  for (let i = 0; i < v.length - 1; i++) {
    const vm = (v[i] + v[i + 1]) / 2
    const dK = 0.5 * p.m * (v[i + 1] ** 2 - v[i] ** 2)
    const wAire = 0.5 * p.rho * cda * vm ** 3
    const wRod = p.cr * p.m * G * vm
    const w = dK + wAire + wRod
    aire += wAire
    rod += wRod
    dist += vm

    let pBat: number
    if (w >= 0) {
      tr += w
      bruta += w / p.etaTr
      pBat = w / p.etaTr / 1000
    } else {
      const frenado = -w
      pPico = Math.max(pPico, frenado)
      const aMotor = Math.min(frenado, p.pMaxReg)
      reg += aMotor
      fric += frenado - aMotor
      rec += aMotor * p.etaReg
      pBat = -(aMotor * p.etaReg) / 1000
    }
    rows.push({
      t: i + 1, vKmh: v[i + 1] * 3.6, pBat,
      eBruta: bruta * J_KWH, eRec: rec * J_KWH, eNeta: (bruta - rec) * J_KWH,
    })
  }

  const distKm = dist / 1000
  const totals: Totals = {
    eTraccion: tr * J_KWH, eAire: aire * J_KWH, eRodadura: rod * J_KWH,
    eFrenado: (reg + fric) * J_KWH, eRegMec: reg * J_KWH, eFriccion: fric * J_KWH,
    eBruta: bruta * J_KWH, eRec: rec * J_KWH,
    ePerdTr: (bruta - tr) * J_KWH, ePerdReg: (reg - rec) * J_KWH,
    eNeta: (bruta - rec) * J_KWH, distKm, whKm: ((bruta - rec) * J_KWH * 1000) / distKm,
    pFrenadoMax: pPico / 1000,
  }
  return { rows, totals }
}

// Verificación del dato de entrada contra los valores publicados del ciclo.
export function cycleStats(mph: number[]) {
  let paradas = 0
  for (let i = 1; i < mph.length; i++) if (mph[i] === 0 && mph[i - 1] > 0) paradas++
  return {
    n: mph.length,
    duracionS: mph.length - 1,
    vMaxMph: Math.max(...mph),
    distMi: mph.reduce((a, b) => a + b, 0) / 3600,
    paradas,
  }
}