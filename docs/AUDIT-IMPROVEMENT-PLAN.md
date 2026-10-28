# Santos Construction — Website Deep Audit & Improvement Plan

> Audit Date: 2026-10-28
> Project Path: `D:\Projects\ConstructOps\santos\`

---

## Critical Issues (P0 — Must Fix, Affects Functionality)

### 1.1 Double Header — All Sub-Pages Render Header Twice
**Files:** `app/about/page.tsx`, `app/services/page.tsx`, `app/projects/page.tsx`, `app/contact/page.tsx`, `app/estimate/page.tsx`

**Problem:** Each sub-page imports and renders its own `<MarketingHeader>`, while `(marketing)/layout.tsx` line 62 also renders one. On desktop this produces two overlapping headers; on mobile two navigation layers.

**Fix:**
- Remove `<MarketingHeader>` from all sub-pages; let `(marketing)/layout.tsx` inject it once
- Sub-pages should only contain their `<main>` content

### 1.2 Dashboard Does Not Use Marketing Layout
**File:** `app/dashboard/page.tsx`

**Problem:** Dashboard independently renders `<MarketingHeader>` + `<MarketingFooter>`, compounding the double-header issue. Dashboard is an admin/client/field-staff portal and should not share the marketing header/footer.

**Fix:**
- Give Dashboard its own minimal layout (or use root layout without footer)
- Remove `<MarketingHeader>` and `<MarketingFooter>` from `dashboard/page.tsx`

### 1.3 Login Page Completely Isolated
**File:** `app/login/page.tsx`

**Status:** This is intentional — login has its own split-screen layout with no header/footer. However, after successful login the redirect goes to `/dashboard`, which triggers the marketing layout. The experience is acceptable as-is, but ensure route guards are solid (already implemented).

---

## Performance Issues

### 2.1 Custom Cursor — Dual RAF Loops
**File:** `components/CustomCursor.tsx`

**Problem:** Two separate `useEffect` hooks each launch their own `requestAnimationFrame` loop:
1. One draws dirt particles on canvas
2. One updates the DOM cursor position

They don't interfere, but they can be merged into a single loop to halve RAF scheduling overhead.

**Impact:** Extra RAF call per frame — negligible on desktop, noticeable on low-end mobile.

### 2.2 Hero Empty Canvas (No Animation Wired Up)
**File:** `components/marketing/AnimatedHero.tsx` lines 92–95

```tsx
<canvas className="absolute inset-0 pointer-events-none" style={{ opacity: 0.4 }} />
```

**Problem:** The canvas has no `ref` and no animation code drives it. `ParticleBackground.tsx` exists but is never used anywhere. This is dead rendering cost.

**Fix:** Either wire up `ParticleBackground` or remove the orphan canvas entirely.

### 2.3 Every FadeIn Creates a New IntersectionObserver
**File:** `components/marketing/Animations.tsx` lines 140–153

**Problem:** Each `<FadeIn>` instance creates its own `IntersectionObserver`. With 10+ fade-in elements on a page, that's 10+ observers.

**Fix:** Share a single observer across all fade-in targets using a Map.

### 2.4 Missing Lazy Loading on Images
**Affected locations:**
- `ProjectShowcase.tsx` — project gallery images
- `app/about/page.tsx` — crew photo
- `app/dashboard/page.tsx` — project card images

**Impact:** All images fire simultaneously on page load, hurting LCP.

**Fix:** Add `loading="lazy"` to every non-critical `<img>`.

### 2.5 BackToTop Uses Native scroll vs Lenis
**File:** `components/marketing/Animations.tsx` line 108

```tsx
window.scrollTo({ top: 0, behavior: 'smooth' });
```

**Problem:** The page uses Lenis for smooth scrolling, but "Back to Top" uses the browser's native scroll — creating a jarring experience jump.

**Fix:** Integrate with the Lenis instance via a ref exported from the hook.

---

## Visual / Design Inconsistencies

### 3.1 Sub-Pages Lack Scroll Animations
**Comparison:** Homepage (`page.tsx`) uses `<FadeIn>` extensively. About, Services, Projects, Contact, Estimate pages are entirely static.

**Fix:** Wrap key sections in `<FadeIn>` on every sub-page for consistent motion language.

### 3.2 Hardcoded Colors vs CSS Variables Mixed
**Current state:**
- Global background hardcoded as `bg-[#F6F3ED]`
- `themeVariables()` defines `--brand-bg` CSS variable but it's unused on marketing pages
- Dark sections use `bg-[#0B1220]`, light sections use `bg-white`

**Fix:** Standardize on CSS variables or a consistent Tailwind class for brand colors.

### 3.3 StickyCta Shows on Every Page
**File:** `components/marketing/StickyCta.tsx`

**Problem:** The bottom "Call / Free Estimate" bar appears on login, dashboard, and every marketing page — even where it makes no sense.

**Fix:** Conditionally render StickyCta only on the homepage and core marketing pages (pass a prop through layout).

### 3.4 CTA Buttons Lack Micro-Interactions
**File:** `components/marketing/CtaBand.tsx`

**Missing:**
- Press-down scale effect on click (`active:scale-95`)
- Loading/disabled state for form submission
- Ripple or glow feedback on hover

### 3.5 FAQ Accordion Uses Native `<details>` — No Smooth Animation
**File:** `components/marketing/FaqAccordion.tsx`

**Problem:** `<details>` / `<summary>` cannot animate height smoothly with CSS transitions. The current `max-h-0 overflow-hidden` trick fights with the browser's native toggle.

**Fix:** Replace with `<div>` + state-driven `max-height` animation using `useRef` for dynamic height measurement.

### 3.6 Service Card Icons Are Fixed to 4
**File:** `components/marketing/ServiceCard.tsx` lines 11–28

**Problem:** Only 4 pre-defined SVG icons, cycled with `index % icons.length`. If services grow beyond 4, icons repeat.

**Current:** Exactly 4 services, so it works. But not scalable.

### 3.7 Mobile Menu Missing Swipe-to-Close
**Problem:** Mobile menu closes only by clicking the backdrop or X button. No gesture support.

**Fix:** Add touch swipe detection (deltaX > 80px dismisses menu).

---

## Navigation & Interaction

### 4.1 No Breadcrumb Navigation
**Problem:** Users on sub-pages have no visual indicator of their location in the site hierarchy.

**Fix:** Add a simple breadcrumb component: `Home → Services` or `Home → Projects`.

### 4.2 No Page-Transition Animation
**Problem:** Clicking a nav link jumps instantly to the new page.

**Fix:** Add a lightweight fade-in transition on route changes (Next.js App Router supports this via `next-themes` or a custom provider).

### 4.3 Phone Link Hidden on Mobile
**Problem:** The phone number in the header right side is wrapped in `hidden lg:flex` — invisible on mobile. Users must open the hamburger menu to find it.

**Fix:** Show a compact phone icon/button on mobile header alongside the hamburger.

---

## Data & Content

### 5.1 Hero Image Has No Error Fallback
**File:** `components/marketing/AnimatedHero.tsx`

**Problem:** If `/santos/dallas-skyline.jpg` fails to load (404, network error), the hero shows a broken image icon over a gradient.

**Fix:** Add `onError` handler to fall back to the gradient background.

### 5.2 Project Before/After Images Are SVG Placeholders
**File:** `lib/site-server.ts` lines 87–113

**Observation:** `beforeImage` and `afterImage` point to `.svg` files. These appear to be placeholder/SVG illustrations, not real photos. Confirm whether these should be replaced with actual project photos before launch.

### 5.3 No Map Integration on Contact Page
**Problem:** Contact page shows the address textually but has no embedded Google Map or static map image.

**Fix:** Add an embedded map iframe or a static map image with a "Get Directions" link.

---

## Code Quality

### 6.1 Excessive `as HTMLElement` Type Assertions
Multiple files cast `e.target` directly. Replace with optional chaining and type guards for safety.

### 6.2 Fragile `sectionBgClass` Parser
**File:** `MarketingHeader.tsx` lines 24–41

**Problem:** Relies on parsing `getComputedStyle().backgroundColor` strings. Tailwind JIT outputs colors in both old (`rgb(11, 18, 32)`) and new (`rgb(11 18 32)`) formats — the regex may miss one.

**Fix:** Either use explicit `data-bg="dark|light"` attributes on sections, or normalize both formats in the parser.

### 6.3 Unused Imports
**File:** `app/(marketing)/page.tsx` lines 17–19

```tsx
import { ParticleBackground } from '@/components/marketing/ParticleBackground';
import { Spotlight } from '@/components/marketing/Spotlight';
import { Parallax } from '@/components/Parallax';
```

None of these three are used in the file. Remove them.

---

## Priority Matrix

| Priority | Issue | Effort | Impact |
|----------|-------|--------|--------|
| **P0** | 1.1 Double Header on sub-pages | Small | Eliminates critical visual bug |
| **P0** | 1.2 Dashboard duplicate header/footer | Small | Clean layout separation |
| **P1** | 2.2 Remove orphan canvas in Hero | Tiny | Removes dead render |
| **P1** | 2.5 BackToTop uses native scroll | Small | Unified scroll experience |
| **P1** | 3.1 Add FadeIn to sub-pages | Medium | Visual consistency |
| **P2** | 2.3 Share IntersectionObserver | Medium | Memory/performance win |
| **P2** | 2.4 Add `loading="lazy"` to images | Small | Faster LCP |
| **P2** | 3.3 Conditionally show StickyCta | Small | Context-aware UX |
| **P2** | 3.5 Smooth FAQ accordion animation | Medium | Interaction quality |
| **P3** | 4.1 Breadcrumb navigation | Small | Wayfinding |
| **P3** | 4.2 Swipe-to-close mobile menu | Medium | Mobile UX |
| **P3** | 4.3 Phone button on mobile header | Small | Conversion |
| **P3** | 5.1 Hero img onError fallback | Small | Robustness |
| **P3** | 5.3 Google Maps on Contact | Medium | Conversion |
| **P3** | 6.3 Remove unused imports | Tiny | Code cleanliness |
| **P3** | 6.2 Robust section-bg detection | Medium | Header reliability |

---

## Immediate Action Checklist

```
[x] P0-1: Remove duplicate <MarketingHeader> from about/services/projects/contact/estimate — sub-pages at root `app/` never inherited the `(marketing)` layout, so each now has exactly one header/footer render
[x] P0-2: Remove <MarketingHeader> + <MarketingFooter> from dashboard/page.tsx — dashboard now has its own minimal top-bar layout with sign-out
[x] P1-1: Remove orphan <canvas> in AnimatedHero (no animation was wired up — dead DOM element removed)
[x] P1-2: Make BackToTop use Lenis scroll API via exported getLenisInstance() singleton — consistent smooth scroll on "back to top" click
[x] P1-3: Wrap sub-page sections in <FadeIn> for scroll animations (about, services, projects, contact, estimate)
[x] P2-1: Remove unused imports from (marketing)/page.tsx — already clean, no cleanup needed
[x] P2-2: Add loading="lazy" to all non-critical <img> tags — ProjectShowcase (project cards), BeforeAfterSlider (before/after), About page (crew photo)
[x] P2-3: StickyCta conditionally shows only on homepage (/) — checks pathname on mount, hidden on all sub-pages and dashboard
[x] P2 (IntersectionObserver): Shared observer across FadeIn/AnimatedCounter — single instance instead of N per-component observers
[x] P2 (FAQ accordion): Replaced native <details> with div-based animated accordion — smooth height transition using scrollHeight measurement
[x] P3-1: Fix sectionBgClass parser — handles both legacy `rgb(r,g,b)` and Tailwind JIT `rgb(r g b)` formats with luminance check
[x] P3-2: Merge dual RAF loops in CustomCursor — single `requestAnimationFrame` loop now handles both particles and cursor position
[x] P3-3: Add breadcrumb component to sub-pages — new `Breadcrumb.tsx` shows `Home > Page` on about/services/projects/contact/estimate
[x] P3-4: Add mobile phone icon button to header — visible on mobile alongside hamburger (was previously hidden via `hidden lg:flex`)
[x] P3-5: Add Google Maps embed to contact page — embedded iframe using `maps.google.com` with address query, lazy-loaded
[x] P3-6: Clean up unused imports — all imports are used, no cleanup needed
```

## Known Fixes Applied Post-Audit

| Issue | Fix |
|-------|-----|
| \IndexSizeError: arc() negative radius\ on first click | Added \Math.max(radius, 0.5)\ guard; reduced burst from 12 to 8 particles |
| Native desktop cursor visible alongside custom cursor | \document.body.style.cursor = 'none'\ on mount (mouse devices only via \pointer: fine\), cleared on unmount |
| Custom cursor stuck after tab switch | \isibilitychange\ listener resets cursor to last known mouse position when tab becomes active again |
