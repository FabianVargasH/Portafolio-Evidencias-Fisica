const CX = 240
const CY = 235
const RO = 170 // radio exterior del casco (px, esquema sin escala)
const RF = 150 // radio del piso (px)

const c = {
  text: 'var(--text)',
  muted: 'var(--muted)',
  border: 'var(--border)',
  alt: 'var(--bg-alt)',
  acc: 'var(--accent-text, var(--accent))',
}
const serif = 'Georgia, "Source Serif 4", serif'

// punto en coordenadas de pantalla; deg se mide en sentido antihorario
const pt = (deg: number, r: number) => {
  const a = (deg * Math.PI) / 180
  return { x: CX + r * Math.cos(a), y: CY - r * Math.sin(a) }
}

// persona de pie en el piso (40° bajo la horizontal), con la cabeza hacia el eje
const feet = pt(-40, RF)
const u = { x: (CX - feet.x) / RF, y: (CY - feet.y) / RF }
const at = (d: number) => ({ x: feet.x + u.x * d, y: feet.y + u.y * d })
const body = at(28)
const head = at(34)
const mid = at(18)
const arm = { x: -u.y * 8, y: u.x * 8 }

// flecha curva de ω (antihorario, positivo)
const w0 = pt(20, 40)
const w1 = pt(150, 40)

const Ac = () => (
  <>
    a<tspan baselineShift="sub" fontSize="0.72em">c</tspan>
  </>
)

const eqs = [
  <>v = rω</>,
  <>
    <Ac /> = rω²
  </>,
  <>1 g: ω²r = g → ω = √(g/r)</>,
  <>T = 2π/ω, n = 60/T (rpm)</>,
]

const nums = [
  <>ω = √(9,8/200) ≈ 0,221 rad/s</>,
  <>T = 2π/ω ≈ 28,4 s</>,
  <>n = 60/T ≈ 2,11 rpm</>,
  <>v = rω ≈ 44,3 m/s</>,
  <>
    <Ac /> = rω² = 9,8 m/s² = 1 g
  </>,
]

const eqStyle = { fontFamily: serif, fontSize: 15, fill: c.text }

