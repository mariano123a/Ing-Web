'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navigation } from '../../components/layout/Navigation'
import { Footer } from '../../components/layout/Footer'
import { serviciosDetalle } from '../../lib/data'
import { Home, Building, Landmark, Palette, Ruler, Clipboard, ChevronRight, CheckCircle } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="w-8 h-8" />,
  building: <Building className="w-8 h-8" />,
  landmark: <Landmark className="w-8 h-8" />,
  palette: <Palette className="w-8 h-8" />,
  ruler: <Ruler className="w-8 h-8" />,
  clipboard: <Clipboard className="w-8 h-8" />,
}

export default function ServiciosPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out'
      })

      const cards = gridRef.current?.querySelectorAll('.servicio-card')
      if (cards) {
        gsap.fromTo(cards, { opacity: 0, y: 60 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%' }
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen bg-surface">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[350px] md:h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Servicios"
            className="w-full h-full object-cover brightness-[0.35]"
          />
        </div>
        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-secondary" />
              <span className="text-secondary uppercase tracking-widest text-sm font-medium">Servicios</span>
            </div>
            <h1 className="text-5xl md:text-7xl text-white font-headline mb-6">
              Soluciones Integrales
            </h1>
            <p className="text-xl text-stone-300 font-light max-w-2xl">
              Desde la concepción hasta la entrega, ofrecemos un servicio completo 
              para proyectos de cualquier escala y complejidad.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold">6</div>
            <div className="text-sm opacity-80">Líneas de Servicio</div>
          </div>
          <div>
            <div className="text-3xl font-bold">150+</div>
            <div className="text-sm opacity-80">Proyectos Ejecutados</div>
          </div>
          <div>
            <div className="text-3xl font-bold">25+</div>
            <div className="text-sm opacity-80">Años de Experiencia</div>
          </div>
          <div>
            <div className="text-3xl font-bold">120+</div>
            <div className="text-sm opacity-80">Profesionales</div>
          </div>
        </div>
      </section>

      {/* Servicios Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-secondary" />
            <span className="text-secondary uppercase tracking-widest text-sm font-medium">Lo Que Hacemos</span>
            <div className="w-12 h-[2px] bg-secondary" />
          </div>
          <h2 className="text-4xl font-headline text-on-surface">Nuestros Servicios</h2>
        </div>

        <div ref={gridRef} className="grid lg:grid-cols-2 gap-8">
          {serviciosDetalle.map((servicio, i) => (
            <div
              key={servicio.id}
              className={`servicio-card group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 ${i === 0 ? 'lg:col-span-2' : ''}`}
            >
              <div className={`grid ${i === 0 ? 'md:grid-cols-2' : ''} gap-0`}>
                <div className={`relative h-64 ${i === 0 ? 'md:h-auto' : ''} overflow-hidden`}>
                  <img
                    src={servicio.imagen}
                    alt={servicio.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-14 h-14 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center text-primary shadow-lg">
                      {iconMap[servicio.icono]}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-headline font-semibold text-on-surface mb-3 group-hover:text-primary transition-colors">
                    {servicio.titulo}
                  </h3>
                  <p className="text-stone-600 mb-6 leading-relaxed">{servicio.descripcionLarga}</p>

                  <div className="space-y-3 mb-6">
                    {servicio.caracteristicas.map((feat, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-stone-700">
                        <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                        {feat}
                      </div>
                    ))}
                  </div>

                  {/* Proceso */}
                  <div className="border-t border-stone-100 pt-6">
                    <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">Nuestro Proceso</h4>
                    <div className="space-y-3">
                      {servicio.proceso.map((paso) => (
                        <div key={paso.paso} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-bold text-primary flex-shrink-0 mt-0.5">
                            {paso.paso}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-on-surface">{paso.titulo}</div>
                            <div className="text-xs text-stone-500">{paso.descripcion}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-headline text-on-surface mb-4">
            ¿Necesitas un servicio a medida?
          </h2>
          <p className="text-lg text-stone-600 mb-8">
            Cada proyecto es único. Hablemos sobre tus necesidades específicas y diseñemos 
            una solución personalizada para ti.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Solicitar Consulta <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
