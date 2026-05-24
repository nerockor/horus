import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from './db.js'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const JWT_SECRET = process.env.JWT_SECRET || 'horus-jwt-super-secret-key-12345!'

// Middlewares
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
  : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174']

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true)
    } else {
      callback(new Error('No permitido por política de CORS (Origen denegado)'))
    }
  },
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// Helper function to handle async route errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}

// ----------------------------------------------------
// 1. Auth Endpoints
// ----------------------------------------------------
app.post('/api/auth/login', asyncHandler(async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuario y contraseña son requeridos' })
  }

  // Prepared statement gets user safely
  const user = await db.get('SELECT * FROM users WHERE username = ?', [username])
  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' })
  }

  const isMatch = bcrypt.compareSync(password, user.password)
  if (!isMatch) {
    return res.status(401).json({ error: 'Credenciales inválidas' })
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  )

  // Set httpOnly cookie for security (shields against XSS stealing tokens)
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  })

  res.json({
    id: user.id,
    username: user.username,
    role: user.role
  })
}))

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Sesión cerrada exitosamente' })
})

// Middleware to check authentication (jwt verification)
const verifyToken = (req, res, next) => {
  const token = req.cookies.token
  if (!token) {
    return res.status(401).json({ error: 'No autorizado. Inicie sesión.' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.clearCookie('token')
    return res.status(401).json({ error: 'Sesión inválida o expirada.' })
  }
}

// ----------------------------------------------------
// 2. Users Management (CRUD)
// ----------------------------------------------------
app.get('/api/users', verifyToken, asyncHandler(async (req, res) => {
  const users = await db.all('SELECT id, username, role FROM users')
  res.json(users)
}))

app.post('/api/users', verifyToken, asyncHandler(async (req, res) => {
  const { username, password, role } = req.body
  if (!username || !password || !role) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' })
  }

  // Only Admin can create users
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'No tienes permisos para crear usuarios' })
  }

  // Check if username already exists
  const existingUser = await db.get('SELECT id FROM users WHERE username = ?', [username])
  if (existingUser) {
    return res.status(400).json({ error: 'El nombre de usuario ya existe' })
  }

  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  const result = await db.run(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, hashedPassword, role]
  )

  res.status(201).json({ id: result.id, username, role })
}))

app.delete('/api/users/:id', verifyToken, asyncHandler(async (req, res) => {
  const { id } = req.params

  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'No tienes permisos para eliminar usuarios' })
  }

  // Check if user exists
  const user = await db.get('SELECT username FROM users WHERE id = ?', [id])
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' })
  }

  if (user.username === 'samir') {
    return res.status(400).json({ error: 'No se puede eliminar el usuario administrador predeterminado' })
  }

  await db.run('DELETE FROM users WHERE id = ?', [id])
  res.json({ message: 'Usuario eliminado exitosamente' })
}))

// ----------------------------------------------------
// 3. Clients Endpoints (CRUD)
// ----------------------------------------------------
app.get('/api/clients', verifyToken, asyncHandler(async (req, res) => {
  const clients = await db.all('SELECT * FROM clients')
  
  // Parse manualTrips JSON string back to arrays
  const parsedClients = clients.map(c => ({
    ...c,
    manualTrips: c.manualTrips ? JSON.parse(c.manualTrips) : []
  }))
  res.json(parsedClients)
}))

