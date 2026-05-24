import { useEffect, useState } from 'react'
import { 
  Users, CheckCircle, AlertTriangle, ShieldAlert, DollarSign, 
  Package, CalendarDays, TrendingUp, ArrowUpRight, Award, MapPin, Inbox
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { api } from '../../../api'

export default function DashboardView() {
  const [stats, setStats] = useState({
    bookingsCount: 0,
    usersCount: 0,
    clientsCount: 0,
    paidClientsCount: 0,
    pendingApprovalCount: 0,
    debtClientsCount: 0,
    totalDebtAmount: 0
  })
  
  const [popularPackages, setPopularPackages] = useState([])

  useEffect(() => {
    Promise.all([
      api.getBookings(),
      api.getUsers(),
      api.getClients(),
      api.getPackages()
    ]).then(([bookings, users, clients, packages]) => {
      // Calculations for Clients
      const clientsCount = clients.length
      const paidClientsCount = clients.filter(c => (c.paymentStatus || 'paid') === 'paid').length
      const pendingApprovalCount = clients.filter(c => (c.approvalStatus || 'approved') === 'pending').length
      const debtClients = clients.filter(c => (c.paymentStatus || 'paid') === 'debt')
      const debtClientsCount = debtClients.length
      const totalDebtAmount = debtClients.reduce((sum, c) => sum + parseFloat(c.debtAmount || 0), 0)

      setStats({
        bookingsCount: bookings.length,
        usersCount: users.length,
        clientsCount,
        paidClientsCount,
        pendingApprovalCount,
        debtClientsCount,
        totalDebtAmount
      })

      // Sort packages by consultations descending
      const sortedPackages = [...packages]
        .filter(p => p.consultations !== undefined)
        .sort((a, b) => (b.consultations || 0) - (a.consultations || 0))
        .slice(0, 5) // Show top 5

      setPopularPackages(sortedPackages)
    }).catch(err => console.error('Error fetching dashboard statistics:', err))
  }, [])


  // Find max consultations for progress bar scale
  const maxConsultations = popularPackages.length > 0 
    ? Math.max(...popularPackages.map(p => p.consultations || 1)) 
    : 100

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', color: '#1e293b' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#0f172a', margin: '0 0 0.25rem 0' }}>
          Dashboard Horus
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
          Resumen analítico de actividad, control financiero y popularidad de servicios.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        
        {/* Total Pasajeros */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', margin: '0 0 0.5rem 0', fontWeight: '600', letterSpacing: '0.05em' }}>Pasajeros Registrados</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>{stats.clientsCount}</p>
          </div>
          <div style={{ backgroundColor: '#eff6ff', padding: '0.75rem', borderRadius: '8px', color: '#2563eb' }}>
            <Users size={24} />
          </div>
        </div>

        {/* Abonados / Al Dia */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', margin: '0 0 0.5rem 0', fontWeight: '600', letterSpacing: '0.05em' }}>Abonados / Al Día</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#166534', margin: 0 }}>{stats.paidClientsCount}</p>
          </div>
          <div style={{ backgroundColor: '#f0fdf4', padding: '0.75rem', borderRadius: '8px', color: '#16a34a' }}>
            <CheckCircle size={24} />
          </div>
        </div>

        {/* Con Deuda */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', margin: '0 0 0.5rem 0', fontWeight: '600', letterSpacing: '0.05em' }}>Con Deudas</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#991b1b', margin: 0 }}>{stats.debtClientsCount}</p>
          </div>
          <div style={{ backgroundColor: '#fef2f2', padding: '0.75rem', borderRadius: '8px', color: '#dc2626' }}>
            <AlertTriangle size={24} />
          </div>
        </div>

        {/* Monto de Deuda */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', margin: '0 0 0.5rem 0', fontWeight: '600', letterSpacing: '0.05em' }}>Total Adeudado</h3>
            <p style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#d97706', margin: 0 }}>
              USD ${stats.totalDebtAmount.toLocaleString('es-ES', { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div style={{ backgroundColor: '#fffbeb', padding: '0.75rem', borderRadius: '8px', color: '#d97706' }}>
            <DollarSign size={24} />
          </div>
        </div>

        {/* Pendientes Aprobacion */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', margin: '0 0 0.5rem 0', fontWeight: '600', letterSpacing: '0.05em' }}>Pendientes Aprobación</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#854d0e', margin: 0 }}>{stats.pendingApprovalCount}</p>
          </div>
          <div style={{ backgroundColor: '#fef3c7', padding: '0.75rem', borderRadius: '8px', color: '#d97706' }}>
            <ShieldAlert size={24} />
          </div>
        </div>

        {/* Total Reservas */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', margin: '0 0 0.5rem 0', fontWeight: '600', letterSpacing: '0.05em' }}>Total Reservas</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#312e81', margin: 0 }}>{stats.bookingsCount}</p>
          </div>
          <div style={{ backgroundColor: '#e0e7ff', padding: '0.75rem', borderRadius: '8px', color: '#4f46e5' }}>
            <CalendarDays size={24} />
          </div>
        </div>

      </div>

      {/* Main Layout Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1.25fr', gap: '1.5rem', alignItems: 'start' }}>
        
        {/* Most Consulted Packages Table */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={20} style={{ color: '#2563eb' }} /> Servicios / Paquetes Más Consultados
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.15rem 0 0 0' }}>
                Top de consultas acumuladas por los usuarios desde la web pública.
              </p>
            </div>
            <Link to="/admin/paquetes" style={{ textDecoration: 'none', color: '#2563eb', fontSize: '0.8rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              Ver Todos <ArrowUpRight size={14} />
            </Link>
          </div>

          <div style={{ padding: '1.25rem' }}>
            {popularPackages.length === 0 ? (
              <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                <Inbox size={32} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
                <div>No se registran consultas de paquetes.</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {popularPackages.map((p, index) => {
                  const percent = Math.round(((p.consultations || 0) / maxConsultations) * 100)
                  
                  return (
                    <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: index < popularPackages.length - 1 ? '1px solid #f1f5f9' : 'none', paddingBottom: '1rem' }}>
                      
                      {/* Image */}
                      <img 
                        src={p.imageUrl || 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=120&q=80'} 
                        alt={p.name}
                        style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }}
                      />

                      {/* Content Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.25rem' }}>
                          <div>
                            <span style={{
                              display: 'inline-block',
                              padding: '0.15rem 0.35rem',
                              borderRadius: '4px',
                              fontSize: '0.65rem',
                              fontWeight: '700',
                              backgroundColor: '#f1f5f9',
                              color: '#475569',
                              textTransform: 'uppercase',
                              marginBottom: '0.15rem'
                            }}>
                              {p.category}
                            </span>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#1e293b', margin: 0 }}>{p.name}</h4>
                            <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.1rem' }}>
                              <MapPin size={12} /> {p.location}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#2563eb' }}>{p.consultations || 0}</span>
                            <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block' }}>Consultas</span>
                          </div>
                        </div>

                        {/* Progress Bar representational */}
                        <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden', marginTop: '0.5rem' }}>
                          <div style={{
                            width: `${percent}%`,
                            height: '100%',
                            backgroundColor: index === 0 ? '#3b82f6' : (index === 1 ? '#60a5fa' : '#93c5fd'),
                            borderRadius: '3px',
                            transition: 'width 0.5s ease-in-out'
                          }}></div>
                        </div>

                      </div>

                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Administrative Quick Actions */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.25rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
            <Award size={18} style={{ color: '#10b981' }} /> Enlaces Rápidos
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            
            <Link to="/admin/clientes" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              textDecoration: 'none',
              color: '#334155',
              fontSize: '0.85rem',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
            >
              <span>Ver Fichas Pasajeros</span>
              <ArrowUpRight size={16} style={{ color: '#94a3b8' }} />
            </Link>

            <Link to="/admin/reservas" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              textDecoration: 'none',
              color: '#334155',
              fontSize: '0.85rem',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
            >
              <span>Ver Reservas y Pagos</span>
              <ArrowUpRight size={16} style={{ color: '#94a3b8' }} />
            </Link>

            <Link to="/admin/consultas" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              textDecoration: 'none',
              color: '#334155',
              fontSize: '0.85rem',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
            >
              <span>Atender Consultas</span>
              <ArrowUpRight size={16} style={{ color: '#94a3b8' }} />
            </Link>

            <Link to="/admin/paquetes" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              textDecoration: 'none',
              color: '#334155',
              fontSize: '0.85rem',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
            >
              <span>Gestionar Ofertas</span>
              <ArrowUpRight size={16} style={{ color: '#94a3b8' }} />
            </Link>

          </div>

          <div style={{ marginTop: '1.25rem', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', fontSize: '0.75rem', color: '#1e40af' }}>
            <strong>Nota de Uso:</strong> Las consultas aumentan cada vez que los clientes seleccionan y consultan detalles de un paquete en el buscador público.
          </div>
        </div>

      </div>

    </div>
  )
}
