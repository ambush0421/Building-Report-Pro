# Plan: 추천 알고리즘 고도화 (Building Report V3)

## 1. 개요 (Overview)
- **목적:** 수집된 사용자 피드백(Rating, User Choice)을 분석하여 추천 엔진의 정확도를 높이고, 의사결정 근거를 더욱 정교화함.
- **배경:** 고정된 가중치(Fixed Weights) 기반의 V2 알고리즘에서 벗어나, 사용자의 선호도와 시장 상황을 반영하는 가변적 알고리즘으로 진화 필요.

## 2. 주요 개선 사항 (V3 Features)
1. **피드백 기반 가중치 튜닝 (Feedback-Driven Tuning):**
   - 사용자가 AI 추천과 다른 선택을 반복할 경우, 해당 항목(예: 가격보다 면적 선호)의 가중치를 자동 조정.
2. **다차원 비교 로직 강화 (Multi-dimensional Scoring):**
   - **가성비 Score:** 평당 단가뿐만 아니라 관리비 포함 실질 유지비 반영.
   - **인프라 Score:** 지하철역 거리, 주변 편의시설 등 입지 요건 가중치 추가.
   - **리스크 감점 고도화:** 단순 노후도가 아닌, 위반 사례 패턴에 따른 위험도 산출.
3. **상대적 우위 메시지 생성 (Comparative Reason Generation):**
   - "A 물건은 B 대비 월 50만원 저렴하지만, C 물건은 전용률이 15% 더 높습니다"와 같은 상대적 비교 문구 자동 생성.
4. **사용자 맞춤형 가중치 선택 (User-Adjustable Weights):**
   - 사용자가 "가격 중심", "환경 중심", "안정성 중심" 등 우선순위를 직접 선택할 수 있는 옵션 제공.

## 3. 기술 스택 및 데이터
- **Logic:** Node.js (Server Side Engine).
- **Data:** Supabase `report_feedbacks` 테이블 분석 데이터.
- **UI:** 가중치 조절 슬라이더 또는 프리셋 선택 UI (React).

## 4. 데이터 모델 확장
- `weighted_metrics`: 각 항목별 현재 적용 중인 가중치 값 저장.
- `recommendation_log`: AI 추천 결과와 사용자 피드백 간의 오차율(Loss) 기록.

## 5. 성공 기준 (Success Metrics)
- AI 추천 결과와 사용자 실제 선택 일치율(Accuracy) 90% 이상 달성.
- 추천 결과에 대한 사용자 평균 만족도 별점 4.5점 이상.
- "의사결정 근거가 충분하다"는 긍정 피드백 증가.
