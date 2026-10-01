'use client'

import { useState } from 'react'
import { Search, Filter, Download, MoreVertical, ShieldAlert } from 'lucide-react'

// Dummy data representing the registered athletes
const ATHLETES = [
  { id: 'REG-1049', name: 'James Mgasa', email: 'james.m@example.com', phone: '+255712345678', mode: 'Marathon', bib: 'M-1049', payment: 'PAID' },
  { id: 'REG-1050', name: 'Aisha Nurdin', email: 'a.nurdin@example.com', phone: '+255788123456', mode: 'Cycling', bib: 'C-021', payment: 'PENDING' },
  { id: 'REG-1051', name: 'John Doe', email: 'j.doe@rotary.org', phone: '+255755999888', mode: 'Walkathon', bib: 'W-992', payment: 'PAID' },
  { id: 'REG-1052', name: 'Grace Mtemi', email: 'grace@example.com', phone: '+255766112233', mode: 'Marathon', bib: 'M-1050', payment: 'PAID' },
  { id: 'REG-1053', name: 'Peter Kafuku', email: 'peter.k@example.com', phone: '+255744555666', mode: 'Cycling', bib: 'C-022', payment: 'FAILED' },
]

export default function AdminCRMPage() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="space-y-6">
      
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-[32px] uppercase text-slate-100 leading-none mb-1">Athlete CRM</h2>
          <p className="font-sans text-[12px] text-slate-500 font-bold uppercase tracking-widest">Registrar Database & Logistics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-md font-sans text-[11px] font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors">
            <Filter size={14} /> Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-md font-sans text-[11px] font-bold uppercase tracking-widest hover:bg-blue-600/30 transition-colors">
            <Download size={14} /> Export CSV
          </button>
        </div>
      </header>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {['Total Registered', 'Fully Paid', 'Pending Payments', 'Bibs Assigned'].map((stat, i) => (
          <div key={i} className="bg-[#0F1629] p-4 rounded-xl border border-slate-800/50">
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-2">{stat}</span>
            <span className="font-display text-[32px] text-slate-200 leading-none">
              {i === 0 ? '1,248' : i === 1 ? '1,102' : i === 2 ? '142' : '1,200'}
            </span>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="bg-[#0F1629] rounded-xl border border-slate-800/50 overflow-hidden">
        
        <div className="p-4 border-b border-slate-800/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search by Name, Reg ID, or Phone..." 
              className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 pl-10 pr-4 text-[13px] text-slate-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            <ShieldAlert size={14} className="text-amber-500" />
            <span>4 Pending approvals</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-800/50">
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-slate-500">Reg ID</th>
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-slate-500">Athlete Name</th>
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-slate-500">Contact</th>
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-slate-500">Event Mode</th>
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-slate-500">Bib #</th>
                <th className="py-3 px-6 font-sans text-[10px] font-bold uppercase tracking-widest text-slate-500">Payment</th>
                <th className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {ATHLETES.map(athlete => (
                <tr key={athlete.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="py-4 px-6 text-[13px] font-mono text-slate-400">{athlete.id}</td>
                  <td className="py-4 px-6 text-[14px] font-bold text-slate-200">{athlete.name}</td>
                  <td className="py-4 px-6">
                    <div className="text-[13px] text-slate-300">{athlete.phone}</div>
                    <div className="text-[11px] text-slate-500">{athlete.email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[10px] font-bold uppercase tracking-widest">
                      {athlete.mode}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[13px] font-mono text-gold">{athlete.bib || 'TBA'}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${
                      athlete.payment === 'PAID' ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30' :
                      athlete.payment === 'PENDING' ? 'bg-amber-900/30 text-amber-400 border-amber-500/30' :
                      'bg-red-900/30 text-red-400 border-red-500/30'
                    }`}>
                      {athlete.payment}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-slate-500 hover:text-slate-300 transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-800/50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">Showing 5 of 1,248</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-slate-800 text-slate-400 rounded hover:bg-slate-700 text-[11px] font-bold uppercase tracking-widest disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 bg-slate-800 text-slate-200 rounded hover:bg-slate-700 text-[11px] font-bold uppercase tracking-widest">Next</button>
          </div>
        </div>

      </div>
    </div>
  )
}
