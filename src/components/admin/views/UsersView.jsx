import { useState, useEffect } from 'react'

export default function UsersView() {
  const [users, setUsers] = useState([])
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('horus_users') || '[]')
    setUsers(data)
  }, [])

  const handleAddUser = (e) => {
    e.preventDefault()
    if (!newUsername || !newPassword) return

    const newUser = { id: Date.now().toString(), username: newUsername, password: newPassword, role: 'vendedor' }
    const updatedUsers = [...users, newUser]
    setUsers(updatedUsers)
    localStorage.setItem('horus_users', JSON.stringify(updatedUsers))
    setNewUsername('')
    setNewPassword('')
  }

  const deleteUser = (id) => {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      const updated = users.filter(u => u.id !== id)
      setUsers(updated)
      localStorage.setItem('horus_users', JSON.stringify(updated))
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>Gestión de Usuarios Vendedores</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>Nuevo Vendedor</h3>
          <form onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Usuario</label>
              <input 
                type="text" 
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Contraseña</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                required
              />
            </div>
            <button 
              type="submit"
              style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', marginTop: '0.5rem' }}
            >
              Crear Usuario
            </button>
          </form>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Usuario</th>
                <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Rol</th>
                <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/* Default Admin */}
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1e293b', fontWeight: '500' }}>samir</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#10b981', fontWeight: '600' }}>Admin</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748b' }}>Predeterminado</td>
              </tr>
              {users.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1e293b', fontWeight: '500' }}>{user.username}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748b' }}>{user.role}</td>
                  <td style={{ padding: '1rem' }}>
                    <button 
                      onClick={() => deleteUser(user.id)}
                      style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '500' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
