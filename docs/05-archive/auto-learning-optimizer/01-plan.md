# Plan: 피드백 기반 자동 학습 최적화 시스템 (Auto-Learning Optimizer)

## 1. 개요 (Overview)
- **목적:** 사용자가 남긴 피드백 데이터(`report_feedbacks`)를 분석하여, AI 추천 엔진의 기본 가중치를 자동으로 조정하고 개인화된 추천 정확도를 높임.
- **배경:** 고정된 가중치는 개별 유저나 시장의 변화하는 선호를 반영하기 어려움. 시스템이 스스로 '어떤 지표가 의사결정에 더 큰 영향을 미치는지' 학습해야 함.

## 2. 주요 기능 (Core Features)
1. **피드백 데이터 분석 엔진 (Feedback Analyzer):**
   - AI 추천 물건과 사용자가 실제 선택한 물건의 차이(Gap) 분석.
   - 사용자가 선택한 물건이 AI 추천안보다 우월했던 지표(예: 가격은 비싸지만 역세권)를 식별.
2. **가중치 자동 튜닝 로직 (Weight Auto-Tuner):**
   - 집계된 오차 데이터를 바탕으로 시스템 전역(Global) 또는 유저별(Personal) 가중치 미세 조정.
   - 급격한 가중치 변화를 방지하기 위한 학습률(Learning Rate) 및 감쇠(Damping) 로직 적용.
3. **학습 현황 모니터링 (Optimizer Dashboard):**
   - 시간이 지남에 따라 AI-User 일치율(Accuracy)이 얼마나 개선되는지 시각화.
   - 현재 시스템이 중요하게 판단하는 항목 순위 변동 이력 확인.

## 3. 기술 스택 (Tech Stack)
- **Data:** Supabase SQL (Aggregations) & JSON Logs.
- **Logic:** Edge Functions 또는 Background Cron Jobs (Next.js API).
- **Metric:** MSE(Mean Squared Error) 기반의 추천 오차 측정.

## 4. 데이터 모델 확장
- `system_config`: 현재 학습된 최적 가중치 세트 저장.
- `weight_history`: 가중치 변동 이력 트래킹.

## 5. 성공 기준 (Success Metrics)
- 자동 학습 적용 전후 대비 AI 추천 동의율(User Agreement Rate) 15% 이상 상승.
- 사용자 피드백 별점 평균의 점진적 우상향 곡선 확인.
