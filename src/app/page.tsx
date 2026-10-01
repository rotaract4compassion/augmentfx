import dynamic from 'next/dynamic'
import HomeNav       from '@/components/home/HomeNav'
import HeroSection   from '@/components/home/HeroSection'
import RouteScroll   from '@/components/home/RouteScroll'
import EventsSection from '@/components/home/EventsSection'
import ImpactSection from '@/components/home/ImpactSection'
import SponsorsSection from '@/components/home/SponsorsSection'
import EventDayTabs  from '@/components/home/EventDayTabs'
import HomeFooter    from '@/components/home/HomeFooter'

const LiveParticipantsMap = dynamic(() => import('@/components/shared/LiveParticipantsMap'), { 
  ssr: false, 
  loading: () => <div className="w-full h-[400px] lg:h-[600px] bg-royal-night/10 animate-pulse rounded-[24px]" /> 
})

export default function HomePage() {
  return (
    <main className="relative bg-royal">
      <HomeNav />
      
      {/* RouteScroll is absolute/fixed and tracks the scrolling of its container */}
      <div className="relative">
        <RouteScroll />
        
        {/* Page Content */}
        <HeroSection />
        <EventsSection />
        
        {/* Live Registration Map Section */}
        <section className="relative px-5 py-12 lg:px-12 xl:px-16 bg-cream">
          <div className="max-w-wide mx-auto pl-0 sm:pl-12">
            <LiveParticipantsMap />
          </div>
        </section>

        <SponsorsSection />
        <ImpactSection />
        <EventDayTabs />
        <HomeFooter />
      </div>
    </main>
  )
}
