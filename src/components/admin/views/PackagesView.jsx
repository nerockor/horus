import { useState, useEffect } from 'react'
import { Package, Plus, Percent, Users, Calendar, MapPin, DollarSign, Clock, Image as ImageIcon } from 'lucide-react'

const SEED_PACKAGES = [
  // 1. Paquetes
  {
    id: 'p-buzios',
    category: 'paquetes',
    name: 'Paquetes a Búzios',
    location: 'Búzios, Brasil',
    startDate: '2026-06-01',
    endDate: '2026-06-15',
    duration: '9 Días / 8 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80',
    price: '866891',
    bonus: '12',
    targetAudience: 'Familiares'
  },
  {
    id: 'p-paris',
    category: 'paquetes',
    name: 'París Soñado',
    location: 'París, Francia',
    startDate: '2026-06-10',
    endDate: '2026-06-25',
    duration: '7 Días / 6 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    price: '1850000',
    bonus: '15',
    targetAudience: 'Solo adultos'
  },
  {
    id: 'p-disney-pack',
    category: 'paquetes',
    name: 'Disney Mágico Familiar',
    location: 'Orlando, EE.UU.',
    startDate: '2026-07-01',
    endDate: '2026-07-20',
    duration: '10 Días / 9 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    price: '2400000',
    bonus: '5',
    targetAudience: 'Familiares'
  },
  {
    id: 'p-rio',
    category: 'paquetes',
    name: 'Río de Janeiro Express',
    location: 'Río de Janeiro, Brasil',
    startDate: '2026-05-25',
    endDate: '2026-06-05',
    duration: '6 Días / 5 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=600&q=80',
    price: '650000',
    bonus: '10',
    targetAudience: 'Familiares'
  },
  {
    id: 'p-madrid-pack',
    category: 'paquetes',
    name: 'Madrid Cultural',
    location: 'Madrid, España',
    startDate: '2026-06-15',
    endDate: '2026-06-30',
    duration: '8 Días / 7 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80',
    price: '1450000',
    bonus: '8',
    targetAudience: 'Solo adultos'
  },
  // 2. Vuelos
  {
    id: 'p-vuelo-miami',
    category: 'vuelos',
    name: 'Vuelo Directo a Miami',
    location: 'Miami, EE.UU.',
    startDate: '2026-06-01',
    endDate: '2026-06-15',
    duration: 'Vuelo Directo (Ida y Vuelta)',
    imageUrl: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=600&q=80',
    price: '980000',
    bonus: '10',
    targetAudience: 'Solo adultos'
  },
  {
    id: 'p-vuelo-madrid',
    category: 'vuelos',
    name: 'Vuelo Madrid con Escala',
    location: 'Madrid, España',
    startDate: '2026-06-10',
    endDate: '2026-06-25',
    duration: '1 Parada (Ida y Vuelta)',
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=600&q=80',
    price: '1350000',
    bonus: '5',
    targetAudience: 'Solo adultos'
  },
  // 3. Alojamientos
  {
    id: 'p-aloj-copa',
    category: 'alojamientos',
    name: 'Copacabana Palace Hotel',
    location: 'Río de Janeiro, Brasil',
    startDate: '2026-05-25',
    endDate: '2026-06-05',
    duration: 'Estadía Completa por Noche',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
    price: '280000',
    bonus: '15',
    targetAudience: 'Familiares'
  },
  {
    id: 'p-aloj-giza',
    category: 'alojamientos',
    name: 'Hilton Pyramids View Resort',
    location: 'El Cairo, Egipto',
    startDate: '2026-06-05',
    endDate: '2026-06-12',
    duration: 'Habitación Premium vista Pirámides',
    imageUrl: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80',
    price: '320000',
    bonus: '8',
    targetAudience: 'Solo adultos'
  },
  // 4. Actividades
  {
    id: 'p-act-giza',
    category: 'actividades',
    name: 'Excursión Privada Pirámides & Esfinge',
    location: 'Giza, Egipto',
    startDate: '2026-05-20',
    endDate: '2026-06-20',
    duration: 'Día Completo con Guía Privado',
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=600&q=80',
    price: '85000',
    bonus: '0',
    targetAudience: 'Familiares'
  },
  {
    id: 'p-act-venecia',
    category: 'actividades',
    name: 'Paseo en Góndola & Cena Veneciana',
    location: 'Venecia, Italia',
    startDate: '2026-06-01',
    endDate: '2026-06-15',
    duration: '4 Horas de Excursión',
    imageUrl: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?auto=format&fit=crop&w=600&q=80',
    price: '140000',
    bonus: '10',
    targetAudience: 'Solo adultos'
  },
  // 5. Assist Card
  {
    id: 'p-assist-150',
    category: 'assistcard',
    name: 'Asistencia Premium AC 150',
    location: 'Europa y Resto del Mundo',
    startDate: '2026-05-15',
    endDate: '2026-12-31',
    duration: 'Cobertura Anual Multiviajes',
    imageUrl: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=600&q=80',
    price: '95000',
    bonus: '20',
    targetAudience: 'Familiares'
  },
  // 6. Autos
  {
    id: 'p-car-explorer',
    category: 'autos',
    name: 'Alquiler SUV Ford Explorer',
    location: 'Orlando, EE.UU.',
    startDate: '2026-06-01',
    endDate: '2026-06-30',
    duration: 'Por Día - Kilometraje Libre',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
    price: '75000',
    bonus: '5',
    targetAudience: 'Familiares'
  },
  // 7. Disney
  {
    id: 'p-disney-tix',
    category: 'disney',
    name: 'Pase Magia de Disney 4 Parques',
    location: 'Orlando, EE.UU.',
    startDate: '2026-05-15',
    endDate: '2026-10-15',
    duration: '4 Días de Acceso Completo',
    imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?auto=format&fit=crop&w=600&q=80',
    price: '650000',
    bonus: '10',
    targetAudience: 'Familiares'
  },
  // 8. Universal
  {
    id: 'p-univ-tix',
    category: 'universal',
    name: 'Universal Explorer: 3 Parques al precio de 2',
    location: 'Orlando, EE.UU.',
    startDate: '2026-05-15',
    endDate: '2026-10-15',
    duration: 'Pase de 14 Días Consecutivos',
    imageUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=600&q=80',
    price: '580000',
    bonus: '12',
    targetAudience: 'Familiares'
  },
  // 9. Circuitos
  {
    id: 'p-circ-egipto',
    category: 'circuitos',
    name: 'Egipto Clásico & Crucero por el Nilo',
    location: 'El Cairo / Nilo, Egipto',
    startDate: '2026-09-10',
    endDate: '2026-09-25',
    duration: '10 Días / 9 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=600&q=80',
    price: '2450000',
    bonus: '15',
    targetAudience: 'Solo adultos'
  },
  {
    id: 'p-circ-europa',
    category: 'circuitos',
    name: 'Europa Imperial Soñada',
    location: 'Madrid, París, Roma',
    startDate: '2026-06-05',
    endDate: '2026-06-25',
    duration: '15 Días / 14 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    price: '3890000',
    bonus: '10',
    targetAudience: 'Solo adultos'
  },
  // 10. Cruceros
  {
    id: 'p-cruc-royal',
    category: 'cruceros',
    name: 'Crucero Caribe: Bahamas & Perfect Day',
    location: 'Miami / Bahamas',
    startDate: '2026-06-15',
    endDate: '2026-06-22',
    duration: '8 Días / 7 Noches Royal Caribbean',
    imageUrl: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=600&q=80',
    price: '1850000',
    bonus: '8',
    targetAudience: 'Familiares'
  }
]

