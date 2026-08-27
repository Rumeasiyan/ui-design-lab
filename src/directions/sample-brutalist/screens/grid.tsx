/*
  ───────────────────────────────────────────────────────────────────────────────
  SAMPLE SCREEN — DELETE BEFORE BUILDING YOUR PROJECT.
  Remove every sample in one command:  node scripts/remove-samples.mjs
  ───────────────────────────────────────────────────────────────────────────────
*/
const ROWS = [
  ['A-01', 'INGEST', 'OK', '12ms'],
  ['A-02', 'PARSE', 'OK', '04ms'],
  ['A-03', 'NORMALISE', 'WARN', '61ms'],
  ['B-01', 'DISPATCH', 'OK', '09ms'],
  ['B-02', 'RETRY QUEUE', 'HOLD', '——'],
  ['C-01', 'ARCHIVE', 'OK', '31ms'],
]

export default function BrutalistGrid() {
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
      <h1
        className="text-[2em]"
        style={{
          fontWeight: 'var(--weight-display)',
          lineHeight: 'var(--leading-display)',
          letterSpacing: 'var(--tracking-display)',
        }}
      >
        PIPELINE
      </h1>

      <table className="mt-[1.2em] w-full border-collapse text-left">
        <thead>
          <tr style={{ color: 'var(--color-muted)' }}>
            {['ID', 'STAGE', 'STATE', 'T'].map((h) => (
              <th
                key={h}
                className="p-[0.6em] text-[0.7em] tracking-[0.15em]"
                style={{ border: 'calc(var(--border-width) * 2) solid var(--color-fg)' }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map(([id, stage, state, t]) => (
            <tr key={id}>
              <td className="p-[0.6em]" style={{ border: 'calc(var(--border-width) * 2) solid var(--color-fg)' }}>
                {id}
              </td>
              <td className="p-[0.6em]" style={{ border: 'calc(var(--border-width) * 2) solid var(--color-fg)' }}>
                {stage}
              </td>
              <td
                className="p-[0.6em]"
                style={{
                  border: 'calc(var(--border-width) * 2) solid var(--color-fg)',
                  color: state === 'OK' ? 'var(--color-muted)' : 'var(--color-accent)',
                }}
              >
                {state}
              </td>
              <td className="p-[0.6em]" style={{ border: 'calc(var(--border-width) * 2) solid var(--color-fg)' }}>
                {t}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
