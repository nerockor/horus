import { Link } from 'react-router-dom'

const AwardBadge = ({ title, line1, line2 }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    color: '#ffffff', 
    textAlign: 'center', 
    width: '240px', 
    margin: '1rem' 
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.6rem' }}>
      <svg width="70" height="55" viewBox="0 0 100 80" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round">
        {/* Left branch */}
        <path d="M 30,70 C 12,60 12,30 30,15" />
        <path d="M 30,70 L 25,65" />
        <path d="M 25,55 L 18,52" />
        <path d="M 22,40 L 14,37" />
        <path d="M 25,25 L 18,20" />
        {/* Right branch */}
        <path d="M 70,70 C 88,60 88,30 70,15" />
        <path d="M 70,70 L 75,65" />
        <path d="M 75,55 L 82,52" />
        <path d="M 78,40 L 86,37" />
        <path d="M 75,25 L 82,20" />
        {/* Star */}
        <path d="M 50,20 L 53,28 L 61,28 L 55,33 L 57,41 L 50,36 L 43,41 L 45,33 L 39,28 L 47,28 Z" fill="#ffffff" />
      </svg>
    </div>
    <span style={{ fontSize: '0.8rem', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>{title}</span>
    <span style={{ fontSize: '0.65rem', opacity: 0.8, marginTop: '0.25rem', fontWeight: '500' }}>{line1}</span>
    <span style={{ fontSize: '0.6rem', opacity: 0.6, fontWeight: '500' }}>{line2}</span>
  </div>
)

export default function Footer() {
  const footerLinks = [
    { label: 'Términos y condiciones', path: '/terminos-y-condiciones' },
    { label: 'Términos de uso', path: '/terminos-de-uso' },
    { label: 'Quiénes somos', path: '/quienes-somos' },
    { label: 'Blog', path: '/blog' },
    { label: 'Información legal', path: '/informacion-legal' },
    { label: 'Empleos', path: '/empleos' },
    { label: 'Seguridad', path: '/seguridad' },
    { label: 'Derechos del pasajero', path: '/derechos-del-pasajero' },
    { label: 'Alertas de viaje', path: '/alertas-de-viaje' },
    { label: 'Prensa', path: '/prensa' },
    { label: 'Declaración esclavitud moderna', path: '/declaracion-esclavitud-moderna' },
    { label: 'Ideas no solicitadas', path: '/ideas-no-solicitadas' }
  ]

  return (
    <footer style={{
      width: '100%',
      position: 'relative',
      marginTop: 'auto',
      borderTop: '4px solid transparent',
      background: 'linear-gradient(var(--header-blue), var(--header-blue-hover)) padding-box, linear-gradient(90deg, #ffe600, #ffc800, #ff8800, #ffe600) border-box',
      padding: '3rem 2rem 2rem 2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem',
      boxSizing: 'border-box',
      zIndex: 20,
      pointerEvents: 'auto'
    }}>
      {/* 1. Award Seals */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '2rem',
        maxWidth: '1200px',
        width: '100%',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        paddingBottom: '2rem'
      }}>
        <AwardBadge 
          title="Best Travel Agency" 
          line1="OVERALL IN VENEZUELA" 
          line2="2026 Choice Awards" 
        />
        <AwardBadge 
          title="Best Tour Operator" 
          line1="CARIBBEAN & SOUTH AMERICA" 
          line2="2026 Choice Awards" 
        />
        <AwardBadge 
          title="Best Custom Tours" 
          line1="EXOTIC & ADVENTURE PACKAGES" 
          line2="2026 Choice Awards" 
        />
      </div>

      {/* 2. Social Media Links */}
      <div style={{ display: 'flex', gap: '1.5rem', color: '#ffffff', alignItems: 'center' }}>
        {/* Facebook */}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
        </a>
        {/* Instagram */}
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}>
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        {/* TikTok */}
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31 0 2.57.39 3.64 1.11.1-.09.2-.18.31-.26.24-.18.53-.27.83-.27h3.69c.04.56.24 1.1.58 1.56.5.67 1.25 1.13 2.1 1.28.08.01.16.02.24.03v3.7c-1.12-.04-2.18-.46-3.05-1.17-.18-.15-.35-.31-.5-.49v7.94c0 1.23-.33 2.42-.97 3.46-.94 1.54-2.5 2.65-4.32 3.01-1.01.2-2.06.13-3.04-.21-1.84-.63-3.32-2.12-3.95-3.96-.34-.98-.41-2.03-.21-3.04.36-1.82 1.47-3.38 3.01-4.32.74-.45 1.57-.73 2.43-.83.08-.01.16-.02.24-.03v3.73c-.04 0-.08.01-.12.01-.89.1-1.72.53-2.3 1.22-.53.63-.78 1.43-.72 2.24.09 1.14.73 2.14 1.7 2.67.58.32 1.24.45 1.9.38.9-.1 1.71-.62 2.2-1.39.29-.46.42-.99.38-1.53V.02h-3.69z"/></svg>
        </a>
        {/* YouTube */}
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
        {/* X (Twitter) */}
        <a href="https://x.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}>
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        {/* Pinterest */}
        <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', opacity: 0.8, transition: 'opacity 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}>
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.906 2.17-2.906 1.023 0 1.517.769 1.517 1.689 0 1.029-.656 2.57-.996 3.996-.283 1.195.597 2.169 1.777 2.169 2.133 0 3.772-2.254 3.772-5.509 0-2.881-2.071-4.896-5.027-4.896-3.425 0-5.437 2.568-5.437 5.221 0 1.033.399 2.143.897 2.748.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.211-.174.256-.402.148-1.502-.699-2.441-2.898-2.441-4.664 0-3.797 2.759-7.284 7.954-7.284 4.175 0 7.42 2.975 7.42 6.956 0 4.148-2.616 7.486-6.25 7.486-1.22 0-2.368-.634-2.76-1.378l-.752 2.871c-.272 1.042-1.01 2.348-1.505 3.149 1.127.348 2.321.537 3.56.537 6.621 0 11.988-5.367 11.988-11.987C24.005 5.367 18.638 0 12.017 0z"/></svg>
        </a>
      </div>

      {/* 3. Country Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(255, 255, 255, 0.25)',
        padding: '0.4rem 1.2rem',
        borderRadius: '30px',
        color: '#ffffff',
        fontSize: '0.75rem',
        fontWeight: 'bold',
        letterSpacing: '1px',
        cursor: 'pointer',
        transition: 'background 0.2s'
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.16)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
      >
        <span>🇻🇪</span>
        <span>VENEZUELA</span>
      </div>

      {/* 4. Copyright */}
      <div style={{ color: '#ffffff', opacity: 0.7, fontSize: '0.75rem', fontWeight: '500' }}>
        © 2026 Horus Travel
      </div>

      {/* 5. Footer Navigation Links */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem 1rem',
        maxWidth: '1000px',
        width: '100%'
      }}>
        {footerLinks.map((link, index) => (
          <div key={link.path} style={{ display: 'flex', alignItems: 'center' }}>
            <Link 
              to={link.path} 
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontSize: '0.75rem',
                fontWeight: '700',
                transition: 'opacity 0.2s',
                opacity: 0.95
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = 0.7}
              onMouseLeave={(e) => e.currentTarget.style.opacity = 0.95}
            >
              {link.label}
            </Link>
            {index < footerLinks.length - 1 && (
              <span style={{ color: '#ffffff', opacity: 0.25, marginLeft: '1rem', fontSize: '0.75rem', userSelect: 'none' }}>|</span>
            )}
          </div>
        ))}
      </div>
    </footer>
  )
}
