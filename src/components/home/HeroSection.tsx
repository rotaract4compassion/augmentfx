'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { SITE } from '@/config/site'

type Mode = 'cycling' | 'running' | 'walking'

const MODES = {
  cycling: {
    label: 'Cycling',
    word: 'MILE',
    athlete: '/images/cycling.jpg',
    distances: ['20 km', '40 km'],
    accent: 'text-gold',
    bg: 'bg-gold',
  },
  running: {
    label: 'Marathon',
    word: 'STEP',
    athlete: '/images/running.jpg',
    distances: ['5K', '10K', '15K', '20K'],
    accent: 'text-sky',
    bg: 'bg-sky',
  },
  walking: {
    label: 'Walkathon',
    word: 'EFFORT',
    athlete: '/images/impact.jpg', // Placeholder since I don't have walkathon specific
    distances: ['Distances TBC'],
    accent: 'text-ribbon',
    bg: 'bg-ribbon',
  }
}

export default function HeroSection() {
  const [mode, setMode] = useState<Mode>('cycling')
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentMode = MODES[mode]

  const stampAnim = prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: [0, 1], scale: [1.2, 0.95, 1] }
  const stampTransition = { duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }

  const athleteRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !athleteRef.current) return
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    setMousePos({
      x: ((clientX / innerWidth) - 0.5) * 30,
      y: ((clientY / innerHeight) - 0.5) * 30,
    })
  }

  if (!mounted) return <div className="min-h-screen bg-royal-night" /> 

  return (
    <section 
      className="relative min-h-[100dvh] flex flex-col justify-end pt-32 pb-16 overflow-hidden bg-royal-night duotone"
      onMouseMove={handleMouseMove}
    >
      <Image 
        src="/images/hero-bg.jpg" 
        alt="Start line crowd"
        fill
        priority
        className="absolute inset-0 object-cover opacity-60 pointer-events-none"
      />

      <div className="absolute top-24 left-0 w-full px-5 lg:px-12 xl:px-16 flex items-center justify-between z-20 pointer-events-none">
        <div className="font-sans text-[10px] uppercase tracking-widest text-cream/70 font-bold">Rotary</div>
        <div className="font-display text-[22px] uppercase text-cream tracking-wide">Tour de Dar 2026</div>
        <div className="font-sans text-[10px] uppercase tracking-widest text-cream/70 font-bold">Rotaract</div>
      </div>

      <div className="relative z-10 w-full px-5 lg:px-12 xl:px-16 max-w-wide mx-auto flex flex-col md:flex-row items-end justify-between gap-12 h-full">
        
        <div className="relative z-30 flex-1 max-w-3xl flex flex-col justify-end h-full pointer-events-auto">
          
          <div className="flex flex-wrap items-center gap-2 mb-6 uppercase font-sans text-[11px] font-bold tracking-[0.2em] text-white/50">
            {(Object.keys(MODES) as Mode[]).map((m, i) => (
              <div key={m} className="flex items-center gap-2">
                <button
                  onClick={() => setMode(m)}
                  className={`transition-colors hover:text-white focus-visible:outline-none py-2 ${mode === m ? 'text-cream' : ''}`}
                >
                  {MODES[m].label}
                </button>
                {i < 2 && <span>•</span>}
              </div>
            ))}
          </div>

          <motion.h1 
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.2 }}
            animate={stampAnim}
            transition={stampTransition}
            className="font-display text-hero uppercase text-cream tracking-tight mb-4 stencil-distress"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.6)' }}
          >
            EVERY{' '}
            <span key={mode} className={`inline-block animate-slide-left ${currentMode.accent}`}>
              {currentMode.word}
            </span>
            <br />
            CREATES A LASTING IMPACT
          </motion.h1>

          <p className="font-sans text-body-lg text-white/90 leading-[1.6] mb-10 max-w-xl">
            {SITE.cause.line}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-12">
            {currentMode.distances.map(d => (
              <span key={d} className={`px-4 py-1.5 rounded-pill font-sans text-[12px] font-bold text-royal-night uppercase tracking-[0.08em] ${currentMode.bg}`}>
                {d}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-4">
            <div className="bg-gold text-royal-night px-6 py-3 rounded-[4px] shadow-gold">
              <span className="font-display text-[28px] leading-none block">01 NOV 2026</span>
            </div>
            
            <div className="font-sans text-[13px] text-cream/80 font-medium uppercase tracking-widest border-l border-white/20 pl-6">
              Police Officers' Mess<br />Masaki, Dar es Salaam
            </div>

            <div className="mt-4 sm:mt-0 ml-0 sm:ml-auto flex items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-8 py-5 bg-white/10 text-white rounded-pill font-sans font-extrabold text-[13px] uppercase tracking-wider hover:bg-white/20 active:scale-95 transition-all backdrop-blur-sm border border-white/20"
              >
                Athlete Portal
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-10 py-5 bg-gold text-royal-night rounded-pill font-sans font-extrabold text-[15px] uppercase tracking-wider hover:bg-cream active:scale-95 transition-all shadow-gold"
              >
                Join Us
              </Link>
            </div>
          </div>

        </div>

        <div className="relative w-full md:w-1/3 flex justify-end items-end h-[350px] md:h-[500px] pointer-events-none group">
          <motion.div 
            ref={athleteRef}
            className="absolute bottom-0 right-[-10%] md:right-[-15%] w-[120%] md:w-[140%] max-w-[600px] z-20 pointer-events-auto cursor-pointer"
            style={{ 
              x: prefersReducedMotion ? 0 : -mousePos.x, 
              y: prefersReducedMotion ? 0 : -mousePos.y 
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 50 }}
            key={`athlete-${mode}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="relative w-full h-full pb-8">
              <Image 
                src={currentMode.athlete} 
                alt={`${currentMode.label} athlete`}
                fill
                priority
                className="object-cover rounded-xl shadow-[0_20px_60px_rgba(8,27,63,0.8)] border-4 border-white/10 grayscale-[0.8] group-hover:grayscale-0 transition-all duration-700"
                style={{ clipPath: 'polygon(0 10%, 100% 0, 100% 90%, 0 100%)' }} // Giving it a dynamic slanted cutout look
              />
              <div className="absolute inset-0 bg-gradient-to-t from-royal-night via-transparent to-transparent opacity-80 group-hover:opacity-40 mix-blend-multiply transition-opacity duration-700 pointer-events-none" />
            </div>
          </motion.div>
        </div>

      </div>

    </section>
  )
}
