import type { Metadata } from 'next'
import { Newsreader, Manrope } from 'next/font/google'
import './globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Casaliz | Construcción de Alta Gama en Cusco',
  description: 'Diseño, ingeniería y construcción de alta gama con el respeto que la tierra merece. Proyectos residenciales, comerciales y restauración de patrimonio en Cusco, Perú.',
  keywords: ['construcción', 'arquitectura', 'Cusco', 'Perú', 'diseño', 'interiorismo', 'restauración'],
  openGraph: {
    title: 'Casaliz | Construcción de Alta Gama',
    description: 'Diseño, ingeniería y construcción de alta gama en el corazón de los Andes',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${newsreader.variable} ${manrope.variable}`}>
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface text-on-surface font-body antialiased">
        {children}
      </body>
    </html>
  )
}
