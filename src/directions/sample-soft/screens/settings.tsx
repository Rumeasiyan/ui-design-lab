/*
  ───────────────────────────────────────────────────────────────────────────────
  SAMPLE SCREEN — DELETE BEFORE BUILDING YOUR PROJECT.
  Remove every sample in one command:  node scripts/remove-samples.mjs
  ───────────────────────────────────────────────────────────────────────────────
*/
const ROWS = [
  ['Autosave tuning sessions', 'Write TweakBar changes back to tokens.css', true],
  ['Show device frame shadow', 'Adds depth behind the preview', false],
  ['Reduce motion', 'Honour the system motion preference', true],
  ['Compact grid', 'Fit more directions in the grid view', false],
]

export default function SoftSettings() {
  return (
    <div
      className="min-h-full p-[2em]"
      style={{
        background: 'var(--color-bg)',
        color: 'var(--color-fg)',
        fontFamily: 'var(--font-display)',
      }}
    >
      <h1 className="text-[1.8em] font-medium leading-tight">Settings</h1>
      <p className="mt-[0.3em] text-[0.9em]" style={{ color: 'var(--color-muted)' }}>
        Preferences apply to every direction in this project.
      </p>

      <div
        className="mt-[1.8em] overflow-hidden"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius)',
        }}
      >
        {ROWS.map(([label, note, on], i) => (
          <div
            key={String(label)}
            className="flex items-center justify-between p-[1.2em]"
            style={{
              gap: 'var(--gap)',
              borderTop: i === 0 ? 'none' : '1px solid var(--color-border)',
            }}
          >
            <div>
              <div className="text-[0.95em]">{label}</div>
              <div className="mt-[0.2em] text-[0.8em]" style={{ color: 'var(--color-muted)' }}>
                {note}
              </div>
            </div>
            <div
              className="flex h-[1.5em] w-[2.6em] shrink-0 items-center p-[0.15em]"
              style={{
                borderRadius: '999px',
                background: on ? 'var(--color-accent)' : 'var(--color-border)',
                justifyContent: on ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                className="h-[1.2em] w-[1.2em]"
                style={{ borderRadius: '999px', background: 'var(--color-surface)' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
