import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.resolve(__dirname, 'database.sqlite')

const db = new (sqlite3.verbose().Database)(dbPath)

const SEED_BLOG_POSTS = [
  {
    id: 'guia-playa-el-agua-margarita',
    title: 'Guía Completa de Playa El Agua: El Corazón Tropical de la Isla Margarita',
    summary: 'Si estás planeando una escapada al Caribe venezolano, hay un nombre que evoca inmediatamente palmeras interminables, arena dorada y un oleaje perfecto para renovar las energías: Playa El Agua.',
    content: 'Si estás planeando una escapada al Caribe venezolano, hay un nombre que evoca inmediatamente palmeras interminables, arena dorada y un oleaje perfecto para renovar las energías: Playa El Agua. Ubicada en el extremo norte de la Isla Margarita, esta joya de casi 4 kilómetros de longitud sigue siendo la parada obligatoria y el epicentro turístico por excelencia del estado Nueva Esparta.\n\n🚗 Cómo llegar desde el Aeropuerto\nEl viaje comienza en el Aeropuerto Internacional del Caribe Santiago Mariño (PMV). Cruzar la isla desde el suroeste (donde está el aeropuerto) hasta el noreste (donde se encuentra Playa El Agua) toma aproximadamente entre 45 y 55 minutos en coche, cubriendo una distancia de unos 37 kilómetros. Estas son las mejores opciones para trasladarte:\n\n1. Traslado privado o del hotel (La opción recomendada): 45 min.\nCoordinar previamente con tu hotel o una agencia de confianza te evitará esperas. El conductor te recibe en la salida de la terminal con tu nombre. Es la alternativa más cómoda y segura tras el vuelo.\n\n2. Taxi oficial del aeropuerto: 50 min.\nEn la salida encontrarás las líneas oficiales del aeropuerto (como Taxi Costa Azul). Un viaje directo hasta Playa El Agua tiene un costo estimado de $50 a $65 USD. Asegúrate de acordar la tarifa con el conductor antes de subir.\n\n3. Alquiler de vehículos: 50 min.\nSi prefieres total libertad para explorar otras playas como Parguito o El Yaque, las principales rentadoras operan dentro del aeropuerto. La ruta es sencilla cruzando la Av. Juan Bautista Arismendi y luego conectando con la Av. 31 de Julio.\n\n🌴 Beneficios de elegir Playa El Agua\n¿Por qué quedarse o pasar el día aquí en lugar de otras zonas?\n- El Boulevard Peatonal: Su renovado paseo costero está repleto de cocoteros, ideal para caminar al amanecer o hacer running por la tarde sin tráfico de vehículos.\n- Infraestructura hotelera: Concentra una de las mayores ofertas de hospedaje del país, desde posadas boutique hasta hoteles All Inclusive (todo incluido) de cadenas reconocidas.\n- Servicio a la orilla del mar: La mayoría de los locales ofrecen servicio de toldos y tumbonas directamente en la arena, vinculados a un consumo mínimo, permitiéndote disfrutar sin preocuparte por nada.\n\n🍴 Dónde comer: Oferta Gastronómica\nLa propuesta culinaria en Playa El Agua ha evolucionado muchísimo. El bulevar y el Centro Comercial Altamarea ofrecen desde platos criollos tradicionales hasta gastronomía internacional sofisticada.\n- Pescado fresco del día: No puedes irte sin probar una tradicional rueda de carite, pargo o una buena fosforera (sopa concentrada de mariscos) en los kioscos playeros.\n- Meraki Playa El Agua: Una parada destacada en el final del bulevar. Fusiona la comida italiana con los frutos del mar margariteños. Sus platos estrella incluyen carpaccio de pez espada ahumado y pastas frescas con langosta o vongole.\n- Gastronomía de hotel: Muchos de los resorts de la zona abren sus restaurantes al público general, ofreciendo buffets internacionales y noches temáticas.\n\n🏄 Distracciones y Actividades\nAquí el aburrimiento no existe. Dependiendo de tu estilo de viaje, puedes armar tu día con estas opciones:\n- Deportes Acuáticos: El oleaje de Playa El Agua es oceánico y divertido. Es ideal para bodyboard, surf (en zonas específicas) y, en días de buen viento, windsurf.\n- Relax y Bienestar: A lo largo de la playa encontrarás servicios de masajes al aire libre bajo la sombra de las palmeras y tratamientos relajantes con el sonido del mar de fondo.\n- Vida Nocturna: Aunque es más tranquila que Porlamar, muchos restaurantes del bulevar ofrecen música en vivo, coctelería de autor y cenas frente al mar al caer la noche.\n\n💰 Presupuesto y Costos Estimados\nPara que tus lectores viajen preparados, aquí un promedio de los costos en la zona:\n- Consumo mínimo en toldos: Varía entre $10 y $20 USD por mesa/pareja, los cuales se canjean por comida o bebidas en el restaurante que te presta el servicio.\n- Almuerzo en kiosco playero: Un pescado frito con tostones (plátano verde frito) y ensalada oscila entre $8 y $15 USD por persona.\n- Cena en restaurante formal: Platos principales más elaborados o de cocina internacional van desde los $15 a $30 USD.\n- Bebidas: Cervezas nacionales entre $1 y $2 USD; cócteles tropicales (como piña colada) entre $3 y $6 USD.\n\n💡 Nota sobre pagos: En toda la isla se acepta ampliamente el dólar en efectivo (lleva billetes de baja denominación en buen estado), pago móvil y tarjetas de débito/crédito nacionales.\n\nPlaya El Agua sigue combinando perfectamente la magia natural del Caribe con los servicios necesarios para unas vacaciones inolvidables. ¡Prepara el protector solar y déjate llevar por el ritmo de la isla!',
    date: '2026-05-24',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    author: 'Administrador'
  },
  {
    id: 'egipto-misterios-y-antigravedad',
    title: 'Los Misterios de Egipto y sus Templos Sagrados',
    summary: 'Embárcate en un viaje a través del tiempo y descubre los secretos mejores guardados de las pirámides y templos de Luxor y Karnak.',
    content: 'Egipto es mucho más que un destino turístico; es una experiencia que transforma tu percepción de la historia y el mundo.\n\nDesde el imponente conjunto de las Pirámides de Giza hasta los misteriosos jeroglíficos tallados en las columnas del Templo de Karnak, cada rincón de esta tierra milenaria respira mística y grandeza.\n\n### Recomendaciones para tu viaje:\n1. Visita las pirámides temprano en la mañana para evitar las altas temperaturas.\n2. Dedica al menos un día completo para recorrer el Valle de los Reyes en Luxor.\n3. Disfruta de un crucero nocturno por el Nilo; la vista de los templos iluminados es simplemente incomparable.\n\nEn Horus Travel diseñamos itinerarios a medida para que vivas esta aventura con total comodidad y el máximo nivel de exclusividad.',
    date: '2026-05-24',
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=800&q=80',
    author: 'Administrador'
  },
  {
    id: 'guia-buzios-playas-paradisiacas',
    title: 'Guía Completa de Búzios: Playas, Gastronomía y Aventura',
    summary: 'Conoce las mejores playas de la península de Búzios y planifica tu escape perfecto al caribe brasileño.',
    content: 'Búzios, originalmente una pequeña aldea de pescadores, se convirtió en uno de los destinos más codiciados de Brasil tras la mítica visita de Brigitte Bardot en los años 60.\n\nEsta encantadora península ofrece más de 20 playas únicas, cada una con su propia personalidad. Desde las aguas tranquilas y cristalinas de João Fernandes, ideales para hacer snorkel, hasta el oleaje aventurero de Geribá, perfecto para los amantes del surf.\n\n### Qué no te puedes perder:\n- **Rua das Pedras:** El corazón comercial de Búzios, repleto de boutiques premium, galerías de arte y una gastronomía internacional exquisita.\n- **Orla Bardot:** Ideal para un paseo al atardecer, donde podrás tomarte fotos con la famosa estatua de bronce de Brigitte.\n- **Paseo en Escuna:** Una excursión en barco que te llevará a recorrer las islas y bahías más hermosas de la región.\n\nPrepara las maletas y déjanos asesorarte en Horus para encontrar los mejores alojamientos frente al mar.',
    date: '2026-05-20',
    imageUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80',
    author: 'Administrador'
  }
]

