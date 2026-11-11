# Production Studio Drum Kit — Lab 03 / Homework 1

React 19 + Vite 8 drum machine implementing 7 synthesized percussion sounds and accessible keyboard interactions.

## Run

Requirements: Node.js 24+, npm.

```powershell
npm.cmd ci
npm.cmd run dev
npm.cmd run test
npm.cmd run lint
npm.cmd run build
npm.cmd run preview
```

The `npm.cmd` form avoids PowerShell execution-policy issues with `npm.ps1` on Windows. The preview server serves `dist/` after a build.

## Controls

| Keyboard | Pad |
|---|---|
| W | Kick |
| A | Snare |
| S | Closed Hi-Hat |
| D | Open Hi-Hat |
| J | Clap |
| K | Tom |
| L | Crash |

You can also click/tap each pad, or focus it with **Tab** and activate with **Enter** or **Space**. Physical shortcuts use `KeyboardEvent.code`; they are disabled while typing into form controls and interactive elements. Holding a physical key does not retrigger it until release.

## Audio and accessibility

- Synthesized Web Audio sounds; no external samples or remote audio requests.
- `AudioContext` starts on user activation. Voices and analyser are disconnected/closed during cleanup.
- The hit log stores at most 12 events and uses `<output aria-live="polite">` with delayed announcements.
- The level meter uses the output `AnalyserNode` and RMS in **dBFS** (digital full scale), **not dB SPL** or sound-pressure measurements.
- Native `<button type="button">` pads expose `aria-pressed`, `aria-keyshortcuts` and visible focus/pressed state.

## Verification

- `npm.cmd run test` — built-in Node test runner: data/presets, keyboard guard, source listener checks, mocked Web Audio lifecycle, server-rendered ARIA, SEO files.
- `npm.cmd run lint` — ESLint.
- `npm.cmd run build` — Vite production build.
- Browser checks: W/A/S/D/J/K/L, mouse/touch, held keys, focus isolation, Alt+Tab, 375px and 1440px, DevTools Console.
- Lighthouse **mobile** on local preview `http://127.0.0.1:4173/` (2026-11-11): Performance **100**, Accessibility **100**, Best Practices **100**, SEO **100**. Evidence: [`evidence/lighthouse-mobile-all-100.png`](evidence/lighthouse-mobile-all-100.png). Previous SEO failure: [`evidence/lighthouse-seo-82-before.png`](evidence/lighthouse-seo-82-before.png).

**Limits:** Lighthouse 100 does not establish full WCAG 2.2 AA conformance; screen-reader, assistive-technology, contrast and complete manual audits are separate. Node's SSR checks do not replace real browser end-to-end event tests.

## Project documentation

- [`TASK_DECOMPOSITION.md`](TASK_DECOMPOSITION.md) — plan, task statuses, and final checklist.
- [`project-rules.md`](project-rules.md) — React, quality, accessibility and Git conventions.
- [`ARCHITECTURE.md`](ARCHITECTURE.md) — architecture overview.
- [`AI_FAILURE_AUDIT.md`](AI_FAILURE_AUDIT.md) — verified defects, fixes and evidence/provenance limits.

The project keeps build artifacts (`dist/`) and dependencies (`node_modules/`) outside version control. No push or history rewrite is needed for final verification.
