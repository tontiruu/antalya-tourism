import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

const AnimatedCounter = dynamic(() => import('@/components/AnimatedCounter'))
const Highlights = dynamic(() => import('@/components/Highlights'))
const Experiences = dynamic(() => import('@/components/Experiences'))
const Suluada = dynamic(() => import('@/components/Suluada'))
const Gallery = dynamic(() => import('@/components/Gallery'))
const TravelInfo = dynamic(() => import('@/components/TravelInfo'))
const CTA = dynamic(() => import('@/components/CTA'))
const Footer = dynamic(() => import('@/components/Footer'))

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
