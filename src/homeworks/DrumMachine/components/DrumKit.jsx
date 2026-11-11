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

  return (
    <section className={styles.kit} aria-labelledby={headingId}>
      <header className={styles.header}>
        <h2 id={headingId}>Drum Pads</h2>
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
