/*
  ───────────────────────────────────────────────────────────────────────────────
  SAMPLE DIRECTION — DELETE BEFORE BUILDING YOUR PROJECT.

  Ships with the ui-design-lab template to show what a finished direction looks like.
  Remove every sample in one command:  node scripts/remove-samples.mjs
  ───────────────────────────────────────────────────────────────────────────────

  Aesthetic: editorial — the display serif at large sizes, hairline rules, generous
  whitespace, left-aligned, print-magazine rhythm.

  Every visual value below is a token. Sizes are in `em` so the Font Scale slider moves
  them; headings read --font-display / --weight-display / --tracking-display /
  --leading-display, body copy reads the --*-body equivalents and --measure.
*/
const display = {
  fontFamily: 'var(--font-display)',
  fontWeight: 'var(--weight-display)',
  letterSpacing: 'var(--tracking-display)',
  lineHeight: 'var(--leading-display)',
} as const

const body = {
  fontFamily: 'var(--font-body)',
  fontWeight: 'var(--weight-body)',
  letterSpacing: 'var(--tracking-body)',
  lineHeight: 'var(--leading-body)',
} as const

const meta = {
  fontFamily: 'var(--font-mono)',
  letterSpacing: 'var(--tracking-body)',
  color: 'var(--color-muted)',
} as const

const ITEMS = [
  ['01', 'On restraint', 'What a design says by leaving the space empty.'],
  ['02', 'Type at rest', 'Reading speed is not a performance metric.'],
  ['03', 'The long form', 'Why the scroll bar is an honest progress indicator.'],
]

export default function EditorialHome() {
  return (
    <div
      className="min-h-full"
      style={{ background: 'var(--color-bg)', color: 'var(--color-fg)', padding: 'var(--pad)' }}
    >
      <header
        className="flex items-baseline justify-between pb-[1em]"
        style={{ borderBottom: 'var(--border-width) solid var(--color-border)' }}
      >
        <span className="text-[0.7em] uppercase" style={{ ...meta, letterSpacing: '0.3em' }}>
          Margin — Issue Four
        </span>
        <span className="text-[0.7em] uppercase" style={{ ...meta, letterSpacing: '0.2em' }}>
          Winter
        </span>
      </header>

      <h1 className="mt-[1.2em] max-w-[16ch] text-[4em]" style={display}>
        The quiet argument for
        <span style={{ color: 'var(--color-accent)' }}> slower </span>
        interfaces
      </h1>

      <p
        className="mt-[1.5em] text-[1.15em]"
        style={{ ...body, color: 'var(--color-muted)', maxWidth: 'var(--measure)' }}
      >
        Every millisecond shaved off a transition is sold as a win. Some of them were doing
        work — telling you where a thing came from, and where it went.
      </p>

      <div
        className="mt-[3em] pt-[2em] md:grid-cols-3"
        style={{
          display: 'grid',
          gap: 'var(--gap)',
          borderTop: 'var(--border-width) solid var(--color-border)',
        }}
      >
        {ITEMS.map(([num, title, blurb]) => (
          <article key={num}>
            <span
              className="text-[0.7em]"
              style={{ ...meta, color: 'var(--color-accent)', letterSpacing: '0.2em' }}
            >
              {num}
            </span>
            <h2 className="mt-[0.4em] text-[1.5em]" style={{ ...display, lineHeight: 1.2 }}>
              {title}
            </h2>
            <p className="mt-[0.5em] text-[0.9em]" style={{ ...body, color: 'var(--color-muted)' }}>
              {blurb}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
