# Scriva (scriva.online) 전체 분석 보고서

**날짜**: 2026-05-07  
**분석 범위**: 개선점 발굴 · 경쟁 비교 · 신기능 기획 · 코드 품질 감사

---

## 개요

Scriva는 AI 기반 스크립트 생성 SaaS다. Next.js 14 + Clerk + Supabase + Stripe + OpenAI GPT-4o 스택으로 구축되어 있으며, 3-tier 플랜(Starter/Creator/Agency)으로 수익화 중이다. 실 서비스 중이며 3,400+ 크리에이터, 12,000+ 생성 스크립트를 보유한다.

---

## A. 개선점 발굴

### A-1. 버그 / 크리티컬 이슈

| 번호 | 위치 | 문제 | 심각도 |
|------|------|------|--------|
| A1-1 | `src/lib/user.ts:58` | `checkAndIncrementUsage` 에러 시 fallback model이 `"gpt-4o-mini"`로 하드코딩 — 실제 플랜 모델명(`gpt-4.1-mini`)과 불일치 | 중 |
| A1-2 | `src/app/api/generate/route.ts:239` | 게스트는 항상 `gpt-4.1-mini` 사용하나, `openai.ts`의 `buildScriptPrompt` 함수는 전혀 사용되지 않음 — 중복 코드 | 하 |
| A1-3 | `src/app/pricing/page.tsx:232` | `checkoutError`는 Creator 카드에만 표시, Agency 카드에는 에러 표시 없음 | 중 |
| A1-4 | `src/lib/user.ts:76–84` | 월 리셋 시 `billing_cycle_start`를 월 1일로 고정 — 실제 결제일과 불일치, 프로 유저 스크립트가 조기 리셋될 수 있음 | 중 |
| A1-5 | `src/app/api/generate/route.ts:269` | OpenAI 응답 JSON 파싱 실패 시 `scenes: []`로 fallback — SceneViewer에 씬 없이 렌더링 | 하 |
| A1-6 | `supabase/schema.sql:30` | `scripts.user_id`가 `users.id(UUID)` 참조인데, `generate/route.ts:298`에서 `dbUserId`가 null일 경우 insert 실패 | 중 |

### A-2. UX / 전환율 이슈

| 번호 | 위치 | 문제 |
|------|------|------|
| A2-1 | 랜딩 히어로 | "TRY WITHOUT SIGNING UP" 버튼의 게스트 생성기가 히어로 아래 별도 섹션 — 스크롤 없이 즉시 시도 불가 |
| A2-2 | 랜딩 페이지 | 소셜 증명(3,400+ creators, 4.9/5) 수치가 히어로 하단 소형 텍스트 — 신뢰 신호로 활용 부족 |
| A2-3 | Pricing 페이지 | Creator vs Agency 플랜 차이 설명이 feature list만으로 제공 — "왜 Agency가 필요한가"에 대한 유스케이스 없음 |
| A2-4 | 대시보드 | 히스토리 Starter 5개 제한 표시가 링크 하나("Upgrade for full history →")뿐 — 제한에 닿기 전 업그레이드 유도 없음 |
| A2-5 | 대시보드 | 언어 드롭다운에서 비영어 선택 시 UpgradeModal만 뜨고 현재 선택이 English로 돌아가지 않음 (시각적 혼란) |
| A2-6 | 블로그 | 30개 이상의 SEO 아티클이 있으나 각 포스트에 인라인 생성 CTA가 없음 — 블로그→대시보드 전환 경로 부재 |
| A2-7 | 전체 | 쿠키 동의 배너가 페이지 중앙에 오버레이 — 히어로 CTA 버튼을 가림 |

### A-3. 보안 이슈

| 번호 | 위치 | 문제 |
|------|------|------|
| A3-1 | `generate/route.ts:127` | IP 추출 시 `x-forwarded-for` 첫 번째 값 사용 — 프록시 환경에서 클라이언트 IP 스푸핑 가능, 게스트 일일 제한 우회 가능 |
| A3-2 | `generate/route.ts:193–200` | `req.json()` 파싱 전 body 유효성 검사 없음 — 악의적 대형 payload 허용 가능 |
| A3-3 | `generate/route.ts:91` | 프롬프트에 유저 입력(`topic`, `brandVoice`)이 직접 삽입 — 프롬프트 인젝션 부분적 위험 |
| A3-4 | `webhooks/stripe/route.ts:128` | `session.metadata?.plan`을 PlanType으로 직접 캐스팅, 검증 없음 — 위조된 webhook으로 플랜 조작 가능 (단, signature 검증 후 단계라 실위험 낮음) |

