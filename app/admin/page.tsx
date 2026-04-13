'use client'

// Force dynamic rendering to avoid Supabase connection during build
export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { supabaseClient, MensajeContacto, Proyecto } from '../../lib/supabase'
import { Mail, CheckCircle, Eye, Trash2, Loader2 } from 'lucide-react'

export default function AdminPage() {
  const [mensajes, setMensajes] = useState<MensajeContacto[]>([])
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'mensajes' | 'proyectos'>('mensajes')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch mensajes
      const { data: mensajesData, error: mensajesError } = await supabaseClient
        .from('mensajes_contacto')
        .select('*')
        .order('created_at', { ascending: false })

      if (mensajesError) throw mensajesError
      setMensajes(mensajesData || [])

      // Fetch proyectos
      const { data: proyectosData, error: proyectosError } = await supabaseClient
        .from('proyectos')
        .select('*')
        .order('created_at', { ascending: false })

      if (proyectosError) throw proyectosError
      setProyectos(proyectosData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const marcarLeido = async (id: string, leido: boolean) => {
    try {
      const { error } = await supabaseClient
        .from('mensajes_contacto')
        .update({ leido: !leido })
        .eq('id', id)

      if (error) throw error
      fetchData()
    } catch (error) {
      console.error('Error updating mensaje:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-container-low p-8">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl font-headline mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Panel de Administración - Casaliz
        </motion.h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('mensajes')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'mensajes'
                ? 'bg-primary text-on-primary'
                : 'bg-white text-on-surface hover:bg-surface-container'
            }`}
          >
            Mensajes ({mensajes.filter(m => !m.leido).length} nuevos)
          </button>
          <button
            onClick={() => setActiveTab('proyectos')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'proyectos'
                ? 'bg-primary text-on-primary'
                : 'bg-white text-on-surface hover:bg-surface-container'
            }`}
          >
            Proyectos ({proyectos.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'mensajes' ? (
          <div className="space-y-4">
            {mensajes.length === 0 ? (
              <p className="text-on-surface-variant">No hay mensajes</p>
            ) : (
              mensajes.map((mensaje) => (
                <motion.div
                  key={mensaje.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white p-6 rounded-xl shadow-sm ${
                    mensaje.leido ? 'opacity-70' : 'border-l-4 border-primary'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{mensaje.nombre}</h3>
                      <p className="text-on-surface-variant text-sm">{mensaje.email}</p>
                      {mensaje.telefono && (
                        <p className="text-on-surface-variant text-sm">{mensaje.telefono}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => marcarLeido(mensaje.id, mensaje.leido)}
                        className={`p-2 rounded-lg transition-colors ${
                          mensaje.leido
                            ? 'bg-green-100 text-green-600'
                            : 'bg-surface-container hover:bg-surface-container-high'
                        }`}
                        title={mensaje.leido ? 'Marcar no leído' : 'Marcar leído'}
                      >
                        {mensaje.leido ? <CheckCircle className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <p className="mt-4 text-on-surface">{mensaje.mensaje}</p>
                  <p className="mt-4 text-xs text-on-surface-variant">
                    {new Date(mensaje.created_at).toLocaleDateString('es-PE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {proyectos.length === 0 ? (
              <p className="text-on-surface-variant">No hay proyectos</p>
            ) : (
              proyectos.map((proyecto) => (
                <motion.div
                  key={proyecto.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 rounded-xl shadow-sm flex gap-4"
                >
                  {proyecto.imagenes && proyecto.imagenes[0] && (
                    <img
                      src={proyecto.imagenes[0]}
                      alt={proyecto.nombre}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">{proyecto.nombre}</h3>
                        <span className="inline-block px-3 py-1 bg-surface-container rounded-full text-xs font-semibold mt-1">
                          {proyecto.tipo}
                        </span>
                        <span className="inline-block px-3 py-1 bg-surface-container rounded-full text-xs font-semibold mt-1 ml-2">
                          {proyecto.estado}
                        </span>
                      </div>
                      {proyecto.precio_referencial && (
                        <p className="font-bold text-primary">
                          S/ {proyecto.precio_referencial.toLocaleString()}
                        </p>
                      )}
                    </div>
                    <p className="mt-2 text-on-surface-variant text-sm line-clamp-2">
                      {proyecto.descripcion}
                    </p>
                    {proyecto.ubicacion && (
                      <p className="mt-2 text-xs text-on-surface-variant">
                        📍 {proyecto.ubicacion}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
