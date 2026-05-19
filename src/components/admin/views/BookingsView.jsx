import { useState, useEffect } from 'react'

export default function BookingsView() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('horus_bookings') || '[]')
    setBookings(data)
  }, [])

  const deleteBooking = (id) => {
    if (confirm('¿Seguro que deseas eliminar esta reserva?')) {
      const updated = bookings.filter(b => b.id !== id)
      setBookings(updated)
      localStorage.setItem('horus_bookings', JSON.stringify(updated))
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>Reservas y Solicitudes</h1>
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>ID</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Cliente / Título</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Detalle</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Precio Estimado</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Fecha</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No hay reservas registradas.</td>
              </tr>
            ) : (
              bookings.map(booking => (
                <tr key={booking.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1e293b' }}>{booking.id.slice(0,8)}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1e293b', fontWeight: '500' }}>{booking.title}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748b' }}>{booking.description}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#10b981', fontWeight: '600' }}>{booking.price}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748b' }}>{booking.verifiedAt}</td>
                  <td style={{ padding: '1rem' }}>
                    <button 
                      onClick={() => deleteBooking(booking.id)}
                      style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '500' }}
                    >
                      Eliminar
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
