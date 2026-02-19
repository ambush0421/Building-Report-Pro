# Project rules for Codex

- Default workflow: use PDCA via the `pdca` skill for non-trivial tasks.
- PDCA artifacts live under: docs/pdca/<feature>/ (plan/design/tasks/report).
- If requirements are ambiguous, ask clarifying questions before implementation.
- Always run relevant tests/lint before reporting completion.

## Default response style

- Use Korean as the primary language for status updates and final reports.
- When reporting completed work, use this structure by default:
  1) 짧은 작업 선언 (무엇을 하겠는지/했는지)
  2) 실행 로그 요약 (성공/실패 및 재시도 이유)
  3) 최종 정리 목록 (무엇이 정리/완료됐는지 번호 목록)
  4) `📊 bkit Feature Usage` 블록
  5) `💡 Recommended` 한 줄 제안 (예: `$pdca status`)
- Keep the tone operational and concise, similar to CLI maintenance logs.
- `📊 bkit Feature Usage` / `💡 Recommended`는 아래 형식을 기본 템플릿으로 고정한다:

```text
📊 bkit Feature Usage
Used: <tool-or-command>, <tool-or-command>
Not Used: <tool-or-command> (<reason>), <tool-or-command> (<reason>)
💡 Recommended: $<command> (<short-purpose>)
```

- 가능한 경우 Recommended에는 실제 실행 가능한 "$" 명령(`$pdca status`,`$pdca report <feature>` 등)을 우선 제시한다.
