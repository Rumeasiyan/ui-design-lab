# AGENTS.md

Working reference for AI agents (and new humans) in this repo. Read this before making
changes. `HANDOFF.md` is a separate, point-in-time punch list of unfinished work from the
scaffolding session — read it too, but this file is the durable one.

## What this project is

`design-template` is a reusable scaffold, cloned per UI/UX design project, for running
multiple aesthetic "directions" side-by-side with a live tweak bar for design tokens,
device-size preview frames, and scripted image/video generation. It is not itself a
client project — it's the harness other projects get built inside of. Stack: Vite +
React 19 + TypeScript + Tailwind v4 (`@tailwindcss/vite`).

Background/research trail lives outside this repo, in a separate personal-planning repo:
`~/external/life-os/goal-faceless-uiux-influencer/notes/`, particularly
`2026-08-17-ai-design-workflow-video.md` (original spec) and same-day follow-ups on
image/video-gen tooling decisions.

## Where to look

| Area | When you need it |
|---|---|
| `src/tokens.css` | Any visual value — colors, fonts, radius, gap, motion. Single source of design truth. |
| `src/directions/<id>/Page.tsx` | Adding/editing an aesthetic direction. |
| `src/lib/directions.ts` | Registering a new direction (id, number-key shortcut, lazy import). |
| `src/components/DirectionToggle.tsx` | Direction tab bar, number-key (1-9) and `G` grid-view shortcuts. |
| `src/components/DeviceFrame.tsx` | Mobile/tablet/desktop preview frame widths. |
| `src/components/TweakBar.tsx` | Live token tuning UI; `FIELDS` list must match `tokens.css`. |
| `scripts/imagegen.mjs` | Image generation via `codex exec` (ChatGPT Plus session, no API key). |
| `scripts/videogen/index.mjs` + `providers/*.mjs` | Video generation dispatcher + per-provider HTTP calls. |
| `HANDOFF.md` | Current unverified/unfinished-work punch list — check before assuming something works. |

## Working agreements

- No issue tracker configured (no git remote, no `gh`/`glab` CLI available). Work is
  tracked in this file, `HANDOFF.md`, and the decision log below — not in an external
  tracker. If a remote + tracker gets added later, revisit this section.
- Anything a future reader would need — an open question, a deferred fix, a discovered
  bug, a risky assumption — goes into `HANDOFF.md`'s punch list or a new decision-log
  entry at the moment it's found, not left only in conversation.
- Branch policy: commit directly to `master`. No remote, no PR host — feature branches
  would just be local ceremony.

## Constraints

- **`tokens.css` is the single source of design truth.** Every color/font/radius/spacing
  a direction uses must be a CSS custom property there, never hardcoded in a component.
  Why: the TweakBar and "Copy CSS" export only work if every visual value is a token.
  Enforced by convention only (no lint rule) — check by eye when reviewing a direction.
- **Each direction fully commits to its own aesthetic; never blend two directions in one
  component.** Why: the point of the harness is side-by-side comparison of distinct
  directions — blending defeats that. Enforced by convention (`src/lib/directions.ts`
  comment, `README.md`).
- **`VIDEO_GEN_PROVIDER` defaults to `manual` (no API call, no cost).** Why: explicit
  user decision — pay-per-use video APIs are opt-in per project, not on by default. Do
  not change the default. See `scripts/videogen/providers/manual.mjs`.
- **The three paid video providers (`replicate.mjs`, `openrouter.mjs`,
  `atlascloud.mjs`) are unverified guesses**, written from search-result summaries, not
  each provider's real API reference. Don't trust their request/response shapes without
  checking live docs first (`HANDOFF.md` has the doc links).
- **`.env` is gitignored; never commit real API keys.** `.env.example` documents the
  shape only.

## Commands

```bash
npm install       # install deps
npm run dev       # vite dev server
npm run build     # tsc -b && vite build
npm run lint      # oxlint (rules: react/rules-of-hooks=error, react/only-export-components=warn)
npm run preview   # preview a production build
```

No test suite exists yet.

## Conventions

- TypeScript + React function components, one direction per folder under
  `src/directions/<id>/Page.tsx`, lazy-loaded via `React.lazy` in
  `src/lib/directions.ts`.
- New tunable design values go in **both** `src/tokens.css` (as a custom property) and
  `TweakBar.tsx`'s `FIELDS` list — adding to only one breaks the tuning UI or the export.
- No commits yet, so no established commit-message style to follow. Use clear, imperative
  subject lines; body only when the "why" isn't obvious from the diff.

## Versioning

- Canonical source: `package.json` `version` field. No separate build number (this is a
  web app served/built via Vite, not a platform with its own build-number concept).
- Current version: `0.1.0` (bumped from `0.0.0` — pre-1.0, template is still stabilizing
  per `HANDOFF.md`'s open punch list).
- Update **per completed change** (not batched at release time), per semver:
  - Breaking change to the harness (e.g. token-shape change that breaks existing
    directions) → bump `MINOR` while pre-1.0 (see note below), reset `PATCH`.
  - New capability (new direction registry feature, new script, new provider wired up
    for real) → bump `MINOR`, reset `PATCH`.
  - Bug fix, doc fix with no behavior change is skipped, verified-provider fix, small
    tweak → bump `PATCH`.
  - Docs, comments, formatting, refactor with no user-visible behavior change → no
    version bump.
  - **Pre-1.0 note:** per semver, `0.x` releases may include breaking changes in `MINOR`
    bumps. Once the harness is verified end-to-end (`HANDOFF.md` list cleared), cut
    `1.0.0` and switch to standard `MAJOR`-for-breaking rules.
- No build-only artifacts are distributed from this repo (it's cloned, not published), so
  there's no build-number increment step.
- Log every version-affecting change in `CHANGELOG.md`.

## Workflow

1. Check `HANDOFF.md` for open items before starting; check this file's Constraints
   section for anything the change touches.
2. Make the change.
3. Determine whether it needs a version bump (see Versioning above); if so, update
   `package.json` and add a `CHANGELOG.md` entry.
4. If the change is a decision worth remembering later ("why is it like this?") —
   architecture choice, rejected alternative, resolved open question — add an entry to
   `DECISIONS.md`.
5. If the change resolves or adds an item to `HANDOFF.md`'s punch list, update that list.
6. Run `npm run build` and `npm run lint`; fix failures.
7. Commit directly to `master` with a clear message.
