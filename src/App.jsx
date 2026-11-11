import { useEffect, useRef, useState } from 'react'
import DrumKit from './homeworks/DrumMachine/components/DrumKit'
import { drumPads } from './homeworks/DrumMachine/data/drumPads'
import { createDrumAudioEngine } from './homeworks/DrumMachine/audio/audioEngine'
import { playDrumSound } from './homeworks/DrumMachine/audio/playDrumSound'

function App() {
  const [lastTriggeredId, setLastTriggeredId] = useState(null)
  const [audioError, setAudioError] = useState('')
  const audioEngineRef = useRef(null)

  const lastTriggeredPad = drumPads.find(
    (pad) => pad.id === lastTriggeredId
  )

  useEffect(() => {
    return () => {
      const engine = audioEngineRef.current
      audioEngineRef.current = null

      if (engine) {
        void engine.dispose().catch((error) => {
          console.error('Audio cleanup failed:', error)
        })
      }
    }
  }, [])

  function handleTrigger(padId) {
    const pad = drumPads.find((item) => item.id === padId)

    if (!pad) {
      setAudioError('Unknown drum pad.')
      return
    }

    setLastTriggeredId(padId)
    setAudioError('')

    if (!audioEngineRef.current) {
      audioEngineRef.current = createDrumAudioEngine()
    }

    const engine = audioEngineRef.current

    void engine
      .resume()
      .then((context) => {
        if (audioEngineRef.current !== engine) return

        playDrumSound(
          context,
          engine.getOutputNode(),
          pad.soundId
        )
      })
      .catch((error) => {
        if (audioEngineRef.current === engine) {
          setAudioError(
            `Unable to play ${pad.soundName}: ${error.message}`
          )
        }
      })
  }

  return (
    <main>
      <header>
        <h1>Production Studio Drum Kit</h1>
        <p>Click a drum pad to play its sound.</p>
      </header>

      <DrumKit onTrigger={handleTrigger} />

      <p role="status">
        {lastTriggeredPad
          ? `Last pad activated: ${lastTriggeredPad.soundName} (${lastTriggeredPad.keyLabel})`
          : 'No pad has been activated yet.'}
      </p>

      {audioError && (
        <p role="alert">{audioError}</p>
      )}
    </main>
  )
}

export default App
