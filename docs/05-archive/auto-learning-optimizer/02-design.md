# Design: 피드백 기반 자동 학습 최적화 시스템 (Auto-Learning Optimizer)

> **요약**: 사용자의 선택 데이터를 분석하여 추천 알고리즘의 가중치를 자동으로 미세 조정하는 학습 엔진 설계
>
> **프로젝트**: building-report-pro
> **버전**: 1.0.0
> **작성자**: Gemini Agent
> **날짜**: 2026-02-10
> **상태**: Draft
> **계획 문서**: [auto-learning-optimizer.plan.md](../../01-plan/features/auto-learning-optimizer.plan.md)

---

## 1. 개요 (Overview)

### 1.1 설계 목표
- 사용자가 AI의 추천안 대신 다른 물건을 선택한 사례를 분석하여 시스템의 가중치(Weights)를 데이터 기반으로 최적화.
- 명시적인 가중치 조절 외에도, 집단 지성을 통한 '기본 가중치 프리셋'의 지능적 진화.
- 학습 과정의 안정성을 위해 급격한 변동을 제어하는 제약 조건 설계.

### 1.2 핵심 원칙
- **Delta Learning**: 개별 피드백은 가중치에 미세한 변화(Delta)만 주어 노이즈에 의한 왜곡 방지.
- **Preference Inference**: 사용자가 더 비싸지만 넓은 집을 선택했다면 '가격' 가중치를 낮추고 '면적' 가중치를 높이는 식으로 선호 추론.
- **Batch Processing**: 실시간 반영보다는 일정 주기(Batch) 또는 일정 수 이상의 데이터가 쌓였을 때 학습 수행.

---

## 2. 아키텍처 (Architecture)

### 2.1 학습 파이프라인
```
[Supabase: report_feedbacks] ──▶ [Data Loader] ──▶ [Discrepancy Analyzer]
                                                            │
                                                            ▼
[System Weights] ◀── [Weight Updater] ◀── [Optimization Engine (MSE/Gradient)]
```

---

## 3. 알고리즘 상세 설계 (Algorithm Logic)

### 3.1 오차 분석 (Discrepancy Analysis)
사용자가 AI 추천($B_{ai}$) 대신 물건 $B_{user}$를 선택한 경우:
1. 각 지표($m \in \{cost, area, parking, modernity\}$)에 대해 두 물건의 점수 차이 계산: $\Delta m = m(B_{user}) - m(B_{ai})$.
2. $\Delta m > 0$ 인 지표는 사용자가 더 중요하게 생각했을 가능성이 높은 항목임.
3. 해당 지표의 가중치($w_m$)를 강화 대상으로 분류.

### 3.2 가중치 업데이트 수식 (Update Rule)
$$w_{m, new} = w_{m, old} + \eta \cdot (\frac{m(B_{user}) - m(B_{ai})}{\sigma_m})$$
- $\eta$ (Learning Rate): 학습 속도 조절 (예: 0.01)
- $\sigma_m$: 지표별 표준 편차 (데이터 정규화용)
- 모든 가중치의 합이 1이 되도록 정규화(Softmax 또는 Linear Scaling) 수행.

---

## 4. 데이터 모델 (Data Model)

### 4.1 가중치 이력 테이블 (`weight_tuning_history`)
```sql
CREATE TABLE weight_tuning_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_type TEXT,               -- LEASE, PURCHASE
  prev_weights JSONB,              -- 변경 전 가중치
  new_weights JSONB,               -- 변경 후 가중치
  sample_count INTEGER,            -- 학습에 사용된 피드백 수
  improvement_rate FLOAT,          -- (예상) 정확도 개선율
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 5. 구현 단계 (Implementation Steps)

### 5.1 Step 1: 분석 API 개발 (`/api/admin/analyze-feedback`)
- `report_feedbacks`에서 `user_choice_index != ai_choice_index`인 데이터를 추출.
- 어떤 지표에서 역전 현상이 일어났는지 통계 산출.

### 5.2 Step 2: 최적화 엔진 구현
- 산출된 통계를 바탕으로 새로운 가중치 후보군 계산.
- 기존 가중치와 후보 가중치의 성능(일치율) 비교 시뮬레이션.

### 5.3 Step 3: 가중치 동적 적용
- `building-report-v2/route.ts`에서 기본 가중치를 DB 또는 캐시(Redis 등)에서 읽어오도록 수정.

---

## 6. 위험 관리 (Risk Management)

| 위험 요소 | 영향도 | 대응 방안 |
|:---:|:---:|:---|
| 특정 악성 유저의 피드백 편향 | 높음 | 별점 4점 이상인 양질의 피드백만 학습에 반영 |
| 가중치 발산 (Out of range) | 중간 | 가중치별 최소/최대 범위(0.05 ~ 0.8) 설정 및 정규화 강제 |
| 학습 데이터 부족 | 중간 | 최소 50건 이상의 '불일치 사례'가 쌓이기 전까지는 가중치 변경 유예 |
