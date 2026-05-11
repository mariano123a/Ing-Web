'use client'

import { useState } from 'react'
import Image from 'next/image'

interface SafeImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
}

export function SafeImage({ src, alt, fill, width, height, className, priority, sizes }: SafeImageProps) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (error) {
    return (
      <div className={`bg-stone-200 flex items-center justify-center ${className}`} style={fill ? undefined : { width, height }}>
        <span className="text-stone-400 text-sm text-center px-2">{alt}</span>
      </div>
    )
  }

  const containerClass = fill ? className : className

  return (
    <div className={`relative ${containerClass} ${!loaded ? 'bg-stone-100 animate-pulse' : ''}`} style={fill ? undefined : { width, height }}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`object-cover ${className}`}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        priority={priority}
        sizes={sizes}
        unoptimized={src.includes('unsplash') || src.includes('picsum')}
      />
    </div>
  )
}
