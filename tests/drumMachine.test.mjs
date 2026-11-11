import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { drumPads } from '../src/homeworks/DrumMachine/data/drumPads.js'
import { drumSoundPresets } from '../src/homeworks/DrumMachine/data/drumSoundPresets.js'
import { shouldIgnoreDrumKeydown } from '../src/homeworks/DrumMachine/hooks/useDrumKeyboard.js'
import { createDrumAudioEngine } from '../src/homeworks/DrumMachine/audio/audioEngine.js'
import { playDrumSound, stopAllDrumSounds } from '../src/homeworks/DrumMachine/audio/playDrumSound.js'

const EXPECTED_CODES = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'KeyJ', 'KeyK', 'KeyL']

function keyboardEvent(changes = {}) {
  return {
    repeat: false,
    defaultPrevented: false,
    isComposing: false,
    ctrlKey: false,
    altKey: false,
    metaKey: false,
    target: { isContentEditable: false, closest: () => null },
    ...changes,
  }
}

test('seven unique physical keyboard codes map to seven playable pads', () => {
  assert.deepEqual(drumPads.map((pad) => pad.keyboardCode), EXPECTED_CODES)
  assert.equal(new Set(drumPads.map((pad) => pad.id)).size, 7)
  assert.equal(new Set(drumPads.map((pad) => pad.soundId)).size, 7)
  for (const pad of drumPads) {
    const sound = drumSoundPresets[pad.soundId]
    assert.ok(sound, `Missing sound preset: ${pad.soundId}`)
    assert.ok(['tone', 'hybrid', 'noise'].includes(sound.mode))
    assert.ok(sound.durationSeconds > 0)
  }
})

test('keyboard guard rejects repeats, modifiers, and composing events', () => {
  assert.equal(shouldIgnoreDrumKeydown(keyboardEvent()), false)
  for (const prop of ['repeat', 'defaultPrevented', 'isComposing', 'ctrlKey', 'altKey', 'metaKey']) {
    assert.equal(shouldIgnoreDrumKeydown(keyboardEvent({ [prop]: true })), true, prop)
  }
})

test('keyboard guard isolates inputs and other interactive controls', () => {
  const selectors = [
    'input', 'textarea', 'select', 'button', 'a[href]',
    '[role="textbox"]', '[contenteditable]',
  ]
  for (const name of selectors) {
    const target = {
      isContentEditable: false,
      closest: (selector) => selector.split(', ').includes(name) ? {} : null,
    }
    assert.equal(shouldIgnoreDrumKeydown(keyboardEvent({ target })), true, name)
  }
  assert.equal(shouldIgnoreDrumKeydown(keyboardEvent({ target: { isContentEditable: true } })), true)
})

