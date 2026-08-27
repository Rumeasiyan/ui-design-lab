/*
  Default provider. Wraps `codex exec`'s built-in image tool — billed against your existing
  ChatGPT Plus session, so no separate API key and no per-image charge. See DECISIONS.md for
  why this rather than a paid image API.

  Requires: the `codex` CLI installed and logged in (`codex login`).
*/
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'

export async function generate({ prompt, output, width, height }) {
  const fullPrompt = [
    `generate an image: ${prompt}`,
    `Dimensions: ${width}x${height}.`,
    `Save the final result to exactly this path: ${output}`,
  ].join('\n')

  execFileSync('codex', ['exec', fullPrompt, '--sandbox', 'workspace-write', '--skip-git-repo-check'], {
    stdio: 'inherit',
  })

  if (!existsSync(output)) {
    throw new Error(`codex reported success but ${output} does not exist — check the codex output above.`)
  }

  return { path: output }
}
