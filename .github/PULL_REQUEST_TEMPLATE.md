## What & why

<!-- What changed, and the reason it needed changing. Link the issue: Closes #NN -->

## Checklist

- [ ] `pnpm lint` passes
- [ ] `pnpm build` passes
- [ ] Every new visual value is a custom property in `src/tokens.css` (nothing hardcoded
      in a component)
- [ ] Any new tunable value was added to **both** `tokens.css` and `TweakBar.tsx`'s
      `FIELDS` list
- [ ] No placeholder images / icons / stock art in a direction
- [ ] `package.json` version bumped + `CHANGELOG.md` entry added (if user-visible)
- [ ] `DECISIONS.md` entry added (if this is a decision a future reader would question)
