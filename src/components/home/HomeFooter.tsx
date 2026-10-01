'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SITE } from '@/config/site'
import { Facebook, Instagram, Youtube } from 'lucide-react'

const ROTARY_AREAS_OF_FOCUS = [
  'Peacebuilding and conflict prevention',
  'Disease prevention and treatment',
  'Water, sanitation, and hygiene',
  'Maternal and child health',
  'Basic education and literacy',
  'Community economic development',
  'Environment',
]

export default function HomeFooter() {
  const router = useRouter()
  const [tapCount, setTapCount] = useState(0)

  const handleLogoTap = () => {
    const newCount = tapCount + 1
    if (newCount >= 3) {
      router.push('/hq-auth')
      setTapCount(0)
    } else {
      setTapCount(newCount)
      // Reset tap count after 1 second if they don't tap 3 times quickly
      setTimeout(() => setTapCount(0), 1000)
    }
  }

  return (
    <footer className="bg-royal-night text-white pt-2">
      
      {/* Top Flag Stripe */}
      <div className="flex h-2 w-full mb-20">
        <div className="flex-1 bg-flag-green" />
        <div className="flex-1 bg-flag-yellow" />
        <div className="flex-1 bg-flag-blue" />
        <div className="flex-1 bg-flag-black" />
      </div>

      <div className="px-5 lg:px-12 xl:px-16 max-w-wide mx-auto pb-16 border-b border-white/10">
        <div className="flex flex-col lg:flex-row gap-16 justify-between items-start">
          
          {/* Left: A Joint Effort */}
          <div className="flex-1">
            <p className="font-sans text-label text-gold uppercase tracking-widest mb-8">A joint effort</p>
            <ul className="space-y-3 mb-12">
              {SITE.clubs.map(club => (
                <li key={club} className="font-display text-[24px] uppercase text-cream tracking-wide opacity-90">
                  {club}
                </li>
              ))}
            </ul>
            
            {/* Logos (Placeholders for real artwork) */}
            <div className="flex items-center gap-6 opacity-80">
              <span className="font-sans text-[12px] uppercase tracking-widest font-bold">Rotary</span>
              <span className="font-sans text-[12px] uppercase tracking-widest font-bold">Rotaract</span>
            </div>
          </div>

          {/* Right: Areas of Focus */}
          <div className="flex-1 max-w-md">
            <p className="font-sans text-label text-white/50 uppercase tracking-widest mb-6">Rotary International Areas of Focus</p>
            <div className="flex flex-wrap gap-x-6 gap-y-4">
              {ROTARY_AREAS_OF_FOCUS.map(area => (
                <div key={area} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center opacity-70">
                    <span className="block w-4 h-4 bg-white/20 rounded-full"></span> {/* Placeholder icon */}
                  </div>
                  <span className="font-sans text-[12px] text-white/60 font-medium max-w-[120px] leading-snug">{area}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-5 lg:px-12 xl:px-16 max-w-wide mx-auto py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div 
            onClick={handleLogoTap}
            className="font-display text-[20px] uppercase text-cream tracking-wide mb-1 cursor-pointer select-none"
          >
            Tour de Dar 2026
          </div>
          <a
            href={`mailto:${SITE.contact.email}`}
            className="font-sans text-[12px] text-sky hover:text-white transition-colors"
          >
            {SITE.contact.email}
          </a>
        </div>

        <div className="flex items-center gap-4">
          <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/40 hover:text-gold transition-colors p-2">
            <Facebook size={20} />
          </a>
          <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/40 hover:text-gold transition-colors p-2">
            <Instagram size={20} />
          </a>
          <a href={SITE.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/40 hover:text-gold transition-colors p-2">
            <Youtube size={20} />
          </a>
        </div>
      </div>
      
    </footer>
  )
}
