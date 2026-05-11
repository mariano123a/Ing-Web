'use client'

import { Navigation } from '../components/layout/Navigation'
import { Footer } from '../components/layout/Footer'
import { HeroHome } from '../components/sections/HeroHome'
import { StatsSection } from '../components/sections/StatsSection'
import { ClientesSection } from '../components/sections/ClientesSection'
import { ProyectosDestacados } from '../components/sections/ProyectosDestacados'
import { ServiciosPreview } from '../components/sections/ServiciosPreview'
import { ProcesoSection } from '../components/sections/ProcesoSection'
import { TestimoniosHome } from '../components/sections/TestimoniosHome'
import { BlogPreviewSection } from '../components/sections/BlogPreviewSection'
import { CTASection } from '../components/sections/CTASection'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroHome />
      <StatsSection />
      <ClientesSection />
      <ProyectosDestacados />
      <ServiciosPreview />
      <ProcesoSection />
      <TestimoniosHome />
      <BlogPreviewSection />
      <CTASection />
      <Footer />
    </main>
  )
}
