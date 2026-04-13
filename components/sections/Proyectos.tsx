'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const proyectos = [
  {
    id: 1,
    categoria: 'Hospitalidad',
    titulo: 'Hotel Boutique San Blas',
    imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBISOWbb7qHlUyU4RzHsyZIySV5AJl4LbXVoPfM5rkRIA9R-O133f9C0siIlmbhtmyg2JuLsQNJDrF4DHZ7qU_aytffGlwDhtjjHsJH66XzROSqil5u44KdbBsfC_sBiEFxwkaNgpjvTQtN10ZAOf9yvSHUJJB0hDUb9DN0_x-c7nUtweIOZFZ7lsUZ2BDUIftkjotwSkJP8I1LMKQRHZO-iG-_ryB9MxNvXBPoJ-7O6o4L0-EFGQSQs2WnsJcQsKaLIP2BmJzwzVo',
    span: 'col-span-12 md:col-span-8',
  },
  {
    id: 2,
    categoria: 'Residencial',
    titulo: 'Refugio del Valle',
    imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXmwFD-8xonzLBw1h527jEaHg00tSZSoAU1N-0DAumaFrTmeFZkHZfNTLaqMFOA08LcPTVz0bEJXJg6Lxf5OUNR6VD1WtRi9nHsyTfJg5GCG_U96aO1Lu8TIctmYdBkfTPgHzvwAFtcyvpGOPOBFZ6zou34LjEA6crxCuZ-inPq1fighI_-jk0J4q7fEMubeJec8TF0YBoTiV520OqYU2zZD2ax7ulOqTWWTJhR67frjLEAwkzoGTqUSyyWawj5BWLuBPKLBsVPQw',
    span: 'col-span-12 md:col-span-4',
  },
  {
    id: 3,
    categoria: 'Interiorismo',
    titulo: 'Villa Sacsayhuamán',
    imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTcRpU5SveGbAHYf2EYalrEKhvBzfVl4EMdUaDv8O2x9l9zcWAc5D8QFTBqUBUxqZdRfRZYQV04YhhY7O2HSy2z36bc9FwXO7bGWbtAQMKXJrfErxkad0vOXuzU7hDZi_PQss2E99_YTrdnCUd07fbDBOnYrZ524msK-VtCct-CH8UTJB_PzVATXWt5NnoAEkL4LVXGjhVLD6lfGhIFDdHuQR9snnGJnBHkLDwJqHlxEBTCbOy3HeRM4qZixtE_XIJd25sFUKY4ZI',
    span: 'col-span-12 md:col-span-4',
  },
  {
    id: 4,
    categoria: 'Comercial',
    titulo: 'Centro de Innovación Cusco',
    imagen: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzx8pk57R4X6FI0-rVq-t5hSPbmOqM5-bFi7C5x9ZTAd3Nue2ekBoFbfaDaEc9YLtOlB5MvDIGm9BBvF40VRo9gWzxMeM0VJ9HXenkkzY8eDcfdFopW_zA8Rkj0VTLZHOKyawo8trJqC6MSJ8IpFMHPCOkX9g8l04kUL0kSGzPwL32gvns82nYJHy05UXH1tH8MSKEnWqTH3ndaT002vATJfFhh07KMBNuscioqLpkpCdGfYW2Aii2cuRWIDN15qbcIjVm0RIZZM8',
    span: 'col-span-12 md:col-span-8',
  },
]

export function Proyectos() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.set(titleRef.current, { opacity: 0, y: 40 })
      gsap.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Grid items animation
      const items = gridRef.current?.children
      if (items) {
        gsap.set(items, { 
          opacity: 0, 
          y: 60,
          scale: 0.95,
        })
        
        gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })

        // Add hover effects to each item
        Array.from(items).forEach((item) => {
          const img = item.querySelector('img')
          const overlay = item.querySelector('.hover-overlay')
          const content = item.querySelector('.content-wrapper')

          item.addEventListener('mouseenter', () => {
            gsap.to(item, { scale: 1.02, duration: 0.5, ease: 'power2.out' })
            gsap.to(img, { scale: 1.08, duration: 0.8, ease: 'power2.out' })
            gsap.to(overlay, { opacity: 1, duration: 0.3 })
            gsap.to(content, { y: -5, duration: 0.3, ease: 'power2.out' })
          })

          item.addEventListener('mouseleave', () => {
            gsap.to(item, { scale: 1, duration: 0.5, ease: 'power2.out' })
            gsap.to(img, { scale: 1, duration: 0.8, ease: 'power2.out' })
            gsap.to(overlay, { opacity: 0, duration: 0.3 })
            gsap.to(content, { y: 0, duration: 0.3, ease: 'power2.out' })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="proyectos" className="py-32 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-headline">
            Portafolio Selecto
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-12 gap-6 md:auto-rows-[300px]">
          {proyectos.map((proyecto) => (
            <div
              key={proyecto.id}
              className={`${proyecto.span} overflow-hidden rounded-xl group relative cursor-pointer`}
            >
              <div className="w-full h-full relative">
                <img
                  src={proyecto.imagen}
                  alt={proyecto.titulo}
                  className="w-full h-full object-cover"
                />

                <div className="content-wrapper absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
                  <div>
                    <p className="text-sm font-bold tracking-widest uppercase mb-2 text-white/90">
                      {proyecto.categoria}
                    </p>
                    <h4 className="text-3xl font-headline text-white">
                      {proyecto.titulo}
                    </h4>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="hover-overlay absolute inset-0 bg-primary/20 opacity-0 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
