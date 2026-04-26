'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Navigation } from '../components/layout/Navigation'
import { Hero } from '../components/sections/Hero'

// Lazy load de componentes que no están en el viewport inicial
const PropuestaValor = dynamic(() => import('../components/sections/PropuestaValor').then(mod => ({ default: mod.PropuestaValor })), {
  loading: () => <div className="h-screen" />,
  ssr: true
})

const Servicios = dynamic(() => import('../components/sections/Servicios').then(mod => ({ default: mod.Servicios })), {
  loading: () => <div className="h-screen" />,
  ssr: true
})

const Proyectos = dynamic(() => import('../components/sections/Proyectos').then(mod => ({ default: mod.Proyectos })), {
  loading: () => <div className="h-screen flex items-center justify-center"><div className="animate-pulse text-on-surface-variant">Cargando proyectos...</div></div>,
  ssr: false // No SSR porque necesita datos de Supabase
})

const Diferenciales = dynamic(() => import('../components/sections/Diferenciales').then(mod => ({ default: mod.Diferenciales })), {
  loading: () => <div className="h-screen" />,
  ssr: true
})

const Testimonios = dynamic(() => import('../components/sections/Testimonios').then(mod => ({ default: mod.Testimonios })), {
  loading: () => <div className="h-screen" />,
  ssr: true
})

const Contacto = dynamic(() => import('../components/sections/Contacto').then(mod => ({ default: mod.Contacto })), {
  loading: () => <div className="h-screen" />,
  ssr: true
})

const Footer = dynamic(() => import('../components/layout/Footer').then(mod => ({ default: mod.Footer })), {
  loading: () => <div className="h-32" />,
  ssr: true
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Suspense fallback={<div className="h-screen" />}>
        <PropuestaValor />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Servicios />
      </Suspense>
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="animate-pulse">Cargando...</div></div>}>
        <Proyectos />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Diferenciales />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Testimonios />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <Contacto />
      </Suspense>
      <Suspense fallback={<div className="h-32" />}>
        <Footer />
      </Suspense>
    </main>
  )
}
