// src/topics/tema-07-restitucion/RestitutionExplorer.tsx
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import LineChartCard from '../../components/ui/LineChartCard'
import { bounceTrajectory, collide1D, DEFAULT_THRESHOLD, totalBounceTime } from '../../lib/physics/restitution'

const H0 = 0.92 // m, altura de caída del experimento de [6]
const E_REF = 0.75 // pelota de mano, e = 0,752 según [6]
const T_MAX = 8 // s
const DT = 0.01 // s
const f = (x: number, d = 2) =>
  Number.isFinite(x) ? x.toLocaleString('es-CR', { minimumFractionDigits: d, maximumFractionDigits: d }) : '—'

const BOX = { background: '#121827', border: '1px solid #1f2940', borderRadius: 8, padding: 16, margin: '12px 0' } as const
const MUTED = '#9aa4b8'

function Slider(props: {
  label: string
  unit: string
  value: number
  min: number
  max: number
  step: number
  onChange: (v: number) => void
  digits?: number
}) {
  const { label, unit, value, min, max, step, onChange, digits = 2 } = props
  return (
    <label style={{ display: 'block', margin: '8px 0' }}>
      <span style={{ color: MUTED }}>{label} = </span>
      <strong>
        {f(value, digits)} {unit}
      </strong>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ width: '100%' }}
        onChange={e => onChange(Number(e.target.value))}
      />
    </label>
  )
}

function Chip({ children, active, onClick }: { children: ReactNode; active?: boolean; onClick: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '6px 14px',
        borderRadius: 999,
        border: `1px solid ${active ? '#60a5fa' : hover ? '#3b4a6b' : '#1f2940'}`,
        background: active ? 'rgba(96,165,250,0.16)' : hover ? '#1a2238' : '#0d1322',
        color: active ? '#bfdbfe' : '#cbd5e1',
        fontSize: 13,
        fontFamily: 'inherit',
        cursor: 'pointer',
        transition: 'background 0.15s, border-color 0.15s, color 0.15s',
      }}
    >
      {children}
    </button>
  )
}

