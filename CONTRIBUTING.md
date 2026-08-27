# Contributing to UI Design Lab

Thanks for taking a look. This repo is a **template harness** — a scaffold you clone per
design project — so the most useful contributions keep it generic, small, and easy to
reason about.

## Before you start

- Read [`AGENTS.md`](AGENTS.md). It holds the working agreements, the hard constraints,
  and the versioning policy. It applies to humans and AI agents alike.
- Read [`DECISIONS.md`](DECISIONS.md) if you're about to change something that looks
  odd — it's probably deliberate, and the reasoning is recorded there.
- Check [open issues](https://github.com/Rumeasiyan/ui-design-lab/issues). Open one
  before starting non-trivial work so we don't duplicate effort.

## Setup

```bash
git clone https://github.com/Rumeasiyan/ui-design-lab.git
cd ui-design-lab
pnpm install
pnpm dev
```

**pnpm only.** `npm install` and `yarn install` are blocked by an `only-allow pnpm`
`preinstall` guard.

## The hard rules

These are the ones a PR will be sent back for:

1. **`src/tokens.css` is the single source of design truth.** Every color, font, radius,
   and spacing value a direction uses must be a CSS custom property there — never a
   hardcoded value in a component. The TweakBar and its "Copy CSS" export only work if
   this holds.
2. **A new tunable value goes in *both* `src/tokens.css` and `TweakBar.tsx`'s `FIELDS`
   list.** Adding it to only one breaks either the tuning UI or the export.
3. **Each direction fully commits to its own aesthetic — never blend two directions in
   one component.** Side-by-side comparison of distinct directions is the entire point.
4. **A direction must carry real generated imagery.** Not just "no placeholders" — a
   design that avoids imagery entirely so it never has to source any fails this too. A
   screen of pure type and boxes reads as machine-generated. Generate assets with
   `scripts/imagegen/index.mjs`; the `local` provider costs nothing per image.
5. **Size type in `em`, not `rem` or `px`.** `DeviceFrame` sets the preview's base font
   size from `--font-scale`; a `rem` resolves against the document root and ignores the
   Font Scale slider.
6. **Both themes must work.** Every color token needs a value in the
   `:root[data-theme='light']` block as well. Press `D` and check.
7. **Directions use `--color-*`; the harness UI uses `--chrome-*`.** Never cross them —
   otherwise tuning a direction restyles the toolbar.
8. **`VIDEO_GEN_PROVIDER` defaults to `manual`** — no API call, no cost. Don't change
   the default; paid video providers are opt-in per project.
9. **Never commit real API keys.** `.env` is gitignored; `.env.example` documents the
   shape only.

## Before you open a PR

```bash
pnpm lint
pnpm build
```

Both must pass — CI runs the same two commands.

If your change is user-visible, bump `version` in `package.json` and add a
`CHANGELOG.md` entry, following the semver rules in [`AGENTS.md`](AGENTS.md#versioning).
If it's a decision a future reader would ask "why is it like this?" about, add a
[`DECISIONS.md`](DECISIONS.md) entry.

## Commit messages

Clear, imperative subject lines. Body only when the "why" isn't obvious from the diff.
Reference the issue number when one exists.

## Reporting bugs & requesting features

Use the [issue templates](https://github.com/Rumeasiyan/ui-design-lab/issues/new/choose).
For anything security-related, see [`SECURITY.md`](SECURITY.md) — don't open a public
issue.
