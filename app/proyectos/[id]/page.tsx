'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { getProyectoById, Proyecto } from '../../../lib/supabase'
import { ArrowLeft, MapPin, Home, TrendingUp, DollarSign, Calendar, CheckCircle } from 'lucide-react'

export default function ProyectoDetallePage({ params }: { params: { id: string } }) {
  const [proyecto, setProyecto] = useState<Proyecto | null>(null)
  const [loading, setLoading] = useState(true)
  const [imagenActual, setImagenActual] = useState(0)
  const router = useRouter()
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function fetchProyecto() {
      try {
        const data = await getProyectoById(params.id)
        setProyecto(data)
      } catch (error) {
        console.error('Error fetching proyecto:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProyecto()
  }, [params.id])

  useEffect(() => {
    if (!heroRef.current || !proyecto) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
    })

    return () => ctx.revert()
  }, [proyecto])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4" />
          <p className="text-on-surface-variant">Cargando proyecto...</p>
        </div>
      </div>
    )
  }

  if (!proyecto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <h1 className="text-4xl font-headline mb-4">Proyecto no encontrado</h1>
          <button
            onClick={() => router.push('/')}
            className="text-primary hover:underline"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    )
  }

  const beneficios = [
    {
      icon: <MapPin className="w-6 h-6" />,
      titulo: 'Ubicación Privilegiada',
      descripcion: `${proyecto.ubicacion} ofrece acceso a servicios, transporte y zonas comerciales de primer nivel.`
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      titulo: 'Plusvalía Garantizada',
      descripcion: 'La zona presenta un crecimiento constante del 8-12% anual, asegurando una excelente inversión a largo plazo.'
    },
    {
      icon: <Home className="w-6 h-6" />,
      titulo: 'Diseño de Alta Gama',
      descripcion: 'Arquitectura contemporánea que respeta el entorno, con acabados de lujo y tecnología de punta.'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      titulo: 'Calidad Certificada',
      descripcion: 'Construcción con los más altos estándares de calidad, supervisada por ingenieros especializados.'
    }
  ]

  const caracteristicas = [
    'Diseño arquitectónico exclusivo',
    'Materiales de primera calidad',
    'Sistemas de seguridad avanzados',
    'Eficiencia energética',
    'Espacios amplios y luminosos',
    'Acabados personalizables',
    'Áreas verdes integradas',
    'Estacionamiento privado'
  ]

  return (
    <div className="min-h-screen bg-surface">
      {/* Header con botón de regreso */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-xl border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-on-surface hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold">Volver</span>
          </button>
          <div className="text-sm text-on-surface-variant">
            {proyecto.tipo} • {proyecto.estado}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-8">
          {/* Galería de imágenes */}
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={proyecto.imagenes?.[imagenActual] || 'https://via.placeholder.com/1200x600'}
                alt={proyecto.nombre}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Navegación de imágenes */}
              {proyecto.imagenes && proyecto.imagenes.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {proyecto.imagenes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setImagenActual(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === imagenActual
                          ? 'bg-white w-8'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Miniaturas */}
            {proyecto.imagenes && proyecto.imagenes.length > 1 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {proyecto.imagenes.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setImagenActual(index)}
                    className={`relative h-24 rounded-lg overflow-hidden ${
                      index === imagenActual ? 'ring-4 ring-primary' : 'opacity-70 hover:opacity-100'
                    } transition-all`}
                  >
                    <img src={img} alt={`Vista ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Información principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Columna principal */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                    {proyecto.tipo}
                  </span>
                  <span className="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold">
                    {proyecto.estado}
                  </span>
                </div>

                <h1 className="text-5xl font-headline mb-4">{proyecto.nombre}</h1>
                
                <div className="flex items-center gap-2 text-on-surface-variant mb-8">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{proyecto.ubicacion}</span>
                </div>

                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-on-surface-variant leading-relaxed">
                    {proyecto.descripcion}
                  </p>
                </div>

                {/* Beneficios */}
                <div className="mb-12">
                  <h2 className="text-3xl font-headline mb-6">¿Por qué invertir aquí?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {beneficios.map((beneficio, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="bg-surface-container p-6 rounded-xl"
                      >
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-primary/10 text-primary rounded-lg">
                            {beneficio.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg mb-2">{beneficio.titulo}</h3>
                            <p className="text-on-surface-variant text-sm">{beneficio.descripcion}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Características */}
                <div>
                  <h2 className="text-3xl font-headline mb-6">Características Destacadas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caracteristicas.map((caracteristica, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-on-surface">{caracteristica}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-24"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-outline-variant">
                  {/* Precio */}
                  {proyecto.precio_referencial && (
                    <div className="mb-8 pb-8 border-b border-outline-variant">
                      <div className="flex items-center gap-2 text-on-surface-variant mb-2">
                        <DollarSign className="w-5 h-5" />
                        <span className="text-sm font-semibold uppercase tracking-wide">Precio Referencial</span>
                      </div>
                      <p className="text-4xl font-bold text-primary">
                        S/ {proyecto.precio_referencial.toLocaleString()}
                      </p>
                    </div>
                  )}

                  {/* Información adicional */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between">
                      <span className="text-on-surface-variant">Tipo</span>
                      <span className="font-semibold capitalize">{proyecto.tipo}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-on-surface-variant">Estado</span>
                      <span className="font-semibold capitalize">{proyecto.estado}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-on-surface-variant">Ubicación</span>
                      <span className="font-semibold text-right">{proyecto.ubicacion}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => {
                      const contactoSection = document.getElementById('contacto')
                      if (contactoSection) {
                        router.push('/#contacto')
                      }
                    }}
                    className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold uppercase tracking-wide hover:brightness-110 transition-all shadow-lg"
                  >
                    Solicitar Información
                  </button>

                  <p className="text-xs text-on-surface-variant text-center mt-4">
                    Un asesor se pondrá en contacto contigo
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer simple */}
      <div className="bg-primary text-on-primary py-8 mt-20">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-sm">
            © 2026 Casaliz. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  )
}
