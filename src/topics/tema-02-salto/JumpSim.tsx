import { useState } from 'react'
import { solve, yAt, path } from '../../lib/physics/jump'

const W = 640, H = 300, L = 52, R = 16, T = 16, B = 40

type SP = { l: string; u: string; v: number; set: (n: number) => void; min: number; max: number; step: number }

function Sl({ l, u, v, set, min, max, step }: SP) {
  return (
    <label style={{ display: 'grid', gap: 4, fontSize: 14 }}>
      <span>{l}: <b>{v.toFixed(1)}</b> {u}</span>
      <input type="range" min={min} max={max} step={step} value={v} onChange={e => set(+e.target.value)} />
    </label>
  )
}

export default function JumpSim() {
  const [v0, setV0] = useState(8)
  const [gu, setGu] = useState(20)
  const [gd, setGd] = useState(40)
  const [vx, setVx] = useState(4)
  const [f, setF] = useState(0.5)

  const j = { v0, gu, gd, vx }
  const ref = { v0, gu: 9.81, gd: 9.81, vx }
  const s = solve(j), r = solve(ref)
  const xm = Math.max(s.R, r.R, 1) * 1.05
  const ym = Math.max(s.h, r.h, 1) * 1.15
  const px = (x: number) => L + (x / xm) * (W - L - R)
  const py = (y: number) => H - B - (y / ym) * (H - B - T)
  const d = (p: { x: number; y: number }[]) =>
    p.map((q, i) => `${i ? 'L' : 'M'}${px(q.x).toFixed(1)} ${py(q.y).toFixed(1)}`).join('')

  const t = f * s.T
  const x = vx * t
  const y = yAt(j, t)
  const vy = t <= s.tUp ? v0 - gu * t : -gd * (t - s.tUp)
  const tk = [0, 1, 2, 3, 4]

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 8 }}>
        {tk.map(k => (
          <g key={k} fill="var(--muted)" fontSize="11">
            <line x1={px(xm * k / 4)} x2={px(xm * k / 4)} y1={T} y2={H - B} stroke="var(--border)" />
            <text x={px(xm * k / 4)} y={H - B + 16} textAnchor="middle">{(xm * k / 4).toFixed(1)}</text>
            <line x1={L} x2={W - R} y1={py(ym * k / 4)} y2={py(ym * k / 4)} stroke="var(--border)" />
            <text x={L - 6} y={py(ym * k / 4) + 4} textAnchor="end">{(ym * k / 4).toFixed(1)}</text>
          </g>
        ))}
        <line x1={L} x2={W - R} y1={py(0)} y2={py(0)} stroke="var(--muted)" />
        <text x={W / 2} y={H - 6} textAnchor="middle" fill="var(--muted)" fontSize="12">x: posición horizontal (m)</text>
        <text transform={`translate(14 ${H / 2}) rotate(-90)`} textAnchor="middle" fill="var(--muted)" fontSize="12">y: altura (m)</text>
        <path d={d(path(ref))} fill="none" stroke="var(--muted)" strokeDasharray="6 4" strokeWidth="2" />
        <path d={d(path(j))} fill="none" stroke="var(--accent)" strokeWidth="3" />
        <circle cx={px(x)} cy={py(y)} r="7" fill="var(--text)" stroke="var(--accent)" strokeWidth="3" />
        <g fontSize="12">
          <line x1={W - 210} x2={W - 186} y1={28} y2={28} stroke="var(--accent)" strokeWidth="3" />
          <text x={W - 180} y={32} fill="var(--text)">Tu modelo</text>
          <line x1={W - 210} x2={W - 186} y1={46} y2={46} stroke="var(--muted)" strokeWidth="2" strokeDasharray="6 4" />
          <text x={W - 180} y={50} fill="var(--text)">g = 9,81 m/s² (realista)</text>
        </g>
      </svg>

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <Sl l="Impulso de salto v₀" u="m/s" v={v0} set={setV0} min={2} max={16} step={0.5} />
        <Sl l="Gravedad de subida" u="m/s²" v={gu} set={setGu} min={5} max={60} step={0.5} />
        <Sl l="Gravedad de caída" u="m/s²" v={gd} set={setGd} min={5} max={80} step={0.5} />
        <Sl l="Velocidad horizontal vₓ" u="m/s" v={vx} set={setVx} min={0} max={12} step={0.5} />
      </div>

      <label style={{ display: 'grid', gap: 4, fontSize: 14 }}>
        <span>Tiempo t: <b>{t.toFixed(2)}</b> s</span>
        <input type="range" min={0} max={1} step={0.01} value={f} onChange={e => setF(+e.target.value)} />
      </label>

      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', fontSize: 14 }}>
        <div>Altura máxima: <b>{s.h.toFixed(2)} m</b></div>
        <div>Tiempo en el aire: <b>{s.T.toFixed(2)} s</b></div>
        <div>Alcance: <b>{s.R.toFixed(2)} m</b></div>
        <div>Con g = 9,81: <b>{r.h.toFixed(2)} m · {r.T.toFixed(2)} s</b></div>
        <div>En t: x = <b>{x.toFixed(2)} m</b></div>
        <div>y = <b>{y.toFixed(2)} m</b></div>
        <div>vᵧ = <b>{vy.toFixed(2)} m/s</b></div>
      </div>
    </div>
  )
}