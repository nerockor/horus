import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Login from './Login'
import AdminLayout from './AdminLayout'
import DashboardView from './views/DashboardView'
import BookingsView from './views/BookingsView'
import UsersView from './views/UsersView'
import ContentView from './views/ContentView'

export default function AdminApp() {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const savedUser = localStorage.getItem('horus_admin_session')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('horus_admin_session', JSON.stringify(userData))
    navigate('/admin')
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('horus_admin_session')
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <AdminLayout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<DashboardView />} />
        <Route path="/reservas" element={<BookingsView />} />
        {user.role === 'admin' && (
          <Route path="/usuarios" element={<UsersView />} />
        )}
        <Route path="/contenido" element={<ContentView />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  )
}
