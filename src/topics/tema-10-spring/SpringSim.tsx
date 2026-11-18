import { useEffect, useMemo, useState } from 'react'
import { cCrit, disp, euler, overshoot, pos, regime, settle, settleFrom, w0, wd, zeta, type Regime } from '../../lib/physics/spring'

const W = 640, H = 300, L = 52, R = 16, T = 16, B = 40
const SLOW = 0.5
const FPS = 60
const COL: Record<Regime, string> = { sub: '#fbbf24', crit: '#34d399', sobre: '#22d3ee' }
const NAME: Record<Regime, string> = { sub: 'Subamortiguado', crit: 'Crítico', sobre: 'Sobreamortiguado' }
const PRESETS: { r: Regime; z: number }[] = [{ r: 'sub', z: 0.25 }, { r: 'crit', z: 1 }, { r: 'sobre', z: 2.5 }]

type SP = { l: string; u: string; v: number; set: (n: number) => void; min: number; max: number; step: number; d?: number }

function Sl({ l, u, v, set, min, max, step, d = 1 }: SP) {
  return (
    <label style={{ display: 'grid', gap: 4, fontSize: 14 }}>
      <span>{l}: <b>{v.toFixed(d)}</b> {u}</span>
      <input type="range" min={min} max={max} step={step} value={v} onChange={e => set(+e.target.value)} />
    </label>
  )
}

