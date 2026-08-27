import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export interface Screen {
  id: string
  label: string
  component: LazyExoticComponent<ComponentType>
}

export interface Direction {
  id: string
  key: string // number-key shortcut, e.g. "1" (shortcuts only go up to "9")
  label: string
  sub?: string
  /*
    Marks a direction that ships with the template as an example rather than being part of
    your project. The tab bar renders a SAMPLE badge for these, and
    `node scripts/remove-samples.mjs` deletes every one of them plus its registry entry.
    Never set this on a direction you actually intend to keep.
  */
  sample?: boolean
  screens: Screen[] // first entry is the default screen shown when the direction opens
}

/*
  Add one entry per direction (see PROMPT_TEMPLATE.md). Each direction is its own set of
  screens under src/directions/<id>/ — screens[0] is conventionally Page.tsx, additional
  screens live in src/directions/<id>/screens/<screenId>.tsx. Committed fully to its own
  aesthetic — do not blend directions inside one component. Use scripts/new-direction.mjs
  and scripts/new-screen.mjs instead of hand-editing this file.

  Keyboard: number keys select a direction, Left/Right cycle directions, Up/Down cycle the
  active direction's screens (see src/lib/useKeyboardNav.ts).

  ─────────────────────────────────────────────────────────────────────────────────────
  The three `sample: true` entries below are template examples. DELETE THEM before
  building your project:  node scripts/remove-samples.mjs
  ─────────────────────────────────────────────────────────────────────────────────────
*/
export const directions: Direction[] = [
  {
    id: 'sample-editorial',
    key: '1',
    label: 'Editorial',
    sub: 'Serif · Whitespace',
    sample: true,
    screens: [
      {
        id: 'home',
        label: 'Home',
        component: lazy(() => import('../directions/sample-editorial/Page')),
      },
      {
        id: 'article',
        label: 'Article',
        component: lazy(() => import('../directions/sample-editorial/screens/article')),
      },
      {
        id: 'index',
        label: 'Contents',
        component: lazy(() => import('../directions/sample-editorial/screens/index-list')),
      },
    ],
  },
  {
    id: 'sample-brutalist',
    key: '2',
    label: 'Brutalist',
    sub: 'Mono · Hard edges',
    sample: true,
    screens: [
      {
        id: 'home',
        label: 'Home',
        component: lazy(() => import('../directions/sample-brutalist/Page')),
      },
      {
        id: 'grid',
        label: 'Pipeline',
        component: lazy(() => import('../directions/sample-brutalist/screens/grid')),
      },
      {
        id: 'detail',
        label: 'Detail',
        component: lazy(() => import('../directions/sample-brutalist/screens/detail')),
      },
    ],
  },
  {
    id: 'sample-soft',
    key: '3',
    label: 'Soft',
    sub: 'Rounded · Airy',
    sample: true,
    screens: [
      {
        id: 'home',
        label: 'Home',
        component: lazy(() => import('../directions/sample-soft/Page')),
      },
      {
        id: 'profile',
        label: 'Profile',
        component: lazy(() => import('../directions/sample-soft/screens/profile')),
      },
      {
        id: 'settings',
        label: 'Settings',
        component: lazy(() => import('../directions/sample-soft/screens/settings')),
      },
    ],
  },
]
