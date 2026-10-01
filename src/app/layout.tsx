import type { Metadata, Viewport } from 'next'
import { Anton, Montserrat } from 'next/font/google'
import { UserProvider } from '@/context/UserContext'
import { SITE } from '@/config/site'
import './globals.css'

// ── Anton — Display & Numerals ──────────────────────────────────────────────
const anton = Anton({
  subsets:  ['latin'],
  variable: '--font-anton',
  display:  'swap',
  weight:   ['400'],
})

// ── Montserrat — UI & Body ────────────────────────────────────────────────
const montserrat = Montserrat({
  subsets:  ['latin'],
  variable: '--font-montserrat',
  display:  'swap',
  weight:   ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default:  SITE.name,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.tagline,
  keywords: [
    'charity race', 'swimming', 'cycling', 'running',
    'Tour de Dar', 'cancer awareness',
  ],
  openGraph: {
    title:       SITE.name,
    description: SITE.tagline,
    url:         SITE.url,
    siteName:    SITE.name,
    locale:      'en_TZ',
    type:        'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       SITE.name,
    description: SITE.tagline,
  },
  robots: { index: true, follow: true },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE.shortName,
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport: Viewport = {
  width:        'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor:   '#17458F', // royal
  viewportFit:  'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${montserrat.variable}`}
    >
      <body className="antialiased font-sans bg-royal text-white selection:bg-gold selection:text-royal-night">
        {/* SVG Filter for Stencil Distress (V2 direction) */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
          <filter id="distress">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2" in="noise" result="coloredNoise" />
            <feComposite operator="in" in="SourceGraphic" in2="coloredNoise" result="composite" />
            <feBlend mode="multiply" in="composite" in2="SourceGraphic" />
          </filter>
        </svg>
        
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
