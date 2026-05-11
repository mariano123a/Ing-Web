'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { ArrowRight, Clock, User } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const articulos = [
  {
    id: '1',
    titulo: 'Construcción Sostenible en Altura: Retos y Soluciones',
    extracto: 'Descubre cómo adaptamos técnicas de construcción bioclimática para el clima extremo de los Andes, reduciendo consumo energético en un 40%.',
    imagen: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600&q=60',
    autor: 'Arq. María Elena Vargas',
    fecha: '15 Abr 2026',
    categoria: 'Sostenibilidad',
    tiempo: '5 min',
  },
  {
    id: '2',
    titulo: 'Tecnología BIM: El Futuro de la Arquitectura en Perú',
    extracto: 'Modelado 3D integral que elimina errores en obra, reduce costos y permite visualizar el proyecto antes de la primera piedra.',
    imagen: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=60',
    autor: 'Ing. Javier Paredes',
    fecha: '02 Abr 2026',
    categoria: 'Tecnología',
    tiempo: '7 min',
  },
  {
    id: '3',
    titulo: 'Restauración del Patrimonio: Técnicas Ancestrales Modernizadas',
    extracto: 'Cómo combinamos conocimiento inca tradicional con ingeniería estructural contemporánea para preservar monumentos históricos.',
    imagen: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=60',
    autor: 'Arq. Lucía Quispe',
    fecha: '20 Mar 2026',
    categoria: 'Patrimonio',
    tiempo: '6 min',
  },
]

export function BlogPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.blog-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
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
            <span className="text-secondary uppercase tracking-widest text-sm font-medium">Blog</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-headline text-on-surface">Conocimiento & Tendencias</h2>
        </div>
        <Link
          href="#"
          className="mt-6 md:mt-0 inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
        >
          Ver todos los artículos <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {articulos.map((art) => (
          <article key={art.id} className="blog-card group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-lg transition-all duration-500">
            <div className="relative h-52 overflow-hidden">
              <img
                src={art.imagen}
                alt={art.titulo}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary text-white rounded-full text-xs font-semibold">
                  {art.categoria}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 text-xs text-stone-500 mb-3">
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {art.autor}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {art.tiempo}</span>
              </div>

              <h3 className="text-lg font-headline font-semibold text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {art.titulo}
              </h3>

              <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
                {art.extracto}
              </p>

              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-400">{art.fecha}</span>
                <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Leer más <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
