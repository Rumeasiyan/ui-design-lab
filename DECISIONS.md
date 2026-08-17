# Decisions

Append-only, newest first. Entry bar: something a competent person would later ask "why
is it like this?" about — architecture, dependency choices, resolved open questions,
reversals. Not routine implementation detail (that's visible in the code/diff already).

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

**Decision:** Pushed repo to `github.com/Rumeasiyan/design-template`, adopted GitHub
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
