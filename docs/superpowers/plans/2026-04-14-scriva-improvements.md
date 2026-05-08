# Scriva 전체 개선 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 버그 수정 4개 + 전환율 개선 3개 + UX 개선 4개 + 보안 강화 2개 + 성능 개선 2개를 기존 유저 경험을 깨지 않으면서 구현한다.

**Architecture:** 신규 컴포넌트(Toast, SkeletonCard) 2개를 먼저 만들고, 버그 수정 → 전환율 → UX → 보안 → 성능 순서로 진행한다. 각 태스크는 독립적으로 커밋 가능하다.

**Tech Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Clerk, Supabase, Stripe, Framer Motion

---

## 파일 구조

| 상태 | 파일 | 변경 내용 |
|------|------|-----------|
| 신규 | `src/components/Toast.tsx` | 성공/에러/정보 Toast 알림 컴포넌트 |
| 신규 | `src/components/SkeletonCard.tsx` | 히스토리 로딩 스켈레톤 |
| 수정 | `src/app/api/webhooks/clerk/route.ts` | 이메일 fallback 제거 |
| 수정 | `src/app/api/webhooks/stripe/route.ts` | null 크래시 방지 |
| 수정 | `src/app/pricing/page.tsx` | alert() → 인라인 에러 |
| 수정 | `src/components/UpgradeModal.tsx` | 플랜 비교 UI |
| 수정 | `src/components/GuestGenerator.tsx` | 생성 후 CTA 강화 |
| 수정 | `src/app/dashboard/page.tsx` | 80% 배너 + 병렬 fetch |
| 수정 | `src/components/ScriptHistory.tsx` | 스켈레톤 + 빈 상태 개선 |
| 수정 | `src/app/settings/page.tsx` | Toast + 이메일 삭제 확인 + 병렬 fetch |

---

## Task 1: Toast 컴포넌트 생성

**Files:**
- Create: `src/components/Toast.tsx`

- [ ] **Step 1: Toast 컴포넌트 작성**

```tsx
// src/components/Toast.tsx
"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

const ICONS: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  info: "ℹ",
};

const COLORS: Record<ToastType, string> = {
  success: "bg-green-500/10 border-green-500/20 text-green-300",
  error: "bg-red-500/10 border-red-500/20 text-red-300",
  info: "bg-purple-500/10 border-purple-500/20 text-purple-300",
};

function ToastItem({ toast, onRemove }: { toast: ToastMessage; onRemove: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium shadow-lg ${COLORS[toast.type]}`}
    >
      <span className="text-base">{ICONS[toast.type]}</span>
      <span>{toast.message}</span>
      <button
        onClick={() => onRemove(toast.id)}
        className="ml-2 opacity-60 hover:opacity-100 transition-opacity text-xs"
      >
        ✕
      </button>
    </motion.div>
  );
}

