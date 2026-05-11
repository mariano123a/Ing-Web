// Datos mock completos para Casaliz

export interface Proyecto {
  id: string
  slug: string
  nombre: string
  descripcion: string
  descripcionLarga: string
  ubicacion: string
  tipo: 'residencial' | 'comercial' | 'industrial' | 'mixto' | 'restauracion'
  estado: 'en planos' | 'en construcción' | 'entregado' | 'en venta'
  precio_referencial: string
  area: string
  habitaciones?: number
  banos?: number
  anio: number
  cliente: string
  caracteristicas: string[]
  imagenes: string[]
  featured: boolean
}

export interface MiembroEquipo {
  id: string
  nombre: string
  cargo: string
  bio: string
  imagen: string
  linkedin?: string
  email?: string
}

export interface Testimonio {
  id: string
  nombre: string
  cargo: string
  empresa: string
  testimonio: string
  imagen: string
  rating: number
}

export interface ServicioDetalle {
  id: string
  titulo: string
  slug: string
  descripcion: string
  descripcionLarga: string
  imagen: string
  icono: string
  caracteristicas: string[]
  proceso: { paso: number; titulo: string; descripcion: string }[]
}

// IMAGENES UNSPLASH - Arquitectura, construcción, Cusco, Perú, Andes
const IMG = {
  hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
  hero2: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
  hero3: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80',
  // Proyectos residenciales
  proj1: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
  proj2: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
  proj3: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1200&q=80',
  proj4: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80',
  // Proyectos comerciales
  proj5: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  proj6: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
  // Restauración
  proj7: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
  proj8: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80',
  // Industrial
  proj9: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80',
  // Mixto
  proj10: 'https://images.unsplash.com/photo-1600573472591-ee6c563aaec3?w=1200&q=80',
  // Servicios
  serv1: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80',
  serv2: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80',
  serv3: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80',
  serv4: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=1200&q=80',
  serv5: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
  serv6: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80',
  // Equipo
  team1: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
  team2: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  team3: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  team4: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  team5: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
  team6: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80',
  // Testimonios
  test1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  test2: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  test3: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  test4: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
  test5: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
  test6: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
  test7: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80',
  test8: 'https://images.unsplash.com/photo-1554151228-14d9def656ec?w=200&q=80',
  // Galería detalle
  detail1: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
  detail2: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80',
  detail3: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
  detail4: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
}

