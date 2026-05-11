'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navigation } from '../../components/layout/Navigation'
import { Footer } from '../../components/layout/Footer'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
  })
  const [enviado, setEnviado] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current, { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: formRef.current, start: 'top 80%' }
      })
      gsap.fromTo(infoRef.current, { opacity: 0, x: -40 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: infoRef.current, start: 'top 80%' }
      })
    })
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnviado(true)
    setTimeout(() => setEnviado(false), 5000)
    setFormData({ nombre: '', email: '', telefono: '', asunto: '', mensaje: '' })
  }

  const infoItems = [
    { icon: <MapPin className="w-5 h-5" />, label: 'Dirección', value: 'Av. El Sol 456, Cusco, Perú' },
    { icon: <Phone className="w-5 h-5" />, label: 'Teléfono', value: '+51 84 123 456' },
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: 'info@casaliz.pe' },
    { icon: <Clock className="w-5 h-5" />, label: 'Horario', value: 'Lun - Vie: 8:00 - 18:00' },
  ]

  return (
    <main className="min-h-screen bg-surface">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[450px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80"
            alt="Contacto"
            className="w-full h-full object-cover brightness-[0.4]"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[2px] bg-secondary" />
              <span className="text-secondary uppercase tracking-widest text-sm font-medium">Contacto</span>
            </div>
            <h1 className="text-5xl md:text-6xl text-white font-headline mb-4">
              Hablemos de tu Proyecto
            </h1>
            <p className="text-xl text-stone-300 font-light">
              Estamos listos para escuchar tus ideas y convertirlas en realidad.
            </p>
          </div>
        </div>
      </section>

      {/* Contacto Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <div ref={infoRef} className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-headline text-on-surface mb-4">Información de Contacto</h2>
              <p className="text-stone-600 leading-relaxed">
                Visítanos en nuestras oficinas o contáctanos por cualquier medio. 
                Nuestro equipo está listo para atenderte.
              </p>
            </div>

            <div className="space-y-4">
              {infoItems.map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-stone-100">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">{item.icon}</div>
                  <div>
                    <div className="text-sm text-stone-500">{item.label}</div>
                    <div className="font-medium text-on-surface">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="rounded-xl overflow-hidden border border-stone-200 h-64 bg-stone-100 flex items-center justify-center">
              <div className="text-center text-stone-400">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Av. El Sol 456, Cusco</p>
                <p className="text-xs">-13.5170, -71.9785</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div ref={formRef} className="lg:col-span-3">
            <div className="bg-white p-8 md:p-10 rounded-2xl border border-stone-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-headline text-on-surface">Envíanos un Mensaje</h3>
              </div>

              {enviado ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-on-surface mb-2">¡Mensaje Enviado!</h4>
                  <p className="text-stone-600">Gracias por contactarnos. Te responderemos pronto.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Nombre completo</label>
                      <input
                        type="text"
                        required
                        value={formData.nombre}
                        onChange={e => setFormData({...formData, nombre: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Teléfono</label>
                      <input
                        type="tel"
                        value={formData.telefono}
                        onChange={e => setFormData({...formData, telefono: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="+51 999 999 999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-2">Asunto</label>
                      <select
                        value={formData.asunto}
                        onChange={e => setFormData({...formData, asunto: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      >
                        <option value="">Selecciona un asunto</option>
                        <option value="proyecto">Nuevo Proyecto</option>
                        <option value="consulta">Consulta General</option>
                        <option value="restauracion">Restauración</option>
                        <option value="carrera">Trabaja con Nosotros</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Mensaje</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.mensaje}
                      onChange={e => setFormData({...formData, mensaje: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                      placeholder="Cuéntanos sobre tu proyecto..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    <Send className="w-5 h-5" />
                    Enviar Mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