/* ---------- Escena A: rebote contra el piso ---------- */
function FloorScene() {
  const [e, setE] = useState(0.95)
  const [thr, setThr] = useState(0)
  const [run, setRun] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const ref = useMemo(() => bounceTrajectory(H0, E_REF, DEFAULT_THRESHOLD, T_MAX, DT), [])
  const user = useMemo(() => bounceTrajectory(H0, e, thr, T_MAX, DT), [e, thr])
  const is = (e0: number, t0: number) => Math.abs(e - e0) < 0.001 && Math.abs(thr - t0) < 0.001

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const W = cv.width
    const H = cv.height
    const ground = H - 36
    const r = 14
    const scale = (ground - 2 * r - 44) / H0
    const t0 = performance.now()
    let raf = 0
    const ball = (x: number, y: number, color: string) => {
      ctx.beginPath()
      ctx.arc(x, ground - y * scale - r, r, 0, 2 * Math.PI)
      ctx.fillStyle = color
      ctx.fill()
    }
    const draw = (now: number) => {
      const elapsed = Math.max(0, (now - t0) / 1000)
      const t = elapsed % (T_MAX + 1)
      const i = Math.min(Math.max(0, Math.floor(t / DT)), user.length - 1)
      const iRef = Math.min(Math.max(0, Math.floor(t / DT)), ref.length - 1)

      ctx.clearRect(0, 0, W, H)
      ctx.strokeStyle = '#1f2940'
      ctx.beginPath()
      ctx.moveTo(0, ground)
      ctx.lineTo(W, ground)
      ctx.stroke()
      ctx.fillStyle = MUTED
      ctx.font = '13px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`Referencia (e = ${f(E_REF)}, umbral ${f(DEFAULT_THRESHOLD, 1)} m/s)`, W * 0.25, 18)
      ctx.fillText('Tu pelota (controles)', W * 0.75, 18)
      ctx.fillText(`t = ${f(Math.min(t, T_MAX))} s`, W * 0.5, H - 10)

      if (ref[iRef]) ball(W * 0.25, ref[iRef].y, '#60a5fa')
      if (user[i]) ball(W * 0.75, user[i].y, '#f87171')
      
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [ref, user, run])

  const chart = useMemo(() => {
    const step = 2
    const n = Math.min(ref.length, user.length)
    const out: { t: number; ref: number; user: number }[] = []
    for (let i = 0; i < n; i += step) out.push({ t: Number(ref[i].t.toFixed(2)), ref: ref[i].y, user: user[i].y })
    return out
  }, [ref, user])

  const restAt = (traj: { t: number; y: number }[]) => {
    if (traj.length === 0) return null
    const tail = traj.slice(-Math.round(1 / DT))
    if (tail.some(p => p.y > 0.0005)) return null
    for (let i = traj.length - 1; i >= 0; i--) if (traj[i].y > 0.0005) return traj[Math.min(i + 1, traj.length - 1)].t
    return traj[0].t
  }
  const tUser = restAt(user)

  return (
    <div style={BOX}>
      <h4 style={{ marginTop: 0 }}>Escena A: una pelota que rebota contra el piso</h4>
      <p style={{ color: MUTED }}>
        Las dos pelotas se sueltan desde H₀ = {f(H0)} m. En cada impacto, v′ = −e·v. Mueve e y el umbral de rebote y
        compara.
      </p>
      <Slider label="Coeficiente de restitución e" unit="" value={e} min={0} max={1} step={0.01} onChange={setE} />
      <Slider
        label="Umbral de rebote"
        unit="m/s"
        value={thr}
        min={0}
        max={3}
        step={0.1}
        digits={1}
        onChange={setThr}
      />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '12px 0 16px' }}>
        <Chip active={is(1, 0)} onClick={() => { setE(1); setThr(0) }}>
          e = 1 · no pierde energía
        </Chip>
        <Chip active={is(0, 0)} onClick={() => { setE(0); setThr(0) }}>
          e = 0 · se pega
        </Chip>
        <Chip active={is(0.6, 0)} onClick={() => { setE(0.6); setThr(0) }}>
          e = 0,60 sin umbral · tiembla al final
        </Chip>
        <Chip active={is(E_REF, DEFAULT_THRESHOLD)} onClick={() => { setE(E_REF); setThr(DEFAULT_THRESHOLD) }}>
          Igual a la referencia
        </Chip>
        <Chip onClick={() => setRun(r => r + 1)}>↻ Soltar de nuevo</Chip>
      </div>
      <canvas ref={canvasRef} width={560} height={300} style={{ width: '100%', maxWidth: 560 }} />
      <LineChartCard
        title="Altura de la pelota en función del tiempo"
        data={chart}
        xKey="t"
        xLabel="Tiempo (s)"
        yLabel="Altura (m)"
        series={[
          { key: 'ref', name: `Referencia (e = ${f(E_REF)})`, color: '#60a5fa' },
          { key: 'user', name: `Tu pelota (e = ${f(e)})`, color: '#f87171' },
        ]}
      />
      <ul style={{ color: MUTED }}>
        <li>
          Altura del 1.er rebote, h₁ = e²·H₀: referencia {f(E_REF ** 2 * H0)} m; tu pelota {f(e ** 2 * H0)} m.
        </li>
        <li>
          Reposo sin umbral (serie geométrica): referencia {f(totalBounceTime(H0, E_REF))} s; tu pelota{' '}
          {Number.isFinite(totalBounceTime(H0, e)) ? `${f(totalBounceTime(H0, e))} s` : 'nunca (e = 1)'}.
        </li>
        <li>
          Reposo simulado de tu pelota (rebotes menores a 0,5 mm): {tUser === null ? `más de ${T_MAX} s` : `${f(tUser)} s`}.
        </li>
      </ul>
    </div>
  )
}

