# Scriva Hero 섹션 3D 인터랙티브 디자인 스펙

**날짜:** 2026-04-16
**상태:** 승인 대기
**범위:** `src/components/HeroSection.tsx`, `src/components/Scene.tsx`, `src/app/page.tsx` (Hero 교체)

---

## 1. 목표

기존 텍스트 중심 Hero 섹션을 풀스크린 3D 인터랙티브 배경 + 중앙 글래스모피즘 UI 구조로 업그레이드. 나머지 랜딩 페이지 섹션(GuestGenerator, Features, Pricing 등)은 변경하지 않는다.

---

## 2. 레이아웃 구조

```
<section> (Hero, position: relative, min-h-screen)
  ├── <Scene /> (Canvas, position: absolute, inset-0, z-index: 0)
  │     └── 3D Icosahedron + 파티클 + 조명
  └── <div> (콘텐츠, position: relative, z-index: 10)
        ├── 배지 (Powered by GPT-4o)
        ├── H1 카피
        ├── 서브 카피
        ├── CTA 버튼 (Start Creating Now)
        └── 소셜 프루프 통계
```

- Canvas는 Hero 섹션 전체를 배경으로 채운다 (`position: absolute, inset: 0`)
- 텍스트/UI는 Canvas 위에 글래스모피즘 카드 또는 직접 오버레이

---

## 3. 3D 씬 (Scene.tsx)

### 3.1 오브젝트

**메인: 와이어프레임 Icosahedron**
- `<mesh>` + `IcosahedronGeometry(detail=1)` + `<meshStandardMaterial wireframe />`
- 크기: radius 2.2
- 색상: `#06b6d4` (cyan-500) → wireframe 라인
- 위치: 화면 우측 중앙 (x: 2.5, y: 0, z: 0)
- 기본 자동 회전: x축 0.001 rad/frame, y축 0.002 rad/frame

**보조: 파티클 시스템**
- `<Points>` 컴포넌트 (drei), 200~300개 랜덤 구 배치
- 색상: cyan/purple 혼합 (`#7c3aed`, `#06b6d4`)
- 크기: 0.015~0.02
- 느린 자체 회전으로 ambient 분위기 형성

### 3.2 조명

```
- ambientLight: intensity 0.3
- pointLight: position [10, 10, 10], color #06b6d4, intensity 1.5
- pointLight: position [-10, -5, -5], color #7c3aed, intensity 1.0
- directionalLight: position [0, 5, 5], intensity 0.5
```

### 3.3 마우스 인터랙션

`useFrame` + `useRef`로 구현:
- 마우스 X/Y 델타를 Icosahedron rotation에 lerp 적용 (계수: 0.05)
- CTA 버튼 hover 시 Icosahedron scale 1.0 → 1.15 (lerp 0.08)
- 스크롤에 따라 Icosahedron z축 이동 (parallax 효과)

### 3.4 성능 최적화

- `<Suspense fallback={null}>` 로 캔버스 래핑
- `frameloop="demand"` — 마우스/스크롤 이벤트 시에만 재렌더
- `dpr={[1, 1.5]}` — 디바이스 픽셀비 캡
- `gl={{ antialias: true, alpha: true }}` — 투명 배경으로 CSS 배경과 합성

---

## 4. UI (HeroSection.tsx)

### 4.1 배경

```css
background: radial-gradient(ellipse at 60% 50%, rgba(6,182,212,0.08) 0%, transparent 60%),
            radial-gradient(ellipse at 30% 70%, rgba(124,58,237,0.08) 0%, transparent 60%),
            #080812
```

### 4.2 텍스트 콘텐츠

| 요소 | 내용 |
|------|------|
| 배지 | "Powered by GPT-4o — the most capable AI model" |
| H1 | "Your YouTube Scripts,<br/>AI-Powered in Seconds." |
| 서브카피 | "아이디어만 입력하세요. 기획부터 대본 완성까지 Scriva가 책임집니다." |
| CTA Primary | "Start Creating Now" (→ /sign-up) |
| CTA Secondary | "Try Free — No Sign Up" (→ #try-free) |
| 소셜 프루프 | 12,000+ scripts · 3,400+ creators · 4.9/5 rating |

### 4.3 CTA 버튼 스타일

- 기본: `bg-gradient(135deg, #06b6d4, #7c3aed)`, border-radius: 12px
- Hover: `box-shadow: 0 0 30px rgba(6,182,212,0.4)` glow + Scene에 scale 신호 전달
- hover 상태를 `useState`로 관리 → Scene에 prop으로 전달

### 4.4 글래스모피즘

배지와 소셜 프루프 컨테이너에 적용:
```css
background: rgba(255,255,255,0.03)
border: 1px solid rgba(6,182,212,0.15)
backdrop-filter: blur(12px)
```

### 4.5 Framer Motion 애니메이션

기존 `page.tsx`의 fade-up 패턴 동일하게 적용:
- 배지: delay 0, duration 0.5
- H1: delay 0.05, duration 0.65
- 서브카피: delay 0.12, duration 0.65
- CTA: delay 0.2, duration 0.5
- 소셜 프루프: delay 0.4, duration 0.5

---

## 5. 파일 구조

```
src/
  components/
    HeroSection.tsx   ← 신규: Hero UI + Canvas 조합
    Scene.tsx         ← 신규: R3F Canvas + 3D 씬
  app/
    page.tsx          ← 기존 Hero <section> → <HeroSection /> 한 줄 교체
```

---

## 6. 의존성

신규 설치 필요:
```bash
npm install @react-three/fiber @react-three/drei three
npm install @types/three
```

기존 의존성 활용:
- `framer-motion` — 이미 설치됨
- `tailwindcss` — 이미 설치됨

---

## 7. TypeScript 타입

```ts
// Scene.tsx props
interface SceneProps {
  mouseX: number;      // -1 ~ 1 정규화된 마우스 X
  mouseY: number;      // -1 ~ 1 정규화된 마우스 Y
  ctaHovered: boolean; // CTA 버튼 hover 상태
}

// HeroSection.tsx — 내부 상태만 관리, 외부 props 없음
```

---

## 8. 범위 외 (변경하지 않는 것)

- GuestGenerator 섹션
- Features / How it works / Script Showcase 섹션
- Pricing / Testimonials / FAQ 섹션
- Navbar, Footer
- 모든 API 라우트
- Supabase/Clerk 연동 코드
