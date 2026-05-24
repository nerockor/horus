import sqlite3 from 'sqlite3'
import path from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcryptjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dbPath = path.resolve(__dirname, 'database.sqlite')

const db = new (sqlite3.verbose().Database)(dbPath)

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

  console.log('Database seeding completed successfully.')
  db.close()
})
