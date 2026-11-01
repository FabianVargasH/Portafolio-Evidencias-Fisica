// src/topics/tema-08-reaccion/ReactionWheelDiagram.tsx
import { useState } from 'react'
import { HUBBLE_WHEEL, velocityFromMomentum } from '../../lib/physics/reactionWheel'

const MUTED = '#9aa4b8'
const f = (x: number, d = 2) => x.toLocaleString('es-CR', { minimumFractionDigits: d, maximumFractionDigits: d })

export default function ReactionWheelDiagram() {
  const [rpm, setRpm] = useState(0) // rpm de la rueda

  const omega_rueda = (rpm * 2 * Math.PI) / 60 // rad/s
  const L_rueda = HUBBLE_WHEEL.I_rueda * omega_rueda
  const omega_satelite = velocityFromMomentum(L_rueda, HUBBLE_WHEEL.I_satelite)
  
  // Grados de rotación visual (multiplicamos por un factor para que se vea en pantalla)
  const rotacionSatelite = omega_satelite * 1000; 
  const rotacionRueda = omega_rueda;

  const saturada = rpm >= HUBBLE_WHEEL.omega_rueda_max;

  return (
    <div style={{ background: '#121827', border: '1px solid #1f2940', borderRadius: 8, padding: 16, margin: '12px 0' }}>
      <h4 style={{ marginTop: 0 }}>Diagrama: intercambio de momento angular en el Hubble</h4>
      <p style={{ color: MUTED }}>
        Al girar la rueda interna, el satélite gira en sentido opuesto para conservar el momento angular total (L = 0).
      </p>

      {/* Slider de control */}
      <label style={{ display: 'block', margin: '16px 0' }}>
        <span style={{ color: MUTED }}>Velocidad de la rueda de reacción: </span>
        <strong>{f(rpm, 0)} rpm</strong>
        <input 
          type="range" min={0} max={HUBBLE_WHEEL.omega_rueda_max} step={10} value={rpm}
          onChange={e => setRpm(Number(e.target.value))}
          style={{ width: '100%' }} 
        />
      </label>

      {/* Diagrama SVG */}
      <svg viewBox="0 0 560 300" style={{ width: '100%', maxWidth: 560 }}>
        {/* Cuerpo del satélite */}
        <g transform={`rotate(${rotacionSatelite}, 280, 150)`}>
          <rect x="180" y="110" width="200" height="80" fill="#1f2940" stroke="#3b4a6b" strokeWidth="2" rx="8" />
          <text x="280" y="155" fill="#cbd5e1" fontSize={16} textAnchor="middle">Hubble</text>
          {/* Panel solar izquierdo */}
          <rect x="100" y="130" width="70" height="40" fill="#60a5fa" fillOpacity={0.3} stroke="#60a5fa" />
          {/* Panel solar derecho */}
          <rect x="390" y="130" width="70" height="40" fill="#60a5fa" fillOpacity={0.3} stroke="#60a5fa" />
        </g>

        {/* Rueda de reacción */}
        <g transform={`rotate(${rotacionRueda}, 280, 150)`}>
          <circle cx="280" cy="150" r="30" fill="none" stroke="#f87171" strokeWidth="3" strokeDasharray="10 5" />
          <circle cx="280" cy="150" r="10" fill="#f87171" />
          <line x1="280" y1="120" x2="280" y2="130" stroke="#f87171" strokeWidth="2" />
        </g>

        {/* Flechas y ecuaciones */}
        <text x="280" y="40" fill="#f87171" fontSize={14} textAnchor="middle">
          ω_rueda = {f(omega_rueda, 1)} rad/s
        </text>
        <text x="280" y="270" fill="#60a5fa" fontSize={14} textAnchor="middle">
          ω_satélite = {f(omega_satelite, 6)} rad/s
        </text>
        
        {/* Ecuación principal */}
        <text x="280" y="290" fill={MUTED} fontSize={13} textAnchor="middle">
          L_total = I_rueda·ω_rueda + I_satélite·ω_satélite = 0
        </text>
      </svg>

      {/* Aviso de saturación */}
      {saturada && (
        <div style={{ background: '#451a03', border: '1px solid #fbbf24', padding: 12, borderRadius: 8, marginTop: 12, color: '#fcd34d' }}>
          <strong>⚠️ Rueda saturada:</strong> La rueda alcanzó su velocidad máxima. Para seguir girando, el Hubble usa 
          <strong> barras de par magnético</strong> que interactúan con el campo magnético terrestre para descargar el momento angular acumulado.
        </div>
      )}
    </div>
  )
}