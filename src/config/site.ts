// ─────────────────────────────────────────────────────────────────────────────
// Tour de Dar — Site Config
// Single source of truth for site metadata. Used by layout, home sections,
// and SEO. Keep in sync with event_config in Supabase.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name:      'Tour de Dar 2026',
  tagline:   'Every Step. Every Mile. Every Effort Creates a Lasting Impact.',
  shortName: 'TdDar',
  organiser: 'Rotary District 9214',
  url:       process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tourdedar.co.tz',

  event: {
    date:     '2026-11-01',
    location: 'Dar es Salaam, Tanzania',
    venue:    "Police Officers' Mess, Masaki, Dar es Salaam",
  },

  cause: {
    line: 'A Rotary health awareness campaign to raise funds for cancer care.',
  },

  clubs: [
    'Rotary Club of E Masaki',
    'Rotary Club of Dar North',
    'Rotaract Tanzania',
    'Rotary Club of Kigamboni',
    'Rotary Club of Mbweni',
    'Satellite Rotary Club of Madras Midtown'
  ],

  contact: {
    email: 'info@tourderotarydsm.org',
  },

  social: {
    facebook: 'https://facebook.com/tourderotarydsm',
    instagram: 'https://instagram.com/tourderotarydsm',
    youtube: 'https://youtube.com/@tourderotarydsm',
  },

  description: 'A Rotary health awareness campaign to raise funds for cancer care.',
} as const

// ── Disciplines — re-exported here for home section convenience ───────────────
// Canonical definition lives in src/config/categories.ts
export { DISCIPLINES } from '@/config/categories'
