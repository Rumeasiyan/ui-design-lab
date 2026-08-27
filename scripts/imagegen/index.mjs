#!/usr/bin/env node
/*
  Image-gen dispatcher. Reads IMAGE_GEN_PROVIDER from the environment (default: "codex" —
  wraps `codex exec`'s built-in image tool, billed against your existing ChatGPT Plus
  session, no separate API key).

  Images are not optional decoration in this harness. A direction built only from type and
  CSS boxes reads as machine-generated, which is exactly what a design review is meant to
  catch — so generate real assets rather than leaving a gap or a grey placeholder. See the
  "Assets" section of README.md.

  Usage:
    node scripts/imagegen/index.mjs "prompt text" [output/path.png] [--width 1024] [--height 1024]
    IMAGE_GEN_PROVIDER=local node scripts/imagegen/index.mjs "prompt" src/directions/v1/hero.png

  Providers:
    codex   (default) `codex exec` image tool — no API key, uses your codex login
    local   a self-hosted generation server over HTTP — set IMAGE_GEN_BASE_URL
    openai  the OpenAI Images API — set OPENAI_API_KEY
*/
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

import { generate as codex } from './providers/codex.mjs'
import { generate as local } from './providers/local.mjs'
import { generate as openai } from './providers/openai.mjs'

const PROVIDERS = { codex, local, openai }

const [, , prompt, ...rest] = process.argv
if (!prompt || prompt.startsWith('--')) {
  console.error(
    'Usage: node scripts/imagegen/index.mjs "prompt text" [output/path.png] [--width 1024] [--height 1024]',
  )
  process.exit(1)
}

function flag(name, fallback) {
  const i = rest.indexOf(`--${name}`)
  return i === -1 ? fallback : rest[i + 1]
}

/* Positional args are the ones that are neither a --flag nor a --flag's value. */
const positional = []
for (let i = 0; i < rest.length; i++) {
  if (rest[i].startsWith('--')) i++
  else positional.push(rest[i])
}

const output = resolve(positional[0] ?? `output/imagegen/${Date.now()}.png`)
mkdirSync(dirname(output), { recursive: true })

const providerName = (process.env.IMAGE_GEN_PROVIDER || 'codex').toLowerCase()
const provider = PROVIDERS[providerName]
if (!provider) {
  console.error(
    `Unknown IMAGE_GEN_PROVIDER "${providerName}". Options: ${Object.keys(PROVIDERS).join(', ')}`,
  )
  process.exit(1)
}

console.error(`[imagegen] provider: ${providerName}`)
console.error(`[imagegen] prompt:   ${prompt}`)
console.error(`[imagegen] output:   ${output}`)

let result
try {
  result = await provider({
    prompt,
    output,
    width: Number(flag('width', 1024)),
    height: Number(flag('height', 1024)),
  })
} catch (error) {
  /* A stack trace here is noise — the useful part is always the message (a missing key, an
     unreachable server, a rejected prompt). */
  console.error(`[imagegen] ${providerName} provider failed: ${error.message}`)
  process.exit(1)
}

console.log(JSON.stringify({ provider: providerName, ...result }, null, 2))