app.post('/api/clients', verifyToken, asyncHandler(async (req, res) => {
  const {
    id, name, email, phone, address, passportNumber, passportIssueDate, passportExpiryDate,
    birthDate, frequentFlyerAirline, frequentFlyerNumber, dietaryRestrictions, preferredBed,
    approvalStatus, paymentStatus, debtAmount, manualTrips
  } = req.body

  if (!name) {
    return res.status(400).json({ error: 'El nombre del pasajero es obligatorio' })
  }

  const clientId = id || `c-${Date.now()}`
  const tripsJson = JSON.stringify(manualTrips || [])

  await db.run(`
    INSERT INTO clients (
      id, name, email, phone, address, passportNumber, passportIssueDate, passportExpiryDate,
      birthDate, frequentFlyerAirline, frequentFlyerNumber, dietaryRestrictions, preferredBed,
      approvalStatus, paymentStatus, debtAmount, manualTrips
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    clientId, name, email, phone, address, passportNumber, passportIssueDate, passportExpiryDate,
    birthDate, frequentFlyerAirline, frequentFlyerNumber, dietaryRestrictions, preferredBed,
    approvalStatus || 'approved', paymentStatus || 'paid', parseFloat(debtAmount || 0), tripsJson
  ])

  res.status(201).json({
    id: clientId, name, email, phone, address, passportNumber, passportIssueDate, passportExpiryDate,
    birthDate, frequentFlyerAirline, frequentFlyerNumber, dietaryRestrictions, preferredBed,
    approvalStatus, paymentStatus, debtAmount, manualTrips: manualTrips || []
  })
}))

app.put('/api/clients/:id', verifyToken, asyncHandler(async (req, res) => {
  const { id } = req.params
  const {
    name, email, phone, address, passportNumber, passportIssueDate, passportExpiryDate,
    birthDate, frequentFlyerAirline, frequentFlyerNumber, dietaryRestrictions, preferredBed,
    approvalStatus, paymentStatus, debtAmount, manualTrips
  } = req.body

  if (!name) {
    return res.status(400).json({ error: 'El nombre del pasajero es obligatorio' })
  }

  // Check if client exists
  const clientExists = await db.get('SELECT id FROM clients WHERE id = ?', [id])
  if (!clientExists) {
    return res.status(404).json({ error: 'Pasajero no encontrado' })
  }

  const tripsJson = JSON.stringify(manualTrips || [])

  await db.run(`
    UPDATE clients SET
      name = ?, email = ?, phone = ?, address = ?, passportNumber = ?, passportIssueDate = ?,
      passportExpiryDate = ?, birthDate = ?, frequentFlyerAirline = ?, frequentFlyerNumber = ?,
      dietaryRestrictions = ?, preferredBed = ?, approvalStatus = ?, paymentStatus = ?,
      debtAmount = ?, manualTrips = ?
    WHERE id = ?
  `, [
    name, email, phone, address, passportNumber, passportIssueDate, passportExpiryDate,
    birthDate, frequentFlyerAirline, frequentFlyerNumber, dietaryRestrictions, preferredBed,
    approvalStatus, paymentStatus, parseFloat(debtAmount || 0), tripsJson, id
  ])

  res.json({
    id, name, email, phone, address, passportNumber, passportIssueDate, passportExpiryDate,
    birthDate, frequentFlyerAirline, frequentFlyerNumber, dietaryRestrictions, preferredBed,
    approvalStatus, paymentStatus, debtAmount, manualTrips: manualTrips || []
  })
}))

app.delete('/api/clients/:id', verifyToken, asyncHandler(async (req, res) => {
  const { id } = req.params

  const clientExists = await db.get('SELECT id FROM clients WHERE id = ?', [id])
  if (!clientExists) {
    return res.status(404).json({ error: 'Pasajero no encontrado' })
  }

  await db.run('DELETE FROM clients WHERE id = ?', [id])
  res.json({ message: 'Pasajero eliminado exitosamente' })
}))

// ----------------------------------------------------
// 4. Packages Endpoints (CRUD)
// ----------------------------------------------------
app.get('/api/packages', asyncHandler(async (req, res) => {
  const packages = await db.all('SELECT * FROM packages')
  res.json(packages)
}))

app.post('/api/packages', verifyToken, asyncHandler(async (req, res) => {
  const {
    id, category, name, location, startDate, endDate, duration, imageUrl, price, bonus, targetAudience, status
  } = req.body

  if (!name || !location || !startDate || !endDate || !price || !duration || !imageUrl) {
    return res.status(400).json({ error: 'Todos los campos requeridos deben estar completos' })
  }

  const packageId = id || `p-${Date.now()}`
  const author = req.user.username || 'Sistema'

  await db.run(`
    INSERT INTO packages (
      id, category, name, location, startDate, endDate, duration, imageUrl, price, bonus, targetAudience, status, consultations, lastModifiedBy
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?)
  `, [
    packageId, category, name, location, startDate, endDate, duration, imageUrl, price, bonus || '0', targetAudience || 'Solo adultos', status || 'Activo', author
  ])

  res.status(201).json({
    id: packageId, category, name, location, startDate, endDate, duration, imageUrl, price, bonus, targetAudience, status, consultations: 0, lastModifiedBy: author
  })
}))

app.put('/api/packages/:id', verifyToken, asyncHandler(async (req, res) => {
  const { id } = req.params
  const {
    category, name, location, startDate, endDate, duration, imageUrl, price, bonus, targetAudience, status
  } = req.body

  if (!name || !location || !startDate || !endDate || !price || !duration || !imageUrl) {
    return res.status(400).json({ error: 'Todos los campos requeridos deben estar completos' })
  }

  const packageExists = await db.get('SELECT id FROM packages WHERE id = ?', [id])
  if (!packageExists) {
    return res.status(404).json({ error: 'Servicio/paquete no encontrado' })
  }

  const author = req.user.username || 'Sistema'

  await db.run(`
    UPDATE packages SET
      category = ?, name = ?, location = ?, startDate = ?, endDate = ?, duration = ?, imageUrl = ?,
      price = ?, bonus = ?, targetAudience = ?, status = ?, lastModifiedBy = ?
    WHERE id = ?
  `, [
    category, name, location, startDate, endDate, duration, imageUrl, price, bonus || '0', targetAudience || 'Solo adultos', status || 'Activo', author, id
  ])

  res.json({
    id, category, name, location, startDate, endDate, duration, imageUrl, price, bonus, targetAudience, status, lastModifiedBy: author
  })
}))

// Increment consultations (Public route - doesn't require admin authentication)
app.post('/api/packages/:id/consult', asyncHandler(async (req, res) => {
  const { id } = req.params
  const packageExists = await db.get('SELECT id FROM packages WHERE id = ?', [id])
  if (!packageExists) {
    return res.status(404).json({ error: 'Servicio/paquete no encontrado' })
  }

  await db.run('UPDATE packages SET consultations = consultations + 1 WHERE id = ?', [id])
  res.json({ message: 'Consulta registrada correctamente' })
}))

app.delete('/api/packages/:id', verifyToken, asyncHandler(async (req, res) => {
  const { id } = req.params
  const packageExists = await db.get('SELECT id FROM packages WHERE id = ?', [id])
  if (!packageExists) {
    return res.status(404).json({ error: 'Servicio/paquete no encontrado' })
  }

  await db.run('DELETE FROM packages WHERE id = ?', [id])
  res.json({ message: 'Servicio/paquete eliminado exitosamente' })
}))

// ----------------------------------------------------
// 5. Queries Endpoints (CRUD)
// ----------------------------------------------------
app.get('/api/queries', verifyToken, asyncHandler(async (req, res) => {
  const queries = await db.all('SELECT * FROM queries')
  res.json(queries)
}))

// Public submission of queries (No token required)
app.post('/api/queries', asyncHandler(async (req, res) => {
  const { id, clientName, contact, message, date, status, category } = req.body
  if (!clientName || !contact || !message) {
    return res.status(400).json({ error: 'Nombre, contacto y mensaje son requeridos' })
  }

  const queryId = id || `q-${Date.now()}`
  const queryDate = date || new Date().toLocaleString('es-ES')
  const queryStatus = status || 'Pendiente'

  await db.run(`
    INSERT INTO queries (id, clientName, contact, message, date, status, category)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `, [queryId, clientName, contact, message, queryDate, queryStatus, category || 'General'])

  res.status(201).json({ id: queryId, clientName, contact, message, date: queryDate, status: queryStatus, category })
}))

app.put('/api/queries/:id', verifyToken, asyncHandler(async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  if (!status) {
    return res.status(400).json({ error: 'Estado es requerido' })
  }

  const queryExists = await db.get('SELECT id FROM queries WHERE id = ?', [id])
  if (!queryExists) {
    return res.status(404).json({ error: 'Consulta no encontrada' })
  }

  await db.run('UPDATE queries SET status = ? WHERE id = ?', [status, id])
  res.json({ id, status })
}))

app.delete('/api/queries/:id', verifyToken, asyncHandler(async (req, res) => {
  const { id } = req.params
  const queryExists = await db.get('SELECT id FROM queries WHERE id = ?', [id])
  if (!queryExists) {
    return res.status(404).json({ error: 'Consulta no encontrada' })
  }

  await db.run('DELETE FROM queries WHERE id = ?', [id])
  res.json({ message: 'Consulta eliminada exitosamente' })
}))

// ----------------------------------------------------
// 6. Bookings Endpoints (CRUD)
// ----------------------------------------------------
app.get('/api/bookings', verifyToken, asyncHandler(async (req, res) => {
  const bookings = await db.all('SELECT * FROM bookings')
  res.json(bookings)
}))

// Creating booking (Public/Sellers can do it)
app.post('/api/bookings', asyncHandler(async (req, res) => {
  const { id, title, description, meta, price, category, verifiedAt, paymentStatus, tripStatus } = req.body

  if (!title || !description || !price) {
    return res.status(400).json({ error: 'Título, descripción y precio son requeridos' })
  }

  const bookingId = id || `b-${Date.now()}`
  const dateVal = verifiedAt || new Date().toLocaleString('es-ES')
  const payStatus = paymentStatus || 'unpaid'
  const travelStatus = tripStatus || 'pending'

  await db.run(`
    INSERT INTO bookings (id, title, description, meta, price, category, verifiedAt, paymentStatus, tripStatus)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [bookingId, title, description, meta, price, category, dateVal, payStatus, travelStatus])

  res.status(201).json({ id: bookingId, title, description, meta, price, category, verifiedAt: dateVal, paymentStatus: payStatus, tripStatus: travelStatus })
}))

