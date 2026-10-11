import { useEffect, useRef } from 'react'

interface P { x: number; y: number; vx: number; vy: number; r: number }

const N = 280
const G = 1800
const EPS = 40
const DAMP = 0.999
const VMAX = 7

export default function GravityField() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current!
    const host = c.parentElement!
    const ctx = c.getContext('2d')!
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const m = { x: 0, y: 0, on: false }
    let w = 0, h = 0, raf = 0, ps: P[] = []

    const size = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2)
      w = c.clientWidth; h = c.clientHeight
      c.width = w * d; c.height = h * d
      ctx.setTransform(d, 0, 0, d, 0, 0)
      ps = Array.from({ length: N }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1, vy: (Math.random() - 0.5) * 1,
        r: 1 + Math.random() * 1.8,
      }))
    }

    const step = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        if (m.on) {
          const dx = m.x - p.x, dy = m.y - p.y
          const d2 = dx * dx + dy * dy + EPS * EPS
          const k = G / (d2 * Math.sqrt(d2))
          p.vx += dx * k; p.vy += dy * k
        }
        p.vx *= DAMP; p.vy *= DAMP
        const s = Math.hypot(p.vx, p.vy)
        if (s > VMAX) { p.vx *= VMAX / s; p.vy *= VMAX / s }
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x += w; else if (p.x > w) p.x -= w
        if (p.y < 0) p.y += h; else if (p.y > h) p.y -= h
        ctx.strokeStyle = `rgba(96,165,250,${Math.min(1, 0.45 + s * 0.15)})`
        ctx.lineWidth = p.r
        ctx.beginPath()
        ctx.moveTo(p.x - p.vx * 5, p.y - p.vy * 5)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()
      }
    }

    const loop = () => { step(); raf = requestAnimationFrame(loop) }

    const move = (e: PointerEvent) => {
      const r = c.getBoundingClientRect()
      m.x = e.clientX - r.left; m.y = e.clientY - r.top; m.on = true
    }
    const leave = () => { m.on = false }

    size()
    host.addEventListener('pointermove', move)
    host.addEventListener('pointerleave', leave)
    const ro = new ResizeObserver(size)
    ro.observe(c)
    const io = new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf)
      if (!e.isIntersecting) return
      if (reduce) step(); else loop()
    })
    io.observe(c)

    return () => {
      cancelAnimationFrame(raf)
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', leave)
      ro.disconnect(); io.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={ref} aria-hidden
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  )
}