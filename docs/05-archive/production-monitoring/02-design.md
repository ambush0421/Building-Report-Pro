# Design: 운영 환경 모니터링 및 알림 시스템 (Production Monitoring)

> **요약**: 실시간 에러 탐지, API 상태 점검 및 관리자 알림을 위한 통합 모니터링 아키텍처 설계
>
> **계획 문서**: [production-monitoring.plan.md](../../01-plan/features/production-monitoring.plan.md)

---

## 1. 아키텍처 (Architecture)

### 1.1 알림 파이프라인
```
[Application Error / Event] ──▶ [Logger (lib/logger.ts)]
                                      │
                                      ▼
[External Webhook] ◀────────── [Notification Dispatcher]
(Slack / Discord)
```

---

## 2. 컴포넌트 상세 설계

### 2.1 Logger 확장 (`lib/logger.ts`)
- **전략**: 기존 `logger.error` 호출 시 환경 변수에 설정된 `MONITORING_WEBHOOK_URL`이 존재하면 즉시 비동기로 알림 전송.
- **필터링**: `LogLevel === 'error'` 이거나 특정 핵심 이벤트(`event === 'user.feedback'`)일 때만 알림 트리거.

### 2.2 가용성 체크 API (`/api/health`)
- **목적**: 외부 모니터링 서비스(UptimeRobot 등)가 시스템의 생존 여부를 주기적으로 확인.
- **검증 항목**:
  - 서버 런타임 상태.
  - Supabase DB 연결성 확인.
  - 필수 환경 변수 누락 여부.

---

## 3. 알림 메시지 포맷 (Notification Format)

### 3.1 에러 알림 (Slack/Discord)
```json
{
  "username": "Building Report Monitor",
  "embeds": [{
    "title": "🚨 System Error Detected",
    "color": 15158332,
    "fields": [
      { "name": "Event", "value": "building_report.fatal_error" },
      { "name": "Timestamp", "value": "2026-02-10T14:30:00Z" },
      { "name": "Message", "value": "TypeError: fetch failed" }
    ]
  }]
}
```

---

## 4. 통합 대시보드 설계 (Supabase Analytics)

### 4.1 핵심 추적 지표 (KPIs)
- **API Success Rate**: 전체 API 호출 대비 성공(200 OK) 비율.
- **Average Latency**: 상위 5개 API의 응답 지연 시간 추이.
- **Top Errors**: 가장 빈번하게 발생하는 에러 패턴 TOP 5.
- **User Agreement**: AI 추천 결과에 대한 '동의' 버튼 클릭률.

---

## 5. 구현 단계 (Implementation Plan)

1. **Step 1**: `lib/logger.ts`에 Webhook 알림 발송 로직 추가.
2. **Step 2**: `/api/health` 엔드포인트 신설.
3. **Step 3**: 핵심 API 핸들러에 `performance.now()`를 활용한 성능 로깅 보강.
4. **Step 4**: (선택) Supabase SQL 기반의 커스텀 대시보드 쿼리 작성.
