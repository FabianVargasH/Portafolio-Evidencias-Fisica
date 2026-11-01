// src/lib/physics/reactionWheel.ts

export const HUBBLE_WHEEL = {
  I_rueda: 0.02, // kg·m² (momento de inercia de una rueda típica de Hubble)
  I_satelite: 12000, // kg·m² (inercia estimada del Hubble)
  omega_rueda_max: 3000, // rpm (límite de seguridad de la rueda)
  omega_rueda_max_rad: (3000 * 2 * Math.PI) / 60, // rad/s
}

/**
 * Dado el momento angular de la rueda, calcula la velocidad angular del satélite
 * para que L_total = 0 (partiendo del reposo).
 */
export function velocityFromMomentum(L_rueda: number, I_satelite: number): number {
  // L_total = L_rueda + L_satelite = 0  =>  I_rueda * w_rueda + I_satelite * w_satelite = 0
  // w_satelite = - (I_rueda * w_rueda) / I_satelite
  return -L_rueda / I_satelite
}

/**
 * Calcula la velocidad angular máxima que puede alcanzar el satélite
 * antes de que la rueda se sature.
 */
export function maxSatelliteOmega(): number {
  const L_max = HUBBLE_WHEEL.I_rueda * HUBBLE_WHEEL.omega_rueda_max_rad
  return Math.abs(velocityFromMomentum(L_max, HUBBLE_WHEEL.I_satelite))
}