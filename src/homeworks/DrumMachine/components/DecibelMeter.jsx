import { useEffect, useId, useState } from 'react'
import styles from './DecibelMeter.module.css'

const FLOOR_DBFS = -60
const MEASUREMENT_WINDOW_MS = 1800
const PUBLISH_INTERVAL_MS = 100

export default function DecibelMeter({ analyser, lastHitId }) {
  const headingId = useId()
  const [levelDbfs, setLevelDbfs] = useState(FLOOR_DBFS)

  useEffect(() => {
    if (!analyser || lastHitId == null) return undefined

    const samples = new Float32Array(analyser.fftSize)
    const startTime = performance.now()
    let frameId = 0
    let lastPublished = -Infinity

    const measure = (timestamp) => {
      if (document.hidden) {
        setLevelDbfs(FLOOR_DBFS)
        return
      }

      analyser.getFloatTimeDomainData(samples)

      let sumSquares = 0

      for (const sample of samples) {
        sumSquares += sample * sample
      }

      const rms = Math.sqrt(sumSquares / samples.length)
      const dbfs = Math.max(
        FLOOR_DBFS,
        Math.min(0, 20 * Math.log10(Math.max(rms, 0.000001)))
      )

      if (timestamp - lastPublished >= PUBLISH_INTERVAL_MS) {
        setLevelDbfs((previous) =>
          Math.abs(previous - dbfs) >= 1 ? dbfs : previous
        )
        lastPublished = timestamp
      }

      if (timestamp - startTime < MEASUREMENT_WINDOW_MS) {
        frameId = requestAnimationFrame(measure)
      } else {
        setLevelDbfs(FLOOR_DBFS)
      }
    }

    frameId = requestAnimationFrame(measure)

    return () => cancelAnimationFrame(frameId)
  }, [analyser, lastHitId])

  const level = Math.round(levelDbfs)
  const percentage = ((levelDbfs - FLOOR_DBFS) / 60) * 100

  const displayLevel =
    level <= FLOOR_DBFS ? '≤ -60 dBFS' : `${level} dBFS`

  return (
    <section className={styles.panel} aria-labelledby={headingId}>
      <h2 id={headingId}>Audio Level</h2>

      <div className={styles.reading}>{displayLevel}</div>

      <div
        className={styles.meter}
        role="meter"
        aria-label="Digital audio output level"
        aria-valuemin={FLOOR_DBFS}
        aria-valuemax={0}
        aria-valuenow={level}
        aria-valuetext={displayLevel}
      >
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className={styles.scale} aria-hidden="true">
        <span>-60 dBFS</span>
        <span>-30 dBFS</span>
        <span>0 dBFS</span>
      </div>

      <p className={styles.description}>
        Relative digital signal level (dBFS), not acoustic dB SPL.
      </p>
    </section>
  )
}
