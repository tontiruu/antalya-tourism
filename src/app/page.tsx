import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import AnimatedCounter from '@/components/AnimatedCounter'
import Highlights from '@/components/Highlights'
import Experiences from '@/components/Experiences'
import Suluada from '@/components/Suluada'
import Gallery from '@/components/Gallery'
import TravelInfo from '@/components/TravelInfo'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <AnimatedCounter />
      <Highlights />
      <Experiences />
      <Suluada />
      <Gallery />
      <TravelInfo />
      <CTA />
      <Footer />
    </main>
  )
}
