'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { Lock, Unlock, AlertTriangle, TrendingUp, Users, Activity, CreditCard, ShieldAlert } from 'lucide-react'

// Reuse the live participant map but force it to look tactical
const LiveParticipantsMap = dynamic(() => import('@/components/shared/LiveParticipantsMap'), { ssr: false })

export default function AdminDashboard() {
  const [appState, setAppState] = useState<'REGISTRATION' | 'RACE_LIVE' | 'CONCLUDED'>('REGISTRATION')

  return (
    <div className="space-y-8">
      
      {/* Top Bar / Global State Controls */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-[22px] border border-royal/10 shadow-card">
        <div>
          <h2 className="font-sans text-[16px] font-bold text-royal-night">Global State Control</h2>
          <p className="font-sans text-[12px] text-ink-muted mt-1">Control the web app's current phase (Registration, Live Race, Concluded).</p>
        </div>
        
        <div className="flex bg-cream rounded-lg p-1 border border-royal/10">
          <button 
            onClick={() => setAppState('REGISTRATION')}
            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded-md transition-all ${appState === 'REGISTRATION' ? 'bg-royal text-white shadow-sm' : 'text-royal/60 hover:text-royal'}`}
          >
            Registration Open
          </button>
          <button 
            onClick={() => setAppState('RACE_LIVE')}
            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded-md transition-all ${appState === 'RACE_LIVE' ? 'bg-red-600 text-white shadow-sm' : 'text-royal/60 hover:text-royal'}`}
          >
            Race Live
          </button>
          <button 
            onClick={() => setAppState('CONCLUDED')}
            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded-md transition-all ${appState === 'CONCLUDED' ? 'bg-amber-500 text-white shadow-sm' : 'text-royal/60 hover:text-royal'}`}
          >
            Event Concluded
          </button>
        </div>
      </header>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[22px] border border-royal/10 shadow-card flex flex-col justify-between">
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-royal/60">Total Registered</span>
          <div className="flex items-end gap-3 mt-4">
            <span className="font-display text-[48px] text-royal-night leading-none">1,248</span>
            <span className="flex items-center text-[12px] text-emerald-600 font-bold mb-1"><TrendingUp size={14} className="mr-1"/> +12%</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-[22px] border border-royal/10 shadow-card flex flex-col justify-between">
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-royal/60">Funds Raised (TZS)</span>
          <div className="flex items-end gap-3 mt-4">
            <span className="font-display text-[48px] text-gold leading-none">45.2M</span>
            <span className="text-[12px] text-royal/50 font-bold mb-1">Target: 100M</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[22px] border border-royal/10 shadow-card flex flex-col justify-between">
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-royal/60">System Alerts</span>
          <div className="mt-4 flex items-center gap-3 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
            <AlertTriangle size={18} />
            <span className="font-sans text-[12px] font-bold">2 Payment Webhooks Failed</span>
          </div>
        </div>
      </div>

      {/* Live Tracking Map */}
      <div className="bg-white rounded-[22px] border border-royal/10 shadow-card overflow-hidden flex flex-col">
        <div className="p-4 border-b border-royal/10 flex items-center justify-between">
          <h3 className="font-sans text-[12px] font-bold uppercase tracking-widest text-royal-night">Live Event Map: Dar es Salaam Grid</h3>
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] uppercase font-bold text-royal tracking-widest">Active Ping</span>
          </span>
        </div>
        <div className="h-[500px] relative bg-cream">
          <LiveParticipantsMap />
          {/* We overlay a tactical CSS filter over the existing component for the admin look but lighter */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-white" />
        </div>
      </div>

    </div>
  )
}
