#!/usr/bin/env node
/*
  Wraps `codex exec`'s built-in image_gen tool (billed against your existing ChatGPT Plus
  session, no separate API key — see notes/2026-08-17-cli-subscription-image-gen.md in the
  goal-faceless-uiux-influencer repo for the research trail behind this choice).

  Usage:
    node scripts/imagegen.mjs "prompt text" [output/path.png]

  Requires: codex CLI installed and logged in (`codex login`), run from inside a directory
  codex is willing to write to (pass --skip-git-repo-check is handled automatically here).
*/
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

const [, , prompt, outputArg] = process.argv

if (!prompt) {
  console.error('Usage: node scripts/imagegen.mjs "prompt text" [output/path.png]')
  process.exit(1)
}

const output = resolve(outputArg ?? `output/imagegen/${Date.now()}.png`)
mkdirSync(dirname(output), { recursive: true })

const fullPrompt = `generate an image: ${prompt}\nSave the final result to exactly this path: ${output}`

console.error(`[imagegen] requesting: ${prompt}`)
console.error(`[imagegen] output: ${output}`)

execFileSync(
  'codex',
  ['exec', fullPrompt, '--sandbox', 'workspace-write', '--skip-git-repo-check'],
  { stdio: 'inherit' }
)

console.log(output)
