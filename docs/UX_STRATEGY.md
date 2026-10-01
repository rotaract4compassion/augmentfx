# UX Strategy & Implementation

This document outlines the User Experience (UX) strategies, performance improvements, and accessibility (a11y) fixes implemented during the V4 Build.

## 1. Performance & Core Web Vitals
- **Image Optimization Engine:** 
  - **Issue:** Legacy code relied on raw HTML `<img>` tags for high-resolution hero assets, resulting in massive payloads and destructive layout shifts (CLS).
  - **Decision:** Conducted a comprehensive refactor replacing all `<img>` tags with Next.js `<Image>` components (`next/image`). By leveraging `fill` and `priority` directives on above-the-fold content (like `HeroSection.tsx`), we forced the framework to auto-serve WebP formats, massively accelerating LCP (Largest Contentful Paint).

## 2. Accessibility (a11y) & Ergonomics
- **Touch Targets:**
  - **Issue:** Several operational buttons in the Admin Gala portal and Athlete dashboard were sized purely based on text padding (e.g., resulting in ~32px heights), failing standard mobile touch heuristics.
  - **Decision:** Enforced a strict minimum height of `min-h-[44px]` on all interactive grid buttons and edit links. This ensures the app is highly usable on physical mobile devices by tired athletes or busy admins.
- **Contrast Ratios:**
  - **Issue:** Disabled elements (like the locked Digital Certificate) used `text-white/40` on top of low-opacity white backgrounds, rendering the text invisible to users with visual impairments.
  - **Decision:** Darkened the parent backgrounds of locked states (`bg-[#051126]`) and boosted text opacities (`text-white/60`) to explicitly meet WCAG AA contrast standards.

## 3. Micro-Interactions
- **Action Grids:**
  - **Decision:** Added CSS-native scale interactions (`active:scale-95`) to the primary dashboard buttons. When a user presses "View Route Guide", the button physically depresses, creating a tactile feedback loop that feels native and responsive.
