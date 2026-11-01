import { useState } from 'react'
import { HUBBLE_WHEEL, velocityFromMomentum, maxSatelliteOmega } from '../../lib/physics/reactionWheel'

const MUTED = '#9aa4b8'
const f = (x: number, d = 2) => x.toLocaleString('es-CR', { minimumFractionDigits: d, maximumFractionDigits: d })
const RAD_DEG = 180 / Math.PI

export default function ReactionWheelDiagram() {
  const [rpm, setRpm] = useState(1500)

  const wRueda = (rpm * 2 * Math.PI) / 60 // rad/s
  const lRueda = HUBBLE_WHEEL.I_rueda * wRueda // kg·m²/s
  const wSat = velocityFromMomentum(lRueda, HUBBLE_WHEEL.I_satelite) // rad/s
  const gradosPorMin = Math.abs(wSat) * 60 * RAD_DEG
  const wSatMax = maxSatelliteOmega()
  const lMax = HUBBLE_WHEEL.I_rueda * HUBBLE_WHEEL.omega_rueda_max_rad
  const frac = rpm / HUBBLE_WHEEL.omega_rueda_max
  const saturada = rpm >= HUBBLE_WHEEL.omega_rueda_max
  const angVis = frac * 25 // ilustrativo, no a escala
  const sw = 1.5 + 4 * frac

  return (
    <div style={{ background: '#121827', border: '1px solid #1f2940', borderRadius: 8, padding: 16, margin: '12px 0' }}>
      <h4 style={{ marginTop: 0 }}>Diagrama: intercambio de momento angular entre la rueda y el satélite</h4>
      <p style={{ color: MUTED }}>
        Con el sistema inicialmente en reposo y sin torque externo, L<sub>total</sub> = 0: lo que gana la rueda lo gana el
        satélite con signo contrario. Mueve la rueda y observa cómo cambian las dos flechas de momento angular.
      </p>

      <label style={{ display: 'block', margin: '16px 0' }}>
        <span style={{ color: MUTED }}>Velocidad de la rueda de reacción: </span>
        <strong>{f(rpm, 0)} rpm</strong>
        <input
          type="range" min={0} max={HUBBLE_WHEEL.omega_rueda_max} step={10} value={rpm}
          onChange={e => setRpm(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </label>

      <svg viewBox="0 0 560 330" style={{ width: '100%', maxWidth: 560 }}>
        <defs>
          <marker id="ah-r" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#f87171" />
          </marker>
          <marker id="ah-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#60a5fa" />
          </marker>
        </defs>

        {/* Satélite (la rueda va montada en él) */}
        <g transform={`rotate(${angVis}, 280, 150)`}>
          <rect x="180" y="110" width="200" height="80" fill="#1f2940" stroke="#3b4a6b" strokeWidth="2" rx="8" />
          <rect x="100" y="130" width="70" height="40" fill="#60a5fa" fillOpacity={0.3} stroke="#60a5fa" />
          <rect x="390" y="130" width="70" height="40" fill="#60a5fa" fillOpacity={0.3} stroke="#60a5fa" />
          <text x="215" y="125" fill="#cbd5e1" fontSize={12} textAnchor="middle">Satélite</text>
          <circle cx="280" cy="150" r="22" fill="none" stroke="#f87171" strokeWidth="3" strokeDasharray="8 4" />
          <circle cx="280" cy="150" r="6" fill="#f87171" />
          <line x1="280" y1="128" x2="280" y2="138" stroke="#f87171" strokeWidth="2" />
          <text x="345" y="155" fill="#fca5a5" fontSize={12} textAnchor="middle">Rueda</text>
        </g>

        {/* L de la rueda: antihoraria */}
        <path d="M 319 127.5 A 45 45 0 0 0 241 127.5" fill="none" stroke="#f87171" strokeWidth={sw} markerEnd="url(#ah-r)" />
        {/* L del satélite: horaria, sentido opuesto */}
        <path d="M 366.6 200 A 100 100 0 0 1 193.4 200" fill="none" stroke="#60a5fa" strokeWidth={sw} markerEnd="url(#ah-b)" />

        <text x="280" y="38" fill="#f87171" fontSize={13} textAnchor="middle">
          L_rueda = I_rueda·ω_rueda = {f(lRueda)} kg·m²/s (antihoraria)
        </text>
        <text x="280" y="272" fill="#60a5fa" fontSize={13} textAnchor="middle">
          L_sat = I_sat·ω_sat = {f(-lRueda)} kg·m²/s (horaria)
        </text>
        <text x="280" y="296" fill={MUTED} fontSize={13} textAnchor="middle">
          L_rueda + L_sat = 0 → ω_sat = −(I_rueda / I_sat)·ω_rueda
        </text>
        <text x="280" y="318" fill={MUTED} fontSize={12} textAnchor="middle">
          ω_rueda = {f(wRueda, 1)} rad/s · ω_sat = −{f(Math.abs(wSat) * 1000, 3)}×10⁻³ rad/s
        </text>
      </svg>

      <p style={{ color: MUTED }}>
        Con estos valores el satélite gira a {f(gradosPorMin, 2)}° por minuto. El ángulo con que se dibuja el satélite
        está exagerado (máximo 25°) para que se note; no está a escala.
      </p>
      <p className="muted">
        Valores supuestos (propios, no de una fuente): I<sub>rueda</sub> = {f(HUBBLE_WHEEL.I_rueda)} kg·m²,
        I<sub>satélite</sub> = {f(HUBBLE_WHEEL.I_satelite, 0)} kg·m², rueda de hasta {f(HUBBLE_WHEEL.omega_rueda_max, 0)} rpm.
        Modelo simplificado de un solo eje, con ω de la rueda medida respecto al espacio.
      </p>

      {saturada && (
        <div style={{ background: '#451a03', border: '1px solid #fbbf24', padding: 12, borderRadius: 8, marginTop: 12, color: '#fcd34d' }}>
          <strong>Rueda saturada.</strong> La rueda llegó a su velocidad máxima y su momento angular no puede crecer más:
          L<sub>máx</sub> = {f(lMax)} kg·m²/s. Con esta rueda el satélite no puede superar {f(wSatMax * 1000, 3)}×10⁻³ rad/s
          ({f(wSatMax * 60 * RAD_DEG, 2)}° por minuto). Para seguir girando hay que quitarle momento a la rueda con un torque
          externo, por ejemplo con barras de par magnético que interactúan con el campo magnético terrestre.
        </div>
      )}
    </div>
  )
}