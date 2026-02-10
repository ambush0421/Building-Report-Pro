# 운영 환경 배포 가이드 (Deployment Guide)

본 문서는 **Building Report Pro** 시스템을 운영 환경에 배포하기 위한 상세 단계를 설명합니다.

---

## 1. 전제 조건 (Prerequisites)
- [Node.js 20.x](https://nodejs.org/) 이상
- [Supabase](https://supabase.com/) 계정 및 프로젝트
- [국토교통부 공공데이터포털](https://www.data.go.kr/) API 키

---

## 2. 환경 변수 설정 (Environment Variables)

Vercel 또는 호스팅 서버의 환경 설정에 아래 항목을 반드시 추가해야 합니다.

### 2.1 클라이언트 사이드 (Public)
| 변수명 | 설명 | 비고 |
|:---|:---|:---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 프로젝트 URL | API Settings에서 확인 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 익명 키 | API Settings에서 확인 |
| `NEXT_PUBLIC_API_URL` | 현재 사이트 도메인 | 예: `https://your-domain.vercel.app` |

### 2.2 서버 사이드 (Private)
| 변수명 | 설명 | 비고 |
|:---|:---|:---|
| `BUILDING_API_KEY` | 국토교통부 OpenAPI 인증키 | 공공데이터포털에서 발급 |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 관리자 키 | (선택) 어드민 기능 사용 시 |

---

## 3. 데이터베이스 설정 (Supabase)

Supabase SQL Editor에서 아래 테이블들을 순서대로 생성하십시오.

### 3.1 테이블 생성 SQL
```sql
-- 1. 보고서 저장 테이블
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  building_data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 유저 피드백 테이블
CREATE TABLE report_feedbacks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id TEXT NOT NULL,
  report_type TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  user_choice_index INTEGER,
  ai_choice_index INTEGER,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 가중치 튜닝 이력 테이블
CREATE TABLE weight_tuning_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prev_weights JSONB,
  new_weights JSONB,
  sample_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 4. 배포 단계 (Vercel 기준)

1. **GitHub 저장소 연결**: Vercel 대시보드에서 프로젝트를 임포트합니다.
2. **Build Settings**: 
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
3. **Environment Variables**: 위에 명시된 모든 변수를 입력합니다.
4. **Deploy**: 'Deploy' 버튼을 클릭하여 배포를 완료합니다.

---

## 5. 최종 점검 리스트
- [ ] `/api/building-report` 호출 시 국토부 데이터가 정상적으로 수신되는가?
- [ ] 비교 보고서 페이지에서 PDF 다운로드가 정상 작동하는가?
- [ ] 모바일 기기에서 스와이프 및 드로어 레이아웃이 깨지지 않는가?
