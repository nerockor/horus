import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { MapPin, Smartphone, CreditCard, BadgePercent } from 'lucide-react'
import Overlay from './components/ui/Overlay'
import BookingPanel from './components/ui/BookingPanel'
import AdminApp from './components/admin/AdminApp'
import Footer from './components/ui/Footer'
import FooterPlaceholderPage from './components/ui/FooterPlaceholderPage'
import QuienesSomosPage from './components/ui/QuienesSomosPage'
import './App.css'

function PublicApp() {
  const [activeBookings, setActiveBookings] = useState([])
  const [view, setView] = useState('landing') // 'landing' or 'booking'
  const location = useLocation()

  // Open booking view when redirected from other pages with state
  useEffect(() => {
    if (location.state?.activeView) {
      setView(location.state.activeView)
      // Clean history state so refreshes behave normally
      window.history.replaceState({}, document.title)
    }
  }, [location])

  // Manage body scroll based on active view to prevent 3D scroll while in booking mode
  useEffect(() => {
    if (view === 'booking') {
      document.body.style.overflowY = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.body.style.overflowY = 'unset'
    }
    return () => {
      document.body.style.overflowY = 'unset'
    }
  }, [view])

  const handleAddBooking = (booking) => {
    setActiveBookings((prev) => [booking, ...prev])
  }

  const handleCancelBooking = (bookingId) => {
    setActiveBookings((prev) => prev.filter((b) => b.id !== bookingId))
  }

  // Create floating golden sparks and hieroglyphs
  const sparks = Array.from({ length: 25 }).map((_, i) => {
    const isHieroglyph = i % 4 === 0;
    const size = isHieroglyph ? Math.random() * 20 + 30 : Math.random() * 8 + 4; // 30px-50px for symbols
    const left = Math.random() * 100 // 0% to 100%
    const duration = Math.random() * 12 + 10 // 10s to 22s
    const delay = Math.random() * 10 // 0s to 10s
    return (
      <div 
        key={i} 
        className={isHieroglyph ? "gold-spark hieroglyph" : "gold-spark"} 
        style={{
          '--spark-size': `${size}px`,
          '--spark-left': `${left}%`,
          '--spark-dur': `${duration}s`,
          '--spark-delay': `${delay}s`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${size}px`,
          color: 'var(--gold)',
          opacity: isHieroglyph ? 0.04 : 0.5,
          background: isHieroglyph ? 'transparent' : 'var(--gold)'
        }}
      >
        {isHieroglyph ? ['☥', '𓊵', '𓄤', '𓂀'][i % 4] : ''}
      </div>
    )
  })

  return (
    <div className="tropical-app-wrapper" style={{ width: '100vw', position: 'relative' }}>

      {/* Top Utility Bar */}
      <div className="top-utility-bar">
        {/* Left Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '500' }}>
            <span>🇻🇪</span>
            <span style={{ color: '#0f2d4a', fontWeight: '600' }}>Agencia de viajes en Venezuela</span>
          </div>
          <span style={{ color: 'rgba(0, 83, 229, 0.15)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '500' }}>
            <MapPin size={13} color="#0053e5" />
            <span style={{ color: '#0f2d4a', fontWeight: '600' }}>Atención personalizada 24/7</span>
          </div>
        </div>

        {/* Right Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <span style={{ color: '#718096', fontWeight: '500' }}>Paga como prefieras:</span>
          
          {/* Zinli */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span style={{ 
              background: '#501e88', 
              color: '#ffffff', 
              padding: '1px 4px', 
              borderRadius: '3px', 
              fontSize: '0.55rem', 
              fontWeight: '900',
              lineHeight: 1
            }}>
              zi
            </span>
            <span style={{ fontWeight: '600', color: '#0f2d4a' }}>Zinli</span>
          </div>

          {/* Binance Pay */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#F0B90B" style={{ display: 'block' }}>
              <path d="M12 0L3.6 8.4L6 10.8L12 4.8L18 10.8L20.4 8.4L12 0ZM3.6 15.6L12 24L20.4 15.6L18 13.2L12 19.2L6 13.2L3.6 15.6ZM0 12L3.6 8.4L6 10.8L2.4 14.4L6 18L3.6 20.4L0 12ZM20.4 8.4L24 12L20.4 20.4L18 18L21.6 14.4L18 10.8L20.4 8.4Z" />
            </svg>
            <span style={{ fontWeight: '600', color: '#0f2d4a' }}>Binance Pay</span>
          </div>

          {/* Pago Móvil */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Smartphone size={13} color="#0053e5" />
            <span style={{ fontWeight: '600', color: '#0f2d4a' }}>Pago Móvil</span>
          </div>

          {/* Zelle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <span style={{ 
              color: '#ffffff', 
              background: '#7414ca', 
              padding: '1px 4px', 
              borderRadius: '3px', 
              fontSize: '0.55rem', 
              fontWeight: '950', 
              lineHeight: 1 
            }}>
              z
            </span>
            <span style={{ fontWeight: '750', color: '#7414ca' }}>Zelle</span>
          </div>

          {/* Tarjeta Internacional */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <CreditCard size={13} color="#0053e5" />
            <span style={{ fontWeight: '600', color: '#0f2d4a' }}>Tarjeta Internacional</span>
          </div>

          {/* Cuotas disponibles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <BadgePercent size={13} color="#0053e5" />
            <span style={{ fontWeight: '600', color: '#0f2d4a' }}>Cuotas disponibles</span>
          </div>
        </div>
      </div>

      {/* Animated Golden Sparks */}
      <div className="golden-sparks-bg">
        {sparks}
      </div>

      {/* Capa de Interfaz */}
      <Overlay 
        activeBookings={activeBookings} 
        onCancelBooking={handleCancelBooking} 
        view={view}
        setView={setView}
      />

      <main style={{ pointerEvents: 'none', position: 'relative', zIndex: 10, width: '100%' }}>
        {view === 'landing' ? (
          <div style={{ 
            height: '100vh', 
            width: '100vw',
            overflowY: 'auto',
            display: 'flex', 
            flexDirection: 'column',
            pointerEvents: 'auto'
          }} className="hide-scrollbar">
            {/* Seccion 1: Landing Intro */}
            <section style={{ 
              minHeight: '100vh', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxSizing: 'border-box',
              flexShrink: 0
            }}>
              <h1 
                onClick={() => setView('booking')}
                style={{ 
                  color: '#e11d48', // Vivid Red
                  fontSize: '5rem', 
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  textTransform: 'uppercase', 
                  letterSpacing: '0.6rem',
                  textShadow: '0 0 25px rgba(255, 215, 0, 0.4)',
                  margin: 0,
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.color = '#0284c7' // Sea Blue on hover
                  e.currentTarget.style.textShadow = '0 0 45px rgba(255, 215, 0, 0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.color = '#e11d48'
                  e.currentTarget.style.textShadow = '0 0 25px rgba(255, 215, 0, 0.4)'
                }}
                title="Click para Reservar"
              >
                Horus
              </h1>
              <p style={{ 
                color: '#0f2d4a', // Deep sea blue
                fontSize: '1rem', 
                letterSpacing: '0.2rem', 
                opacity: 0.8, 
                marginTop: '1rem',
                textShadow: '0 1px 1px rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: '600'
              }}>
                Reserva & Verificación Antigravitacional
              </p>
              
              <button
                onClick={() => setView('booking')}
                style={{
                  pointerEvents: 'auto',
                  marginTop: '2.5rem',
                  fontSize: '0.85rem',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '30px',
                  background: 'linear-gradient(135deg, #0284c7, #e11d48)', // Sea blue & vivid red
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(2, 132, 199, 0.2), 0 0 0 2px #ffd700', // Gold border glow
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #e11d48, #0284c7)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(225, 29, 72, 0.3), 0 0 0 3px #ffd700'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #0284c7, #e11d48)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(2, 132, 199, 0.2), 0 0 0 2px #ffd700'
                }}
              >
                Ingresar al Buscador
              </button>
            </section>
            <Footer />
          </div>
        ) : (
          <section style={{ 
            height: '100vh', 
            width: '100vw',
            overflowY: 'auto',
            padding: '3.8rem 2rem 0 2rem', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            pointerEvents: 'auto',
            boxSizing: 'border-box',
            animation: 'fadeIn 0.5s ease-out'
          }} className="hide-scrollbar">
            <div style={{ flexGrow: 1, width: '100%', maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '3rem' }}>
              <BookingPanel activeBookings={activeBookings} onAddBooking={handleAddBooking} setView={setView} />
            </div>
            <Footer />
          </section>
        )}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      
      {/* Footer Placeholder Routes */}
      <Route path="/terminos-y-condiciones" element={<FooterPlaceholderPage title="Términos y condiciones" />} />
      <Route path="/terminos-de-uso" element={<FooterPlaceholderPage title="Términos de uso" />} />
      <Route path="/quienes-somos" element={<QuienesSomosPage />} />
      <Route path="/privacidad" element={<FooterPlaceholderPage title="Privacidad" />} />
      <Route path="/informacion-legal" element={<FooterPlaceholderPage title="Información legal" />} />
      <Route path="/empleos" element={<FooterPlaceholderPage title="Empleos" />} />
      <Route path="/seguridad" element={<FooterPlaceholderPage title="Seguridad" />} />
      <Route path="/derechos-del-pasajero" element={<FooterPlaceholderPage title="Derechos del pasajero" />} />
      <Route path="/alertas-de-viaje" element={<FooterPlaceholderPage title="Alertas de viaje" />} />
      <Route path="/prensa" element={<FooterPlaceholderPage title="Prensa" />} />
      <Route path="/declaracion-esclavitud-moderna" element={<FooterPlaceholderPage title="Declaración esclavitud moderna" />} />
      <Route path="/ideas-no-solicitadas" element={<FooterPlaceholderPage title="Ideas no solicitadas" />} />

      <Route path="/*" element={<PublicApp />} />
    </Routes>
  )
}
