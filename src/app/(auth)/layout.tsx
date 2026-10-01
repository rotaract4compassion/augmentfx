'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

function StandardAuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isRegister = pathname.startsWith('/register')
  const isReset = pathname.startsWith('/reset-password')

  return (
    <div className="min-h-dvh overflow-hidden bg-cream">
      <div className="min-h-dvh grid lg:grid-cols-[40%_60%] relative">
        
        {/* Left Side: Beautiful Dar City Bridge Image with clear overlays */}
        <section className="relative min-h-[300px] lg:min-h-dvh overflow-hidden bg-royal">
          <Image src="/assets/auth/dar-city-bridge.jpg" alt="Dar es Salaam waterfront and bridge" fill className="object-cover" />
          <div className="absolute inset-0 bg-royal/20 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-night/90 via-royal/10 to-transparent" />
        </section>

        {/* Right Side: Form Area with Tour de Dar stripes */}
        <section className="relative min-h-[calc(100dvh-300px)] lg:min-h-dvh bg-cream overflow-visible">
          
          <div className="absolute right-0 top-0 flex gap-2 opacity-90">
            <span className="h-36 w-4 rotate-[24deg] bg-royal-night" />
            <span className="h-28 w-3 rotate-[24deg] bg-gold" />
            <span className="h-44 w-4 rotate-[24deg] bg-royal" />
          </div>
          <div className="absolute bottom-0 right-0 flex gap-2 opacity-90">
            <span className="h-40 w-4 rotate-[24deg] bg-royal" />
            <span className="h-32 w-5 rotate-[24deg] bg-royal-night" />
            <span className="h-24 w-4 rotate-[24deg] bg-gold" />
          </div>

          <main className="relative z-20 flex min-h-[calc(100dvh-300px)] lg:min-h-dvh items-center justify-center px-5 py-8 lg:px-0 lg:py-10">
            <div className="w-full max-w-[470px] lg:-ml-[33%]">
              
              <div className="overflow-hidden rounded-[22px] bg-white shadow-card-lg ring-1 ring-royal/10">
                
                <div className="flex h-[7px] w-full">
                  <span className="flex-[4] bg-royal" />
                  <span className="flex-[3] bg-royal-night" />
                  <span className="flex-[2] bg-gold" />
                </div>
                
                <div className="px-7 pb-8 pt-7 sm:px-9 sm:pb-9 sm:pt-8">
                  {!isReset && (
                    <div className="mb-7 flex items-center rounded-full bg-cream p-1">
                      <Link href="/login" className={`flex-1 rounded-full py-2.5 text-center font-sans text-[12px] font-extrabold uppercase tracking-wider transition-all ${!isRegister ? 'bg-royal text-cream shadow-sm' : 'text-royal/60 hover:text-royal'}`}>Sign in</Link>
                      <Link href="/register" className={`flex-1 rounded-full py-2.5 text-center font-sans text-[12px] font-extrabold uppercase tracking-wider transition-all ${isRegister ? 'bg-royal text-cream shadow-sm' : 'text-royal/60 hover:text-royal'}`}>Register</Link>
                    </div>
                  )}
                  {children}
                </div>

              </div>

            </div>
          </main>

        </section>
      </div>
    </div>
  )
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // Sign in, register and reset-password all render through the same
  // StandardAuthLayout shell. Only the form in `children` changes between
  // them — page chrome, split panel, stripes and tab bar stay identical.
  return <StandardAuthLayout>{children}</StandardAuthLayout>
}