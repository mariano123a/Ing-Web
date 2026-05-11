'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Compass, FileText, HardHat, CheckCircle, Key } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const pasos = [
  {
    icon: <Compass className="w-6 h-6" />,
    num: '01',
    titulo: 'Descubrimiento',
    descripcion: 'Conocemos tus necesidades, visitamos el terreno y analizamos viabilidad. Definimos juntos la visión del proyecto.',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    num: '02',
    titulo: 'Diseño',
    descripcion: 'Nuestros arquitectos desarrollan bocetos, renders 3D y planos ejecutivos. Iteramos hasta que ames cada detalle.',
  },
  {
    icon: <HardHat className="w-6 h-6" />,
    num: '03',
    titulo: 'Ejecución',
    descripcion: 'Ingenieros, artesanos y supervisores trabajan en sincronía. Te reportamos avance semanal con fotos y métricas.',
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    num: '04',
    titulo: 'Control de Calidad',
    descripcion: 'Inspecciones rigurosas en cada etapa. Pruebas estructurales, acabados y sistemas antes de la entrega final.',
  },
  {
    icon: <Key className="w-6 h-6" />,
    num: '05',
    titulo: 'Entrega',
    descripcion: 'Entrega llave en mano con manual de mantenimiento y garantía estructural. Tu legado está listo.',
  },
]

export function ProcesoSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.proceso-card', { opacity: 0, y: 50 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-secondary" />
            <span className="text-secondary uppercase tracking-widest text-sm font-medium">Metodología</span>
            <div className="w-12 h-[2px] bg-secondary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-headline text-on-surface mb-4">Nuestro Proceso</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            De la idea a la realidad en 5 pasos claros, con transparencia total y excelencia en cada etapa.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-[2px] bg-stone-200 -z-0" />

          {pasos.map((paso, i) => (
            <div key={i} className="proceso-card relative z-10 text-center">
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                {paso.icon}
              </div>
              <div className="text-4xl font-bold text-stone-200 mb-2">{paso.num}</div>
              <h3 className="text-lg font-semibold text-on-surface mb-2">{paso.titulo}</h3>
              <p className="text-sm text-stone-600 leading-relaxed">{paso.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
