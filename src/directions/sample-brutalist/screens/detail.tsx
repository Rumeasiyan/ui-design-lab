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
      className="min-h-full p-[1.5em] text-[0.9em] uppercase"
      style={{
        background: 'var(--color-bg)',
        color: 'var(--color-fg)',
        fontFamily: 'var(--font-mono)',
      }}
    >
      <div
        className="border-2 p-[1em]"
        style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
      >
        <span className="font-bold tracking-[0.15em]">WARN — OVER BUDGET BY 21MS</span>
      </div>

      <h1 className="mt-[0.8em] text-[2.6em] font-bold leading-[0.9]">NORMALISE</h1>

      <dl className="mt-[1.2em]">
        {SPEC.map(([k, v]) => (
          <div
            key={k}
            className="flex justify-between border-2 p-[0.7em]"
            style={{ borderColor: 'var(--color-fg)', marginBottom: '-2px' }}
          >
            <dt className="text-[0.75em] tracking-[0.15em]" style={{ color: 'var(--color-muted)' }}>
              {k}
            </dt>
            <dd className="font-bold">{v}</dd>
          </div>
        ))}
      </dl>

      <button
        className="mt-[1.2em] w-full border-2 p-[0.9em] font-bold tracking-[0.15em]"
        style={{
          borderColor: 'var(--color-fg)',
          background: 'var(--color-accent)',
          color: 'var(--color-bg)',
        }}
      >
        RERUN STAGE
      </button>
    </div>
  )
}
