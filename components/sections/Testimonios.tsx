'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Testimonios() {
  const sectionRef = useRef<HTMLElement>(null)
  const quoteRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLQuoteElement>(null)
  const authorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Quote icon animation
      gsap.set(quoteRef.current, { scale: 0.5, opacity: 0 })
      gsap.to(quoteRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Text animation
      gsap.set(textRef.current, { opacity: 0, y: 40 })
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Author animation
      gsap.set(authorRef.current, { opacity: 0, y: 30 })
      gsap.to(authorRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: authorRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })

      // Hover effects
      const avatar = authorRef.current?.querySelector('.avatar-wrapper')
      if (avatar) {
        avatar.addEventListener('mouseenter', () => {
          gsap.to(avatar, { scale: 1.1, duration: 0.3, ease: 'power2.out' })
        })
        avatar.addEventListener('mouseleave', () => {
          gsap.to(avatar, { scale: 1, duration: 0.3, ease: 'power2.out' })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-32 bg-surface">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <span
          ref={quoteRef}
          className="material-symbols-outlined text-5xl text-secondary mx-auto mb-8 block"
        >
          format_quote
        </span>

        <blockquote
          ref={textRef}
          className="text-2xl md:text-4xl font-headline italic leading-snug mb-12"
        >
          "Casaliz no solo construyó nuestra casa, entendió nuestra conexión con la montaña. La ejecución en piedra es simplemente una obra de arte moderna que respeta el pasado."
        </blockquote>

        <div ref={authorRef} className="flex items-center justify-center gap-4">
          <div className="avatar-wrapper w-16 h-16 rounded-full overflow-hidden cursor-pointer">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh-wRF7SLeuxHsbuu_nwdZ1Ewiw7uX1s-ki0QliCjn23U-kUNZWuvzE2xbhheRlvFUJOx18QsSTbqf1OZEOlsIm3RgCYr4LIBbKAmfEAbqqa4g3E1DSMJUUUPXcx-x30KTpVNLI9XqRE9mcFm4ULatZCesPYEMhhJnUnn--funmuSlFgaeRhs0qkOXm5FdK2c_4lXXGMSKxwUNZx9QXHvXLDO7HXaKWAnuol6nRU7L6M53zq1ekdJJ4I6dU78L1DsZdimVVCCX5m4"
              alt="Alejandro V."
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <p className="font-bold text-lg">Alejandro V.</p>
            <p className="text-on-surface-variant text-sm">Residencia en Valle Sagrado</p>
          </div>
        </div>
      </div>
    </section>
  )
}
