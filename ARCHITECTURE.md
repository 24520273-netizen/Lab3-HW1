# Architecture – Production Studio Drum Kit

## 1. Overview

Homework 1 is a React 19 Drum Kit application designed to support mouse, touch and keyboard interaction while meeting accessibility and responsive design requirements.

**Technology:**
- React 19 + Vite
- JavaScript ES2024
- Functional Components and React Hooks
- CSS Modules and CSS Custom Properties
- Web Audio API

**Quality targets:**
- WCAG 2.2 AA
- Lighthouse Accessibility 100
- Responsive layouts from 375px to 1440px

## 2. Component Architecture

```text
App
 └── DrumMachine
      ├── DrumPad × 7
      ├── HitLog
      └── DecibelMeter

DrumMachine
 ├── useDrumKeyboard
 ├── audioEngine
 └── pads configuration
```

### App.jsx

Application entry component.

Responsibilities:
- Render the DrumMachine interface.
- Avoid unnecessary business logic.

### DrumMachine.jsx

Main controller component.

Responsibilities:
- Manage pressed states.
- Coordinate keyboard and pointer input.
- Trigger the audio engine.
- Maintain hit history.
- Connect audio-level data to the meter.
- Pass props and callbacks to child components.

### DrumPad.jsx

Reusable accessible button.

Props contract:
- `pad`: Drum pad configuration.
- `isActive`: Pressed state.
- `onTrigger`: Activation callback.
- `onRelease`: Release callback.

Requirements:
- Use native `<button type="button">`.
- Provide accessible labels and keyboard shortcuts.
- Expose `aria-pressed={isActive}`.
- Provide visible focus and active feedback.
- Support pointer and native keyboard activation without duplicate hits.

### HitLog.jsx

Responsibilities:
- Display recent valid drum hits.
- Preserve chronological ordering.
- Render stable list keys.
- Use `<output aria-live="polite">` for accessible announcements.
- Keep live announcements concise.

### DecibelMeter.jsx

Responsibilities:
- Display an audio signal-level meter.
- Receive level data derived from the audio engine.
- Provide a readable visual representation and accessible text.
- Return to idle when the sound decays.

The meter must not claim to measure calibrated acoustic sound pressure.

## 3. Drum Pad Data Contract

Location: `data/pads.js`

Seven required physical keyboard mappings:

| Keyboard code | Display |
|---|---|
| KeyW | W |
| KeyA | A |
| KeyS | S |
| KeyD | D |
| KeyJ | J |
| KeyK | K |
| KeyL | L |

Each pad configuration contains:
- Unique ID
- Display label
- Keyboard code
- Sound identifier
- Optional description

Pad configuration is static data and should not be duplicated across multiple components.

## 4. Keyboard Hook Contract

Location: `hooks/useDrumKeyboard.js`

Responsibilities:
- Register `keydown` and `keyup` listeners.
- Read `KeyboardEvent.code`.
- Ignore `event.repeat` on keydown.
- Ignore shortcuts while editing input, textarea, select or contenteditable elements.
- Notify the controller about pad activation and release.
- Remove listeners during cleanup.
- Avoid stale closures and duplicate listeners under React StrictMode.
- Handle interrupted keyboard interactions so pressed states do not remain stuck.

Input controls should not unexpectedly play sounds while the user types.

## 5. Audio Engine Contract

Location: `audio/audioEngine.js`

Use the Web Audio API.

Responsibilities:
- Initialize AudioContext when permitted by user interaction.
- Generate or play distinct percussion sounds.
- Map sound identifiers to audio presets.
- Handle overlapping drum hits.
- Provide audio analysis for visual feedback.
- Disconnect or release resources when appropriate.
- Handle browsers that suspend or restrict AudioContext.

Suggested interface:

```js
createAudioEngine()
playSound(soundId)
getAnalyser()
resumeAudio()
dispose()
```

The final API may be refined during implementation.

