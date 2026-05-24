import { useState, useEffect } from 'react'
import { Check, Trash2, Mail, MessageSquare, UserPlus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { api } from '../../../api'

export default function QueriesView() {
  const [queries, setQueries] = useState([])

  useEffect(() => {
    api.getQueries()
      .then(data => setQueries(data))
      .catch(err => console.error('Error fetching queries:', err))
  }, [])

  const toggleStatus = async (id) => {
    const query = queries.find(q => q.id === id)
    if (!query) return
    const newStatus = query.status === 'Pendiente' ? 'Contestada' : 'Pendiente'
    try {
      await api.updateQuery(id, newStatus)
      setQueries(queries.map(q => q.id === id ? { ...q, status: newStatus } : q))
    } catch (err) {
      alert(err.message || 'Error al actualizar el estado de la consulta')
    }
  }

  const deleteQuery = async (id) => {
    if (confirm('¿Seguro que deseas eliminar esta consulta?')) {
      try {
        await api.deleteQuery(id)
        setQueries(queries.filter(q => q.id !== id))
      } catch (err) {
        alert(err.message || 'Error al eliminar la consulta')
      }
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
            <tr style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Fecha</th>
              <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Categoría</th>
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
                <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No hay consultas pendientes.</td>
              </tr>
            ) : (
              queries.map(q => (
                <tr key={q.id} style={{ borderBottom: '1px solid #e2e8f0', backgroundColor: q.status === 'Pendiente' ? '#fffbeb' : 'transparent' }}>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748b', whiteSpace: 'nowrap' }}>{q.date}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#3b82f6', fontWeight: '600', textTransform: 'capitalize' }}>{q.category || 'General'}</td>
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
                      <Link
                        to={`/admin/clientes?prefill_name=${encodeURIComponent(q.clientName)}&prefill_contact=${encodeURIComponent(q.contact)}`}
                        title="Crear Ficha de Pasajero"
                        style={{
                          padding: '0.375rem',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <UserPlus size={14} />
                      </Link>
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
