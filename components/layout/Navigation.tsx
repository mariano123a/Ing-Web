'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Settings, Menu, X, ChevronRight } from 'lucide-react'

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Proyectos', href: '/proyectos' },
  { name: 'Servicios', href: '/servicios' },
  { name: 'Nosotros', href: '/nosotros' },
  { name: 'Contacto', href: '/contacto' },
]

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  const isAdmin = pathname?.startsWith('/admin')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isTransparent = !scrolled && !isAdmin && !mobileOpen

  const navBg = isTransparent
    ? 'bg-transparent'
    : 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-stone-100'

  const textColor = isTransparent ? 'text-white' : 'text-stone-800'
  const linkColor = isTransparent ? 'text-white/80 hover:text-white' : 'text-stone-600 hover:text-primary'

  const logoColor = isTransparent ? 'text-white' : 'text-primary'
  const activeLinkColor = isTransparent ? 'text-white font-semibold' : 'text-primary'
  const adminIconColor = isTransparent ? 'text-white/50 hover:text-white' : 'text-stone-400 hover:text-primary'
  const mobileIconColor = isTransparent ? 'text-white' : 'text-stone-700'

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${navBg}`}>
        <div className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className={`text-2xl font-headline italic font-bold ${logoColor} transition-colors`}>
              Casaliz
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-all duration-300 ${
                  pathname === link.href
                    ? activeLinkColor
                    : linkColor
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/login"
              className={`hidden sm:flex p-2 rounded-lg transition-all ${adminIconColor}`}
              title="Admin"
            >
              <Settings className="w-5 h-5" />
            </Link>

            <Link
              href="/contacto"
              className="hidden md:inline-flex bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-lg"
            >
              Iniciar Proyecto
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg ${mobileIconColor}`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 pt-20">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {link.name}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100">
              <Link
                href="/contacto"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center bg-primary text-white px-6 py-3 rounded-lg font-semibold"
              >
                Iniciar Proyecto
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100">
              <p className="text-xs text-stone-400 mb-3">Contacto</p>
              <p className="text-sm text-stone-600">info@casaliz.pe</p>
              <p className="text-sm text-stone-600">+51 84 123 456</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
