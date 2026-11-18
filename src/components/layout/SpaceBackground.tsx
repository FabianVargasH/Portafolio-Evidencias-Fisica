import { useEffect, useRef } from 'react'

interface Star { x: number; y: number; r: number; tw: number; ph: number; tint: string }
interface Layer { speed: number; par: number; alpha: number; ox: number; oy: number; stars: Star[] }
interface Shot { x: number; y: number; vx: number; vy: number; life: number }

const TINTS = ['255,255,255', '200,220,255', '170,195,255', '255,235,210']

// dens: estrellas por millón de px²; speed: deriva en px/s; par: parallax con el scroll; alpha: brillo máximo
const SPEC = [
  { dens: 158, rMin: 0.4, rMax: 0.9, speed: 3, par: 0.04, alpha: 0. },  // lejanas
  { dens: 50, rMin: 0.7, rMax: 1.4, speed: 8, par: 0.1, alpha: 0.7 },   // medias
  { dens: 20, rMin: 1.2, rMax: 2.0, speed: 36, par: 0.2, alpha: 0.9 },   // cercanas
]
const DIR = { x: -0.9, y: 0.35 } // dirección de la deriva
const mod = (a: number, n: number) => ((a % n) + n) % n

export default function SpaceBackground() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current!
    const ctx = c.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0, h = 0, raf = 0, t = 0, last = 0, genArea = 0, nextShot = 4
    let layers: Layer[] = []
    const shots: Shot[] = []

    const gen = () => {
      genArea = w * h
      layers = SPEC.map(sp => ({
        speed: sp.speed, par: sp.par, alpha: sp.alpha, ox: 0, oy: 0,
        stars: Array.from({ length: Math.round((sp.dens * genArea) / 1e6) }, () => ({
          x: Math.random(), y: Math.random(),
          r: sp.rMin + Math.random() * (sp.rMax - sp.rMin),
          tw: 0.6 + Math.random() * 1.8, ph: Math.random() * Math.PI * 2,
          tint: TINTS[Math.floor(Math.random() * TINTS.length)],
        })),
      }))
    }

    const blob = (cx: number, cy: number, rad: number, col: string, a: number) => {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad)
      g.addColorStop(0, `rgba(${col},${a})`)
      g.addColorStop(1, `rgba(${col},0)`)
      ctx.fillStyle = g
      ctx.fillRect(cx - rad, cy - rad, rad * 2, rad * 2)
    }

    const draw = (dt: number) => {
      t += dt
      ctx.clearRect(0, 0, w, h)
      const big = Math.max(w, h)
      blob(w * (0.2 + 0.06 * Math.sin(t * 0.04)), h * (0.3 + 0.05 * Math.cos(t * 0.03)), big * 0.55, '37,99,235', 0.1)
      blob(w * (0.82 + 0.05 * Math.cos(t * 0.035)), h * (0.72 + 0.06 * Math.sin(t * 0.045)), big * 0.5, '124,58,237', 0.08)

      const sc = window.scrollY
      for (const L of layers) {
        L.ox += DIR.x * L.speed * dt
        L.oy += DIR.y * L.speed * dt
        for (const s of L.stars) {
          const px = mod(s.x * w + L.ox, w)
          const py = mod(s.y * h + L.oy - sc * L.par, h)
          const a = L.alpha * (0.65 + 0.35 * Math.sin(t * s.tw + s.ph))
          ctx.fillStyle = `rgba(${s.tint},${a})`
          ctx.beginPath(); ctx.arc(px, py, s.r, 0, Math.PI * 2); ctx.fill()
          if (s.r > 1.5) {
            ctx.fillStyle = `rgba(${s.tint},${a * 0.12})`
            ctx.beginPath(); ctx.arc(px, py, s.r * 3, 0, Math.PI * 2); ctx.fill()
          }
        }
      }

      // estrellas fugaces ocasionales
      nextShot -= dt
      if (nextShot <= 0) {
        const r = Math.random()
        shots.push({ x: w * (0.3 + Math.random() * 0.7), y: h * Math.random() * 0.5, vx: -(450 + r * 250), vy: 200 + r * 150, life: 0 })
        nextShot = 7 + Math.random() * 8
      }
      for (let i = shots.length - 1; i >= 0; i--) {
        const s = shots[i]
        s.x += s.vx * dt; s.y += s.vy * dt; s.life += dt / 1.1
        if (s.life >= 1) { shots.splice(i, 1); continue }
        const a = Math.sin(Math.PI * s.life)
        const tx = s.x - s.vx * 0.14, ty = s.y - s.vy * 0.14
        const g = ctx.createLinearGradient(s.x, s.y, tx, ty)
        g.addColorStop(0, `rgba(255,255,255,${0.9 * a})`)
        g.addColorStop(1, 'rgba(147,197,253,0)')
        ctx.strokeStyle = g; ctx.lineWidth = 1.6
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(tx, ty); ctx.stroke()
      }
    }

    const size = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth; h = window.innerHeight
      c.width = Math.round(w * d); c.height = Math.round(h * d)
      ctx.setTransform(d, 0, 0, d, 0, 0)
      if (!layers.length || Math.abs((w * h) / genArea - 1) > 0.25) gen()
      if (reduce) draw(0)
    }

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      draw(dt)
      raf = requestAnimationFrame(frame)
    }
    const start = () => { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(frame) }
    const vis = () => { if (document.hidden) cancelAnimationFrame(raf); else if (!reduce) start() }

    size()
    window.addEventListener('resize', size)
    document.addEventListener('visibilitychange', vis)
    if (!reduce) start()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
      document.removeEventListener('visibilitychange', vis)
    }
  }, [])

  return (
    <canvas
      ref={ref} aria-hidden
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}
    />
  )
}