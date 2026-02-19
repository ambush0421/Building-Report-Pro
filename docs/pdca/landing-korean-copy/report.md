# Report: Landing Korean Copy Refresh

## What changed
- 랜딩 페이지 핵심 카피를 한국어 중심으로 교체했다.
  - `src/components/landing/LandingFeatures.tsx`
  - `src/components/landing/LandingStats.tsx`
  - `src/components/landing/LandingHowItWorks.tsx`
  - `src/components/landing/LandingFAQ.tsx`
  - `src/components/landing/LandingCTA.tsx`
  - `src/components/landing/StepIndicator.tsx`
- 영문 중심 문구(카드 제목, 단계명, FAQ, CTA)를 한국어 사용 맥락에 맞게 정리했다.
- `design.md`에 카피 톤 기준과 파일별 매핑을 반영했다.

## How verified (commands + results)
- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npx eslint src/components/landing/LandingFeatures.tsx src/components/landing/LandingStats.tsx src/components/landing/LandingHowItWorks.tsx src/components/landing/LandingFAQ.tsx src/components/landing/LandingCTA.tsx src/components/landing/StepIndicator.tsx`
- Result:
  - 성공 (exit code 0)
  - 변경 파일 scoped lint 통과

- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npm run lint`
- Result:
  - 성공 (exit code 0)
  - 전역 lint 기준 통과

- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npm run build`
- Result:
  - 실패 (exit code 1)
  - TypeScript 컴파일 오류로 중단
  - 위치: `src/app/api/building-report-v2/route.ts:89`
  - 상세: `validBuildings` 배열 타입이 `AnalysisInputBuilding[]`와 불일치 (`error: true` 형태 union 잔존)
  - 판단: 이번 랜딩 카피 변경 범위와 직접 관련 없는 기존 타입 이슈

## Risks / rollback notes
- 한국어 문구 길이에 따라 일부 뷰포트에서 줄바꿈 포인트가 달라질 수 있다.
- `StepIndicator`는 다른 화면에서도 사용되므로 용어가 전체 플로우에 동일하게 반영된다.
- 롤백은 위 6개 컴포넌트의 텍스트 문자열 복원으로 가능하다.
- 현재 배포 빌드에는 별도 타입 blocker가 존재하므로, 본 feature 머지 전 후속 타입 수정이 필요하다.

## Next actions
1. `src/app/api/building-report-v2/route.ts` 타입 좁히기(type guard)로 build blocker를 해소한다.
2. 실제 랜딩 화면에서 모바일(특히 360~390px) 줄바꿈 가독성을 확인한다.
3. 같은 기준으로 대시보드 내 잔여 영문(필요 시)도 별도 feature로 정리한다.