export default function PackagesView() {
  const [packages, setPackages] = useState([])
  
  const [category, setCategory] = useState('paquetes')
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [duration, setDuration] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [price, setPrice] = useState('')
  const [bonus, setBonus] = useState('')
  const [targetAudience, setTargetAudience] = useState('Solo adultos')

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('horus_packages') || '[]')
    if (data.length === 0) {
      localStorage.setItem('horus_packages', JSON.stringify(SEED_PACKAGES))
      setPackages(SEED_PACKAGES)
    } else {
      setPackages(data)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !location || !startDate || !endDate || !price || !duration || !imageUrl) return

    const newPackage = {
      id: `p-${Date.now()}`,
      category,
      name,
      location,
      startDate,
      endDate,
      duration,
      imageUrl,
      price,
      bonus: bonus || '0',
      targetAudience
    }

    const updated = [newPackage, ...packages]
    setPackages(updated)
    localStorage.setItem('horus_packages', JSON.stringify(updated))

    // Reset fields
    setName('')
    setLocation('')
    setStartDate('')
    setEndDate('')
    setDuration('')
    setImageUrl('')
    setPrice('')
    setBonus('')
    setTargetAudience('Solo adultos')
  }

  const deletePackage = (id) => {
    if (confirm('¿Seguro que deseas eliminar este paquete?')) {
      const updated = packages.filter(p => p.id !== id)
      setPackages(updated)
      localStorage.setItem('horus_packages', JSON.stringify(updated))
    }
  }

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Package size={24} /> Gestión de Servicios y Ofertas
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
        {/* Form to create package */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} style={{ color: '#2563eb' }} /> Nueva Oferta
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: 'white', boxSizing: 'border-box' }}
                required
              >
                <option value="alojamientos">Alojamientos</option>
                <option value="vuelos">Vuelos</option>
                <option value="paquetes">Paquetes</option>
                <option value="actividades">Actividades</option>
                <option value="assistcard">Assist Card</option>
                <option value="autos">Autos</option>
                <option value="disney">Disney</option>
                <option value="universal">Universal</option>
                <option value="circuitos">Circuitos</option>
                <option value="cruceros">Cruceros</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Nombre de la Oferta</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Paquetes a Búzios"
                style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Locación / Destino</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#9ca3af' }} />
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ej. Búzios, Brasil"
                  style={{ width: '100%', padding: '0.625rem 0.625rem 0.625rem 2.25rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Duración</label>
              <div style={{ position: 'relative' }}>
                <Clock size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#9ca3af' }} />
                <input 
                  type="text" 
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="Ej. 9 Días / 8 Noches"
                  style={{ width: '100%', padding: '0.625rem 0.625rem 0.625rem 2.25rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Imagen URL</label>
              <div style={{ position: 'relative' }}>
                <ImageIcon size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#9ca3af' }} />
                <input 
                  type="url" 
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  style={{ width: '100%', padding: '0.625rem 0.625rem 0.625rem 2.25rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Inicio Promo</label>
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Fin Promo</label>
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Precio (ARS/USD)</label>
                <div style={{ position: 'relative' }}>
                  <DollarSign size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#9ca3af' }} />
                  <input 
                    type="number" 
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="866891"
                    style={{ width: '100%', padding: '0.625rem 0.625rem 0.625rem 2.25rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                    required
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Bonificación (%)</label>
                <div style={{ position: 'relative' }}>
                  <Percent size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#9ca3af' }} />
                  <input 
                    type="number" 
                    value={bonus}
                    onChange={(e) => setBonus(e.target.value)}
                    placeholder="12"
                    style={{ width: '100%', padding: '0.625rem 0.625rem 0.625rem 2.25rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.25rem' }}>Público Objetivo</label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }}
              >
                <option value="Solo adultos">Solo adultos</option>
                <option value="Familiares">Familiares</option>
              </select>
            </div>

            <button 
              type="submit"
              style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem', transition: 'background-color 0.2s' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
            >
              Crear Paquete
            </button>
          </form>
        </div>

        {/* List of packages */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Nombre</th>
                <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Categoría</th>
                <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Destino</th>
                <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Duración</th>
                <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Precio Final</th>
                <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Público</th>
                <th style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: '600', color: '#475569' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {packages.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>No hay paquetes creados.</td>
                </tr>
              ) : (
                packages.map(p => {
                  const discount = parseFloat(p.bonus || '0');
                  const originalPrice = parseFloat(p.price || '0');
                  const finalPrice = discount > 0 ? originalPrice * (1 - discount/100) : originalPrice;

                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#1e293b', fontWeight: '600' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <img src={p.imageUrl} alt="" style={{ width: '40px', height: '30px', objectFit: 'cover', borderRadius: '4px' }} />
                          {p.name}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#334155', textTransform: 'capitalize' }}>
                        {p.category}
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#334155' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <MapPin size={14} style={{ color: '#64748b' }} /> {p.location}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748b' }}>{p.duration}</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        <div style={{ fontWeight: '700', color: '#10b981' }}>$ {finalPrice.toLocaleString('es-AR', { maximumFractionDigits: 0 })}</div>
                        {discount > 0 && (
                          <div style={{ fontSize: '0.75rem', color: '#ef4444', textDecoration: 'line-through' }}>
                            $ {originalPrice.toLocaleString('es-AR', { maximumFractionDigits: 0 })} (-{p.bonus}%)
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#475569' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Users size={14} style={{ color: '#64748b' }} /> {p.targetAudience}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button 
                          onClick={() => deletePackage(p.id)}
                          style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '500' }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
