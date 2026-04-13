'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const servicios = [
  {
    tag: 'Premium',
    title: 'Residencial',
    description: 'Hogares que trascienden el tiempo, diseñados para el confort absoluto en climas de altura.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFbIF1V-3-gej_IAg7tPQWVNCMDREI761WjNsF8K8_LMBriadJSf0KxVdx6YUnyGajI2RkMZrXC6tqUVLI9_Aqc8HUuSgYw34ZTVK5uPWvhWYs2YbQT34WPBehexn0p_8KOSk1PrHTMpchUsGpGv0vVG-oNl1O-FdlY0l_nFbcGao8hmXB7OeFy-YuQqhiEtqKtq9XpTi-TpS51v18vpkQe_hBVcXFm5Iq-lWTUcI512cdH0zF0z688mJTb-cyzcF2gP1QvXVTJVI',
  },
  {
    tag: 'Corporate',
    title: 'Comercial',
    description: 'Espacios corporativos y hoteleros que proyectan solidez y modernidad tecnológica.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmnZtg2B7zgbeo1esI9MhSlNT9QHpqKXqKd4DmWnMnj9Lqgqi8wmtkSfQ3tIIGNHOY-Cc74GfDh78IazLhzXvh4SucLaUVjLw7V1VyDYBhrPGyQZDLgJmvs3g9g8ELnuwiXYa80ZJ0V6q8EE97Xu-r6f4pZmx7JgS693fY50u-Z_5aDDOgyouWbwhpVuJMH8qw_VQd-GM_YvV8luPQnKhi5zhTf5K-Ff9XYz2UigRxjM0ZVgyX_mnxXTZh2P5YiBf_m7bj3Rk2kdY',
  },
  {
    tag: 'Heritage',
    title: 'Restauración Lítica',
    description: 'Preservación técnica de estructuras de piedra con artesanos expertos en herencia Inca.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbrWQTGS89cBUoZ5e_EyP8gdDKDdy8iVxTXImp1hScaaPa2J7BGavaDqodYmnA1kcAHI2whvvMdNEFxtXl0MHBLMjs72gxJYJXt316b47Vfm9Vl4OsXXEFZ04bfKQAP3WXkN033IFFbK50MiKa92IXfJv3cQpmw_hQYQoWO7tSWzrUiytscLcjMhDlIPLr6wLYGPg8cdKCvFyhgpclzBy861Wr66H6Nw1rw4sS0xuyaXTuVEUiBXEMEIYdfVk2MM77YUHY5f5iH88',
  },
]

export function Servicios() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Header animation
      gsap.set(headerRef.current, { opacity: 0, y: 40 })
      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Cards animation
      const cards = cardsRef.current?.children
      if (cards) {
        gsap.set(cards, { opacity: 0, y: 60 })
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })

        // Add hover effects
        Array.from(cards).forEach((card) => {
          const image = card.querySelector('img')
          const arrow = card.querySelector('.arrow-icon')

          card.addEventListener('mouseenter', () => {
            gsap.to(card, { y: -8, duration: 0.4, ease: 'power2.out' })
            gsap.to(image, { scale: 1.1, duration: 0.7, ease: 'power2.out' })
            gsap.to(arrow, { x: 5, duration: 0.3, ease: 'power2.out' })
          })

          card.addEventListener('mouseleave', () => {
            gsap.to(card, { y: 0, duration: 0.4, ease: 'power2.out' })
            gsap.to(image, { scale: 1, duration: 0.7, ease: 'power2.out' })
            gsap.to(arrow, { x: 0, duration: 0.3, ease: 'power2.out' })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="servicios" className="py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div ref={headerRef} className="flex justify-between items-end mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-headline mb-6">
              Excelencia en cada especialidad
            </h2>
            <p className="text-on-surface-variant">
              Desde residencias privadas hasta la restauración de patrimonio histórico, nuestra maestría es el cimiento de su visión.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicios.map((servicio) => (
            <div
              key={servicio.title}
              className="group relative overflow-hidden rounded-xl bg-surface-container-lowest h-full flex flex-col cursor-pointer"
            >
              {/* Image */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={servicio.image}
                  alt={servicio.title}
                  className="w-full h-full object-cover scale-100"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex-1 flex flex-col">
                <span className="text-xs font-bold tracking-[0.2em] text-secondary uppercase mb-2">
                  {servicio.tag}
                </span>

                <h4 className="text-2xl font-headline mb-3 group-hover:text-primary transition-colors">
                  {servicio.title}
                </h4>

                <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-1">
                  {servicio.description}
                </p>

                <a
                  href="#"
                  className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase"
                >
                  Explorar
                  <span className="material-symbols-outlined text-base arrow-icon">arrow_forward</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