// Default seed data
const SEED_PACKAGES = [
  {
    id: 'p-buzios',
    category: 'paquetes',
    name: 'Paquetes a Búzios',
    location: 'Búzios, Brasil',
    startDate: '2026-06-01',
    endDate: '2026-06-15',
    duration: '9 Días / 8 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80',
    price: '866891',
    bonus: '12',
    targetAudience: 'Familiares',
    status: 'Activo',
    consultations: 45,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-paris',
    category: 'paquetes',
    name: 'París Soñado',
    location: 'París, Francia',
    startDate: '2026-06-10',
    endDate: '2026-06-25',
    duration: '7 Días / 6 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    price: '1850000',
    bonus: '15',
    targetAudience: 'Solo adultos',
    status: 'Activo',
    consultations: 38,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-disney-pack',
    category: 'paquetes',
    name: 'Disney Mágico Familiar',
    location: 'Orlando, EE.UU.',
    startDate: '2026-07-01',
    endDate: '2026-07-20',
    duration: '10 Días / 9 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    price: '2400000',
    bonus: '5',
    targetAudience: 'Familiares',
    status: 'Activo',
    consultations: 52,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-rio',
    category: 'paquetes',
    name: 'Río de Janeiro Express',
    location: 'Río de Janeiro, Brasil',
    startDate: '2026-05-25',
    endDate: '2026-06-05',
    duration: '6 Días / 5 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80',
    price: '650000',
    bonus: '10',
    targetAudience: 'Familiares',
    status: 'Activo',
    consultations: 29,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-madrid-pack',
    category: 'paquetes',
    name: 'Madrid Cultural',
    location: 'Madrid, España',
    startDate: '2026-06-15',
    endDate: '2026-06-30',
    duration: '8 Días / 7 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80',
    price: '1450000',
    bonus: '8',
    targetAudience: 'Solo adultos',
    status: 'Activo',
    consultations: 31,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-vuelo-miami-promo',
    category: 'vuelos',
    name: '🌴 ¡MIAMI TE ESPERA! 🌴',
    location: 'Miami, EE.UU.',
    startDate: '2026-06-01',
    endDate: '2026-12-31',
    duration: 'Ida y Vuelta (Escalas/Directo)',
    imageUrl: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=600&q=80',
    price: '450',
    bonus: '0',
    targetAudience: 'Todo Público',
    status: 'Activo',
    consultations: 64,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-vuelo-miami',
    category: 'vuelos',
    name: 'Vuelo Directo a Miami',
    location: 'Miami, EE.UU.',
    startDate: '2026-06-01',
    endDate: '2026-06-15',
    duration: 'Vuelo Directo (Ida y Vuelta)',
    imageUrl: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=600&q=80',
    price: '980000',
    bonus: '10',
    targetAudience: 'Solo adultos',
    status: 'Activo',
    consultations: 18,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-vuelo-madrid',
    category: 'vuelos',
    name: 'Vuelo Madrid con Escala',
    location: 'Madrid, España',
    startDate: '2026-06-10',
    endDate: '2026-06-25',
    duration: '1 Parada (Ida y Vuelta)',
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=600&q=80',
    price: '1350000',
    bonus: '5',
    targetAudience: 'Solo adultos',
    status: 'Activo',
    consultations: 22,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-dubai-vip',
    category: 'alojamientos',
    name: '✨ DUBÁI EXCLUSIVO VIP – Burj Khalifa & Desierto ✨',
    location: 'Dubái, Emiratos Árabes Unidos',
    startDate: '2026-06-01',
    endDate: '2026-12-31',
    duration: '8 Días / 7 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    price: '1450',
    bonus: '0',
    targetAudience: 'Todo Público',
    status: 'Activo',
    consultations: 57,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-aloj-copa',
    category: 'alojamientos',
    name: 'Copacabana Palace Hotel',
    location: 'Río de Janeiro, Brasil',
    startDate: '2026-05-25',
    endDate: '2026-06-05',
    duration: 'Estadía Completa por Noche',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    price: '280000',
    bonus: '15',
    targetAudience: 'Familiares',
    status: 'Activo',
    consultations: 24,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-aloj-giza',
    category: 'alojamientos',
    name: 'Hilton Pyramids View Resort',
    location: 'El Cairo, Egipto',
    startDate: '2026-06-05',
    endDate: '2026-06-12',
    duration: 'Habitación Premium vista Pirámides',
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80',
    price: '320000',
    bonus: '8',
    targetAudience: 'Solo adultos',
    status: 'Activo',
    consultations: 19,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-act-giza',
    category: 'actividades',
    name: 'Excursión Privada Pirámides & Esfinge',
    location: 'Giza, Egipto',
    startDate: '2026-05-20',
    endDate: '2026-06-20',
    duration: 'Día Completo con Guía Privado',
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=600&q=80',
    price: '85000',
    bonus: '0',
    targetAudience: 'Familiares',
    status: 'Activo',
    consultations: 34,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-act-venecia',
    category: 'actividades',
    name: 'Paseo en Góndola & Cena Veneciana',
    location: 'Venecia, Italia',
    startDate: '2026-06-01',
    endDate: '2026-06-15',
    duration: '4 Horas de Excursión',
    imageUrl: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?auto=format&fit=crop&w=600&q=80',
    price: '140000',
    bonus: '10',
    targetAudience: 'Solo adultos',
    status: 'Activo',
    consultations: 27,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-karol-g',
    category: 'conciertos',
    name: '🎤✨ KAROL G – Viajando por el Mundo TROPITOUR – Bogotá ✨🎤',
    location: 'Bogotá, Colombia',
    startDate: '2026-12-03',
    endDate: '2026-12-06',
    duration: '4 Días / 3 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=600&q=80',
    price: '735',
    bonus: '0',
    targetAudience: '2 Adultos',
    status: 'Activo',
    consultations: 73,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-car-explorer',
    category: 'autos',
    name: 'Alquiler SUV Ford Explorer',
    location: 'Orlando, EE.UU.',
    startDate: '2026-06-01',
    endDate: '2026-06-30',
    duration: 'Por Día - Kilometraje Libre',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    price: '75000',
    bonus: '5',
    targetAudience: 'Familiares',
    status: 'Activo',
    consultations: 12,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-disney-tix',
    category: 'disney',
    name: 'Pase Magia de Disney 4 Parques',
    location: 'Orlando, EE.UU.',
    startDate: '2026-05-15',
    endDate: '2026-10-15',
    duration: '4 Días de Acceso Completo',
    imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=600&q=80',
    price: '650000',
    bonus: '10',
    targetAudience: 'Familiares',
    status: 'Activo',
    consultations: 41,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-univ-tix',
    category: 'universal',
    name: 'Universal Explorer: 3 Parques al precio de 2',
    location: 'Orlando, EE.UU.',
    startDate: '2026-05-15',
    endDate: '2026-10-15',
    duration: 'Pase de 14 Días Consecutivos',
    imageUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=600&q=80',
    price: '580000',
    bonus: '12',
    targetAudience: 'Familiares',
    status: 'Activo',
    consultations: 37,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-circ-egipto',
    category: 'circuitos',
    name: 'Egipto Clásico & Crucero por el Nilo',
    location: 'El Cairo / Nilo, Egipto',
    startDate: '2026-09-10',
    endDate: '2026-09-25',
    duration: '10 Días / 9 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=600&q=80',
    price: '2450000',
    bonus: '15',
    targetAudience: 'Solo adultos',
    status: 'Activo',
    consultations: 29,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-circ-europa',
    category: 'circuitos',
    name: 'Europa Imperial Soñada',
    location: 'Madrid, París, Roma',
    startDate: '2026-06-05',
    endDate: '2026-06-25',
    duration: '15 Días / 14 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    price: '3890000',
    bonus: '10',
    targetAudience: 'Solo adultos',
    status: 'Activo',
    consultations: 48,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-cruc-royal',
    category: 'cruceros',
    name: 'Crucero Caribe: Bahamas & Perfect Day',
    location: 'Miami / Bahamas',
    startDate: '2026-06-15',
    endDate: '2026-06-22',
    duration: '8 Días / 7 Noches Royal Caribbean',
    imageUrl: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=600&q=80',
    price: '1850000',
    bonus: '8',
    targetAudience: 'Familiares',
    status: 'Activo',
    consultations: 31,
    lastModifiedBy: 'Sistema'
  },
  {
    id: 'p-humboldt',
    category: 'paquetes',
    name: 'Hospedaje en el Humboldt + actividades',
    location: 'Caracas, Venezuela',
    startDate: '2024-07-29',
    endDate: '2024-08-18',
    duration: '20 Días / 19 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1598062548091-a6fb6ac082f9?auto=format&fit=crop&w=600&q=80',
    price: '1059',
    bonus: '0',
    targetAudience: 'Todo Público',
    status: 'Activo',
    consultations: 12,
    lastModifiedBy: 'Sistema'
  }
]

