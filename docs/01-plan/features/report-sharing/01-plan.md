# Report Link Sharing Plan Document

> Version: 1.0.0 | Created: 2026-02-14 | Status: Draft

## 1. Executive Summary
분석된 부동산 보고서를 고유한 URL 링크를 통해 타인과 공유할 수 있는 기능을 제공합니다. 이를 통해 협업 효율성을 높이고 서비스의 바이럴 확산을 유도합니다.

## 2. Goals and Objectives
- **공유 편의성**: 복잡한 파일 전송 없이 URL 복사만으로 분석 결과 공유.
- **접근성 확대**: 수신자가 별도의 로그인 없이도 보고서를 열람할 수 있는 환경 제공 (선택적).
- **브랜딩**: 소셜 미디어(카카오톡, 슬랙 등) 공유 시 미리보기(OG Tag)를 통해 전문적인 분석 리포트 이미지 노출.

## 3. Scope
### In Scope
- **공유 링크 생성**: 저장된 보고서 ID 기반의 고유 URL(`https://domain/share/[id]`) 생성.
- **읽기 전용 페이지**: 공유 전용 경로(`/share/[id]`) 구현 및 편집 기능이 배제된 보고서 뷰어 노출.
- **링크 복사 UI**: 보고서 페이지 및 대시보드 내 '링크 복사' 버튼 고도화.
- **OG Tag 최적화**: 건물명, 주소, AI 투자 점수가 포함된 동적 메타 데이터 설정.

### Out of Scope
- **링크 만료 설정**: 초기 버전에서는 무기한 공유 (추후 보안 강화 단계로 분리).
- **비밀번호 보호**: 공개 링크 기반으로 우선 구현.

## 4. Technical Strategy
- **Routing**: Next.js 동적 라우팅 활용 (`/src/app/share/[id]/page.tsx`).
- **Data Access**: `reports` 테이블에서 `id`로 공개 데이터를 조회 (Public 접근 허용 정책 필요).
- **SEO/Metadata**: Next.js `generateMetadata` API를 사용하여 동적 OG Tag 생성.

## 5. Success Criteria
| Criterion | Metric | Target |
|-----------|--------|--------|
| 공유 성공률 | 카카오톡 공유 시 미리보기 노출 여부 | 100% 정상 작동 |
| 열람 속도 | 링크 클릭 후 보고서 렌더링 시간 | 1초 이내 |
| 데이터 보안 | 공유 페이지에서의 편집 권한 차단 여부 | 완벽 차단 확인 |

## 6. Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| 데이터 노출 | Medium | 개인정보(사용자 ID 등)는 배제하고 분석 스냅샷만 노출하도록 필터링 |
| 링크 오남용 | Low | 대량 조회 방지를 위한 Rate Limiting 검토 |
