'use client'

import { motion } from 'framer-motion'
import Marquee from 'react-fast-marquee'

// In a real app, this would be fetched from Supabase (provisioned by Admin)
const SPONSORS = {
  title: [
    { name: 'Rotary International', logo: 'https://placehold.co/400x150/ffffff/081B3F?text=Title+Sponsor+1' },
    { name: 'Headline Partner', logo: 'https://placehold.co/400x150/ffffff/081B3F?text=Title+Sponsor+2' },
  ],
  gold: [
    { name: 'Gold Sponsor 1', logo: 'https://placehold.co/200x100/ffffff/17458F?text=Gold' },
    { name: 'Gold Sponsor 2', logo: 'https://placehold.co/200x100/ffffff/17458F?text=Gold' },
    { name: 'Gold Sponsor 3', logo: 'https://placehold.co/200x100/ffffff/17458F?text=Gold' },
  ],
  minor: [
    'Supporting Partner A', 'Water Provider', 'Medical Team', 'Logistics Partner', 
    'Media Sponsor 1', 'Media Sponsor 2', 'Community Partner'
  ]
}

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="relative py-24 bg-white text-royal-night overflow-hidden">
      
      <div className="max-w-wide mx-auto px-5 lg:px-12 xl:px-16 mb-16 text-center">
        <p className="font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-royal mb-4">
          Powered By Our Partners
        </p>
        <h2 className="font-display text-[48px] md:text-[64px] uppercase text-ink leading-none mb-12">
          Made Possible By<br/>Generous Sponsors
        </h2>

        {/* Title Sponsors (Huge Logos) */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
          {SPONSORS.title.map((sponsor, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="w-full md:w-[40%] max-w-[400px] aspect-[21/9] bg-cream border border-royal/5 flex items-center justify-center p-8 grayscale hover:grayscale-0 transition-all duration-500 rounded-xl hover:shadow-card cursor-pointer"
            >
              <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-contain mix-blend-multiply" />
            </motion.div>
          ))}
        </div>

        {/* Gold Sponsors */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {SPONSORS.gold.map((sponsor, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.1) }}
              className="w-[140px] md:w-[200px] aspect-[2/1] bg-cream border border-royal/5 flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 rounded-lg"
            >
              <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-contain mix-blend-multiply opacity-80" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Minor Sponsors Roller (Marquee) */}
      <div className="border-y border-royal/10 py-6 bg-cream">
        <Marquee speed={40} gradient={false} className="overflow-hidden">
          {SPONSORS.minor.map((name, i) => (
            <div key={i} className="flex items-center mx-8 md:mx-16">
              <span className="font-display text-[24px] uppercase text-ink-subtle">{name}</span>
              <span className="w-2 h-2 rounded-full bg-gold ml-8 md:ml-16" />
            </div>
          ))}
        </Marquee>
      </div>

    </section>
  )
}
