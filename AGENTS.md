# AGENTS.md

## Mission
- Build a Mac desktop app where non-coders can configure AI agents and watch them act on a stage (game-like). Optimize for a 4-minute Hack Night demo.

## Demo commitments (Feb 20, 2026)
- Show the OpenClaw-based interface and explain what it does.
- Explain one feature that was guided by Jam MCP inside Codex.
- Play the Wan-generated video ad for the OpenClaw interface.

## Setup commands
- Install deps: `pnpm install`
- Start dev server: `pnpm dev`
- Run tests: `pnpm test`

## Code style
- TypeScript strict mode
- Single quotes, no semicolons
- Prefer functional patterns over classes/mutation

## Codex behavior
- Default sandbox: `workspace-write` with network enabled.
- Default approvals: `on-request` (only prompt when escalation is needed); escalate explicitly before using `danger-full-access`.
- Keep edits inside the repo; avoid touching `.git` metadata.

## Workflow expectations
- Use pnpm for scripts; avoid npm/yarn unless agreed.
- Before demo builds, run `pnpm test`.
- When adding repetitive flows, factor them into Skills; keep AGENTS.md in sync with any new conventions.

## Context to surface to Codex
- Project goal and demo commitments above.
- This AGENTS file for repo-aware guidelines.
- Config defaults in `.codex/config.toml`.
