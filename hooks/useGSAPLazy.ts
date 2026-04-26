'use client'

import { useEffect, useState } from 'react'

export function useGSAPLazy() {
  const [gsap, setGsap] = useState<any>(null)
  const [ScrollTrigger, setScrollTrigger] = useState<any>(null)

  useEffect(() => {
    // Cargar GSAP solo cuando se necesite
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([gsapModule, scrollTriggerModule]) => {
      setGsap(gsapModule.default)
      setScrollTrigger(scrollTriggerModule.ScrollTrigger)
      gsapModule.default.registerPlugin(scrollTriggerModule.ScrollTrigger)
    })
  }, [])

  return { gsap, ScrollTrigger, isLoaded: !!gsap }
}
