export default function VideoClip() {
  return (
    <figure className="chart">
      <div style={{ position: 'relative', paddingTop: '56.25%' }}>
        <iframe
          src="https://www.youtube.com/embed/4rNITneXnCo?start=557&end=605&rel=0"
          title="Desarme del DualSense: gatillos adaptativos (TronicsFix), 9:17 a 10:05"
          allowFullScreen
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
        />
      </div>
      <figcaption>
        Video de TronicsFix [3], franja 9:17 a 10:05.{' '}
        <a href="https://www.youtube.com/watch?v=4rNITneXnCo&t=557s" target="_blank" rel="noreferrer">
          Ver en YouTube
        </a>
      </figcaption>
    </figure>
  )
}