export default function SpringSim() {
  const [k, setK] = useState(100)
  const [c, setC] = useState(10)
  const [m, setM] = useState(1)
  const [f, setF] = useState(0.35)
  const [play, setPlay] = useState(false)
  const [frames, setFrames] = useState(false)

  const s = useMemo(() => ({ k, c, m }), [k, c, m])
  const z = zeta(s), rg = regime(z), col = COL[rg]
  const os = overshoot(z)
  const ts = useMemo(() => settle(s), [s])
  const ex = useMemo(() => euler(s, 1 / FPS, 10), [s])
  const ts60 = settleFrom(ex, 1 / FPS)
  const TW = ts ? Math.min(6, Math.max(0.6, ts * 1.5)) : 6

  useEffect(() => {
    if (!play) return
    let last = performance.now(), id = 0
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      setF(p => Math.min(1, p + (dt * SLOW) / TW))
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [play, TW])

  useEffect(() => { if (play && f >= 1) setPlay(false) }, [play, f])

  const ym = Math.max(1.1, (1 + os) * 1.08)
  const px = (t: number) => L + (t / TW) * (W - L - R)
  const py = (p: number) => H - B - (p / ym) * (H - B - T)
  const N = 240
  const curve = Array.from({ length: N + 1 }, (_, i) => { const t = (TW * i) / N; return `${i ? 'L' : 'M'}${px(t).toFixed(1)} ${py(pos(s, t)).toFixed(1)}` }).join('')
  const nf = Math.min(ex.length - 1, Math.floor(TW * FPS))
  const stepped = Array.from({ length: nf + 1 }, (_, i) => `${i ? 'L' : 'M'}${px(i / FPS).toFixed(1)} ${py(1 - ex[i]).toFixed(1)}`).join('')

  const t = f * TW
  const p = pos(s, t)
  const RW = 640, RH = 76, RL = 40, RR = 40
  const rx = (q: number) => RL + (q / ym) * (RW - RL - RR)
  const ey = rx(p), ay = rx(1), cy = RH / 2
  const coil = Math.abs(ey - ay) < 6 ? '' : Array.from({ length: 13 }, (_, i) => {
    const a = i / 12
    return `${i ? 'L' : 'M'}${(ay + (ey - ay) * a).toFixed(1)} ${(cy + (i === 0 || i === 12 ? 0 : i % 2 ? -7 : 7)).toFixed(1)}`
  }).join('')

  const preset = (zt: number) => setC(2 * zt * Math.sqrt(k * m))
  const btn = { padding: '.4rem .9rem', borderRadius: 8, border: '1px solid var(--accent)', background: 'transparent', color: 'var(--text)', cursor: 'pointer', font: 'inherit' } as const

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <svg viewBox={`0 0 ${RW} ${RH}`} role="img" aria-label="Elemento unido por un resorte a su posición objetivo" style={{ width: '100%', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 8 }}>
        <line x1={rx(0)} x2={rx(ym)} y1={cy + 22} y2={cy + 22} stroke="var(--border)" />
        <line x1={rx(0)} x2={rx(0)} y1={cy + 16} y2={cy + 28} stroke="var(--muted)" />
        <line x1={ay} x2={ay} y1={8} y2={RH - 8} stroke="var(--accent)" strokeDasharray="4 3" strokeWidth="2" />
        <text x={ay} y={RH - 1} fill="var(--accent)" fontSize="10" textAnchor="middle">objetivo (100 %)</text>
        <text x={rx(0)} y={RH - 1} fill="var(--muted)" fontSize="10" textAnchor="middle">inicio (0 %)</text>
        {coil && <path d={coil} fill="none" stroke="var(--muted)" strokeWidth="2" />}
        <rect x={ey - 14} y={cy - 14} width="28" height="28" rx="6" fill={col} />
      </svg>

      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Posición del elemento en función del tiempo" style={{ width: '100%', background: 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 8 }}>
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i} fill="var(--muted)" fontSize="11">
            <line x1={px((TW * i) / 4)} x2={px((TW * i) / 4)} y1={T} y2={H - B} stroke="var(--border)" />
            <text x={px((TW * i) / 4)} y={H - B + 16} textAnchor="middle">{((TW * i) / 4).toFixed(2)}</text>
            <line x1={L} x2={W - R} y1={py((ym * i) / 4)} y2={py((ym * i) / 4)} stroke="var(--border)" />
            <text x={L - 6} y={py((ym * i) / 4) + 4} textAnchor="end">{(((ym * i) / 4) * 100).toFixed(0)}</text>
          </g>
        ))}
        <text x={W / 2} y={H - 6} textAnchor="middle" fill="var(--muted)" fontSize="12">t: tiempo (s)</text>
        <text transform={`translate(14 ${H / 2}) rotate(-90)`} textAnchor="middle" fill="var(--muted)" fontSize="12">posición (% del recorrido)</text>
        <rect x={L} y={py(1.02)} width={W - L - R} height={py(0.98) - py(1.02)} fill="var(--accent)" opacity="0.18" />
        <line x1={L} x2={W - R} y1={py(1)} y2={py(1)} stroke="var(--accent)" strokeDasharray="6 4" />
        {ts && ts < TW && <line x1={px(ts)} x2={px(ts)} y1={T} y2={H - B} stroke="var(--muted)" strokeDasharray="2 3" />}
        {frames && <path d={stepped} fill="none" stroke="var(--text)" strokeDasharray="3 3" strokeWidth="1.5" />}
        <path d={curve} fill="none" stroke={col} strokeWidth="3" />
        <line x1={px(t)} x2={px(t)} y1={py(p)} y2={py(0)} stroke="var(--muted)" strokeDasharray="2 3" />
        <circle cx={px(t)} cy={py(p)} r="5" fill={col} />
        <g fontSize="12">
          <line x1={W - 250} x2={W - 226} y1={28} y2={28} stroke={col} strokeWidth="3" />
          <text x={W - 220} y={32} fill="var(--text)">x(t) analítica ({NAME[rg]})</text>
          <line x1={W - 250} x2={W - 226} y1={46} y2={46} stroke="var(--accent)" strokeDasharray="6 4" />
          <text x={W - 220} y={50} fill="var(--text)">objetivo; banda = ±2 %</text>
          {frames && <><line x1={W - 250} x2={W - 226} y1={64} y2={64} stroke="var(--text)" strokeDasharray="3 3" /><text x={W - 220} y={68} fill="var(--text)">integración a {FPS} fotogramas/s</text></>}
        </g>
      </svg>

      <p className="muted" style={{ margin: 0, fontSize: 13 }}>
        Modelo propio, normalizado: el recorrido completo vale 1 (100 %), parte del reposo (v₀ = 0) y m, k, c se dan en kg, N/m y N·s/m del modelo.
        El resultado se recalcula con las ecuaciones del Tema al mover cualquier control. La reproducción va a cámara lenta (×{SLOW}).
      </p>

      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        <Sl l="Rigidez k" u="N/m" v={k} set={setK} min={10} max={1000} step={10} d={0} />
        <Sl l="Amortiguamiento c" u="N·s/m" v={c} set={setC} min={0} max={150} step={0.5} />
        <Sl l="Masa m" u="kg" v={m} set={setM} min={0.5} max={5} step={0.1} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
        <span style={{ fontSize: 14 }}>Ajustar c a:</span>
        {PRESETS.map(q => <button key={q.r} type="button" style={btn} onClick={() => preset(q.z)}>{NAME[q.r]} (ζ = {q.z.toString().replace('.', ',')})</button>)}
        <button type="button" style={btn} onClick={() => { if (f >= 1) setF(0); setPlay(v => !v) }}>{play ? '⏸ Pausar' : '▶ Reproducir'}</button>
        <label style={{ fontSize: 14, display: 'flex', gap: 6, alignItems: 'center' }}>
          <input type="checkbox" checked={frames} onChange={e => setFrames(e.target.checked)} /> Mostrar integración por fotogramas
        </label>
      </div>

      <label style={{ display: 'grid', gap: 4, fontSize: 14 }}>
        <span>Tiempo t: <b>{t.toFixed(2)}</b> s</span>
        <input type="range" min={0} max={1} step={0.005} value={f} onChange={e => { setPlay(false); setF(+e.target.value) }} />
      </label>

      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', fontSize: 14 }}>
        <div>Régimen: <b style={{ color: col }}>{NAME[rg]}</b></div>
        <div>ζ = c / c<sub>crít</sub>: <b>{z.toFixed(2)}</b></div>
        <div>c<sub>crít</sub> = 2√(km): <b>{cCrit(s).toFixed(1)} N·s/m</b></div>
        <div>ω₀ = √(k/m): <b>{w0(s).toFixed(2)} rad/s</b></div>
        <div>ω<sub>d</sub>: <b>{z < 1 ? `${wd(s).toFixed(2)} rad/s` : 'no oscila'}</b></div>
        <div>Sobreimpulso: <b>{(os * 100).toFixed(1)} %</b></div>
        <div>Asentamiento (±2 %): <b>{ts ? `${ts.toFixed(2)} s` : 'más de 10 s'}</b></div>
        <div>A {FPS} fotogramas/s: <b>{ts60 ? `${ts60.toFixed(2)} s` : 'más de 10 s'}</b></div>
        <div>Duración equivalente 2π/ω₀: <b>{(2 * Math.PI / w0(s)).toFixed(2)} s</b></div>
        <div>En t: posición = <b>{(p * 100).toFixed(1)} %</b></div>
        <div>Desplazamiento x = <b>{(disp(s, t) * 100).toFixed(1)} %</b></div>
      </div>
    </div>
  )
}