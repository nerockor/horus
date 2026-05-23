import { useNavigate } from 'react-router-dom'
import { MapPin, Globe, Award, Shield, CheckCircle, Clock, Heart, ArrowLeft, Smartphone, CreditCard, BadgePercent } from 'lucide-react'
import Footer from './Footer'

export default function QuienesSomosPage() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: '#090d16',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      color: '#ffffff',
      overflowX: 'hidden'
    }}>
      {/* Background radial glow */}
      <div style={{
        position: 'absolute',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(2, 132, 199, 0.1) 0%, transparent 80%)',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* 1. Top Utility Bar */}
      <div className="top-utility-bar" style={{ position: 'relative', zIndex: 10 }}>
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

      {/* Header / Logo Navigation */}
      <header style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
        boxSizing: 'border-box'
      }}>
        <div 
          onClick={() => navigate('/')}
          style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            letterSpacing: '2px', 
            color: '#ffffff', 
            fontFamily: 'Outfit, sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            userSelect: 'none'
          }}
        >
          HORUS TRAVEL
        </div>

        <button
          onClick={() => navigate('/')}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            padding: '0.5rem 1.2rem',
            borderRadius: '20px',
            fontSize: '0.8rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s',
            fontFamily: 'Inter, sans-serif'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'
          }}
        >
          <ArrowLeft size={14} />
          Volver al Inicio
        </button>
      </header>

      {/* Main Content Area */}
      <main style={{
        flexGrow: 1,
        width: '100%',
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 2rem 5rem 2rem',
        position: 'relative',
        zIndex: 5,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem'
      }}>
        
        {/* Intro Hero Section */}
        <section style={{ textAlign: 'center', marginTop: '1rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            fontFamily: 'Outfit, sans-serif',
            letterSpacing: '-1px',
            background: 'linear-gradient(135deg, #ffffff 40%, #0284c7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 1rem 0'
          }}>
            Quiénes Somos
          </h1>
          <h3 style={{
            fontSize: '1.25rem',
            color: '#38bdf8',
            fontWeight: '700',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}>
            ¡Date el respiro que te mereces con Horustoursvip! 🇻🇪✨
          </h3>
          <div className="booking-glass-card" style={{ padding: '2rem', textAlign: 'left', lineHeight: '1.7', color: '#e2e8f0' }}>
            <p style={{ margin: '0 0 1rem 0', fontSize: '1.05rem', fontWeight: '500' }}>
              Sabemos que el día a día es pesado, que prender las noticias abruma y que cuidar el bolsillo es prioridad absoluta. Vivir estresado no es vida. Por eso, en <strong>Horustoursvip</strong> nos encargamos de absolutamente todo para que tú solo te preocupes por desconectar la mente y recargar energías.
            </p>
            <p style={{ margin: 0, fontSize: '1.05rem', fontWeight: '500', color: '#93c5fd' }}>
              Te ofrecemos opciones flexibles que se ajustan a tu realidad, garantizándote el máximo valor por cada dólar invertido.
            </p>
          </div>
        </section>

        {/* Section 1: Escape Nacional */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '0.5rem', borderRadius: '10px' }}>
              <MapPin size={22} color="#38bdf8" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
              Tu escape nacional: Paz sin salir del país
            </h2>
          </div>
          <p style={{ color: '#a0aec0', fontSize: '0.95rem', margin: '0 0 0.5rem 0' }}>
            No hace falta ir muy lejos para aislarte del ruido del mundo. Tenemos los mejores paquetes desde Caracas:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {/* Margarita */}
            <div className="booking-glass-card" style={{ padding: '1.5rem' }}>
              <h4 style={{ color: '#38bdf8', fontSize: '1.1rem', fontWeight: '700', margin: '0 0 0.75rem 0' }}>
                Margarita & Sunsol Ecoland
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
                Disfruta de gastronomía de alta calidad, piscinas relajantes, spa y los mejores atardeceres en Punta Zaragoza.
              </p>
            </div>
            {/* Los Roques */}
            <div className="booking-glass-card" style={{ padding: '1.5rem' }}>
              <h4 style={{ color: '#38bdf8', fontSize: '1.1rem', fontWeight: '700', margin: '0 0 0.75rem 0' }}>
                Los Roques
              </h4>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
                Desconéctate por completo en playas vírgenes y aguas cristalinas. El destino perfecto para respirar paz profunda, conectar con la naturaleza o liberar adrenalina con actividades extremas.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Destinos Internacionales */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', padding: '0.5rem', borderRadius: '10px' }}>
              <Globe size={22} color="#38bdf8" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
              Destinos Internacionales: Viaja seguro y sin rollos
            </h2>
          </div>
          <p style={{ color: '#a0aec0', fontSize: '0.95rem', margin: '0 0 0.5rem 0' }}>
            Si tu meta es cruzar fronteras (América Latina, Caribe, Europa o Asia), el contexto geopolítico actual exige viajar con pies de plomo.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="booking-glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ marginTop: '0.2rem' }}><CheckCircle size={18} color="#10b981" /></div>
              <div>
                <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.25rem' }}>Cero estrés con el papeleo</strong>
                <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Nuestro equipo activo se encarga de gestionar tus vuelos, rutas optimizadas, documentación y visas.</span>
              </div>
            </div>

            <div className="booking-glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ marginTop: '0.2rem' }}><Shield size={18} color="#10b981" /></div>
              <div>
                <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.25rem' }}>Monitoreo constante</strong>
                <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Te damos recomendaciones de seguridad actualizadas en tiempo real para que viajes con total tranquilidad.</span>
              </div>
            </div>

            <div className="booking-glass-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ marginTop: '0.2rem' }}><Award size={18} color="#10b981" /></div>
              <div>
                <strong style={{ color: '#ffffff', display: 'block', marginBottom: '0.25rem' }}>Paquetes todo incluido</strong>
                <span style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>Alianzas con socios internacionales de confianza para evitarte sorpresas desagradables o gastos imprevistos.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Por que cuadrar con nosotros */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.25)', padding: '0.5rem', borderRadius: '10px' }}>
              <Award size={22} color="#ffd700" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
              ¿Por qué cuadrar tu viaje con Horustoursvip?
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
            <div className="booking-glass-card" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={24} color="#ffd700" />
              <strong style={{ fontSize: '0.95rem', color: '#ffffff', marginTop: '0.5rem' }}>Ahorro de Tiempo y Dinero</strong>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>
                Conseguimos tarifas exclusivas y optimizamos las rutas para que tu presupuesto rinda de verdad.
              </p>
            </div>

            <div className="booking-glass-card" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={24} color="#ffd700" />
              <strong style={{ fontSize: '0.95rem', color: '#ffffff', marginTop: '0.5rem' }}>Asesoría Humana y Honesta</strong>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>
                Hablamos claro, sin vueltas. Nos adaptamos a lo que buscas y a lo que puedes gastar.
              </p>
            </div>

            <div className="booking-glass-card" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={24} color="#ffd700" />
              <strong style={{ fontSize: '0.95rem', color: '#ffffff', marginTop: '0.5rem' }}>Respaldo Total</strong>
              <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.5', margin: 0 }}>
                Somos una agencia de confianza en Caracas que da la cara por ti desde el primer día.
              </p>
            </div>
          </div>

          {/* Final CTA Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <button
              onClick={() => navigate('/')}
              className="search-submit-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.9rem 2.5rem',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Comienza a Planificar tu Viaje
            </button>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