export const proyectos: Proyecto[] = [
  {
    id: '1',
    slug: 'hacienda-san-agustin',
    nombre: 'Hacienda San Agustín',
    descripcion: 'Residencia de lujo con vistas panorámicas al Valle Sagrado, integrada con la topografía andina.',
    descripcionLarga: 'La Hacienda San Agustín representa la máxima expresión de la arquitectura residencial de altura en Cusco. Diseñada para una familia con raíces profundas en la región, esta residencia de 1,200 m² se integra armónicamente con la topografía del Valle Sagrado, utilizando piedra local, madera de eucalipto tratada y techos verdes que minimizan el impacto visual. El proyecto incluye un sistema de calefacción geotérmica, paneles solares discretos y un jardín botánico con especies nativas. Cada espacio fue diseñado para maximizar la luz natural y las vistas a las montañas, con terrazas que se proyectan hacia el paisaje andino.',
    ubicacion: 'Urubamba, Valle Sagrado, Cusco',
    tipo: 'residencial',
    estado: 'entregado',
    precio_referencial: 'S/ 4,200,000',
    area: '1,200 m²',
    habitaciones: 5,
    banos: 6,
    anio: 2023,
    cliente: 'Familia Rodríguez-Collado',
    caracteristicas: [
      'Calefacción geotérmica',
      'Paneles solares integrados',
      'Techo verde extensivo',
      'Piscina climatizada infinita',
      'Bodega subterránea',
      'Mirador panorámico',
      'Huerto orgánico',
      'Sistema de riego inteligente'
    ],
    imagenes: [IMG.proj1, IMG.detail1, IMG.detail2, IMG.detail3, IMG.detail4],
    featured: true,
  },
  {
    id: '2',
    slug: 'condominio-inka-royal',
    nombre: 'Condominio Inka Royal',
    descripcion: 'Complejo residencial de 24 departamentos de lujo con amenidades de clase mundial en Cusco.',
    descripcionLarga: 'El Condominio Inka Royal es un desarrollo residencial de élite ubicado en el exclusivo distrito de Lucre, a solo 15 minutos del centro histórico de Cusco. El complejo consta de 24 departamentos distribuidos en 6 torres de 4 pisos cada una, con áreas desde 120 m² hasta 280 m². El diseño arquitectónico combina elementos contemporáneos con referencias sutiles a la herencia inca, utilizando piedra sillar en fachadas y patios interiores con jardines verticales. Las amenidades incluyen un spa completo, gimnasio equipado, sala de cine, terraza con piscina climatizada y un lobby de doble altura con arte local.',
    ubicacion: 'Lucre, Cusco',
    tipo: 'residencial',
    estado: 'en venta',
    precio_referencial: 'Desde S/ 850,000',
    area: '120 - 280 m²',
    habitaciones: 2,
    banos: 2,
    anio: 2024,
    cliente: 'Inversiones Andinas S.A.C.',
    caracteristicas: [
      '24 departamentos exclusivos',
      'Spa y centro de bienestar',
      'Piscina climatizada en azotea',
      'Sala de cine privada',
      'Gimnasio equipado Technogym',
      'Jardines verticales',
      'Estacionamiento subterráneo',
      'Seguridad 24/7'
    ],
    imagenes: [IMG.proj2, IMG.detail2, IMG.detail3, IMG.detail1, IMG.detail4],
    featured: true,
  },
  {
    id: '3',
    slug: 'casa-quinta-sacred',
    nombre: 'Casa Quinta Sacred',
    descripcion: 'Villa boutique de estilo colonial moderno con jardines andinos en Yanahuara.',
    descripcionLarga: 'La Casa Quinta Sacred es una residencia boutique que redefine el concepto de hogar en altura. Ubicada en el pintoresco distrito de Yanahuara, esta villa de 800 m² combina la elegancia del estilo colonial cusqueño con comodidades modernas de última generación. La fachada presenta arcos de piedra sillar, balcones de madera tallada y ventanales de piso a techo que enmarcan las vistas a los nevados. El interior cuenta con pisos de mármol de travertino, una escalera imperial de doble altura, y una biblioteca con chimenea de piedra. El jardín andino incluye una laguna natural, senderos de piedra y una pérgola de madera para eventos al aire libre.',
    ubicacion: 'Yanahuara, Cusco',
    tipo: 'residencial',
    estado: 'entregado',
    precio_referencial: 'S/ 3,800,000',
    area: '800 m²',
    habitaciones: 4,
    banos: 5,
    anio: 2022,
    cliente: 'Dr. Carlos Mendoza',
    caracteristicas: [
      'Arquitectura colonial moderna',
      'Biblioteca con chimenea',
      'Laguna natural en jardín',
      'Pérgola para eventos',
      'Cava de vinos climatizada',
      'Suite principal con vestidor',
      'Terraza con jacuzzi',
      'Garaje para 4 vehículos'
    ],
    imagenes: [IMG.proj3, IMG.detail3, IMG.detail1, IMG.detail4, IMG.detail2],
    featured: false,
  },
  {
    id: '4',
    slug: 'residencial-altos-andes',
    nombre: 'Residencial Altos de los Andes',
    descripcion: 'Desarrollo de 12 casas unifamiliares con diseño sostenible en la urbanización exclusiva de Saylla.',
    descripcionLarga: 'Residencial Altos de los Andes es un desarrollo de vanguardia que demuestra que la sostenibilidad y el lujo pueden coexistir perfectamente. El proyecto comprende 12 casas unifamiliares de diseño contemporáneo, cada una con un jardín privado y acceso directo a las áreas comunes. El complejo está diseñado bajo principios de construcción pasiva, con orientación solar optimizada, muros térmicos de adobe reforzado, y sistemas de captación de agua pluvial. La casa club ofrece un salón de eventos, una piscina ecológica con filtración natural, y un parque infantil temático andino.',
    ubicacion: 'Saylla, Cusco',
    tipo: 'residencial',
    estado: 'en construcción',
    precio_referencial: 'Desde S/ 620,000',
    area: '180 - 250 m²',
    habitaciones: 3,
    banos: 3,
    anio: 2025,
    cliente: 'Grupo Altos S.A.C.',
    caracteristicas: [
      '12 casas unifamiliares',
      'Construcción pasiva certificada',
      'Captación de agua pluvial',
      'Casa club con salón',
      'Piscina ecológica',
      'Parque infantil temático',
      'Senderos peatonales',
      'Áreas verdes comunes'
    ],
    imagenes: [IMG.proj4, IMG.detail4, IMG.detail1, IMG.detail2, IMG.detail3],
    featured: true,
  },
  {
    id: '5',
    slug: 'torre-corporativa-cusco',
    nombre: 'Torre Corporativa Cusco',
    descripcion: 'Edificio de oficinas Clase A de 15 pisos con certificación LEED en el distrito financiero de Wanchaq.',
    descripcionLarga: 'La Torre Corporativa Cusco es el primer edificio de oficinas Clase A de la región sureste del Perú, estableciendo un nuevo estándar para el desarrollo comercial en zonas de altura. La torre de 15 pisos cuenta con 18,000 m² de área rentable, distribuidos en plantas libres de 1,200 m² cada una. El diseño arquitectónico presenta una fachada de doble piel con cristal de baja emisividad y paneles de aluminio anodizado, que reduce en un 40% el consumo energético para climatización. El edificio cuenta con 6 ascensores de alta velocidad, un helipuerto en la azotea, y un centro de convenciones de 500 personas en el primer subsuelo.',
    ubicacion: 'Wanchaq, Cusco',
    tipo: 'comercial',
    estado: 'entregado',
    precio_referencial: 'S/ 45,000,000',
    area: '18,000 m²',
    anio: 2023,
    cliente: 'Corporación Andina de Desarrollo',
    caracteristicas: [
      'Certificación LEED Gold',
      'Fachada de doble piel',
      '6 ascensores de alta velocidad',
      'Helipuerto en azotea',
      'Centro de convenciones 500 px',
      'Estacionamiento 300 vehículos',
      'Generador eléctrico full',
      'Data center en subsuelo'
    ],
    imagenes: [IMG.proj5, IMG.detail1, IMG.detail2, IMG.detail3, IMG.detail4],
    featured: true,
  },
  {
    id: '6',
    slug: 'hotel-boutique-inti',
    nombre: 'Hotel Boutique Inti Wasi',
    descripcion: 'Hotel boutique de 20 suites con spa temático andino en el corazón del centro histórico.',
    descripcionLarga: 'El Hotel Boutique Inti Wasi es una joya arquitectónica ubicada en una casona colonial del siglo XVIII, cuidadosamente restaurada y adaptada para ofrecer una experiencia hotelera de clase mundial. Las 20 suites están distribuidas alrededor de tres patios interiores, cada uno con un jardín temático diferente: el patio del sol, el patio de la luna, y el patio de las estrellas. El spa temático andino ofrece tratamientos con hierbas medicinales locales, baños de vapor con piedras calientes, y masajes con aceites esenciales de plantas nativas. El restaurante gourmet, dirigido por un chef reconocido, propone una reinterpretación moderna de la cocina andina.',
    ubicacion: 'Centro Histórico, Cusco',
    tipo: 'comercial',
    estado: 'entregado',
    precio_referencial: 'S/ 12,000,000',
    area: '2,500 m²',
    anio: 2022,
    cliente: 'Inti Wasi Hospitality Group',
    caracteristicas: [
      '20 suites diseñadas individualmente',
      'Spa temático andino',
      'Restaurante gourmet',
      '3 patios interiores temáticos',
      'Terraza con vista a la Catedral',
      'Sala de yoga y meditación',
      'Bar de pisco artesanal',
      'Servicio de mayordomo 24/7'
    ],
    imagenes: [IMG.proj6, IMG.detail2, IMG.detail3, IMG.detail1, IMG.detail4],
    featured: false,
  },
  {
    id: '7',
    slug: 'restauracion-san-blas',
    nombre: 'Restauración Capilla San Blas',
    descripcion: 'Restauración integral de la Capilla de San Blas del siglo XVI, patrimonio cultural de la humanidad.',
    descripcionLarga: 'La restauración de la Capilla de San Blas es uno de los proyectos de conservación más importantes realizados en Cusco en las últimas décadas. Este templo del siglo XVI, declarado Patrimonio Cultural de la Humanidad por la UNESCO, sufrió daños estructurales significativos tras el terremoto de 1950. El proyecto de restauración integral abarcó la consolidación de muros de adobe y piedra, la restauración de 12 lienzos coloniales del Cusco School, la recuperación del retablo dorado, y la instalación de un sistema de monitoreo sísmico de última generación. El trabajo fue realizado por un equipo de 45 artesanos especializados, bajo la supervisión de arqueólogos e ingenieros estructurales.',
    ubicacion: 'Barrio de San Blas, Cusco',
    tipo: 'restauracion',
    estado: 'entregado',
    precio_referencial: 'S/ 3,500,000',
    area: '800 m²',
    anio: 2021,
    cliente: 'Arzobispado de Cusco',
    caracteristicas: [
      'Consolidación estructural sísmica',
      'Restauración de 12 lienzos coloniales',
      'Recuperación del retablo dorado',
      'Sistema de monitoreo sísmico',
      'Restauración de murales',
      'Rehabilitación de órgano tubular',
      'Instalación eléctrica oculta',
      'Documentación arqueológica'
    ],
    imagenes: [IMG.proj7, IMG.detail3, IMG.detail1, IMG.detail4, IMG.detail2],
    featured: true,
  },
  {
    id: '8',
    slug: 'casona-arequipa',
    nombre: 'Casona Colonial Arequipa',
    descripcion: 'Restauración y adaptación de una casona del siglo XVII como centro cultural y gastronómico.',
    descripcionLarga: 'La Casona Colonial de Arequipa es un proyecto de rehabilitación que transformó una mansión del siglo XVII, en estado de abandono, en un vibrante centro cultural y gastronómico. Ubicada en el tradicional barrio de Yanahuara, la casona conserva sus patios con arquerías de sillar volcánico, murales de estilo mestizo, y techos de cedro tallado. El proyecto incluyó la consolidación de cimientos, refuerzo de muros portantes, y la instalación de sistemas modernos de climatización discretamente integrados. El centro cultural alberga una galería de arte contemporáneo, un restaurante de alta cocina arequipeña, y un auditorio para 80 personas.',
    ubicacion: 'Yanahuara, Arequipa',
    tipo: 'restauracion',
    estado: 'entregado',
    precio_referencial: 'S/ 2,800,000',
    area: '1,100 m²',
    anio: 2022,
    cliente: 'Fundación Patrimonio Vivo',
    caracteristicas: [
      'Consolidación de cimientos',
      'Restauración de arquerías',
      'Recuperación de murales',
      'Galería de arte contemporáneo',
      'Restaurante gastronómico',
      'Auditorio 80 personas',
      'Sistemas de climatización',
      'Iluminación arquitectónica'
    ],
    imagenes: [IMG.proj8, IMG.detail4, IMG.detail2, IMG.detail1, IMG.detail3],
    featured: false,
  },
  {
    id: '9',
    slug: 'planta-urubamba',
    nombre: 'Planta Industrial Urubamba',
    descripcion: 'Planta de procesamiento de quinua orgánica con diseño bioclimático en el Valle Sagrado.',
    descripcionLarga: 'La Planta Industrial Urubamba es una instalación de procesamiento de quinua orgánica que demuestra que la arquitectura industrial puede ser estéticamente impactante y ambientalmente responsable. El complejo de 3,500 m² fue diseñado con principios bioclimáticos, utilizando la ventilación cruzada natural, iluminación cenital, y un sistema de climatización por agua fría captada del río Urubamba. La estructura de acero y concreto está revestida con paneles de bambú local y piedra de cantera. La planta incluye áreas de recepción, procesamiento, empaque, almacén refrigerado, y oficinas administrativas con vistas panorámicas.',
    ubicacion: 'Urubamba, Valle Sagrado',
    tipo: 'industrial',
    estado: 'en construcción',
    precio_referencial: 'S/ 8,500,000',
    area: '3,500 m²',
    anio: 2025,
    cliente: 'Quinua Andina Export S.A.C.',
    caracteristicas: [
      'Diseño bioclimático certificado',
      'Procesamiento 5 ton/día',
      'Almacén refrigerado 500 m²',
      'Oficinas con vistas panorámicas',
      'Panel solar 100 kW',
      'Tratamiento de aguas residuales',
      'Laboratorio de control de calidad',
      'Estacionamiento 50 vehículos'
    ],
    imagenes: [IMG.proj9, IMG.detail1, IMG.detail3, IMG.detail2, IMG.detail4],
    featured: false,
  },
  {
    id: '10',
    slug: 'centro-comercial-wanchaq',
    nombre: 'Centro Comercial Wanchaq Plaza',
    descripcion: 'Centro comercial de 3 niveles con cine, supermercado y 45 tiendas en zona estratégica.',
    descripcionLarga: 'El Centro Comercial Wanchaq Plaza es el desarrollo comercial más ambicioso de Cusco en los últimos años. Ubicado en la confluencia de las avenidas principales del distrito de Wanchaq, el complejo de 12,000 m² de área construida alberga un supermercado de primera marca, 45 locales comerciales de diversos rubros, 6 salas de cine con tecnología IMAX, una zona de comidas rápidas con 15 restaurantes, y un estacionamiento subterráneo para 400 vehículos. La arquitectura contemporánea presenta una fachada de cristal y acero con un atrio central de triple altura iluminado naturalmente por una cúpula de vidrio inteligente.',
    ubicacion: 'Wanchaq, Cusco',
    tipo: 'mixto',
    estado: 'en planos',
    precio_referencial: 'S/ 28,000,000',
    area: '12,000 m²',
    anio: 2026,
    cliente: 'Inversiones Wanchaq S.A.',
    caracteristicas: [
      '45 locales comerciales',
      'Supermercado ancla 2,000 m²',
      '6 salas de cine IMAX',
      'Food court 15 restaurantes',
      'Estacionamiento 400 vehículos',
      'Atrio central triple altura',
      'Cúpula de vidrio inteligente',
      'Área de juegos infantiles'
    ],
    imagenes: [IMG.proj10, IMG.detail2, IMG.detail4, IMG.detail1, IMG.detail3],
    featured: true,
  },
]

