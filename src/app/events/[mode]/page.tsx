import Link from 'next/link'
import dynamic from 'next/dynamic'

const EventRouteMap = dynamic(() => import('@/components/shared/EventRouteMap'), { ssr: false, loading: () => <div className="w-full h-full bg-royal-night/10 animate-pulse" /> })

export default function EventDynamicPage({ params }: { params: { mode: string } }) {
  // Ensure mode matches the expected typing for the map component
  const mode = (params.mode as 'cycling' | 'marathon' | 'walkathon')

  return (
    <main className="min-h-screen bg-cream pt-32 pb-16 px-5 lg:px-12 xl:px-16">
      <div className="max-w-wide mx-auto text-royal-night">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <p className="font-sans text-[12px] font-bold uppercase tracking-widest text-ink-subtle mb-4">Official Route Guide</p>
            <h1 className="font-display text-hero uppercase tracking-tight text-ink leading-none">
              The {params.mode} <span className="text-royal">Course</span>
            </h1>
          </div>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-4 bg-gold text-royal-night rounded-pill font-sans font-extrabold text-[14px] uppercase tracking-wider hover:bg-gold-dark shadow-gold transition-all"
          >
            Register for {params.mode}
          </Link>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          <div className="lg:col-span-2 h-[500px] bg-[#0A192F] rounded-2xl overflow-hidden shadow-card-lg relative">
             <EventRouteMap mode={mode} distance={20} />
             <div className="absolute top-4 left-4 z-[400] pointer-events-none">
               <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-lg border border-black/5 shadow-card">
                 <p className="font-sans text-[10px] uppercase tracking-widest text-ink-muted mb-1">Interactive Route</p>
                 <p className="font-display text-[24px] uppercase text-royal">HQ Confirmed</p>
               </div>
             </div>
          </div>

          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-card border border-royal/5">
              <h3 className="font-sans text-[14px] font-bold uppercase tracking-widest text-ink-subtle mb-6">Course Specs</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-ink/5 pb-2">
                  <span className="font-sans text-[14px] text-ink-muted">Elevation Gain</span>
                  <span className="font-display text-[20px] text-ink">142m</span>
                </li>
                <li className="flex justify-between items-center border-b border-ink/5 pb-2">
                  <span className="font-sans text-[14px] text-ink-muted">Water Stations</span>
                  <span className="font-display text-[20px] text-ink">Every 5km</span>
                </li>
                <li className="flex justify-between items-center border-b border-ink/5 pb-2">
                  <span className="font-sans text-[14px] text-ink-muted">Terrain</span>
                  <span className="font-display text-[20px] text-ink">Tarmac & Urban</span>
                </li>
              </ul>
            </div>

            <div className="bg-royal p-8 rounded-2xl shadow-card flex flex-col justify-between h-full">
              <div>
                <h3 className="font-sans text-[14px] font-bold uppercase tracking-widest text-gold mb-4">Community Insights</h3>
                <p className="font-sans text-[14px] text-white/80 mb-6">
                  Check out training tips, route hazards, and connect with other athletes running the {params.mode} course on the #Move community forum.
                </p>
              </div>
              <Link 
                href="/move"
                className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-cream text-royal-night rounded-pill font-sans font-bold text-[12px] uppercase tracking-wider transition-colors"
              >
                Go to #Move Forum →
              </Link>
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}
