import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { 
  Contact, Search, Edit2, Trash2, Eye, Mail, Phone, Download
} from 'lucide-react'

import { getPassportStatus, getAge, MOCK_CLIENTS } from './clientsUtils'
import { downloadClientsCSV, downloadActiveTripsCSV } from './clientsCSV'
import ClientForm from './ClientForm'
import ClientDetail from './ClientDetail'
import { api } from '../../../api'

export default function ClientsView() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [clients, setClients] = useState([])
  const [selectedClient, setSelectedClient] = useState(null)
  
  // Link states
  const [queries, setQueries] = useState([])
  const [bookings, setBookings] = useState([])

  // Search and Filter State
  const [searchTerm, setSearchTerm] = useState('')
  const [passportFilter, setPassportFilter] = useState('todos')
  const [approvalFilter, setApprovalFilter] = useState('todos')
  const [paymentFilter, setPaymentFilter] = useState('todos')

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
  const [approvalStatus, setApprovalStatus] = useState('approved')
  const [paymentStatus, setPaymentStatus] = useState('paid')
  const [debtAmount, setDebtAmount] = useState('0')

  // Manual Trip Form State (inside detail view)
  const [newTripDest, setNewTripDest] = useState('')
  const [newTripDate, setNewTripDate] = useState('')
  const [newTripPrice, setNewTripPrice] = useState('')
  const [newTripStatus, setNewTripStatus] = useState('Realizado')

  useEffect(() => {
    // Fetch clients
    api.getClients()
      .then(data => setClients(data))
      .catch(err => console.error('Error fetching clients:', err))

    // Fetch queries
    api.getQueries()
      .then(data => setQueries(data))
      .catch(err => console.error('Error fetching queries:', err))

    // Fetch bookings
    api.getBookings()
      .then(data => setBookings(data))
      .catch(err => console.error('Error fetching bookings:', err))

    const queryName = searchParams.get('prefill_name')
    const queryContact = searchParams.get('prefill_contact')
    if (queryName || queryContact) {
      setName(queryName || '')
      if (queryContact) {
        if (queryContact.includes('@')) setEmail(queryContact)
        else setPhone(queryContact)
      }
      setSearchParams({})
    }
  }, [searchParams, setSearchParams])

  const updateLocalClients = (updatedClients) => {
    setClients(updatedClients)
    if (selectedClient) {
      const currentSelected = updatedClients.find(c => c.id === selectedClient.id)
      setSelectedClient(currentSelected || null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name) return

    if (isEditing) {
      const updatedClient = {
        name, email, phone, address, passportNumber, passportIssueDate, passportExpiryDate, birthDate,
        frequentFlyerAirline, frequentFlyerNumber, dietaryRestrictions, preferredBed,
        approvalStatus, paymentStatus, debtAmount: paymentStatus === 'debt' ? parseFloat(debtAmount || '0') : 0
      }
      try {
        const res = await api.updateClient(editId, updatedClient)
        const updated = clients.map(c => c.id === editId ? res : c)
        updateLocalClients(updated)
        setIsEditing(false)
        setEditId(null)
        handleCancelEdit()
      } catch (err) {
        alert(err.message || 'Error al actualizar pasajero')
      }
    } else {
      const newClient = {
        name, email, phone, address, passportNumber, passportIssueDate, passportExpiryDate, birthDate,
        frequentFlyerAirline, frequentFlyerNumber, dietaryRestrictions, preferredBed,
        approvalStatus, paymentStatus, debtAmount: paymentStatus === 'debt' ? parseFloat(debtAmount || '0') : 0,
        manualTrips: []
      }
      try {
        const res = await api.createClient(newClient)
        updateLocalClients([res, ...clients])
        handleCancelEdit()
      } catch (err) {
        alert(err.message || 'Error al guardar pasajero')
      }
    }
  }

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
    setApprovalStatus(client.approvalStatus || 'approved')
    setPaymentStatus(client.paymentStatus || 'paid')
    setDebtAmount(client.debtAmount?.toString() || '0')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
    setApprovalStatus('approved')
    setPaymentStatus('paid')
    setDebtAmount('0')
  }

  const handleDelete = async (id) => {
    if (confirm('¿Seguro que deseas eliminar la ficha de este pasajero? Todo su historial se borrará.')) {
      try {
        await api.deleteClient(id)
        const updated = clients.filter(c => c.id !== id)
        updateLocalClients(updated)
        if (selectedClient && selectedClient.id === id) setSelectedClient(null)
      } catch (err) {
        alert(err.message || 'Error al eliminar pasajero')
      }
    }
  }

  const handleAddManualTrip = async (e) => {
    e.preventDefault()
    if (!newTripDest || !newTripDate || !newTripPrice) return

    const trip = { id: `mt-${Date.now()}`, destination: newTripDest, date: newTripDate, price: newTripPrice, status: newTripStatus }
    const updatedClient = { ...selectedClient, manualTrips: [trip, ...(selectedClient.manualTrips || [])] }
    try {
      const res = await api.updateClient(selectedClient.id, updatedClient)
      const updated = clients.map(c => c.id === selectedClient.id ? res : c)
      updateLocalClients(updated)
      setNewTripDest('')
      setNewTripDate('')
      setNewTripPrice('')
      setNewTripStatus('Realizado')
    } catch (err) {
      alert(err.message || 'Error al agregar viaje')
    }
  }

  const handleRemoveManualTrip = async (tripId) => {
    if (confirm('¿Deseas eliminar este registro de viaje del historial?')) {
      const updatedClient = { ...selectedClient, manualTrips: (selectedClient.manualTrips || []).filter(t => t.id !== tripId) }
      try {
        await api.updateClient(selectedClient.id, updatedClient)
        const updated = clients.map(c => c.id === selectedClient.id ? updatedClient : c)
        updateLocalClients(updated)
      } catch (err) {
        alert(err.message || 'Error al eliminar viaje')
      }
    }
  }

  const getLinkedQueries = (client) => {
    return queries.filter(q => 
      (client.email && q.contact && q.contact.toLowerCase() === client.email.toLowerCase()) ||
      (client.phone && q.contact && q.contact.includes(client.phone)) ||
      (client.name && q.clientName && q.clientName.toLowerCase().includes(client.name.toLowerCase()))
    )
  }

  const getLinkedBookings = (client) => {
    return bookings.filter(b => 
      (client.name && b.title && b.title.toLowerCase().includes(client.name.toLowerCase())) ||
      (client.name && b.description && b.description.toLowerCase().includes(client.name.toLowerCase()))
    )
  }

  const filteredClients = clients.filter(c => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = 
      (c.name || '').toLowerCase().includes(searchLower) ||
      (c.email || '').toLowerCase().includes(searchLower) ||
      (c.phone || '').toLowerCase().includes(searchLower) ||
      (c.passportNumber || '').toLowerCase().includes(searchLower)
    
    if (!matchesSearch) return false

    if (passportFilter !== 'todos') {
      const status = getPassportStatus(c.passportExpiryDate)
      if (passportFilter === 'vigentes' && status.code !== 'valid') return false
      if (passportFilter === 'alerta' && status.code !== 'warning') return false
      if (passportFilter === 'vencidos' && status.code !== 'expired') return false
    }

    if (approvalFilter !== 'todos') {
      const status = c.approvalStatus || 'approved'
      if (approvalFilter !== status) return false
    }

    if (paymentFilter !== 'todos') {
      const status = c.paymentStatus || 'paid'
      if (paymentFilter !== status) return false
    }
    
    return true
  })

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Contact size={24} style={{ color: '#2563eb' }} /> Base de Datos de Clientes
        </h1>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {!selectedClient ? (
            <>
              <button onClick={() => downloadClientsCSV(clients)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#10b981', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                <Download size={16} /> Base Registrados
              </button>
              <button onClick={() => downloadActiveTripsCSV(clients)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f59e0b', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}>
                <Download size={16} /> Base Viajes Activos
              </button>
            </>
          ) : (
            <button onClick={() => setSelectedClient(null)} style={{ backgroundColor: '#64748b', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
              ← Volver al Listado
            </button>
          )}
        </div>
      </div>

      {!selectedClient ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
          <ClientForm 
            isEditing={isEditing} handleSubmit={handleSubmit} handleCancelEdit={handleCancelEdit}
            name={name} setName={setName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} address={address} setAddress={setAddress}
            passportNumber={passportNumber} setPassportNumber={setPassportNumber} passportIssueDate={passportIssueDate} setPassportIssueDate={setPassportIssueDate}
            passportExpiryDate={passportExpiryDate} setPassportExpiryDate={setPassportExpiryDate} birthDate={birthDate} setBirthDate={setBirthDate}
            frequentFlyerAirline={frequentFlyerAirline} setFrequentFlyerAirline={setFrequentFlyerAirline} frequentFlyerNumber={frequentFlyerNumber} setFrequentFlyerNumber={setFrequentFlyerNumber}
            dietaryRestrictions={dietaryRestrictions} setDietaryRestrictions={setDietaryRestrictions} preferredBed={preferredBed} setPreferredBed={setPreferredBed}
            approvalStatus={approvalStatus} setApprovalStatus={setApprovalStatus} paymentStatus={paymentStatus} setPaymentStatus={setPaymentStatus}
            debtAmount={debtAmount} setDebtAmount={setDebtAmount}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: '#9ca3af' }} />
                <input type="text" placeholder="Buscar por nombre, email, pasaporte..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '0.625rem 0.625rem 0.625rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563' }}>Filtro Pasaporte:</label>
                <select value={passportFilter} onChange={(e) => setPassportFilter(e.target.value)} style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: 'white' }}>
                  <option value="todos">Todos los Pasaportes</option>
                  <option value="vigentes">Vigentes (Válido)</option>
                  <option value="alerta">Vencen pronto (&lt; 6 meses)</option>
                  <option value="vencidos">Vencidos</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563' }}>Aprobación:</label>
                <select value={approvalFilter} onChange={(e) => setApprovalFilter(e.target.value)} style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: 'white' }}>
                  <option value="todos">Todos</option>
                  <option value="approved">Aprobados</option>
                  <option value="pending">Pendientes</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563' }}>Estado Pago:</label>
                <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: 'white' }}>
                  <option value="todos">Todos</option>
                  <option value="paid">Al día / Abonado</option>
                  <option value="debt">Con Deuda</option>
                </select>
              </div>
            </div>

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
                                <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.25rem' }}>
                                  <span style={{ padding: '0.15rem 0.35rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '700', backgroundColor: (c.approvalStatus || 'approved') === 'approved' ? '#dcfce7' : '#fef3c7', color: (c.approvalStatus || 'approved') === 'approved' ? '#166534' : '#854d0e' }}>
                                    {(c.approvalStatus || 'approved') === 'approved' ? 'Aprobado' : 'Pendiente'}
                                  </span>
                                  <span style={{ padding: '0.15rem 0.35rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '700', backgroundColor: (c.paymentStatus || 'paid') === 'paid' ? '#e0f2fe' : '#fee2e2', color: (c.paymentStatus || 'paid') === 'paid' ? '#0369a1' : '#991b1b' }}>
                                    {(c.paymentStatus || 'paid') === 'paid' ? 'Al día' : `Deuda: $${c.debtAmount || 0}`}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#334155' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                              {c.email && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#4b5563' }}><Mail size={12} style={{ color: '#9ca3af' }} /> {c.email}</span>}
                              {c.phone && <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#4b5563' }}><Phone size={12} style={{ color: '#9ca3af' }} /> {c.phone}</span>}
                              {!c.email && !c.phone && <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>Sin datos</span>}
                            </div>
                          </td>
                          <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1e293b', fontWeight: '500' }}>
                            {c.passportNumber ? <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{c.passportNumber}</span> : <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>No cargado</span>}
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600', backgroundColor: passStatus.bg, color: passStatus.color }}>
                              <passStatus.icon size={12} />
                              {passStatus.label}
                            </span>
                            {c.passportExpiryDate && <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.15rem' }}>{passStatus.desc}</div>}
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'flex-end' }}>
                              <button onClick={() => setSelectedClient(c)} title="Ver Ficha Completa" style={{ padding: '0.4rem', backgroundColor: '#e0f2fe', color: '#0369a1', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                <Eye size={14} />
                              </button>
                              <button onClick={() => handleEdit(c)} title="Editar" style={{ padding: '0.4rem', backgroundColor: '#fef3c7', color: '#b45309', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                <Edit2 size={14} />
                              </button>
                              <button onClick={() => handleDelete(c.id)} title="Eliminar Pasajero" style={{ padding: '0.4rem', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
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
        <ClientDetail 
          selectedClient={selectedClient} getLinkedQueries={getLinkedQueries} getLinkedBookings={getLinkedBookings}
          handleRemoveManualTrip={handleRemoveManualTrip} handleAddManualTrip={handleAddManualTrip}
          newTripDest={newTripDest} setNewTripDest={setNewTripDest} newTripDate={newTripDate} setNewTripDate={setNewTripDate}
          newTripPrice={newTripPrice} setNewTripPrice={setNewTripPrice} newTripStatus={newTripStatus} setNewTripStatus={setNewTripStatus}
        />
      )}
    </div>
  )
}
