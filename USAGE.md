# Usage

How to actually run a design session with this template, screen by screen. For repo
structure/conventions see `README.md`; for contributor rules see `AGENTS.md`.

## 1. Clone for a new project

This repo is meant to be cloned per project, not built on top of directly.

```bash
git clone https://github.com/Rumeasiyan/design-template.git my-project
cd my-project
rm -rf .git && git init   # detach from this repo's history
pnpm install
pnpm dev
```

Open the URL Vite prints (default `http://localhost:5173`).

## 2. What you're looking at

The app (`src/App.tsx`) is one screen with three parts:

- **Top tab bar** (`DirectionToggle`) — one tab per registered direction. Click a tab,
  or press its number key (`1`-`9`), to view that direction full-screen. Press `G` (or
  click "All N") to switch to a grid showing every direction at once, side-by-side.
- **Center pane** (`DeviceFrame`) — renders the active direction's `Page.tsx` inside a
  frame at mobile (390px), tablet (834px), or desktop (100%) width. Switch width with
  the mobile/tablet/desktop buttons top-right.
- **Right sidebar** (`TweakBar`) — sliders/toggles for the tunable CSS custom
  properties in `src/tokens.css`: radius, gap, font scale, motion on/off, motion
  duration, reveal distance. These edit the live `:root` styles in the browser, so
  changes apply instantly to whichever direction is showing — nothing is saved until
  you use "Copy CSS".

Grid view has no TweakBar/device-frame controls — it's for comparing directions at a
glance, not tuning.

## 3. Prompting for a direction

Each direction is a self-contained page. When prompting an AI agent (or building by
hand) to create one, the two rules that make the harness work are:

1. **Every visual value binds to a `var(--token-name)` from `src/tokens.css`.** Don't
   hardcode a hex color, a border-radius, a font — add a CSS custom property to
   `tokens.css` and reference it. If the TweakBar or "Copy CSS" needs to touch a value
   that isn't a token yet, add it to `tokens.css` **and** to `TweakBar.tsx`'s `FIELDS`
   array — both, or the slider and the export drift out of sync silently.
2. **Each direction commits fully to one aesthetic.** Don't blend two visual languages
   in a single `Page.tsx` — the whole point of side-by-side comparison is that each tab
   is a distinct, coherent bet.

`src/directions/v1/Page.tsx` is the placeholder — replace its contents, it's not meant
to ship as-is.

## 4. Adding a new direction

```bash
mkdir src/directions/v2
```

Create `src/directions/v2/Page.tsx` (default-export a component, same pattern as `v1`).
Register it in `src/lib/directions.ts`:

```ts
{
  id: 'v2',
  key: '2',           // number-key shortcut
  label: 'V2',
  sub: 'Short description',
  component: lazy(() => import('../directions/v2/Page')),
}
```

It appears in the tab bar and grid view automatically — no other wiring needed.

## 5. Tuning by eye

With a direction open (not grid view):

1. Drag TweakBar sliders / flip toggles — the page updates live.
2. When it looks right, click **Copy CSS**. This copies a `:root { ... }` block with
   the current values of every tunable token to your clipboard.
3. Paste that block over the equivalent properties in `src/tokens.css` to make the
   tuning permanent (the TweakBar only edits the live DOM — a page refresh reverts to
   whatever `tokens.css` says).
4. **Reset** reverts the TweakBar (and the live page) back to `tokens.css`'s values,
   discarding un-copied tuning.

## 6. Generating supporting assets

Image and video generation are optional, invoked from the CLI, not the browser UI —
see `README.md`'s "Image generation" / "Video generation" sections for commands and
current verification status.

## 7. Wrapping up a session

There's no "export the whole app" step — a direction's `Page.tsx` plus the relevant
slice of `tokens.css` *is* the deliverable. Once a direction is settled:

- Make sure its final tuning has been copied into `tokens.css` (step 5).
- Hand off / reuse `Page.tsx` and the token values directly in the target project.

## Keyboard reference

| Key | Action |
|---|---|
| `1`-`9` | Jump to the direction registered with that key |
| `G` | Toggle all-directions grid view |

Shortcuts are disabled while focus is inside a text input/textarea.
