import { useState, useEffect } from 'react'
import { Check, Trash2, Mail, MessageSquare } from 'lucide-react'

export default function QueriesView() {
  const [queries, setQueries] = useState([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('horus_queries') || '[]')
    // Seed some mock queries if empty so it has data initially
    if (data.length === 0) {
      const mockQueries = [
        {
          id: 'q-1',
          clientName: 'Juan Pérez',
          contact: 'juan.perez@example.com',
          message: 'Hola, quería consultar sobre el paquete a Madrid. ¿Tienen disponibilidad para la segunda semana de junio?',
          date: '19/05/2026, 10:15',
          status: 'Pendiente'
        },
        {
          id: 'q-2',
          clientName: 'María Gomez',
          contact: '+54 11 5555-1234',
          message: 'Buenas tardes. ¿El seguro de viaje Assist Card cubre emergencias de deportes extremos?',
          date: '18/05/2026, 16:45',
          status: 'Contestada'
        }
      ]
      localStorage.setItem('horus_queries', JSON.stringify(mockQueries))
      setQueries(mockQueries)
    } else {
      setQueries(data)
    }
  }, [])

  const toggleStatus = (id) => {
    const updated = queries.map(q => {
      if (q.id === id) {
        return { ...q, status: q.status === 'Pendiente' ? 'Contestada' : 'Pendiente' }
      }
      return q
    })
    setQueries(updated)
    localStorage.setItem('horus_queries', JSON.stringify(updated))
  }

  const deleteQuery = (id) => {
    if (confirm('¿Seguro que deseas eliminar esta consulta?')) {
      const updated = queries.filter(q => q.id !== id)
      setQueries(updated)
      localStorage.setItem('horus_queries', JSON.stringify(updated))
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MessageSquare size={24} /> Panel de Consultas
      </h1>
      
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Fecha</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Cliente</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Contacto</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Consulta</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Estado</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {queries.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No hay consultas pendientes.</td>
              </tr>
            ) : (
              queries.map(q => (
                <tr key={q.id} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: q.status === 'Pendiente' ? '#fffbeb' : 'transparent' }}>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748b', whiteSpace: 'nowrap' }}>{q.date}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1e293b', fontWeight: '500' }}>{q.clientName}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1e293b' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Mail size={14} style={{ color: '#64748b' }} /> {q.contact}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#334155', maxWidth: '350px', wordBreak: 'break-word' }}>{q.message}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      backgroundColor: q.status === 'Pendiente' ? '#fef3c7' : '#dcfce7',
                      color: q.status === 'Pendiente' ? '#d97706' : '#15803d'
                    }}>
                      {q.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => toggleStatus(q.id)}
                        title={q.status === 'Pendiente' ? 'Marcar como Contestada' : 'Marcar como Pendiente'}
                        style={{
                          padding: '0.375rem',
                          backgroundColor: q.status === 'Pendiente' ? '#22c55e' : '#64748b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => deleteQuery(q.id)}
                        title="Eliminar consulta"
                        style={{
                          padding: '0.375rem',
                          backgroundColor: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
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
