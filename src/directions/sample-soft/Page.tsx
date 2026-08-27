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
      className="min-h-full"
      style={{
        background: 'var(--color-bg)',
        color: 'var(--color-fg)',
        fontFamily: 'var(--font-body)',
        fontWeight: 'var(--weight-body)',
        letterSpacing: 'var(--tracking-body)',
        lineHeight: 'var(--leading-body)',
        padding: 'var(--pad)',
      }}
    >
      <p className="text-[0.85em]" style={{ color: 'var(--color-muted)' }}>
        Good afternoon
      </p>
      <h1 className="mt-[0.2em] text-[2.2em]" style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 'var(--weight-display)',
          letterSpacing: 'var(--tracking-display)',
          lineHeight: 'var(--leading-display)',
        }}
      >
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
              background: 'var(--color-elevated)',
              border: 'var(--border-width) solid var(--color-border)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow)',
              transitionDuration: 'calc(var(--motion-duration) * 220ms)',
              transitionTimingFunction: 'var(--motion-ease)',
            }}
          >
            <div className="text-[0.8em]" style={{ color: 'var(--color-muted)' }}>
              {label}
            </div>
            <div
              className="mt-[0.3em] text-[1.9em]"
              style={{ fontWeight: 'var(--weight-display)', lineHeight: 'var(--leading-display)' }}
            >
              {value}
            </div>
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
          border: 'var(--border-width) solid var(--color-border)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
        }}
      >
        <h2 className="text-[1.1em]" style={{ fontWeight: 'var(--weight-display)' }}>
          Pick up where you left off
        </h2>
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
