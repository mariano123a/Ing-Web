'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProyectos, Proyecto } from '../../lib/supabase'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Proyectos() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchProyectos() {
      try {
        const data = await getProyectos()
        setProyectos(data)
      } catch (error) {
        console.error('Error fetching proyectos:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProyectos()
  }, [])

  useEffect(() => {
    if (!sectionRef.current || loading) return

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
  }, [loading])

  // Función para determinar el span basado en el índice
  const getSpanClass = (index: number) => {
    const pattern = [
      'col-span-12 md:col-span-8',
      'col-span-12 md:col-span-4',
      'col-span-12 md:col-span-4',
      'col-span-12 md:col-span-8',
    ]
    return pattern[index % pattern.length]
  }

  if (loading) {
    return (
      <section id="proyectos" className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-surface-container rounded w-64 mx-auto mb-16" />
            <div className="grid grid-cols-12 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={getSpanClass(i - 1)}>
                  <div className="h-[300px] bg-surface-container rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="proyectos" className="py-32 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-headline">
            Portafolio Selecto
          </h2>
        </div>

        {proyectos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-on-surface-variant text-lg">
              No hay proyectos disponibles en este momento.
            </p>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-12 gap-6 md:auto-rows-[300px]">
            {proyectos.map((proyecto, index) => (
              <div
                key={proyecto.id}
                onClick={() => router.push(`/proyectos/${proyecto.id}`)}
                className={`${getSpanClass(index)} overflow-hidden rounded-xl group relative cursor-pointer`}
              >
                <div className="w-full h-full relative">
                  <img
                    src={proyecto.imagenes?.[0] || 'https://via.placeholder.com/800x600?text=Sin+Imagen'}
                    alt={proyecto.nombre}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="content-wrapper absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
                    <div>
                      <p className="text-sm font-bold tracking-widest uppercase mb-2 text-white/90">
                        {proyecto.tipo}
                      </p>
                      <h4 className="text-3xl font-headline text-white">
                        {proyecto.nombre}
                      </h4>
                      {proyecto.ubicacion && (
                        <p className="text-white/80 text-sm mt-2">
                          📍 {proyecto.ubicacion}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="hover-overlay absolute inset-0 bg-primary/20 opacity-0 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
