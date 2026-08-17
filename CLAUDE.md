@AGENTS.md

Claude-specific: if you delegate to a subagent (Task tool), it does not inherit this
file — restate the relevant Constraints from `AGENTS.md` in the subagent prompt,
especially the `tokens.css`-as-single-source-of-truth rule and the `VIDEO_GEN_PROVIDER`
default-to-`manual` rule, since those are easy to violate by default instinct.
