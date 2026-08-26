# AGENTS.md

Working reference for AI agents (and new humans) in this repo. Read this before making
changes. Open work items live as GitHub issues (`gh issue list`), not in a doc.

## What this project is

`ui-design-lab` is a reusable scaffold, cloned per UI/UX design project, for running
multiple aesthetic "directions" side-by-side with a live tweak bar for design tokens,
device-size preview frames, and scripted image/video generation. It is not itself a
client project — it's the harness other projects get built inside of. Stack: Vite +
React 19 + TypeScript + Tailwind v4 (`@tailwindcss/vite`).

The original spec and the research trail behind the image/video-gen tooling choices live
in the maintainer's private planning notes, outside this repo. Everything load-bearing
that came out of them is recorded in `DECISIONS.md` — read that rather than hunting for
the notes.

## Where to look

| Area | When you need it |
|---|---|
| `src/tokens.css` | Any visual value — colors, fonts, radius, gap, motion. Single source of design truth. |
| `src/directions/<id>/Page.tsx` | A direction's default ("home") screen. |
| `src/directions/<id>/screens/<screenId>.tsx` | Additional screens within a direction. |
| `src/lib/directions.ts` | Registering a direction and its `screens` array (id, number-key shortcut, lazy imports). |
| `src/components/DirectionToggle.tsx` | Direction tab bar; number-key (1-9) and `G` grid-view shortcuts; filter input once there are >6 directions. |
| `src/components/ScreenNav.tsx` | Secondary nav bar for a direction's screens (only renders when a direction has >1 screen). |
| `src/components/DeviceFrame.tsx` | Mobile/tablet/desktop preview frame widths. |
| `src/components/TweakBar.tsx` | Live token tuning UI; `FIELDS` list must match `tokens.css`. |
| `PROMPT_TEMPLATE.md` | Starting a design session — the Aesthetic/Reference/Intent/Guardrails pattern + worked example. |
| `scripts/new-direction.mjs` | Scaffolding a new direction (folder + `Page.tsx` "home" screen + registry entry) in one command. |
| `scripts/new-screen.mjs` | Scaffolding an additional screen into an existing direction. |
| `scripts/imagegen.mjs` | Image generation via `codex exec` (ChatGPT Plus session, no API key). |
| `scripts/videogen/index.mjs` + `providers/*.mjs` | Video generation dispatcher + per-provider HTTP calls. |
| `USAGE.md` | Step-by-step walkthrough of running a design session (clone, tabs, tuning, generating assets). |
| `CONTRIBUTING.md` | What an outside contributor must satisfy before opening a PR (mirrors the Constraints below). |
| `.github/workflows/ci.yml` | CI: runs `pnpm lint` + `pnpm build` on every push/PR to `master`. |
| `gh issue list --label unverified` | Anything flagged as needing real-world verification before you trust it. |

## Working agreements

- Repo: `github.com/Rumeasiyan/ui-design-lab` — **public, MIT licensed, open to outside
  contributors.** `gh` CLI is authenticated as `Rumeasiyan`. Issues are used as a task tracker: open one before starting non-trivial
  work, assign to `Rumeasiyan` (solo repo — no one else to assign to), work, commit
  referencing the issue number, comment the outcome, close.
  - Closing comment states: what was built, what was verified, the resulting
    `package.json` version if it changed, and anything deliberately deferred (link the
    follow-up issue).
  - Skip an issue for trivial fixes with no ambiguity — typo, formatting, a one-line
    obviously-correct change. If you're explaining "why" to a future reader, it's not
    trivial.
  - Template: `.github/ISSUE_TEMPLATE/task.md`. Labels beyond GitHub's defaults:
    `harness` (core scaffold), `video-provider` (touches the unverified paid providers),
    `unverified` (needs real browser/API verification before trusted).
- Anything a future reader would need — an open question, a deferred fix, a discovered
  bug, a risky assumption — becomes an issue (or a `DECISIONS.md` entry for a resolved
  decision) at the moment it's found, not left only in conversation.
- Branch policy: the maintainer commits directly to `master` — feature branches for
  solo work would just be ceremony. Outside contributors fork and open a PR; CI
  (`pnpm lint` + `pnpm build`) must be green before merge.
- Public-repo hygiene: this repo is read by strangers. Keep `README.md` accurate to what
  actually works (an unverified feature is labeled unverified, not implied working), and
  never let a private path, key, or client name land in a commit.