### A-4. 성능 이슈

| 번호 | 위치 | 문제 |
|------|------|------|
| A4-1 | `dashboard/page.tsx:85–87` | `Promise.all` 사용 중이지만 `fetchHistory` 내부에서 `setLoadingHistory(true)`를 동기적으로 호출 → state 업데이트 순서 불일치 가능 |
| A4-2 | `generate/route.ts` | `getOrCreateUser` + `checkAndIncrementUsage` 순차 호출 — 각각 Supabase 쿼리 2회, 병렬화 가능 |
| A4-3 | `user.ts:76` | 월 카운터 리셋을 요청마다 체크 — 전용 cron 또는 webhook 기반 리셋으로 교체 시 DB write 절약 |

---

## B. 경쟁 비교 분석

### B-1. 직접 경쟁사 포지셔닝

| 항목 | Scriva | Jasper | Copy.ai | Writesonic |
|------|--------|--------|---------|------------|
| 스크립트 특화 | ✅ 전용 | ❌ 범용 | ❌ 범용 | 부분 |
| 비디오 씬 구조 | ✅ Scene 라벨+비주얼 | ❌ | ❌ | ❌ |
| 무료 체험 (비가입) | ✅ 게스트 3회/일 | ❌ | 제한적 | 제한적 |
| 가격 (시작) | $19/mo | $39/mo | $49/mo | $19/mo |
| 지원 포맷 수 | 8종 | 50+ 템플릿 | 100+ 템플릿 | 30+ |
| Agency/팀 플랜 | ✅ $49 | ✅ $125 | ✅ $249 | ✅ $79 |
| 브랜드 보이스 | Agency만 | ✅ 전 플랜 | ✅ | ✅ |

### B-2. Scriva 강점

- **스크립트 전용 포지셔닝**: 범용 AI 카피라이터 대비 "크리에이터를 위한 스크립트 특화" 메시지가 명확함
- **씬 구조화 출력**: 씬 라벨 + 내레이션 + 비주얼 디렉션을 JSON으로 구조화 — 타 경쟁사에 없는 차별점
- **가격 경쟁력**: Creator $19가 Jasper/Copy.ai 대비 절반 수준
- **게스트 체험**: 비가입 즉시 시도 가능 — 진입 장벽 최저

### B-3. Scriva 약점 (경쟁 대비)

- **언어 5종** (EN/ES/KO/JA/FR) — Jasper는 30개 언어 지원
- **팀/멀티시트 없음** — Agency 플랜이 단일 유저 기반
- **브랜드 보이스 Agency 전용** — Creator도 사용하고 싶어하는 기능
- **통합 없음** — Google Docs, Notion, YouTube Studio 연동 부재
- **음성 톤 4종** 고정 — 커스텀 톤 설정 불가

---

## C. 신기능 기획

### C-1. 즉시 구현 가능 (1-2주)

#### C1-1. 스크립트 버전 히스토리 (재생성 트래킹)
- 같은 토픽으로 여러 번 생성한 경우 버전 비교 UI
- DB: `scripts` 테이블에 `parent_script_id UUID` 컬럼 추가
- 가치: 유저가 "더 나은 버전"을 선택하는 경험 → 재방문율 상승

#### C1-2. 스크립트 즐겨찾기 / 폴더
- `scripts` 테이블에 `is_starred BOOLEAN`, `folder_name TEXT` 추가
- 대시보드 히스토리에 별표 + 폴더 필터
- 가치: Agency 유저(대량 생성)의 관리 UX 개선

#### C1-3. 인라인 편집 모드
- SceneViewer에서 직접 텍스트 수정 후 저장
- 현재 output은 읽기 전용 — 편집→저장 흐름 없음
- 가치: 생성 후 바로 편집, 외부 툴 없이 완결

### C-2. 중기 (1-2개월)

#### C2-1. 팀/멀티시트 플랜
- `team_id UUID` 필드 + `team_members` 테이블 추가
- Agency $49 → 단일 유저 / Team $99 → 5 시트
- 가치: B2B 전환, LTV 2-3배 상승

#### C2-2. 스크립트 → 콘텐츠 캘린더
- 생성된 스크립트에 "예정 날짜" 할당
- 주간/월간 캘린더 뷰
- 가치: Creator/Agency 유저 리텐션 — "Scriva = 콘텐츠 운영 허브"

#### C2-3. Webhook / Zapier 연동
- `/api/webhooks/outbound` 엔드포인트 — 스크립트 생성 완료 시 Zapier/Make에 전송
- 가치: Notion/Google Docs 자동 저장 → 프로 유저 워크플로 통합

