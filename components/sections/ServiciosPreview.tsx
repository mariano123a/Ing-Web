'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { serviciosDetalle } from '../../lib/data'
import { Home, Building, Landmark, Palette, Ruler, Clipboard, ArrowRight } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="w-6 h-6" />,
  building: <Building className="w-6 h-6" />,
  landmark: <Landmark className="w-6 h-6" />,
  palette: <Palette className="w-6 h-6" />,
  ruler: <Ruler className="w-6 h-6" />,
  clipboard: <Clipboard className="w-6 h-6" />,
}

export function ServiciosPreview() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.sp-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-secondary" />
              <span className="text-secondary uppercase tracking-widest text-sm font-medium">Servicios</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-headline text-on-surface">Soluciones Integrales</h2>
          </div>
          <Link
            href="/servicios"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Ver todos los servicios <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviciosDetalle.map((servicio) => (
            <div
              key={servicio.id}
              className="sp-card group bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-500"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {iconMap[servicio.icono]}
              </div>
              <h3 className="text-xl font-headline font-semibold text-on-surface mb-3 group-hover:text-primary transition-colors">
                {servicio.titulo}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                {servicio.descripcion}
              </p>
              <div className="flex flex-wrap gap-2">
                {servicio.caracteristicas.slice(0, 3).map((feat, i) => (
                  <span key={i} className="px-3 py-1 bg-stone-50 rounded-full text-xs text-stone-600">
                    {feat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
