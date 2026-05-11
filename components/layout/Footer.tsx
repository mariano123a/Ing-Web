'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, ArrowRight, Instagram, Linkedin, Facebook, Youtube, Send } from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [suscrito, setSuscrito] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSuscrito(true)
      setEmail('')
      setTimeout(() => setSuscrito(false), 4000)
    }
  }

  return (
    <footer className="w-full bg-primary text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-headline mb-3">Mantente Informado</h3>
              <p className="text-stone-300">
                Suscríbete para recibir noticias sobre nuestros proyectos, 
                tendencias de arquitectura y oportunidades de inversión.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-5 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-4 bg-secondary text-on-secondary rounded-lg font-semibold hover:brightness-110 transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Suscribir</span>
              </button>
            </form>
            {suscrito && (
              <div className="md:col-span-2 text-emerald-300 text-sm">¡Gracias por suscribirte!</div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-headline font-bold mb-4">Casaliz</div>
            <p className="text-stone-300 text-sm leading-relaxed mb-6">
              Construyendo legados en los Andes desde 1999. Excelencia, 
              sostenibilidad y respeto por el patrimonio.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-secondary hover:text-on-secondary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-secondary hover:text-on-secondary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-secondary hover:text-on-secondary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-secondary hover:text-on-secondary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Empresa</h4>
            <ul className="space-y-3">
              <li><a href="/nosotros" className="text-stone-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Sobre Nosotros</a></li>
              <li><a href="/nosotros" className="text-stone-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Nuestro Equipo</a></li>
              <li><a href="/proyectos" className="text-stone-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Proyectos</a></li>
              <li><a href="/servicios" className="text-stone-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Servicios</a></li>
              <li><a href="/contacto" className="text-stone-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Servicios</h4>
            <ul className="space-y-3">
              <li><a href="/servicios" className="text-stone-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Arquitectura Residencial</a></li>
              <li><a href="/servicios" className="text-stone-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Construcción Comercial</a></li>
              <li><a href="/servicios" className="text-stone-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Restauración</a></li>
              <li><a href="/servicios" className="text-stone-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Diseño de Interiores</a></li>
              <li><a href="/servicios" className="text-stone-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /> Gerencia de Proyectos</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Contacto</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-stone-300">Av. El Sol 456, Cusco, Perú</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-stone-300">+51 84 123 456</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-stone-300">info@casaliz.pe</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-stone-400 text-sm">
            © 2026 Casaliz. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-stone-400">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
