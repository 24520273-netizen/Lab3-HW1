import { useId } from 'react'
import { drumPads } from '../data/drumPads'
import DrumPad from './DrumPad'
import styles from './DrumKit.module.css'

export default function DrumKit({
  activePadIds = [],
  onTrigger,
  onPress,
  onRelease,
}) {
  const headingId = useId()
  const instructionsId = useId()

  return (
    <section
      className={styles.kit}
      aria-labelledby={headingId}
      aria-describedby={instructionsId}
    >
      <header className={styles.header}>
        <h2 id={headingId}>Drum Pads</h2>
        <p id={instructionsId} className={styles.instructions}>
          Use W, A, S, D, J, K or L to play.
          You can also focus a pad and press Enter or Space.
        </p>
      </header>

      <ul className={styles.grid}>
        {drumPads.map((pad) => (
          <li className={styles.item} key={pad.id}>
            <DrumPad
              pad={pad}
              isActive={activePadIds.includes(pad.id)}
              onTrigger={onTrigger}
              onPress={onPress}
              onRelease={onRelease}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
