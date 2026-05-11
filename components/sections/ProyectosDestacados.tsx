'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { proyectos } from '../../lib/data'
import { ArrowRight, MapPin } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const featured = proyectos.filter(p => p.featured).slice(0, 4)

export function ProyectosDestacados() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.pd-card', { opacity: 0, y: 60 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-secondary" />
            <span className="text-secondary uppercase tracking-widest text-sm font-medium">Portafolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline text-on-surface">Proyectos Destacados</h2>
        </div>
        <Link
          href="/proyectos"
          className="mt-6 md:mt-0 inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
        >
          Ver todos los proyectos <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {featured.map((proyecto, i) => (
          <Link
            key={proyecto.id}
            href={`/proyectos/${proyecto.id}`}
            className={`pd-card group relative overflow-hidden rounded-2xl ${i === 0 ? 'md:row-span-2' : ''}`}
          >
            <div className={`relative ${i === 0 ? 'h-[500px]' : 'h-64'} overflow-hidden`}>
              <img
                src={proyecto.imagenes[0]}
                alt={proyecto.nombre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-semibold text-stone-800">
                  {proyecto.estado}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-1 text-white/80 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  {proyecto.ubicacion}
                </div>
                <h3 className="text-2xl font-headline font-semibold text-white mb-2 group-hover:text-secondary transition-colors">
                  {proyecto.nombre}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2">{proyecto.descripcion}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
