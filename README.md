# UI Design Lab

**Compare multiple UI design directions side by side, in the browser, with live design-token tuning.**

UI Design Lab is an open-source **UI/UX design harness**: a Vite + React 19 + Tailwind v4
template you clone per project to explore several distinct aesthetic *directions* for the
same screen at once — each direction fully committed to its own look — then tune the
shared design tokens (color, type, radius, spacing, motion) live with sliders and copy
the result straight back into CSS.

It is built for **AI-assisted design sessions**: you prompt an agent for N directions,
render them in the same harness, judge them side by side, and tune the winner by eye
instead of guessing values in a text editor.

[![CI](https://github.com/Rumeasiyan/ui-design-lab/actions/workflows/ci.yml/badge.svg)](https://github.com/Rumeasiyan/ui-design-lab/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React 19](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646cff.svg)](https://vite.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg)](https://tailwindcss.com)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

---

## Contents

- [What it does](#what-it-does)
- [Who it's for](#who-its-for)
- [Quick start](#quick-start)
- [How it's organized](#how-its-organized)
- [Adding a new direction](#adding-a-new-direction)
- [Adding a screen to a direction](#adding-a-screen-to-a-direction)
- [Image generation](#image-generation)
- [Video generation](#video-generation)
- [FAQ](#faq)
- [Project status](#project-status)
- [Contributing](#contributing)
- [License](#license)

## What it does

| Feature | What you get |
|---|---|
| **Side-by-side design directions** | One folder per aesthetic direction. Switch with a tab bar, number keys `1`-`9`, `←`/`→`, or press `G` for a grid showing every direction at once. |
| **Three worked samples to start from** | Editorial, Brutalist, and Soft directions — three screens each, built from the same tokens — showing what a finished direction looks like. One command deletes them all when you're ready to design. |
| **Live design-token tuning** | A TweakBar of sliders/toggles editing the real CSS custom properties in `src/tokens.css` at runtime — radius, gap, font scale, motion. "Copy CSS" exports the tuned values back into token shape. |
| **Device preview frames** | Render any screen at mobile (390px), tablet (834px), or desktop width without resizing your browser. |
| **Light / dark preview** | Every color token has a light-theme value. Toggle with `D` — the control sits in the harness's top bar, never inside the design being judged. |
| **Multi-screen flows** | A direction can hold several screens (Home → Detail → Settings), listed in a left sidebar and stepped through with `↑`/`↓`. |
| **Scripted image generation** | `scripts/imagegen.mjs` wraps `codex exec`'s image tool — real generated art in your directions, never a gray placeholder box. |
| **Scripted video generation** | `scripts/videogen/` with a pluggable provider dispatcher. Defaults to `manual`: no API call, no cost. |
| **A prompt pattern that works** | `PROMPT_TEMPLATE.md` — the Aesthetic / Reference / Intent / Guardrails structure for driving an AI agent to produce genuinely distinct directions, plus a worked example. |

## Who it's for

- **Designers and design engineers** who want to see three or five real, interactive
  takes on a screen instead of static mockups.
- **Anyone doing AI-assisted or "vibe coded" UI work** who needs a repeatable harness so
  each session doesn't start by rebuilding the same scaffolding.
- **Teams making a design-direction decision** and wanting to compare candidates under
  identical content and identical device widths.

## Requirements

- Node.js (22+ recommended)
- [pnpm](https://pnpm.io) — this repo is **pnpm-only**. `npm install` and `yarn install`
  are blocked by a `preinstall` guard (`only-allow pnpm`).

## Quick start

```bash
git clone https://github.com/Rumeasiyan/ui-design-lab.git my-project
cd my-project
rm -rf .git && git init   # detach from this repo's history
pnpm install
pnpm dev
```

Open the URL Vite prints (default `http://localhost:5173`). You'll land on the three
sample directions.

When you're ready to design your own, delete the samples:

```bash
node scripts/remove-samples.mjs
```

That removes all three sample folders and their registry entries and scaffolds a blank
`v1`. Do it before you start — a sample sitting in the tab bar next to your real work
makes the side-by-side comparison meaningless.

### Keyboard

| Key | Action |
|---|---|
| `1`-`9` | Jump to that direction |
| `←` / `→` | Previous / next direction |
| `↑` / `↓` | Previous / next screen in the active direction |
| `G` | All-directions grid |
| `D` | Light / dark |

Other scripts: `pnpm build`, `pnpm lint`, `pnpm preview`.

For the full screen-by-screen walkthrough of running a session, see
[`USAGE.md`](USAGE.md).

## How it's organized

- **`src/tokens.css`** — single source of design truth. Every color/font/radius/spacing
  a direction uses should be a CSS custom property here, not a hardcoded value in a
  component. Holds two groups: the `--color-*`/`--font-*`/`--radius`/`--gap`/`--motion-*`
  tokens the directions use, and a separate `--chrome-*` set for the harness's own UI.
  Both have a full light-theme override block.
- **`src/directions/`** — one folder per aesthetic direction, each committed to its own
  aesthetic and made up of one or more **screens** (`Page.tsx` as the default, more under
  `screens/<screenId>.tsx`). Register new ones in `src/lib/directions.ts`. Ships with
  three `sample: true` directions — see [`src/directions/README.md`](src/directions/README.md).
- **`src/components/DirectionToggle.tsx`** — tab bar to switch/compare directions live.
  Number keys 1-9 jump directly to a direction, `G` toggles the all-directions grid view.
  A filter input appears once there are more directions than fit comfortably (>6).
- **`src/components/ScreenNav.tsx`** — left sidebar listing the active direction's
  screens (`↑`/`↓` to move); only shows up when a direction has more than one.
- **`src/lib/useKeyboardNav.ts`** — every keyboard shortcut, in one handler, so
  directions and screens can't disagree about the arrow keys.
- **`src/lib/theme.ts`** — light/dark state; flips a `data-theme` attribute that
  `tokens.css` overrides against.
- **`src/components/DeviceFrame.tsx`** — mobile/tablet/desktop preview frames.
- **`src/components/TweakBar.tsx`** — live-adjust tokens (radius, gap, font scale,
  motion) by eye; "Copy CSS" exports the current values back into `tokens.css` shape.

## Adding a new direction

1. `node scripts/new-direction.mjs v2 --label "V2" --sub "Short description"` — creates
   `src/directions/v2/Page.tsx` as the direction's default screen and registers it in
   `src/lib/directions.ts` in one step.
2. Fill in the page, binding every visual value to a `var(--token-name)` from
   `tokens.css` (add new tokens there and to `TweakBar.tsx`'s `FIELDS` list if you need
   new tunable knobs). Size type in `em` — `DeviceFrame` derives the preview's base font
   size from `--font-scale`, and a `rem` would ignore the slider. Check the result in
   both themes.
3. Same intent/guardrails across all directions in a session; each direction fully
   commits to its own aesthetic — never blend two directions in one component. See
   [`PROMPT_TEMPLATE.md`](PROMPT_TEMPLATE.md) for the prompt pattern to drive this.

## Adding a screen to a direction

For a direction with more than one screen (e.g. a flow: Home → Detail → Settings):

```bash
node scripts/new-screen.mjs v2 detail --label "Detail"
```

Creates `src/directions/v2/screens/detail.tsx` and appends it to that direction's
`screens` array in `src/lib/directions.ts`. Once a direction has 2+ screens, the
`ScreenNav` sidebar appears on the left to switch between them, driven by `↑`/`↓`.
Number keys and `←`/`→` still select *directions*, not screens.

## Image generation

```bash
node scripts/imagegen.mjs "a topographic contour-line illustration in dark-green ink" src/directions/v1/hero.png
```

Wraps `codex exec`'s built-in image tool — billed against your existing ChatGPT Plus
subscription, no separate API key. Requires the `codex` CLI installed and logged in
(`codex login`). **Unverified end-to-end** — see open issue #2.

**Never ship a direction with placeholder images, icons, or stock art.** If a design
calls for an image, generate a real one with this script before calling the direction
done — a placeholder can't be judged for aesthetic feel, which defeats the point of a
visual direction review.

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

## FAQ

### What is UI Design Lab?

UI Design Lab is an open-source template repository for running UI/UX design experiments.
It renders several distinct visual "directions" for the same interface side by side in
one browser window, driven by a shared set of CSS design tokens you can tune live with
sliders. You clone it per design project rather than installing it as a dependency.

### What problem does it solve?

Choosing a visual direction from static mockups is unreliable — you can't feel spacing,
motion, or type scale in a PNG. UI Design Lab renders every candidate as a real,
interactive React screen under identical content and identical device widths, so the
comparison is fair, then lets you tune the winner's tokens by eye and export the result.

### How is this different from Storybook?

Storybook catalogs the *components of one design system*. UI Design Lab compares
*several competing design systems* against the same screen. Storybook answers "what
states does this button have?"; UI Design Lab answers "which of these five aesthetics
should we build?". They solve different stages of the process and can coexist.

### How is it different from a Figma file?

Figma directions are static and disconnected from the code you will ship. Here every
direction is real React + CSS running in a browser, so motion, responsiveness, and
actual token values are all live, and the tuned output is CSS you paste into a project.

### Do I need an AI agent to use it?

No. The harness is plain Vite + React + Tailwind and works fine hand-authored. It is
*optimized* for AI-assisted sessions — `PROMPT_TEMPLATE.md` gives a prompt structure that
reliably produces distinct directions — but nothing requires an agent.

### Do the image and video generation scripts cost money?

Image generation is billed against your existing ChatGPT Plus session through the `codex`
CLI, with no separate API key. Video generation is **off by default**
(`VIDEO_GEN_PROVIDER=manual`): it composes a prompt for you to paste into Google Flow by
hand and makes no API call. Paid video providers are strictly opt-in per project.

### Why is it pnpm-only?

To keep one lockfile authoritative. A mixed `package-lock.json` / `pnpm-lock.yaml` repo
produces different dependency trees for different contributors, which in a design harness
shows up as subtle visual differences. An `only-allow pnpm` `preinstall` guard enforces
it.

### Can I use it commercially?

Yes. It is MIT licensed — clone it, modify it, ship client work from it. See
[`LICENSE`](LICENSE).

### How do I delete the sample directions?

`node scripts/remove-samples.mjs`. It deletes every direction marked `sample: true` —
folders and registry entries — and scaffolds a blank `v1` if that leaves nothing behind.
Directions you created yourself are never touched. Pass `--dry-run` to see what it would
remove first.

### Does it support light mode?

Yes. `src/tokens.css` defines a full `:root[data-theme="light"]` override for every color
token, and the harness's own UI has a matching `--chrome-*` set, so the tool stays legible
too. Toggle with `D` or the button in the top bar. The toggle deliberately lives in the
harness chrome rather than inside a rendered screen, so it never becomes part of the
design you're evaluating.

### How do I add my own design tokens?

Add the custom property to `src/tokens.css`, then add a matching entry to the `FIELDS`
list in `src/components/TweakBar.tsx`. Adding it to only one of the two breaks either the
tuning UI or the "Copy CSS" export.

## Project status

Functional (builds and lints clean), **pre-1.0**. Several pieces are unverified in a real
browser or against real API docs — run `gh issue list --label unverified`, or see
[`AGENTS.md`](AGENTS.md) for the full picture. Once every `unverified` issue is closed,
this cuts `1.0.0`.

Open work items, bugs, and unverified pieces are tracked as
[GitHub issues](https://github.com/Rumeasiyan/ui-design-lab/issues), not in a doc in this
repo.

## Documentation map

| Doc | What's in it |
|---|---|
| [`USAGE.md`](USAGE.md) | Step-by-step walkthrough of running a design session. |
| [`PROMPT_TEMPLATE.md`](PROMPT_TEMPLATE.md) | The Aesthetic / Reference / Intent / Guardrails prompt pattern, plus a worked example. |
| [`AGENTS.md`](AGENTS.md) | Conventions, hard constraints, and versioning policy — for human and AI contributors alike. |
| [`DECISIONS.md`](DECISIONS.md) | Load-bearing design decisions and the reasoning behind them. |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | How to set up, what a PR must satisfy. |
| [`CHANGELOG.md`](CHANGELOG.md) | What changed in each version. |
| [`SECURITY.md`](SECURITY.md) | How to report a vulnerability, and this repo's threat surface. |

## Contributing

Contributions are welcome — read [`CONTRIBUTING.md`](CONTRIBUTING.md) first, especially
the hard rules (tokens are the single source of truth; directions never blend; no
placeholder art). Open an issue before starting non-trivial work.

By participating you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © Rumeasiyan
