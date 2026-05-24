import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, ArrowLeft, Search, Calendar, User, BookOpen, Clock, ChevronRight } from 'lucide-react'
import { api } from '../../api'
import Footer from '../ui/Footer'

export default function BlogView() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    api.getBlogPosts()
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching posts:', err)
        setLoading(false)
      })
  }, [])

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.summary && post.summary.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const handleReadPost = (post) => {
    setSelectedPost(post)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToList = () => {
    setSelectedPost(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Inter, sans-serif',
      position: 'relative',
      color: '#0f2d4a',
      overflowX: 'hidden'
    }}>
      <style>{`
        .blog-card {
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .blog-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 25px 50px rgba(0, 83, 229, 0.12) !important;
          border-color: rgba(0, 83, 229, 0.3) !important;
        }
        .blog-card-img-container {
          height: 220px;
          width: 100%;
          overflow: hidden;
          position: relative;
          background-color: #f1f5f9;
          transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .blog-card:hover .blog-card-img-container {
          height: 120px !important;
        }
        .blog-card-summary {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          margin: 0 !important;
        }
        .blog-card:hover .blog-card-summary {
          max-height: 100px;
          opacity: 1;
          margin-top: 0.5rem !important;
        }
        .blog-card-img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .blog-card:hover .blog-card-img {
          transform: scale(1.08);
        }
        .blog-card-readmore {
          transition: all 0.3s ease !important;
        }
        .blog-card:hover .blog-card-readmore {
          color: #003db3 !important;
          transform: translateX(4px);
        }
      `}</style>

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
          <span style={{ color: '#718096', fontWeight: '500' }}>Inspiración para tus viajes</span>
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
          onClick={() => {
            setSelectedPost(null)
            navigate('/')
          }}
          style={{ 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            letterSpacing: '2px', 
            color: '#0f2d4a', 
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
          onClick={() => {
            if (selectedPost) {
              handleBackToList()
            } else {
              navigate('/')
            }
          }}
          style={{
            background: 'rgba(15, 45, 74, 0.05)',
            border: '1px solid rgba(15, 45, 74, 0.15)',
            color: '#0f2d4a',
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
            e.currentTarget.style.background = 'rgba(15, 45, 74, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(15, 45, 74, 0.05)'
          }}
        >
          <ArrowLeft size={14} />
          {selectedPost ? 'Volver al listado' : 'Volver al Inicio'}
        </button>
      </header>

      {/* Main Content Area */}
      <main style={{
        flexGrow: 1,
        width: '100%',
        maxWidth: selectedPost ? '800px' : '1200px',
        margin: '0 auto',
        padding: '0 2rem 5rem 2rem',
        position: 'relative',
        zIndex: 5,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {selectedPost ? (
          /* ========================================== */
          /* DETAIL VIEW                                */
          /* ========================================== */
          <article style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
            {selectedPost.imageUrl && (
              <div style={{ width: '100%', maxHeight: '450px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 15px 30px rgba(15,45,74,0.08)' }}>
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  style={{ width: '100%', height: '100%', maxHeight: '450px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(15,45,74,0.05)', padding: '0.25rem 0.75rem', borderRadius: '20px' }}>
                <Calendar size={14} />
                {selectedPost.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(15,45,74,0.05)', padding: '0.25rem 0.75rem', borderRadius: '20px', textTransform: 'capitalize' }}>
                <User size={14} />
                {selectedPost.author || 'Administrador'}
              </span>
            </div>

            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              fontFamily: 'Outfit, sans-serif',
              letterSpacing: '-0.5px',
              color: '#0f2d4a',
              margin: '0.5rem 0 1rem 0',
              lineHeight: '1.2'
            }}>
              {selectedPost.title}
            </h1>

            {/* Custom line break interpreter via pre-line */}
            <div style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#2d3748',
              fontFamily: 'Inter, sans-serif',
              whiteSpace: 'pre-line',
              textAlign: 'justify'
            }}>
              {selectedPost.content}
            </div>

            <div style={{
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(15, 45, 74, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <button
                onClick={handleBackToList}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0053e5',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <ArrowLeft size={16} />
                Volver al listado
              </button>
            </div>
          </article>
        ) : (
          /* ========================================== */
          /* LIST VIEW                                  */
          /* ========================================== */
          <>
            <div style={{ textAlign: 'center', marginTop: '1rem', marginBottom: '2rem' }}>
              <h1 style={{
                fontSize: '2.8rem',
                fontWeight: '850',
                fontFamily: 'Outfit, sans-serif',
                letterSpacing: '-1px',
                color: '#0f2d4a',
                margin: '0 0 0.5rem 0'
              }}>
                Nuestro Blog de Viajes
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#4a5568', maxWidth: '600px', margin: '0 auto 1.5rem auto', lineHeight: '1.5' }}>
                Inspiración, recomendaciones exclusivas y consejos prácticos para planificar tus próximas vacaciones soñadas.
              </p>

              {/* Search Bar */}
              <div style={{
                maxWidth: '500px',
                margin: '0 auto',
                position: 'relative',
                boxShadow: '0 10px 25px rgba(15, 45, 74, 0.05)',
                borderRadius: '30px',
                border: '1px solid rgba(15, 45, 74, 0.15)',
                backgroundColor: '#ffffff'
              }}>
                <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem 0.85rem 3rem',
                    border: 'none',
                    borderRadius: '30px',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                    outline: 'none',
                    color: '#0f2d4a',
                    fontFamily: 'Inter, sans-serif'
                  }}
                />
              </div>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '5rem 0', color: '#64748b' }}>
                Cargando artículos...
              </div>
            ) : filteredPosts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: '#f8fafc',
                borderRadius: '24px',
                border: '1px solid #e2e8f0',
                color: '#64748b'
              }}>
                <BookOpen size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#0f2d4a', margin: '0 0 0.5rem 0' }}>No encontramos artículos</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Intenta realizar otra búsqueda o vuelve a cargar el sitio.</p>
              </div>
            ) : (
              /* Grid layout of posts */
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2rem',
                justifyItems: 'center'
              }}>
                {filteredPosts.map(post => (
                  <div
                    key={post.id}
                    onClick={() => handleReadPost(post)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid rgba(0, 83, 229, 0.15)',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      boxShadow: '0 15px 35px rgba(15, 45, 74, 0.08)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      height: '430px',
                      width: '100%',
                      maxWidth: '375px'
                    }}
                    className="blog-card"
                  >
                    {/* Card Cover Image */}
                    <div className="blog-card-img-container">
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                          className="blog-card-img"
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <BookOpen size={36} color="#cbd5e1" />
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1, gap: '0.75rem', overflow: 'hidden' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#64748b' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Calendar size={12} />
                          {post.date}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', textTransform: 'capitalize' }}>
                          <User size={12} />
                          {post.author || 'Admin'}
                        </span>
                      </div>

                      <h3 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        fontFamily: 'Outfit, sans-serif',
                        color: '#0f2d4a',
                        margin: 0,
                        lineHeight: '1.3',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {post.title}
                      </h3>

                      <p style={{
                        fontSize: '0.9rem',
                        color: '#475569',
                        margin: 0,
                        lineHeight: '1.6',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical'
                      }}
                        className="blog-card-summary"
                      >
                        {post.summary || post.content}
                      </p>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: '#0053e5',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        marginTop: 'auto',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                        className="blog-card-readmore"
                      >
                        Leer artículo completo
                        <ChevronRight size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
