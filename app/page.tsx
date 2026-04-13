'use client'

import { Navigation } from '../components/layout/Navigation'
import { Hero } from '../components/sections/Hero'
import { PropuestaValor } from '../components/sections/PropuestaValor'
import { Servicios } from '../components/sections/Servicios'
import { Proyectos } from '../components/sections/Proyectos'
import { Diferenciales } from '../components/sections/Diferenciales'
import { Testimonios } from '../components/sections/Testimonios'
import { Contacto } from '../components/sections/Contacto'
import { Footer } from '../components/layout/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <PropuestaValor />
      <Servicios />
      <Proyectos />
      <Diferenciales />
      <Testimonios />
      <Contacto />
      <Footer />
    </main>
  )
}
