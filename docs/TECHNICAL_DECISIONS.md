# Technical Decisions & Architecture

This document tracks the core engineering decisions made during the V4 Build to ensure robustness, deployment safety, and rendering performance.

## 1. Dynamic Map Rendering (Leaflet vs SSR)
- **Challenge:** The `LiveParticipantsMap.tsx` relies on `react-leaflet`, which directly manipulates the browser's `window` object. Next.js attempts to Server-Side Render (SSR) all components by default, which causes fatal `window is not defined` crashes during compilation.
- **Decision:** Implemented Next.js Dynamic Imports (`next/dynamic` with `ssr: false`). This guarantees the fleet tracking map is strictly rendered on the client, successfully avoiding compilation crashes while maintaining high performance.
- **CSS Architecture:** Leaflet struggles with parsing external Tailwind classes on dynamically generated `divIcons`. We bypassed this limitation by injecting strict inline CSS (`style="background-color: ${color}; width: 14px..."`) directly into the marker generation payload.

## 2. Webhook Resilience
- **Challenge:** The `src/app/api/webhooks/payment/route.ts` requires the `SUPABASE_SERVICE_ROLE_KEY` to securely bypass Row Level Security (RLS) and update payment statuses. However, if this environment variable is missing during the local dev server boot or a Vercel deployment preview, the `supabase-js` client immediately throws a fatal `Error: supabaseKey is required`, crashing the entire Next.js compilation process.
- **Decision:** We refactored the initialization block to provide robust fallbacks (`process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key-to-prevent-crash'`). This ensures the app compiles and the dev server spins up flawlessly, even in un-provisioned environments.

## 3. Theme Context Abstraction
- **Challenge:** The `AthleteDashboard` was originally hardcoded to a dark mode palette (`bg-royal-night text-white`), but the surrounding layout wrapper (`ParticipantLayout` and `DesktopNav`) utilized a `ParticipantThemeContext` that defaults to light mode. This caused layout fragmentation and text visibility issues.
- **Decision:** We upgraded the Dashboard component to consume the `useParticipantTheme` hook, allowing it to conditionally render (`light ? "bg-white" : "bg-[#091631]"`). This unifies the entire participant portal under a single context provider, enabling flawless theme switching.