export const equipo: MiembroEquipo[] = [
  {
    id: '1',
    nombre: 'Ing. Roberto Casaliz',
    cargo: 'Fundador & CEO',
    bio: 'Ingeniero Civil con 25 años de experiencia en construcción de alta gama. Lideró más de 50 proyectos emblemáticos en Cusco y la región sur. Especialista en estructuras sismorresistentes y restauración de patrimonio.',
    imagen: IMG.team1,
    linkedin: '#',
    email: 'roberto@casaliz.pe',
  },
  {
    id: '2',
    nombre: 'Arq. María Elena Vargas',
    cargo: 'Directora de Arquitectura',
    bio: 'Arquitecta por la Universidad de Lima con maestría en Diseño Sostenible en ETH Zürich. Diseñó residencias premiadas en Sudamérica. Apasionada por la integración de la arquitectura moderna con el patrimonio cultural.',
    imagen: IMG.team2,
    linkedin: '#',
    email: 'maria@casaliz.pe',
  },
  {
    id: '3',
    nombre: 'Ing. Diego Huamán',
    cargo: 'Director de Operaciones',
    bio: 'Ingeniero Industrial con MBA en ESADE Barcelona. Expertise en gestión de proyectos de gran escala, lean construction y optimización de procesos. Lideró la entrega de proyectos por valor de S/ 200 millones.',
    imagen: IMG.team3,
    linkedin: '#',
    email: 'diego@casaliz.pe',
  },
  {
    id: '4',
    nombre: 'Arq. Lucía Quispe',
    cargo: 'Jefa de Restauración',
    bio: 'Arquitecta restauradora con especialización en Patrimonio de la Universidad de Sevilla. Dirigió la restauración de 8 monumentos históricos en Cusco. Experta en técnicas constructivas coloniales e incas.',
    imagen: IMG.team4,
    linkedin: '#',
    email: 'lucia@casaliz.pe',
  },
  {
    id: '5',
    nombre: 'Ing. Javier Paredes',
    cargo: 'Director de Ingeniería',
    bio: 'Ingeniero Estructural con PhD en Ingeniería Sísmica de la Universidad de California, Berkeley. Diseñó sistemas estructurales para edificios de hasta 25 pisos en zonas sísmicas de alta intensidad.',
    imagen: IMG.team5,
    linkedin: '#',
    email: 'javier@casaliz.pe',
  },
  {
    id: '6',
    nombre: 'Srta. Ana Condori',
    cargo: 'Gerente de Proyectos',
    bio: 'Ingeniera Civil con certificación PMP. Experta en gestión de stakeholders, control de costos y cronogramas. Coordinó equipos multidisciplinarios de hasta 120 personas en proyectos simultáneos.',
    imagen: IMG.team6,
    linkedin: '#',
    email: 'ana@casaliz.pe',
  },
]

