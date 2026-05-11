'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

export function HeroHome() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      tl.fromTo(imageRef.current, { scale: 1.15 }, { scale: 1, duration: 2, ease: 'power2.out' })

      tl.fromTo(
        '.hero-title',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' },
        0.2
      )

      tl.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        0.5
      )

      tl.fromTo(
        '.hero-btns',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.7
      )

      tl.fromTo(
        '.hero-scroll',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.2
      )

      gsap.to('.hero-scroll', {
        y: 10,
        duration: 1.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
          alt="Casaliz - Construcción de Alta Gama"
          className="w-full h-full object-cover brightness-[0.4]"
        />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-3xl">
          <div className="hero-title">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-secondary" />
              <span className="text-secondary uppercase tracking-widest text-sm font-medium">
                Desde 1999 en los Andes
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-headline leading-[1.1] mb-6">
              Construimos
              <br />
              <span className="text-secondary">Legados</span> que Perduran
            </h1>
          </div>

          <p className="hero-subtitle text-xl md:text-2xl text-stone-300 font-light leading-relaxed max-w-xl mb-10">
            Diseño, ingeniería y construcción de alta gama con el respeto que la tierra andina merece.
          </p>

          <div className="hero-btns flex flex-wrap gap-4">
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-8 py-4 rounded-lg font-semibold hover:brightness-110 transition-all"
            >
              Ver Proyectos <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Iniciar Proyecto
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <ChevronDown className="w-8 h-8 text-white/60" />
      </div>
    </section>
  )
}
