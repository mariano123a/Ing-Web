'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navigation } from '../../components/layout/Navigation'
import { Footer } from '../../components/layout/Footer'
import { equipo, testimonios, estadisticas, valores, historiaTimeline } from '../../lib/data'
import { Award, Star, Quote, Linkedin, Mail, ChevronRight } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function NosotrosPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(heroRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })

      // Stats counter animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item')
      if (statItems) {
        gsap.fromTo(statItems, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' }
        })
      }

      // Timeline
      const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item')
      if (timelineItems) {
        gsap.fromTo(timelineItems, { opacity: 0, x: -30 }, {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: timelineRef.current, start: 'top 80%' }
        })
      }

      // Team cards
      const teamCards = teamRef.current?.querySelectorAll('.team-card')
      if (teamCards) {
        gsap.fromTo(teamCards, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: teamRef.current, start: 'top 80%' }
        })
      }

      // Values
      const valueCards = valuesRef.current?.querySelectorAll('.value-card')
      if (valueCards) {
        gsap.fromTo(valueCards, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: valuesRef.current, start: 'top 85%' }
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen bg-surface">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt="Equipo Casaliz"
            className="w-full h-full object-cover brightness-[0.35]"
          />
        </div>
        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-secondary" />
              <span className="text-secondary uppercase tracking-widest text-sm font-medium">Sobre Nosotros</span>
            </div>
            <h1 className="text-5xl md:text-7xl text-white font-headline mb-6 leading-tight">
              Construyendo Legados en los Andes
            </h1>
            <p className="text-xl text-stone-300 font-light leading-relaxed max-w-2xl">
              Desde 1999, Casaliz transforma el paisaje arquitectónico del sur peruano con proyectos 
              que honran la tierra y trascienden generaciones.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {estadisticas.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">{stat.valor}{stat.sufijo}</div>
              <div className="text-sm opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-secondary" />
              <span className="text-secondary uppercase tracking-widest text-sm font-medium">Nuestra Filosofía</span>
            </div>
            <h2 className="text-4xl font-headline text-on-surface mb-8">Misión y Visión</h2>
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-xl border border-stone-100 shadow-sm">
                <h3 className="text-xl font-semibold text-primary mb-3">Nuestra Misión</h3>
                <p className="text-stone-600 leading-relaxed">
                  Transformar el entorno construido del Perú mediante proyectos de excelencia que integren 
                  innovación tecnológica, sostenibilidad ambiental y respeto por la herencia cultural andina, 
                  superando las expectativas de nuestros clientes en cada obra.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl border border-stone-100 shadow-sm">
                <h3 className="text-xl font-semibold text-primary mb-3">Nuestra Visión</h3>
                <p className="text-stone-600 leading-relaxed">
                  Ser la empresa constructora de referencia en Sudamérica para proyectos de alta gama 
                  en zonas de altura, reconocida por nuestra capacidad técnica, compromiso con el patrimonio 
                  y contribución al desarrollo sostenible de las comunidades donde operamos.
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600607687644-a17acc7f6f7b?w=800&q=80"
              alt="Equipo trabajando"
              className="rounded-2xl shadow-xl w-full"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border border-stone-100">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-secondary" />
                <div>
                  <div className="text-2xl font-bold text-on-surface">25+</div>
                  <div className="text-sm text-stone-500">Años de trayectoria</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-secondary" />
              <span className="text-secondary uppercase tracking-widest text-sm font-medium">Nuestra Historia</span>
              <div className="w-12 h-[2px] bg-secondary" />
            </div>
            <h2 className="text-4xl font-headline text-on-surface">Trayectoria de Excelencia</h2>
          </div>

          <div ref={timelineRef} className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-stone-200 md:-translate-x-px" />
            {historiaTimeline.map((item, i) => (
              <div key={i} className={`timeline-item relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="hidden md:block md:w-1/2" />
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-secondary rounded-full border-4 border-white shadow md:-translate-x-1/2 mt-1.5 z-10" />
                <div className="ml-16 md:ml-0 md:w-1/2 bg-white p-6 rounded-xl shadow-sm border border-stone-100">
                  <div className="text-3xl font-bold text-primary mb-2">{item.anio}</div>
                  <h3 className="text-lg font-semibold text-on-surface mb-2">{item.titulo}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{item.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-secondary" />
            <span className="text-secondary uppercase tracking-widest text-sm font-medium">Lo Que Nos Define</span>
            <div className="w-12 h-[2px] bg-secondary" />
          </div>
          <h2 className="text-4xl font-headline text-on-surface">Nuestros Valores</h2>
        </div>

        <div ref={valuesRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {valores.map((valor, i) => (
            <div key={i} className="value-card p-8 bg-white rounded-xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-on-surface mb-3">{valor.titulo}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{valor.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Equipo */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[2px] bg-secondary" />
              <span className="text-secondary uppercase tracking-widest text-sm font-medium">Nuestro Equipo</span>
              <div className="w-12 h-[2px] bg-secondary" />
            </div>
            <h2 className="text-4xl font-headline text-on-surface">Líderes de la Construcción</h2>
          </div>

          <div ref={teamRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {equipo.map((miembro) => (
              <div key={miembro.id} className="team-card bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                <div className="h-80 overflow-hidden">
                  <img
                    src={miembro.imagen}
                    alt={miembro.nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-headline font-semibold text-on-surface mb-1">{miembro.nombre}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{miembro.cargo}</p>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4">{miembro.bio}</p>
                  <div className="flex gap-3">
                    {miembro.linkedin && (
                      <a href={miembro.linkedin} className="p-2 bg-stone-100 rounded-lg hover:bg-primary hover:text-white transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {miembro.email && (
                      <a href={`mailto:${miembro.email}`} className="p-2 bg-stone-100 rounded-lg hover:bg-primary hover:text-white transition-colors">
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-secondary" />
            <span className="text-secondary uppercase tracking-widest text-sm font-medium">Testimonios</span>
            <div className="w-12 h-[2px] bg-secondary" />
          </div>
          <h2 className="text-4xl font-headline text-on-surface">Lo Que Dicen Nuestros Clientes</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonios.slice(0, 4).map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-xl border border-stone-100 shadow-sm">
              <Quote className="w-8 h-8 text-secondary/30 mb-4" />
              <p className="text-stone-600 text-sm leading-relaxed mb-6">{t.testimonio}</p>
              <div className="flex items-center gap-3">
                <img src={t.imagen} alt={t.nombre} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold text-on-surface">{t.nombre}</div>
                  <div className="text-xs text-stone-500">{t.empresa}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-headline mb-4">¿Listo para construir tu legado?</h2>
          <p className="text-lg text-stone-300 mb-8 max-w-2xl mx-auto">
            Contáctanos hoy y descubre cómo podemos transformar tu visión en una obra maestra 
            que perdurará por generaciones.
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-8 py-4 rounded-lg font-semibold hover:brightness-110 transition-all"
          >
            Iniciar Proyecto <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
