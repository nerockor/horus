import { useEffect, useState } from 'react'

export default function DashboardView() {
  const [stats, setStats] = useState({
    bookings: 0,
    users: 0
  })

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('horus_bookings') || '[]')
    const users = JSON.parse(localStorage.getItem('horus_users') || '[]')
    
    setStats({
      bookings: bookings.length,
      users: users.length + 1 // +1 for the default admin
    })
  }, [])

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 0.5rem 0', fontWeight: '500' }}>Total Reservas</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>{stats.bookings}</p>
        </div>
        
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 0.5rem 0', fontWeight: '500' }}>Usuarios Activos</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', margin: 0 }}>{stats.users}</p>
        </div>
      </div>
    </div>
  )
}
