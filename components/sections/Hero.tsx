'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MagneticButton } from '../gsap/GSAPAnimations'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([titleRef.current, subtitleRef.current, buttonsRef.current], {
        opacity: 0,
        y: 60,
      })
      gsap.set(contentRef.current, {
        opacity: 0,
        x: -80,
      })

      // Timeline for entrance animations
      const tl = gsap.timeline({ delay: 0.3 })

      // Image scale animation
      tl.fromTo(
        imageRef.current,
        { scale: 1.2 },
        { scale: 1, duration: 1.8, ease: 'power2.out' },
        0
      )

      // Content slide in
      tl.to(
        contentRef.current,
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' },
        0.2
      )

      // Title animation with split effect
      tl.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power4.out',
        },
        0.4
      )

      // Subtitle
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.6
      )

      // Buttons stagger
      tl.to(
        buttonsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.8
      )

      // Scroll indicator
      tl.fromTo(
        scrollRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        1.2
      )

      // Scroll indicator bounce animation
      gsap.to(scrollRef.current, {
        y: 10,
        duration: 1,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      })

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full h-[921px] flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imageRef}
          className="w-full h-full object-cover brightness-75 scale-110"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAo-YnLcfmtYchA0UEg0JvmTQL6aVNYAKf1LSlBpjOKZsas_hWJxfdR7mljV3q3iZkbAHt82Lfp3524sYpcXHuHqZf7GGd3D7DJC5Cm2GVuIBcP6xcnAOjAm2mQgygs6Fx3xDo5gvfkQn5UtMPkx3PV8mBELJ1ByqlE1P4AZQyvpBeGxs3YbWCZYQ7Jya_YosOvseqz1TNWhCs9K4a7gYrPDoMxdz5v1gr1xB-3zQbbtVJlhtBCTKmZB7TEhFG1DldkdzSGJFLUzCk"
          alt="Modern high-end residence integrated into Andean mountain landscape"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 w-full">
        <div
          ref={contentRef}
          className="max-w-2xl bg-surface/10 backdrop-blur-md p-8 md:p-12 rounded-xl border-l-4 border-secondary shadow-2xl"
        >
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl text-white mb-6 leading-[1.1] font-headline"
          >
            Construimos su Legado en el Corazón de los Andes
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl text-stone-100 mb-10 font-light leading-relaxed max-w-lg"
          >
            Diseño, ingeniería y construcción de alta gama con el respeto que la tierra merece.
          </p>

          <div ref={buttonsRef} className="flex gap-4">
            <MagneticButton className="bg-secondary-container text-on-secondary-container px-10 py-4 rounded-lg font-bold uppercase tracking-widest text-sm hover:brightness-105 transition-all">
              Iniciar Proyecto
            </MagneticButton>

            <MagneticButton className="border-2 border-white/30 text-white px-10 py-4 rounded-lg font-bold uppercase tracking-widest text-sm backdrop-blur-sm hover:bg-white/10 transition-all">
              Ver Portafolio
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/80 rounded-full mt-2" />
        </div>
      </div>
    </section>
  )
}
