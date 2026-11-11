# AI Failure Audit — Lab 03 / HW1

Evidence-based review of the AI-assisted development workflow. Source: development conversation, repository snapshot and Chrome Lighthouse screenshots. **A technically verified defect is not automatically proof of AI causation.** Where the exact original AI prompt or pre-fix Git diff was unavailable, it is identified as a *prompt summary* or evidence gap, not a fabricated verbatim quote.

## 01 — Kick (W) and Tom (K) were nearly inaudible

- **AI task / prompt summary:** Generate seven synthesized drum sounds with a low-latency Web Audio Engine, including Kick and Tom.
- **Problematic implementation:** the initial oscillator used `oscillator.type = 'sine'`, while Kick/Tom swept towards approximately 48 Hz / 85 Hz with primarily low-frequency fundamentals.
- **Technical cause:** nearly pure low-frequency sine tones can be much less audible on speakers that poorly reproduce bass frequencies. The shared click/keyboard trigger was not the cause.
- **Reproduction and observed evidence:** during Step 5 the user reported that W and K produced no audible sound while the **Recent Hits updated and the Audio Level meter moved**. This verified trigger and signal activity but not perceived loudness. After the proposed oscillator/gain change, the user explicitly reported being able to hear both sounds.
- **Fix:** use `triangle` for tone-only presets and gain multiplier `1.5` for tone-only voices; leave hybrid/noise sounds unchanged.
- **Fix commit:** `674b6d3` — `fix(hw1): improve kick and tom audibility`.
- **Verification:** user listening confirmation after the fix; added automated test asserts Kick/Tom oscillator types. Subjective sound on other devices is not independently measured.
- **AI provenance:** the initial sine implementation and proposed fix were supplied in the AI-guided implementation steps. Exact initial prompt text is summarized above, not presented as a verbatim transcript.

## 02 — Missing document meta description

- **AI task / prompt summary:** Prepare a React 19 + Vite Production Studio Drum Kit targeting Lighthouse Accessibility 100 and production-quality submission.
- **Problematic code:** initial `index.html` had `<title>lab-3---hw1</title>` and standard charset/viewport tags but **no** `<meta name="description" ...>`.
- **Technical cause:** the project kept Vite starter HTML and omitted document-level SEO metadata.
- **Reproduction and evidence:** Chrome Lighthouse mobile audit on `2026-11-11` scored SEO **82**, explicitly reporting `Document does not have a meta description`. Screenshot: [`evidence/lighthouse-seo-82-before.png`](evidence/lighthouse-seo-82-before.png). The uploaded pre-fix project ZIP also contains the missing tag.
- **Fix:** added a concise project-specific `<meta name="description" ...>` to `index.html`.
- **Fix commit:** `fba32e7` — `test(hw1): verify drum kit functionality and accessibility` (includes SEO corrections already made and manually retested).
- **Post-fix evidence:** Lighthouse mobile SEO **100** on 2026-11-11: [`evidence/lighthouse-mobile-all-100.png`](evidence/lighthouse-mobile-all-100.png).
- **AI provenance limitation:** omission occurred in the AI-guided initial setup. An exact original model-output diff proving the omission came directly from AI rather than the original Vite template is not bundled.

## 03 — Invalid / missing robots.txt

- **AI task / prompt summary:** Complete a production-quality React + Vite drum app and verify its Lighthouse results.
- **Problematic configuration:** the reviewed pre-fix project's `public/` folder contained `favicon.svg` and `icons.svg`, but no `robots.txt`.
- **Technical cause:** without a static file, the SPA dev/preview fallback can serve an HTML document for `/robots.txt` instead of a valid plain-text robots policy. That is a likely explanation rather than confirmed response bytes from the failing request.
- **Reproduction and evidence:** Chrome Lighthouse mobile scored SEO **82** and explicitly reported `robots.txt is not valid — 14 errors found`; screenshot: [`evidence/lighthouse-seo-82-before.png`](evidence/lighthouse-seo-82-before.png). Missing source file was observed in the pre-fix ZIP.
- **Fix:** create `public/robots.txt` containing `User-agent: *` and `Allow: /` so Vite copies it into production `dist/` and serves plain text.
- **Fix commit:** `fba32e7` — `test(hw1): verify drum kit functionality and accessibility`.
- **Post-fix evidence:** Lighthouse mobile SEO **100**: [`evidence/lighthouse-mobile-all-100.png`](evidence/lighthouse-mobile-all-100.png). Added automated test ensures the plain-text file exists; this does not replace an HTTP response-header test on the user's local preview.
- **AI provenance limitation:** missing robots.txt arose during AI-guided development; the ZIP does not contain a verbatim initial model instruction to omit robots.txt.

## Rubric status / evidence integrity

Three **distinct technical defects/omissions** are documented with reproduction evidence and subsequent fixes. The W/K audibility defect is supported by the chat's before/after user observations. The two SEO findings are directly evidenced by Chrome Lighthouse screenshots and the earlier ZIP snapshot. **Full attribution of all three to specific AI-generated code is not yet independently demonstrated** by saved original AI outputs or pre-fix commit diffs. For a rubric requiring three *proven AI-generated failures*, supplement this file with the original AI prompts, generated snippets, and Git evidence before stating that criterion is completely satisfied. Do not invent stale-closure, memory-leak or duplicate-listener bugs simply because the code has safeguards against them.

This audit does **not** claim full WCAG 2.2 AA compliance; Lighthouse Accessibility 100 is a separate result.
