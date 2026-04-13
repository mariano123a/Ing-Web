import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create client only if credentials are available, otherwise create a mock
export const supabaseClient = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : {
      // Mock client for build time when env vars are not available
      from: () => ({
        select: () => ({ data: [], error: null }),
        insert: () => ({ data: null, error: null }),
        order: () => ({ data: [], error: null }),
        eq: () => ({ data: null, error: null }),
        single: () => ({ data: null, error: null }),
      }),
      auth: {
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ data: null, error: null }),
        signOut: () => Promise.resolve({ error: null }),
      },
    } as any

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