### C-3. 장기 (3-6개월)

#### C3-1. 음성 생성 연동 (TTS 미리듣기)
- ElevenLabs/OpenAI TTS API로 스크립트 낭독 미리듣기
- Agency 전용 기능으로 추가
- 가치: "스크립트 → 오디오 프리뷰" 차별화

#### C3-2. AI 스크립트 코치 (피드백 모드)
- 기존 스크립트 붙여넣기 → GPT가 "Hook 약함, CTA 없음" 등 피드백
- Free 유저용 리드 마그넷으로 활용 가능

#### C3-3. 번들 내보내기 (PDF/Teleprompter)
- 씬 구조화 스크립트를 PDF, 또는 teleprompter 뷰 HTML로 내보내기
- 현재 .txt 다운로드만 제공

---

## D. 코드 품질 감사

### D-1. 아키텍처 평가

| 항목 | 현황 | 평가 |
|------|------|------|
| 인증 분리 | Clerk webhook + API route 분리 | ✅ 적절 |
| DB 접근 | 전체 supabaseAdmin(service_role) 사용, RLS 있으나 API 레이어에서만 접근 | ✅ 설계 의도 명확 |
| 플랜 로직 중앙화 | `lib/stripe.ts`의 `PLANS` 객체로 단일 진실 소스 | ✅ 좋음 |
| OpenAI 프롬프트 | `route.ts` 내 `buildPrompt`와 `lib/openai.ts`의 `buildScriptPrompt` 두 곳에 분산 | ⚠️ 중복 — 정리 필요 |
| 에러 핸들링 | API 에러는 잘 처리되나, 클라이언트 에러 UI는 일부 누락 | ⚠️ 부분 |
| TypeScript | `eslint-disable @typescript-eslint/no-explicit-any` 남발 | ⚠️ any 타입 4곳 |
| 테스트 | 테스트 파일 없음 | ❌ 없음 |
| 환경변수 검증 | `OPENAI_ENABLED`, `STRIPE_ENABLED` 플래그로 graceful fallback | ✅ 좋음 |

### D-2. 코드 냄새 목록

```
src/lib/user.ts:58       — 하드코딩 모델명 "gpt-4o-mini" (실제: "gpt-4.1-mini")
src/lib/openai.ts        — buildScriptPrompt() 사용처 없음 (dead code)
src/app/api/generate/    — buildPrompt 중복 정의 (openai.ts에도 유사 함수)
src/app/dashboard/       — eslint-disable any 4회
src/app/pricing/page.tsx — checkoutError Agency 카드 미반영
```

### D-3. 보안 개선 우선순위

1. **(높음)** `x-forwarded-for` IP 스푸핑 방어 — Vercel 환경에서는 `x-vercel-forwarded-for` 헤더 사용
2. **(중간)** request body size 제한 (`next.config.mjs`에 `bodySizeLimit` 설정)
3. **(중간)** `session.metadata.plan` webhook 값 검증 (`["creator","agency"].includes(plan)`)
4. **(낮음)** 프롬프트 인젝션 방어 — 입력값 길이 제한 강화 (현재 topic 최소 5자만 체크)

### D-4. 기술 부채 요약

- **즉시 수정**: dead code(`buildScriptPrompt`) 제거, Agency 에러 표시 수정, IP 헤더 수정
- **단기**: any 타입 제거, billing 리셋 로직 개선, 프롬프트 통합
- **장기**: 테스트 추가 (최소 API route 단위 테스트), DB 쿼리 최적화

---

## 우선순위 매트릭스

| 우선순위 | 항목 | 임팩트 | 노력 |
|----------|------|--------|------|
| P0 | IP 스푸핑 방어 (A3-1) | 보안 | 소 |
| P0 | Agency 체크아웃 에러 표시 (A1-3) | 매출 | 소 |
| P1 | 브랜드 보이스 Creator로 확대 (C2) | 전환율 | 중 |
| P1 | 블로그 인라인 CTA 추가 (A2-6) | 전환율 | 소 |
| P1 | 인라인 편집 모드 (C1-3) | 리텐션 | 중 |
| P2 | 스크립트 즐겨찾기/폴더 (C1-2) | Agency 리텐션 | 소 |
| P2 | Dead code 제거 + 프롬프트 통합 (D-2) | 기술부채 | 소 |
| P3 | 팀/멀티시트 플랜 (C2-1) | LTV | 대 |
| P3 | 콘텐츠 캘린더 (C2-2) | 리텐션 | 대 |