## Constraints

- **`tokens.css` is the single source of design truth.** Every color/font/radius/spacing
  a direction uses must be a CSS custom property there, never hardcoded in a component.
  Why: the TweakBar and "Copy CSS" export only work if every visual value is a token.
  Enforced by convention only (no lint rule) — check by eye when reviewing a direction.
- **Each direction fully commits to its own aesthetic; never blend two directions in one
  component.** Why: the point of the harness is side-by-side comparison of distinct
  directions — blending defeats that. Enforced by convention (`src/lib/directions.ts`
  comment, `README.md`).
- **Never use placeholder images/icons/stock art in a direction.** If a direction's
  design calls for an image, generate a real one with `scripts/imagegen.mjs` (wraps
  `codex exec`'s image tool, billed against the ChatGPT Plus session) before calling the
  direction done. Why: a gray box or stock photo can't be judged for aesthetic feel —
  it defeats the point of a visual direction review. Enforced by convention only — check
  by eye when reviewing a direction.
- **`VIDEO_GEN_PROVIDER` defaults to `manual` (no API call, no cost).** Why: explicit
  user decision — pay-per-use video APIs are opt-in per project, not on by default. Do
  not change the default. See `scripts/videogen/providers/manual.mjs`.
- **The three paid video providers (`replicate.mjs`, `openrouter.mjs`,
  `atlascloud.mjs`) are unverified guesses**, written from search-result summaries, not
  each provider's real API reference. Don't trust their request/response shapes without
  checking live docs first — issue #3 has the doc links.
- **`.env` is gitignored; never commit real API keys.** `.env.example` documents the
  shape only. The repo is public — a committed key is a leaked key; rotate first, then
  rewrite history.

## Commands

```bash
pnpm install      # install deps (npm/yarn blocked by preinstall guard — pnpm only)
pnpm dev          # vite dev server
pnpm build        # tsc -b && vite build
pnpm lint         # oxlint (rules: react/rules-of-hooks=error, react/only-export-components=warn)
pnpm preview      # preview a production build
```

CI runs `pnpm install --frozen-lockfile`, `pnpm lint`, and `pnpm build` on every push and
PR to `master` (`.github/workflows/ci.yml`). Run the last two locally before pushing.

No test suite exists yet.

## Conventions

- TypeScript + React function components, one direction per folder under
  `src/directions/<id>/`. A direction has one or more screens (`Screen[]` in
  `src/lib/directions.ts`), each lazy-loaded via `React.lazy`; `screens[0]` is
  conventionally `Page.tsx`, additional screens live under `screens/<screenId>.tsx`.
- Number-key shortcuts (1-9) select a *direction*, not a screen — a direction's screens
  are navigated via `ScreenNav`, which only renders when it has more than one.
- New tunable design values go in **both** `src/tokens.css` (as a custom property) and
  `TweakBar.tsx`'s `FIELDS` list — adding to only one breaks the tuning UI or the export.
- Commit messages: clear, imperative subject lines; body only when the "why" isn't
  obvious from the diff. Reference the issue number when one exists.

## Versioning

- Canonical source: `package.json` `version` field. No separate build number (this is a
  web app served/built via Vite, not a platform with its own build-number concept).
- Current version: `0.4.0` (pre-1.0, template still stabilizing — see open `unverified`
  issues).
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
    bumps. Once the harness is verified end-to-end (all `unverified`-labeled issues
    closed), cut `1.0.0` and switch to standard `MAJOR`-for-breaking rules.
- No build-only artifacts are distributed from this repo (it's cloned, not published), so
  there's no build-number increment step.
- Log every version-affecting change in `CHANGELOG.md`.

## Workflow

1. Check open GitHub issues (`gh issue list`) before starting; check this file's
   Constraints section for anything the change touches.
2. If non-trivial, open an issue (or confirm one already exists) before starting.
3. Make the change.
4. Determine whether it needs a version bump (see Versioning above); if so, update
   `package.json` and add a `CHANGELOG.md` entry.
5. If the change is a decision worth remembering later ("why is it like this?") —
   architecture choice, rejected alternative, resolved open question — add an entry to
   `DECISIONS.md`.
6. Run `pnpm build` and `pnpm lint`; fix failures.
7. Commit directly to `master` referencing the issue number if one exists; comment the
   outcome on the issue and close it.
