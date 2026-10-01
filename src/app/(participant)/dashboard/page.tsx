'use client'

import { QrCode, Map, Activity, Calendar, Download } from 'lucide-react'
import Image from 'next/image'
import { useParticipantTheme } from '@/context/ParticipantThemeContext'
import { cn } from '@/lib/utils'

export default function AthleteDashboard() {
  const { theme } = useParticipantTheme()
  const light = theme === 'light'

  return (
    <div className={cn("min-h-screen font-sans pt-12 pb-24 px-5 transition-colors", light ? "bg-cream text-royal-night" : "bg-[#091631] text-white")}>
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Welcome Header */}
        <header className="mb-12">
          <p className="text-[12px] font-bold text-gold uppercase tracking-widest mb-2">Athlete Portal</p>
          <h1 className="font-display text-[48px] uppercase tracking-wide leading-none">
            Welcome, James.
          </h1>
        </header>

        {/* Digital Bib Card */}
        <div className="rounded-[24px] p-8 border shadow-card relative overflow-hidden group" style={{
          borderColor: light ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
          background: light ? '#ffffff' : 'linear-gradient(to bottom right, #0A2A6B, #061A45)'
        }}>
          
          {/* Athlete image asset from home page as background overlay */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/running.jpg" 
              alt="Athlete"
              fill
              priority
              className="object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 mix-blend-overlay grayscale"
            />
            {/* Gradient to ensure text readability */}
            <div className={cn("absolute inset-0", light ? "bg-gradient-to-r from-white via-white/80 to-transparent" : "bg-gradient-to-r from-[#0A2A6B] via-[#0A2A6B]/80 to-transparent")} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-gold text-royal-night text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 shadow-sm">
                Status: Fully Registered
              </span>
              <p className={cn("text-[14px] font-medium uppercase tracking-widest mb-1", light ? "text-royal-night/60" : "text-white/60")}>Official Bib Number</p>
              <h2 className={cn("font-display text-[80px] md:text-[100px] leading-none tracking-tight", light ? "text-royal-night" : "text-white")}>
                M-1049
              </h2>
              <div className={cn("mt-4 flex items-center gap-4", light ? "text-royal-night/80" : "text-white/80")}>
                <span className="flex items-center gap-2 text-[12px] uppercase font-bold tracking-widest">
                  <Activity size={16} className="text-gold" /> Marathon
                </span>
                <span className={cn("w-1 h-1 rounded-full", light ? "bg-royal-night/30" : "bg-white/30")} />
                <span className="text-[12px] uppercase font-bold tracking-widest">20 KM</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl flex flex-col items-center gap-2 shadow-lg border border-slate-100">
              <QrCode size={120} className="text-royal-night" />
              <span className="text-[10px] text-royal-night font-bold uppercase tracking-widest">Scan at Check-in</span>
            </div>
          </div>
        </div>

        {/* Action Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <button className={cn("border rounded-[16px] p-6 min-h-[44px] flex flex-col items-center justify-center gap-3 transition-all active:scale-95", light ? "bg-white border-black/5 hover:bg-slate-50 shadow-sm" : "bg-white/5 hover:bg-white/10 border-white/10")}>
            <Map size={24} className="text-gold" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-center leading-tight">View Route<br/>Guide</span>
          </button>
          <button className={cn("border rounded-[16px] p-6 min-h-[44px] flex flex-col items-center justify-center gap-3 transition-all active:scale-95", light ? "bg-white border-black/5 hover:bg-slate-50 shadow-sm" : "bg-white/5 hover:bg-white/10 border-white/10")}>
            <Download size={24} className="text-sky" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-center leading-tight">Download<br/>Receipt</span>
          </button>
          <button disabled className={cn("border rounded-[16px] p-6 min-h-[44px] flex flex-col items-center justify-center gap-3 cursor-not-allowed relative", light ? "bg-slate-50 border-black/5" : "bg-[#051126] border-white/5")}>
            <Activity size={24} className={light ? "text-royal-night/40" : "text-white/40"} />
            <span className={cn("text-[11px] font-bold uppercase tracking-widest text-center leading-tight", light ? "text-royal-night/50" : "text-white/60")}>Digital<br/>Certificate</span>
            <span className="text-[9px] uppercase font-bold text-red-500 absolute top-3 right-3 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">Locked</span>
          </button>
          <button disabled className={cn("border rounded-[16px] p-6 min-h-[44px] flex flex-col items-center justify-center gap-3 cursor-not-allowed relative", light ? "bg-slate-50 border-black/5" : "bg-[#051126] border-white/5")}>
            <Download size={24} className={light ? "text-royal-night/40" : "text-white/40"} />
            <span className={cn("text-[11px] font-bold uppercase tracking-widest text-center leading-tight", light ? "text-royal-night/50" : "text-white/60")}>Twibbon<br/>Frame</span>
            <span className="text-[9px] uppercase font-bold text-red-500 absolute top-3 right-3 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">Locked</span>
          </button>
        </div>

        {/* Status Tracker */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          
          <div className={cn("border rounded-[20px] p-6 relative overflow-hidden", light ? "bg-white border-black/5" : "bg-gradient-to-br from-[#0F1629] to-[#0a0f1c] border-white/10")}>
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Activity size={60} className={light ? "text-royal-night" : "text-white"} />
            </div>
            <h3 className={cn("font-sans text-[11px] font-bold uppercase tracking-widest mb-4", light ? "text-royal-night/50" : "text-white/50")}>Memento Status</h3>
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-full border flex items-center justify-center", light ? "bg-slate-50 border-black/5" : "bg-white/5 border-white/10")}>
                <span className={cn("font-display text-[20px]", light ? "text-royal-night" : "text-white")}>L</span>
              </div>
              <div>
                <p className={cn("font-bold text-[14px]", light ? "text-royal-night" : "text-white")}>Official Jersey</p>
                <p className="text-[12px] text-emerald-500 font-bold uppercase tracking-widest mt-1">Ready for Pickup</p>
              </div>
            </div>
          </div>

          <div className={cn("border rounded-[20px] p-6 relative overflow-hidden", light ? "bg-white border-black/5" : "bg-gradient-to-br from-[#0F1629] to-[#0a0f1c] border-white/10")}>
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Calendar size={60} className="text-gold" />
            </div>
            <h3 className={cn("font-sans text-[11px] font-bold uppercase tracking-widest mb-4", light ? "text-royal-night/50" : "text-white/50")}>Evening Gala</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                <Calendar size={20} className="text-gold" />
              </div>
              <div>
                <p className={cn("font-bold text-[14px]", light ? "text-royal-night" : "text-white")}>Prize Distribution Gala</p>
                <p className="text-[12px] text-amber-500 font-bold uppercase tracking-widest mt-1">Invite Pending</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

