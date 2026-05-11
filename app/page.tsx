'use client'

import { Navigation } from '../components/layout/Navigation'
import { Footer } from '../components/layout/Footer'
import { HeroHome } from '../components/sections/HeroHome'
import { StatsSection } from '../components/sections/StatsSection'
import { ProyectosDestacados } from '../components/sections/ProyectosDestacados'
import { ServiciosPreview } from '../components/sections/ServiciosPreview'
import { TestimoniosHome } from '../components/sections/TestimoniosHome'
import { CTASection } from '../components/sections/CTASection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroHome />
      <StatsSection />
      <ProyectosDestacados />
      <ServiciosPreview />
      <TestimoniosHome />
      <CTASection />
      <Footer />
    </main>
  )
}
