# Report: Landing Web Value-up

## What changed
- 랜딩 가치 제안 섹션을 신규 추가했다.
  - `src/components/landing/LandingValueUp.tsx`
- 랜딩 조합부에 신규 섹션을 연결했다.
  - `src/app/page.tsx`
- 히어로 영역에 신뢰 배지/보조 메시지를 추가해 첫 화면 효익 전달을 강화했다.
  - `src/components/landing/LandingHero.tsx`
- 랜딩에서 대시보드로 넘어갈 때 보이는 로딩 문구를 한국어로 정리했다.
  - `src/app/page.tsx`

## How verified (commands + results)
- Command:
  - `set SystemRoot=C:\Windows&& set windir=C:\Windows&& set TEMP=C:\Windows\Temp&& set TMP=C:\Windows\Temp&& npx eslint src/components/landing/LandingHero.tsx src/components/landing/LandingValueUp.tsx src/app/page.tsx`
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
  - TypeScript 컴파일 오류
  - 위치: `src/app/api/building-report-v2/route.ts:89`
  - 원인: `validBuildings` union 타입이 `AnalysisInputBuilding[]`로 좁혀지지 않음
  - 판단: 본 랜딩 밸류업 변경과 무관한 기존 blocker

## Risks / rollback notes
- 신규 섹션 추가로 랜딩 길이가 증가했기 때문에 모바일 스크롤 피로가 늘 수 있다.
- 히어로 배지 문구는 마케팅 톤 피드백에 따라 재조정될 수 있다.
- 롤백은 `LandingValueUp` import/섹션 제거 및 `LandingHero` 배지 블록 복원으로 가능하다.
- 빌드 blocker가 선행 해결되지 않으면 배포 파이프라인이 중단될 수 있다.

## Next actions
1. `src/app/api/building-report-v2/route.ts` 타입 가드를 보강해 build blocker를 해소한다.
2. 모바일(360~390px)에서 카드 줄바꿈/간격을 실제 디바이스로 점검한다.
3. 검색 전환율(검색 버튼 클릭률) 이벤트를 추가해 개선 효과를 계측한다.
