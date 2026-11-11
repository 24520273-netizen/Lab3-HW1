# Project Rules – Lab 03 Homework 1

## 1. Technology Stack
- React 19 with Vite and JavaScript ES2024.
- React Functional Components only.
- Use `createRoot()` and `StrictMode`.
- Use CSS Modules and CSS Custom Properties.
- Node.js 24 and npm.
- Git for version control.

## 2. React Conventions
- Use `useState` for interactive component state.
- Use `useEffect` only for necessary side effects.
- Use `useId` for accessible form-control relationships when appropriate.
- Never mutate React state directly.
- Use stable keys for dynamically rendered lists.
- Avoid redundant effects and derived state duplication.
- Clean up subscriptions, listeners and timers.

## 3. Prohibited Patterns
- No `ReactDOM.render()`.
- No React Class Components.
- No `Component.defaultProps`.
- No `import * as React`.
- No `keyCode` or `keypress`.
- No `window.alert()`.
- No unsafe HTTP resources.
- No unprotected `dangerouslySetInnerHTML`.
- No unnecessary non-semantic HTML structures.

## 4. Keyboard Interaction
- Support W, A, S, D, J, K and L.
- Use `KeyboardEvent.code`.
- Handle both `keydown` and `keyup`.
- Ignore repeated keydown events using `event.repeat`.
- Ignore Drum Kit shortcuts while typing in input, textarea or select elements.
- Ensure keyboard listeners are removed during cleanup.
- Avoid stale closures and duplicate listeners.

## 5. Accessibility
- Target WCAG 2.2 AA.
- Target Lighthouse Accessibility score of 100.
- Use semantic HTML.
- Use native button elements for drum pads.
- Expose pressed states using `aria-pressed`.
- Provide visible keyboard focus.
- Do not communicate state using color alone.
- Include a Visual Hit Log with an accessible live output.
- Include a Visual Decibel Meter.
- Verify accessibility with Chrome DevTools and Lighthouse.

## 6. Audio and Lifecycle
- Assign appropriate audio resources to drum pads.
- Trigger audio from mouse and keyboard interactions.
- Manage audio initialization and resource cleanup.
- Avoid unwanted repeated audio playback.
- Keep audio resources and React lifecycle behavior consistent.

## 7. Responsive Design
- Support viewport widths from 375px to 1440px.
- Avoid unintended horizontal overflow.
- Maintain readable controls and visible focus indicators.
- Preserve keyboard and mouse usability on supported layouts.

## 8. Testing and Verification
- Follow Implement → Verify → Commit.
- Run relevant lint, build and tests when available.
- Verify keyboard interaction and audio behavior.
- Verify accessibility and responsive layouts.
- Record only actual verification results.
- Do not claim tests pass without evidence.

## 9. Git Workflow
- Create meaningful, independently verifiable atomic commits.
- Prefer multiple logical commits rather than large combined commits.
- Preserve commit messages explicitly required by the lab.
- Keep `TASK_DECOMPOSITION.md` updated before implementing features.
- Inspect Git status and changes before each commit.
- Do not create empty commits or artificial changes.
- Do not push, merge, reset or rewrite Git history without approval.

## 10. AI Failure Audit
- Maintain `AI_FAILURE_AUDIT.md`.
- Record at least three genuine AI-related failures according to the Lab 03 requirement.
- Document the problem, cause, verification evidence, correction and relevant commit.
- Never invent defects or verification evidence.