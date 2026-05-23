import { useState, useEffect } from 'react'
import { Download, Search, Calendar, CreditCard, Plane, Trash2 } from 'lucide-react'

export default function BookingsView() {
  const [bookings, setBookings] = useState([])
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('todos')
  const [tripFilter, setTripFilter] = useState('todos')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('horus_bookings') || '[]')
    // Migrate existing bookings to have default statuses if they don't exist
    const migrated = data.map(b => ({
      ...b,
      paymentStatus: b.paymentStatus || 'unpaid', // unpaid, paid, installments
      tripStatus: b.tripStatus || 'pending' // pending, active, completed
    }))
    setBookings(migrated)
    // Only rewrite to local storage if changes were made
    if (JSON.stringify(data) !== JSON.stringify(migrated)) {
      localStorage.setItem('horus_bookings', JSON.stringify(migrated))
    }
  }, [])

  const deleteBooking = (id) => {
    if (confirm('¿Seguro que deseas eliminar esta reserva?')) {
      const updated = bookings.filter(b => b.id !== id)
      setBookings(updated)
      localStorage.setItem('horus_bookings', JSON.stringify(updated))
    }
  }

  const updateBookingStatus = (id, field, value) => {
    const updated = bookings.map(b => {
      if (b.id === id) {
        return { ...b, [field]: value }
      }
      return b
    })
    setBookings(updated)
    localStorage.setItem('horus_bookings', JSON.stringify(updated))
  }

  // Generate CSV based on filtered data (or all data if preferred)
  const downloadCSV = () => {
    const dataToExport = filteredBookings.length > 0 ? filteredBookings : bookings
    if (dataToExport.length === 0) return

    const headers = ['ID', 'Cliente / Título', 'Detalle', 'Precio', 'Fecha Reserva', 'Estado de Pago', 'Estado del Viaje']
    
    const rows = dataToExport.map(b => {
      let pStatus = 'Pendiente de Pago'
      if (b.paymentStatus === 'paid') pStatus = 'Pagado Total'
      if (b.paymentStatus === 'installments') pStatus = 'Pagado en Cuotas'

      let tStatus = 'A la espera'
      if (b.tripStatus === 'active') tStatus = 'Disfrutando Vacaciones'
      if (b.tripStatus === 'completed') tStatus = 'Finalizado'

      return [
        b.id,
        `"${(b.title || '').replace(/"/g, '""')}"`,
        `"${(b.description || '').replace(/"/g, '""')}"`,
        `"${(b.price || '').replace(/"/g, '""')}"`,
        b.verifiedAt || '',
        pStatus,
        tStatus
      ]
    })

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `base_reservas_y_pagos_${new Date().toISOString().split('T')[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      (b.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.description || '').toLowerCase().includes(searchTerm.toLowerCase())
    
    if (!matchesSearch) return false
    
    if (paymentFilter !== 'todos' && b.paymentStatus !== paymentFilter) return false
    if (tripFilter !== 'todos' && b.tripStatus !== tripFilter) return false

    return true
  })

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={24} style={{ color: '#2563eb' }} /> Reservas y Pagos
        </h1>
        <button 
          onClick={downloadCSV}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '6px', padding: '0.625rem 1rem', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer' }}
        >
          <Download size={16} /> Descargar CSV (Filtrado)
        </button>
      </div>

      {/* Filters */}
      <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: '#9ca3af' }} />
          <input 
            type="text" 
            placeholder="Buscar reserva o cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.625rem 0.625rem 0.625rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
          />
        </div>

        {/* Payment Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CreditCard size={18} style={{ color: '#64748b' }} />
          <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563' }}>Pago:</label>
          <select 
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: 'white' }}
          >
            <option value="todos">Todos los estados</option>
            <option value="paid">Pagado Total</option>
            <option value="installments">Pagado en Cuotas</option>
            <option value="unpaid">Aún no abonan</option>
          </select>
        </div>

        {/* Trip Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plane size={18} style={{ color: '#64748b' }} />
          <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#4b5563' }}>Viaje:</label>
          <select 
            value={tripFilter}
            onChange={(e) => setTripFilter(e.target.value)}
            style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: 'white' }}
          >
            <option value="todos">Todos los estados</option>
            <option value="pending">A la espera de viaje</option>
            <option value="active">Disfrutando Vacaciones</option>
            <option value="completed">Viaje Finalizado</option>
          </select>
        </div>

      </div>
      
      {/* Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Cliente / Detalles</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Precio</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Estado de Pago</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Fase del Viaje</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '2.5rem', textAlign: 'center', color: '#64748b' }}>No se encontraron reservas con los filtros aplicados.</td>
              </tr>
            ) : (
              filteredBookings.map(booking => (
                <tr key={booking.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  
                  {/* Title and details */}
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontSize: '0.875rem', color: '#1e293b', fontWeight: '600', marginBottom: '0.25rem' }}>{booking.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{booking.description}</div>
                    <div style={{ fontSize: '0.65rem', color: '#9ca3af', marginTop: '0.25rem' }}>ID: {booking.id.slice(0,8)} • Ingreso: {booking.verifiedAt}</div>
                  </td>
                  
                  {/* Price */}
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#10b981', fontWeight: '700' }}>
                    {booking.price}
                  </td>
                  
                  {/* Payment Status Dropdown */}
                  <td style={{ padding: '1rem' }}>
                    <select
                      value={booking.paymentStatus}
                      onChange={(e) => updateBookingStatus(booking.id, 'paymentStatus', e.target.value)}
                      style={{ 
                        padding: '0.4rem', 
                        borderRadius: '6px', 
                        fontSize: '0.75rem', 
                        fontWeight: '600',
                        border: '1px solid transparent',
                        backgroundColor: booking.paymentStatus === 'paid' ? '#dcfce7' : (booking.paymentStatus === 'installments' ? '#e0f2fe' : '#fee2e2'),
                        color: booking.paymentStatus === 'paid' ? '#166534' : (booking.paymentStatus === 'installments' ? '#0369a1' : '#991b1b'),
                        cursor: 'pointer'
                      }}
                    >
                      <option value="unpaid">Aún no abonan</option>
                      <option value="installments">Abonado en Cuotas</option>
                      <option value="paid">Pagado Total</option>
                    </select>
                  </td>

                  {/* Trip Status Dropdown */}
                  <td style={{ padding: '1rem' }}>
                    <select
                      value={booking.tripStatus}
                      onChange={(e) => updateBookingStatus(booking.id, 'tripStatus', e.target.value)}
                      style={{ 
                        padding: '0.4rem', 
                        borderRadius: '6px', 
                        fontSize: '0.75rem', 
                        fontWeight: '600',
                        border: '1px solid transparent',
                        backgroundColor: booking.tripStatus === 'active' ? '#fef3c7' : (booking.tripStatus === 'completed' ? '#f1f5f9' : '#ede9fe'),
                        color: booking.tripStatus === 'active' ? '#b45309' : (booking.tripStatus === 'completed' ? '#475569' : '#5b21b6'),
                        cursor: 'pointer'
                      }}
                    >
                      <option value="pending">A la espera de viaje</option>
                      <option value="active">Disfrutando Vacaciones</option>
                      <option value="completed">Viaje Finalizado</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => deleteBooking(booking.id)}
                      title="Eliminar Reserva"
                      style={{ padding: '0.4rem', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
