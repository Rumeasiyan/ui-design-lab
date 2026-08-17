# design-template

Reusable scaffold for UI/UX design-experiment sessions: multiple aesthetic directions
side-by-side, a live tweak bar for tuning tokens, mobile/tablet/desktop preview frames, and
scripted image/video generation. Clone this per project instead of rebuilding the harness
each time.

Background/research trail: `goal-faceless-uiux-influencer/notes/` (topics: tools, theory,
workflow), particularly `2026-08-17-ai-design-workflow-video.md` and the follow-up research
notes on the same date.

## Quick start

```bash
npm install
npm run dev
```

## How it's organized

- **`src/tokens.css`** — single source of design truth. Every color/font/radius/spacing a
  direction uses should be a CSS custom property here, not a hardcoded value in a component.
- **`src/directions/`** — one folder per aesthetic direction (`v1/`, `v2/`, ...), each a full
  page component committed to its own aesthetic. Register new ones in `src/lib/directions.ts`.
- **`src/components/DirectionToggle.tsx`** — tab bar to switch/compare directions live.
  Number keys 1-9 jump directly to a direction, `G` toggles the all-directions grid view.
- **`src/components/DeviceFrame.tsx`** — mobile/tablet/desktop preview frames.
- **`src/components/TweakBar.tsx`** — live-adjust tokens (radius, gap, font scale, motion) by
  eye; "Copy CSS" exports the current values back into `tokens.css` shape.

## Adding a new direction

1. `mkdir src/directions/v2 && touch src/directions/v2/Page.tsx` — build the page, binding
   every visual value to a `var(--token-name)` from `tokens.css` (add new tokens there and
   to `TweakBar.tsx`'s `FIELDS` list if you need new tunable knobs).
2. Add an entry to `directions` in `src/lib/directions.ts`.
3. Same intent/guardrails across all directions in a session; each direction fully commits to
   its own aesthetic — never blend two directions in one component.

## Image generation

```bash
node scripts/imagegen.mjs "a topographic contour-line illustration in dark-green ink" src/directions/v1/hero.png
```

Wraps `codex exec`'s built-in image tool — billed against your existing ChatGPT Plus
subscription, no separate API key. Requires the `codex` CLI installed and logged in
(`codex login`).

## Video generation

```bash
node scripts/videogen/index.mjs "golden-hour clouds built from binary digits" --duration 8 --aspect 16:9
```

**Off by default.** With no `VIDEO_GEN_PROVIDER` set (or set to `manual`), this calls no API
and costs nothing — it prints the composed prompt for you to paste into Google Flow (Veo,
already covered by an AI Pro subscription's Flow credits) by hand.

To turn on paid automation for a specific project, set in `.env` (copy from `.env.example`):

```bash
VIDEO_GEN_PROVIDER=replicate   # or: openrouter, atlascloud
REPLICATE_API_TOKEN=...
```

Provider comparison and why these three: `goal-faceless-uiux-influencer/notes/2026-08-17-video-api-comparison.md`.
