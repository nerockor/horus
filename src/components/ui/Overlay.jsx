import { Menu, Phone, MapPin, Calendar, X, Trash2, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function Overlay({ activeBookings = [], onCancelBooking, view = 'landing', setView }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)

  return (
    <div className="overlay-container" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 10,
      color: '#0f2d4a',
      padding: '4.5rem 2rem 2rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pointerEvents: 'auto'
      }}>
        {/* Clickable Logo serving as Router */}
        {view === 'landing' ? (
          <div 
            onClick={() => setView('booking')}
            style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              letterSpacing: '2px', 
              color: '#0f2d4a', 
              fontFamily: 'Outfit, sans-serif',
              cursor: 'pointer',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              userSelect: 'none'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '0 0 15px rgba(2,132,199,0.3)'
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = 'none'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            <span>HORUS TRAVEL</span>
            <span style={{ 
              fontSize: '0.65rem', 
              color: 'white', 
              background: 'var(--vivid-red)', 
              border: '1px solid var(--vivid-red)',
              padding: '0.25rem 0.6rem', 
              borderRadius: '20px', 
              letterSpacing: '0.05em',
              fontWeight: 'bold'
            }}>
              ➔ RESERVAR
            </span>
          </div>
        ) : (
          <div></div>
        )}
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {activeBookings.length > 0 && (
            <div style={{
              background: 'rgba(2, 132, 199, 0.12)',
              border: '1px solid rgba(2, 132, 199, 0.4)',
              color: '#0284c7',
              padding: '0.4rem 0.8rem',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}>
              <CheckCircle2 size={14} />
              {activeBookings.length} {activeBookings.length === 1 ? 'Reserva' : 'Reservas'}
            </div>
          )}
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: isOpen ? '#ef4444' : '#0f2d4a', 
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '50%',
              backgroundColor: isOpen ? 'rgba(239, 68, 68, 0.15)' : 'rgba(2, 132, 199, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              border: isOpen ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid transparent'
            }}
          >
            {isOpen ? <X size={24} color="#ef4444" /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Menú Lateral (Mis Reservas) */}
      <div style={{
        transform: isOpen ? 'translateX(0%)' : 'translateX(100%)',
        transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
        position: 'fixed',
        top: 0,
        right: 0,
        width: '380px',
        height: '100%',
        background: 'rgba(253, 251, 247, 0.98)',
        backdropFilter: 'blur(20px)',
        borderLeft: '1px solid rgba(2, 132, 199, 0.15)',
        padding: '5rem 1.5rem 2rem 1.5rem',
        pointerEvents: 'auto',
        zIndex: 11,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '-10px 0 30px rgba(15, 45, 74, 0.08)'
      }}>
        <div>
          <h3 style={{ 
            color: '#0f2d4a', 
            fontFamily: 'Outfit, sans-serif', 
            fontSize: '1.2rem', 
            letterSpacing: '1px',
            marginBottom: '0.5rem',
            borderBottom: '1px solid rgba(2, 132, 199, 0.15)',
            paddingBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>MIS RESERVAS</span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(15, 45, 74, 0.5)', fontWeight: 'normal' }}>
              Verificadas
            </span>
          </h3>

          {activeBookings.length === 0 ? (
            <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#0f2d4a' }}>
              <Calendar size={40} color="rgba(2, 132, 199, 0.3)" style={{ marginBottom: '1rem' }} />
              <p style={{ fontSize: '0.9rem', lineHeight: '1.5', margin: 0, fontWeight: '500' }}>
                No tienes reservas confirmadas todavía.
              </p>
              <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.5rem', margin: 0 }}>
                Haz click en "HORUS TRAVEL" o en el logo para ir al buscador de viajes, verificar el checklist y registrar tu itinerario.
              </p>
            </div>
          ) : (
            <div className="sidebar-reservations-list">
              {activeBookings.map((booking) => (
                <div key={booking.id} className="sidebar-reservation-card">
                  <span className="sidebar-res-badge verified">VERIFICADO</span>
                  <div className="sidebar-res-title">{booking.title}</div>
                  <div className="sidebar-res-meta">{booking.description}</div>
                  <div className="sidebar-res-meta" style={{ opacity: 0.6 }}>{booking.meta}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                    <div className="sidebar-res-price">{booking.price}</div>
                    <button
                      onClick={() => onCancelBooking(booking.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(239, 68, 68, 0.6)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.3rem',
                        borderRadius: '4px',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#ef4444'
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'rgba(239, 68, 68, 0.6)'
                        e.currentTarget.style.background = 'none'
                      }}
                      title="Cancelar Reserva"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: '#0284c7', opacity: 0.9, marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <span>✓</span> Verificado el {booking.verifiedAt}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contact and Help Box */}
        <div style={{ 
          background: 'rgba(2, 132, 199, 0.05)', 
          border: '1px solid rgba(2, 132, 199, 0.15)', 
          borderRadius: '12px',
          padding: '1.25rem',
          marginTop: '2rem',
          color: '#0f2d4a'
        }}>
          <h4 style={{ color: '#0284c7', margin: '0 0 0.5rem 0', fontSize: '0.9rem', fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>
            ¿NECESITAS AYUDA?
          </h4>
          <p style={{ fontSize: '0.75rem', opacity: 0.8, margin: '0 0 0.75rem 0', lineHeight: '1.4' }}>
            Contacta a un agente especialista en viajes de Horus.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
              <Phone size={12} color="#0284c7" />
              <span style={{ fontWeight: '500' }}>+54 9 11 5555-4321</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
              <MapPin size={12} color="#0284c7" />
              <span style={{ fontWeight: '500' }}>Giza Plateau, Egipto</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Status Bar */}
      <footer style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end',
        pointerEvents: 'auto',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
          {/* Floating Contact/Query Button and Form */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowContactForm(!showContactForm)}
              style={{
                background: 'linear-gradient(135deg, #ffd700, #ffb700)',
                color: '#0f2d4a',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.8rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(255, 215, 0, 0.3)',
                transition: 'all 0.2s',
                fontFamily: 'Inter, sans-serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 15px rgba(255, 215, 0, 0.45)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(255, 215, 0, 0.3)'
              }}
            >
              ✉ Consultar a un Agente
            </button>

            {showContactForm && (
              <div style={{
                position: 'absolute',
                bottom: '3rem',
                left: 0,
                width: '320px',
                backgroundColor: 'rgba(253, 251, 247, 0.98)',
                border: '1px solid rgba(2, 132, 199, 0.25)',
                borderRadius: '16px',
                padding: '1.25rem',
                boxShadow: '0 15px 35px rgba(15,45,74,0.15)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                zIndex: 100,
                backdropFilter: 'blur(20px)'
              }}>
                <h4 style={{ margin: 0, color: '#0f2d4a', fontSize: '0.95rem', fontFamily: 'Outfit, sans-serif', fontWeight: '700' }}>Enviar Consulta</h4>
                <input 
                  type="text" 
                  placeholder="Tu Nombre" 
                  id="query-name"
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(2,132,199,0.2)', backgroundColor: 'white', color: '#0f2d4a', fontSize: '0.8rem', outline: 'none' }}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Email o Teléfono" 
                  id="query-contact"
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(2,132,199,0.2)', backgroundColor: 'white', color: '#0f2d4a', fontSize: '0.8rem', outline: 'none' }}
                  required
                />
                <textarea 
                  placeholder="¿En qué podemos ayudarte?" 
                  id="query-message"
                  rows="3"
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(2,132,199,0.2)', backgroundColor: 'white', color: '#0f2d4a', fontSize: '0.8rem', resize: 'none', outline: 'none' }}
                  required
                ></textarea>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      const nameInput = document.getElementById('query-name');
                      const contactInput = document.getElementById('query-contact');
                      const messageInput = document.getElementById('query-message');
                      
                      if (!nameInput.value || !contactInput.value || !messageInput.value) {
                        alert('Por favor completa todos los campos.');
                        return;
                      }

                      const newQuery = {
                        id: `q-${Date.now()}`,
                        clientName: nameInput.value,
                        contact: contactInput.value,
                        message: messageInput.value,
                        date: new Date().toLocaleString('es-ES'),
                        status: 'Pendiente'
                      };

                      const existing = JSON.parse(localStorage.getItem('horus_queries') || '[]');
                      localStorage.setItem('horus_queries', JSON.stringify([newQuery, ...existing]));
                      
                      alert('Consulta enviada con éxito. Un agente te responderá pronto.');
                      setShowContactForm(false);
                    }}
                    style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none', backgroundColor: '#e11d48', color: 'white', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', transition: 'background-color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#be123c'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e11d48'}
                  >
                    Enviar
                  </button>
                  <button
                    onClick={() => setShowContactForm(false)}
                    style={{ padding: '0.6rem', borderRadius: '8px', border: '1px solid rgba(15,45,74,0.2)', backgroundColor: 'transparent', color: '#0f2d4a', fontSize: '0.8rem', cursor: 'pointer' }}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8, color: '#0f2d4a', fontWeight: '500' }}>
            LAT: 29.9792° N | LONG: 31.1342° E
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', opacity: 0.6, color: '#0f2d4a', fontWeight: '600' }}>ALTITUD</div>
            <div style={{ color: '#e11d48', fontWeight: 'bold' }}>3,500 FT</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', opacity: 0.6, color: '#0f2d4a', fontWeight: '600' }}>ESTADO</div>
            <div style={{ color: '#0284c7', fontWeight: 'bold' }}>VUELO ESTABLE</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
