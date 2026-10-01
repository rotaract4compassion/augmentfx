'use client'

import { useState } from 'react'
import { Calendar, Users, Award, PlayCircle } from 'lucide-react'

export default function GalaManagement() {
  return (
    <div className="space-y-6">
      
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-[32px] uppercase text-royal-night leading-none mb-1">Gala Management</h2>
          <p className="font-sans text-[12px] text-royal/60 font-bold uppercase tracking-widest">Evening Prize Distribution & Banquet</p>
        </div>
      </header>

      {/* Gala Control Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        
        {/* Agenda & Sequencing */}
        <div className="bg-white p-6 rounded-[22px] border border-royal/10 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <Calendar size={20} className="text-gold" />
            <h3 className="font-sans text-[13px] font-bold uppercase tracking-widest text-royal-night">Evening Sequence</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-cream rounded-lg border border-royal/5">
              <div>
                <p className="font-bold text-[13px] text-royal-night">18:00 - Guest Arrival & Cocktails</p>
                <p className="text-[11px] text-royal/60 uppercase mt-1">Live Acoustic Band</p>
              </div>
              <button className="text-[10px] uppercase font-bold text-royal hover:bg-royal/5 px-3 py-2 min-h-[44px] rounded-md transition-colors flex items-center justify-center">Edit</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-royal/5 rounded-lg border border-royal/10 border-l-4 border-l-royal">
              <div>
                <p className="font-bold text-[13px] text-royal-night">19:30 - Opening Remarks</p>
                <p className="text-[11px] text-royal/60 uppercase mt-1">Rotary District Governor</p>
              </div>
              <span className="text-[10px] uppercase font-bold text-royal tracking-widest flex items-center gap-1"><PlayCircle size={14}/> LIVE NOW</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-cream rounded-lg border border-royal/5 opacity-60">
              <div>
                <p className="font-bold text-[13px] text-royal-night">20:15 - Prize Distribution</p>
                <p className="text-[11px] text-royal/60 uppercase mt-1">Marathon & Cycling Winners</p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Winners Push */}
        <div className="bg-white p-6 rounded-[22px] border border-royal/10 shadow-card">
          <div className="flex items-center gap-3 mb-6">
            <Award size={20} className="text-sky" />
            <h3 className="font-sans text-[13px] font-bold uppercase tracking-widest text-royal-night">Auto-Populated Winners List</h3>
          </div>
          
          <div className="bg-cream p-4 rounded-lg border border-royal/5 mb-4">
            <p className="text-[12px] text-royal-night mb-2">The timing system has synced the final race results. Review and push to Gala screen.</p>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between items-center bg-white p-3 rounded border border-royal/10 shadow-sm">
                <span className="text-[12px] font-bold text-royal-night">40km Men's Winner</span>
                <span className="text-[12px] text-emerald-600 font-mono">John D. (C-042)</span>
              </div>
              <div className="flex justify-between items-center bg-white p-3 rounded border border-royal/10 shadow-sm">
                <span className="text-[12px] font-bold text-royal-night">40km Women's Winner</span>
                <span className="text-[12px] text-emerald-600 font-mono">Sarah M. (C-112)</span>
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-royal text-white rounded-lg font-sans text-[11px] font-bold uppercase tracking-widest hover:bg-royal-deep transition-colors shadow-sm">
            Push Results to Gala Screen
          </button>
        </div>

      </div>

    </div>
  )
}
