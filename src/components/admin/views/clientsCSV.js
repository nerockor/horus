/**
 * clientsCSV.js - Funciones de exportación CSV para pasajeros
 */

function dateStamp() {
  return new Date().toISOString().split('T')[0]
}

function esc(v) {
  return `"${(v || '').toString().replace(/"/g, '""')}"`
}

function triggerDownload(csvContent, filename) {
  const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.setAttribute('href', URL.createObjectURL(blob))
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const downloadClientsCSV = (clients) => {
  if (clients.length === 0) return

  const headers = [
    'ID', 'Nombre', 'Email', 'Telefono', 'Direccion', 'Nº Pasaporte',
    'Emision Pasaporte', 'Vencimiento Pasaporte', 'Fecha Nacimiento',
    'Aerolinea Frecuente', 'Numero Frecuente', 'Restricciones Alimentarias',
    'Preferencia Cama', 'Estado Aprobacion', 'Estado Pago', 'Deuda (USD)'
  ]

  const rows = clients.map(c => [
    c.id, esc(c.name), esc(c.email), esc(c.phone), esc(c.address),
    esc(c.passportNumber), c.passportIssueDate || '', c.passportExpiryDate || '',
    c.birthDate || '', esc(c.frequentFlyerAirline), esc(c.frequentFlyerNumber),
    esc(c.dietaryRestrictions), esc(c.preferredBed),
    (c.approvalStatus || 'approved') === 'approved' ? 'Aprobado' : 'Pendiente',
    (c.paymentStatus || 'paid') === 'paid' ? 'Al dia / Abonado' : 'Con Deuda',
    c.debtAmount || 0
  ])

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  triggerDownload(csv, `base_pasajeros_registrados_${dateStamp()}.csv`)
}

export const downloadActiveTripsCSV = (clients) => {
  const allBookings = JSON.parse(localStorage.getItem('horus_bookings') || '[]')

  const activeClients = clients.filter(c => {
    const hasTrip = (c.manualTrips || []).some(t => t.status !== 'Cancelado')
    const hasBooking = allBookings.some(b =>
      (c.name && b.title && b.title.toLowerCase().includes(c.name.toLowerCase())) ||
      (c.name && b.description && b.description.toLowerCase().includes(c.name.toLowerCase()))
    )
    return hasTrip || hasBooking
  })

  if (activeClients.length === 0) {
    alert('No se encontraron pasajeros con viajes activos o programados.')
    return
  }

  const headers = [
    'ID', 'Nombre', 'Email', 'Telefono', 'Estado de Pago', 'Deuda (USD)',
    'Viajes Manuales (Destinos/Fechas)', 'Reservas Vinculadas (Detalle/Precio)'
  ]

  const rows = activeClients.map(c => {
    const tripsStr = (c.manualTrips || [])
      .filter(t => t.status !== 'Cancelado')
      .map(t => `${t.destination} (${t.date})`)
      .join('; ')

    const linkedBookings = allBookings.filter(b =>
      (c.name && b.title && b.title.toLowerCase().includes(c.name.toLowerCase())) ||
      (c.name && b.description && b.description.toLowerCase().includes(c.name.toLowerCase()))
    )
    const bookingsStr = linkedBookings.map(b => `${b.title} - ${b.price}`).join('; ')

    return [
      c.id, esc(c.name), esc(c.email), esc(c.phone),
      (c.paymentStatus || 'paid') === 'paid' ? 'Al dia / Abonado' : 'Con Deuda',
      c.debtAmount || 0, esc(tripsStr), esc(bookingsStr)
    ]
  })

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n')
  triggerDownload(csv, `viajes_activos_y_espera_${dateStamp()}.csv`)
}
