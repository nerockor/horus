import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, Users, Image as ImageIcon, LogOut, ShieldAlert, MessageSquare, Package, Contact } from 'lucide-react'

export default function AdminLayout({ user, onLogout, children }) {
  const location = useLocation()

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'vendedor'] },
    { path: '/admin/reservas', label: 'Reservas y Pagos', icon: CalendarDays, roles: ['admin', 'vendedor'] },
    { path: '/admin/clientes', label: 'Fichas Pasajeros', icon: Contact, roles: ['admin', 'vendedor'] },
    { path: '/admin/consultas', label: 'Consultas', icon: MessageSquare, roles: ['admin', 'vendedor'] },
    { path: '/admin/paquetes', label: 'Servicios / Ofertas', icon: Package, roles: ['admin', 'vendedor'] },
    { path: '/admin/usuarios', label: 'Usuarios Vendedores', icon: Users, roles: ['admin'] },
    { path: '/admin/contenido', label: 'Imágenes y Contenido', icon: ImageIcon, roles: ['admin', 'vendedor'] },
  ]

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, color: '#f8fafc' }}>Horus Admin</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
            <div style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%' }}></div>
            <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>
              Hola, <strong style={{ color: 'white', textTransform: 'capitalize' }}>{user.username}</strong>
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <ShieldAlert size={12} />
            Rol: {user.role === 'admin' ? 'Administrador' : 'Vendedor'}
          </div>
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {navItems.filter(item => item.roles.includes(user.role)).map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: isActive ? 'white' : '#94a3b8',
                  backgroundColor: isActive ? '#1e293b' : 'transparent',
                  transition: 'all 0.2s',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid #1e293b' }}>
          <button
            onClick={onLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#ef4444',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header style={{ backgroundColor: 'white', padding: '1.25rem 2rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#3b82f6', fontSize: '0.875rem', fontWeight: '500' }}>
            Ver Sitio Público ➔
          </Link>
        </header>
        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