export const testimonios: Testimonio[] = [
  {
    id: '1',
    nombre: 'Dr. Carlos Mendoza',
    cargo: 'Propietario',
    empresa: 'Casa Quinta Sacred',
    testimonio: 'Casaliz transformó nuestro sueño en realidad. La atención al detalle, el respeto por el entorno andino y la calidad de los acabados superaron todas nuestras expectativas. Nuestra casa es un verdadero refugio en los Andes.',
    imagen: IMG.test1,
    rating: 5,
  },
  {
    id: '2',
    nombre: 'Ing. Patricia López',
    cargo: 'Directora General',
    empresa: 'Inversiones Andinas S.A.C.',
    testimonio: 'Trabajar con Casaliz fue una experiencia excepcional. Su equipo entregó el Condominio Inka Royal en tiempo récord, manteniendo los más altos estándares de calidad. Los compradores están encantados.',
    imagen: IMG.test2,
    rating: 5,
  },
  {
    id: '3',
    nombre: 'Arq. Fernando Rojas',
    cargo: 'Coordinador de Restauración',
    empresa: 'Arzobispado de Cusco',
    testimonio: 'La restauración de la Capilla San Blas requería una sensibilidad especial que Casaliz demostró tener. Su equipo de artesanos y especialistas respetó cada detalle histórico mientras consolidaba la estructura.',
    imagen: IMG.test3,
    rating: 5,
  },
  {
    id: '4',
    nombre: 'Sra. Isabel Vega',
    cargo: 'Propietaria',
    empresa: 'Hacienda San Agustín',
    testimonio: 'Desde el primer boceto hasta la entrega final, Casaliz nos acompañó con profesionalismo y pasión. Nuestra hacienda es hoy un ejemplo de arquitectura sostenible en el Valle Sagrado.',
    imagen: IMG.test4,
    rating: 5,
  },
  {
    id: '5',
    nombre: 'Lic. Rosa Quispe',
    cargo: 'CEO',
    empresa: 'Inti Wasi Hospitality',
    testimonio: 'Convirtieron una casona colonial en ruinas en el hotel boutique más exclusivo de Cusco. La combinación de técnicas tradicionales con tecnología moderna es simplemente magistral.',
    imagen: IMG.test5,
    rating: 5,
  },
  {
    id: '6',
    nombre: 'Ing. Miguel Torres',
    cargo: 'Gerente de Operaciones',
    empresa: 'Corporación Andina de Desarrollo',
    testimonio: 'La Torre Corporativa Cusco es un hito arquitectónico. Casaliz demostró capacidad técnica de clase mundial, entregando un edificio LEED Gold en una de las ciudades más complejas para construir.',
    imagen: IMG.test6,
    rating: 5,
  },
  {
    id: '7',
    nombre: 'Dra. Carmen Palacios',
    cargo: 'Presidenta',
    empresa: 'Fundación Patrimonio Vivo',
    testimonio: 'La restauración de la Casona Colonial en Arequipa fue un proyecto delicado. Casaliz logró preservar la esencia histórica mientras la adaptaba para usos contemporáneos. Un trabajo impecable.',
    imagen: IMG.test7,
    rating: 5,
  },
  {
    id: '8',
    nombre: 'Sr. Jorge Herrera',
    cargo: 'Propietario',
    empresa: 'Residencial Altos de los Andes',
    testimonio: 'Compré una casa en Altos de los Andes y quedé impresionado con la calidad constructiva. Los materiales, los acabados, el diseño... todo habla de un equipo que ama su trabajo. Casaliz es sinónimo de excelencia.',
    imagen: IMG.test8,
    rating: 5,
  },
]

