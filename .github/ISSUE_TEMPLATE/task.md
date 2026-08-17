---
name: Task
about: A work item to be picked up (self-contained — reader has not seen any prior conversation)
title: ""
labels: ""
assignees: Rumeasiyan
---

## What

State what this is, plainly. No "as discussed" — assume the reader has no other context.

## Why it matters

The concrete consequence of leaving this undone or unanswered.

## Where it surfaced

File paths / sections / commit, if applicable.

## Options (for decisions only, delete otherwise)

List realistic options, with a recommendation and the reasoning behind it.

## Safety/compliance check

- [ ] Touches `VIDEO_GEN_PROVIDER` paid-provider code (`replicate.mjs`, `openrouter.mjs`, `atlascloud.mjs`) — verify against live API docs, not search summaries (see `HANDOFF.md`).
- [ ] Touches `.env` / API keys — confirm nothing gets committed (`.env` is gitignored).
- [ ] Touches `tokens.css` shape — confirm `TweakBar.tsx`'s `FIELDS` list still matches.
