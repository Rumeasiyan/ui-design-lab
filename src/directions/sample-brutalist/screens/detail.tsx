/*
  ───────────────────────────────────────────────────────────────────────────────
  SAMPLE SCREEN — DELETE BEFORE BUILDING YOUR PROJECT.
  Remove every sample in one command:  node scripts/remove-samples.mjs
  ───────────────────────────────────────────────────────────────────────────────
*/
const SPEC = [
  ['STAGE', 'NORMALISE'],
  ['ID', 'A-03'],
  ['OWNER', 'PLATFORM'],
  ['STATE', 'WARN'],
  ['P95', '61MS'],
  ['BUDGET', '40MS'],
]

export default function BrutalistDetail() {
  return (
    <div
      className="min-h-full text-[0.9em] uppercase"
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
        className="p-[1em]"
        style={{ border: 'calc(var(--border-width) * 2) solid var(--color-accent)', color: 'var(--color-accent)' }}
      >
        <span className="tracking-[0.15em]">WARN — OVER BUDGET BY 21MS</span>
      </div>

      <h1
        className="mt-[0.8em] text-[2.6em]"
        style={{
          fontWeight: 'var(--weight-display)',
          lineHeight: 'var(--leading-display)',
          letterSpacing: 'var(--tracking-display)',
        }}
      >
        NORMALISE
      </h1>

      <dl className="mt-[1.2em]">
        {SPEC.map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between p-[0.7em]"
            style={{ border: 'calc(var(--border-width) * 2) solid var(--color-fg)', marginBottom: 'calc(var(--border-width) * -2)' }}
          >
            <dt className="text-[0.75em] tracking-[0.15em]" style={{ color: 'var(--color-muted)' }}>
              {k}
            </dt>
            <dd className="">{v}</dd>
          </div>
        ))}
      </dl>

      <button
        className="mt-[1.2em] w-full p-[0.9em] tracking-[0.15em]"
        style={{
          border: 'calc(var(--border-width) * 2) solid var(--color-fg)',
          background: 'var(--color-accent)',
          color: 'var(--color-bg)',
        }}
      >
        RERUN STAGE
      </button>
    </div>
  )
}
