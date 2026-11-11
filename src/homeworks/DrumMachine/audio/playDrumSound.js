import { drumSoundPresets } from '../data/drumSoundPresets.js'

const noiseBufferCache = new WeakMap()
const VOICE_GAIN = 0.32
const activeVoices = new WeakMap()

function getNoiseBuffer(context, soundId, durationSeconds) {
  let cache = noiseBufferCache.get(context)

  if (!cache) {
    cache = new Map()
    noiseBufferCache.set(context, cache)
  }

  if (cache.has(soundId)) {
    return cache.get(soundId)
  }

  const length = Math.ceil(context.sampleRate * durationSeconds)
  const buffer = context.createBuffer(1, length, context.sampleRate)
  const samples = buffer.getChannelData(0)

  for (let i = 0; i < samples.length; i += 1) {
    samples[i] = Math.random() * 2 - 1
  }

  cache.set(soundId, buffer)
  return buffer
}

function scheduleSource(context, source, connectedNodes, startTime, endTime) {
  let voices = activeVoices.get(context)

  if (!voices) {
    voices = new Set()
    activeVoices.set(context, voices)
  }

  let cleaned = false

  const cleanup = () => {
    if (cleaned) return
    cleaned = true

    source.onended = null
    source.disconnect()

    for (const node of connectedNodes) {
      node.disconnect()
    }

    voices.delete(stopVoice)

    if (voices.size === 0) {
      activeVoices.delete(context)
    }
  }

  const stopVoice = () => {
    try {
      source.stop()
    } catch (error) {
      if (error.name !== 'InvalidStateError') {
        throw error
      }
    } finally {
      cleanup()
    }
  }

  source.onended = cleanup
  voices.add(stopVoice)

  try {
    source.start(startTime)
    source.stop(endTime)
  } catch (error) {
    cleanup()
    throw error
  }
}

export function stopAllDrumSounds(context) {
  const voices = activeVoices.get(context)

  if (!voices) return

  for (const stopVoice of [...voices]) {
    stopVoice()
  }
}

function playTone(context, output, preset, now, endTime) {
  const oscillator = context.createOscillator()
  const gain = context.createGain()

  oscillator.type = 'sine'

  oscillator.frequency.setValueAtTime(preset.toneStartHz, now)
  oscillator.frequency.exponentialRampToValueAtTime(
    preset.toneEndHz,
    endTime
  )

  gain.gain.setValueAtTime(
    Math.max(0.0001, preset.toneGain * VOICE_GAIN),
    now
  )

  gain.gain.exponentialRampToValueAtTime(0.0001, endTime)

  oscillator.connect(gain)
  gain.connect(output)

  scheduleSource(context, oscillator, [gain], now, endTime)
}

function playNoise(context, output, soundId, preset, now, endTime) {
  const source = context.createBufferSource()
  const filter = context.createBiquadFilter()
  const gain = context.createGain()

  source.buffer = getNoiseBuffer(
    context,
    soundId,
    preset.durationSeconds
  )

  filter.type = 'highpass'
  filter.frequency.setValueAtTime(preset.noiseHighpassHz, now)

  const level = Math.max(0.0001, preset.noiseGain * VOICE_GAIN)

  if (soundId === 'clap') {
    const bursts = [0, 0.03, 0.065]

    for (let i = 0; i < bursts.length; i += 1) {
      const time = now + bursts[i]

      gain.gain.setValueAtTime(level * (1 - i * 0.2), time)
      gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.02)
    }

    gain.gain.exponentialRampToValueAtTime(0.0001, endTime)
  } else {
    gain.gain.setValueAtTime(level, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, endTime)
  }

  source.connect(filter)
  filter.connect(gain)
  gain.connect(output)

  scheduleSource(context, source, [filter, gain], now, endTime)
}

export function playDrumSound(context, output, soundId) {
  const preset = drumSoundPresets[soundId]

  if (!preset) {
    throw new Error(`Unknown drum sound: ${soundId}`)
  }

  if (!context || context.state !== 'running') {
    throw new Error('AudioContext is not running')
  }

  if (!output) {
    throw new Error('Audio output node is unavailable')
  }

  const now = context.currentTime
  const endTime = now + preset.durationSeconds

  if (preset.mode === 'tone' || preset.mode === 'hybrid') {
    playTone(context, output, preset, now, endTime)
  }

  if (preset.mode === 'noise' || preset.mode === 'hybrid') {
    playNoise(context, output, soundId, preset, now, endTime)
  }

  return {
    soundId,
    durationSeconds: preset.durationSeconds,
  }
}
