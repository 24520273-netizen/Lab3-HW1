# TASK DECOMPOSITION – LAB 03 HOMEWORK 1

## 1. Project Information

- **Homework:** Production Studio Drum Kit
- **Framework:** React 19 + Vite
- **Language:** JavaScript ES2024
- **Accessibility target:** WCAG 2.2 AA
- **Lighthouse Accessibility target:** 100
- **Supported keyboard keys:** W, A, S, D, J, K, L
- **Workflow:** Implement → Verify → Commit

## 2. Git Strategy

- Preserve mandatory commit messages from the lecturer.
- Create as many meaningful, independently verifiable atomic commits as practical.
- Do not create empty or artificial commits.
- Each task should include implementation, verification and a logical commit.
- Do not push, merge, reset or rewrite history without permission.
- Commit boundaries may be adjusted if tasks are technically inseparable.
- The Lab 03 minimum of 6–8 atomic commits applies to the overall lab evaluation, not specifically to HW1.

## 3. Planned Structure

```text
src/
  homeworks/
    DrumMachine/
      components/
        DrumPad.jsx
        DrumPad.module.css
        HitLog.jsx
        HitLog.module.css
        DecibelMeter.jsx
        DecibelMeter.module.css
      hooks/
        useDrumKeyboard.js
      audio/
        audioEngine.js
      data/
        pads.js
      DrumMachine.jsx
      DrumMachine.module.css
  App.jsx
```

This structure is a proposal. Only create files when implementing the relevant task.

## 4. Task Checklist

### Phase A – Project Preparation

**TASK 00 – Initialize React 19 + Vite**

- Status: DONE
- Files: Initial Vite project and `project-rules.md`
- Criteria: React 19 installed, Vite production build succeeds and Git repository initialized.
- Verification: React 19.3.1, Vite 8.3.8, successful build.
- Commit: `1a588ae` – `chore: init react19 vite & rules`

**TASK 01 – Create Task Decomposition**

- Status: DONE
- Files: `TASK_DECOMPOSITION.md`
- Goal: Document requirements, architecture, task dependencies, verification and planned commits.
- Criteria: All HW1 requirements mapped to implementation tasks.
- Verification: Review Markdown content and Git diff.
- Commit: `docs: add hw1 task decomposition`

**TASK 02 – Document Application Architecture**

- Status: DONE
- Files: `ARCHITECTURE.md`
- Goal: Describe component contracts, data flow, audio lifecycle and keyboard state management.
- Criteria: Clear separation of UI, keyboard logic, audio engine and visual feedback.
- Verification: Check that architecture matches HW1 requirements.
- Commit: `docs: design drum machine architecture`

### Phase B – Drum Kit Interface

**TASK 03 – Create Drum Machine App Shell**

- Status: TODO
- Files: `src/App.jsx`, `src/homeworks/DrumMachine/DrumMachine.jsx`
- Goal: Establish the main Drum Kit layout using semantic HTML.
- Criteria: Drum Machine renders without runtime errors.
- Verification: Lint, build and browser inspection.
- Commit: `feat: create drum machine app shell`

**TASK 04 – Define Drum Pad Configuration**

- Status: TODO
- Files: `src/homeworks/DrumMachine/data/pads.js`
- Goal: Define seven pad IDs, labels, sound identifiers and physical keyboard codes.
- Criteria: Exactly seven unique mappings for KeyW, KeyA, KeyS, KeyD, KeyJ, KeyK and KeyL.
- Verification: Inspect mapping uniqueness and correctness.
- Commit: `feat: define drum pad configuration`

**TASK 05 – Implement Reusable Drum Pad Component**

- Status: TODO
- Files: `components/DrumPad.jsx`
- Goal: Create a reusable native button representing a drum pad.
- Criteria: Correct label, keyboard hint, button semantics and `aria-pressed` state.
- Verification: Browser inspection and accessibility inspection.
- Commit: `feat: add accessible drum pad component`

**TASK 06 – Create Studio Layout and Theme**

- Status: TODO
- Files: `DrumMachine.module.css`, `DrumPad.module.css`
- Goal: Build a studio-themed layout using CSS Modules and CSS Custom Properties.
- Criteria: Clear pad arrangement, readable text and consistent styling.
- Verification: Browser visual inspection and production build.
- Commit: `style: add studio drum machine theme`

### Phase C – Keyboard Interaction

**TASK 07 – Implement Keyboard Hook**

- Status: TODO
- Files: `hooks/useDrumKeyboard.js`
- Goal: Register physical keyboard listeners using `KeyboardEvent.code`.
- Criteria: Recognize all seven specified keys using `keydown`.
- Verification: Test key mapping and listener registration.
- Commit: `feat: implement physical keyboard controls`