export const serviciosDetalle: ServicioDetalle[] = [
  {
    id: '1',
    titulo: 'Arquitectura Residencial',
    slug: 'arquitectura-residencial',
    descripcion: 'Diseñamos hogares que trascienden generaciones, integrados con el paisaje andino.',
    descripcionLarga: 'Nuestro estudio de arquitectura residencial crea espacios únicos que responden a las necesidades específicas de cada familia, al clima de altura y al paisaje andino. Desde villas boutique hasta conjuntos residenciales, cada proyecto es una obra personalizada que combina estética, funcionalidad y sostenibilidad.',
    imagen: IMG.serv1,
    icono: 'home',
    caracteristicas: [
      'Diseño personalizado',
      'Integración paisajística',
      'Eficiencia energética',
      'Materiales locales',
      'Sistemas de calefacción eficientes',
      'Aprovechamiento de luz natural',
    ],
    proceso: [
      { paso: 1, titulo: 'Descubrimiento', descripcion: 'Entendemos tus necesidades, gustos y el terreno' },
      { paso: 2, titulo: 'Concepto', descripcion: 'Desarrollamos bocetos y propuestas de diseño' },
      { paso: 3, titulo: 'Desarrollo', descripcion: 'Proyecto ejecutivo con planos y especificaciones' },
      { paso: 4, titulo: 'Construcción', descripcion: 'Ejecución con supervisión de arquitecto residente' },
      { paso: 5, titulo: 'Entrega', descripcion: 'Entrega llave en mano con garantía estructural' },
    ],
  },
  {
    id: '2',
    titulo: 'Construcción Comercial',
    slug: 'construccion-comercial',
    descripcion: 'Edificios corporativos, hoteles y centros comerciales con los más altos estándares.',
    descripcionLarga: 'Especialistas en proyectos comerciales de gran escala, desde torres de oficinas Clase A hasta hoteles boutique y centros comerciales. Nuestra experiencia en zonas de altura nos permite optimizar diseños para eficiencia operativa y sostenibilidad.',
    imagen: IMG.serv2,
    icono: 'building',
    caracteristicas: [
      'Edificios Clase A',
      'Hoteles boutique',
      'Centros comerciales',
      'Certificación LEED',
      'Diseño bioclimático',
      'Sistemas inteligentes',
    ],
    proceso: [
      { paso: 1, titulo: 'Análisis', descripcion: 'Estudio de mercado y viabilidad del proyecto' },
      { paso: 2, titulo: 'Diseño', descripcion: 'Arquitectura e ingeniería integrada' },
      { paso: 3, titulo: 'Permisos', descripcion: 'Gestión de licencias y aprobaciones' },
      { paso: 4, titulo: 'Ejecución', descripcion: 'Construcción con control de calidad' },
      { paso: 5, titulo: 'Puesta en marcha', descripcion: 'Comisionamiento y entrega operativa' },
    ],
  },
  {
    id: '3',
    titulo: 'Restauración de Patrimonio',
    slug: 'restauracion-patrimonio',
    descripcion: 'Preservación técnica de estructuras históricas con artesanos especializados.',
    descripcionLarga: 'Somos líderes en restauración de patrimonio arquitectónico en el Perú. Nuestro equipo de arquitectos restauradores, artesanos y especialistas ha trabajado en templos coloniales, casonas y monumentos históricos, siempre respetando la autenticidad y aplicando técnicas ancestrales.',
    imagen: IMG.serv3,
    icono: 'landmark',
    caracteristicas: [
      'Restauración de templos',
      'Casonas coloniales',
      'Documentación arqueológica',
      'Técnicas ancestrales',
      'Consolidación sísmica',
      'Recuperación de murales',
    ],
    proceso: [
      { paso: 1, titulo: 'Diagnóstico', descripcion: 'Estudio histórico y evaluación estructural' },
      { paso: 2, titulo: 'Planificación', descripcion: 'Plan de restauración con autoridades' },
      { paso: 3, titulo: 'Intervención', descripcion: 'Ejecución con artesanos especializados' },
      { paso: 4, titulo: 'Documentación', descripcion: 'Registro fotográfico y arqueológico' },
      { paso: 5, titulo: 'Entrega', descripcion: 'Entrega con manual de mantenimiento' },
    ],
  },
  {
    id: '4',
    titulo: 'Diseño de Interiores',
    slug: 'diseno-interiores',
    descripcion: 'Espacios interiores que combinan estética andina con lujo contemporáneo.',
    descripcionLarga: 'Nuestro estudio de diseño de interiores crea ambientes sofisticados que reflejan la identidad de sus ocupantes. Integramos textiles andinos, arte local y materiales nobles para espacios únicos que cuentan historias.',
    imagen: IMG.serv4,
    icono: 'palette',
    caracteristicas: [
      'Diseño de mobiliario',
      'Selección de materiales',
      'Iluminación arquitectónica',
      'Arte y decoración',
      'Textiles andinos',
      'Proyectos llave en mano',
    ],
    proceso: [
      { paso: 1, titulo: 'Inspiración', descripcion: 'Moodboard y conceptualización del espacio' },
      { paso: 2, titulo: 'Propuesta', descripcion: 'Render 3D y selección de materiales' },
      { paso: 3, titulo: 'Ejecución', descripcion: 'Coordinación con proveedores y artesanos' },
      { paso: 4, titulo: 'Montaje', descripcion: 'Instalación y ajustes finales' },
      { paso: 5, titulo: 'Revelación', descripcion: 'Entrega y sesión fotográfica profesional' },
    ],
  },
  {
    id: '5',
    titulo: 'Ingeniería Estructural',
    slug: 'ingenieria-estructural',
    descripcion: 'Cálculo y diseño de estructuras sismorresistentes para cualquier escala.',
    descripcionLarga: 'Nuestro departamento de ingeniería estructural diseña sistemas resistentes a sismos de alta intensidad, optimizando materiales y garantizando la seguridad. Utilizamos software de análisis avanzado y seguimos los códigos más estrictos.',
    imagen: IMG.serv5,
    icono: 'ruler',
    caracteristicas: [
      'Análisis sísmico',
      'Diseño de cimentaciones',
      'Estructuras de acero',
      'Concreto postensado',
      'Muros de contención',
      'Monitoreo estructural',
    ],
    proceso: [
      { paso: 1, titulo: 'Estudio', descripcion: 'Geotecnia y análisis de suelos' },
      { paso: 2, titulo: 'Modelado', descripcion: 'Modelo 3D y análisis estructural' },
      { paso: 3, titulo: 'Diseño', descripcion: 'Planos estructurales y especificaciones' },
      { paso: 4, titulo: 'Revisión', descripcion: 'Coordinación con otras especialidades' },
      { paso: 5, titulo: 'Supervisión', descripcion: 'Control de ejecución en obra' },
    ],
  },
  {
    id: '6',
    titulo: 'Gerencia de Proyectos',
    slug: 'gerencia-proyectos',
    descripcion: 'Gestión integral de proyectos de construcción desde la concepción hasta la entrega.',
    descripcionLarga: 'Ofrecemos servicios de gerencia de proyectos que aseguran la entrega oportuna, dentro del presupuesto y con la calidad esperada. Nuestros gerentes certificados PMP coordinan equipos multidisciplinarios y gestionan riesgos proactivamente.',
    imagen: IMG.serv6,
    icono: 'clipboard',
    caracteristicas: [
      'Planificación integral',
      'Control de costos',
      'Gestión de cronograma',
      'Administración de contratos',
      'Gestión de riesgos',
      'Reportes ejecutivos',
    ],
    proceso: [
      { paso: 1, titulo: 'Inicio', descripcion: 'Definición de alcance y objetivos' },
      { paso: 2, titulo: 'Planificación', descripcion: 'Cronograma, presupuesto y recursos' },
      { paso: 3, titulo: 'Ejecución', descripcion: 'Coordinación y seguimiento diario' },
      { paso: 4, titulo: 'Control', descripcion: 'Monitoreo de KPIs y ajustes' },
      { paso: 5, titulo: 'Cierre', descripcion: 'Entrega formal y lecciones aprendidas' },
    ],
  },
]