test('keyboard source uses code, keyup, and removes registered listeners', async () => {
  const source = await readFile(new URL('../src/homeworks/DrumMachine/hooks/useDrumKeyboard.js', import.meta.url), 'utf8')
  assert.match(source, /event\.code/)
  assert.match(source, /event\.repeat/)
  assert.match(source, /addEventListener\('keydown'/)
  assert.match(source, /addEventListener\('keyup'/)
  assert.match(source, /removeEventListener\('keydown'/)
  assert.match(source, /removeEventListener\('keyup'/)
  assert.doesNotMatch(source, /\b(?:keyCode|keypress)\b/)
})

class MockParam {
  constructor() { this.value = 0 }
  setValueAtTime(value) { this.value = value }
  exponentialRampToValueAtTime(value) { this.value = value }
}

class MockNode {
  constructor() { this.connections = []; this.disconnected = false }
  connect(target) { this.connections.push(target); return target }
  disconnect() { this.disconnected = true; this.connections = [] }
}

class MockSource extends MockNode {
  constructor() {
    super()
    this.frequency = new MockParam()
    this.startCount = 0
    this.stopCount = 0
    this.onended = null
  }
  start() { this.startCount++ }
  stop() { this.stopCount++ }
}

class MockAudioContext {
  static contexts = []
  constructor() {
    this.state = 'suspended'
    this.sampleRate = 8000
    this.currentTime = 1
    this.destination = new MockNode()
    this.sources = []
    this.oscillators = []
    this.closeCount = 0
    MockAudioContext.contexts.push(this)
  }
  createGain() {
    const node = new MockNode()
    node.gain = new MockParam()
    return node
  }
  createAnalyser() {
    const node = new MockNode()
    node.fftSize = 2048
    node.smoothingTimeConstant = 0
    return node
  }
  createOscillator() {
    const node = new MockSource()
    node.type = 'sine'
    this.sources.push(node)
    this.oscillators.push(node)
    return node
  }
  createBufferSource() {
    const node = new MockSource()
    this.sources.push(node)
    return node
  }
  createBiquadFilter() {
    const node = new MockNode()
    node.frequency = new MockParam()
    return node
  }
  createBuffer(channels, length) {
    assert.equal(channels, 1)
    const samples = new Float32Array(length)
    return { getChannelData: () => samples }
  }
  async resume() { this.state = 'running' }
  async close() { this.closeCount++; this.state = 'closed' }
}

test('audio initializes lazily, plays 7 presets, and fully releases resources', async () => {
  const savedAudioContext = globalThis.AudioContext
  const savedWebkitAudioContext = globalThis.webkitAudioContext
  globalThis.AudioContext = MockAudioContext
  try {
    const originalCount = MockAudioContext.contexts.length
    const engine = createDrumAudioEngine()
    assert.equal(MockAudioContext.contexts.length, originalCount)
    const context = await engine.resume()
    assert.equal(MockAudioContext.contexts.length, originalCount + 1)
    assert.equal(context.state, 'running')

    const output = engine.getOutputNode()
    const analyser = engine.getAnalyser()
    assert.deepEqual(output.connections, [analyser])
    assert.deepEqual(analyser.connections, [context.destination])
    assert.equal(analyser.fftSize, 2048)

    for (const pad of drumPads) {
      const result = playDrumSound(context, output, pad.soundId)
      assert.equal(result.soundId, pad.soundId)
      assert.ok(result.durationSeconds > 0)
    }
    assert.equal(context.sources.length, 8)
    assert.ok(context.sources.every((source) => source.startCount === 1 && source.stopCount === 1))
    const toneOnlySources = context.oscillators.filter((source) => source.type === 'triangle')
    assert.equal(toneOnlySources.length, 2, 'Kick and Tom should be triangle waves')

    stopAllDrumSounds(context)
    assert.ok(context.sources.every((source) => source.stopCount === 2 && source.disconnected))
    await engine.dispose()
    assert.equal(context.state, 'closed')
    assert.equal(context.closeCount, 1)
    assert.equal(output.disconnected, true)
    assert.equal(analyser.disconnected, true)
    await engine.dispose()
    assert.equal(context.closeCount, 1)
    await assert.rejects(() => engine.resume(), /disposed/)
  } finally {
    if (savedAudioContext === undefined) delete globalThis.AudioContext
    else globalThis.AudioContext = savedAudioContext
    if (savedWebkitAudioContext === undefined) delete globalThis.webkitAudioContext
    else globalThis.webkitAudioContext = savedWebkitAudioContext
  }
})

test('React components render seven accessible pads, live output and dBFS meter', async () => {
  const { createElement } = await import('react')
  const { renderToStaticMarkup } = await import('react-dom/server')
  const { createServer } = await import('vite')
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  try {
    const { default: DrumKit } = await vite.ssrLoadModule('/src/homeworks/DrumMachine/components/DrumKit.jsx')
    const { default: HitLog } = await vite.ssrLoadModule('/src/homeworks/DrumMachine/components/HitLog.jsx')
    const { default: DecibelMeter } = await vite.ssrLoadModule('/src/homeworks/DrumMachine/components/DecibelMeter.jsx')
    const kit = renderToStaticMarkup(createElement(DrumKit, { activePadIds: ['kick'] }))
    assert.equal((kit.match(/<button\b/g) ?? []).length, 7)
    assert.equal((kit.match(/type="button"/g) ?? []).length, 7)
    assert.equal((kit.match(/aria-keyshortcuts=/g) ?? []).length, 7)
    assert.equal((kit.match(/aria-pressed="true"/g) ?? []).length, 1)
    assert.equal((kit.match(/aria-pressed="false"/g) ?? []).length, 6)
    assert.match(kit, /aria-describedby=/)
    assert.match(kit, /Pressed/)
    const log = renderToStaticMarkup(createElement(HitLog, {
      hits: [{ id: 1, padId: 'kick', keyLabel: 'W', soundName: 'Kick' }],
    }))
    assert.match(log, /<output\b/)
    assert.match(log, /aria-live="polite"/)
    assert.match(log, /Recent Hits/)
    assert.match(log, /Kick/)
    const meter = renderToStaticMarkup(createElement(DecibelMeter, { analyser: null, lastHitId: null }))
    assert.match(meter, /role="meter"/)
    assert.match(meter, /aria-valuenow="-60"/)
    assert.match(meter, /dBFS/)
    assert.match(meter, /not acoustic dB SPL/)
  } finally {
    await vite.close()
  }
})

test('SEO metadata and valid plain-text robots file exist', async () => {
  const html = await readFile(new URL('../index.html', import.meta.url), 'utf8')
  const robots = await readFile(new URL('../public/robots.txt', import.meta.url), 'utf8')
  assert.match(html, /<meta\s+name=["']description["']/i)
  assert.match(robots, /^User-agent:\s*\*/m)
  assert.match(robots, /^Allow:\s*\//m)
  assert.doesNotMatch(robots, /<html|<!doctype/i)
})
