/*
  ───────────────────────────────────────────────────────────────────────────────
  SAMPLE SCREEN — DELETE BEFORE BUILDING YOUR PROJECT.
  Remove every sample in one command:  node scripts/remove-samples.mjs
  ───────────────────────────────────────────────────────────────────────────────
*/
export default function EditorialArticle() {
  return (
    <article
      className="min-h-full px-[8%] py-[4em]"
      style={{ background: 'var(--color-bg)', color: 'var(--color-fg)' }}
    >
      <span
        className="text-[0.7em] uppercase tracking-[0.3em]"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
      >
        Essay — 12 min
      </span>

      <h1
        className="mt-[0.8em] max-w-[20ch] text-[3em]"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--weight-display)',
          letterSpacing: 'var(--tracking-display)',
          lineHeight: 'var(--leading-display)',
        }}
      >
        Type at rest
      </h1>

      <p
        className="mt-[1em] border-b pb-[1.5em] text-[0.8em] uppercase tracking-[0.2em]"
        style={{
          color: 'var(--color-muted)',
          borderColor: 'var(--color-border)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        By the editors
      </p>

      <div
        className="mt-[2em] text-[1.05em]"
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 'var(--weight-body)',
          letterSpacing: 'var(--tracking-body)',
          lineHeight: 'var(--leading-body)',
          maxWidth: 'var(--measure)',
        }}
      >
        <p>
          <span
            className="float-left mr-[0.08em] text-[3.4em] leading-[0.78]"
            style={{ color: 'var(--color-accent)' }}
          >
            R
          </span>
          eading speed became a metric the moment someone worked out how to measure it, and
          from then on the only acceptable direction was up. But a page is not a race, and
          the reader is not being timed.
        </p>
        <p className="mt-[1.2em]" style={{ color: 'var(--color-muted)' }}>
          The measure that matters is whether the reader arrives at the end still holding
          the argument they started with.
        </p>

        <blockquote
          className="my-[1.8em] pl-[1.2em] text-[1.4em]"
          style={{
            borderLeft: 'calc(var(--border-width) * 2) solid var(--color-accent)',
            fontFamily: 'var(--font-display)',
            lineHeight: 'var(--leading-display)',
          }}
        >
          A line length is a promise about how much attention you intend to ask for.
        </blockquote>

        <p style={{ color: 'var(--color-muted)' }}>
          Set the measure too wide and the eye loses the return sweep. Too narrow and the
          argument arrives in fragments. Neither failure shows up in a speed test.
        </p>
      </div>
    </article>
  )
}