**TASK 08 – Implement Key Release Handling**

- Status: TODO
- Files: `hooks/useDrumKeyboard.js`, `DrumMachine.jsx`
- Goal: Support `keyup` and pressed-state release.
- Criteria: Pad activates on keydown and releases on keyup.
- Verification: Test press/release sequences.
- Commit: `feat: support drum pad key release`

**TASK 09 – Prevent Repeated Keydown Activation**

- Status: TODO
- Files: `hooks/useDrumKeyboard.js`
- Goal: Ignore repeated keydown events using `event.repeat`.
- Criteria: Holding a key does not generate unwanted repeated hits.
- Verification: Hold individual keys and test repeated events.
- Commit: `fix: prevent repeated keyboard triggers`

**TASK 10 – Isolate Form Input Focus**

- Status: TODO
- Files: `hooks/useDrumKeyboard.js`
- Goal: Prevent drum shortcuts while typing into input, textarea or select controls.
- Criteria: Editable controls do not accidentally trigger drum sounds.
- Verification: Focus relevant controls and test keyboard shortcuts.
- Commit: `fix: isolate drum shortcuts from form inputs`

**TASK 11 – Ensure Keyboard Lifecycle Cleanup**

- Status: TODO
- Files: `hooks/useDrumKeyboard.js`
- Goal: Ensure correct listener cleanup and avoid stale closures.
- Criteria: No duplicate listeners after remounting or callback changes.
- Verification: React StrictMode and event lifecycle tests.
- Commit: `fix: ensure safe keyboard listener lifecycle`

### Phase D – Audio Engine

**TASK 12 – Implement Audio Engine**

- Status: TODO
- Files: `audio/audioEngine.js`
- Goal: Provide an audio playback interface based on browser audio capabilities.
- Criteria: Audio resources are initialized safely and cleaned up when appropriate.
- Verification: Browser audio inspection and lifecycle tests.
- Commit: `feat: implement drum audio engine`

**TASK 13 – Implement Distinct Drum Sounds**

- Status: TODO
- Files: `audio/audioEngine.js`
- Goal: Generate or play distinct percussion sounds mapped to drum pads.
- Criteria: Each configured pad produces its intended audible feedback.
- Verification: Manually check the seven sound mappings.
- Commit: `feat: add drum sound presets`

**TASK 14 – Connect Drum Pads to Audio**

- Status: TODO
- Files: `DrumMachine.jsx`, `audio/audioEngine.js`
- Goal: Connect mouse and keyboard activation to audio playback.
- Criteria: Each valid interaction triggers the correct sound once.
- Verification: Manual interaction testing.
- Commit: `feat: connect drum interactions to audio`

**TASK 15 – Complete Pointer Interaction**

- Status: TODO
- Files: `DrumPad.jsx`, `DrumMachine.jsx`
- Goal: Handle pointer activation and pressed-state release consistently.
- Criteria: Mouse/touch interaction works and active states do not remain stuck.
- Verification: Test pointer press, release and cancellation.
- Commit: `feat: support drum pad pointer interactions`

### Phase E – Visual Feedback

**TASK 16 – Implement Visual Hit Log**

- Status: TODO
- Files: `components/HitLog.jsx`, `HitLog.module.css`
- Goal: Display a visual history of drum hits.
- Criteria: Each valid hit is recorded with a stable identifier.
- Verification: Trigger multiple pads and inspect history ordering.
- Commit: `feat: implement visual hit log`

**TASK 17 – Add Accessible Live Output**

- Status: TODO
- Files: `components/HitLog.jsx`
- Goal: Announce the latest pad activation with `<output aria-live="polite">`.
- Criteria: Visual feedback is understandable without listening to the audio.
- Verification: Inspect accessibility tree and test announcements.
- Commit: `a11y: announce drum hits with live output`

**TASK 18 – Implement Visual Decibel Meter**

- Status: TODO
- Files: `components/DecibelMeter.jsx`, `DecibelMeter.module.css`, audio integration files
- Goal: Display changing audio levels derived from actual audio output analysis.
- Criteria: Meter responds to generated sound and returns to idle.
- Verification: Test meter changes with different drum hits.
- Commit: `feat: implement visual audio level meter`

### Phase F – Accessibility and Responsive Design

**TASK 19 – Improve Focus and Pressed Feedback**

- Status: TODO
- Files: Drum Pad CSS and component files
- Goal: Provide clear focus, pressed and released states without relying only on color.
- Criteria: Visible focus and meaningful active-state feedback.
- Verification: Keyboard-only navigation and accessibility inspection.
- Commit: `a11y: improve drum pad focus and active states`

