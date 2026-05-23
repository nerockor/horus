import { useNavigate } from 'react-router-dom'
import { AlertTriangle, ArrowLeft } from 'lucide-react'

export default function FooterPlaceholderPage({ title }) {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: '#090d16',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      boxSizing: 'border-box',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(2, 132, 199, 0.15) 0%, transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* Main glass card container */}
      <div className="booking-glass-card" style={{
        maxWidth: '550px',
        width: '100%',
        textAlign: 'center',
        padding: '3rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Warning Icon */}
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(239, 68, 68, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '0.5rem',
          border: '1px solid rgba(239, 68, 68, 0.2)'
        }}>
          <AlertTriangle size={30} color="#ef4444" />
        </div>

        {/* 404 Badge */}
        <span style={{
          fontSize: '0.7rem',
          fontWeight: '900',
          color: '#ef4444',
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          padding: '0.25rem 0.75rem',
          borderRadius: '20px',
          letterSpacing: '2px',
          textTransform: 'uppercase'
        }}>
          404 - Sin Información
        </span>

        {/* Page Title */}
        <h2 style={{
          fontSize: '1.75rem',
          fontWeight: '800',
          color: '#ffffff',
          margin: 0,
          fontFamily: 'Outfit, sans-serif',
          letterSpacing: '-0.5px'
        }}>
          {title}
        </h2>

        {/* Description */}
        <p style={{
          fontSize: '0.9rem',
          color: '#a0aec0',
          lineHeight: '1.6',
          margin: 0,
          fontWeight: '500'
        }}>
          Esta sección se encuentra actualmente sin información cargada. Si necesitas asistencia inmediata, puedes contactar a nuestro equipo de soporte técnico 24/7.
        </p>

        {/* Back button with gold border casino styling */}
        <button
          onClick={() => navigate('/')}
          className="search-submit-btn"
          style={{
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.8rem 2rem',
            fontSize: '0.85rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          <ArrowLeft size={16} />
          Volver al Inicio
        </button>
      </div>
    </div>
  )
}