const MOCK_CLIENTS = [
  {
    id: 'c-1', name: 'Juan Pérez', email: 'juan.perez@example.com', phone: '+54 11 9999-8888',
    address: 'Av. Cabildo 1500, CABA', passportNumber: 'ARG1234567',
    passportIssueDate: '2018-06-15', passportExpiryDate: '2028-06-15', birthDate: '1985-04-12',
    frequentFlyerAirline: 'Aerolíneas Argentinas', frequentFlyerNumber: 'AR-992100',
    dietaryRestrictions: 'Sin restricciones', preferredBed: 'Matrimonial',
    approvalStatus: 'approved', paymentStatus: 'paid', debtAmount: 0,
    manualTrips: [{ id: 'mt-1', destination: 'Madrid, España', date: '2025-10-10', price: '1200 USD', status: 'Realizado' }]
  },
  {
    id: 'c-2', name: 'María Gomez', email: 'maria.gomez@example.com', phone: '+54 11 5555-1234',
    address: 'Calle Florida 200, CABA', passportNumber: 'ARG7654321',
    passportIssueDate: '2016-08-10', passportExpiryDate: '2026-08-10', birthDate: '1990-11-20',
    frequentFlyerAirline: 'LATAM', frequentFlyerNumber: 'LA-778811',
    dietaryRestrictions: 'Vegetariana', preferredBed: 'King',
    approvalStatus: 'pending', paymentStatus: 'paid', debtAmount: 0, manualTrips: []
  },
  {
    id: 'c-3', name: 'Carlos Bilardo', email: 'carlos.bilardo@doctor.com', phone: '+54 11 4444-3333',
    address: 'Estudiantes de La Plata, Bs As', passportNumber: 'ARG5555555',
    passportIssueDate: '2015-02-10', passportExpiryDate: '2025-02-10', birthDate: '1938-03-16',
    frequentFlyerAirline: 'Iberia', frequentFlyerNumber: 'IB-121212',
    dietaryRestrictions: 'Sin TACC (Celíaco)', preferredBed: 'Twin',
    approvalStatus: 'approved', paymentStatus: 'debt', debtAmount: 450,
    manualTrips: [{ id: 'mt-2', destination: 'México DF', date: '1986-06-29', price: '500 USD', status: 'Realizado' }]
  },
  {
    id: 'c-4', name: 'Diego Maradona', email: 'diego@10.com', phone: '+54 11 1010-1010',
    address: 'Villa Fiorito, Buenos Aires', passportNumber: 'ARG10101010',
    passportIssueDate: '2020-10-30', passportExpiryDate: '2030-10-30', birthDate: '1960-10-30',
    frequentFlyerAirline: 'Napoli Airways', frequentFlyerNumber: 'NAP-1010',
    dietaryRestrictions: 'Sin restricciones', preferredBed: 'King',
    approvalStatus: 'pending', paymentStatus: 'debt', debtAmount: 1500, manualTrips: []
  }
]