export default function HabitatDiagram() {
  return (
    <figure style={{ margin: '16px 0' }}>
      <svg
        viewBox="0 0 740 450"
        role="img"
        aria-label="Esquema de un hábitat rotatorio: eje de giro, radio de 200 m, velocidad tangencial, aceleración centripeta hacia el eje y ecuaciones con el caso numérico para 1 g"
        style={{ width: '100%', maxWidth: 760, height: 'auto', display: 'block', margin: '0 auto' }}
      >
        <defs>
          <marker id="h3-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" style={{ fill: c.acc }} />
          </marker>
          <marker id="h3-txt" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0 L10 5 L0 10 z" style={{ fill: c.text }} />
          </marker>
        </defs>

        <text x={20} y={30} fontSize={12} style={{ fill: c.muted }}>
          Vista a lo largo del eje de giro · esquema sin escala
        </text>

        {/* casco y piso */}
        <circle cx={CX} cy={CY} r={RO} strokeWidth={1} style={{ fill: c.border, stroke: c.muted }} />
        <circle cx={CX} cy={CY} r={RF} strokeWidth={1.5} style={{ fill: c.alt, stroke: c.muted }} />
        <text x={CX} y={CY - RO + 19} textAnchor="middle" fontSize={11} style={{ fill: c.muted }}>casco</text>
        <text x={CX} y={CY - RF + 22} textAnchor="middle" fontSize={11} style={{ fill: c.muted }}>piso</text>

        {/* eje de giro (⊙) */}
        <circle cx={CX} cy={CY} r={7} fill="none" strokeWidth={1.5} style={{ stroke: c.text }} />
        <circle cx={CX} cy={CY} r={2.5} style={{ fill: c.text }} />
        <text x={CX} y={CY + 27} textAnchor="middle" fontSize={11} style={{ fill: c.text }}>eje de giro</text>

        {/* ω */}
        <path
          d={`M${w0.x.toFixed(1)} ${w0.y.toFixed(1)} A40 40 0 0 0 ${w1.x.toFixed(1)} ${w1.y.toFixed(1)}`}
          fill="none"
          strokeWidth={2}
          markerEnd="url(#h3-txt)"
          style={{ stroke: c.text }}
        />
        <text x={CX} y={CY - 49} textAnchor="middle" fontSize={15} fontStyle="italic" style={{ fontFamily: serif, fill: c.text }}>ω</text>

        {/* radio */}
        <line x1={CX + 8} y1={CY} x2={CX + RF} y2={CY} strokeWidth={1.5} strokeDasharray="5 4" style={{ stroke: c.muted }} />
        <text x={330} y={CY - 8} textAnchor="middle" fontSize={12} style={{ fill: c.text }}>r = 200 m</text>

        {/* punto P: v tangente y a_c hacia el eje */}
        <circle cx={CX + RF} cy={CY} r={4} style={{ fill: c.acc }} />
        <line x1={CX + RF} y1={CY} x2={CX + RF} y2={165} strokeWidth={2.5} markerEnd="url(#h3-txt)" style={{ stroke: c.text }} />
        <text x={418} y={198} fontSize={13} style={{ fontFamily: serif, fill: c.text }}>v = rω</text>
        <text x={418} y={213} fontSize={10.5} style={{ fill: c.muted }}>tangente</text>

        <line x1={CX + RF - 4} y1={CY} x2={322} y2={CY} strokeWidth={2.5} markerEnd="url(#h3-acc)" style={{ stroke: c.acc }} />
        <text x={354} y={CY + 19} textAnchor="middle" fontSize={12} style={{ fontFamily: serif, fill: c.acc }}>
          <Ac /> = rω²
        </text>
        <text x={354} y={CY + 33} textAnchor="middle" fontSize={10.5} style={{ fill: c.muted }}>(hacia el eje)</text>

        {/* persona: «abajo» es hacia afuera */}
        <line x1={feet.x} y1={feet.y} x2={body.x} y2={body.y} strokeWidth={2} style={{ stroke: c.text }} />
        <circle cx={head.x} cy={head.y} r={5} style={{ fill: c.text }} />
        <line x1={mid.x + arm.x} y1={mid.y + arm.y} x2={mid.x - arm.x} y2={mid.y - arm.y} strokeWidth={2} style={{ stroke: c.text }} />
        <text x={CX} y={352} textAnchor="middle" fontSize={11} style={{ fill: c.muted }}>«abajo» apunta hacia afuera</text>

        {/* panel de ecuaciones */}
        <rect x={470} y={62} width={255} height={172} rx={8} strokeWidth={1} style={{ fill: c.alt, stroke: c.border }} />
        <text x={486} y={84} fontSize={12} style={{ fill: c.muted }}>Ecuaciones</text>
        {eqs.map((e, i) => (
          <text key={i} x={486} y={112 + i * 26} style={eqStyle}>{e}</text>
        ))}
        <text x={486} y={214} fontSize={10.5} style={{ fill: c.muted }}>v y a<tspan baselineShift="sub" fontSize="0.72em">c</tspan>: Módulo 3, concepto 13</text>

        {/* panel del caso numérico */}
        <rect x={470} y={252} width={255} height={178} rx={8} strokeWidth={1} style={{ fill: c.alt, stroke: c.border }} />
        <text x={486} y={274} fontSize={12} style={{ fill: c.muted }}>Caso numérico (1 g, r = 200 m)</text>
        {nums.map((e, i) => (
          <text key={i} x={486} y={302 + i * 24} style={eqStyle}>{e}</text>
        ))}
      </svg>
      <figcaption className="muted" style={{ fontSize: '.85rem', marginTop: 8 }}>
        ⊙ indica que el eje de giro sale de la pantalla hacia quien mira. Esquema propio, sin escala; cálculo con g = 9,8 m/s².
      </figcaption>
    </figure>
  )
}