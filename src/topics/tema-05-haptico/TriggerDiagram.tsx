import { P } from '../../components/ui/Cited'

const W = 640, H = 276, L = 64, R = 20, BODY = 44
const CF = '#22d3ee', CR = '#f87171', CA = '#fbbf24'
const FSC = 8 // píxeles por newton (solo para dibujar las flechas)

const fmt = (v: number, d = 1) => v.toLocaleString('es', { maximumFractionDigits: d })

interface Props { x: number; x0: number; k: number; F: number; xmax: number }

export default function TriggerDiagram({ x, x0, k, F, xmax }: Props) {
  const px = (m: number) => L + (m / xmax) * (W - L - R - BODY)
  const cx = px(x), c0 = px(x0), cEnd = px(xmax), cStart = px(0)
  const len = F * FSC
  const on = x > x0
  const ticks = Array.from({ length: Math.floor(xmax / 5) + 1 }, (_, i) => i * 5)

  let zig = `M${c0.toFixed(1)} 200`
  for (let i = 1; i < 8; i++) {
    zig += `L${(c0 + ((cx - c0) * i) / 8).toFixed(1)} ${i % 2 ? 192 : 208}`
  }
  zig += `L${cx.toFixed(1)} 200`

  return (
    <figure className="chart" style={{ margin: '12px 0' }}>
      <figcaption>Esquema del gatillo con sus magnitudes (modelo ilustrativo)</figcaption>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`Esquema del gatillo: recorrido ${fmt(x)} mm, fuerza ${fmt(F)} N`}
        style={{ width: '100%' }}
      >
        <defs>
          {([['td-f', CF], ['td-r', CR]] as const).map(([id, c]) => (
            <marker key={id} id={id} viewBox="0 0 6 6" refX="5" refY="3" markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" orient="auto">
              <path d="M0 0L6 3L0 6z" fill={c} />
            </marker>
          ))}
        </defs>

        <text x={W - R} y={16} textAnchor="end" fontSize="12" fill="var(--muted)">
          x = {fmt(x)} mm · x₀ = {fmt(x0)} mm · k = {k} N/m
        </text>

        <text x={8} y={36} fontSize="12" fill={CF}>F del dedo sobre el gatillo = {fmt(F)} N</text>
        {len >= 3 && (
          <line x1={cx - len} x2={cx} y1={48} y2={48} stroke={CF} strokeWidth="3" markerEnd="url(#td-f)" />
        )}

        <line x1={cx} x2={cx} y1={110} y2={225} stroke="var(--muted)" strokeDasharray="2 3" opacity=".6" />
        <rect x={cx - BODY} y={70} width={BODY} height={40} rx="18" fill="var(--border)" stroke="var(--muted)" strokeWidth="2" />
        <text x={cx - BODY / 2} y={94} textAnchor="middle" fontSize="11" fill="var(--text)">dedo</text>
        <rect x={cx} y={70} width={BODY} height={40} rx="6" fill="var(--bg)" stroke="var(--accent)" strokeWidth="3" />
        <text x={cx + BODY / 2} y={94} textAnchor="middle" fontSize="11" fill="var(--text)">gatillo</text>

        {len >= 3 && (
          <line x1={cx} x2={cx - len} y1={130} y2={130} stroke={CR} strokeWidth="3" markerEnd="url(#td-r)" />
        )}
        <text x={8} y={148} fontSize="12" fill={CR}>F del gatillo sobre el dedo = {fmt(F)} N</text>

        <line x1={c0} x2={c0} y1={168} y2={232} stroke={CA} strokeDasharray="4 3" strokeWidth="2" />
        <text x={c0} y={164} textAnchor="middle" fontSize="12" fill={CA}>x₀</text>

        <text x={8} y={184} fontSize="12" fill="var(--text)">
          {on
            ? `Resorte virtual: F = k(x − x₀) = ${k} N/m × ${fmt((x - x0) / 1000, 3)} m = ${fmt(F)} N`
            : 'Recorrido libre (x ≤ x₀): el motor no opone fuerza'}
        </text>
        {on && <path d={zig} fill="none" stroke={CR} strokeWidth="2" strokeDasharray="5 3" />}

        <line x1={cStart} x2={c0} y1={232} y2={232} stroke="var(--muted)" strokeWidth="6" />
        <line x1={c0} x2={cEnd} y1={232} y2={232} stroke={CR} strokeWidth="6" opacity=".55" />
        {c0 - cStart > 70 && (
          <text x={(cStart + c0) / 2} y={222} textAnchor="middle" fontSize="11" fill="var(--muted)">libre (F = 0)</text>
        )}
        {cEnd - c0 > 90 && (
          <text x={(c0 + cEnd) / 2} y={222} textAnchor="middle" fontSize="11" fill="var(--muted)">zona del motor</text>
        )}
        {ticks.map(m => (
          <g key={m} fill="var(--muted)" fontSize="11">
            <line x1={px(m)} x2={px(m)} y1={226} y2={238} stroke="var(--muted)" />
            <text x={px(m)} y={252} textAnchor="middle">{m}</text>
          </g>
        ))}
        <circle cx={cx} cy={232} r="7" fill={CF} stroke="var(--bg)" strokeWidth="2" />
        <text x={W / 2} y={270} textAnchor="middle" fontSize="12" fill="var(--muted)">x: recorrido del gatillo (mm)</text>
      </svg>
      <div className="muted" style={{ fontSize: 13 }}>
        <P>
          Tercera ley [M2]: la fuerza del dedo sobre el gatillo y la del gatillo sobre el dedo tienen igual magnitud y
          sentido opuesto; la roja es la que siente el jugador. El esquema es una simplificación con valores propios:
          representa el recorrido como un desplazamiento en línea recta, igual que el modelo, y no es una vista real del
          DualSense. Las flechas usan una misma escala (8 px por newton).
        </P>
      </div>
    </figure>
  )
}