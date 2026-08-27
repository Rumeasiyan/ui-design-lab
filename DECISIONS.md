# Decisions

Append-only, newest first. Entry bar: something a competent person would later ask "why
is it like this?" about — architecture, dependency choices, resolved open questions,
reversals. Not routine implementation detail (that's visible in the code/diff already).

---

## 2026-08-27 — Rich token set, per-theme tuning, assets as a requirement

**Decision:** Expanded `tokens.css` to a full design system (palette, typography, shape,
depth, motion) with a TweakBar control for each; made colour tuning theme-aware; and
restated the asset rule as a positive requirement backed by pluggable image providers.

**Why:** The tuning surface exposed six values, none of them colour or typography — the two
things a direction actually lives or dies on. And the asset rule was phrased only as a
prohibition ("no placeholders"), which a direction can satisfy by having no imagery at all.
That loophole produces exactly the failure the harness exists to catch: a screen of pure
type and boxes that reads as machine-generated, where a reviewer cannot tell restraint from
emptiness.

**The per-theme trap, and why it forced a redesign of TweakBar's state:** the panel writes
to `document.documentElement.style`. Inline styles beat both `:root` and
`:root[data-theme='light']`, so once colours became tunable, a colour picked in light mode
would silently follow you into dark. Edits are now stored per theme, cleared and re-applied
on every theme flip, and exported as two blocks. Tokens that `tokens.css` defines in its
light block are marked `themed: true`; everything else stays shared. "Copy CSS" needs values
for the theme you are *not* looking at, which it gets by briefly flipping the theme
attribute at mount to read both sets of defaults — a synchronous style recalc, no paint, so
nothing flickers.

**One shared font token set vs. per-direction fonts:** a direction cannot own a private
face without breaking the single-source-of-truth rule, but Editorial wanting serif and
Brutalist wanting mono is a real conflict. Resolved by giving the shared set three faces —
`--font-display` (serif), `--font-body` (sans), `--font-mono` — and having each direction
differentiate by which one it leans on, plus weight, tracking and leading. `--font-serif`
was removed as redundant.

**Image providers:** split `imagegen.mjs` into a dispatcher plus `codex` / `local` /
`openai`, mirroring `videogen/`. `codex` stays the default because it costs nothing beyond
an existing subscription. `local` exists because a self-hosted generator has no marginal
cost, which removes the budget argument for skipping imagery — it was written against a
real API contract (`POST /api/generate` -> poll `GET /api/jobs/{id}` -> fetch
`/output?index=0`), not guessed, though it is still unverified end-to-end because no server
was running to test against (issue #13).

**Consequences:** directions carried over from 0.5.x still render, but any that referenced
`--font-serif` are broken and must move to `--font-display`. The local provider's base URL
lives only in `.env` — committing a host path to a public repo is the failure mode being
guarded against here.

**Refs:** issue #12, `src/tokens.css`, `src/components/TweakBar.tsx`,
`scripts/imagegen/`, `.env.example`.

---

## 2026-08-27 — Left screen rail, arrow-key nav, light theme, shipped samples

**Decision:** Four harness changes landed together because they share a surface: the
screen switcher moved from a horizontal bar under the tabs to a left sidebar driven by
`↑`/`↓`; `←`/`→` now cycle directions; a light/dark toggle sits in the top control bar;
and the template ships three sample directions (Editorial, Brutalist, Soft) marked
`sample: true`, removable with `scripts/remove-samples.mjs`.

**Why:** Requested. The screens bar read as a second row of tabs competing with the
direction tabs; as a left rail it's clearly subordinate, and a vertical list is what
`↑`/`↓` implies. Samples exist because an empty harness gives a new user nothing to judge
their first direction against — but a sample left in place ruins the comparison, so it is
marked three ways (registry flag, badge in the tab bar, header comment in every file) and
removable in one command.

**Consequences, and the things that forced themselves:**

- **All shortcuts had to centralise.** `DirectionToggle` owned a `keydown` listener;
  screens now need one too, and two listeners racing over the arrow keys is a bug waiting
  to happen. Everything lives in `src/lib/useKeyboardNav.ts`. The INPUT/TEXTAREA guard is
  load-bearing beyond text fields — TweakBar's sliders are `<input type="range">`, driven
  by the arrow keys, so without it nudging a slider would also change direction.
- **The harness chrome needed its own tokens.** Every bar and panel was styled with
  hardcoded `white/10`, `black/40`, etc. Invisible on a light background. Added a
  `--chrome-*` set, kept strictly separate from the `--color-*` set the directions use —
  otherwise tuning a direction would restyle the toolbar.
- **`--font-scale` was a slider wired to nothing.** No code read it. Rather than delete
  the control, `DeviceFrame` now sets the preview's base `font-size` from it, which makes
  `em` the required unit for type inside a direction — a `rem` resolves against the
  document root and would ignore it. The scale stops at the frame boundary on purpose, so
  the chrome never resizes with the design.

**Rejected alternatives:** Putting the theme toggle inside each direction (it would become
part of the design being judged, and every direction would have to implement it); scoping
`--font-scale` to the document root (would scale the toolbar too); a `sample/` top-level
folder instead of a registry flag (the flag lets the removal script find entries and
folders from one source, and survives a user renaming a folder).

**Refs:** issue #11, `src/lib/useKeyboardNav.ts`, `src/lib/theme.ts`, `src/tokens.css`,
`scripts/remove-samples.mjs`, `src/directions/README.md`.

---

## 2026-08-26 — Renamed to `ui-design-lab`, went public under MIT

**Decision:** Renamed the repo, the local working folder, and the package from
`design-template` to `ui-design-lab`; licensed it MIT; added the standard open-source
community files (`CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, bug/feature
issue templates, PR template); added a CI workflow running `pnpm lint` + `pnpm build`;
rewrote `README.md` around search and answer-engine discoverability; then flipped
visibility from private to public.

**Why:** `design-template` described the repo's *role in one person's workflow* (a thing
you clone), not *what it is* — it carried none of the terms someone would search for and
would be invisible on GitHub. `ui-design-lab` puts the actual subject in the name.
MIT over Apache-2.0 for the shortest, most recognized license for a scaffold people copy
rather than depend on. Community files and a green CI badge are what a stranger checks
before trusting an unknown repo; landing public without them reads as abandoned.

**Rejected alternatives:** `ai-design-directions` and `design-directions-kit` (more
precise, but "design directions" is a term of art with far less search volume than
"ui design"); `vibe-design-kit` (rides current trend traffic, ages badly); staying
private (defeats the point).

**Consequences:** `package.json` keeps `"private": true` despite the repo being public —
this is cloned, never `npm publish`ed, and the flag guards against an accidental publish.
The README now doubles as the marketing surface, so it has to stay honest about what is
unverified. Outside PRs are now possible, so `master` gets CI gating even though the
maintainer still commits directly.

**Refs:** issue #8, `README.md`, `LICENSE`, `CONTRIBUTING.md`, `.github/workflows/ci.yml`.

---

## 2026-08-17 — Multi-screen directions + direction filter

**Decision:** Changed `Direction` in `src/lib/directions.ts` from a single `component`
to a `screens: Screen[]` array (breaking change to the registry shape). Added
`ScreenNav` (shown when a direction has >1 screen), a filter input in `DirectionToggle`
(shown once there are >6 directions), and `scripts/new-screen.mjs` to scaffold
additional screens, mirroring `scripts/new-direction.mjs`.

**Why:** User question — the harness only supported one screen per direction (a landing
page), with no way to preview a multi-screen flow (onboarding, a dashboard with
sub-pages) or to navigate a large number of directions once the tab bar gets crowded.
Kept dependency-free (no router library) since this is a preview/comparison harness, not
a shipped app — screen switching is local `useState` in `App.tsx`, not URL-addressable.

**Consequences:** `v1`'s single screen is now `screens: [{ id: 'home', ... }]` instead of
a bare `component` — any direction created before this change needs its registry entry
updated to the new shape (only `v1` existed, already migrated). Number-key shortcuts
(1-9) still address *directions* only, not screens — with more than 9 directions some
won't have a shortcut, which was already true before this change (see
`scripts/new-direction.mjs`'s existing error for "no unused key left").

**Refs:** `src/lib/directions.ts`, `src/App.tsx`, `src/components/{DirectionToggle,ScreenNav}.tsx`,
`scripts/{new-direction,new-screen}.mjs`, issue #7.

---

## 2026-08-17 — No placeholder images/assets in directions

**Decision:** Added a hard constraint: a direction never ships with a placeholder
image, icon, or stock photo. If a design calls for an image, generate a real one via
`scripts/imagegen.mjs` (`codex exec`'s image tool) first.

**Why:** User feedback — the harness exists to let someone visually judge an aesthetic
direction. A gray box or generic stock photo can't be evaluated for feel, so leaving one
in defeats the entire point of the side-by-side comparison workflow.

**Consequences:** `AGENTS.md` Constraints, `README.md`'s image-generation section,
`USAGE.md` steps 3 and 6, and the scaffold stub generated by
`scripts/new-direction.mjs` all now say this explicitly. Enforced by convention only
(no lint rule) — check by eye when reviewing a direction, same as the `tokens.css` rule.

**Refs:** `AGENTS.md`, `README.md`, `USAGE.md`, `scripts/new-direction.mjs`,
`scripts/imagegen.mjs`.

---

## 2026-08-17 — Switch to pnpm, retire HANDOFF.md in favor of issues

**Decision:** Made the repo pnpm-only (`packageManager` field + `preinstall: npx
only-allow pnpm` guard, deleted `package-lock.json`, added `pnpm-lock.yaml`). Converted
`HANDOFF.md`'s open punch-list items into GitHub issues #1-5 and deleted the file.
Rewrote `README.md` to be accurate against current repo state and point at `AGENTS.md`/
issues instead of duplicating HANDOFF-style status.

**Why:** User preference for pnpm. `HANDOFF.md` was a point-in-time handoff note from
the scaffolding session — once a real issue tracker existed (see prior decision below),
keeping a second, manually-maintained open-items doc in parallel with issues would drift
out of sync with one of them silently. One source of truth for open work (issues) beats
two.

**Consequences:** Anyone reading old commit `eab4902`/`dc46c6f` history will still see
`HANDOFF.md` referenced — that's fine, it's a historical record. Going forward, open
work items are only in `gh issue list`, not in a repo file. `npm install` /
`yarn install` now hard-fail via the preinstall guard — contributors must have pnpm.

**Refs:** `package.json`, `pnpm-lock.yaml`, issues #1-#5, `README.md`, `AGENTS.md`.

---

## 2026-08-17 — Repo published, issues adopted as task tracker

**Decision:** Pushed repo to `github.com/Rumeasiyan/ui-design-lab`, adopted GitHub
issues as a task tracker (open before work, close on completion), added 3 labels
(`harness`, `video-provider`, `unverified`) beyond GitHub's defaults, added a task issue
template with a safety/compliance checklist.

**Why:** The earlier same-day decision to skip a tracker was conditional on no remote
existing yet ("Repo published..." decision below supersedes that condition once the
remote landed). Solo repo, so issues assign to `Rumeasiyan` by default rather than
requiring an assignment discussion per issue.

**Consequences:** `AGENTS.md`'s Working Agreements and Workflow sections now reference
issue numbers in commits/closes. `HANDOFF.md`'s punch list stays as-is (broader,
document-level) rather than being split into issues retroactively — new work items go to
issues going forward.

**Refs:** `AGENTS.md`, `.github/ISSUE_TEMPLATE/task.md`.

---

## 2026-08-17 — Agent docs, versioning, no tracker

**Decision:** Add `AGENTS.md` (+ `CLAUDE.md` shim) as the single source of agent-facing
repo conventions, start semantic versioning at `0.1.0` with per-change bumps, and skip
setting up an issue tracker.

**Why:** No git remote and no `gh`/`glab` CLI are configured in this repo, so there is no
host to create issues/labels against. Rather than invent a tracker workflow with nothing
behind it, open items stay in `HANDOFF.md` (existing punch list) and this log. Versioning
starts at `0.1.0` rather than staying at `0.0.0` because the harness is functional
(builds and typechecks clean per `HANDOFF.md`) even though several items are unverified
— `0.0.0` reads as "nothing works yet," which overstates how unfinished it is.

**Consequences:** If a remote + tracker (e.g. GitHub) gets added later, this decision
should be revisited — `AGENTS.md`'s Working Agreements section documents the tracker gap
so a future agent knows to check rather than assume issues exist.

**Refs:** `AGENTS.md`, `HANDOFF.md`.

---

## 2026-08-17 — Video generation off by default (`manual` provider)

**Decision:** `VIDEO_GEN_PROVIDER` defaults to `manual`, which composes a prompt and
calls no API, rather than defaulting to one of the three paid providers.

**Why:** Video generation providers are pay-per-use. Defaulting to a paid call would
mean cloning this template and running it could incur cost with no explicit opt-in.
`manual` mode instead prints the composed prompt for hand-pasting into Google Flow
(Veo), already covered by an existing AI Pro subscription's Flow credits — zero
marginal cost for the common case. Paid automation (`replicate`, `openrouter`,
`atlascloud`) is opt-in per project via `.env`.

**Consequences:** The three paid-provider implementations
(`scripts/videogen/providers/{replicate,openrouter,atlascloud}.mjs`) were written from
search-result summaries rather than each provider's live API reference, and are flagged
in `HANDOFF.md` as unverified — do not trust their request/response shapes without
checking real docs first.

**Refs:** `scripts/videogen/providers/manual.mjs`, `HANDOFF.md` item 3, `.env.example`.

---

## 2026-08-17 — Image generation via `codex exec`, not a direct API

**Decision:** `scripts/imagegen.mjs` wraps `codex exec`'s built-in image tool rather
than calling an image-gen API directly.

**Why:** Billed against an existing ChatGPT Plus subscription, no separate API key to
provision or leak. Confirmed working as a raw `codex exec` command in a throwaway
scratch dir in the scaffolding session.

**Consequences:** Requires the `codex` CLI installed and logged in (`codex login`).
The wrapper script itself was never run end-to-end before this session (only the raw
command was verified) — see `HANDOFF.md` item 2.

**Refs:** `scripts/imagegen.mjs`, `HANDOFF.md` item 2.

---

## 2026-08-17 — `tokens.css` as single design-truth source, direction isolation

**Decision:** Every visual value a direction uses is a CSS custom property in
`src/tokens.css`, never hardcoded in a component; each direction under
`src/directions/<id>/` fully commits to its own aesthetic and never blends with another
direction in one component.

**Why:** The harness's purpose is live side-by-side comparison and per-direction tuning
via the TweakBar. If values are hardcoded, the TweakBar can't tune them and "Copy CSS"
can't export a complete `:root` block. If directions blend, side-by-side comparison of
distinct aesthetics stops meaning anything.

**Consequences:** Adding a new tunable value requires updating two places in lockstep —
`tokens.css` and `TweakBar.tsx`'s `FIELDS` list — or the tuning UI and the token source
drift apart silently.

**Refs:** `src/tokens.css`, `src/components/TweakBar.tsx`, `src/lib/directions.ts`.
