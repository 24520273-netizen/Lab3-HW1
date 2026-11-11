import { useState } from 'react'
import DrumKit from './homeworks/DrumMachine/components/DrumKit'
import { drumPads } from './homeworks/DrumMachine/data/drumPads'

function App() {
  const [lastTriggeredId, setLastTriggeredId] = useState(null)

  const lastTriggeredPad = drumPads.find(
    (pad) => pad.id === lastTriggeredId
  )

  return (
    <main>
      <header>
        <h1>Production Studio Drum Kit</h1>
        <p>Click a drum pad to test its interaction.</p>
      </header>

      <DrumKit onTrigger={setLastTriggeredId} />

      <p role="status">
        {lastTriggeredPad
          ? `Last pad activated: ${lastTriggeredPad.soundName} (${lastTriggeredPad.keyLabel})`
          : 'No pad has been activated yet.'}
      </p>
    </main>
  )
}

export default App
