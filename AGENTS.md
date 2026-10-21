<!-- codex-harness-kit:start -->
# AGENTS

## Codex Harness Workflow

1. Before changing code, read `docs/harness-config.json` first.
2. Then use the configured paths from that file instead of assuming fixed `docs/...` locations:
   - read `paths.stateFile`
   - read the active contract referenced by `currentContract` inside the state file
   - read `paths.decisionsFile`
   - read `paths.memoryFile`
   - use `paths.contractsDir` for contract discovery
3. Use the configured validation commands from `commands.verifyQuick` and `commands.verifyFull` when they are set.
4. Restore state before editing. Do not jump straight into implementation.
5. Keep the contract current. If scope or acceptance changes, update the contract before more code changes.
6. After edits, run the smallest meaningful verification command and record the result in the file pointed to by `paths.stateFile`.
7. If the same class of failure reaches the configured repeated-failure limit in `rules.maxRepeatedFailures`, stop trial-and-error and write a short diagnosis with evidence, suspected root cause, and the safest next move.
8. Capture durable context:
   - long-lived preferences and quirks go in `paths.memoryFile`
   - explicit trade-offs and architectural choices go in `paths.decisionsFile`
9. Final responses must always say:
   - what changed
   - what verification ran
   - what verification did not run

## Restore Prompt

When a new Codex thread starts, begin by reading the harness files above. A good prompt is:

> Restore state and continue from the harness files before making changes.

## Guardrails

- Prefer the existing repo layout over inventing a new framework.
- Keep this harness lightweight; do not turn it into a platform.
- If validation is not configured yet, say so explicitly instead of claiming full verification.
<!-- codex-harness-kit:end -->
