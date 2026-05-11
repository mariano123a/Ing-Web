'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const clientes = [
  'Inversiones Andinas S.A.C.',
  'Corporación Andina de Desarrollo',
  'Inti Wasi Hospitality',
  'Arzobispado de Cusco',
  'Fundación Patrimonio Vivo',
  'Quinua Andina Export S.A.C.',
  'Grupo Altos S.A.C.',
  'Inversiones Wanchaq S.A.',
]

export function ClientesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.cliente-logo', { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-white border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-sm text-stone-500 uppercase tracking-widest font-medium">Confían en Nosotros</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
          {clientes.map((cliente, i) => (
            <div
              key={i}
              className="cliente-logo flex items-center justify-center h-16 px-4 bg-stone-50 rounded-lg border border-stone-100 hover:border-primary/20 transition-colors"
            >
              <span className="text-xs font-medium text-stone-500 text-center leading-tight">{cliente}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
