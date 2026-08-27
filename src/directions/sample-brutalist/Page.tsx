/*
  ───────────────────────────────────────────────────────────────────────────────
  SAMPLE DIRECTION — DELETE BEFORE BUILDING YOUR PROJECT.

  Ships with the ui-design-lab template to show what a finished direction looks like.
  Remove every sample in one command:  node scripts/remove-samples.mjs
  ───────────────────────────────────────────────────────────────────────────────

  Aesthetic: brutalist — monospace everywhere, hard 1px borders, no soft corners
  (--radius is deliberately ignored in favour of square edges), dense grid, uppercase.
*/
export default function BrutalistHome() {
  return (
    <div
      className="min-h-full text-[0.9em]"
      style={{
        background: 'var(--color-bg)',
        color: 'var(--color-fg)',
        fontFamily: 'var(--font-mono)',
        fontWeight: 'var(--weight-body)',
        lineHeight: 'var(--leading-body)',
        letterSpacing: 'var(--tracking-body)',
        padding: 'var(--pad)',
      }}
    >
      <div
        className="flex items-center justify-between px-[1em] py-[0.6em] uppercase"
        style={{ border: 'calc(var(--border-width) * 2) solid var(--color-fg)' }}
      >
        <span className="tracking-[0.1em]">SYSTEM / OUTPUT</span>
        <span style={{ color: 'var(--color-accent)' }}>● LIVE</span>
      </div>

      <h1
        className="mt-[0.8em] break-words text-[3.6em] uppercase"
        style={{
          fontWeight: 'var(--weight-display)',
          lineHeight: 'var(--leading-display)',
          letterSpacing: 'var(--tracking-display)',
        }}
      >
        BUILD
        <br />
        <span style={{ color: 'var(--color-accent)' }}>LOUD</span>
        <br />
        THINGS
      </h1>

      <div className="mt-[1.2em] grid grid-cols-2 md:grid-cols-4">
        {[
          ['THROUGHPUT', '1.24M'],
          ['LATENCY', '08MS'],
          ['ERRORS', '000'],
          ['UPTIME', '99.99%'],
        ].map(([label, value]) => (
          <div
            key={label}
            className="p-[0.8em] uppercase"
            style={{ border: 'calc(var(--border-width) * 2) solid var(--color-fg)', marginRight: 'calc(var(--border-width) * -2)', marginBottom: 'calc(var(--border-width) * -2)' }}
          >
            <div className="text-[0.7em] tracking-[0.15em]" style={{ color: 'var(--color-muted)' }}>
              {label}
            </div>
            <div className="mt-[0.3em] text-[1.6em] leading-none">{value}</div>
          </div>
        ))}
      </div>

      <div
        className="mt-[1.2em] p-[1em]"
        style={{ border: 'calc(var(--border-width) * 2) solid var(--color-fg)', background: 'var(--color-surface)' }}
      >
        <p className="uppercase leading-[1.7]">
          NO GRADIENTS. NO SHADOWS. NO APOLOGIES.
          <br />
          <span style={{ color: 'var(--color-muted)' }}>
            EVERY EDGE IS A DECISION AND EVERY DECISION IS VISIBLE.
          </span>
        </p>
      </div>
    </div>
  )
}
