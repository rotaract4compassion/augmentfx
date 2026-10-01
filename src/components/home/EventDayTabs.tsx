'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

type Tab = 'before' | 'day' | 'after'

const TABS: { id: Tab, label: string }[] = [
  { id: 'before', label: 'Before' },
  { id: 'day', label: 'On the day' },
  { id: 'after', label: 'After' },
]

export default function EventDayTabs() {
  const [activeTab, setActiveTab] = useState<Tab>('before')
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="relative px-5 py-24 lg:px-12 xl:px-16 bg-cream text-royal-night scroll-mt-12">
      <div className="max-w-content mx-auto pl-8 sm:pl-12">
        <p className="font-sans text-label text-gold-dark uppercase tracking-widest mb-4">The Experience</p>
        <h2 className="font-display text-section uppercase text-ink leading-[0.9] tracking-tight mb-12">
          Race Weekend
        </h2>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-6 mb-12 border-b border-royal/10 pb-4">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-sans text-[14px] font-bold uppercase tracking-wider pb-4 -mb-[17px] border-b-2 transition-colors ${
                activeTab === tab.id ? 'border-gold text-royal' : 'border-transparent text-ink-ghost hover:text-ink-muted'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === 'before' && (
              <motion.div
                key="before"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="font-display text-[24px] uppercase text-royal mb-2">What to bring</h3>
                  <p className="font-sans text-body text-ink-muted">Valid ID, registration confirmation (QR code), and appropriate gear for your discipline. (Full checklist TBC).</p>
                </div>
                <div>
                  <h3 className="font-display text-[24px] uppercase text-royal mb-2">How to get there</h3>
                  <p className="font-sans text-body text-ink-muted">Police Officers' Mess, Masaki. Traffic diversions will be in place. Arrive early.</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'day' && (
              <motion.div
                key="day"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="font-display text-[24px] uppercase text-royal mb-2">Schedule</h3>
                  <p className="font-sans text-body text-ink-muted">Detailed timeline TBC. Cycling usually starts first, followed by running and walking.</p>
                </div>
                <div>
                  <h3 className="font-display text-[24px] uppercase text-royal mb-2">Parking</h3>
                  <p className="font-sans text-body text-ink-muted">Designated parking areas will be communicated to registered participants closer to the date.</p>
                </div>
              </motion.div>
            )}

            {activeTab === 'after' && (
              <motion.div
                key="after"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={prefersReducedMotion ? false : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="font-display text-[24px] uppercase text-royal mb-2">Results & Photos</h3>
                  <p className="font-sans text-body text-ink-muted">Links to official timing results and event photography will be posted here after the event.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
