'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { estadisticas } from '../../lib/data'
import { Award, Briefcase, Users, Globe, Trophy, Building2 } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const icons = [Award, Briefcase, Users, Trophy, Building2, Globe]

function AnimatedCounter({ target, suffix, duration = 2000 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current) return

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return
        hasAnimated.current = true

        const start = performance.now()
        const animate = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)
          setCount(Math.floor(eased * target))
          if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
      },
    })

    return () => trigger.kill()
  }, [target, duration])

  return <div ref={ref} className="text-4xl md:text-5xl font-bold text-primary">{count}{suffix}</div>
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {estadisticas.map((stat, i) => {
            const Icon = icons[i]
            const numValue = parseInt(stat.valor.replace(/\D/g, ''))
            return (
              <div key={i} className="stat-card bg-white p-6 rounded-xl border border-stone-100 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <AnimatedCounter target={numValue} suffix={stat.sufijo} />
                <div className="text-sm text-stone-500 mt-2">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
