import { Cite } from '../../components/ui/Cited'

export default function VideoClip() {
  return (
    <figure className="chart">
      <div style={{ position: 'relative', paddingTop: '75%' }}>
        <iframe
          src="https://archive.org/embed/CEP176"
          title="Colapso del puente de Tacoma Narrows, 1940 (Stillman Fires Collection, Tacoma Fire Department)"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </div>
      <figcaption>
        «Tacoma Narrows Bridge Collapse (Standard 4:3)», Stillman Fires Collection; Tacoma Fire Department, 1940. Dominio público,
        blanco y negro, sin sonido, 2 min 5 s <Cite n="1" />.{' '}
        <a href="https://archive.org/details/CEP176" target="_blank" rel="noreferrer">Ver en Internet Archive</a>
      </figcaption>
    </figure>
  )
}