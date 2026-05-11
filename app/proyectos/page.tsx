'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRouter } from 'next/navigation'
import { proyectos, Proyecto } from '../../lib/data'
import { Navigation } from '../../components/layout/Navigation'
import { Footer } from '../../components/layout/Footer'
import { Search, MapPin, Filter, ChevronRight, Home, Building, Landmark, Factory, Layers, TrendingUp } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const tipoIconos: Record<string, React.ReactNode> = {
  residencial: <Home className="w-4 h-4" />,
  comercial: <Building className="w-4 h-4" />,
  restauracion: <Landmark className="w-4 h-4" />,
  industrial: <Factory className="w-4 h-4" />,
  mixto: <Layers className="w-4 h-4" />,
}

const tipoLabels: Record<string, string> = {
  residencial: 'Residencial',
  comercial: 'Comercial',
  restauracion: 'Restauración',
  industrial: 'Industrial',
  mixto: 'Mixto',
}

const estadoColors: Record<string, string> = {
  'entregado': 'bg-emerald-100 text-emerald-800',
  'en construcción': 'bg-amber-100 text-amber-800',
  'en venta': 'bg-blue-100 text-blue-800',
  'en planos': 'bg-purple-100 text-purple-800',
}

export default function ProyectosPage() {
  const router = useRouter()
  const [filtroTipo, setFiltroTipo] = useState<string>('todos')
  const [filtroEstado, setFiltroEstado] = useState<string>('todos')
  const [busqueda, setBusqueda] = useState('')
  const [proyectosFiltrados, setProyectosFiltrados] = useState<Proyecto[]>(proyectos)
  const gridRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let filtrados = proyectos

    if (filtroTipo !== 'todos') {
      filtrados = filtrados.filter(p => p.tipo === filtroTipo)
    }

    if (filtroEstado !== 'todos') {
      filtrados = filtrados.filter(p => p.estado === filtroEstado)
    }

    if (busqueda.trim()) {
      const q = busqueda.toLowerCase()
      filtrados = filtrados.filter(p =>
        p.nombre.toLowerCase().includes(q) ||
        p.ubicacion.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q)
      )
    }

    setProyectosFiltrados(filtrados)
  }, [filtroTipo, filtroEstado, busqueda])

  useEffect(() => {
    if (!gridRef.current || !headerRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )

      const cards = gridRef.current?.querySelectorAll('.proyecto-card')
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
            },
          }
        )
      }
    })

    return () => ctx.revert()
  }, [proyectosFiltrados])

  const tipos = ['todos', ...Array.from(new Set(proyectos.map(p => p.tipo)))]
  const estados = ['todos', ...Array.from(new Set(proyectos.map(p => p.estado)))]

  return (
    <main className="min-h-screen bg-surface">
      <Navigation />

      {/* Hero */}
      <section className="relative h-[350px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80"
            alt="Proyectos"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div ref={headerRef} className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl text-white font-headline mb-4">
            Nuestros Proyectos
          </h1>
          <p className="text-xl text-stone-200 max-w-2xl mx-auto font-light">
            Más de 150 obras que transforman paisajes y generan legados en los Andes
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold">{proyectos.length}</div>
            <div className="text-sm opacity-80">Proyectos</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{proyectos.filter(p => p.estado === 'entregado').length}</div>
            <div className="text-sm opacity-80">Entregados</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{proyectos.filter(p => p.estado === 'en construcción').length}</div>
            <div className="text-sm opacity-80">En Construcción</div>
          </div>
          <div>
            <div className="text-3xl font-bold">5</div>
            <div className="text-sm opacity-80">Categorías</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white rounded-lg border border-stone-200 px-3 py-2">
              <Filter className="w-4 h-4 text-stone-400" />
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="bg-transparent text-sm focus:outline-none"
              >
                {tipos.map(t => (
                  <option key={t} value={t}>
                    {t === 'todos' ? 'Todos los tipos' : tipoLabels[t] || t}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-lg border border-stone-200 px-3 py-2">
              <TrendingUp className="w-4 h-4 text-stone-400" />
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="bg-transparent text-sm focus:outline-none"
              >
                {estados.map(e => (
                  <option key={e} value={e}>
                    {e === 'todos' ? 'Todos los estados' : e}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grid */}
        {proyectosFiltrados.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-stone-500 text-lg">No se encontraron proyectos con esos filtros.</p>
          </div>
        ) : (
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {proyectosFiltrados.map((proyecto) => (
              <div
                key={proyecto.id}
                className="proyecto-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-stone-100"
                onClick={() => router.push(`/proyectos/${proyecto.id}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={proyecto.imagenes[0]}
                    alt={proyecto.nombre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${estadoColors[proyecto.estado] || 'bg-stone-100'}`}>
                      {proyecto.estado}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 text-white/90 text-sm mb-1">
                      <MapPin className="w-4 h-4" />
                      {proyecto.ubicacion}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-primary">{tipoIconos[proyecto.tipo]}</span>
                    <span className="text-xs text-stone-500 uppercase tracking-wider">{tipoLabels[proyecto.tipo]}</span>
                  </div>

                  <h3 className="text-xl font-headline font-semibold text-on-surface mb-2 group-hover:text-primary transition-colors">
                    {proyecto.nombre}
                  </h3>

                  <p className="text-sm text-stone-500 line-clamp-2 mb-4">
                    {proyecto.descripcion}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div className="text-sm">
                      <span className="text-stone-400">Desde </span>
                      <span className="font-semibold text-primary">{proyecto.precio_referencial}</span>
                    </div>
                    <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      Ver más <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
