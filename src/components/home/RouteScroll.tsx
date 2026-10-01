'use client'

import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { Bike, Footprints, Activity, Flag } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function RouteScroll() {
  const prefersReducedMotion = useReducedMotion()
  
  // Track scroll on the entire window instead of a container
  const { scrollYProgress } = useScroll()

  // Smooth the scroll progress so it feels weighty
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  // Width for the horizontal bar
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%'])
  // Position for the icon along the bar
  const iconPosition = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  // Determine which icon to show based on scroll section (rough estimation)
  const [activeIcon, setActiveIcon] = useState<'bike' | 'run' | 'walk' | 'finish'>('bike')

  useEffect(() => {
    return smoothProgress.onChange((latest) => {
      if (latest > 0.9) setActiveIcon('finish')
      else if (latest > 0.6) setActiveIcon('walk')
      else if (latest > 0.3) setActiveIcon('run')
      else setActiveIcon('bike')
    })
  }, [smoothProgress])

  return (
    <div className="fixed bottom-0 left-0 w-full z-[999] pointer-events-none h-4">
      
      {/* Base track (faint) */}
      <div className="absolute bottom-0 w-full h-[6px] bg-royal-night/30 backdrop-blur-sm" />
      
      {/* Progress line */}
      <motion.div 
        className="absolute bottom-0 left-0 h-[6px] bg-gradient-to-r from-flag-green via-flag-yellow to-gold shadow-[0_-2px_10px_rgba(247,168,27,0.4)]"
        style={{ width: prefersReducedMotion ? '100%' : progressWidth }}
      />

      {/* Traveling Marker Icon */}
      <motion.div 
        className="absolute bottom-[2px] w-8 h-8 -ml-4 rounded-full bg-gold shadow-[0_0_12px_rgba(247,168,27,0.8)] flex items-center justify-center text-royal-night"
        style={{ left: prefersReducedMotion ? '100%' : iconPosition }}
      >
        {activeIcon === 'bike' && <Bike size={14} strokeWidth={2.5} />}
        {activeIcon === 'run' && <Footprints size={14} strokeWidth={2.5} />}
        {activeIcon === 'walk' && <Activity size={14} strokeWidth={2.5} />}
        {activeIcon === 'finish' && <Flag size={14} strokeWidth={2.5} />}
      </motion.div>

    </div>
  )
}
