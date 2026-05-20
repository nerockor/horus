import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { 
  Contact, Plus, Search, Edit2, Trash2, Eye, EyeOff, User, 
  Mail, Phone, MapPin, Calendar, CreditCard, ShieldAlert, 
  CheckCircle, AlertTriangle, AlertCircle, HelpCircle, Utensils, Bed, PlaneTakeoff, Award, Briefcase, PlusCircle
} from 'lucide-react'

export default function ClientsView() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState(null)
  
  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('')
  const [passportFilter, setPassportFilter] = useState('todos') // todos, vigentes, alerta, vencidos

  // Form State
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [passportNumber, setPassportNumber] = useState('')
  const [passportIssueDate, setPassportIssueDate] = useState('')
  const [passportExpiryDate, setPassportExpiryDate] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [frequentFlyerAirline, setFrequentFlyerAirline] = useState('')
  const [frequentFlyerNumber, setFrequentFlyerNumber] = useState('')
  const [dietaryRestrictions, setDietaryRestrictions] = useState('Sin restricciones')
  const [preferredBed, setPreferredBed] = useState('Matrimonial')

  // Manual Trip Form State (inside detail view)
  const [newTripDest, setNewTripDest] = useState('')
  const [newTripDate, setNewTripDate] = useState('')
  const [newTripPrice, setNewTripPrice] = useState('')
  const [newTripStatus, setNewTripStatus] = useState('Realizado')

  // Load clients & handle prefill from search params
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('horus_clients') || '[]')
    
    // Seed mock clients if empty
    if (data.length === 0) {
      const mockClients = [
        {
          id: 'c-1',
          name: 'Juan Pérez',
          email: 'juan.perez@example.com',
          phone: '+54 11 9999-8888',
          address: 'Av. Cabildo 1500, CABA',
          passportNumber: 'ARG1234567',
          passportIssueDate: '2018-06-15',
          passportExpiryDate: '2028-06-15',
          birthDate: '1985-04-12',
          frequentFlyerAirline: 'Aerolíneas Argentinas',
          frequentFlyerNumber: 'AR-992100',
          dietaryRestrictions: 'Sin restricciones',
          preferredBed: 'Matrimonial',
          manualTrips: [
            { id: 'mt-1', destination: 'Madrid, España', date: '2025-10-10', price: '1200 USD', status: 'Realizado' }
          ]
        },
        {
          id: 'c-2',
          name: 'María Gomez',
          email: 'maria.gomez@example.com',
          phone: '+54 11 5555-1234',
          address: 'Calle Florida 200, CABA',
          passportNumber: 'ARG7654321',
          passportIssueDate: '2016-08-10',
          passportExpiryDate: '2026-08-10', // Expires within 6 months (based on May 2026)
          birthDate: '1990-11-20',
          frequentFlyerAirline: 'LATAM',
          frequentFlyerNumber: 'LA-778811',
          dietaryRestrictions: 'Vegetariana',
          preferredBed: 'King',
          manualTrips: []
        },
        {
          id: 'c-3',
          name: 'Carlos Bilardo',
          email: 'carlos.bilardo@doctor.com',
          phone: '+54 11 4444-3333',
          address: 'Estudiantes de La Plata, Bs As',
          passportNumber: 'ARG5555555',
          passportIssueDate: '2015-02-10',
          passportExpiryDate: '2025-02-10', // Expired
          birthDate: '1938-03-16',
          frequentFlyerAirline: 'Iberia',
          frequentFlyerNumber: 'IB-121212',
          dietaryRestrictions: 'Sin TACC (Celíaco)',
          preferredBed: 'Twin',
          manualTrips: [
            { id: 'mt-2', destination: 'México DF', date: '1986-06-29', price: '500 USD', status: 'Realizado' }
          ]
        }
      ]
      localStorage.setItem('horus_clients', JSON.stringify(mockClients))
      setClients(mockClients)
    } else {
      setClients(data)
    }

    // Prefill check from search params (e.g. from QueriesView quick action)
    const queryName = searchParams.get('prefill_name')
    const queryContact = searchParams.get('prefill_contact')
    if (queryName || queryContact) {
      setName(queryName || '')
      // Check if contact looks like email or phone
      if (queryContact) {
        if (queryContact.includes('@')) {
          setEmail(queryContact)
        } else {
          setPhone(queryContact)
        }
      }
      
      // Clear search parameters so they don't persist on page refreshes
      setSearchParams({})
    }
  }, [searchParams, setSearchParams])

  // Save clients to localStorage
  const saveClientsList = (updatedClients) => {
    setClients(updatedClients)
    localStorage.setItem('horus_clients', JSON.stringify(updatedClients))
    // Keep detail view updated if the client was edited
    if (selectedClient) {
      const currentSelected = updatedClients.find(c => c.id === selectedClient.id)
      setSelectedClient(currentSelected || null)
    }
  }

  // Calculate Passport Expiration Status
  const getPassportStatus = (expiryDateStr) => {
    if (!expiryDateStr) return { label: 'Sin registrar', color: '#64748b', bg: '#f1f5f9', icon: HelpCircle, code: 'empty' }
    
    const expiry = new Date(expiryDateStr)
    const today = new Date('2026-05-19') // Current local time system date
    
    // Calculate difference in months
    const diffTime = expiry - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    if (diffDays < 0) {
      return { 
        label: 'VENCIDO ❌', 
        color: '#ef4444', 
        bg: '#fee2fee', 
        icon: AlertCircle, 
        code: 'expired',
        desc: `Venció hace ${Math.abs(diffDays)} días` 
      }
    } else if (diffDays <= 180) { // 6 months
      return { 
        label: 'ALERTA: Vence pronto ⚠️', 
        color: '#f97316', 
        bg: '#ffedd5', 
        icon: AlertTriangle, 
        code: 'warning',
        desc: `Vence en ${diffDays} días (${Math.round(diffDays / 30)} meses)` 
      }
    } else {
      return { 
        label: 'VIGENTE ✅', 
        color: '#22c55e', 
        bg: '#dcfce7', 
        icon: CheckCircle, 
        code: 'valid',
        desc: `Válido por ${Math.round(diffDays / 365)} años más` 
      }
    }
  }

  // Calculate age based on birthDate
  const getAge = (birthDateStr) => {
    if (!birthDateStr) return 'No registrada'
    const birth = new Date(birthDateStr)
    const today = new Date('2026-05-19')
    let age = today.getFullYear() - birth.getFullYear()
    const m = today.getMonth() - birth.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return `${age} años (${birth.toLocaleDateString('es-ES')})`
  }

  // Handle Client Form Submit (Create/Update)
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) return

    if (isEditing) {
      const updated = clients.map(c => {
        if (c.id === editId) {
          return {
            ...c,
            name, email, phone, address,
            passportNumber, passportIssueDate, passportExpiryDate, birthDate,
            frequentFlyerAirline, frequentFlyerNumber, dietaryRestrictions, preferredBed
          }
        }
        return c
      })
      saveClientsList(updated)
      setIsEditing(false)
      setEditId(null)
    } else {
      const newClient = {
        id: `c-${Date.now()}`,
        name, email, phone, address,
        passportNumber, passportIssueDate, passportExpiryDate, birthDate,
        frequentFlyerAirline, frequentFlyerNumber, dietaryRestrictions, preferredBed,
        manualTrips: []
      }
      saveClientsList([newClient, ...clients])
    }

    // Reset Form Fields
    setName('')
    setEmail('')
    setPhone('')
    setAddress('')
    setPassportNumber('')
    setPassportIssueDate('')
    setPassportExpiryDate('')
    setBirthDate('')
    setFrequentFlyerAirline('')
    setFrequentFlyerNumber('')
    setDietaryRestrictions('Sin restricciones')
    setPreferredBed('Matrimonial')
  }

  // Start edit flow
  const handleEdit = (client) => {
    setIsEditing(true)
    setEditId(client.id)
    setName(client.name || '')
    setEmail(client.email || '')
    setPhone(client.phone || '')
    setAddress(client.address || '')
    setPassportNumber(client.passportNumber || '')
    setPassportIssueDate(client.passportIssueDate || '')
    setPassportExpiryDate(client.passportExpiryDate || '')
    setBirthDate(client.birthDate || '')
    setFrequentFlyerAirline(client.frequentFlyerAirline || '')
    setFrequentFlyerNumber(client.frequentFlyerNumber || '')
    setDietaryRestrictions(client.dietaryRestrictions || 'Sin restricciones')
    setPreferredBed(client.preferredBed || 'Matrimonial')
    
    // Scroll to top/form in small screens
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Cancel edit mode
  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditId(null)
    setName('')
    setEmail('')
    setPhone('')
    setAddress('')
    setPassportNumber('')
    setPassportIssueDate('')
    setPassportExpiryDate('')
    setBirthDate('')
    setFrequentFlyerAirline('')
    setFrequentFlyerNumber('')
    setDietaryRestrictions('Sin restricciones')
    setPreferredBed('Matrimonial')
  }

  // Delete client profile
  const handleDelete = (id) => {
    if (confirm('¿Seguro que deseas eliminar la ficha de este pasajero? Todo su historial se borrará.')) {
      const updated = clients.filter(c => c.id !== id)
      saveClientsList(updated)
      if (selectedClient && selectedClient.id === id) {
        setSelectedClient(null)
      }
    }
  }

  // Add Manual Trip to Passenger History
  const handleAddManualTrip = (e) => {
    e.preventDefault()
    if (!newTripDest || !newTripDate || !newTripPrice) return

    const trip = {
      id: `mt-${Date.now()}`,
      destination: newTripDest,
      date: newTripDate,
      price: newTripPrice,
      status: newTripStatus
    }

    const updated = clients.map(c => {
      if (c.id === selectedClient.id) {
        return {
          ...c,
          manualTrips: [trip, ...(c.manualTrips || [])]
        }
      }
      return c
    })

    saveClientsList(updated)
    setNewTripDest('')
    setNewTripDate('')
    setNewTripPrice('')
    setNewTripStatus('Realizado')
  }

  // Remove Manual Trip
  const handleRemoveManualTrip = (tripId) => {
    if (confirm('¿Deseas eliminar este registro de viaje del historial?')) {
      const updated = clients.map(c => {
        if (c.id === selectedClient.id) {
          return {
            ...c,
            manualTrips: (c.manualTrips || []).filter(t => t.id !== tripId)
          }
        }
        return c
      })
      saveClientsList(updated)
    }
  }

  // Get Inquiries (Queries) linked to this client
  const getLinkedQueries = (client) => {
    const allQueries = JSON.parse(localStorage.getItem('horus_queries') || '[]')
    return allQueries.filter(q => 
      (client.email && q.contact && q.contact.toLowerCase() === client.email.toLowerCase()) ||
      (client.phone && q.contact && q.contact.includes(client.phone)) ||
      (client.name && q.clientName && q.clientName.toLowerCase().includes(client.name.toLowerCase()))
    )
  }

  // Get Bookings linked to this client
  const getLinkedBookings = (client) => {
    const allBookings = JSON.parse(localStorage.getItem('horus_bookings') || '[]')
    return allBookings.filter(b => 
      (client.name && b.title && b.title.toLowerCase().includes(client.name.toLowerCase())) ||
      (client.name && b.description && b.description.toLowerCase().includes(client.name.toLowerCase()))
    )
  }

  // Filter clients list
  const filteredClients = clients.filter(c => {
    // 1. Search term match
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = 
      (c.name || '').toLowerCase().includes(searchLower) ||
      (c.email || '').toLowerCase().includes(searchLower) ||
      (c.phone || '').toLowerCase().includes(searchLower) ||
      (c.passportNumber || '').toLowerCase().includes(searchLower)
    
    if (!matchesSearch) return false

    // 2. Passport Status match
    if (passportFilter === 'todos') return true
    
    const status = getPassportStatus(c.passportExpiryDate)
    if (passportFilter === 'vigentes') return status.code === 'valid'
    if (passportFilter === 'alerta') return status.code === 'warning'
    if (passportFilter === 'vencidos') return status.code === 'expired'
    
    return true
  })

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Contact size={24} style={{ color: '#2563eb' }} /> Base de Datos de Clientes (Fichas de Pasajeros)
        </h1>
        {selectedClient && (
          <button 
            onClick={() => setSelectedClient(null)}
            style={{
              backgroundColor: '#64748b', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer'
            }}
          >
            ← Volver al Listado
          </button>
        )}
      </div>

      {!selectedClient ? (
        /* ================= LISTADO Y FORMULARIO ================= */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* FORM: Create or Edit Client */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {isEditing ? <Edit2 size={18} style={{ color: '#f59e0b' }} /> : <Plus size={18} style={{ color: '#2563eb' }} />}
              {isEditing ? 'Editar Pasajero' : 'Registrar Nuevo Pasajero'}
            </h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Sección 1: Datos Personales */}
              <div>
                <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#2563eb', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>
                  Datos de Contacto
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>Nombre Completo *</label>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="Ej. Juan Pérez" 
                      style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                      required
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>Email</label>
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="juan@example.com" 
                        style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>Teléfono</label>
                      <input 
                        type="text" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="+54 11..." 
                        style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>Dirección</label>
                    <input 
                      type="text" 
                      value={address} 
                      onChange={(e) => setAddress(e.target.value)} 
                      placeholder="Calle 123, Ciudad" 
                      style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>
              </div>

              {/* Sección 2: Documentación Obligatoria */}
              <div>
                <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#eab308', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>
                  Documentación Obligatoria
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>Nº Pasaporte</label>
                      <input 
                        type="text" 
                        value={passportNumber} 
                        onChange={(e) => setPassportNumber(e.target.value)} 
                        placeholder="Ej. ARG12345" 
                        style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>F. Nacimiento</label>
                      <input 
                        type="date" 
                        value={birthDate} 
                        onChange={(e) => setBirthDate(e.target.value)} 
                        style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>Emisión Pasaporte</label>
                      <input 
                        type="date" 
                        value={passportIssueDate} 
                        onChange={(e) => setPassportIssueDate(e.target.value)} 
                        style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>Vencimiento Pasaporte</label>
                      <input 
                        type="date" 
                        value={passportExpiryDate} 
                        onChange={(e) => setPassportExpiryDate(e.target.value)} 
                        style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección 3: Preferencias del Pasajero */}
              <div>
                <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#10b981', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>
                  Preferencias del Pasajero
                </h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>Aerolínea Frecuente</label>
                      <input 
                        type="text" 
                        value={frequentFlyerAirline} 
                        onChange={(e) => setFrequentFlyerAirline(e.target.value)} 
                        placeholder="Ej. LATAM" 
                        style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>Nº de Socio</label>
                      <input 
                        type="text" 
                        value={frequentFlyerNumber} 
                        onChange={(e) => setFrequentFlyerNumber(e.target.value)} 
                        placeholder="LA-12345" 
                        style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>Restricciones Comida</label>
                      <select 
                        value={dietaryRestrictions} 
                        onChange={(e) => setDietaryRestrictions(e.target.value)} 
                        style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: 'white', boxSizing: 'border-box' }}
                      >
                        <option value="Sin restricciones">Sin restricciones</option>
                        <option value="Sin TACC (Celíaco)">Sin TACC (Celíaco)</option>
                        <option value="Vegetariana">Vegetariana</option>
                        <option value="Vegana">Vegana</option>
                        <option value="Intolerancia a la lactosa">Intolerancia a la lactosa</option>
                        <option value="Bajo en sodio">Bajo en sodio</option>
                        <option value="Keto">Keto</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }}>Tipo de Cama</label>
                      <select 
                        value={preferredBed} 
                        onChange={(e) => setPreferredBed(e.target.value)} 
                        style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: 'white', boxSizing: 'border-box' }}
                      >
                        <option value="Matrimonial">Matrimonial (Double)</option>
                        <option value="King">King Size</option>
                        <option value="Twin">Camas Individuales (Twin)</option>
                        <option value="Single">Cama Simple (Single)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones de acción del formulario */}
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button 
                  type="submit" 
                  style={{
                    flex: 1, backgroundColor: isEditing ? '#f59e0b' : '#2563eb', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s'
                  }}
                >
                  {isEditing ? 'Guardar Cambios' : 'Registrar Pasajero'}
                </button>
                {isEditing && (
                  <button 
                    type="button" 
                    onClick={handleCancelEdit}
                    style={{
                      backgroundColor: '#6b7280', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                )}
              </div>

            </form>
          </div>

          {/* TABLE: List of Passengers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Search and Filters */}
            <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              
              {/* Search input */}
              <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: '#9ca3af' }} />
                <input 
                  type="text" 
                  placeholder="Buscar por nombre, email, pasaporte..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: '100%', padding: '0.625rem 0.625rem 0.625rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                />
              </div>

              {/* Passport status selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563' }}>Filtro Pasaporte:</label>
                <select 
                  value={passportFilter}
                  onChange={(e) => setPassportFilter(e.target.value)}
                  style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: 'white' }}
                >
                  <option value="todos">Todos los Pasaportes</option>
                  <option value="vigentes">Vigentes (Válido)</option>
                  <option value="alerta">Vencen pronto (&lt; 6 meses)</option>
                  <option value="vencidos">Vencidos</option>
                </select>
              </div>

            </div>

            {/* Main Table Card */}
            <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Pasajero</th>
                    <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Contacto</th>
                    <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Nº Pasaporte</th>
                    <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Estado Pasaporte</th>
                    <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569', textAlign: 'right' }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b' }}>No se encontraron fichas de pasajeros.</td>
                    </tr>
                  ) : (
                    filteredClients.map(c => {
                      const passStatus = getPassportStatus(c.passportExpiryDate)
                      
                      return (
                        <tr key={c.id} style={{ borderBottom: '1px solid #e2e8f0', transition: 'background-color 0.2s' }}>
                          
                          {/* Name & Age */}
                          <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                {c.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                              </div>
                              <div>
                                <div style={{ fontWeight: '600', color: '#1e293b' }}>{c.name}</div>
                                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                                  {c.birthDate ? getAge(c.birthDate).split(' (')[0] : 'Edad no registrada'}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Email & Phone */}
                          <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#334155' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                              {c.email && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#4b5563' }}>
                                  <Mail size={12} style={{ color: '#9ca3af' }} /> {c.email}
                                </span>
                              )}
                              {c.phone && (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#4b5563' }}>
                                  <Phone size={12} style={{ color: '#9ca3af' }} /> {c.phone}
                                </span>
                              )}
                              {!c.email && !c.phone && <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>Sin datos</span>}
                            </div>
                          </td>

                          {/* Passport Number */}
                          <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1e293b', fontWeight: '500' }}>
                            {c.passportNumber ? (
                              <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{c.passportNumber}</span>
                            ) : (
                              <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>No cargado</span>
                            )}
                          </td>

                          {/* Passport Alert Badge */}
                          <td style={{ padding: '1rem' }}>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              padding: '0.25rem 0.5rem',
                              borderRadius: '9999px',
                              fontSize: '0.75rem',
                              fontWeight: '600',
                              backgroundColor: passStatus.bg,
                              color: passStatus.color
                            }}>
                              <passStatus.icon size={12} />
                              {passStatus.label}
                            </span>
                            {c.passportExpiryDate && (
                              <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.15rem' }}>
                                {passStatus.desc}
                              </div>
                            )}
                          </td>

                          {/* Action Buttons */}
                          <td style={{ padding: '1rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                              
                              {/* View detail button */}
                              <button
                                onClick={() => setSelectedClient(c)}
                                title="Ver Ficha Completa"
                                style={{
                                  padding: '0.4rem', backgroundColor: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center'
                                }}
                              >
                                <Eye size={14} />
                              </button>

                              {/* Edit button */}
                              <button
                                onClick={() => handleEdit(c)}
                                title="Editar"
                                style={{
                                  padding: '0.4rem', backgroundColor: '#fef3c7', color: '#b45309', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center'
                                }}
                              >
                                <Edit2 size={14} />
                              </button>

                              {/* Delete button */}
                              <button
                                onClick={() => handleDelete(c.id)}
                                title="Eliminar Pasajero"
                                style={{
                                  padding: '0.4rem', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center'
                                }}
                              >
                                <Trash2 size={14} />
                              </button>

                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ================= VISTA DE DETALLE COMPLETO (FICHA) ================= */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
          
          {/* Ficha: Datos y Preferencias */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Profile Overview Card */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center', position: 'relative' }}>
              
              {/* Badge Passport Status */}
              <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
                {(() => {
                  const passStatus = getPassportStatus(selectedClient.passportExpiryDate)
                  return (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: passStatus.bg,
                      color: passStatus.color
                    }}>
                      <passStatus.icon size={12} />
                      {passStatus.label.replace(' ✅', '').replace(' ⚠️', '').replace(' ❌', '')}
                    </span>
                  )
                })()}
              </div>

              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '2rem', margin: '0 auto 1rem auto' }}>
                {selectedClient.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>{selectedClient.name}</h2>
              <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 1rem 0' }}>Ficha de Pasajero</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left', borderTop: '1px solid #f1f5f9', paddingTop: '1rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563' }}>
                  <Mail size={16} style={{ color: '#9ca3af' }} />
                  <span>{selectedClient.email || 'Email no registrado'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563' }}>
                  <Phone size={16} style={{ color: '#9ca3af' }} />
                  <span>{selectedClient.phone || 'Teléfono no registrado'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563' }}>
                  <MapPin size={16} style={{ color: '#9ca3af' }} />
                  <span>{selectedClient.address || 'Dirección no registrada'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563' }}>
                  <Calendar size={16} style={{ color: '#9ca3af' }} />
                  <span>Edad: {getAge(selectedClient.birthDate)}</span>
                </div>
              </div>
            </div>

            {/* Passport Documentation Card */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                <CreditCard size={18} style={{ color: '#eab308' }} /> Documentación de Viaje
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ffffff', paddingBottom: '0.5rem' }}>
                  <span style={{ color: '#64748b' }}>Número de Pasaporte:</span>
                  <span style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{selectedClient.passportNumber || 'No Registrado'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ffffff', paddingBottom: '0.5rem' }}>
                  <span style={{ color: '#64748b' }}>Fecha de Emisión:</span>
                  <span style={{ fontWeight: '500' }}>
                    {selectedClient.passportIssueDate ? new Date(selectedClient.passportIssueDate).toLocaleDateString('es-ES') : 'No Registrada'}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ffffff', paddingBottom: '0.5rem' }}>
                  <span style={{ color: '#64748b' }}>Fecha de Vencimiento:</span>
                  <span style={{ fontWeight: 'bold', color: getPassportStatus(selectedClient.passportExpiryDate).color }}>
                    {selectedClient.passportExpiryDate ? new Date(selectedClient.passportExpiryDate).toLocaleDateString('es-ES') : 'No Registrada'}
                  </span>
                </div>

                {/* Expiry alerts warning alerts banner */}
                {selectedClient.passportExpiryDate && (() => {
                  const passStatus = getPassportStatus(selectedClient.passportExpiryDate)
                  if (passStatus.code !== 'valid') {
                    return (
                      <div style={{
                        marginTop: '0.5rem',
                        backgroundColor: passStatus.bg,
                        border: `1px solid ${passStatus.color}`,
                        borderRadius: '8px',
                        padding: '0.75rem',
                        color: passStatus.color,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.5rem'
                      }}>
                        <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                        <div>
                          <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>¡ATENCIÓN ANTES DE EMITIR VIAJE!</div>
                          <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                            El pasaporte del pasajero {passStatus.code === 'expired' ? 'está vencido.' : 'vence en menos de 6 meses.'} {passStatus.desc}. Es obligatorio renovarlo antes de emitir tickets internacionales.
                          </div>
                        </div>
                      </div>
                    )
                  }
                  return null
                })()}

              </div>
            </div>

            {/* Preferences Card */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                <Award size={18} style={{ color: '#10b981' }} /> Preferencias y Perfil
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #ffffff', paddingBottom: '0.5rem' }}>
                  <PlaneTakeoff size={16} style={{ color: '#64748b' }} />
                  <div>
                    <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block' }}>Programa de Viajero Frecuente</span>
                    <span style={{ fontWeight: '500' }}>
                      {selectedClient.frequentFlyerAirline ? `${selectedClient.frequentFlyerAirline} (${selectedClient.frequentFlyerNumber || 'Socio s/n'})` : 'No registra'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #ffffff', paddingBottom: '0.5rem' }}>
                  <Utensils size={16} style={{ color: '#64748b' }} />
                  <div>
                    <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block' }}>Restricciones Alimenticias</span>
                    <span style={{ fontWeight: '600', color: selectedClient.dietaryRestrictions !== 'Sin restricciones' ? '#f59e0b' : '#334155' }}>
                      {selectedClient.dietaryRestrictions || 'Sin restricciones'}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Bed size={16} style={{ color: '#64748b' }} />
                  <div>
                    <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block' }}>Preferencia de Cama en Hotel</span>
                    <span style={{ fontWeight: '500' }}>{selectedClient.preferredBed || 'Matrimonial'}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Historial Consolidado: Consultas y Viajes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* TAB: Consultas / Cotizaciones */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                <Mail size={18} style={{ color: '#3b82f6' }} /> Historial de Consultas y Cotizaciones (Sincronizado)
              </h3>

              {(() => {
                const linkedQueries = getLinkedQueries(selectedClient)
                if (linkedQueries.length === 0) {
                  return (
                    <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
                      No se encontraron consultas registradas en Horus que coincidan con este pasajero.
                    </div>
                  )
                }

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {linkedQueries.map(q => (
                      <div key={q.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', backgroundColor: '#ffffff' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>{q.date}</span>
                          <span style={{
                            padding: '0.15rem 0.4rem',
                            borderRadius: '9999px',
                            fontSize: '0.7rem',
                            fontWeight: '700',
                            backgroundColor: q.status === 'Pendiente' ? '#fef3c7' : '#dcfce7',
                            color: q.status === 'Pendiente' ? '#d97706' : '#15803d'
                          }}>
                            {q.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: '600', marginBottom: '0.25rem', textTransform: 'capitalize' }}>
                          Interés en: {q.category || 'General'}
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#4b5563', margin: 0, fontStyle: 'italic', lineHeight: '1.4' }}>
                          "{q.message}"
                        </p>
                      </div>
                    ))}
                  </div>
                )
              })()}
            </div>

            {/* TAB: Historial de Viajes */}
            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                <Briefcase size={18} style={{ color: '#2563eb' }} /> Historial de Viajes Realizados y Activos
              </h3>

              {/* Linked active bookings */}
              {(() => {
                const linkedBookings = getLinkedBookings(selectedClient)
                if (linkedBookings.length > 0) {
                  return (
                    <div style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Reservas Activas en el Sistema
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {linkedBookings.map(b => (
                          <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #dcfce7', backgroundColor: '#f0fdf4', borderRadius: '8px', padding: '0.75rem' }}>
                            <div>
                              <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#15803d' }}>{b.title}</div>
                              <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>{b.description}</div>
                              <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.25rem' }}>Fecha: {b.verifiedAt}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#16a34a' }}>{b.price}</div>
                              <span style={{ fontSize: '0.65rem', backgroundColor: '#bbf7d0', color: '#15803d', padding: '0.15rem 0.4rem', borderRadius: '9999px', fontWeight: 'bold' }}>
                                Reservado
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                }
                return null
              })()}

              {/* Manual History Trips */}
              <div>
                <h4 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                  Historial de Viajes Anteriores
                </h4>

                {(!selectedClient.manualTrips || selectedClient.manualTrips.length === 0) ? (
                  <div style={{ padding: '1rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem', border: '1px dashed #e2e8f0', borderRadius: '8px', marginBottom: '1.5rem' }}>
                    No hay viajes pasados registrados manualmente para este cliente.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {selectedClient.manualTrips.map(t => (
                      <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem', backgroundColor: 'white' }}>
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>{t.destination}</div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Fecha: {new Date(t.date).toLocaleDateString('es-ES')}</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155' }}>{t.price}</div>
                            <span style={{
                              fontSize: '0.65rem',
                              backgroundColor: t.status === 'Realizado' ? '#e2e8f0' : '#fee2e2',
                              color: t.status === 'Realizado' ? '#475569' : '#b91c1c',
                              padding: '0.15rem 0.4rem',
                              borderRadius: '9999px',
                              fontWeight: '600'
                            }}>
                              {t.status}
                            </span>
                          </div>
                          <button 
                            onClick={() => handleRemoveManualTrip(t.id)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}
                            title="Eliminar del historial"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Form to add manual trip history */}
                <form onSubmit={handleAddManualTrip} style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <PlusCircle size={14} style={{ color: '#2563eb' }} /> Agregar Viaje Pasado o Externo al Historial
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      placeholder="Ej. Río de Janeiro, Brasil" 
                      value={newTripDest}
                      onChange={(e) => setNewTripDest(e.target.value)}
                      style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.75rem' }}
                      required
                    />
                    <input 
                      type="date" 
                      value={newTripDate}
                      onChange={(e) => setNewTripDate(e.target.value)}
                      style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.75rem' }}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      placeholder="Ej. 1200 USD o $350.000" 
                      value={newTripPrice}
                      onChange={(e) => setNewTripPrice(e.target.value)}
                      style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.75rem' }}
                      required
                    />
                    <select 
                      value={newTripStatus}
                      onChange={(e) => setNewTripStatus(e.target.value)}
                      style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.75rem', backgroundColor: 'white' }}
                    >
                      <option value="Realizado">Realizado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    style={{
                      backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer'
                    }}
                  >
                    Guardar Viaje en Historial
                  </button>
                </form>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}
