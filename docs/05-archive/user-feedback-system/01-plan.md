# Plan: 사용자 피드백 수렴 시스템 (User Feedback System)

## 1. 개요 (Overview)
- **목적:** 완성된 비교 보고서에 대한 사용자의 실제 반응을 수집하여 추천 알고리즘을 개선하고 서비스 만족도를 측정함.
- **대상:** 보고서를 열람한 기업 이전 결정권자 및 실무자.
- **핵심 가치:** 
  - 데이터 기반의 알고리즘 튜닝 (사용자가 선호하는 물건과 추천 결과 일치 여부 확인).
  - 유저 보이스 반영을 통한 서비스 고도화.

## 2. 주요 기능 (Core Features)
1. **추천 만족도 평가 (Rating System):**
   - "이 추천이 의사결정에 도움이 되었나요?" (5점 척도 또는 좋아요/싫어요).
   - 추천 결과와 본인의 생각이 다를 경우 사유 수집.
2. **정성적 피드백 수집 (Feedback Form):**
   - "추가로 보고 싶은 데이터가 있나요?"
   - "UI/UX에서 불편한 점은 무엇인가요?"
3. **행동 데이터 분석 (Usage Analytics):**
   - 어떤 비교 항목이 가장 많이 조회되었는지 트래킹.
   - 추천된 물건의 상세 보고서 클릭률(CTR) 측정.
4. **상담 연결 (Direct Contact):**
   - 보고서 하단에 "전문가에게 이 물건 문의하기" 버튼 배치.

## 3. 기술 스택 (Tech Stack)
- **Database:** Supabase (이미 연동된 `supabase.ts` 활용).
- **Frontend:** React Hook Form + Shadcn UI (피드백 모달).
- **Analytics:** PostHog 또는 간단한 자체 이벤트 로그.

## 4. 데이터 모델 (Schema)
- **Table:** `report_feedbacks`
  - `id`: UUID
  - `report_id`: 비교 보고서 ID
  - `rating`: number
  - `comment`: text
  - `selected_best_index`: 사용자가 실제로 선택한 물건 인덱스
  - `created_at`: timestamp

## 5. 성공 기준 (Success Metrics)
- 보고서 열람자 대비 피드백 참여율 10% 이상.
- 추천 결과 만족도 평균 4.0점 이상 달성.
- 수집된 피드백을 바탕으로 차기 알고리즘 업데이트 1회 이상 수행.
