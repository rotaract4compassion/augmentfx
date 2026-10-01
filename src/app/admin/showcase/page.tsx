'use client'

import { useState } from 'react'
import { Trophy, CheckCircle, Search, LayoutGrid } from 'lucide-react'

const MOCK_SHOWCASES = [
  { id: 'RC-01', club: 'Rotary Club of Dar es Salaam', format: 'Stall', focus: 'Disease Prevention', status: 'Approved', score: 85 },
  { id: 'RC-02', club: 'Rotaract Club of Kwanza', format: 'Poster', focus: 'Water & Sanitation', status: 'Pending', score: 0 },
  { id: 'RC-03', club: 'Rotary Club of Masaki', format: 'Skit', focus: 'Basic Education', status: 'Approved', score: 92 },
]

export default function ShowcaseManagement() {
  const [showcases, setShowcases] = useState(MOCK_SHOWCASES)

  return (
    <div className="space-y-6">
      
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-[32px] uppercase text-royal-night leading-none mb-1">Rotary Showcase Portal</h2>
          <p className="font-sans text-[12px] text-royal/60 font-bold uppercase tracking-widest">7 Avenues of Service & Public Image Competition</p>
        </div>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="bg-white p-6 rounded-[22px] border border-royal/10 shadow-card flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <LayoutGrid size={64} className="text-royal" />
          </div>
          <div className="relative z-10">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-royal mb-4 block">Registered Clubs</span>
            <span className="font-display text-[48px] text-royal-night leading-none block mb-1">14</span>
            <span className="text-[11px] text-emerald-600 font-bold uppercase">12 Approved Stalls</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gold to-[#d49600] p-6 rounded-[22px] border border-gold/30 shadow-gold flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Trophy size={64} className="text-white" />
          </div>
          <div className="relative z-10">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-white/80 mb-4 block">Current Leader</span>
            <span className="font-display text-[32px] text-white leading-none block mb-2">RC Masaki</span>
            <span className="text-[11px] text-white font-bold uppercase bg-white/20 px-3 py-1 rounded-full inline-block">Score: 92/100</span>
          </div>
        </div>

      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[22px] border border-royal/10 shadow-card overflow-hidden">
        
        <div className="p-4 border-b border-royal/10 flex items-center justify-between bg-cream">
          <h3 className="font-sans text-[13px] font-bold uppercase tracking-widest text-royal-night">Showcase Submissions</h3>
          <div className="relative max-w-sm w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-royal/40" size={16} />
            <input 
              type="text" 
              placeholder="Search clubs..." 
              className="w-full bg-white border border-royal/10 rounded-md py-2 pl-10 pr-4 text-[13px] text-royal-night focus:outline-none focus:border-royal focus:ring-1 focus:ring-royal"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-royal/10">
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-royal/60">Club Name</th>
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-royal/60">Format</th>
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-royal/60">Area of Focus</th>
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-royal/60">Status</th>
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-royal/60">Score</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-royal/10">
              {showcases.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-24 text-center">
                    <div className="flex flex-col items-center justify-center opacity-50">
                      <LayoutGrid size={48} className="text-royal mb-4" />
                      <p className="font-sans text-[15px] font-bold text-royal-night mb-1">No showcases submitted</p>
                      <p className="text-[12px] text-royal/60 max-w-xs mx-auto">Clubs that submit their 7 Avenues of Service exhibits will appear here for grading.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                showcases.map(sc => (
                  <tr key={sc.id} className="hover:bg-royal/5 transition-colors">
                    <td className="py-4 px-6 text-[14px] font-bold text-royal-night">{sc.club}</td>
                    <td className="py-4 px-6 text-[13px] text-royal/60">{sc.format}</td>
                    <td className="py-4 px-6 text-[13px] text-royal/60">{sc.focus}</td>
                    <td className="py-4 px-6">
                      <span className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest ${
                        sc.status === 'Approved' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {sc.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-[14px] font-bold text-royal-night">{sc.score > 0 ? sc.score : '-'}</td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-royal hover:text-royal-deep text-[11px] font-bold uppercase tracking-widest transition-colors min-h-[44px] px-2 flex items-center justify-end w-full">
                        Grade Showcase
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
