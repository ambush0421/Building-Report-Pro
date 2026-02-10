# Design: 추천 알고리즘 고도화 (Building Report V3)

> **요약**: 사용자 피드백을 학습하여 개인화된 가중치를 적용하고, 다차원 비교 분석을 수행하는 지능형 추천 엔진 설계
>
> **프로젝트**: building-report-pro
> **버전**: 3.0.0
> **작성자**: Gemini Agent
> **날짜**: 2026-02-10
> **상태**: Draft
> **계획 문서**: [building-report-v3.plan.md](../../01-plan/features/building-report-v3.plan.md)

---

## 1. 개요 (Overview)

### 1.1 설계 목표
- **Feedback-Adaptive Weighting**: 수집된 피드백 데이터를 분석하여 가격, 면적, 신축도 등의 가중치를 자동 튜닝.
- **Dynamic Preference UI**: 사용자가 직접 자신의 중요도(Priorities)를 설정할 수 있는 인터페이스 제공.
- **NLP-style Reasoning**: 단순 수치 나열이 아닌, 물건 간의 상대적 강약점을 비교하는 문장형 근거 생성.

### 1.2 핵심 원칙
- **Transparency**: 왜 이 물건이 추천되었는지 적용된 가중치를 사용자에게 투명하게 공개.
- **Extensibility**: 지하철 거리, 상권 데이터 등 향후 추가될 지표를 손쉽게 통합할 수 있는 가변 스코어링 구조.
- **User Centric**: 시스템의 판단보다 사용자의 명시적 선호를 우선 적용.

---

## 2. 아키텍처 (Architecture)

### 2.1 지능형 추천 프로세스
```
[User Input] ─────┐
                  ▼
┌────────────────────────────────────────────────────────┐
│  Recommendation Engine V3                              │
│                                                        │
│  1. Weight Optimizer (Feedback Data → Adjusted Weights) │
│  2. Scoring Engine (Metrics * Weights)                 │
│  3. Reasoning Engine (Template-based NLP Generation)    │
└──────────────────────────┬─────────────────────────────┘
                           ▼
[Personalized Report] ◀────┘
```

---

## 3. 데이터 모델 (Data Model)

### 3.1 가중치 설정 (Weight Map)
```typescript
interface WeightMap {
  cost: number;        // 가격/절감액 (0.0 ~ 1.0)
  area: number;        // 면적/공간 (0.0 ~ 1.0)
  parking: number;     // 주차 편의 (0.0 ~ 1.0)
  modernity: number;   // 신축도/연식 (0.0 ~ 1.0)
  infrastructure: number; // 입지/인프라 (0.0 ~ 1.0)
}

// 기본값 (Default Presets)
const DEFAULTS: Record<string, WeightMap> = {
  ECONOMIC: { cost: 0.5, area: 0.2, parking: 0.1, modernity: 0.1, infrastructure: 0.1 },
  BALANCED: { cost: 0.3, area: 0.3, parking: 0.1, modernity: 0.1, infrastructure: 0.2 },
  PRESTIGE: { cost: 0.1, area: 0.3, parking: 0.2, modernity: 0.3, infrastructure: 0.1 }
};
```

---

## 4. 알고리즘 명세 (Algorithm Spec)

### 4.1 피드백 기반 가중치 조정 로직
- **Logic**: 사용자가 AI 추천(인덱스 A) 대신 다른 물건(인덱스 B)을 선택했을 때:
  - 인덱스 B가 A보다 우월한 지표(예: 면적이 더 넓음)를 찾아 해당 항목의 가중치를 미세 조정 (+0.05).
  - 해당 조정값은 `weighted_metrics` 테이블에 저장되어 다음 추천 시 반영됨.

### 4.2 상대적 우위 문구 생성 (Reasoning)
- **Pattern**: `[추천 물건]은 [비교 물건] 대비 [지표]가 [차이]만큼 우수합니다.`
- **Example**: "후보 1번은 후보 2번보다 월 임대료는 50만원 비싸지만, 주차 대수는 10대 더 많아 방문객이 많은 기업에 적합합니다."

---

## 5. UI/UX 상세 설계

### 5.1 가중치 조절 대시보드
- **Slider UI**: 가격 vs 면적 등 각 항목의 중요도를 슬라이더로 조절.
- **Real-time Preview**: 슬라이더 조절 시 추천 순위가 실시간으로 변하는 인터랙션 제공.

### 5.2 상세 비교 배너
- 추천 물건 상단에 "대표님의 선호도(가격 중시)에 따라 선정된 최적안입니다" 문구 노출.

---

## 6. 구현 계획 (Implementation Plan)

1. **Step 1**: API에 `weights` 파라미터 추가 및 스코어링 로직 고도화.
2. **Step 2**: Supabase 피드백 데이터를 취합하여 평균 선호 가중치를 산출하는 스크립트 작성.
3. **Step 3**: 비교 보고서 페이지에 '선호도 설정' 사이드바 또는 모달 UI 추가.
4. **Step 4**: 문장형 추천 사유 생성 로직(Reasoning Engine) 통합.
