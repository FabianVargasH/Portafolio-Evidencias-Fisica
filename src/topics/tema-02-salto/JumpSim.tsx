import { useEffect, useState } from 'react'
import { solve, yAt, path } from '../../lib/physics/jump'

const W = 640, H = 300, L = 52, R = 16, T = 16, B = 40
const VX = '#22d3ee', VY = '#a78bfa', GA = '#fbbf24'
const SLOW = 0.5 // 1 = tiempo real; 0.5 = cámara lenta
const LMAX = 36  // largo máximo de las flechas de velocidad (px)

const arrow = (x1: number, y1: number, x2: number, y2: number, c: string, m: string) =>
  Math.hypot(x2 - x1, y2 - y1) < 3 ? null : (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="2.5" markerEnd={`url(#${m})`} />
  )

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
  const [play, setPlay] = useState(false)

  const j = { v0, gu, gd, vx }
  const ref = { v0, gu: 9.81, gd: 9.81, vx }
  const s = solve(j), r = solve(ref)

  useEffect(() => {
    if (!play) return
    let last = performance.now(), id = 0
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      setF(p => Math.min(1, p + (dt * SLOW) / s.T))
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [play, s.T])

  useEffect(() => { if (play && f >= 1) setPlay(false) }, [play, f])

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

  const ga = t <= s.tUp ? gu : gd
  const k = LMAX / Math.max(v0, vx, gd * s.tDown, 1)
  const cx = px(x), yb = py(y), yt = yb - 18
  const ys = vy >= 0 ? yt : yb

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 8 }}>
        <defs>
          {([['js-ax', VX], ['js-ay', VY], ['js-ag', GA]] as const).map(([id, c]) => (
            <marker key={id} id={id} viewBox="0 0 6 6" refX="5" refY="3" markerUnits="userSpaceOnUse" markerWidth="9" markerHeight="9" orient="auto">
              <path d="M0 0L6 3L0 6z" fill={c} />
            </marker>
          ))}
        </defs>
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
        <line x1={cx} x2={cx} y1={yb} y2={py(0)} stroke="var(--muted)" strokeDasharray="2 3" />
        <line x1={L} x2={cx} y1={yb} y2={yb} stroke="var(--muted)" strokeDasharray="2 3" />
        {arrow(cx + 8, yb - 9, cx + 8 + vx * k, yb - 9, VX, 'js-ax')}
        {arrow(cx, ys, cx, ys - vy * k, VY, 'js-ay')}
        {arrow(cx - 12, yb - 12, cx - 12, yb - 12 + (30 * ga) / Math.max(gu, gd, 1), GA, 'js-ag')}
        <g stroke="var(--text)" strokeWidth="2.6" strokeLinecap="round" fill="none">
          <circle cx={cx} cy={yt + 3.5} r="3.3" fill="var(--text)" stroke="none" />
          <path d={`M${cx} ${yt + 7}V${yt + 12}M${cx} ${yt + 8.5}L${cx - 6} ${yt + 4}M${cx} ${yt + 8.5}L${cx + 6} ${yt + 4}M${cx} ${yt + 12}L${cx - 4.5} ${yt + 18}M${cx} ${yt + 12}L${cx + 4.5} ${yt + 18}`} />
        </g>        <g fontSize="12">
          <line x1={W - 210} x2={W - 186} y1={28} y2={28} stroke="var(--accent)" strokeWidth="3" />
          <text x={W - 180} y={32} fill="var(--text)">Tu modelo</text>
          <line x1={W - 210} x2={W - 186} y1={46} y2={46} stroke="var(--muted)" strokeWidth="2" strokeDasharray="6 4" />
          <text x={W - 180} y={50} fill="var(--text)">g = 9,81 m/s² (realista)</text>
          <line x1={W - 210} x2={W - 186} y1={64} y2={64} stroke={VX} strokeWidth="2.5" markerEnd="url(#js-ax)" />
          <text x={W - 180} y={68} fill="var(--text)">vₓ = {vx.toFixed(1)} m/s</text>
          <line x1={W - 210} x2={W - 186} y1={82} y2={82} stroke={VY} strokeWidth="2.5" markerEnd="url(#js-ay)" />
          <text x={W - 180} y={86} fill="var(--text)">vᵧ = {vy.toFixed(1)} m/s</text>
          <line x1={W - 210} x2={W - 186} y1={100} y2={100} stroke={GA} strokeWidth="2.5" markerEnd="url(#js-ag)" />
          <text x={W - 180} y={104} fill="var(--text)">a = {ga.toFixed(1)} m/s² (hacia abajo)</text>
        </g>
      </svg>

      <p className="muted" style={{ margin: 0, fontSize: 13 }}>
        El personaje es una figura esquemática. Las flechas de velocidad (vₓ, vᵧ) usan la misma escala entre sí; la de aceleración usa otra.
      </p>

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <Sl l="Impulso de salto v₀" u="m/s" v={v0} set={setV0} min={2} max={16} step={0.5} />
        <Sl l="Gravedad de subida" u="m/s²" v={gu} set={setGu} min={5} max={60} step={0.5} />
        <Sl l="Gravedad de caída" u="m/s²" v={gd} set={setGd} min={5} max={80} step={0.5} />
        <Sl l="Velocidad horizontal vₓ" u="m/s" v={vx} set={setVx} min={0} max={12} step={0.5} />
      </div>

      <button
        type="button"
        onClick={() => { if (f >= 1) setF(0); setPlay(p => !p) }}
        style={{ justifySelf: 'start', padding: '.5rem 1.1rem', borderRadius: 8, border: '1px solid var(--accent)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', font: 'inherit' }}
      >
        {play ? '⏸ Pausar' : '▶ Reproducir'}
      </button>

      <label style={{ display: 'grid', gap: 4, fontSize: 14 }}>
        <span>Tiempo t: <b>{t.toFixed(2)}</b> s</span>
        <input type="range" min={0} max={1} step={0.01} value={f} onChange={e => { setPlay(false); setF(+e.target.value) }} />
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