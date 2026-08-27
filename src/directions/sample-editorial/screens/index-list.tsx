/*
  ───────────────────────────────────────────────────────────────────────────────
  SAMPLE SCREEN — DELETE BEFORE BUILDING YOUR PROJECT.
  Remove every sample in one command:  node scripts/remove-samples.mjs
  ───────────────────────────────────────────────────────────────────────────────
*/
const ENTRIES = [
  ['01', 'On restraint', 'Essay', '8 min'],
  ['02', 'Type at rest', 'Essay', '12 min'],
  ['03', 'The long form', 'Notes', '5 min'],
  ['04', 'Against the fold', 'Argument', '9 min'],
  ['05', 'Margins, literally', 'Studio', '4 min'],
]

export default function EditorialIndex() {
  return (
    <div
      className="min-h-full px-[8%] py-[4em]"
      style={{ background: 'var(--color-bg)', color: 'var(--color-fg)' }}
    >
      <h1
        className="text-[2.4em]"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--weight-display)',
          letterSpacing: 'var(--tracking-display)',
          lineHeight: 'var(--leading-display)',
        }}
      >
        Contents
      </h1>
      <p
        className="mt-[0.6em] text-[0.75em] uppercase tracking-[0.3em]"
        style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
      >
        Issue Four — Winter
      </p>

      <ul className="mt-[2.5em]">
        {ENTRIES.map(([num, title, kind, mins]) => (
          <li
            key={num}
            className="flex items-baseline gap-[1em] border-t py-[1.1em]"
            style={{ borderColor: 'var(--color-border)' }}
          >
            <span
              className="w-[2.5em] shrink-0 text-[0.75em] tracking-[0.2em]"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
            >
              {num}
            </span>
            <span className="flex-1 text-[1.3em]" style={{ fontFamily: 'var(--font-display)' }}>
              {title}
            </span>
            <span
              className="text-[0.7em] uppercase tracking-[0.2em]"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}
            >
              {kind} · {mins}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
