# HANDOFF — finish/verify design-template

This repo was scaffolded by an agent in a different session (working from
`~/external/life-os/goal-faceless-uiux-influencer`, a personal-planning repo — its
`notes/` directory holds the full research trail behind every decision below, and is
still readable from here via absolute path even though it's a separate git repo). This
file is a self-contained brief: read this, don't assume you have the prior conversation.

## What this repo is for

A reusable scaffold to clone per UI/UX design project: multiple aesthetic "directions"
previewable side-by-side, a live tweak bar for tuning design tokens by eye, mobile/
tablet/desktop preview frames, and scripted image/video generation. Not a specific
client project — a harness other projects get built inside of (or that gets cloned).

Full background, if useful: `~/external/life-os/goal-faceless-uiux-influencer/notes/`
— particularly `2026-08-17-ai-design-workflow-video.md` (the original spec: prompt
pattern, tweak bar, direction toggle, reusable template ask) and the same-day follow-up
notes on image/video-gen tooling decisions (`2026-08-17-cli-subscription-image-gen.md`,
`2026-08-17-video-api-comparison.md`).

## Current state — built but UNVERIFIED beyond typecheck/build

Stack: Vite + React 19 + TypeScript + Tailwind v4 (via `@tailwindcss/vite`).

- `src/tokens.css` — CSS custom properties as the single design-token source (colors,
  fonts, radius, gap, motion). `npm run build` and `tsc -b` pass clean.
- `src/lib/directions.ts` + `src/directions/v1/Page.tsx` — direction registry + one
  placeholder direction, lazy-loaded.
- `src/components/DirectionToggle.tsx` — tab bar switching directions, number-key
  shortcuts (1-9), `G` toggles an all-directions grid view.
- `src/components/DeviceFrame.tsx` — mobile (390px) / tablet (834px) / desktop (100%)
  preview frame switch.
- `src/components/TweakBar.tsx` — live sliders/toggles bound to the CSS custom
  properties in `tokens.css` (radius, gap, font-scale, motion on/off, motion duration,
  reveal distance), "Copy CSS" (clipboard) + "Reset" buttons.
- `scripts/imagegen.mjs` — wraps `codex exec`'s built-in image tool. Confirmed working
  as a *raw command* in a throwaway scratch dir during the prior session (`codex exec
  "generate a simple test image..." --sandbox workspace-write --skip-git-repo-check`
  produced a real 1254×1254 PNG, billed against the ChatGPT Plus session, no separate
  API key). **The wrapper script itself (`scripts/imagegen.mjs`) has never been run —
  different code path (path resolution, prompt templating, mkdir), could have bugs.**
- `scripts/videogen/index.mjs` + `providers/{manual,replicate,openrouter,atlascloud}.mjs`
  — dispatcher reading `VIDEO_GEN_PROVIDER` env var, default `manual` (composes and
  prints the prompt, calls no API, costs nothing — pastes into Google Flow by hand).
  **The three paid providers (`replicate.mjs`, `openrouter.mjs`, `atlascloud.mjs`) are
  UNVERIFIED GUESSES.** Endpoint URLs and request/response shapes were written from
  search-result summaries during research, not from reading each provider's actual API
  reference. Do not trust them as correct without checking real docs.
- `.env.example` — provider env vars, no real `.env` created/tested.
- Dev server confirmed serving correct HTML/JS via `curl` only — **never visually
  verified in an actual browser.** No one has seen the TweakBar sliders actually move
  the page, the DirectionToggle keys actually switch, or the device frames actually
  resize.
- Still has Vite's default favicon/title in `index.html` — never customized.
- Not committed to git yet (repo is `git init`'d, nothing staged/committed by request of
  the user — leave that decision to them, don't auto-commit).

## What "done" looks like — work through this list

1. **Visual verification.** Run `npm run dev`, actually open it in a browser (or use
   Claude-in-Chrome / a screenshot tool if available), confirm: directions render, tab
   switching works, number-key shortcuts (1, G) work, device-frame widths visibly
   change, TweakBar sliders visibly change the page in real time, Copy CSS produces a
   valid `:root { ... }` block, Reset actually resets.
2. **Verify `scripts/imagegen.mjs` for real.** Run it against a scratch prompt, confirm
   it produces a file at the expected path, fix whatever's wrong. Needs `codex` CLI
   installed and logged in (`codex login`) — check it's available before assuming
   failure is the script's fault vs. missing login.
3. **Fix the three video providers against real docs**, not search summaries:
   - Replicate: https://replicate.com/docs/reference/http
   - OpenRouter: https://openrouter.ai/docs (video generation section — announced 2026,
     check current shape, it's new)
   - Atlas Cloud: https://www.atlascloud.ai/ (check their actual API reference for the
     video-generation endpoint — pricing pages I read disagreed with each other on
     Veo 3.1's per-second cost, $0.03 vs $0.05, so don't trust anything from that
     research beyond "an API exists," verify shape and pricing fresh)
   Each provider file has a comment pointing at what it's supposed to do — keep the
   `manual` default behavior and the `VIDEO_GEN_PROVIDER` env-var switch, that pattern
   is settled (decision, not a guess) — only the paid providers' actual HTTP calls need
   fixing.
4. **Add a real `.env`** (gitignored already) and smoke-test at least one paid provider
   end-to-end if a key is available, or explicitly confirm with the user before spending
   anything.
5. **Polish**: replace the default Vite favicon/title in `index.html` with something
   that isn't a placeholder. Not urgent, but flagged as untouched.
6. **Add a second example direction** (`src/directions/v2/`) if useful to prove the
   registry pattern works for more than one entry — optional, use judgment.

## Constraints / things NOT to change without a good reason

- Keep `manual` as the default video-gen provider — this was an explicit user decision
  (off by default, pay-per-use APIs are opt-in per project), not an oversight.
- Keep `tokens.css` as the single source of design truth — every new direction should
  bind to `var(--token-name)`, not hardcode values, and new tunable values should be
  added both to `tokens.css` and to `TweakBar.tsx`'s `FIELDS` list.
- Don't commit to git unless the user asks.
