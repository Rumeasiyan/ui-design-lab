/*
  ───────────────────────────────────────────────────────────────────────────────
  SAMPLE SCREEN — DELETE BEFORE BUILDING YOUR PROJECT.
  Remove every sample in one command:  node scripts/remove-samples.mjs
  ───────────────────────────────────────────────────────────────────────────────
*/
export default function SoftProfile() {
  return (
    <div
      className="min-h-full p-[2em]"
      style={{
        background: 'var(--color-bg)',
        color: 'var(--color-fg)',
        fontFamily: 'var(--font-display)',
      }}
    >
      <div
        className="flex items-center p-[1.6em]"
        style={{
          gap: 'var(--gap)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius)',
        }}
      >
        <div
          className="flex h-[3.4em] w-[3.4em] shrink-0 items-center justify-center text-[1.2em] font-medium"
          style={{
            borderRadius: 'calc(var(--radius) * 2)',
            background: 'var(--color-accent)',
            color: 'var(--color-bg)',
          }}
        >
          AR
        </div>
        <div>
          <h1 className="text-[1.5em] font-medium leading-tight">Avery Reed</h1>
          <p className="mt-[0.2em] text-[0.85em]" style={{ color: 'var(--color-muted)' }}>
            Product designer · Joined March
          </p>
        </div>
      </div>

      <div className="mt-[var(--gap)] grid md:grid-cols-2" style={{ gap: 'var(--gap)' }}>
        {[
          ['Projects', '12'],
          ['Directions explored', '41'],
          ['Sessions', '86'],
          ['Tokens tuned', '230'],
        ].map(([label, value]) => (
          <div
            key={label}
            className="p-[1.2em]"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
            }}
          >
            <div className="text-[0.8em]" style={{ color: 'var(--color-muted)' }}>
              {label}
            </div>
            <div className="mt-[0.2em] text-[1.6em] font-medium leading-none">{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
