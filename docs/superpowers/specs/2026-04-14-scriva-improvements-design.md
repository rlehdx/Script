# Scriva 전체 개선 설계 스펙

**날짜**: 2026-04-14
**상태**: 승인됨
**범위**: 버그 수정 + 전환율 개선 + UX 개선 + 보안 강화 + 성능 개선

---

## 컨텍스트

출시된 서비스로 실제 유저가 있음. 기존 유저 경험을 깨지 않으면서 15개 항목을 개선한다. 전환율 개선은 "점진적 넛지 방식(A)"으로 진행 — 압박 없이 자연스럽게 가입/업그레이드를 유도.

---

## 1. 버그 수정 (4개)

### 1-1. pricing/page.tsx — alert() 제거
- **문제**: 결제 실패 시 `alert()` 호출 — 브라우저 기본 다이얼로그, UX 파괴
- **수정**: 인라인 에러 상태(`error` state)로 교체, 페이지 내 에러 메시지 표시
- **파일**: `src/app/pricing/page.tsx`

### 1-2. webhooks/stripe/route.ts — null 크래시 방지
- **문제**: `sub.items.data[0]?.price?.id` 접근 시 구독 아이템이 없으면 크래시
- **수정**: null 체크 추가, 없으면 `console.error` 후 `200` 반환(Stripe 재시도 방지)
- **파일**: `src/app/api/webhooks/stripe/route.ts`

### 1-3. webhooks/clerk/route.ts — 이메일 fallback 제거
- **문제**: 이메일 없는 유저 생성 시 `${id}@unknown.local` 같은 가짜 이메일 DB 저장
- **수정**: 이메일 없으면 유저 생성 skip, 로그만 남김
- **파일**: `src/app/api/webhooks/clerk/route.ts`

### 1-4. generate/route.ts — Supabase 저장 오류 로깅 (완료 ✓)
- 이미 수정됨. `saveError` 로깅 포함.

---

## 2. 전환율 개선 (3개)

### 2-1. 80% 사용량 소프트 배너
- **위치**: 대시보드 상단, UsageBar 아래
- **트리거**: `scriptsUsed / limit >= 0.8` (무제한 플랜 제외)
- **내용**: "스크립트 N개 남았어요 · Creator로 월 100개 사용하기" + 업그레이드 버튼
- **디자인**: 보라색 반투명 배너, 닫기 버튼 없음(매번 표시)
- **파일**: `src/app/dashboard/page.tsx`, `src/components/UsageBar.tsx`

### 2-2. UpgradeModal 플랜 비교 UI
- **문제**: 현재 모달은 단순 텍스트만 — 플랜 차이를 직관적으로 보여주지 않음
- **수정**: 현재 플랜 vs Creator 카드 비교 UI 추가 (스크립트 수, 모델, 언어)
- **파일**: `src/components/UpgradeModal.tsx`

### 2-3. GuestGenerator 생성 후 CTA 강화
- **문제**: 스크립트 생성 후 가입 유도가 작은 링크 하나뿐
- **수정**: 생성 결과 하단에 "이 스크립트를 저장하려면 무료 가입" 버튼 추가 (눈에 띄는 크기)
- **파일**: `src/components/GuestGenerator.tsx`

---

## 3. UX 개선 (4개)

### 3-1. ScriptHistory 스켈레톤 로더
- **문제**: 히스토리 로딩 중 빈 화면
- **수정**: 3개 스켈레톤 카드 표시 (pulse 애니메이션)
- **신규 컴포넌트**: `src/components/SkeletonCard.tsx`
- **파일**: `src/components/ScriptHistory.tsx`

### 3-2. 대시보드 빈 상태 안내
- **문제**: 신규 유저 첫 방문 시 히스토리가 텅 빔 — 무엇을 해야 할지 모름
- **수정**: 스크립트 0개일 때 "첫 스크립트를 만들어보세요" 안내 카드 표시
- **파일**: `src/components/ScriptHistory.tsx`

### 3-3. Toast 알림 컴포넌트
- **문제**: 에러/성공 피드백이 `alert()` 또는 작은 텍스트로만 표시됨
- **수정**: 우측 하단 Toast 컴포넌트 추가 (성공/에러/정보 3종)
- **신규 컴포넌트**: `src/components/Toast.tsx`
- **적용**: pricing 페이지, settings 페이지

### 3-4. settings 페이지 저장 피드백 개선
- **문제**: 브랜드 보이스 저장 후 2초 버튼 텍스트 변경만 — 너무 미묘함
- **수정**: Toast 컴포넌트로 "저장됐습니다" 피드백 제공
- **파일**: `src/app/settings/page.tsx`

---

## 4. 보안 강화 (2개)

### 4-1. Clerk webhook Svix 서명 검증 강화
- **문제**: webhook 헤더 검증 로직 취약 — 위조 요청 가능
- **수정**: `svix` 패키지의 `Webhook.verify()` 올바르게 적용, 실패 시 `400` 반환
- **파일**: `src/app/api/webhooks/clerk/route.ts`

### 4-2. 계정 삭제 이메일 재확인
- **문제**: "DELETE" 텍스트 입력만으로 계정 삭제 가능 — 실수 위험
- **수정**: 유저의 실제 이메일 주소 입력으로 변경
- **파일**: `src/app/settings/page.tsx`

---

## 5. 성능 개선 (2개)

### 5-1. 대시보드 병렬 fetch
- **문제**: `fetchUsage()` → `fetchHistory()` 순차 호출
- **수정**: `Promise.all([fetchUsage(), fetchHistory()])` 병렬 호출
- **파일**: `src/app/dashboard/page.tsx`

### 5-2. settings 페이지 fetch 통합
- **문제**: 브랜드 보이스와 구독 상태를 별도 fetch
- **수정**: `/api/user` 엔드포인트 하나로 통합 또는 `Promise.all` 병렬 처리
- **파일**: `src/app/settings/page.tsx`

---

## 신규 파일

| 파일 | 역할 |
|------|------|
| `src/components/Toast.tsx` | 성공/에러/정보 Toast 알림 |
| `src/components/SkeletonCard.tsx` | 히스토리 로딩 스켈레톤 |

## 수정 파일 (10개)

| 파일 | 수정 내용 |
|------|-----------|
| `src/middleware.ts` | public route 유지 |
| `src/app/api/generate/route.ts` | 게스트 분기 (완료 ✓) |
| `src/app/api/webhooks/stripe/route.ts` | null 크래시 방지 |
| `src/app/api/webhooks/clerk/route.ts` | 이메일 fallback 제거, 서명 검증 강화 |
| `src/app/pricing/page.tsx` | alert() 제거 → 인라인 에러 |
| `src/app/dashboard/page.tsx` | 80% 배너, 병렬 fetch, 빈 상태 |
| `src/app/settings/page.tsx` | Toast 피드백, 이메일 삭제 확인, 병렬 fetch |
| `src/components/UpgradeModal.tsx` | 플랜 비교 UI |
| `src/components/GuestGenerator.tsx` | 생성 후 CTA 강화 |
| `src/components/ScriptHistory.tsx` | 스켈레톤, 빈 상태 |
