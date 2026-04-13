'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const footerLinks = {
  explorar: [
    { name: 'Portfolio', href: '#proyectos' },
    { name: 'Methodology', href: '#servicios' },
  ],
  compania: [
    { name: 'Careers', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  contacto: [
    { name: 'Contact', href: '#contacto' },
  ],
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    const ctx = gsap.context(() => {
      // Logo hover
      const logo = logoRef.current
      if (logo) {
        logo.addEventListener('mouseenter', () => {
          gsap.to(logo, { scale: 1.02, duration: 0.2 })
        })
        logo.addEventListener('mouseleave', () => {
          gsap.to(logo, { scale: 1, duration: 0.2 })
        })
      }

      // Links hover
      const links = footerRef.current?.querySelectorAll('.footer-link')
      links?.forEach((link) => {
        link.addEventListener('mouseenter', () => {
          gsap.to(link, { x: 5, duration: 0.2, ease: 'power2.out' })
        })
        link.addEventListener('mouseleave', () => {
          gsap.to(link, { x: 0, duration: 0.2, ease: 'power2.out' })
        })
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="w-full py-24 mt-20 bg-stone-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto px-8">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <div
            ref={logoRef}
            className="text-3xl font-serif font-black text-emerald-900 mb-6 cursor-pointer"
          >
            Casaliz
          </div>
          <p className="text-stone-500 font-sans text-sm uppercase tracking-widest leading-loose">
            © 2024 Digital Masonry. Built for the Architectural Editorial.
          </p>
        </div>

        {/* Links - Explorar */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-bold text-stone-900 mb-2">Explorar</h4>
          {footerLinks.explorar.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="footer-link text-stone-500 font-sans text-sm uppercase tracking-widest hover:text-emerald-800 transition-opacity inline-block"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Links - Compañía */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-bold text-stone-900 mb-2">Compañía</h4>
          {footerLinks.compania.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="footer-link text-stone-500 font-sans text-sm uppercase tracking-widest hover:text-emerald-800 transition-opacity inline-block"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Links - Contacto */}
        <div className="flex flex-col space-y-4">
          <h4 className="font-bold text-stone-900 mb-2">Contacto</h4>
          {footerLinks.contacto.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="footer-link text-stone-500 font-sans text-sm uppercase tracking-widest hover:text-emerald-800 transition-opacity underline underline-offset-8 inline-block"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
