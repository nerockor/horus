import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { api } from '../../api'
import Login from './Login'
import AdminLayout from './AdminLayout'
import DashboardView from './views/DashboardView'
import BookingsView from './views/BookingsView'
import UsersView from './views/UsersView'
import ContentView from './views/ContentView'
import QueriesView from './views/QueriesView'
import PackagesView from './views/PackagesView'
import ClientsView from './views/ClientsView'
import BlogAdmin from '../blog/BlogAdmin'

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

  const handleLogout = async () => {
    try {
      await api.logout()
    } catch (e) {
      console.error('Logout error:', e)
    }
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
        <Route path="/clientes" element={<ClientsView />} />
        <Route path="/consultas" element={<QueriesView />} />
        <Route path="/paquetes" element={<PackagesView />} />
        {user.role === 'admin' && (
          <Route path="/usuarios" element={<UsersView />} />
        )}
        {user.role === 'admin' && (
          <Route path="/blog" element={<BlogAdmin />} />
        )}
        <Route path="/contenido" element={<ContentView />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  )
}
