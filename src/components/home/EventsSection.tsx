'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Bike, Footprints, Activity } from 'lucide-react'
import dynamic from 'next/dynamic'

const EventRouteMap = dynamic(() => import('@/components/shared/EventRouteMap'), { ssr: false, loading: () => <div className="w-full h-full bg-royal-night/10 animate-pulse" /> })

type ModeId = 'cycling' | 'marathon' | 'walkathon'

const MODES: { id: ModeId, name: string, icon: any, bg: string, accent: string, sizes: string }[] = [
  {
    id: 'cycling',
    name: 'Cycling',
    icon: Bike,
    bg: 'bg-[#0E2F66]', // deep royal
    accent: 'text-gold',
    sizes: 'col-span-1 md:col-span-2 row-span-2 min-h-[360px]', // Large tile
  },
  {
    id: 'marathon',
    name: 'Marathon',
    icon: Footprints,
    bg: 'bg-[#17458F]', // royal
    accent: 'text-cream',
    sizes: 'col-span-1 md:col-span-1 row-span-1 min-h-[220px]', // Medium tile
  },
  {
    id: 'walkathon',
    name: 'Walkathon',
    icon: Activity,
    bg: 'bg-sky',
    accent: 'text-royal-night',
    sizes: 'col-span-1 md:col-span-1 row-span-1 min-h-[220px]', // Small tile
  }
]

const DISTANCES = [
  { label: '5K', km: 5, modes: ['marathon'] },
  { label: '10K', km: 10, modes: ['marathon'] },
  { label: '15K', km: 15, modes: ['marathon'] },
  { label: '20K', km: 20, modes: ['marathon', 'cycling'] },
  { label: '40K', km: 40, modes: ['cycling'] },
  { label: 'TBC', km: 0, modes: ['walkathon'] }
]

