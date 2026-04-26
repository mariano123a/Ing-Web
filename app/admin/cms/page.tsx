'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../../hooks/useAuth'
import {
  supabaseClient,
  Proyecto,
  MensajeContacto,
  signOut,
  createProyecto,
  updateProyecto,
  deleteProyecto,
} from '../../../lib/supabase'
import {
  Loader2,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Mail,
  FolderOpen,
  CheckCircle,
  Eye,
  Image as ImageIcon,
} from 'lucide-react'

type Tab = 'proyectos' | 'mensajes'

export default function CMSPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('proyectos')
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [mensajes, setMensajes] = useState<MensajeContacto[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProyecto, setEditingProyecto] = useState<Proyecto | null>(null)
  const [showModal, setShowModal] = useState(false)

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/admin/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchData()
    }
  }, [user])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch proyectos
      const { data: proyectosData, error: proyectosError } = await supabaseClient
        .from('proyectos')
        .select('*')
        .order('created_at', { ascending: false })

      if (proyectosError) throw proyectosError
      setProyectos(proyectosData || [])

      // Fetch mensajes
      const { data: mensajesData, error: mensajesError } = await supabaseClient
        .from('mensajes_contacto')
        .select('*')
        .order('created_at', { ascending: false })

      if (mensajesError) throw mensajesError
      setMensajes(mensajesData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleEditProyecto = (proyecto: Proyecto) => {
    setEditingProyecto(proyecto)
    setShowModal(true)
  }

  const handleNewProyecto = () => {
    setEditingProyecto({
      id: '',
      nombre: '',
      descripcion: '',
      ubicacion: '',
      tipo: 'residencial',
      estado: 'en planos',
      precio_referencial: null,
      caracteristicas_tecnicas: {},
      imagenes: [],
      created_at: new Date().toISOString(),
    })
    setShowModal(true)
  }

  const handleDeleteProyecto = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este proyecto?')) return

    try {
      await deleteProyecto(id)
      fetchData()
    } catch (error) {
      console.error('Error deleting proyecto:', error)
      alert('Error al eliminar el proyecto')
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

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-container-low">
      {/* Header */}
      <header className="bg-white border-b border-outline-variant shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-headline text-on-surface">CMS Casaliz</h1>
            <p className="text-sm text-on-surface-variant">
              Bienvenido, {user.email}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-error-container text-on-error-container rounded-lg hover:brightness-95 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Cerrar Sesión
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('proyectos')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'proyectos'
                ? 'bg-primary text-on-primary shadow-lg'
                : 'bg-white text-on-surface hover:bg-surface-container'
            }`}
          >
            <FolderOpen className="w-5 h-5" />
            Proyectos ({proyectos.length})
          </button>
          <button
            onClick={() => setActiveTab('mensajes')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'mensajes'
                ? 'bg-primary text-on-primary shadow-lg'
                : 'bg-white text-on-surface hover:bg-surface-container'
            }`}
          >
            <Mail className="w-5 h-5" />
            Mensajes ({mensajes.filter((m) => !m.leido).length} nuevos)
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : activeTab === 'proyectos' ? (
          <ProyectosTab
            proyectos={proyectos}
            onEdit={handleEditProyecto}
            onDelete={handleDeleteProyecto}
            onNew={handleNewProyecto}
          />
        ) : (
          <MensajesTab mensajes={mensajes} onMarcarLeido={marcarLeido} />
        )}
      </div>

      {/* Modal de edición */}
      <AnimatePresence>
        {showModal && editingProyecto && (
          <ProyectoModal
            proyecto={editingProyecto}
            onClose={() => {
              setShowModal(false)
              setEditingProyecto(null)
            }}
            onSave={() => {
              setShowModal(false)
              setEditingProyecto(null)
              fetchData()
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// Componente de tab de proyectos
function ProyectosTab({
  proyectos,
  onEdit,
  onDelete,
  onNew,
}: {
  proyectos: Proyecto[]
  onEdit: (p: Proyecto) => void
  onDelete: (id: string) => void
  onNew: () => void
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-headline">Gestión de Proyectos</h2>
        <button
          onClick={onNew}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:brightness-110 transition-all shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Nuevo Proyecto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proyectos.map((proyecto) => (
          <motion.div
            key={proyecto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
          >
            {proyecto.imagenes && proyecto.imagenes[0] ? (
              <img
                src={proyecto.imagenes[0]}
                alt={proyecto.nombre}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-surface-container flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-on-surface-variant" />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{proyecto.nombre}</h3>
              <div className="flex gap-2 mb-3">
                <span className="px-2 py-1 bg-surface-container rounded text-xs">
                  {proyecto.tipo}
                </span>
                <span className="px-2 py-1 bg-surface-container rounded text-xs">
                  {proyecto.estado}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant line-clamp-2 mb-4">
                {proyecto.descripcion}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(proyecto)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-on-primary rounded-lg hover:brightness-110 transition-all text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  Editar
                </button>
                <button
                  onClick={() => onDelete(proyecto.id)}
                  className="px-3 py-2 bg-error-container text-on-error-container rounded-lg hover:brightness-95 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// Componente de tab de mensajes
function MensajesTab({
  mensajes,
  onMarcarLeido,
}: {
  mensajes: MensajeContacto[]
  onMarcarLeido: (id: string, leido: boolean) => void
}) {
  return (
    <div className="space-y-4">
      {mensajes.length === 0 ? (
        <p className="text-center text-on-surface-variant py-12">
          No hay mensajes
        </p>
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
              <button
                onClick={() => onMarcarLeido(mensaje.id, mensaje.leido)}
                className={`p-2 rounded-lg transition-colors ${
                  mensaje.leido
                    ? 'bg-green-100 text-green-600'
                    : 'bg-surface-container hover:bg-surface-container-high'
                }`}
                title={mensaje.leido ? 'Marcar no leído' : 'Marcar leído'}
              >
                {mensaje.leido ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
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
  )
}

// Modal de edición de proyecto
function ProyectoModal({
  proyecto,
  onClose,
  onSave,
}: {
  proyecto: Proyecto
  onClose: () => void
  onSave: () => void
}) {
  const [formData, setFormData] = useState(proyecto)
  const [saving, setSaving] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (formData.id) {
        await updateProyecto(formData.id, formData)
      } else {
        await createProyecto(formData)
      }
      onSave()
    } catch (error: any) {
      console.error('Error saving proyecto:', error)
      const errorMessage = error?.message || 'Error desconocido'
      alert(`Error al guardar el proyecto:\n\n${errorMessage}\n\nRevisa la consola para más detalles.`)
    } finally {
      setSaving(false)
    }
  }

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setFormData({
        ...formData,
        imagenes: [...(formData.imagenes || []), imageUrl.trim()],
      })
      setImageUrl('')
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      imagenes: formData.imagenes?.filter((_, i) => i !== index) || [],
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-outline-variant p-6 flex justify-between items-center">
          <h2 className="text-2xl font-headline">
            {formData.id ? 'Editar Proyecto' : 'Nuevo Proyecto'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-container rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold mb-2">Nombre del Proyecto</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold mb-2">Descripción</label>
            <textarea
              value={formData.descripcion || ''}
              onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
            />
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-sm font-semibold mb-2">Ubicación</label>
            <input
              type="text"
              value={formData.ubicacion || ''}
              onChange={(e) => setFormData({ ...formData, ubicacion: e.target.value })}
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Tipo y Estado */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Tipo</label>
              <select
                value={formData.tipo || 'residencial'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tipo: e.target.value as Proyecto['tipo'],
                  })
                }
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="residencial">Residencial</option>
                <option value="comercial">Comercial</option>
                <option value="industrial">Industrial</option>
                <option value="mixto">Mixto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Estado</label>
              <select
                value={formData.estado || 'en planos'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estado: e.target.value as Proyecto['estado'],
                  })
                }
                className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="en planos">En Planos</option>
                <option value="en construcción">En Construcción</option>
                <option value="entregado">Entregado</option>
                <option value="en venta">En Venta</option>
              </select>
            </div>
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Precio Referencial (S/)
            </label>
            <input
              type="number"
              value={formData.precio_referencial || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  precio_referencial: e.target.value ? Number(e.target.value) : null,
                })
              }
              className="w-full px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Imágenes */}
          <div>
            <label className="block text-sm font-semibold mb-2">Imágenes (URLs)</label>
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="flex-1 px-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-3 bg-secondary text-on-secondary rounded-lg hover:brightness-110 transition-all"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {formData.imagenes?.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 p-1 bg-error text-on-error rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-surface-container text-on-surface rounded-lg hover:bg-surface-container-high transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Guardar
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
