'use client'

import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  priority?: boolean
  onLoad?: () => void
}

export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  onLoad 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setError(true)
  }

  return (
    <div className={`relative ${className}`}>
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-surface-container animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        fetchPriority={priority ? 'high' : 'auto'}
      />
      {error && (
        <div className="absolute inset-0 bg-surface-container flex items-center justify-center">
          <span className="text-on-surface-variant text-sm">Error al cargar imagen</span>
        </div>
      )}
    </div>
  )
}