app.put('/api/bookings/:id', verifyToken, asyncHandler(async (req, res) => {
  const { id } = req.params
  const { paymentStatus, tripStatus } = req.body

  const bookingExists = await db.get('SELECT id FROM bookings WHERE id = ?', [id])
  if (!bookingExists) {
    return res.status(404).json({ error: 'Reserva no encontrada' })
  }

  if (paymentStatus && tripStatus) {
    await db.run('UPDATE bookings SET paymentStatus = ?, tripStatus = ? WHERE id = ?', [paymentStatus, tripStatus, id])
  } else if (paymentStatus) {
    await db.run('UPDATE bookings SET paymentStatus = ? WHERE id = ?', [paymentStatus, id])
  } else if (tripStatus) {
    await db.run('UPDATE bookings SET tripStatus = ? WHERE id = ?', [tripStatus, id])
  }

  res.json({ id, paymentStatus, tripStatus })
}))

app.delete('/api/bookings/:id', verifyToken, asyncHandler(async (req, res) => {
  const { id } = req.params
  const bookingExists = await db.get('SELECT id FROM bookings WHERE id = ?', [id])
  if (!bookingExists) {
    return res.status(404).json({ error: 'Reserva no encontrada' })
  }

  await db.run('DELETE FROM bookings WHERE id = ?', [id])
  res.json({ message: 'Reserva eliminada exitosamente' })
}))

