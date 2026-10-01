'use client'

import { useState } from 'react'
import { Scan, CheckCircle2, XCircle } from 'lucide-react'

export default function QRScannerPage() {
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState<{ id: string, name: string, status: 'VALID' | 'INVALID' | 'ALREADY_SCANNED' } | null>(null)

  const simulateScan = () => {
    setScanning(true)
    setScanResult(null)
    
    // Simulate camera delay and network request
    setTimeout(() => {
      setScanning(false)
      const mockResult = Math.random() > 0.3 
        ? { id: 'M-1049', name: 'James Mgasa', status: 'VALID' as const } 
        : { id: 'UNKNOWN', name: 'Unregistered', status: 'INVALID' as const }
      
      setScanResult(mockResult)
    }, 1500)
  }

  const resetScanner = () => setScanResult(null)

  return (
    <div className="space-y-6">
      
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-display text-[32px] uppercase text-royal-night leading-none mb-1">Check-In Scanner</h2>
          <p className="font-sans text-[12px] text-royal/60 font-bold uppercase tracking-widest">Registrar Terminal</p>
        </div>
      </header>

      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-[22px] border border-royal/10 p-6 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden shadow-card">
          
          {!scanResult ? (
            <>
              {/* Scanner Viewfinder */}
              <div className="relative w-64 h-64 border-2 border-royal/20 rounded-xl flex items-center justify-center bg-cream overflow-hidden mb-8">
                {/* Scanner corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-royal rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-royal rounded-tr-xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-royal rounded-bl-xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-royal rounded-br-xl" />
                
                {scanning ? (
                  <>
                    {/* Scanning Laser Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)] animate-[scan_1.5s_ease-in-out_infinite]" />
                    <Scan className="w-16 h-16 text-royal animate-pulse" />
                  </>
                ) : (
                  <Scan className="w-16 h-16 text-royal/30" />
                )}

                {/* Inline CSS animation for scanner */}
                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes scan {
                    0% { top: 0%; }
                    50% { top: 100%; }
                    100% { top: 0%; }
                  }
                `}} />
              </div>

              <button 
                onClick={simulateScan}
                disabled={scanning}
                className="w-full bg-royal text-white py-4 rounded-lg font-sans text-[13px] font-bold uppercase tracking-widest transition-all hover:bg-royal-deep disabled:opacity-50"
              >
                {scanning ? 'Scanning...' : 'Activate Scanner'}
              </button>
            </>
          ) : (
            
            <div className="w-full flex flex-col items-center animate-in zoom-in duration-200">
              {scanResult.status === 'VALID' ? (
                <div className="w-20 h-20 bg-emerald-50 rounded-full border border-emerald-200 flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} className="text-emerald-500" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-red-50 rounded-full border border-red-200 flex items-center justify-center mb-6">
                  <XCircle size={40} className="text-red-500" />
                </div>
              )}

              <h3 className={`font-display text-[32px] uppercase leading-none mb-2 ${scanResult.status === 'VALID' ? 'text-emerald-600' : 'text-red-600'}`}>
                {scanResult.status === 'VALID' ? 'Verified' : 'Invalid'}
              </h3>
              
              <div className="text-center mb-8">
                <p className="font-mono text-[14px] text-royal/50 uppercase tracking-widest">{scanResult.id}</p>
                <p className="font-bold text-[18px] text-royal-night mt-1">{scanResult.name}</p>
              </div>

              <button 
                onClick={resetScanner}
                className="w-full bg-royal-night hover:bg-royal text-white py-4 rounded-lg font-sans text-[13px] font-bold uppercase tracking-widest transition-all shadow-md"
              >
                Scan Next Athlete
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
