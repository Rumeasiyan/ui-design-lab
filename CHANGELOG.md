# Changelog

Format: version, date, then what changed and why (link a `DECISIONS.md` entry when one
exists). Newest first.

## 0.2.0 — 2026-08-17

- Switched to pnpm (`packageManager` field, `preinstall` guard blocking npm/yarn,
  `pnpm-lock.yaml` replacing `package-lock.json`). Deleted `HANDOFF.md`, moved its open
  items to GitHub issues #1-#5. Rewrote `README.md` for accuracy. See `DECISIONS.md`
  2026-08-17 "Switch to pnpm, retire HANDOFF.md in favor of issues".

## 0.1.0 — 2026-08-17

- Added `AGENTS.md`, `CLAUDE.md` shim, `DECISIONS.md`, this changelog, and versioning
  conventions. No functional app code changed. Bumped from `0.0.0` because the harness
  is functional (builds/typechecks clean) even though `HANDOFF.md` lists unverified
  items — see `DECISIONS.md` 2026-08-17 "Agent docs, versioning, no tracker".
