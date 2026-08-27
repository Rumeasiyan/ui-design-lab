# Directions

One folder per aesthetic direction. `Page.tsx` is the direction's default screen;
additional screens live in `screens/<screenId>.tsx`. Register everything in
`src/lib/directions.ts`.

<!-- SAMPLES:START -->
## The samples are not your project — delete them

`sample-editorial/`, `sample-brutalist/`, and `sample-soft/` ship with the template to
show what finished directions look like: three genuinely different aesthetics built from
the same token set, each with three screens. They are marked `sample: true` in the
registry, which is why the tab bar shows a **SAMPLE** badge on them.

Remove all three — folders and registry entries — and scaffold a blank `v1` in their
place:

```bash
node scripts/remove-samples.mjs
```

Do this **before** you start designing. Leaving a sample in the tab bar next to your real
work makes the side-by-side comparison meaningless, which is the whole point of the
harness.

<!-- SAMPLES:END -->

## Making your own

```bash
node scripts/new-direction.mjs v2 --label "V2" --sub "Short description"
node scripts/new-screen.mjs v2 detail --label "Detail"
```

Rules that apply to every direction (see [`../../AGENTS.md`](../../AGENTS.md)):

- Every color/font/radius/spacing value is a custom property from `src/tokens.css`. Never
  hardcode a visual value in a component — the TweakBar and its "Copy CSS" export only
  work if this holds.
- A direction never references a `--chrome-*` token. Those belong to the harness UI.
- Each direction fully commits to its own aesthetic. Never blend two in one component.
- **Real imagery is required, not optional.** No placeholders, no stock art, and no
  quietly avoiding images so none have to be sourced — a screen of pure type and boxes
  reads as machine-generated. Generate with `scripts/imagegen/index.mjs`.
- Size type in `em`, not `rem` or `px`, so the TweakBar's Font Scale slider moves it —
  `DeviceFrame` sets the preview's base font size from `--font-scale`.
- Both themes have to work. Toggle light/dark (the `D` key) before calling a direction
  done.
