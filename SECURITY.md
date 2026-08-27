# Security Policy

## Supported versions

This is a pre-1.0 template repository, cloned per project rather than installed as a
dependency. Only the latest `master` is supported — there are no maintained release
branches.

## Reporting a vulnerability

**Do not open a public issue for a security problem.**

Report it privately via
[GitHub Security Advisories](https://github.com/Rumeasiyan/ui-design-lab/security/advisories/new).
Include what you found, how to reproduce it, and what an attacker could do with it.

Expect an initial response within 7 days.

## Scope notes

A few things worth knowing about this repo's threat surface:

- **`scripts/imagegen/index.mjs` shells out to the `codex` CLI**, and
  `scripts/videogen/` makes outbound HTTP calls to third-party video providers.
  Prompts you pass are sent to those services. Don't put secrets in a prompt.
- **The three paid video providers (`replicate`, `openrouter`, `atlascloud`) are
  unverified** against real API docs. Review the request shape before pointing them at a
  billed account.
- **`.env` is gitignored and must stay that way.** `.env.example` documents the shape
  only — never commit real keys. If you ever do, rotate the key first, then rewrite
  history.