const MOCK_QUERIES = [
  {
    id: 'q-1',
    clientName: 'Juan Pérez',
    contact: 'juan.perez@example.com',
    message: 'Hola, quería consultar sobre el paquete a Madrid. ¿Tienen disponibilidad para la segunda semana de junio?',
    date: '19/05/2026, 10:15',
    status: 'Pendiente',
    category: 'paquetes'
  },
  {
    id: 'q-2',
    clientName: 'María Gomez',
    contact: '+54 11 5555-1234',
    message: 'Buenas tardes. ¿El seguro de viaje Assist Card cubre emergencias de deportes extremos?',
    date: '18/05/2026, 16:45',
    status: 'Contestada',
    category: 'assist_card'
  }
]

db.serialize(async () => {
  console.log('Initializing tables...')
  
  // 1. Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `)

  // 2. Clients table
  db.run(`
    CREATE TABLE IF NOT EXISTS clients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT,
      address TEXT,
      passportNumber TEXT,
      passportIssueDate TEXT,
      passportExpiryDate TEXT,
      birthDate TEXT,
      frequentFlyerAirline TEXT,
      frequentFlyerNumber TEXT,
      dietaryRestrictions TEXT,
      preferredBed TEXT,
      approvalStatus TEXT,
      paymentStatus TEXT,
      debtAmount REAL,
      manualTrips TEXT
    )
  `)

  // 3. Packages table
  db.run(`
    CREATE TABLE IF NOT EXISTS packages (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      duration TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      price TEXT NOT NULL,
      bonus TEXT NOT NULL,
      targetAudience TEXT NOT NULL,
      status TEXT NOT NULL,
      consultations INTEGER DEFAULT 0,
      lastModifiedBy TEXT
    )
  `)

  // 4. Queries table
  db.run(`
    CREATE TABLE IF NOT EXISTS queries (
      id TEXT PRIMARY KEY,
      clientName TEXT NOT NULL,
      contact TEXT NOT NULL,
      message TEXT NOT NULL,
      date TEXT NOT NULL,
      status TEXT NOT NULL,
      category TEXT
    )
  `)

  // 5. Bookings table
  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      meta TEXT,
      price TEXT NOT NULL,
      category TEXT,
      verifiedAt TEXT,
      paymentStatus TEXT NOT NULL,
      tripStatus TEXT NOT NULL
    )
  `)

  // 6. Content table
  db.run(`
    CREATE TABLE IF NOT EXISTS content (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `)

  // 7. Blog Posts table
  db.run(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      summary TEXT,
      date TEXT NOT NULL,
      imageUrl TEXT,
      author TEXT
    )
  `)

  console.log('Tables created. Seeding initial data...')

  // Seed default admin with bcrypt password hashing
  const salt = bcrypt.genSaltSync(10)
  const hashedAdminPassword = bcrypt.hashSync('Supersamir', salt)
  const hashedSellerPassword = bcrypt.hashSync('Vendedor123', salt)

  db.run(
    `INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`,
    ['samir', hashedAdminPassword, 'admin'],
    (err) => {
      if (err) console.error('Error seeding admin user:', err)
      else console.log('Admin user seeded successfully.')
    }
  )

  db.run(
    `INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`,
    ['vendedor1', hashedSellerPassword, 'vendedor'],
    (err) => {
      if (err) console.error('Error seeding seller user:', err)
      else console.log('Seller user seeded successfully.')
    }
  )

  // Seed packages
  const packageStmt = db.prepare(`
    INSERT OR IGNORE INTO packages (
      id, category, name, location, startDate, endDate, duration, imageUrl, price, bonus, targetAudience, status, consultations, lastModifiedBy
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  for (const pkg of SEED_PACKAGES) {
    packageStmt.run(
      pkg.id, pkg.category, pkg.name, pkg.location, pkg.startDate, pkg.endDate, pkg.duration,
      pkg.imageUrl, pkg.price, pkg.bonus, pkg.targetAudience, pkg.status, pkg.consultations, pkg.lastModifiedBy
    )
  }
  packageStmt.finalize()
  console.log('Seeded packages.')

  // Seed clients
  const clientStmt = db.prepare(`
    INSERT OR IGNORE INTO clients (
      id, name, email, phone, address, passportNumber, passportIssueDate, passportExpiryDate, birthDate,
      frequentFlyerAirline, frequentFlyerNumber, dietaryRestrictions, preferredBed, approvalStatus, paymentStatus, debtAmount, manualTrips
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  for (const c of MOCK_CLIENTS) {
    clientStmt.run(
      c.id, c.name, c.email, c.phone, c.address, c.passportNumber, c.passportIssueDate, c.passportExpiryDate, c.birthDate,
      c.frequentFlyerAirline, c.frequentFlyerNumber, c.dietaryRestrictions, c.preferredBed, c.approvalStatus, c.paymentStatus,
      c.debtAmount, JSON.stringify(c.manualTrips)
    )
  }
  clientStmt.finalize()
  console.log('Seeded clients.')

  // Seed queries
  const queryStmt = db.prepare(`
    INSERT OR IGNORE INTO queries (id, clientName, contact, message, date, status, category)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
  for (const q of MOCK_QUERIES) {
    queryStmt.run(q.id, q.clientName, q.contact, q.message, q.date, q.status, q.category)
  }
  queryStmt.finalize()
  console.log('Seeded queries.')

  // Seed initial content config
  db.run(
    `INSERT OR IGNORE INTO content (key, value) VALUES (?, ?)`,
    ['site_images', JSON.stringify({ heroImage: '', aboutImage: '' })],
    (err) => {
      if (err) console.error('Error seeding site images:', err)
      else console.log('Content config seeded successfully.')
    }
  )

  // Seed some initial bookings for display purposes
  const bookingStmt = db.prepare(`
    INSERT OR IGNORE INTO bookings (id, title, description, meta, price, category, verifiedAt, paymentStatus, tripStatus)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  bookingStmt.run(
    'b-seed-1',
    'París Soñado',
    'París Soñado | Pasajeros: 2',
    'Duración: 7 Días / 6 Noches | Promoción hasta: 2026-06-25 | Público: Solo adultos',
    '$ 3.145.000',
    'paquetes',
    '19/05/2026, 12:30',
    'paid',
    'pending'
  )
  bookingStmt.run(
    'b-seed-2',
    'Vuelo Directo a Miami',
    'Vuelo Directo a Miami | Pasajeros: 1',
    'Vuelo Directo (Ida y Vuelta) | Promoción hasta: 2026-06-15 | Público: Solo adultos',
    '$ 980.000',
    'vuelos',
    '18/05/2026, 15:45',
    'installments',
    'active'
  )
  bookingStmt.finalize()
  console.log('Seeded bookings.')

  // Seed blog posts
  const blogStmt = db.prepare(`
    INSERT OR IGNORE INTO blog_posts (id, title, content, summary, date, imageUrl, author)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
  for (const post of SEED_BLOG_POSTS) {
    blogStmt.run(post.id, post.title, post.content, post.summary, post.date, post.imageUrl, post.author)
  }
  blogStmt.finalize()
  console.log('Seeded blog posts.')

  console.log('Database seeding completed successfully.')
  db.close()
})
