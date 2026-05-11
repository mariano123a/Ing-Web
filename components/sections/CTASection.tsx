'use client'

import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-headline mb-6">
          ¿Listo para Construir tu Legado?
        </h2>
        <p className="text-lg text-stone-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Desde la primera consulta hasta la entrega de llaves, acompañamos cada paso 
          de tu proyecto con excelencia, transparencia y pasión por la construcción.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-8 py-4 rounded-lg font-semibold hover:brightness-110 transition-all"
          >
            Iniciar Proyecto <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:+5184123456"
            className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
          >
            <Phone className="w-5 h-5" />
            +51 84 123 456
          </a>
        </div>
      </div>
    </section>
  )
}