export const estadisticas = [
  { valor: '25+', label: 'Años de Experiencia', sufijo: '' },
  { valor: '150+', label: 'Proyectos Entregados', sufijo: '' },
  { valor: '98', label: 'Clientes Satisfechos', sufijo: '%' },
  { valor: '45', label: 'Premios y Reconocimientos', sufijo: '' },
  { valor: '120', label: 'Profesionales en Equipo', sufijo: '+' },
  { valor: '8', label: 'Países con Presencia', sufijo: '' },
]

export const valores = [
  {
    titulo: 'Excelencia',
    descripcion: 'No aceptamos menos que lo mejor en cada detalle, desde el primer boceto hasta el último acabado.',
    icono: 'star',
  },
  {
    titulo: 'Sostenibilidad',
    descripcion: 'Construimos pensando en las próximas siete generaciones, minimizando nuestro impacto ambiental.',
    icono: 'leaf',
  },
  {
    titulo: 'Innovación',
    descripcion: 'Adoptamos tecnologías de vanguardia y metodologías ágiles para entregar resultados superiores.',
    icono: 'lightbulb',
  },
  {
    titulo: 'Integridad',
    descripcion: 'Actuamos con honestidad, transparencia y respeto por nuestros clientes, colaboradores y comunidad.',
    icono: 'shield',
  },
  {
    titulo: 'Herencia',
    descripcion: 'Honramos la tradición constructiva andina integrando técnicas ancestrales con tecnología moderna.',
    icono: 'history',
  },
  {
    titulo: 'Colaboración',
    descripcion: 'Creemos en el poder del trabajo en equipo, involucrando a clientes, artesanos y especialistas.',
    icono: 'users',
  },
]