export default function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// 유틸: 토스트 ID 생성
export function createToastId() {
  return Math.random().toString(36).slice(2);
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/components/Toast.tsx
git commit -m "feat: Toast 알림 컴포넌트 추가 (success/error/info)"
```

---

## Task 2: SkeletonCard 컴포넌트 생성

**Files:**
- Create: `src/components/SkeletonCard.tsx`

- [ ] **Step 1: SkeletonCard 컴포넌트 작성**

```tsx
// src/components/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <div className="bezel-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 animate-pulse">
      {/* Type badge skeleton */}
      <div className="h-5 w-24 bg-white/5 rounded-full shrink-0" />
      {/* Title skeleton */}
      <div className="flex-1 h-4 bg-white/5 rounded-lg" />
      {/* Meta skeleton */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="h-3 w-12 bg-white/5 rounded" />
        <div className="h-3 w-12 bg-white/5 rounded" />
        <div className="h-3 w-16 bg-white/5 rounded hidden sm:block" />
      </div>
      {/* Action buttons skeleton */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="h-7 w-20 bg-white/5 rounded-lg" />
        <div className="h-7 w-14 bg-white/5 rounded-lg" />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/components/SkeletonCard.tsx
git commit -m "feat: ScriptHistory 스켈레톤 로더 컴포넌트 추가"
```

---

## Task 3: [버그] Clerk webhook 이메일 fallback 제거

**Files:**
- Modify: `src/app/api/webhooks/clerk/route.ts:47-52`

- [ ] **Step 1: 이메일 없으면 skip하도록 수정**

현재 51번째 줄:
```ts
const email = email_addresses?.[0]?.email_address ?? `${id}@unknown.local`;
```

아래로 교체:
```ts
const email = email_addresses?.[0]?.email_address;
if (!email) {
  console.warn('[clerk-webhook] No email address found for user, skipping creation:', id);
  return new Response('Success', { status: 200 });
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/app/api/webhooks/clerk/route.ts
git commit -m "fix: Clerk webhook 가짜 이메일 fallback 제거"
```

---

## Task 4: [버그] Stripe webhook null 크래시 방지

**Files:**
- Modify: `src/app/api/webhooks/stripe/route.ts:10-22`

- [ ] **Step 1: resolvePlanType에 null 가드 추가**

현재 `resolvePlanType` 함수 전체를 아래로 교체:
```ts
function resolvePlanType(sub: Stripe.Subscription): PlanType {
  const metaPlan = sub.metadata?.plan as PlanType | undefined;
  if (metaPlan === "agency" || metaPlan === "creator") return metaPlan;

  const item = sub.items?.data?.[0];
  if (!item) {
    console.warn("[stripe-webhook] Subscription has no items, defaulting to creator");
    return "creator";
  }

  const priceId = item.price?.id;
  if (
    priceId &&
    (priceId === PLANS.agency.monthlyPriceId || priceId === PLANS.agency.annualPriceId)
  ) {
    return "agency";
  }
  return "creator";
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/app/api/webhooks/stripe/route.ts
git commit -m "fix: Stripe webhook resolvePlanType null 크래시 방지"
```

---

## Task 5: [버그] pricing 페이지 alert() 제거

**Files:**
- Modify: `src/app/pricing/page.tsx`

- [ ] **Step 1: checkoutError state 추가 및 alert() 제거**

파일 상단 imports 아래 state 선언부를 찾아 `checkoutError` state 추가:
```ts
// 기존 state들 아래에 추가
const [checkoutError, setCheckoutError] = useState<string | null>(null);
```

checkout 함수에서 `alert()` 호출 찾아 교체. 현재:
```ts
alert(data.error ?? "Failed to open checkout. Please try again.");
```
교체:
```ts
setCheckoutError(data.error ?? "Failed to open checkout. Please try again.");
```

- [ ] **Step 2: 에러 메시지 UI 추가**

checkout 버튼 아래에 에러 메시지 표시 추가:
```tsx
{checkoutError && (
  <p className="text-xs text-red-400 text-center mt-3">{checkoutError}</p>
)}
```

- [ ] **Step 3: settings 페이지 billing portal alert() 교체**

`src/app/settings/page.tsx`의 `handleBillingPortal` 함수에서:
```ts
alert("No billing account found. Subscribe first.");
```
교체:
```ts
// state 추가: const [portalError, setPortalError] = useState<string | null>(null);
setPortalError("No billing account found. Subscribe first.");
```
그리고 UI에서 `portalError && <p className="text-xs text-red-400 mt-2">{portalError}</p>` 추가.

- [ ] **Step 4: 커밋**

```bash
git add src/app/pricing/page.tsx src/app/settings/page.tsx
git commit -m "fix: pricing/settings 페이지 alert() 제거, 인라인 에러로 교체"
```

---

## Task 6: [전환율] UpgradeModal 플랜 비교 UI

**Files:**
- Modify: `src/components/UpgradeModal.tsx`

- [ ] **Step 1: UpgradeModal 전체를 플랜 비교 UI로 교체**

`src/components/UpgradeModal.tsx` 전체 내용을 아래로 교체:
```tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import type { PlanType } from "@/lib/stripe";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  scriptsUsed: number;
  planType?: PlanType;
}

export default function UpgradeModal({ isOpen, onClose, scriptsUsed, planType = "starter" }: UpgradeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bezel-card max-w-md w-full p-8 pointer-events-auto relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="text-center mb-6">
                <div className="text-3xl mb-3">🚀</div>
                <h2 className="text-xl font-bold mb-2">이번 달 스크립트를 모두 사용했어요</h2>
                <p className="text-slate-400 text-sm">Creator 플랜으로 업그레이드하면 더 많이 생성할 수 있어요</p>
              </div>

              {/* Plan comparison */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bezel-card-inner p-4 rounded-xl">
                  <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">지금 (Starter)</p>
                  <p className="text-2xl font-bold text-white">5개<span className="text-sm font-normal text-slate-400">/월</span></p>
                  <p className="text-xs text-slate-500 mt-1">gpt-4.1-mini</p>
                  <p className="text-xs text-slate-500">영어만</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                  <p className="text-xs text-purple-400 uppercase tracking-wide mb-1">Creator</p>
                  <p className="text-2xl font-bold text-white">100개<span className="text-sm font-normal text-slate-400">/월</span></p>
                  <p className="text-xs text-purple-300 mt-1">gpt-4.1</p>
                  <p className="text-xs text-purple-300">5개 언어</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/pricing"
                  className="btn-primary justify-center text-center"
                  onClick={onClose}
                >
                  Creator로 업그레이드 — $19/월
                </Link>
                <button
                  onClick={onClose}
                  className="text-sm text-slate-500 hover:text-slate-400 transition-colors py-2"
                >
                  다음 달까지 기다리기
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: 커밋**

```bash
git add src/components/UpgradeModal.tsx
git commit -m "feat: UpgradeModal 플랜 비교 UI 추가 (Starter vs Creator)"
```

---

## Task 7: [전환율] 대시보드 80% 사용량 소프트 배너

**Files:**
- Modify: `src/app/dashboard/page.tsx`

- [ ] **Step 1: 80% 배너 컴포넌트 추가**

`DashboardContent` 함수 내 `UsageBar` 컴포넌트 바로 아래에 배너 추가:
```tsx
{/* 80% 소프트 업그레이드 배너 */}
{usage.limit > 0 && usage.planType !== "agency" && usage.scriptsUsed / usage.limit >= 0.8 && (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    className="mx-6 mt-3 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between gap-3"
  >
    <div className="flex items-center gap-2">
      <span className="text-purple-400">⚡</span>
      <p className="text-xs text-purple-300">
        <span className="font-semibold">스크립트 {usage.limit - usage.scriptsUsed}개</span> 남았어요 · Creator 플랜으로 월 100개 사용하기
      </p>
    </div>
    <Link
      href="/pricing"
      className="shrink-0 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors px-3 py-1.5 rounded-lg"
    >
      업그레이드
    </Link>
  </motion.div>
)}
```

`Link` import가 이미 있는지 확인 — 없으면 파일 상단에 추가:
```ts
import Link from "next/link";
```

- [ ] **Step 2: 커밋**

```bash
git add src/app/dashboard/page.tsx
git commit -m "feat: 대시보드 80% 사용량 도달 시 소프트 업그레이드 배너"
```

---

## Task 8: [전환율] GuestGenerator 생성 후 CTA 강화

**Files:**
- Modify: `src/components/GuestGenerator.tsx`

- [ ] **Step 1: 스크립트 생성 후 저장 CTA 버튼 추가**

`GuestGenerator.tsx`의 output 섹션 하단 (`무료 가입 →` 링크 부분)을 찾아 전체 footer를 교체:

현재:
```tsx
<div className="pt-3 border-t border-white/5 flex items-center justify-between">
  <p className="text-xs text-slate-500">
    {guestUsed < 3
      ? `오늘 ${3 - guestUsed}개 더 체험 가능 · 가입하면 매달 5개 무료`
      : "오늘 무료 체험을 모두 사용했습니다"}
  </p>
  <Link href="/sign-up" className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium">
    무료 가입 →
  </Link>
</div>
```

교체:
```tsx
<div className="pt-3 border-t border-white/5 space-y-3">
  <Link
    href={`/sign-up?utm_source=guest_generator&utm_content=save_cta`}
    className="btn-primary w-full justify-center py-2.5 text-sm"
  >
    이 스크립트 저장하기 — 무료 가입
  </Link>
  <p className="text-xs text-slate-500 text-center">
    {guestUsed < 3
      ? `오늘 ${3 - guestUsed}개 더 체험 가능 · 가입하면 매달 5개 무료`
      : "오늘 무료 체험을 모두 사용했습니다"}
  </p>
</div>
```

- [ ] **Step 2: 커밋**

```bash
git add src/components/GuestGenerator.tsx
git commit -m "feat: GuestGenerator 스크립트 생성 후 저장 CTA 버튼 강화"
```

---

## Task 9: [UX] ScriptHistory 스켈레톤 + 빈 상태 개선

**Files:**
- Modify: `src/components/ScriptHistory.tsx`

- [ ] **Step 1: SkeletonCard import 추가 및 loading 상태 교체**

파일 상단 import에 추가:
```ts
import SkeletonCard from "@/components/SkeletonCard";
```

현재 loading 블록 (50-56번째 줄):
```tsx
if (loading) {
  return (
    <div className="bezel-card p-8 text-center text-sm text-slate-600 animate-pulse">
      Loading history...
    </div>
  );
}
```

교체:
```tsx
if (loading) {
  return (
    <div className="space-y-3">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
```

- [ ] **Step 2: 빈 상태 UI 개선**

현재 빈 상태 블록 (58-65번째 줄):
```tsx
if (displayed.length === 0) {
  return (
    <div className="bezel-card p-10 text-center">
      <p className="text-slate-500 text-sm">No scripts yet.</p>
      <p className="text-slate-600 text-xs mt-1">Generate your first script above.</p>
    </div>
  );
}
```

교체:
```tsx
if (displayed.length === 0) {
  return (
    <div className="bezel-card p-10 text-center">
      <div className="text-3xl mb-3">✍️</div>
      <p className="text-slate-300 text-sm font-medium">아직 생성한 스크립트가 없어요</p>
      <p className="text-slate-500 text-xs mt-1">위 폼에서 첫 번째 스크립트를 만들어보세요!</p>
    </div>
  );
}
```

- [ ] **Step 3: 커밋**

```bash
git add src/components/ScriptHistory.tsx src/components/SkeletonCard.tsx
git commit -m "feat: ScriptHistory 스켈레톤 로더 및 빈 상태 UI 개선"
```

---

## Task 10: [UX + 보안 + 성능] settings 페이지 통합 개선

**Files:**
- Modify: `src/app/settings/page.tsx`

- [ ] **Step 1: Toast + portalError state 추가**

파일 상단 imports에 추가:
```ts
import Toast, { type ToastMessage, createToastId } from "@/components/Toast";
```

기존 state 선언 아래에 추가:
```ts
const [toasts, setToasts] = useState<ToastMessage[]>([]);
const [portalError, setPortalError] = useState<string | null>(null);

function addToast(type: ToastMessage["type"], message: string) {
  setToasts((prev) => [...prev, { id: createToastId(), type, message }]);
}
function removeToast(id: string) {
  setToasts((prev) => prev.filter((t) => t.id !== id));
}
```

- [ ] **Step 2: 병렬 fetch로 변경**

현재 `useEffect` (36-43번째 줄):
```ts
useEffect(() => {
  fetch("/api/subscription/status")
    .then((r) => r.json())
    .then((d) => setUsage(d));
  fetch("/api/user/brand-voice")
    .then((r) => r.json())
    .then((d) => { if (d.brandVoice) setBrandVoice(d.brandVoice); });
}, []);
```

교체:
```ts
useEffect(() => {
  Promise.all([
    fetch("/api/subscription/status").then((r) => r.json()),
    fetch("/api/user/brand-voice").then((r) => r.json()),
  ]).then(([usageData, brandData]) => {
    setUsage(usageData);
    if (brandData.brandVoice) setBrandVoice(brandData.brandVoice);
  });
}, []);
```

- [ ] **Step 3: 브랜드 보이스 저장 Toast 피드백으로 교체**

현재 `handleSaveBrandVoice`의 성공 처리:
```ts
if (res.ok) {
  setBrandVoiceSaved(true);
  setTimeout(() => setBrandVoiceSaved(false), 2000);
}
```

교체:
```ts
if (res.ok) {
  addToast("success", "브랜드 보이스가 저장됐습니다.");
} else {
  addToast("error", "저장에 실패했습니다. 다시 시도해주세요.");
}
```

- [ ] **Step 4: billing portal alert() 제거**

현재 `handleBillingPortal`의 alert:
```ts
alert("No billing account found. Subscribe first.");
setPortalLoading(false);
```

교체:
```ts
setPortalError("No billing account found. Subscribe first.");
setPortalLoading(false);
```

billing portal 버튼 아래에 에러 표시 추가:
```tsx
{portalError && (
  <p className="text-xs text-red-400 mt-2">{portalError}</p>
)}
```

- [ ] **Step 5: 계정 삭제 확인을 이메일 입력으로 변경**

현재 `handleDeleteAccount`:
```ts
if (deleteConfirm !== "DELETE") return;
```

교체:
```ts
if (deleteConfirm !== (user?.primaryEmailAddress?.emailAddress ?? "")) return;
```

삭제 확인 입력 필드의 placeholder 변경 (현재 "Type DELETE to confirm"):
```tsx
placeholder={`이메일 주소를 입력하세요: ${user?.primaryEmailAddress?.emailAddress ?? ""}`}
```

삭제 버튼 disabled 조건 변경:
```tsx
disabled={deleteConfirm !== (user?.primaryEmailAddress?.emailAddress ?? "") || deleting}
```

- [ ] **Step 6: Toast 컴포넌트 렌더링 추가**

return 문 내 최상위 div 닫기 전에 추가:
```tsx
<Toast toasts={toasts} onRemove={removeToast} />
```

- [ ] **Step 7: 커밋**

```bash
git add src/app/settings/page.tsx
git commit -m "feat: settings 페이지 Toast 피드백, 이메일 삭제 확인, 병렬 fetch 개선"
```

---

## Task 11: [성능] 대시보드 병렬 fetch

**Files:**
- Modify: `src/app/dashboard/page.tsx`

- [ ] **Step 1: fetchUsage + fetchHistory를 Promise.all로 병렬화**

현재 `useEffect` (85-88번째 줄):
```ts
useEffect(() => {
  fetchUsage();
  fetchHistory();
}, [fetchUsage, fetchHistory]);
```

교체:
```ts
useEffect(() => {
  Promise.all([fetchUsage(), fetchHistory()]);
}, [fetchUsage, fetchHistory]);
```

- [ ] **Step 2: 커밋**

```bash
git add src/app/dashboard/page.tsx
git commit -m "perf: 대시보드 fetchUsage + fetchHistory 병렬 호출로 변경"
```

---

## Task 12: 전체 푸시

- [ ] **Step 1: main으로 푸시**

```bash
git push origin main
```

---

## Self-Review

**스펙 커버리지 체크:**
- ✓ 버그 1-1: pricing alert() → Task 5
- ✓ 버그 1-2: stripe null → Task 4
- ✓ 버그 1-3: clerk email fallback → Task 3
- ✓ 버그 1-4: generate 저장 오류 로깅 → 이미 완료
- ✓ 전환율 2-1: 80% 배너 → Task 7
- ✓ 전환율 2-2: UpgradeModal 비교 UI → Task 6
- ✓ 전환율 2-3: GuestGenerator CTA → Task 8
- ✓ UX 3-1: 스켈레톤 → Task 9
- ✓ UX 3-2: 빈 상태 → Task 9
- ✓ UX 3-3: Toast → Task 1 + Task 10
- ✓ UX 3-4: settings 저장 피드백 → Task 10
- ✓ 보안 4-1: Clerk svix 검증 → Task 3 (이미 올바르게 구현됨, 추가 수정 불필요)
- ✓ 보안 4-2: 이메일 삭제 확인 → Task 10
- ✓ 성능 5-1: 대시보드 병렬 fetch → Task 11
- ✓ 성능 5-2: settings 병렬 fetch → Task 10

**플레이스홀더 없음 ✓**
**타입 일관성: ToastMessage, createToastId 모두 Task 1에서 정의 후 Task 10에서 사용 ✓**