export default function EventsSection() {
  const [selectedDist, setSelectedDist] = useState(20)
  const [paceMin, setPaceMin] = useState(5) // min/km
  const [hoveredMode, setHoveredMode] = useState<ModeId | null>(null)
  const [hasMountedMaps, setHasMountedMaps] = useState<ModeId[]>([])
  const prefersReducedMotion = useReducedMotion()

  const handleHover = (id: ModeId | null) => {
    setHoveredMode(id)
    if (id && !hasMountedMaps.includes(id)) {
      setHasMountedMaps(prev => [...prev, id])
    }
  }

  const totalMins = selectedDist * paceMin
  const estHours = Math.floor(totalMins / 60)
  const estMins = Math.floor(totalMins % 60)
  const timeString = estHours > 0 ? `${estHours}h ${estMins}m` : `${estMins}m`

  return (
    <section id="events" className="relative px-5 py-24 lg:px-12 xl:px-16 bg-[#F8F5F0] text-royal-night scroll-mt-12 overflow-hidden">
      
      {/* Faint Typographic Graffiti Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Ctext x='20' y='50' font-family='Impact' font-size='48' font-weight='bold' transform='rotate(-15 20 50)'%3EVICTORY%3C/text%3E%3Ctext x='200' y='120' font-family='Impact' font-size='64' font-weight='bold' opacity='0.5' transform='rotate(10 200 120)'%3ESTRONG%3C/text%3E%3Ctext x='50' y='250' font-family='Impact' font-size='56' font-weight='bold' opacity='0.7' transform='rotate(-5 50 250)'%3EPUSH HARD%3C/text%3E%3Ctext x='250' y='300' font-family='Impact' font-size='80' font-weight='bold' transform='rotate(-20 250 300)'%3EENDURANCE%3C/text%3E%3Ctext x='150' y='380' font-family='Impact' font-size='32' font-weight='bold' transform='rotate(15 150 380)'%3E100%25 EFFORT%3C/text%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }} 
      />

      <div className="max-w-wide mx-auto pl-0 sm:pl-12 relative z-10">
        <p className="font-sans text-label text-gold-dark uppercase tracking-widest mb-4">Pick your distance</p>
        <h2 className="font-display text-section uppercase text-ink leading-[0.9] tracking-tight mb-12">
          Three disciplines.<br/>One cause.
        </h2>

        {/* Morphing Map / Tiles Grid */}
        <div className="relative mb-16 h-[800px] md:h-[600px]">
          
          <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-3">
            {MODES.map((mode, i) => {
              const Icon = mode.icon
              const isHovered = hoveredMode === mode.id

              return (
                <motion.div 
                  key={mode.id}
                  layoutId={`card-${mode.id}`}
                  onMouseEnter={() => handleHover(mode.id)}
                  onMouseLeave={() => setHoveredMode(null)}
                  onClick={() => handleHover(hoveredMode === mode.id ? null : mode.id)}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
                  whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
                  className={`relative flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-700
                    ${mode.bg} 
                    ${isHovered ? 'col-span-1 md:col-span-3 row-span-2 min-h-[600px] z-20 shadow-card-lg' : mode.sizes}
                  `}
                >
                  
                  {/* Default Tile UI */}
                  <div className={`absolute inset-0 p-8 flex flex-col justify-between transition-opacity duration-500 ${isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100 delay-200'}`}>
                    <div className="relative z-10">
                      <Icon size={32} className={`mb-6 ${mode.accent}`} strokeWidth={1.5} />
                      <h3 className="font-display text-[32px] uppercase text-white mb-2">{mode.name}</h3>
                    </div>
                    <div className={`absolute -bottom-8 -right-8 opacity-10 ${mode.accent}`}>
                      <Icon size={200} strokeWidth={1} />
                    </div>
                  </div>

                  {/* Morphing Map UI */}
                  <div className={`absolute inset-0 bg-[#0A192F] transition-opacity duration-700 ${isHovered ? 'opacity-100 delay-300' : 'opacity-0 pointer-events-none'}`}>
                    
                    {/* Render map if it has ever been hovered to prevent mounting glitch */}
                    {hasMountedMaps.includes(mode.id) && (
                      <EventRouteMap mode={mode.id} distance={selectedDist} />
                    )}
                    
                    <div className="absolute inset-0 pointer-events-none p-8 z-[500] flex flex-col justify-between bg-gradient-to-t from-royal-night/90 via-transparent to-royal-night/40">
                      <div className="flex items-center gap-4">
                        <Icon size={32} className={mode.accent} strokeWidth={2} />
                        <h3 className="font-display text-[48px] uppercase text-white leading-none">{mode.name} Route</h3>
                      </div>
                      
                      <div className="text-white mt-auto mb-8">
                        <p className="font-sans text-[12px] uppercase tracking-widest font-bold text-gold mb-2">Live HQ Preview</p>
                        <p className="font-sans max-w-sm text-white/80 mb-6">Route mapping will be configured dynamically via the TdDar Admin Console. Showing placeholder route for {mode.name}.</p>
                        
                        <Link 
                          href={`/events/${mode.id}`}
                          className={`inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-pill font-sans font-bold text-[12px] uppercase tracking-wider transition-colors ${isHovered ? 'pointer-events-auto' : 'pointer-events-none'}`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          See Full Route Details →
                        </Link>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Distance Picker & Calculator */}
        <div className="bg-white p-8 md:p-12 shadow-card border border-royal/5">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start lg:items-center">
            
            <div className="flex-1 w-full">
              <label className="block font-sans text-[12px] font-bold uppercase tracking-widest text-ink-subtle mb-6">Distance</label>
              <div className="flex flex-wrap gap-3">
                {DISTANCES.map(d => (
                  <button
                    key={d.label}
                    onClick={() => d.km > 0 && setSelectedDist(d.km)}
                    disabled={d.km === 0}
                    className={`font-display text-[24px] px-6 py-3 border-b-4 transition-all
                      ${d.km === 0 ? 'opacity-40 cursor-not-allowed border-transparent text-ink-ghost' : 
                        selectedDist === d.km 
                          ? 'border-gold text-royal bg-royal/5' 
                          : 'border-transparent text-ink-muted hover:bg-royal/5 hover:text-royal'
                      }
                    `}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full flex flex-col gap-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="font-sans text-[12px] font-bold uppercase tracking-widest text-ink-subtle">Your Pace (min/km)</label>
                  <span className="font-display text-[24px] text-royal tabular-nums">{paceMin}:00</span>
                </div>
                <input 
                  type="range" 
                  min="3" max="15" step="0.5" 
                  value={paceMin}
                  onChange={(e) => setPaceMin(parseFloat(e.target.value))}
                  className="w-full h-2 bg-cream rounded-pill appearance-none cursor-pointer accent-gold"
                />
              </div>

              <div className="flex items-center justify-between bg-cream p-6 border border-royal/5">
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-widest text-ink-muted mb-1">Estimated Time</div>
                  <div className="font-display text-[36px] text-royal leading-none tabular-nums">{timeString}</div>
                </div>
                
                <Link
                  href={`/register?dist=${selectedDist}`}
                  className="bg-gold text-royal-night px-8 py-4 rounded-pill font-sans font-extrabold text-[13px] uppercase tracking-wider hover:bg-gold-dark active:scale-95 transition-all shadow-gold"
                >
                  Join Us
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
