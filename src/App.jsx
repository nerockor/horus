import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Overlay from './components/ui/Overlay'
import BookingPanel from './components/ui/BookingPanel'
import AdminApp from './components/admin/AdminApp'
import './App.css'

function PublicApp() {
  const [activeBookings, setActiveBookings] = useState([])
  const [view, setView] = useState('landing') // 'landing' or 'booking'

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
          <>
            {/* Seccion 1: Landing Intro */}
            <section style={{ 
              height: '100vh', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxSizing: 'border-box'
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
          </>
        ) : (
          /* Seccion de Buscador (Página Independiente) */
          <section style={{ 
            height: '100vh', 
            width: '100vw',
            overflowY: 'auto',
            padding: '6rem 2rem 4rem 2rem', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            pointerEvents: 'auto',
            boxSizing: 'border-box',
            animation: 'fadeIn 0.5s ease-out'
          }} className="hide-scrollbar">
            
            {/* Back Button inside the Page */}
            <div style={{ width: '100%', maxWidth: '1200px', marginBottom: '1rem', display: 'flex', justifyContent: 'flex-start' }}>
              <button
                onClick={() => setView('landing')}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(2, 132, 199, 0.2)',
                  color: '#0f2d4a',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  transition: 'all 0.2s',
                  fontFamily: 'Inter, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--sea-blue)'
                  e.currentTarget.style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'
                  e.currentTarget.style.color = '#0f2d4a'
                }}
              >
                ← Volver al Inicio
              </button>
            </div>

            <BookingPanel activeBookings={activeBookings} onAddBooking={handleAddBooking} />
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
      <Route path="/*" element={<PublicApp />} />
    </Routes>
  )
}
