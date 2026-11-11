import { useEffect, useRef, useState } from 'react'
import DrumKit from './homeworks/DrumMachine/components/DrumKit'
import { drumPads } from './homeworks/DrumMachine/data/drumPads'
import { createDrumAudioEngine } from './homeworks/DrumMachine/audio/audioEngine'
import { playDrumSound } from './homeworks/DrumMachine/audio/playDrumSound'
import { useDrumKeyboard } from './homeworks/DrumMachine/hooks/useDrumKeyboard'
import HitLog from './homeworks/DrumMachine/components/HitLog'
import DecibelMeter from './homeworks/DrumMachine/components/DecibelMeter'
import feedbackStyles from './homeworks/DrumMachine/components/FeedbackPanel.module.css'

const PAD_MAP = new Map(drumPads.map((pad) => [pad.keyboardCode, pad]))

function App() {
  const [hitHistory, setHitHistory] = useState([])
  const [analyserNode, setAnalyserNode] = useState(null)
  const nextHitIdRef = useRef(0)
  const [audioError, setAudioError] = useState('')
  const [pointerActivePadIds, setPointerActivePadIds] = useState([])
  const audioEngineRef = useRef(null)


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

  useEffect(() => {
    const clearPointerState = () => setPointerActivePadIds([])

    const handleVisibilityChange = () => {
      if (document.hidden) clearPointerState()
    }

    window.addEventListener('blur', clearPointerState)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('blur', clearPointerState)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  function handleTrigger(padId) {
    const pad = drumPads.find((item) => item.id === padId)

    if (!pad) {
      setAudioError('Unknown drum pad.')
      return
    }

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

        const hitId = ++nextHitIdRef.current

        setHitHistory((previous) => [
          {
            id: hitId,
            padId: pad.id,
            keyLabel: pad.keyLabel,
            soundName: pad.soundName,
          },
          ...previous,
        ].slice(0, 12))

        setAnalyserNode(engine.getAnalyser())
      })
      .catch((error) => {
        if (audioEngineRef.current === engine) {
          setAudioError(
            `Unable to play ${pad.soundName}: ${error.message}`
          )
        }
      })
  }

  const keyboardActivePadIds = useDrumKeyboard(PAD_MAP, handleTrigger)

  const activePadIds = [
    ...new Set([...keyboardActivePadIds, ...pointerActivePadIds]),
  ]

  function handlePointerPress(padId) {
    setPointerActivePadIds((ids) =>
      ids.includes(padId) ? ids : [...ids, padId]
    )
  }

  function handlePointerRelease(padId) {
    setPointerActivePadIds((ids) =>
      ids.filter((id) => id !== padId)
    )
  }

  return (
    <main>
      <header>
        <h1>Production Studio Drum Kit</h1>
        <p>Click a drum pad to play its sound.</p>
      </header>

      <DrumKit
        activePadIds={activePadIds}
        onTrigger={handleTrigger}
        onPress={handlePointerPress}
        onRelease={handlePointerRelease}
      />

      <section
        className={feedbackStyles.panel}
        aria-label="Drum performance feedback"
      >
        <HitLog hits={hitHistory} />
        <DecibelMeter
          analyser={analyserNode}
          lastHitId={hitHistory[0]?.id}
        />
      </section>

      {audioError && (
        <p role="alert">{audioError}</p>
      )}
    </main>
  )
}

export default App
