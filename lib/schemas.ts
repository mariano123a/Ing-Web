import { z } from 'zod'

// Schema para formulario de contacto
export const contactoSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100),
  email: z.string().email('Ingrese un correo electrónico válido'),
  telefono: z.string().optional(),
  tipoProyecto: z.enum(['Residencial de Lujo', 'Desarrollo Comercial', 'Restauración Histórica', 'Otro']),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres').max(1000),
})

export type ContactoFormData = z.infer<typeof contactoSchema>
