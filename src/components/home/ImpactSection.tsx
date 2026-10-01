'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { SITE } from '@/config/site'

export default function ImpactSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative px-5 py-24 lg:px-12 xl:px-16 bg-royal-deep text-white overflow-hidden">
      
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-royal opacity-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-wide mx-auto pl-8 sm:pl-12 relative z-10 flex flex-col md:flex-row items-center gap-16">
        
        {/* Content */}
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-4 mb-4">
            <p className="font-sans text-label text-gold uppercase tracking-widest">The Cause</p>
            
            {/* Shimmering Ribbon Indicator */}
            <motion.div 
              className="w-4 h-4 rounded-full"
              animate={prefersReducedMotion ? false : {
                backgroundColor: ['#E85D75', '#F7A81B', '#E85D75']
              }}
              transition={{ duration: 4, ease: "linear", repeat: Infinity }}
              style={{ backgroundColor: '#E85D75' }} // Ribbon color
            />
          </div>

          <h2 className="font-display text-section uppercase text-cream leading-[0.9] tracking-tight mb-8">
            Every effort <br className="hidden sm:block"/>counts.
          </h2>

          <p className="font-sans text-body-lg text-white/80 leading-[1.65] mb-8">
            {SITE.cause.line} Your participation directly supports access to life-saving treatment for those who need it most. 
          </p>

          <Link
            href="/donate"
            className="inline-block border-2 border-gold text-gold hover:bg-gold hover:text-royal-night px-8 py-4 rounded-pill font-sans font-bold text-[13px] uppercase tracking-wider transition-colors"
          >
            Support a participant
          </Link>
        </div>

        {/* Dignified Local Photo (Placeholder until real photos) */}
        <div className="flex-1 w-full max-w-md duotone">
          <img 
            src="https://placehold.co/600x800/17458F/F8F5F0?text=Consented+Local+Photo+TBC" 
            alt="Cancer care support" 
            className="w-full h-auto shadow-[0_20px_60px_rgba(8,27,63,0.6)]"
          />
        </div>

      </div>
    </section>
  )
}
