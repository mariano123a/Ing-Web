'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonios } from '../../lib/data'
import { Quote, Star } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function TestimoniosHome() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.test-card', { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-[2px] bg-secondary" />
          <span className="text-secondary uppercase tracking-widest text-sm font-medium">Testimonios</span>
          <div className="w-12 h-[2px] bg-secondary" />
        </div>
        <h2 className="text-4xl md:text-5xl font-headline text-on-surface">Lo Que Dicen Nuestros Clientes</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonios.slice(0, 6).map((t) => (
          <div key={t.id} className="test-card bg-white p-8 rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
            <Quote className="w-8 h-8 text-secondary/30 mb-4" />
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
              ))}
            </div>
            <p className="text-stone-600 leading-relaxed mb-6 text-sm">{t.testimonio}</p>
            <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
              <img src={t.imagen} alt={t.nombre} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <div className="text-sm font-semibold text-on-surface">{t.nombre}</div>
                <div className="text-xs text-stone-500">{t.empresa}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
