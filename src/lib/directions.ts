import { lazy, type ComponentType, type LazyExoticComponent } from 'react'

export interface Direction {
  id: string
  key: string // number-key shortcut, e.g. "1"
  label: string
  sub?: string
  component: LazyExoticComponent<ComponentType>
}

/*
  Add one entry per direction (see notes/topics/theory.md — "worked example of the pattern").
  Each direction is its own component under src/directions/<id>/Page.tsx, committed fully to
  its own aesthetic — do not blend directions inside one component.
*/
export const directions: Direction[] = [
  {
    id: 'v1',
    key: '1',
    label: 'V1',
    sub: 'Example Direction',
    component: lazy(() => import('../directions/v1/Page')),
  },
]