/* ---------- Escena B: colisión entre dos pelotas ---------- */
function CollisionScene() {
  const [m1, setM1] = useState(2)
  const [v1, setV1] = useState(3)
  const [m2, setM2] = useState(1)
  const [v2, setV2] = useState(0)
  const [e, setE] = useState(0.5)
  const hit = v1 > v2
  const c = collide1D(m1, v1, m2, v2, e)
  const after = hit ? { a: c.v1f, b: c.v2f } : { a: v1, b: v2 }

  const vmax = Math.max(0.5, Math.abs(v1), Math.abs(v2), Math.abs(after.a), Math.abs(after.b))
  const k = Math.min(22, 150 / vmax) // px por m/s, para que ninguna flecha se salga

  const row = (y: number, label: string, a: number, b: number) => {
    const r1 = 10 + 6 * Math.cbrt(m1)
    const r2 = 10 + 6 * Math.cbrt(m2)
    const arrow = (cx: number, rad: number, v: number, color: string) => {
      const s = Math.sign(v) || 1
      const x0 = cx + s * rad
      const x2 = x0 + v * k
      return (
        <g>
          <line x1={x0} y1={y} x2={x2} y2={y} stroke={color} strokeWidth={3} />
          {Math.abs(v) > 0.05 && (
            <polygon points={`${x2},${y} ${x2 - s * 8},${y - 5} ${x2 - s * 8},${y + 5}`} fill={color} />
          )}
          <text x={x2 + s * 6} y={y - 8} fill={color} fontSize={12} textAnchor={s > 0 ? 'start' : 'end'}>
            {f(v)} m/s
          </text>
        </g>
      )
    }
    return (
      <g>
        <text x={8} y={y + 4} fill={MUTED} fontSize={13}>
          {label}
        </text>
        <circle cx={190} cy={y} r={r1} fill="#60a5fa" fillOpacity={0.6} />
        <circle cx={380} cy={y} r={r2} fill="#f87171" fillOpacity={0.6} />
        {arrow(190, r1, a, '#bfdbfe')}
        {arrow(380, r2, b, '#fecaca')}
      </g>
    )
  }

  return (
    <div style={BOX}>
      <h4 style={{ marginTop: 0 }}>Escena B: choque frontal entre dos pelotas (momento lineal)</h4>
      <Slider label="Masa m₁ (azul)" unit="kg" value={m1} min={0.5} max={5} step={0.1} digits={1} onChange={setM1} />
      <Slider label="Velocidad inicial v₁" unit="m/s" value={v1} min={-4} max={6} step={0.1} digits={1} onChange={setV1} />
      <Slider label="Masa m₂ (roja)" unit="kg" value={m2} min={0.5} max={5} step={0.1} digits={1} onChange={setM2} />
      <Slider label="Velocidad inicial v₂" unit="m/s" value={v2} min={-4} max={4} step={0.1} digits={1} onChange={setV2} />
      <Slider label="Coeficiente de restitución e" unit="" value={e} min={0} max={1} step={0.01} onChange={setE} />
      <svg viewBox="0 0 560 150" style={{ width: '100%', maxWidth: 560 }}>
        {row(45, 'Antes', v1, v2)}
        {row(115, 'Después', after.a, after.b)}
      </svg>
      {!hit && (
        <p style={{ color: '#fbbf24' }}>
          Con v₁ ≤ v₂ la pelota azul no alcanza a la roja: no hay colisión. Aumenta v₁ o reduce v₂.
        </p>
      )}
      <table style={{ borderCollapse: 'collapse', width: '100%', color: MUTED }}>
        <thead>
          <tr>
            <th align="left">Magnitud</th>
            <th align="right">Antes</th>
            <th align="right">Después</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Momento lineal total p (kg·m/s)</td>
            <td align="right">{f(c.pBefore)} kg·m/s</td>
            <td align="right">{f(hit ? c.pAfter : c.pBefore)} kg·m/s</td>
          </tr>
          <tr>
            <td>Energía cinética total K (J)</td>
            <td align="right">{f(c.kBefore)} J</td>
            <td align="right">{f(hit ? c.kAfter : c.kBefore)} J</td>
          </tr>
          <tr>
            <td>Energía disipada, K antes − K después (J)</td>
            <td align="right" colSpan={2}>
              {f(hit ? c.kLost : 0)} J
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{ color: MUTED }}>
        El momento lineal se conserva siempre; la energía cinética solo si e = 1 (colisión elástica). Con e = 0 las
        pelotas quedan con la misma velocidad (colisión perfectamente inelástica).
      </p>
    </div>
  )
}

export default function RestitutionExplorer() {
  return (
    <>
      <FloorScene />
      <CollisionScene />
    </>
  )
}