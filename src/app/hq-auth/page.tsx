'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldAlert, Lock, Fingerprint, ChevronRight } from 'lucide-react'

export default function HQAuthPage() {
  const router = useRouter()
  const [passcode, setPasscode] = useState('')
  const [status, setStatus] = useState<'IDLE' | 'VERIFYING' | 'GRANTED' | 'DENIED'>('IDLE')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('VERIFYING')
    
    // Stub validation - in production, this goes to Supabase for admin validation
    setTimeout(() => {
      if (passcode === '1234') { // Dummy password
        setStatus('GRANTED')
        setTimeout(() => router.push('/admin'), 1000)
      } else {
        setStatus('DENIED')
        setPasscode('')
        setTimeout(() => setStatus('IDLE'), 2000)
      }
    }, 1200)
  }

  return (
    <main className="min-h-screen bg-[#030712] flex items-center justify-center p-5 selection:bg-gold/30">
      
      {/* Tactical Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="w-full max-w-md relative z-10">
        
        {/* Terminal Window Frame */}
        <div className="bg-[#0A0F1C] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          
          {/* Header */}
          <div className="bg-slate-900/50 border-b border-slate-800 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldAlert size={18} className="text-gold animate-pulse" />
              <span className="font-mono text-[10px] text-slate-400 tracking-widest uppercase">Tour de Dar HQ // Secure Access</span>
            </div>
            <Lock size={14} className="text-slate-600" />
          </div>

          {/* Body */}
          <div className="p-8 flex flex-col items-center">
            
            <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-6">
              <Fingerprint size={28} className={
                status === 'VERIFYING' ? 'text-blue-400 animate-ping' : 
                status === 'GRANTED' ? 'text-emerald-400' : 
                status === 'DENIED' ? 'text-red-500' : 
                'text-slate-500'
              } />
            </div>

            <h1 className="font-display text-[24px] text-slate-200 uppercase tracking-widest mb-1 text-center">
              Authenticate HQ
            </h1>
            <p className="font-sans text-[11px] text-slate-500 tracking-widest uppercase mb-8 text-center">
              Enter clearance passcode to proceed
            </p>

            <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
              <div className="relative">
                <input 
                  type="password" 
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="• • • • • •"
                  className={`w-full bg-slate-950 border rounded-lg py-4 text-center font-mono text-[24px] tracking-widest outline-none transition-colors ${
                    status === 'DENIED' ? 'border-red-900/50 text-red-500 bg-red-950/20' :
                    status === 'GRANTED' ? 'border-emerald-900/50 text-emerald-500 bg-emerald-950/20' :
                    'border-slate-800 text-slate-200 focus:border-blue-500/50 focus:bg-blue-950/10'
                  }`}
                  disabled={status === 'VERIFYING' || status === 'GRANTED'}
                  autoFocus
                />
              </div>

              <button 
                type="submit"
                disabled={status !== 'IDLE' || passcode.length < 4}
                className="w-full bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 text-blue-400 py-3 rounded-lg font-sans text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'VERIFYING' ? 'Establishing Secure Link...' : 
                 status === 'GRANTED' ? 'Access Granted' :
                 status === 'DENIED' ? 'Access Denied' :
                 'Initialize Connection'}
                 {status === 'IDLE' && <ChevronRight size={14} />}
              </button>
            </form>
            
          </div>
        </div>

        {status === 'DENIED' && (
          <p className="text-center mt-4 font-mono text-[10px] text-red-500 uppercase tracking-widest animate-pulse">
            Warning: Invalid Clearance Code
          </p>
        )}
      </div>

    </main>
  )
}
