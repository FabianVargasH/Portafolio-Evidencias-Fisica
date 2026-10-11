import { useState } from 'react'
import { P } from '../../components/ui/Cited'

const W = 640, H = 272, G = 9.8
const CX = 320, CY = 110, RR = 90, CAR_Y = CY + RR
const CV = '#22d3ee', CF = '#f87171', CA = '#fbbf24', OK = '#34d399'

const fmt = (v: number, d = 1) => v.toLocaleString('es', { maximumFractionDigits: d })

export default function TurnDiagram() {
  const [mu, setMu] = useState(1.6)
  const [r, setR] = useState(50)
  const [v, setV] = useState(25)

  const vmax = Math.sqrt(mu * G * r)
  const ac = (v * v) / r
  const alim = mu * G
  const ok = ac <= alim
  const lenV = Math.min(v * 1.6, 100)
  const lenF = Math.min(ac * 4, 78)
  const lenL = Math.min(alim * 4, 78)
  const yF = CAR_Y - 14

  return (
    <>
      <h3>Extra: Simulación interactiva</h3>
      <p>Se agregó una simulación interactiva para lograr explicar mejor el contexto en el que se maneja las fuerzas de fricción</p>
      <figure className="chart" style={{ margin: '12px 0' }}>
        <figcaption>Esquema de una curva vista desde arriba (modelo ilustrativo)</figcaption>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`Auto en una curva de radio ${r} m a ${v} m/s: aceleración centrípeta ${fmt(ac)} m/s², límite ${fmt(alim)} m/s²`}
          style={{ width: '100%' }}
        >
          <defs>
            {([['tn-v', CV], ['tn-f', ok ? CF : CA]] as const).map(([id, c]) => (
              <marker key={id} id={id} viewBox="0 0 6 6" refX="5" refY="3" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto">
                <path d="M0 0L6 3L0 6z" fill={c} />
              </marker>
            ))}
          </defs>

          <text x={W - 20} y={16} textAnchor="end" fontSize="12" fill="var(--muted)">
            μ = {fmt(mu, 2)} · r = {r} m · g = 9,8 m/s²
          </text>

          <text x={8} y={44} fontSize="12" fill={CV}>v = {fmt(v, 0)} m/s ≈ {fmt(v * 3.6, 0)} km/h</text>
          <text x={8} y={64} fontSize="12" fill={ok ? CF : CA}>
            a<tspan dy="3" fontSize="9">c</tspan>
            <tspan dy="-3"> = v²/r = {fmt(ac)} m/s²</tspan>
          </text>
          <text x={440} y={44} fontSize="12" fill={CA}>Límite: μg = {fmt(alim)} m/s²</text>
          <text x={440} y={64} fontSize="12" fill="var(--text)">
            v<tspan dy="3" fontSize="9">máx</tspan>
            <tspan dy="-3"> = {fmt(vmax, 0)} m/s ≈ {fmt(vmax * 3.6, 0)} km/h</tspan>
          </text>

          <circle cx={CX} cy={CY} r={RR} fill="none" stroke="var(--border)" strokeWidth="30" />
          <circle cx={CX} cy={CY} r={RR} fill="none" stroke="var(--muted)" strokeWidth="1" strokeDasharray="6 6" opacity=".6" />
          <circle cx={CX} cy={CY} r="3" fill="var(--muted)" />
          <text x={CX + 8} y={CY - 6} fontSize="11" fill="var(--muted)">centro</text>
          <line x1={CX} x2={CX} y1={CY} y2={CAR_Y - 10} stroke="var(--muted)" strokeDasharray="2 3" />
          <text x={CX + 6} y={CY + 52} fontSize="12" fill="var(--text)">r = {r} m</text>

          {lenF >= 3 && (
            <line x1={300} x2={300} y1={yF} y2={yF - lenF} stroke={ok ? CF : CA} strokeWidth="3" markerEnd="url(#tn-f)" />
          )}
          <line x1={292} x2={308} y1={yF - lenL} y2={yF - lenL} stroke={CA} strokeWidth="2" />

          <g transform={`translate(${CX} ${CAR_Y})`}>
            <rect x="-16" y="-8" width="32" height="16" rx="4" fill="var(--text)" stroke="var(--accent)" strokeWidth="2" />
            {[-14, 7].map(wx => [-11, 8].map(wy => (
              <rect key={`${wx}${wy}`} x={wx} y={wy} width="7" height="3" rx="1" fill="var(--muted)" />
            )))}
          </g>
          {lenV >= 3 && (
            <>
              <line x1={CX + 20} x2={CX + 20 + lenV} y1={CAR_Y} y2={CAR_Y} stroke={CV} strokeWidth="3" markerEnd="url(#tn-v)" />
              <text x={CX + 20 + lenV / 2} y={CAR_Y - 10} textAnchor="middle" fontSize="12" fill={CV}>v</text>
            </>
          )}

          <text x={W / 2} y={246} textAnchor="middle" fontSize="13" fontWeight="600" fill={ok ? OK : CA}>
            {ok
              ? 'Agarre suficiente: la fricción necesaria no supera la máxima (a_c ≤ μg)'
              : 'La fricción no alcanza (a_c > μg): el auto se desliza hacia afuera de la curva'}
          </text>
        </svg>
        <div className="muted" style={{ fontSize: 13 }}>
          <P>
            Con v = rω y a_c = rω² [M3] sale a_c = v²/r (derivación propia). Si el agarre total es μmg [M2], la masa se
            cancela y la rapidez máxima es v = √(μgr). Es una cota simplificada: no incluye carga aerodinámica ni
            transferencia de carga. El esquema es una vista desde arriba con valores propios, no representa a ningún auto
            real. Escalas: 1,6 px por m/s en la velocidad y 4 px por m/s² en las aceleraciones (las flechas se recortan
            por encima de ≈ 19 m/s²; las cifras son las exactas).
          </P>
        </div>
      </figure>

      <label style={{ display: 'block', margin: '12px 0' }}>
        Coeficiente de agarre μ: <strong>{fmt(mu, 2)}</strong>
        <input type="range" min={0.6} max={2} step={0.05} value={mu} onChange={e => setMu(+e.target.value)} style={{ width: '100%' }} />
      </label>
      <label style={{ display: 'block', margin: '12px 0' }}>
        Radio de la curva r: <strong>{r} m</strong>
        <input type="range" min={20} max={200} step={5} value={r} onChange={e => setR(+e.target.value)} style={{ width: '100%' }} />
      </label>
      <label style={{ display: 'block', margin: '12px 0' }}>
        Rapidez v: <strong>{fmt(v, 0)} m/s ({fmt(v * 3.6, 0)} km/h)</strong>
        <input type="range" min={5} max={60} step={1} value={v} onChange={e => setV(+e.target.value)} style={{ width: '100%' }} />
      </label>
    </>
  )
}