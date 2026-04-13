import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Cliente para el frontend (anon)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Tipos para las tablas
export type Proyecto = {
  id: string
  nombre: string
  descripcion: string | null
  ubicacion: string | null
  tipo: 'residencial' | 'comercial' | 'industrial' | 'mixto' | null
  estado: 'en planos' | 'en construcción' | 'entregado' | 'en venta' | null
  precio_referencial: number | null
  caracteristicas_tecnicas: Record<string, any> | null
  imagenes: string[] | null
  created_at: string
}

export type MensajeContacto = {
  id: string
  nombre: string
  email: string
  telefono: string | null
  mensaje: string
  leido: boolean
  created_at: string
}

// Funciones CRUD para Proyectos
export async function getProyectos() {
  const { data, error } = await supabaseClient
    .from('proyectos')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Proyecto[]
}

export async function getProyectoById(id: string) {
  const { data, error } = await supabaseClient
    .from('proyectos')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data as Proyecto
}

// Funciones para Mensajes de Contacto
export async function createMensaje(mensaje: Omit<MensajeContacto, 'id' | 'leido' | 'created_at'>) {
  const { data, error } = await supabaseClient
    .from('mensajes_contacto')
    .insert([{ ...mensaje, leido: false }])
    .select()
    .single()
  
  if (error) throw error
  return data as MensajeContacto
}
