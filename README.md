# design-template

Reusable scaffold for UI/UX design-experiment sessions: multiple aesthetic directions
side-by-side, a live tweak bar for tuning design tokens, mobile/tablet/desktop preview
frames, and scripted image/video generation. Clone this per project instead of
rebuilding the harness each time.

**Status:** functional (builds/lints clean), pre-1.0. Several pieces are unverified in a
real browser or against real API docs — see `gh issue list --label unverified` in this
repo, or [`AGENTS.md`](AGENTS.md) for the full picture. For a step-by-step walkthrough
of running a design session, see [`USAGE.md`](USAGE.md). To start a session, use
[`PROMPT_TEMPLATE.md`](PROMPT_TEMPLATE.md) — the Aesthetic/Reference/Intent/Guardrails
prompt pattern plus a worked example. Contributor/agent conventions,
constraints, and versioning policy live in [`AGENTS.md`](AGENTS.md); load-bearing design
decisions and their reasoning are in [`DECISIONS.md`](DECISIONS.md).

## Requirements

- Node.js
- [pnpm](https://pnpm.io) — this repo is pnpm-only. `npm install` / `yarn install` are
  blocked by a `preinstall` guard (`only-allow pnpm`).

## Quick start

```bash
pnpm install
pnpm dev
```

Other scripts: `pnpm build`, `pnpm lint`, `pnpm preview`.

## How it's organized

- **`src/tokens.css`** — single source of design truth. Every color/font/radius/spacing
  a direction uses should be a CSS custom property here, not a hardcoded value in a
  component.
- **`src/directions/`** — one folder per aesthetic direction (`v1/`, `v2/`, ...), each a
  full page component committed to its own aesthetic. Register new ones in
  `src/lib/directions.ts`.
- **`src/components/DirectionToggle.tsx`** — tab bar to switch/compare directions live.
  Number keys 1-9 jump directly to a direction, `G` toggles the all-directions grid view.
- **`src/components/DeviceFrame.tsx`** — mobile/tablet/desktop preview frames.
- **`src/components/TweakBar.tsx`** — live-adjust tokens (radius, gap, font scale,
  motion) by eye; "Copy CSS" exports the current values back into `tokens.css` shape.

## Adding a new direction

1. `node scripts/new-direction.mjs v2 --label "V2" --sub "Short description"` — creates
   `src/directions/v2/Page.tsx` and registers it in `src/lib/directions.ts` in one step.
2. Fill in the page, binding every visual value to a `var(--token-name)` from
   `tokens.css` (add new tokens there and to `TweakBar.tsx`'s `FIELDS` list if you need
   new tunable knobs).
3. Same intent/guardrails across all directions in a session; each direction fully
   commits to its own aesthetic — never blend two directions in one component. See
   [`PROMPT_TEMPLATE.md`](PROMPT_TEMPLATE.md) for the prompt pattern to drive this.

## Image generation

```bash
node scripts/imagegen.mjs "a topographic contour-line illustration in dark-green ink" src/directions/v1/hero.png
```

Wraps `codex exec`'s built-in image tool — billed against your existing ChatGPT Plus
subscription, no separate API key. Requires the `codex` CLI installed and logged in
(`codex login`). **Unverified end-to-end** — see open issue #2.

## Video generation

```bash
node scripts/videogen/index.mjs "golden-hour clouds built from binary digits" --duration 8 --aspect 16:9
```

**Off by default.** With no `VIDEO_GEN_PROVIDER` set (or set to `manual`), this calls no
API and costs nothing — it prints the composed prompt for you to paste into Google Flow
(Veo, already covered by an AI Pro subscription's Flow credits) by hand.

To turn on paid automation for a specific project, set in `.env` (copy from
`.env.example`):

```bash
VIDEO_GEN_PROVIDER=replicate   # or: openrouter, atlascloud
REPLICATE_API_TOKEN=...
```

**The three paid providers are unverified guesses against real API docs** — see open
issue #3 before trusting their request/response shapes.

## Issue tracking

Open work items, bugs, and unverified pieces are tracked as GitHub issues, not in a doc
in this repo. `gh issue list` to see what's open.
