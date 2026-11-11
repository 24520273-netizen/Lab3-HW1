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
        DrumKit.jsx
        DrumKit.module.css
        HitLog.jsx
        HitLog.module.css
        DecibelMeter.jsx
        DecibelMeter.module.css
      hooks/
        useDrumKeyboard.js
      audio/
        audioEngine.js
      data/
        drumPads.js
      DrumMachine.jsx
      DrumMachine.module.css
  App.jsx
```

This structure is a proposal. Only create files when implementing the relevant task.

## 3A. Step 2 Execution Plan

Goal: Build the seven-pad data model, reusable React components, application integration and responsive CSS Modules.

Scope: No Audio Engine, global Keyboard Hook, Hit Log or Decibel Meter implementation in Step 2.

### Task 2.1 – Drum Pad Data

- Status: DONE
- Related original task: TASK 04
- Files: `src/homeworks/DrumMachine/data/drumPads.js`
- Define seven stable pad IDs, visible keys, keyboard codes and sound identifiers.
- Verify exactly seven unique IDs and keyboard mappings.
- Commit: `feat(hw1): define seven drum pad configurations`

### Task 2.2 – Reusable DrumPad

- Status: DONE
- Related original task: TASK 05
- Files: `components/DrumPad.jsx`
- Implement a semantic button with props and `aria-pressed`.
- No audio or global keyboard listeners.
- Verify lint, build and component semantics.
- Commit: `feat(hw1): implement accessible DrumPad component`

### Task 2.3 – DrumKit Layout

- Status: DONE
- Related original tasks: TASK 03 and TASK 05
- Files: `components/DrumKit.jsx`
- Render all seven DrumPad components using stable IDs.
- Use semantic section and heading structure.
- Verify rendered data, lint and build.
- Commit: `feat(hw1): compose semantic DrumKit layout`

### Task 2.4 – React App Integration

- Status: DONE
- Related original task: TASK 03
- Files: `src/App.jsx`
- Integrate DrumKit into the existing React application.
- Preserve Vite configuration, React 19 entry point and StrictMode.
- Remove only unused Vite starter UI and imports.
- Verify seven rendered pads, lint, build and browser console.
- Commit: `feat(hw1): integrate DrumKit into application`

### Task 2.5 – Responsive CSS Modules

- Status: DONE
- Related original task: TASK 06
- Files: `components/DrumPad.module.css`, `components/DrumKit.module.css`
- Apply studio styling using CSS Modules and CSS Custom Properties.
- Provide visible focus and active-state styles.
- Verify responsive behavior at 375px and 1440px.
- Check horizontal overflow and keyboard navigation.
- Commit: `style(hw1): implement responsive studio drum kit`

### Step 2 Commit Policy

- Target exactly five meaningful implementation commits.
- Update documentation before implementing features.
- Include this planning update with the Task 2.1 commit.
- Review changes and verification results before every commit.
- Update task statuses only after corresponding work is verified.
- Do not implement Step 3 functionality.

## 3B. Step 3 Audio Execution Plan

Goal: Implement seven drum sounds using Web Audio API, reusable playback logic and safe audio resource management.

Scope: Audio only. Keyboard Hook, Hit Log and Decibel Meter UI belong to later steps.

### Task 3.1 – Configure Drum Sound Presets

- Status: DONE
- Files: `src/homeworks/DrumMachine/data/drumSoundPresets.js`
- Define seven synthesized drum sound configurations.
- Preserve existing soundId and keyboard mappings.
- No external audio files required.
- Verify preset completeness, uniqueness and valid parameters.
- Commit: `feat(hw1): configure seven synthesized drum presets`

### Task 3.2 – Implement Audio Engine

- Status: DONE
- Files: `src/homeworks/DrumMachine/audio/audioEngine.js`
- Create a reusable Web Audio API engine.
- Manage a shared AudioContext and initialization.
- Handle suspended or unavailable audio contexts.
- Commit: `feat(hw1): implement reusable audio engine`

### Task 3.3 – Implement Sound Playback

- Status: DONE
- Implement playback for all seven sound presets.
- Support rapid repeated hits and overlapping audio.
- Handle invalid sound IDs and playback errors.
- Verify audio playback independently before React integration.
- Commit: `feat(hw1): support low latency drum sound playback`

### Task 3.4 – Integrate Audio with React

- Status: DONE
- Connect playback to the existing DrumKit trigger callback.
- Preserve existing Step 2 components and keyboard mappings.
- Support button click, Enter and Space activation.
- Verify all seven sounds in the browser.
- Commit: `feat(hw1): connect drum pads to audio playback`

### Task 3.5 – Audio Cleanup and Stability

- Status: DONE
- Release AudioContext and associated resources appropriately.
- Avoid duplicate resources in React StrictMode.
- Verify rapid clicks, errors, mount and unmount behavior.
- Add appropriate automated tests where feasible.
- Commit: `fix(hw1): ensure audio lifecycle cleanup and stability`

### Step 3 Git Policy

- Aim for at least five meaningful commits.
- Verify each task before committing.
- Do not create empty or artificial commits.
- Update statuses only after actual verification.
- Do not push or rewrite Git history without permission.

## 3C. Step 4 Keyboard Controls

Goal: Provide physical keyboard controls for seven Drum Pads without duplicating audio logic.

### Task 4.1 – Keyboard Hook

- Status: DONE
- Files: `src/homeworks/DrumMachine/hooks/useDrumKeyboard.js`
- Map KeyboardEvent.code to the existing drum pad configuration.
- Handle keydown, keyup, repeat guard and focus isolation.
- Release held keys when focus is lost or the page becomes hidden.
- Ensure effect cleanup and callback freshness under StrictMode.
- Verify mapping, input guards, lint and production build.
- Commit: `feat(hw1): implement drum keyboard controls`

### Task 4.2 – React Integration and Active States

- Status: DONE
- Files: `src/App.jsx`, `components/DrumKit.jsx`, `components/DrumPad.jsx`
- Reuse the existing audio trigger callback.
- Pass active pad IDs to DrumKit and DrumPad.
- Synchronize visual feedback and aria-pressed.
- Preserve native button click, Enter and Space activation.
- Support pointer press/release and interruption.
- Verify keyboard, pointer, focus, blur and visibility behaviors.
- Commit: `feat(hw1): synchronize keyboard and drum pad states`

### Step 4 Constraints

- No Audio Engine rewrite.
- No Visual Hit Log or Decibel Meter implementation.
- No new dependencies.
- Exactly two planned atomic commits unless a verified independent fix requires another.
- Follow Implement, Verify, Commit.
- Do not push or rewrite Git history.

## 3D. Step 5 Visual Feedback and Accessibility

Goal: Add accessible hit history, real digital audio metering and improve drum control accessibility.

### Task 5.1 – Visual Feedback

- Status: DONE
- Files: HitLog.jsx, HitLog.module.css, DecibelMeter.jsx, DecibelMeter.module.css, FeedbackPanel.module.css, App.jsx, audioEngine.js
- Record successful audio triggers through the existing handleTrigger callback.
- Keep at most 12 recent hits with stable IDs.
- Announce recent activity through output aria-live="polite" with debouncing.
- Measure output signal using Web Audio AnalyserNode and RMS.
- Display digital signal level in dBFS, not dB SPL.
- Throttle React updates and clean up animation frames and timers.
- Verify mouse, keyboard, rapid hits, meter response, lint and build.
- Commit: `feat(hw1): add hit history and visual audio meter`

### Task 5.2 – Accessibility Improvements

- Status: DONE
- Files: DrumPad.jsx, DrumPad.module.css, DrumKit.jsx, DrumKit.module.css, App.jsx
- Improve accessible names, shortcut instructions and visible pressed feedback.
- Preserve native buttons, focus-visible and aria-pressed.
- Verify keyboard navigation, responsive layout, target size and basic contrast.
- Do not claim complete WCAG conformance before final audit.
- Commit: `feat(hw1): improve drum kit accessibility`

### Step 5 Constraints

- Preserve existing keyboard and playback logic.
- No new dependencies.
- No synthetic or randomly animated audio meter values.
- No unbounded hit history.
- No duplicate live announcements.
- Verify before each commit.
- Leave full Lighthouse audit for Step 6.

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

- Status: DONE
- Files: `src/App.jsx`, `src/homeworks/DrumMachine/DrumMachine.jsx`
- Goal: Establish the main Drum Kit layout using semantic HTML.
- Criteria: Drum Machine renders without runtime errors.
- Verification: Lint, build and browser inspection.
- Commit: `feat: create drum machine app shell`

**TASK 04 – Define Drum Pad Configuration**

- Status: DONE
- Files: `src/homeworks/DrumMachine/data/drumPads.js`
- Goal: Define seven pad IDs, labels, sound identifiers and physical keyboard codes.
- Criteria: Exactly seven unique mappings for KeyW, KeyA, KeyS, KeyD, KeyJ, KeyK and KeyL.
- Verification: Inspect mapping uniqueness and correctness.
- Commit: `feat: define drum pad configuration`

**TASK 05 – Implement Reusable Drum Pad Component**

- Status: DONE
- Files: `components/DrumPad.jsx`
- Goal: Create a reusable native button representing a drum pad.
- Criteria: Correct label, keyboard hint, button semantics and `aria-pressed` state.
- Verification: Browser inspection and accessibility inspection.
- Commit: `feat: add accessible drum pad component`

**TASK 06 – Create Studio Layout and Theme**

- Status: DONE
- Files: `DrumMachine.module.css`, `DrumPad.module.css`
- Goal: Build a studio-themed layout using CSS Modules and CSS Custom Properties.
- Criteria: Clear pad arrangement, readable text and consistent styling.
- Verification: Browser visual inspection and production build.
- Commit: `style: add studio drum machine theme`

### Phase C – Keyboard Interaction

**TASK 07 – Implement Keyboard Hook**

- Status: DONE
- Files: `hooks/useDrumKeyboard.js`
- Goal: Register physical keyboard listeners using `KeyboardEvent.code`.
- Criteria: Recognize all seven specified keys using `keydown`.
- Verification: Test key mapping and listener registration.
- Commit: `feat: implement physical keyboard controls`

**TASK 08 – Implement Key Release Handling**

- Status: DONE
- Files: `hooks/useDrumKeyboard.js`, `DrumMachine.jsx`
- Goal: Support `keyup` and pressed-state release.
- Criteria: Pad activates on keydown and releases on keyup.
- Verification: Test press/release sequences.
- Commit: `feat: support drum pad key release`

**TASK 09 – Prevent Repeated Keydown Activation**

- Status: DONE
- Files: `hooks/useDrumKeyboard.js`
- Goal: Ignore repeated keydown events using `event.repeat`.
- Criteria: Holding a key does not generate unwanted repeated hits.
- Verification: Hold individual keys and test repeated events.
- Commit: `fix: prevent repeated keyboard triggers`

**TASK 10 – Isolate Form Input Focus**

- Status: DONE
- Files: `hooks/useDrumKeyboard.js`
- Goal: Prevent drum shortcuts while typing into input, textarea or select controls.
- Criteria: Editable controls do not accidentally trigger drum sounds.
- Verification: Focus relevant controls and test keyboard shortcuts.
- Commit: `fix: isolate drum shortcuts from form inputs`

**TASK 11 – Ensure Keyboard Lifecycle Cleanup**

- Status: DONE
- Files: `hooks/useDrumKeyboard.js`
- Goal: Ensure correct listener cleanup and avoid stale closures.
- Criteria: No duplicate listeners after remounting or callback changes.
- Verification: React StrictMode and event lifecycle tests.
- Commit: `fix: ensure safe keyboard listener lifecycle`

### Phase D – Audio Engine

**TASK 12 – Implement Audio Engine**

- Status: DONE
- Files: `audio/audioEngine.js`
- Goal: Provide an audio playback interface based on browser audio capabilities.
- Criteria: Audio resources are initialized safely and cleaned up when appropriate.
- Verification: Browser audio inspection and lifecycle tests.
- Commit: `feat: implement drum audio engine`

**TASK 13 – Implement Distinct Drum Sounds**

- Status: DONE
- Files: `audio/audioEngine.js`
- Goal: Generate or play distinct percussion sounds mapped to drum pads.
- Criteria: Each configured pad produces its intended audible feedback.
- Verification: Manually check the seven sound mappings.
- Commit: `feat: add drum sound presets`

**TASK 14 – Connect Drum Pads to Audio**

- Status: DONE
- Files: `DrumMachine.jsx`, `audio/audioEngine.js`
- Goal: Connect mouse and keyboard activation to audio playback.
- Criteria: Each valid interaction triggers the correct sound once.
- Verification: Manual interaction testing.
- Commit: `feat: connect drum interactions to audio`

**TASK 15 – Complete Pointer Interaction**

- Status: DONE
- Files: `DrumPad.jsx`, `DrumMachine.jsx`
- Goal: Handle pointer activation and pressed-state release consistently.
- Criteria: Mouse/touch interaction works and active states do not remain stuck.
- Verification: Test pointer press, release and cancellation.
- Commit: `feat: support drum pad pointer interactions`

### Phase E – Visual Feedback

**TASK 16 – Implement Visual Hit Log**

- Status: DONE
- Files: `components/HitLog.jsx`, `HitLog.module.css`
- Goal: Display a visual history of drum hits.
- Criteria: Each valid hit is recorded with a stable identifier.
- Verification: Trigger multiple pads and inspect history ordering.
- Commit: `feat: implement visual hit log`

**TASK 17 – Add Accessible Live Output**

- Status: DONE
- Files: `components/HitLog.jsx`
- Goal: Announce the latest pad activation with `<output aria-live="polite">`.
- Criteria: Visual feedback is understandable without listening to the audio.
- Verification: Inspect accessibility tree and test announcements.
- Commit: `a11y: announce drum hits with live output`

**TASK 18 – Implement Visual Decibel Meter**

- Status: DONE
- Files: `components/DecibelMeter.jsx`, `DecibelMeter.module.css`, audio integration files
- Goal: Display changing audio levels derived from actual audio output analysis.
- Criteria: Meter responds to generated sound and returns to idle.
- Verification: Test meter changes with different drum hits.
- Commit: `feat: implement visual audio level meter`

### Phase F – Accessibility and Responsive Design

**TASK 19 – Improve Focus and Pressed Feedback**

- Status: DONE
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

- Status: DONE
- Files: Keyboard hook test files and test configuration
- Goal: Test mappings, keydown, keyup, repeat guard and focus isolation.
- Criteria: Relevant automated tests pass.
- Verification: Execute the test command and review output.
- Commit: `test: cover drum keyboard interactions`

**TASK 22 – Add Component and Audio Tests**

- Status: DONE
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

- Status: IN PROGRESS
- Files: `AI_FAILURE_AUDIT.md`
- Goal: Document at least three genuine AI-related failures with causes, evidence, solutions and fix commits.
- Criteria: All entries represent actual observed problems; no fabricated evidence.
- Verification: Cross-check entries against observed failures and Git history.
- Commit: `docs: add ai failure audit`

**TASK 25 – Complete Homework Documentation**

- Status: DONE
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
- [x] Lint verification recorded
- [ ] Seven keyboard mappings work
- [ ] Keydown and keyup work
- [ ] Key repeat is ignored
- [ ] Form input focus is isolated
- [ ] Mouse and touch interactions work
- [ ] Seven pad sounds work
- [x] Hit Log works
- [x] Live output works
- [x] Decibel Meter works
- [ ] Focus state is visible
- [ ] Responsive at 375px
- [ ] Responsive at 1440px
- [ ] No unintended horizontal overflow
- [x] Keyboard behavior tests pass
- [x] Component and audio tests pass
- [x] Lighthouse Accessibility result recorded
- [ ] WCAG 2.2 AA checks performed
- [ ] At least three genuine AI failures documented
- [x] Final README completed
- [x] Final Git history reviewed

## 7. Current Progress

- Completed: TASK 00–02
- In progress: None
- Remaining: TASK 03–25
- Initial commit: `1a588ae`
- Planned number of additional commits: up to 25, depending on independently verifiable changes.
- GitHub push: Not performed.

Update this document whenever a task changes status.
## Step 6 – Final Verification and Submission

### Commit 1 – Functional Tests and Accessibility Verification
- Status: DONE
- Review repository, rules, source architecture and available scripts.
- Verify all seven pads, audio, keyboard, focus isolation, hit history and digital meter.
- Verify effects, listeners, timers and audio resource cleanup.
- Add meaningful automated tests using available tooling.
- Verify 375px mobile and 1440px desktop.
- Run Lighthouse and document its actual Accessibility score.
- Investigate and fix only reproducible defects.
- Run lint, tests and production build before committing.
- Commit: `test(hw1): verify drum kit functionality and accessibility`

### Commit 2 – AI Failure Audit and Submission
- Status: DONE
- Document only verified AI-generated failures with reproduction evidence.
- Aim for three verified failures as required by the Lab rubric.
- Include related prompts, code, causes, proof, fixes and commit hashes.
- Review project-rules.md and finalize README if necessary.
- Update the task checklist with actual results.
- Review Git history, ignored files, secrets and build artifacts.
- Confirm a clean working tree and summarize submission readiness.
- Commit: `docs(hw1): finalize AI failure audit and submission checklist`

### Step 6 verification evidence (2026-11-11)

- Node tests, ESLint, and Vite production build: run successfully via 01-verify-and-commit.ps1.
- Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100 (see evidence/lighthouse-mobile-all-100.png).
- Pre-fix SEO 82/100: meta description missing and invalid robots.txt (see evidence/lighthouse-seo-82-before.png).
- Full WCAG 2.2 AA/manual screen-reader conformance: not established by Lighthouse alone.

### Final submission gate

- Two Step 6 commits are planned; both created only after running their verification gates.
- AI_FAILURE_AUDIT.md records three observed defects. Original AI-output provenance remains incomplete for the two SEO omissions.
- Lighthouse Accessibility 100 does not prove full WCAG 2.2 AA conformance. Check remaining manual criteria before final submission.
