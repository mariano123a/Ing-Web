'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const diferenciales = [
  {
    icon: 'architecture',
    title: 'Precisión de Ingeniería',
    description: 'Cálculos estructurales rigurosos que garantizan la seguridad en zonas de alta sismicidad.',
  },
  {
    icon: 'construction',
    title: 'Materiales de Origen',
    description: 'Selección curada de piedra volcánica, maderas nobles y acabados importados de la más alta calidad.',
  },
  {
    icon: 'groups',
    title: 'Gestión Integral',
    description: 'Nos encargamos de todo el proceso, desde los permisos municipales hasta la entrega de llaves.',
  },
]

export function Diferenciales() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Image slide in from left
      gsap.set(imageContainerRef.current, { opacity: 0, x: -100 })
      gsap.to(imageContainerRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Floating badge animation
      gsap.set(badgeRef.current, { opacity: 0, y: 30, scale: 0.8 })
      gsap.to(badgeRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Badge hover effect
      const badge = badgeRef.current
      if (badge) {
        badge.addEventListener('mouseenter', () => {
          gsap.to(badge, { scale: 1.05, duration: 0.3, ease: 'power2.out' })
        })
        badge.addEventListener('mouseleave', () => {
          gsap.to(badge, { scale: 1, duration: 0.3, ease: 'power2.out' })
        })
      }

      // Image hover effect
      const imgContainer = imageContainerRef.current
      if (imgContainer) {
        imgContainer.addEventListener('mouseenter', () => {
          gsap.to(imageRef.current, { scale: 1.02, duration: 0.4, ease: 'power2.out' })
        })
        imgContainer.addEventListener('mouseleave', () => {
          gsap.to(imageRef.current, { scale: 1, duration: 0.4, ease: 'power2.out' })
        })
      }

      // Title slide in from right
      gsap.set(titleRef.current, { opacity: 0, x: 80 })
      gsap.to(titleRef.current, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Items stagger from right
      const items = itemsRef.current?.children
      if (items) {
        gsap.set(items, { opacity: 0, x: 60 })
        gsap.to(items, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })

        // Add hover effects
        Array.from(items).forEach((item) => {
          const icon = item.querySelector('.icon-wrapper')
          
          item.addEventListener('mouseenter', () => {
            gsap.to(item, { x: 10, duration: 0.2, ease: 'power2.out' })
            gsap.to(icon, { rotation: 10, scale: 1.1, duration: 0.2, ease: 'power2.out' })
          })

          item.addEventListener('mouseleave', () => {
            gsap.to(item, { x: 0, duration: 0.2, ease: 'power2.out' })
            gsap.to(icon, { rotation: 0, scale: 1, duration: 0.2, ease: 'power2.out' })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="nosotros" className="py-32 bg-primary text-on-primary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl" />

      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
        {/* Image side */}
        <div ref={imageContainerRef} className="relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl" />

          <img
            ref={imageRef}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjG1OJo4AEIeuCaCjslFGHe9Zf2otRcXPuHxqvaxq84nNHoWJHISWY6tda2nHlOZ94nafh4bXI405WRPpJdqoWOCw__oOTCyGFHbScDIp-g5-e94TXf0pUVIt0EjQs9Fp2UOlKzDAutHoFJvXltn7-K00E4SGFCDrWrZ320znXWdVM-iibhDzZijyWTF6YvsXcGfO5u3ijLVjETwP4QXaJ2R4r5Na9jm8a8_-pUqKQIqJoKsQpw8do-S5VrX5JPiL44lpkuE1Yhv8"
            alt="Architect reviewing blueprints"
            className="rounded-xl shadow-2xl relative z-10 w-full aspect-square object-cover cursor-pointer"
          />

          {/* Floating badge */}
          <div
            ref={badgeRef}
            className="absolute -bottom-6 -right-6 bg-secondary-container p-8 rounded-lg shadow-xl z-20 hidden md:block cursor-pointer"
          >
            <p className="text-on-secondary-container font-headline text-3xl">20+</p>
            <p className="text-on-secondary-container text-xs font-bold uppercase tracking-widest">
              Años de Maestría
            </p>
          </div>
        </div>

        {/* Content side */}
        <div>
          <h2 ref={titleRef} className="text-4xl md:text-6xl font-headline mb-8">
            ¿Por qué confiar en Casaliz?
          </h2>

          <div ref={itemsRef} className="space-y-10">
            {diferenciales.map((item) => (
              <div key={item.title} className="flex gap-6 group cursor-pointer">
                <div className="icon-wrapper text-secondary-container">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>

                <div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-secondary-container transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-on-primary-container leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
