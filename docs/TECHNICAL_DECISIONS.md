# Technical Decisions & Architecture (Expanded)

This document tracks the core engineering decisions, architectural patterns, and structural fixes made during the V4 Build. It exists to ensure that future developers understand *why* certain non-standard approaches were taken to ensure robustness, deployment safety, and rendering performance.

---

## 1. Dynamic Map Rendering (Bypassing SSR Crashes)

### 1.1 The Challenge of React-Leaflet in Next.js
The `LiveParticipantsMap.tsx` component is critical for tracking fleet movements during the event. It relies heavily on the `react-leaflet` library to render the interactive map tiles and markers. 
However, Next.js utilizes Server-Side Rendering (SSR) by default. When the Node.js server attempts to pre-render the Leaflet components, Leaflet instantly attempts to access the browser's `window` object to calculate screen dimensions and DOM elements. Since `window` does not exist on the server, this immediately causes a fatal compilation crash (`ReferenceError: window is not defined`), completely breaking the build pipeline.

### 1.2 The Solution: Dynamic Imports
To circumvent this architectural clash, we employed Next.js Dynamic Imports (`next/dynamic`). 
- **The Execution:** We wrapped the map component in a dynamic loader and explicitly passed the `{ ssr: false }` flag. 
- **The Result:** This strictly instructs the Next.js compiler to completely ignore this component during the server-side rendering pass. The map is exclusively booted up and rendered on the client side once the DOM is fully loaded and the `window` object is safely available. This prevents all build crashes while ensuring the heavy map payload doesn't block the initial server response.

### 1.3 Leaflet CSS Marker Limitations
Leaflet uses a very specific internal mechanism for generating custom map markers (`L.divIcon`). 
- **The Bug:** When attempting to pass complex Tailwind CSS utility classes into the `className` or `html` properties of a `divIcon`, Leaflet would frequently strip the classes or fail to render them because the elements are injected outside the standard React DOM tree, occasionally bypassing Tailwind's JIT compiler scope.
- **The Fix:** We completely abandoned relying on Tailwind for the dynamically generated map markers. Instead, we architected a strict inline CSS payload (`style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; box-shadow: 0 0 10px ${color};"`). This guarantees that the pulsating live nodes will render perfectly over the Dar es Salaam map tiles, entirely independent of the Tailwind engine's reach.

---

## 2. Webhook Resilience & Environment Variables

### 2.1 The Supabase Key Crash
The application features a secure payment webhook (`src/app/api/webhooks/payment/route.ts`) designed to catch callbacks from AzamPay or Mobile Money aggregators. To update a user's payment status securely, the webhook must bypass standard Row Level Security (RLS) policies.
- **The Architecture:** To bypass RLS, the webhook initializes a specialized Supabase client using the `SUPABASE_SERVICE_ROLE_KEY`.
- **The Bug:** The `supabase-js` client is extremely strict. If the `SUPABASE_SERVICE_ROLE_KEY` environment variable is missing (which is highly common during initial local development, new developer onboarding, or in automated Vercel Preview Deployments), the `createClient` function immediately throws a fatal `Error: supabaseKey is required`. This doesn't just fail the API route; it crashes the entire Next.js development server and halts all local work.

### 2.2 The Fallback Initialization Strategy
We refuse to let missing production keys break local development environments.
- **The Fix:** We refactored the initialization block to provide robust, guaranteed string fallbacks:
```typescript
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key-to-prevent-crash'

const supabase = createClient(supabaseUrl, supabaseServiceKey)
```
- **The Result:** The Next.js compiler will now successfully boot up perfectly every single time, regardless of the `.env` state. The webhook will still correctly fail if an actual payment ping hits it without real keys, but it will never again crash the development server during build time.

---

## 3. Theme Context Abstraction & Global CSS Safety

### 3.1 Unifying the Layout State
The application requires a seamless aesthetic transition from public landing pages into the deeply specialized Athlete Dashboard.
- **The Challenge:** Initially, the `AthleteDashboard` was hardcoding its dark mode variables (`bg-royal-night text-white`). However, it sits inside the `ParticipantLayout` which controls the sidebars and navigation via a React context (`ParticipantThemeContext`). If a user switched their global preference to light mode, the layout would turn white while the dashboard remained a hardcoded dark blue, destroying the visual cohesion.
- **The Fix:** We abstracted the dashboard's root container to directly consume the context hook (`const { theme } = useParticipantTheme()`). We implemented a conditional `cn()` utility wrapper that dynamically flips the dashboard's core structural colors based on the state. This unified the entire participant portal under a single, predictable state machine.

### 3.2 The Tailwind Dictionary Standardization
As documented in the UI Architecture spec, legacy color variables (`navy`, `sand`, `bronze`) were causing silent failures across the application.
- **The Technical Decision:** Instead of relying on arbitrary hex codes scattered across fifty different component files, we centralized all color variables into the `tailwind.config.ts` dictionary. By mapping the legacy names to the new brand hex codes, we essentially created a translation layer at the compiler level. The Tailwind JIT compiler now reads `text-navy` and instantly compiles it to `#081B3F` without the developer needing to touch the underlying component code. This ensures absolute technical adherence to the brand guidelines with zero refactoring overhead.

---
*End of Technical Decisions Document. Generated for Tour de Dar V4 Build.*
