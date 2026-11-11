import { stopAllDrumSounds } from './playDrumSound.js'

export function createDrumAudioEngine() {
  let audioContext = null
  let masterGain = null
  let analyser = null
  let disposed = false

  function getAudioContext() {
    if (disposed) {
      throw new Error('Audio engine has been disposed')
    }

    if (!audioContext) {
      const AudioContextClass =
        globalThis.AudioContext ?? globalThis.webkitAudioContext

      if (!AudioContextClass) {
        throw new Error('Web Audio API is not supported')
      }

      audioContext = new AudioContextClass()

      masterGain = audioContext.createGain()
      masterGain.gain.value = 0.65
      analyser = audioContext.createAnalyser()
      analyser.fftSize = 2048
      analyser.smoothingTimeConstant = 0.65
      masterGain.connect(analyser)
      analyser.connect(audioContext.destination)
    }

    if (audioContext.state === 'closed') {
      throw new Error('Audio context is closed')
    }

    return audioContext
  }

  async function resume() {
    const context = getAudioContext()

    if (context.state === 'suspended') {
      await context.resume()
    }

    if (disposed || context.state !== 'running') {
      throw new Error('Audio context is not running')
    }

    return context
  }

  function getOutputNode() {
    getAudioContext()
    return masterGain
  }

  function getAnalyser() {
    getAudioContext()
    return analyser
  }

  async function dispose() {
    if (disposed) return

    disposed = true

    const context = audioContext
    const output = masterGain
    const analysisNode = analyser

    audioContext = null
    masterGain = null
    analyser = null

    try {
      if (context && context.state !== 'closed') {
        stopAllDrumSounds(context)
      }
    } finally {
      if (output) {
        output.disconnect()
      }

      if (analysisNode) {
        analysisNode.disconnect()
      }

      if (context && context.state !== 'closed') {
        await context.close()
      }
    }
  }

  return {
    resume,
    getAudioContext,
    getOutputNode,
    getAnalyser,
    dispose,
  }
}
