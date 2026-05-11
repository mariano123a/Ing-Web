# Casaliz - Construcción de Alta Gama en Cusco

Sitio web corporativo para Casaliz, empresa especializada en diseño, ingeniería y construcción de alta gama en Cusco, Perú.

## 🚀 Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos con Material Design 3
- **Supabase** - Base de datos y backend
- **GSAP** - Animaciones avanzadas
- **Framer Motion** - Animaciones React
- **React Hook Form + Zod** - Manejo de formularios con validación

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta en Supabase
- Python con `uv` instalado (para MCP de Supabase)

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/mariano123a/Ing-Web.git
cd Ing-Web
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Copia el archivo `.env.example` a `.env.local`:
```bash
cp .env.example .env.local
```

Luego edita `.env.local` con tus credenciales de Supabase:
- Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
- Navega a **Project Settings > API**
- Copia los valores:
  - `NEXT_PUBLIC_SUPABASE_URL`: URL del proyecto
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anon/Public key
  - `SUPABASE_SERVICE_ROLE_KEY`: Service Role key (¡mantén esto secreto!)

4. **Configurar la base de datos en Supabase**

Ve al **SQL Editor** en Supabase y ejecuta el archivo `supabase-setup.sql`:
- Abre el archivo `supabase-setup.sql`
- Copia todo el contenido
- Pégalo en el SQL Editor de Supabase
- Haz clic en "Run"

Esto creará:
- ✅ Tablas: `proyectos`, `mensajes_contacto`, `contenido_sitio`
- ✅ Políticas de seguridad (RLS)
- ✅ Datos de ejemplo

5. **Crear usuario administrador**

En Supabase Dashboard:
- Ve a **Authentication > Users**
- Clic en **"Add user" > "Create new user"**
- Ingresa:
  - Email: `admin@casaliz.pe`
  - Password: `contraseña12345`
  - ✓ Auto Confirm User
- Clic en **"Create user"**

Este usuario podrá acceder al CMS.

6. **Instalar uv para MCP de Supabase** (opcional, para usar con Kiro)

En Windows con PowerShell:
```powershell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

En macOS/Linux:
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## 🏃 Ejecutar el Proyecto

**Modo desarrollo:**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

**Build de producción:**
```bash
npm run build
npm start
```

## 📁 Estructura del Proyecto

```
casaliz-web/
├── app/                    # App Router de Next.js
│   ├── admin/             # Panel de administración
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página principal
│   └── globals.css        # Estilos globales
├── components/
│   ├── gsap/              # Componentes con animaciones GSAP
│   ├── layout/            # Header, Footer, Navigation
│   ├── motion/            # Componentes con Framer Motion
│   └── sections/          # Secciones de la landing page
├── hooks/                 # Custom React hooks
├── lib/
│   ├── supabase.ts        # Cliente y funciones de Supabase
│   └── schemas.ts         # Schemas de validación con Zod
├── .kiro/
│   └── settings/
│       └── mcp.json       # Configuración MCP de Supabase
└── public/                # Archivos estáticos
```

## 🎨 Características

- ✨ Animaciones fluidas con GSAP y Framer Motion
- 🎨 Sistema de diseño Material Design 3
- 📱 Diseño responsive
- 🌐 SEO optimizado
- 📧 Formulario de contacto con validación
- 🖼️ Galería de proyectos
- 👨‍💼 **CMS completo con autenticación**
- 🔐 Sistema de login seguro
- ✏️ Edición de proyectos (crear, editar, eliminar)
- 📬 Gestión de mensajes de contacto
- 🔒 Integración con Supabase

## 🔐 Panel de Administración (CMS)

### Credenciales del CMS

1. **Botón discreto en el navbar**: Busca el ícono de engranaje (⚙️) en la esquina superior derecha
2. **URL directa**: Navega a `/admin/login`
3. **Credenciales por defecto**:
   - Email: `admin@casaliz.pe`
   - Password: `contraseña12345`

### Funcionalidades del CMS

**Gestión de Proyectos:**
- ✅ Crear nuevos proyectos
- ✅ Editar proyectos existentes
- ✅ Eliminar proyectos
- ✅ Agregar múltiples imágenes (URLs)
- ✅ Configurar tipo, estado, precio, ubicación
- ✅ Vista previa en tiempo real

**Gestión de Mensajes:**
- ✅ Ver todos los mensajes de contacto
- ✅ Marcar como leído/no leído
- ✅ Filtrar mensajes nuevos
- ✅ Ver detalles completos (nombre, email, teléfono, mensaje)

### Rutas del Admin

```
/admin/login    → Página de inicio de sesión
/admin/cms      → Panel CMS (requiere autenticación)
```

## 🔐 Seguridad

- Las variables de entorno sensibles están en `.gitignore`
- Row Level Security (RLS) habilitado en Supabase
- Service Role Key solo se usa en el servidor
- Validación de formularios con Zod

## 📝 Notas de Desarrollo

### MCP de Supabase con Kiro

El proyecto incluye configuración para el Model Context Protocol (MCP) de Supabase, que permite a Kiro AI interactuar directamente con tu base de datos.

La configuración está en `.kiro/settings/mcp.json` y usa las variables de entorno de `.env.local`.

### Panel de Administración

Accede al panel en `/admin/login` para:
- **Iniciar sesión** con credenciales de Supabase
- **Gestionar proyectos**: crear, editar, eliminar
- **Ver mensajes** de contacto recibidos
- **Marcar mensajes** como leídos

El botón de acceso al admin está discretamente ubicado en el navbar (ícono de engranaje).

**Seguridad:**
- Autenticación requerida con Supabase Auth
- Row Level Security (RLS) habilitado
- Solo usuarios autenticados pueden modificar contenido

## 🚀 Deploy

### ⚠️ Importante: Limitación en Vercel Free

**En el plan Vercel Free NO es posible configurar variables de entorno**, lo que significa que el CMS no funcionará en el deployment gratuito.

**Opciones disponibles:**

1. **Vercel Pro** ($20 USD/mes)
   - Permite configurar variables de entorno
   - CMS completamente funcional
   - Mejor rendimiento

2. **Otras plataformas gratuitas** (Railway, Render, Netlify)
   - Permiten variables de entorno en plan gratuito
   - Fácil integración con GitHub

3. **Desarrollo Local**
   - Ejecuta `npm run dev` localmente
   - CMS completamente funcional
   - Perfecto para demostración

**Para más información:** Lee `DEPLOYMENT-VERCEL-INFO.md`

### Deploy en Vercel Pro

```bash
vercel
```

Luego configura las variables de entorno en Vercel Dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 📄 Licencia

Todos los derechos reservados - Casaliz © 2026
