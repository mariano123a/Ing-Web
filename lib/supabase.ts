import { createClient } from '@supabase/supabase-js'
import { getCached, setCache } from './cache'

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
      global: {
        headers: {
          'x-client-info': 'casaliz-web',
        },
      },
      db: {
        schema: 'public',
      },
      // Optimizaciones de rendimiento
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
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
  // Intentar obtener del caché primero
  const cached = getCached<Proyecto[]>('proyectos')
  if (cached) return cached

  const { data, error } = await supabaseClient
    .from('proyectos')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  
  // Guardar en caché
  setCache('proyectos', data as Proyecto[])
  return data as Proyecto[]
}

export async function getProyectoById(id: string) {
  // Intentar obtener del caché primero
  const cacheKey = `proyecto_${id}`
  const cached = getCached<Proyecto>(cacheKey)
  if (cached) return cached

  const { data, error } = await supabaseClient
    .from('proyectos')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  
  // Guardar en caché
  setCache(cacheKey, data as Proyecto)
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

// Funciones CRUD completas para Proyectos
export async function createProyecto(proyecto: Omit<Proyecto, 'id' | 'created_at'>) {
  const { data, error } = await supabaseClient
    .from('proyectos')
    .insert([proyecto])
    .select()
    .single()
  
  if (error) throw error
  return data as Proyecto
}

export async function updateProyecto(id: string, proyecto: Partial<Omit<Proyecto, 'id' | 'created_at'>>) {
  const { data, error } = await supabaseClient
    .from('proyectos')
    .update(proyecto)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as Proyecto
}

export async function deleteProyecto(id: string) {
  const { error } = await supabaseClient
    .from('proyectos')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// Funciones de autenticación
export async function signIn(email: string, password: string) {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabaseClient.auth.signOut()
  if (error) throw error
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabaseClient.auth.getUser()
  if (error) throw error
  return user
}

// Tipo para contenido editable del sitio
export type ContenidoSitio = {
  id: string
  seccion: string
  clave: string
  valor: string
  tipo: 'texto' | 'imagen' | 'numero'
  created_at: string
  updated_at: string
}

// Funciones para contenido del sitio
export async function getContenidoSitio() {
  const { data, error } = await supabaseClient
    .from('contenido_sitio')
    .select('*')
    .order('seccion', { ascending: true })
  
  if (error) throw error
  return data as ContenidoSitio[]
}

export async function updateContenidoSitio(id: string, valor: string) {
  const { data, error } = await supabaseClient
    .from('contenido_sitio')
    .update({ valor, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data as ContenidoSitio
}
