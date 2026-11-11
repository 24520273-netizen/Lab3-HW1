import { useId } from 'react'
import { drumPads } from '../data/drumPads'
import DrumPad from './DrumPad'

export default function DrumKit({ activePadIds = [], onTrigger }) {
  const headingId = useId()

  return (
    <section aria-labelledby={headingId}>
      <header>
        <h2 id={headingId}>Drum Pads</h2>
      </header>

      <ul>
        {drumPads.map((pad) => (
          <li key={pad.id}>
            <DrumPad
              pad={pad}
              isActive={activePadIds.includes(pad.id)}
              onTrigger={onTrigger}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
