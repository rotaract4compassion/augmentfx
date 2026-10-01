'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import type { User } from '@supabase/supabase-js'
import { motion, useScroll, useTransform } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Events', href: '/#events' },
  { label: 'Impact', href: '/impact' },
  { label: 'Our Story', href: '/story' },
  { label: 'Sponsors', href: '/sponsors' },
  { label: '#Move', href: '/move' },
]

export default function HomeNav() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const { scrollY } = useScroll()
  // Fade in background from transparent to solid after 50px of scroll
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 1])
  const borderColor = useTransform(scrollY, [0, 50], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.04)'])

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSignOut() {
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  const initial = user
    ? (user.user_metadata?.full_name as string | undefined)?.charAt(0).toUpperCase()
      ?? user.email?.charAt(0).toUpperCase()
      ?? '?'
    : null

  return (
    <motion.nav 
      className="fixed top-0 w-full z-[100] px-5 py-4 flex items-center justify-between transition-colors"
      style={{
        backgroundColor: useTransform(bgOpacity, v => `rgba(8, 27, 63, ${v * 0.95})`),
        backdropFilter: useTransform(bgOpacity, v => `blur(${v * 12}px)`),
        borderBottom: useTransform(borderColor, v => `1px solid ${v}`)
      }}
    >

      {/* Brand / Logo */}
      <Link href="/" className="flex items-center gap-3 focus-visible:outline-none">
        <img 
          src="/images/logo-full.jpg" 
          alt="Tour de Dar & Rotary Logo"
          className="h-10 w-auto rounded-sm object-contain bg-white"
        />
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        {NAV_LINKS.map(link => (
          <Link 
            key={link.label} 
            href={link.href}
            className="font-sans text-[12px] uppercase tracking-widest font-bold text-white/70 hover:text-white transition-colors focus-visible:outline-none"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Auth / Actions */}
      <div className="flex items-center gap-4 sm:gap-6">
        
        <Link
          href="/sponsor"
          className="hidden md:flex font-sans text-[12px] font-bold text-gold hover:text-cream uppercase tracking-wider transition-colors focus-visible:outline-none"
        >
          Sponsor Us
        </Link>

        {loading ? (
          <div className="w-24 h-10 rounded-pill bg-white/10 animate-pulse" />
        ) : user ? (
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-gold text-royal-night flex items-center justify-center font-display text-[16px]">
              {initial}
            </div>
            <Link
              href="/dashboard"
              className="font-sans text-[12px] font-bold text-white/80 hover:text-gold transition-colors focus-visible:outline-none hidden sm:block"
            >
              My Portal
            </Link>
            <button
              onClick={handleSignOut}
              className="font-sans text-[12px] font-bold text-white/40 hover:text-white transition-colors focus-visible:outline-none"
            >
              Sign out
            </button>
          </div>
        ) : (
          <Link
            href="/register"
            className="font-sans text-[13px] font-bold text-royal-night uppercase tracking-wider bg-gold rounded-pill px-6 py-2.5 min-h-[44px] flex items-center hover:bg-cream hover:shadow-[0_0_20px_rgba(248,245,240,0.4)] active:scale-95 transition-all focus-visible:outline-none shadow-gold"
          >
            Join Us
          </Link>
        )}
      </div>
    </motion.nav>
  )
}