export const historiaTimeline = [
  {
    anio: '1999',
    titulo: 'Fundación',
    descripcion: 'El Ing. Roberto Casaliz funda la empresa en Cusco con la visión de transformar la construcción en los Andes.',
  },
  {
    anio: '2005',
    titulo: 'Primer Proyecto Emblemático',
    descripcion: 'Entrega del Conjunto Residencial Los Pinos, estableciendo nuevos estándares de calidad en la región.',
  },
  {
    anio: '2010',
    titulo: 'Expansión a Restauración',
    descripcion: 'Incorporamos el departamento de restauración de patrimonio, fusionando tradición y tecnología.',
  },
  {
    anio: '2015',
    titulo: 'Certificación ISO 9001',
    descripcion: 'Obtenemos la certificación de calidad, formalizando nuestros procesos de gestión.',
  },
  {
    anio: '2018',
    titulo: '50 Proyectos Completados',
    descripcion: 'Celebramos la entrega de nuestro proyecto número 50, con una inversión acumulada de S/ 500 millones.',
  },
  {
    anio: '2022',
    titulo: 'Liderazgo Regional',
    descripcion: 'Reconocidos como la empresa constructora líder del sur peruano por Cámara de Comercio de Cusco.',
  },
  {
    anio: '2024',
    titulo: 'Expansión Internacional',
    descripcion: 'Iniciamos operaciones en Bolivia y Ecuador, llevando la excelencia andina a nuevos horizontes.',
  },
]
