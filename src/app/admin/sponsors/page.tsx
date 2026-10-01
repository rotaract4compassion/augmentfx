'use client'

import { useState } from 'react'
import { Plus, ShieldAlert, Star, TrendingUp, Search, Image as ImageIcon } from 'lucide-react'

// Dummy state for Sponsors
const INITIAL_SPONSORS = [
  { id: 'SP-001', name: 'Rotary International', tier: 'TITLE', amount: '25.0M', status: 'ACTIVE' },
  { id: 'SP-002', name: 'Headline Partner', tier: 'TITLE', amount: '15.0M', status: 'ACTIVE' },
  { id: 'SP-003', name: 'Gold Sponsor 1', tier: 'GOLD', amount: '5.0M', status: 'ACTIVE' },
  { id: 'SP-004', name: 'Water Provider', tier: 'MINOR', amount: 'In-kind', status: 'PENDING' },
]

export default function AdminSponsorsPage() {
  const [sponsors, setSponsors] = useState(INITIAL_SPONSORS)

  return (
    <div className="space-y-6">
      
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-[32px] uppercase text-royal-night leading-none mb-1">Sponsor Provisioning</h2>
          <p className="font-sans text-[12px] text-royal/60 font-bold uppercase tracking-widest">Manage Partner Visibility & Tiers</p>
        </div>
        
        <button className="flex items-center gap-2 px-5 py-3 bg-royal text-white rounded-md font-sans text-[11px] font-bold uppercase tracking-widest hover:bg-royal-deep transition-colors shadow-sm">
          <Plus size={14} /> Provision New Sponsor
        </button>
      </header>

      {/* Tiers Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-white p-6 rounded-[22px] border border-royal/10 shadow-card flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Star size={64} className="text-gold" />
          </div>
          <div className="relative z-10">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gold mb-4 block">Title Sponsors (Huge Logo)</span>
            <span className="font-display text-[48px] text-royal-night leading-none block mb-1">2</span>
            <span className="text-[11px] text-royal/50 font-bold uppercase">Active Placements</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-[22px] border border-royal/10 shadow-card flex flex-col justify-between">
          <div>
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-royal mb-4 block">Gold Sponsors (Medium)</span>
            <span className="font-display text-[48px] text-royal-night leading-none block mb-1">1</span>
            <span className="text-[11px] text-royal/50 font-bold uppercase">Active Placements</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[22px] border border-royal/10 shadow-card flex flex-col justify-between">
          <div>
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-ink-muted mb-4 block">Minor Sponsors (Roller)</span>
            <span className="font-display text-[48px] text-royal-night leading-none block mb-1">12</span>
            <span className="text-[11px] text-royal/50 font-bold uppercase">In Marquee Queue</span>
          </div>
        </div>

      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[22px] border border-royal/10 shadow-card overflow-hidden">
        
        <div className="p-4 border-b border-royal/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-cream">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-royal/40" size={16} />
            <input 
              type="text" 
              placeholder="Search sponsors..." 
              className="w-full bg-white border border-royal/10 rounded-md py-2 pl-10 pr-4 text-[13px] text-royal-night focus:outline-none focus:border-royal focus:ring-1 focus:ring-royal"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-royal/10">
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-royal/60">ID</th>
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-royal/60">Entity Name</th>
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-royal/60">Tier Assignment</th>
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-royal/60">Pledged (TZS)</th>
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-royal/60">Logo Asset</th>
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-royal/60">Status</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-royal/10">
              {sponsors.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-24 text-center">
                    <div className="flex flex-col items-center justify-center opacity-50">
                      <ShieldAlert size={48} className="text-royal mb-4" />
                      <p className="font-sans text-[15px] font-bold text-royal-night mb-1">No sponsors provisioned</p>
                      <p className="text-[12px] text-royal/60 max-w-xs mx-auto">Click "Provision New Sponsor" in the top right to register your first corporate partner.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                sponsors.map(sp => (
                  <tr key={sp.id} className="hover:bg-royal/5 transition-colors">
                    <td className="py-4 px-6 text-[13px] font-mono text-royal/60">{sp.id}</td>
                    <td className="py-4 px-6 text-[14px] font-bold text-royal-night">{sp.name}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${
                        sp.tier === 'TITLE' ? 'bg-gold/10 text-gold-dark border-gold/30' :
                        sp.tier === 'GOLD' ? 'bg-royal/10 text-royal border-royal/30' :
                        'bg-slate-100 text-slate-500 border-slate-200'
                      }`}>
                        {sp.tier}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[13px] font-mono text-emerald-600">{sp.amount}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-[12px] text-royal/60">
                        <ImageIcon size={14} /> Uploaded
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest ${
                        sp.status === 'ACTIVE' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${sp.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        {sp.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-royal hover:text-royal-deep text-[11px] font-bold uppercase tracking-widest transition-colors min-h-[44px] px-2 flex items-center justify-end w-full">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}