### Decibel Meter Signal

The signal is analyzed using an AnalyserNode or another real audio-level measurement method.

A possible approach:
1. Read audio samples.
2. Calculate RMS amplitude.
3. Convert RMS to relative dBFS when appropriate.
4. Update the meter display.
5. Stop unnecessary updates when the meter is inactive.

Relative digital signal level is not equivalent to calibrated physical sound pressure in dB SPL.

## 6. State Management

DrumMachine owns shared interactive state.

| State | Purpose |
|---|---|
| Active pad IDs | Track pressed and released pads |
| Hit history | Store recent valid hits |
| Audio level | Drive visual meter updates |
| Audio readiness | Represent initialization status if needed |

Guidelines:
- Use immutable React state updates.
- Avoid redundant derived state.
- Store lifecycle-dependent mutable resources in refs when appropriate.
- Avoid unnecessary rerenders.
- Keep generated IDs stable for hit history entries.

## 7. Interaction Flows

### Keyboard

```text
keydown
   ↓
Check focus and repeat
   ↓
Find pad by KeyboardEvent.code
   ↓
Activate pad
   ↓
Play sound + Update hit history
   ↓
Update visual feedback
   ↓
keyup → Release pad
```

### Mouse and Touch

```text
Pointer interaction
   ↓
Activate pad
   ↓
Play sound + Update hit history
   ↓
Update visual feedback
   ↓
Release or cancel interaction
```

Native button activation via Enter or Space must also work.

A single user action should not accidentally trigger the same sound twice.

## 8. Styling Architecture

Use CSS Modules for component-level styles.

Files:
- `DrumMachine.module.css`
- `DrumPad.module.css`
- `HitLog.module.css`
- `DecibelMeter.module.css`

Use CSS Custom Properties for theme colors, spacing and typography.

Requirements:
- Studio-inspired visual design.
- Visible keyboard focus.
- Non-color-only active indicators.
- Readable typography.
- Responsive layout at 375px and 1440px.
- No unintended horizontal overflow.

## 9. Accessibility Strategy

- Native semantic HTML.
- Drum pads implemented as buttons.
- Correct `aria-pressed` state.
- Visible focus indicators.
- Keyboard access for all interactions.
- Visual Hit Log.
- Accessible live output.
- Visual audio-level feedback.
- Properly labeled form controls if any are introduced.
- Manual accessibility checks in addition to Lighthouse.

A Lighthouse score of 100 is a target, not proof of complete WCAG conformance.

## 10. Verification Strategy

### Functional
- Seven keys produce correct sounds.
- Mouse and touch activate pads.
- Keyup releases pressed state.
- Repeated keydown is ignored.
- Typing into form fields does not trigger sounds.
- Audio resources do not leak.

### React Lifecycle
- StrictMode does not cause duplicate activation.
- Listeners are removed correctly.
- Audio resources and animation updates are cleaned up.

### Accessibility
- Native button semantics.
- Visible focus.
- Accurate pressed states.
- Accessible Hit Log.
- Usable keyboard navigation.
- Lighthouse Accessibility audit.

### Responsive
- 375px mobile viewport.
- 1440px desktop viewport.
- No unintended horizontal scrolling.

### Build and Quality
- Run lint.
- Run production build.
- Run applicable automated tests.
- Review Git diff before commits.

## 11. Development Workflow

Follow the tasks in `TASK_DECOMPOSITION.md`.

For every task:

1. Implement a single logical change.
2. Verify the change.
3. Review the Git diff.
4. Create a meaningful atomic commit.
5. Update task progress as appropriate.

Do not implement features before documenting the relevant tasks.

## 12. AI Failure Audit

Maintain `AI_FAILURE_AUDIT.md` throughout development.

Record at least three genuine AI-related failures, including:
- Description
- Root cause
- Actual verification evidence
- Correction
- Related fix commit

Never fabricate failures or test outcomes.
