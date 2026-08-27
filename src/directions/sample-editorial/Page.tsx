/*
  ───────────────────────────────────────────────────────────────────────────────
  SAMPLE DIRECTION — DELETE BEFORE BUILDING YOUR PROJECT.

  Ships with the ui-design-lab template to show what a finished direction looks like.
  Remove every sample in one command:  node scripts/remove-samples.mjs
  ───────────────────────────────────────────────────────────────────────────────

  Aesthetic: editorial — serif display type, hairline rules, generous whitespace,
  left-aligned, print-magazine rhythm. Sizes are in `em` so the TweakBar's Font Scale
  slider actually moves them.
*/
export default function EditorialHome() {
  return (
    <div
      className="min-h-full px-[8%] py-[4em]"
      style={{ background: 'var(--color-bg)', color: 'var(--color-fg)' }}
    >
      <header
        className="flex items-baseline justify-between border-b pb-[1em]"
        style={{ borderColor: 'var(--color-border)' }}
      >
        <span
          className="text-[0.7em] uppercase tracking-[0.3em]"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Margin — Issue Four
        </span>
        <span
          className="text-[0.7em] uppercase tracking-[0.2em]"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
        >
          Winter
        </span>
      </header>

      <h1
        className="mt-[1.2em] max-w-[16ch] text-[4em] leading-[0.95] tracking-[-0.02em]"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        The quiet argument for
        <span style={{ color: 'var(--color-accent)' }}> slower </span>
        interfaces
      </h1>

      <p
        className="mt-[1.5em] max-w-[42ch] text-[1.15em] leading-[1.6]"
        style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-muted)' }}
      >
        Every millisecond shaved off a transition is sold as a win. Some of them were doing
        work — telling you where a thing came from, and where it went.
      </p>

      <div
        className="mt-[3em] grid gap-[var(--gap)] border-t pt-[2em] md:grid-cols-3"
        style={{ borderColor: 'var(--color-border)' }}
      >
        {[
          ['01', 'On restraint', 'What a design says by leaving the space empty.'],
          ['02', 'Type at rest', 'Reading speed is not a performance metric.'],
          ['03', 'The long form', 'Why the scroll bar is an honest progress indicator.'],
        ].map(([num, title, blurb]) => (
          <article key={num}>
            <span
              className="text-[0.7em] tracking-[0.2em]"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
            >
              {num}
            </span>
            <h2 className="mt-[0.4em] text-[1.5em] leading-[1.2]" style={{ fontFamily: 'var(--font-serif)' }}>
              {title}
            </h2>
            <p
              className="mt-[0.5em] text-[0.9em] leading-[1.6]"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-serif)' }}
            >
              {blurb}
            </p>
          </article>
        ))}
      </div>
    </div>
  )
}
