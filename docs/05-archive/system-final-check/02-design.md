# Design: 최종 성능 테스트 및 배포 가이드 상세 구조

> **요약**: 시스템의 기술적 안정성 검증 방법론 및 운영 환경 배포 상세 설계
>
> **계획 문서**: [system-final-check.plan.md](../../01-plan/features/system-final-check.plan.md)

---

## 1. 성능 테스트 설계 (Performance Test Design)

### 1.1 테스트 매트릭스
| 항목 | 측정 도구 | 목표치 | 비고 |
|:---|:---|:---|:---|
| API Latency | Network Tab / Logger | < 3.0s | 병렬 4개 물건 조회 기준 |
| Bundle Size | `next build` output | < 250KB (First Load) | 메인 대시보드 페이지 기준 |
| PDF Render | Performance.now() | < 2.0s | 5페이지 분량 리포트 기준 |
| Lighthouse Score | Chrome Lighthouse | Performance 90+ | 모바일/데스크톱 평균 |

---

## 2. 배포 가이드 구조 (Deployment Structure)

### 2.1 필수 환경 변수 (Environment Variables)
```bash
# Public (Client-side)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_API_URL=...

# Private (Server-side)
BUILDING_API_KEY=...  # 국토부 공공데이터 API 키
SUPABASE_SERVICE_ROLE_KEY=...
```

### 2.2 데이터베이스 마이그레이션 (Database)
- **Tables**: `reports`, `report_feedbacks`, `weight_tuning_history`
- **Security**: RLS(Row Level Security) 설정 가이드 포함.

---

## 3. 구현 단계 (Implementation Plan)

1. **Step 1**: 실제 개발 환경에서 API 및 렌더링 성능 실측 데이터 수집.
2. **Step 2**: 수집된 데이터를 바탕으로 분석 리포트(`analysis.md`) 작성.
3. **Step 3**: 프로젝트 루트에 `DEPLOYMENT.md` 또는 `docs/DEPLOYMENT.md` 독립 문서 생성.
4. **Step 4**: 최종 완료 보고서(`/pdca report`)로 마무리.
