# Design: 사용자 피드백 수렴 시스템 (User Feedback System)

> **요약**: 보고서 만족도 측정 및 알고리즘 개선을 위한 피드백 수집 시스템 설계
>
> **프로젝트**: building-report-pro
> **버전**: 0.1.0
> **작성자**: Gemini Agent
> **날짜**: 2026-02-10
> **상태**: Draft
> **계획 문서**: [user-feedback-system.plan.md](../../01-plan/features/user-feedback-system.plan.md)

---

## 1. 개요 (Overview)

### 1.1 설계 목표
- 비교 보고서 하단에 직관적인 피드백 UI 배치.
- Supabase를 활용한 피드백 데이터 영구 저장.
- 수집된 데이터를 바탕으로 추천 점수 알고리즘의 유효성 검증 기반 마련.

### 1.2 설계 원칙
- **Minimal Friction**: 사용자가 1~2초 내에 완료할 수 있는 간결한 설문 구조.
- **Contextual Awareness**: 어떤 보고서, 어떤 추천 결과에 대한 피드백인지 메타데이터 포함.
- **Actionable Data**: 단순 만족도를 넘어 '선호하는 물건 번호'를 수집하여 알고리즘 오차 분석.

---

## 2. 아키텍처 (Architecture)

### 2.1 데이터 흐름
1. 클라이언트: 보고서 하단 `FeedbackSection` 노출.
2. 사용자: 별점 선택 및 추가 의견 입력.
3. 클라이언트: `supabase.ts` 라이브러리를 통해 `report_feedbacks` 테이블에 직접 저장 (또는 API Route 경유).
4. 관리자: Supabase 대시보드 또는 별도 분석 페이지에서 피드백 확인.

---

## 3. 데이터 모델 (Data Model)

### 3.1 Database Schema (Supabase)

```sql
CREATE TABLE report_feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id TEXT NOT NULL,         -- 관련 보고서 식별자
  report_type TEXT,                -- LEASE, PURCHASE, INVEST
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  user_choice_index INTEGER,       -- 사용자가 실제로 가장 좋다고 생각한 물건 번호
  ai_choice_index INTEGER,         -- AI가 추천했던 물건 번호
  comment TEXT,                    -- 추가 의견
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 4. UI/UX 설계 (UI/UX Design)

### 4.1 컴포넌트 설계 (`FeedbackSection`)
- **Star Rating**: 5개의 별 아이콘으로 만족도 표시.
- **Choice Verification**: "사용자님도 [B 물건]이 가장 좋다고 생각하시나요?" 질문 및 선택지 제공.
- **Quick Tags**: 의견 입력을 돕는 빠른 태그 (예: "가격 데이터가 정확해요", "UI가 깔끔해요").

### 4.2 위치 및 노출 시점
- 비교 보고서 테이블 바로 하단에 배치하여 결과 확인 직후 피드백 유도.
- 피드백 제출 완료 시 "의견 감사합니다! 더 정확한 추천을 위해 노력하겠습니다." 메시지 노출.

---

## 5. API 명세 (필요 시)

### 5.1 `POST /api/feedback`
*클라이언트에서 Supabase SDK를 직접 사용하지 않을 경우를 대비한 명세*

**Request:**
```json
{
  "reportId": "uuid",
  "rating": 5,
  "userChoiceIndex": 1,
  "aiChoiceIndex": 1,
  "comment": "매우 정확합니다."
}
```

---

## 6. 구현 계획 (Implementation Plan)

1. **Step 1**: Supabase에 `report_feedbacks` 테이블 생성.
2. **Step 2**: `FeedbackSection` UI 컴포넌트 개발 (Tailwind CSS).
3. **Step 4**: 제출 로직 구현 및 데이터 저장 확인.
4. **Step 5**: 비교 보고서 페이지(`compare/page.tsx`) 하단에 컴포넌트 통합.
