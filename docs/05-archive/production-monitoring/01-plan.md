# Plan: 운영 환경 모니터링 체계 구축 (Production Monitoring System)

## 1. 개요 (Overview)
- **목적:** 실제 운영 환경에서 발생하는 에러를 실시간으로 탐지하고, 사용자의 피드백 및 API 성능 데이터를 분석하여 지속적인 서비스 품질 향상 기반을 마련함.
- **배경:** 상용 배포 후에는 예측하지 못한 데이터(공공데이터 API 장애 등)나 사용자 행동에 의한 장애가 발생할 수 있으므로, 즉각적인 대응 체계가 필수적임.

## 2. 주요 모니터링 영역 (Monitoring Areas)

### 2.1 에러 및 가용성 (Error & Availability)
- **Runtime Errors:** 클라이언트/서버에서 발생하는 치명적 오류 트래킹.
- **API Health:** 국토부 API의 응답 성공률 및 지연 시간(Latency) 상시 감시.
- **Supabase Connectivity:** 데이터베이스 연결 상태 및 쿼리 성능 모니터링.

### 2.2 사용자 경험 및 만족도 (UX & Satisfaction)
- **Feedback Analysis:** `report_feedbacks` 테이블에 쌓이는 별점 및 코멘트 실시간 알림.
- **Feature Usage:** 비교 보고서 생성 횟수, PDF 다운로드 횟수 트래킹.
- **User Choice Alignment:** AI 추천 결과와 유저의 실제 선택 일치율 모니터링.

### 2.3 데이터 정확도 (Data Integrity)
- **Discrepancy Tracking:** 실거래가와 건축물대장 데이터 간의 불일치 사례 로깅.

## 3. 구축 전략 (Strategy)
1. **에러 트래킹 도입:** Sentry 또는 LogSnag와 같은 도구를 연동하여 실시간 에러 수집.
2. **알림 연동:** 치명적 에러 또는 낮은 만족도 피드백 발생 시 Slack/Discord로 즉시 알림.
3. **통합 대시보드:** Supabase의 분석(Analytics) 기능을 활용하여 핵심 지표 시각화.

## 4. 성공 기준 (Success Metrics)
- 치명적 장애 발생 후 인지까지의 시간(MTTD) 5분 이내.
- 주간 리포트를 통해 추천 엔진 오차율 10% 이하 유지 확인.
- 사용자 피드백 대응률 100% 달성.

## 5. 향후 계획
1. [ ] 모니터링 툴 선정 및 아키텍처 설계 (`production-monitoring.design.md`)
2. [ ] 에러 핸들링 로직 및 알림 훅 구현 (`Do`)
3. [ ] 모니터링 지표 검증 (`Check`)
