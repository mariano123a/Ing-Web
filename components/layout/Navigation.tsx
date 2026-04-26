'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import { Settings } from 'lucide-react'

const navLinks = [
  { name: 'Proyectos', href: '#proyectos' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Contacto', href: '#contacto' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const adminBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return

    const ctx = gsap.context(() => {
      // Nav slide in
      gsap.set(navRef.current, { y: -100 })
      gsap.to(navRef.current, {
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      })

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

      // Links stagger animation
      const links = linksRef.current?.children
      if (links) {
        gsap.set(links, { opacity: 0, y: -20 })
        gsap.to(links, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power2.out',
        })

        // Links hover
        Array.from(links).forEach((link) => {
          link.addEventListener('mouseenter', () => {
            gsap.to(link, { y: -2, duration: 0.2 })
          })
          link.addEventListener('mouseleave', () => {
            gsap.to(link, { y: 0, duration: 0.2 })
          })
        })
      }

      // Button animation
      const btn = buttonRef.current
      if (btn) {
        gsap.set(btn, { opacity: 0, scale: 0.9 })
        gsap.to(btn, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          delay: 0.5,
          ease: 'back.out(1.7)',
        })

        // Button hover
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, {
            scale: 1.02,
            boxShadow: '0 10px 30px rgba(22, 56, 40, 0.2)',
            duration: 0.2,
          })
        })
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { scale: 1, boxShadow: 'none', duration: 0.2 })
        })
        btn.addEventListener('mousedown', () => {
          gsap.to(btn, { scale: 0.98, duration: 0.1 })
        })
        btn.addEventListener('mouseup', () => {
          gsap.to(btn, { scale: 1.02, duration: 0.1 })
        })
      }

      // Admin button hover
      const adminBtn = adminBtnRef.current
      if (adminBtn) {
        adminBtn.addEventListener('mouseenter', () => {
          gsap.to(adminBtn, { 
            scale: 1.1, 
            opacity: 0.8,
            duration: 0.2 
          })
        })
        adminBtn.addEventListener('mouseleave', () => {
          gsap.to(adminBtn, { 
            scale: 1, 
            opacity: 0.3,
            duration: 0.2 
          })
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-stone-50/95 backdrop-blur-xl shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center px-6 md:px-12 py-6 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <div 
          ref={logoRef}
          className="text-2xl font-serif italic font-semibold text-emerald-900 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Casaliz
        </div>

        {/* Desktop Nav */}
        <div ref={linksRef} className="hidden md:flex items-center space-x-12">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className={`font-serif text-lg tracking-tight font-light transition-all duration-300 ${
                index === 0 
                  ? 'text-emerald-900 border-b-2 border-emerald-900 pb-1' 
                  : 'text-stone-500 hover:text-emerald-700'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          {/* Admin button - discreto */}
          <button
            ref={adminBtnRef}
            onClick={() => router.push('/admin/login')}
            className="p-2 rounded-lg opacity-30 hover:opacity-80 transition-all duration-300"
            title="Panel de administración"
          >
            <Settings className="w-5 h-5 text-on-surface-variant" />
          </button>

          {/* CTA Button */}
          <button
            ref={buttonRef}
            className="bg-primary text-on-primary px-8 py-3 rounded-lg font-sans font-semibold tracking-wide shadow-lg"
          >
            Iniciar Proyecto
          </button>
        </div>
      </div>
    </nav>
  )
}
