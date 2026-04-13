'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const propuestas = [
  {
    icon: 'diamond',
    title: 'Calidad Superior',
    description: 'Ejecución impecable utilizando materiales de primer nivel y técnicas constructivas de vanguardia.',
    color: 'bg-primary-container text-on-primary-container',
  },
  {
    icon: 'landscape',
    title: 'Compromiso Local',
    description: 'Profundo conocimiento del terreno cusqueño y respeto por la tradición arquitectónica andina.',
    color: 'bg-secondary-container text-on-secondary-container',
  },
  {
    icon: 'eco',
    title: 'Innovación Sostenible',
    description: 'Integramos tecnologías eco-eficientes para construcciones que perduran en armonía con el entorno.',
    color: 'bg-tertiary-container text-on-tertiary-container',
  },
]

export function PropuestaValor() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return

    const cards = cardsRef.current.children

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(cards, { opacity: 0, y: 60 })

      // Animate cards with stagger
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

      // Add hover animations to each card
      Array.from(cards).forEach((card) => {
        const icon = card.querySelector('.icon-wrapper')
        
        card.addEventListener('mouseenter', () => {
          gsap.to(card, { y: -10, duration: 0.3, ease: 'power2.out' })
          gsap.to(icon, { scale: 1.1, rotation: 5, duration: 0.3, ease: 'power2.out' })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, { y: 0, duration: 0.3, ease: 'power2.out' })
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.3, ease: 'power2.out' })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-8">
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {propuestas.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div
                className={`icon-wrapper w-16 h-16 ${item.color} rounded-full flex items-center justify-center mb-8`}
              >
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>

              <h3 className="text-2xl font-headline mb-4 group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <p className="text-on-surface-variant font-body leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
