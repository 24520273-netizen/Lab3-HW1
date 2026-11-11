import { useEffect, useId, useState } from 'react'
import styles from './HitLog.module.css'

export default function HitLog({ hits = [] }) {
  const headingId = useId()
  const [announcement, setAnnouncement] = useState('No drum hits yet.')
  const latestHit = hits[0]

  useEffect(() => {
    if (!latestHit) return undefined

    const timer = window.setTimeout(() => {
      setAnnouncement(
        `${latestHit.soundName}, key ${latestHit.keyLabel}, played.`
      )
    }, 450)

    return () => window.clearTimeout(timer)
  }, [latestHit])

  return (
    <section className={styles.log} aria-labelledby={headingId}>
      <h2 id={headingId}>Recent Hits</h2>

      <output
        className={styles.output}
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </output>

      <ol className={styles.history} aria-label="Recent drum hits">
        {hits.map((hit) => (
          <li key={hit.id} className={styles.hit}>
            <kbd>{hit.keyLabel}</kbd>
            <span>{hit.soundName}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