// ----------------------------------------------------
// 7. Site Content Endpoints
// ----------------------------------------------------
app.get('/api/content', asyncHandler(async (req, res) => {
  const content = await db.get("SELECT value FROM content WHERE key = 'site_images'")
  if (content) {
    res.json(JSON.parse(content.value))
  } else {
    res.json({ heroImage: '', aboutImage: '' })
  }
}))

app.post('/api/content', verifyToken, asyncHandler(async (req, res) => {
  const { heroImage, aboutImage } = req.body
  const valueJson = JSON.stringify({ heroImage: heroImage || '', aboutImage: aboutImage || '' })

  await db.run(
    "INSERT OR REPLACE INTO content (key, value) VALUES ('site_images', ?)",
    [valueJson]
  )

  res.json({ heroImage, aboutImage })
}))

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve frontend static files from the compiled 'dist' folder
const distPath = path.resolve(__dirname, '../dist')
app.use(express.static(distPath))

// Route all other requests (except /api) to index.html for React Router SPA
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next()
  }
  // If the request is for a static asset file that was not found, return 404 instead of index.html
  if (path.extname(req.path)) {
    return res.status(404).send('Not Found')
  }
  res.sendFile(path.join(distPath, 'index.html'))
})

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err)
  res.status(500).json({ error: 'Ocurrió un error interno en el servidor.' })
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Checking build directory at: ${distPath}`)
  if (fs.existsSync(distPath)) {
    console.log(`dist directory exists. Contents:`, fs.readdirSync(distPath))
    const indexPath = path.join(distPath, 'index.html')
    console.log(`index.html exists:`, fs.existsSync(indexPath))
  } else {
    console.error(`ERROR: dist directory DOES NOT exist at: ${distPath}`)
  }
})
