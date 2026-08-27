/*
  ───────────────────────────────────────────────────────────────────────────────
  SAMPLE DIRECTION — DELETE BEFORE BUILDING YOUR PROJECT.

  Ships with the ui-design-lab template to show what a finished direction looks like.
  Remove every sample in one command:  node scripts/remove-samples.mjs
  ───────────────────────────────────────────────────────────────────────────────

  Aesthetic: soft — rounded surfaces, low contrast, airy spacing, sans throughout.
  This is the direction that exercises the motion tokens: hover lift is scaled by
  --reveal-distance and gated by --motion-on, so switching Motion off in the TweakBar
  genuinely stops it.
*/
const CARDS = [
  ['Today', '4 sessions', 'Two still need a summary.'],
  ['This week', '17 sessions', 'Up from eleven last week.'],
  ['Streak', '9 days', 'Longest run so far.'],
]

export default function SoftHome() {
  return (
    <div
      className="min-h-full p-[2em]"
      style={{
        background: 'var(--color-bg)',
        color: 'var(--color-fg)',
        fontFamily: 'var(--font-display)',
      }}
    >
      <p className="text-[0.85em]" style={{ color: 'var(--color-muted)' }}>
        Good afternoon
      </p>
      <h1 className="mt-[0.2em] text-[2.2em] font-medium leading-[1.15] tracking-[-0.01em]">
        Here&rsquo;s where things stand
      </h1>

      <div
        className="mt-[2em] grid md:grid-cols-3"
        style={{ gap: 'var(--gap)' }}
      >
        {CARDS.map(([label, value, note]) => (
          <div
            key={label}
            className="p-[1.4em] transition-transform hover:-translate-y-[calc(var(--reveal-distance)*0.15*var(--motion-on))]"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius)',
              transitionDuration: 'calc(var(--motion-duration) * 220ms)',
            }}
          >
            <div className="text-[0.8em]" style={{ color: 'var(--color-muted)' }}>
              {label}
            </div>
            <div className="mt-[0.3em] text-[1.9em] font-medium leading-none">{value}</div>
            <div className="mt-[0.7em] text-[0.85em] leading-[1.5]" style={{ color: 'var(--color-muted)' }}>
              {note}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-[var(--gap)] p-[1.6em]"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius)',
        }}
      >
        <h2 className="text-[1.1em] font-medium">Pick up where you left off</h2>
        <ul className="mt-[1em] flex flex-col" style={{ gap: 'calc(var(--gap) * 0.6)' }}>
          {['Onboarding flow — draft two', 'Pricing page — copy pass', 'Settings — empty states'].map(
            (item) => (
              <li
                key={item}
                className="flex items-center justify-between p-[0.9em] text-[0.9em]"
                style={{ background: 'var(--color-bg)', borderRadius: 'calc(var(--radius) * 0.75)' }}
              >
                <span>{item}</span>
                <span style={{ color: 'var(--color-accent)' }}>Resume</span>
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  )
}