**TASK 20 – Implement Responsive Layout**

- Status: TODO
- Files: Drum Machine and component CSS Modules
- Goal: Support mobile and desktop layouts.
- Criteria: Usable at 375px and 1440px without unintended horizontal overflow.
- Verification: Chrome DevTools responsive inspection.
- Commit: `style: make drum kit responsive`

### Phase G – Testing and Final Quality

**TASK 21 – Add Keyboard Behavior Tests**

- Status: TODO
- Files: Keyboard hook test files and test configuration
- Goal: Test mappings, keydown, keyup, repeat guard and focus isolation.
- Criteria: Relevant automated tests pass.
- Verification: Execute the test command and review output.
- Commit: `test: cover drum keyboard interactions`

**TASK 22 – Add Component and Audio Tests**

- Status: TODO
- Files: Component tests, audio engine tests and test configuration
- Goal: Test pad state, audio triggering, hit log and relevant lifecycle behavior.
- Criteria: Relevant automated tests pass.
- Verification: Execute tests and review output.
- Commit: `test: cover drum components and audio behavior`

**TASK 23 – Perform Accessibility Audit**

- Status: TODO
- Files: Component/CSS changes if required and verification notes
- Goal: Verify WCAG 2.2 AA requirements and work toward Lighthouse Accessibility 100.
- Criteria: Accessibility issues are identified and resolved or documented.
- Verification: Lighthouse, DevTools and manual keyboard tests.
- Commit if changes are necessary: `fix: resolve drum kit accessibility issues`

**TASK 24 – Document Genuine AI Failures**

- Status: TODO
- Files: `AI_FAILURE_AUDIT.md`
- Goal: Document at least three genuine AI-related failures with causes, evidence, solutions and fix commits.
- Criteria: All entries represent actual observed problems; no fabricated evidence.
- Verification: Cross-check entries against observed failures and Git history.
- Commit: `docs: add ai failure audit`

**TASK 25 – Complete Homework Documentation**

- Status: TODO
- Files: `README.md`, `TASK_DECOMPOSITION.md`
- Goal: Explain installation, running, keyboard mapping, features, verification and limitations.
- Criteria: Project can be understood and run using its documentation.
- Verification: Review commands and compare documentation against completed implementation.
- Commit: `docs: finalize drum kit homework guide`

## 5. Implementation Contracts

### Drum Pad

- Native `<button type="button">`.
- Stable pad ID.
- Display label and shortcut.
- Receive pressed state.
- Expose `aria-pressed`.
- Support pointer interaction.

### Keyboard Hook

- Use `keydown` and `keyup`.
- Use `KeyboardEvent.code`.
- Ignore repeated keydowns.
- Ignore form input typing.
- Prevent default behavior only when appropriate.
- Remove listeners during cleanup.
- Avoid stale closures.

### Audio Engine

- Provide an interface for triggering sounds.
- Initialize audio in compliance with browser autoplay restrictions.
- Manage resources and cleanup.
- Provide an analyser or equivalent real audio-level source for the meter.
- Do not misrepresent arbitrary animation values as measured decibels.

### Visual Hit Log

- Record actual hits.
- Use stable keys.
- Show recent activity.
- Provide an accessible live output.

### Visual Decibel Meter

- Display changing output levels.
- Use actual audio data.
- Show meaningful visual feedback.
- Clean up animation or audio-analysis resources.

## 6. Verification Checklist

- [x] React 19 and Vite verified
- [x] Initial production build passed
- [ ] Lint verification recorded
- [ ] Seven keyboard mappings work
- [ ] Keydown and keyup work
- [ ] Key repeat is ignored
- [ ] Form input focus is isolated
- [ ] Mouse and touch interactions work
- [ ] Seven pad sounds work
- [ ] Hit Log works
- [ ] Live output works
- [ ] Decibel Meter works
- [ ] Focus state is visible
- [ ] Responsive at 375px
- [ ] Responsive at 1440px
- [ ] No unintended horizontal overflow
- [ ] Keyboard behavior tests pass
- [ ] Component and audio tests pass
- [ ] Lighthouse Accessibility result recorded
- [ ] WCAG 2.2 AA checks performed
- [ ] At least three genuine AI failures documented
- [ ] Final README completed
- [ ] Final Git history reviewed

## 7. Current Progress

- Completed: TASK 00–02
- In progress: None
- Remaining: TASK 03–25
- Initial commit: `1a588ae`
- Planned number of additional commits: up to 25, depending on independently verifiable changes.
- GitHub push: Not performed.

Update this document whenever a task changes status.