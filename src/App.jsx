import { useState, useEffect } from 'react'
import Scene from './components/3d/Scene'
import Overlay from './components/ui/Overlay'
import BookingPanel from './components/ui/BookingPanel'

function App() {
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

  return (
    <div style={{ width: '100vw', position: 'relative' }}>
      {/* Capa 3D de fondo fijada */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <Scene />
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
                  color: '#ffd700', 
                  fontSize: '5rem', 
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  textTransform: 'uppercase', 
                  letterSpacing: '0.6rem',
                  textShadow: '0 0 45px rgba(255, 215, 0, 0.4)',
                  margin: 0,
                  pointerEvents: 'auto',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)'
                  e.currentTarget.style.textShadow = '0 0 60px rgba(255, 215, 0, 0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.textShadow = '0 0 45px rgba(255, 215, 0, 0.4)'
                }}
                title="Click para Reservar"
              >
                Horus
              </h1>
              <p style={{ 
                color: 'white', 
                fontSize: '1rem', 
                letterSpacing: '0.2rem', 
                opacity: 0.6, 
                marginTop: '1rem',
                textShadow: '0 0 10px rgba(0,0,0,0.5)',
                textTransform: 'uppercase',
                fontFamily: 'Outfit, sans-serif'
              }}>
                Reserva & Verificación Antigravitacional
              </p>
              
              <button
                onClick={() => setView('booking')}
                style={{
                  pointerEvents: 'auto',
                  marginTop: '2.5rem',
                  fontSize: '0.8rem',
                  color: '#2dd4bf',
                  border: '1px solid rgba(45, 212, 191, 0.25)',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '20px',
                  background: 'rgba(45, 212, 191, 0.05)',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(45, 212, 191, 0.15)'
                  e.currentTarget.style.borderColor = '#2dd4bf'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(45, 212, 191, 0.05)'
                  e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.25)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Ingresar al Buscador
              </button>
              
              <div style={{
                marginTop: '4rem',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>↓</span> O haz scroll para explorar las islas 3D
              </div>
            </section>
            
            {/* Espacio para la animación de Scroll en la Landing Page */}
            <div style={{ height: '300vh' }}></div>
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
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s',
                  fontFamily: 'Inter, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
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

export default App
