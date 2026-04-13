'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactoSchema, ContactoFormData } from '../../lib/schemas'
import { createMensaje } from '../../lib/supabase'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function Contacto() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactoFormData>({
    resolver: zodResolver(contactoSchema),
  })

  useEffect(() => {
    if (!sectionRef.current || !cardRef.current) return

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { opacity: 0, y: 60 })
      gsap.to(cardRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Add hover effects to contact items
      const items = cardRef.current?.querySelectorAll('.contact-item')
      items?.forEach((item) => {
        item.addEventListener('mouseenter', () => {
          gsap.to(item, { x: 5, duration: 0.2, ease: 'power2.out' })
        })
        item.addEventListener('mouseleave', () => {
          gsap.to(item, { x: 0, duration: 0.2, ease: 'power2.out' })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const onSubmit = async (data: ContactoFormData) => {
    setIsSubmitting(true)
    try {
      await createMensaje({
        nombre: data.nombre,
        email: data.email,
        telefono: data.telefono || null,
        mensaje: `${data.tipoProyecto}: ${data.mensaje}`,
      })
      setIsSuccess(true)
      reset()
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={sectionRef} id="contacto" className="py-32 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-8">
        <div
          ref={cardRef}
          className="bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          {/* Left side - Info */}
          <div className="md:w-1/3 bg-primary p-12 text-on-primary flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-headline mb-6">
                Hablemos de su próximo proyecto
              </h2>
              <p className="text-on-primary-container mb-12">
                Estamos listos para materializar su visión. Solicite una consulta privada con nuestros especialistas.
              </p>

              <div className="space-y-6">
                <div className="contact-item flex items-center gap-4 cursor-pointer">
                  <span className="material-symbols-outlined text-secondary-container text-xl">mail</span>
                  <span>contacto@casaliz.pe</span>
                </div>

                <div className="contact-item flex items-center gap-4 cursor-pointer">
                  <span className="material-symbols-outlined text-secondary-container text-xl">call</span>
                  <span>+51 084 123 456</span>
                </div>

                <div className="contact-item flex items-center gap-4 cursor-pointer">
                  <span className="material-symbols-outlined text-secondary-container text-xl">location_on</span>
                  <span>Av. El Sol 450, Cusco, Perú</span>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <div className="flex gap-4">
                <div className="social-btn w-10 h-10 border border-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors">
                  <span className="material-symbols-outlined text-xl">share</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="md:w-2/3 p-12 bg-surface-container-lowest">
            {isSuccess ? (
              <SuccessMessage />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                    Nombre Completo
                  </label>
                  <input
                    {...register('nombre')}
                    className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-surface-tint focus:bg-white transition-all"
                    placeholder="Ej. Juan Pérez"
                    type="text"
                  />
                  {errors.nombre && (
                    <span className="text-error text-sm">{errors.nombre.message}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                    Correo Electrónico
                  </label>
                  <input
                    {...register('email')}
                    className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-surface-tint focus:bg-white transition-all"
                    placeholder="juan@ejemplo.com"
                    type="email"
                  />
                  {errors.email && (
                    <span className="text-error text-sm">{errors.email.message}</span>
                  )}
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                    Tipo de Proyecto
                  </label>
                  <select
                    {...register('tipoProyecto')}
                    className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-surface-tint focus:bg-white transition-all"
                  >
                    <option>Residencial de Lujo</option>
                    <option>Desarrollo Comercial</option>
                    <option>Restauración Histórica</option>
                    <option>Otro</option>
                  </select>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-on-surface-variant">
                    Mensaje
                  </label>
                  <textarea
                    {...register('mensaje')}
                    className="w-full bg-surface-container-low border-none rounded-lg p-4 focus:ring-2 focus:ring-surface-tint focus:bg-white transition-all"
                    placeholder="Cuéntenos sobre su visión..."
                    rows={4}
                  />
                  {errors.mensaje && (
                    <span className="text-error text-sm">{errors.mensaje.message}</span>
                  )}
                </div>

                <div className="md:col-span-2 pt-4">
                  <SubmitButton isSubmitting={isSubmitting} />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// Success Message Component with animation
function SuccessMessage() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      const icon = ref.current?.querySelector('.success-icon')
      const text = ref.current?.querySelector('.success-text')

      gsap.fromTo(
        ref.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      )

      if (icon) {
        gsap.to(icon, {
          scale: 1.2,
          duration: 0.3,
          yoyo: true,
          repeat: 3,
          ease: 'power2.inOut',
          delay: 0.2,
        })
      }

      if (text) {
        gsap.fromTo(
          text,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.4, ease: 'power2.out' }
        )
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="h-full flex flex-col items-center justify-center text-center">
      <div className="success-icon w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl text-green-600">send</span>
      </div>
      <div className="success-text">
        <h3 className="text-2xl font-headline mb-2">¡Mensaje enviado!</h3>
        <p className="text-on-surface-variant">Nos pondremos en contacto con usted pronto.</p>
      </div>
    </div>
  )
}

// Submit Button Component with hover animation
function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const btn = ref.current

    const handleMouseEnter = () => {
      if (!btn.disabled) {
        gsap.to(btn, {
          scale: 1.02,
          boxShadow: '0 20px 40px rgba(22, 56, 40, 0.3)',
          duration: 0.3,
          ease: 'power2.out',
        })
      }
    }

    const handleMouseLeave = () => {
      gsap.to(btn, { scale: 1, boxShadow: 'none', duration: 0.3, ease: 'power2.out' })
    }

    const handleMouseDown = () => {
      gsap.to(btn, { scale: 0.98, duration: 0.1 })
    }

    const handleMouseUp = () => {
      gsap.to(btn, { scale: 1.02, duration: 0.1 })
    }

    btn.addEventListener('mouseenter', handleMouseEnter)
    btn.addEventListener('mouseleave', handleMouseLeave)
    btn.addEventListener('mousedown', handleMouseDown)
    btn.addEventListener('mouseup', handleMouseUp)

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter)
      btn.removeEventListener('mouseleave', handleMouseLeave)
      btn.removeEventListener('mousedown', handleMouseDown)
      btn.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <button
      ref={ref}
      type="submit"
      disabled={isSubmitting}
      className="w-full md:w-auto bg-primary text-on-primary px-12 py-5 rounded-lg font-bold uppercase tracking-[0.2em] shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
    >
      {isSubmitting ? (
        <>
          <span className="material-symbols-outlined text-xl animate-spin">progress_activity</span>
          Enviando...
        </>
      ) : (
        'Enviar Solicitud'
      )}
    </button>
  )
}
