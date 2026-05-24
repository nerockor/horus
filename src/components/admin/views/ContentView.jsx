import { useState, useEffect } from 'react'
import { api } from '../../../api'

export default function ContentView() {
  const [content, setContent] = useState({
    heroImage: '',
    aboutImage: ''
  })

  useEffect(() => {
    api.getContent()
      .then(data => setContent(data))
      .catch(err => console.error('Error fetching content:', err))
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      await api.saveContent(content)
      alert('Contenido guardado exitosamente. Los cambios se verán en la vista pública.')
    } catch (err) {
      alert(err.message || 'Error al guardar el contenido')
    }
  }


  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>Imágenes y Contenido</h1>
      
      <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', maxWidth: '600px' }}>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
          Actualiza las URLs de las imágenes públicas.
        </p>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Imagen Principal (Hero) URL</label>
            <input 
              type="url" 
              value={content.heroImage}
              onChange={(e) => setContent({...content, heroImage: e.target.value})}
              placeholder="https://ejemplo.com/imagen.jpg"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Imagen Secundaria URL</label>
            <input 
              type="url" 
              value={content.aboutImage}
              onChange={(e) => setContent({...content, aboutImage: e.target.value})}
              placeholder="https://ejemplo.com/imagen2.jpg"
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
            />
          </div>
          <button 
            type="submit"
            style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', marginTop: '0.5rem' }}
          >
            Guardar Cambios
          </button>
        </form>
      </div>
    </div>
  )
}
