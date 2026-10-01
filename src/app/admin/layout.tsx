'use client'

import Link from 'next/link'
import { ShieldAlert, BarChart3, Users, Crosshair, LogOut, Image as ImageIcon } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream text-royal-night font-sans selection:bg-gold/30 flex">
      
      {/* Sidebar - Tactical Light Aesthetic */}
      <aside className="w-[280px] bg-white border-r border-royal/10 flex flex-col h-screen sticky top-0 shadow-card">
        <div className="p-6 border-b border-royal/10">
          <div className="flex items-center gap-3 mb-1">
            <ShieldAlert size={24} className="text-royal" />
            <h1 className="font-display text-[20px] uppercase text-royal-night tracking-wider leading-none">
              ADMIN PORTAL
            </h1>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-royal/60 font-bold">Tactical Event Grid</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-md text-[12px] font-bold uppercase tracking-widest bg-royal text-white shadow-sm transition-all hover:bg-royal-deep">
            <BarChart3 size={16} /> Global Command
          </Link>
          <Link href="/admin/crm" className="flex items-center gap-3 px-4 py-3 rounded-md text-[12px] font-bold uppercase tracking-widest text-royal/70 hover:bg-royal/5 hover:text-royal transition-all">
            <Users size={16} /> Registrars CRM
          </Link>
          <Link href="/admin/sponsors" className="flex items-center gap-3 px-4 py-3 rounded-md text-[12px] font-bold uppercase tracking-widest text-royal/70 hover:bg-royal/5 hover:text-royal transition-all">
            <ImageIcon size={16} /> Sponsors
          </Link>
          <Link href="/admin/showcase" className="flex items-center gap-3 px-4 py-3 rounded-md text-[12px] font-bold uppercase tracking-widest text-royal/70 hover:bg-royal/5 hover:text-royal transition-all">
            <Users size={16} /> Showcase Portal
          </Link>
          <Link href="/admin/gala" className="flex items-center gap-3 px-4 py-3 rounded-md text-[12px] font-bold uppercase tracking-widest text-royal/70 hover:bg-royal/5 hover:text-royal transition-all">
            <BarChart3 size={16} /> Gala Management
          </Link>
          <Link href="/admin/scanner" className="flex items-center gap-3 px-4 py-3 rounded-md text-[12px] font-bold uppercase tracking-widest text-royal/70 hover:bg-royal/5 hover:text-royal transition-all">
            <Crosshair size={16} /> Check-in Scanner
          </Link>
        </nav>

        <div className="p-4 border-t border-royal/10">
          <Link href="/hq-auth" className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-md text-[11px] font-bold uppercase tracking-widest transition-colors">
            <LogOut size={14} /> Terminate Link
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  )
}