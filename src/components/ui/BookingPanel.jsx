import { useState, useEffect } from 'react'
import { 
  BedDouble, 
  Plane, 
  Luggage, 
  Ticket, 
  Shield, 
  Car, 
  Globe, 
  Route, 
  Ship, 
  ArrowLeftRight, 
  Search, 
  CheckCircle2, 
  X, 
  User, 
  Calendar, 
  DollarSign, 
  Info,
  CheckSquare
} from 'lucide-react'
import './BookingPanel.css'

// Custom SVG Mickey Ears Icon for Disney
function DisneyIcon({ className = '', size = 20 }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="6" cy="6" r="4.5" />
      <circle cx="18" cy="6" r="4.5" />
      <circle cx="12" cy="15" r="7.5" />
    </svg>
  )
}

const CATEGORIES = [
  { id: 'alojamientos', label: 'Alojamientos', icon: BedDouble },
  { id: 'vuelos', label: 'Vuelos', icon: Plane },
  { id: 'paquetes', label: 'Paquetes', icon: Luggage },
  { id: 'actividades', label: 'Actividades', icon: Ticket },
  { id: 'assistcard', label: 'Assist Card', icon: Shield },
  { id: 'autos', label: 'Autos', icon: Car },
  { id: 'disney', label: 'Disney', icon: DisneyIcon },
  { id: 'universal', label: 'Universal', icon: Globe },
  { id: 'circuitos', label: 'Circuitos', icon: Route },
  { id: 'cruceros', label: 'Cruceros', icon: Ship },
]

export default function BookingPanel({ activeBookings = [], onAddBooking }) {
  const [activeCategory, setActiveCategory] = useState('vuelos')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState(null)
  const [selectedResult, setSelectedResult] = useState(null)
  
  // Checklist verification states
  const [checklist, setChecklist] = useState({
    identity: false,
    dates: false,
    cancelation: false,
    baggage: false,
    terms: false
  })

  // Form states per category
  const [formData, setFormData] = useState({
    // Vuelos / Paquetes
    origin: 'Buenos Aires (BUE)',
    destination: 'Madrid (MAD)',
    departureDate: '2026-05-20',
    returnDate: '2026-06-10',
    passengers: '1 Persona',
    classType: 'Todas',
    currency: '$ Pesos (ARS)',
    flexibleDates: false,
    flightOption: 'ida-vuelta',

    // Alojamientos / General
    hotelGuests: '2 Personas, 1 Hab.',
    hotelType: 'hoteles',
    addFlight: false,

    // Actividades
    activityCategory: 'Todas',
    
    // Insurance
    ages: '28 años',
    insurancePlan: 'Premium',
    
    // Autos
    carPickTime: '10:00',
    carDropTime: '10:00',
    carType: 'Económico',
    
    // Disney & Universal
    ticketType: 'Park Hopper',
    disneyDays: '4 Días',
    
    // Circuitos
    tourMonth: 'Mayo 2026',
    tourDuration: '2 semanas',
    
    // Cruceros
    cruiseLine: 'Royal Caribbean',
    cabins: '1 Cabina Exterior',
  })

  // Update dates to be relative to today/tomorrow
  useEffect(() => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    
    const formattedToday = today.toISOString().split('T')[0]
    const formattedTomorrow = tomorrow.toISOString().split('T')[0]
    
    setFormData(prev => ({
      ...prev,
      departureDate: formattedToday,
      returnDate: formattedTomorrow
    }))
  }, [])

  // Swap function for Flight/Package origin & destination
  const handleSwap = () => {
    setFormData(prev => ({
      ...prev,
      origin: prev.destination,
      destination: prev.origin
    }))
  }

  // Handle standard input change
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Generate simulated search results
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setSearching(true)
    setResults(null)
    
    setTimeout(() => {
      setSearching(false)
      
      // Seed realistic search results depending on the active category
      const mockResults = []
      const c = activeCategory
      
      if (c === 'vuelos') {
        mockResults.push(
          {
            id: 'vuelo-1',
            title: `Iberia IB6844 - Vuelo Directo`,
            description: `${formData.origin} ➔ ${formData.destination} | Cabina: ${formData.classType === 'Todas' ? 'Turista' : formData.classType}`,
            meta: `Salida: ${formData.departureDate} (12:35) - Llegada: (05:20 +1)`,
            price: formData.currency.includes('USD') ? 'U$S 1,240' : '$ 1,240,000',
            category: 'vuelos',
            promoted: true,
            checklistDetails: {
              baggage: '1 bolso de mano (40x30x20cm) + 1 carry-on de 10kg incluido.',
              identity: 'Requiere pasaporte vigente con al menos 6 meses de validez.',
              cancelation: 'Cancelación gratuita hasta 72hs antes del vuelo en tarifa flexible.'
            }
          },
          {
            id: 'vuelo-2',
            title: `Air Europa UX42 - 1 Escala (Asunción)`,
            description: `${formData.origin} ➔ ${formData.destination} | Escala de 1h 45m`,
            meta: `Salida: ${formData.departureDate} (14:15) - Llegada: (09:10 +1)`,
            price: formData.currency.includes('USD') ? 'U$S 1,120' : '$ 1,120,000',
            category: 'vuelos',
            promoted: false,
            checklistDetails: {
              baggage: 'Solo bolso de mano de 8kg. Equipaje en bodega con cargo extra.',
              identity: 'Requiere pasaporte vigente y visa de tránsito si corresponde.',
              cancelation: 'Permite 1 cambio de fecha abonando penalidad + diferencia de tarifa.'
            }
          },
          {
            id: 'vuelo-3',
            title: `LATAM LA702 - 1 Escala (San Pablo)`,
            description: `${formData.origin} ➔ ${formData.destination} | Escala de 2h 10m`,
            meta: `Salida: ${formData.departureDate} (08:10) - Llegada: (04:30 +1)`,
            price: formData.currency.includes('USD') ? 'U$S 980' : '$ 980,000',
            category: 'vuelos',
            promoted: false,
            checklistDetails: {
              baggage: '1 carry-on de 10kg incluido + bolso de mano.',
              identity: 'Pasaporte vigente y Declaración Jurada Sanitaria.',
              cancelation: 'No reembolsable. Solo cambios de fecha con penalidad.'
            }
          }
        )
      } else if (c === 'alojamientos') {
        mockResults.push(
          {
            id: 'alojamiento-1',
            title: `Grand Horus Luxury Hotel & Spa`,
            description: `Habitación Deluxe con vista panorámica | Desayuno Buffet Incluido`,
            meta: `Ubicación céntrica en ${formData.destination || 'Orlando'} | ${formData.hotelGuests}`,
            price: formData.currency.includes('USD') ? 'U$S 220 / noche' : '$ 220,000 / noche',
            category: 'alojamientos',
            promoted: true,
            checklistDetails: {
              baggage: 'Check-in: 15:00. Check-out: 11:00. Estacionamiento gratuito.',
              identity: 'Requiere tarjeta de crédito física para depósito en garantía.',
              cancelation: 'Cancelación 100% reembolsable hasta 24hs antes del check-in.'
            }
          },
          {
            id: 'alojamiento-2',
            title: `Aura Minimalist Suites`,
            description: `Estudio moderno con cocina completa y balcón privado`,
            meta: `Barrio residencial de diseño | ${formData.hotelGuests}`,
            price: formData.currency.includes('USD') ? 'U$S 135 / noche' : '$ 135,000 / noche',
            category: 'alojamientos',
            promoted: false,
            checklistDetails: {
              baggage: 'Código de acceso digital. Recepción virtual 24hs.',
              identity: 'Requiere completar pre check-in online con foto de DNI/Pasaporte.',
              cancelation: 'Cancelación sin cargo hasta 5 días antes.'
            }
          }
        )
      } else if (c === 'paquetes') {
        mockResults.push(
          {
            id: 'paquete-1',
            title: `Paquete Completo Premium: Vuelo + Hotel`,
            description: `Vuelo directo Iberia + 7 Noches en Grand Horus Luxury Hotel`,
            meta: `Itinerario: ${formData.origin} ➔ ${formData.destination} | ${formData.hotelGuests}`,
            price: formData.currency.includes('USD') ? 'U$S 2,540 / pers.' : '$ 2,540,000 / pers.',
            category: 'paquetes',
            promoted: true,
            checklistDetails: {
              baggage: 'Vuelo con carry-on 10kg + equipaje despachado 23kg. Traslados aeropuerto/hotel incluidos.',
              identity: 'Completar datos de todos los pasajeros exactamente como en pasaportes.',
              cancelation: 'Seguro de cancelación flexible incluido por causas de fuerza mayor.'
            }
          }
        )
      } else if (c === 'actividades') {
        mockResults.push(
          {
            id: 'actividad-1',
            title: `Tour Guiado Arqueológico Horus VIP`,
            description: `Incluye accesos rápidos sin filas, guía historiador y transporte privado`,
            meta: `Destino: ${formData.destination || 'El Cairo'} | Salida: ${formData.departureDate}`,
            price: formData.currency.includes('USD') ? 'U$S 85' : '$ 85,000',
            category: 'actividades',
            promoted: true,
            checklistDetails: {
              baggage: 'Calzado cómodo obligatorio. Agua mineral y sombrilla provistas.',
              identity: 'Presentar ticket digital en el móvil en el punto de encuentro.',
              cancelation: 'Cancelación con devolución del 100% hasta 48hs antes.'
            }
          }
        )
      } else if (c === 'assistcard') {
        mockResults.push(
          {
            id: 'seguro-1',
            title: `Assist Card AC 150 Premium`,
            description: `Cobertura médica hasta U$S 150,000, asistencia odontológica y pérdida de equipaje`,
            meta: `Destino: ${formData.destination || 'Mundo'} | Edades: ${formData.ages} | Plan: ${formData.insurancePlan}`,
            price: formData.currency.includes('USD') ? 'U$S 95' : '$ 95,000',
            category: 'assistcard',
            promoted: true,
            checklistDetails: {
              baggage: 'Compensación por demora de equipaje de hasta U$S 800.',
              identity: 'El voucher digital se emitirá al nombre y DNI indicados.',
              cancelation: 'Modificable en fechas antes del día de inicio de vigencia.'
            }
          }
        )
      } else if (c === 'autos') {
        mockResults.push(
          {
            id: 'auto-1',
            title: `Toyota Corolla o similar (Mediano automatico)`,
            description: `Alquiler con Hertz | Kilometraje Ilimitado | Seguro CDW básico`,
            meta: `Retiro: ${formData.origin || 'Aeropuerto'} - Devolución: ${formData.destination || 'Aeropuerto'}`,
            price: formData.currency.includes('USD') ? 'U$S 45 / día' : '$ 45,000 / día',
            category: 'autos',
            promoted: false,
            checklistDetails: {
              baggage: 'Espacio para 2 valijas grandes + 2 bolsos. Política de combustible: Lleno a Lleno.',
              identity: 'Conductor mayor de 25 años con licencia vigente internacional y tarjeta de crédito.',
              cancelation: 'Cancelación gratuita hasta 24hs antes del retiro.'
            }
          }
        )
      } else if (c === 'disney') {
        mockResults.push(
          {
            id: 'disney-1',
            title: `Pase Walt Disney World: ${formData.disneyDays} Park Hopper`,
            description: `Acceso ilimitado a Magic Kingdom, Epcot, Hollywood Studios y Animal Kingdom en el mismo día`,
            meta: `Inicio: ${formData.departureDate} | Tipo: ${formData.ticketType}`,
            price: formData.currency.includes('USD') ? 'U$S 590' : '$ 590,000',
            category: 'disney',
            promoted: true,
            checklistDetails: {
              baggage: 'No se permiten bolsos de más de 61x38x46cm ni cochecitos de gran tamaño.',
              identity: 'Requiere vincular los tickets en la app My Disney Experience mediante el código provisto.',
              cancelation: 'Tickets de Disney no reembolsables ni transferibles.'
            }
          }
        )
      } else if (c === 'universal') {
        mockResults.push(
          {
            id: 'universal-1',
            title: `Universal Orlando Resort: Pase 3-Park Explorer`,
            description: `Acceso a Universal Studios, Islands of Adventure y Volcano Bay por 14 días consecutivos`,
            meta: `Validez a partir del: ${formData.departureDate}`,
            price: formData.currency.includes('USD') ? 'U$S 410' : '$ 410,000',
            category: 'universal',
            promoted: true,
            checklistDetails: {
              baggage: 'Lockers gratuitos de corta duración disponibles en las atracciones principales.',
              identity: 'Presentar DNI con foto que coincida con el nombre impreso en el ticket al ingresar.',
              cancelation: 'Tickets nominativos y no reembolsables una vez emitidos.'
            }
          }
        )
      } else if (c === 'circuitos') {
        mockResults.push(
          {
            id: 'circuito-1',
            title: `Circuito Imperial: Praga, Viena y Budapest`,
            description: `Itinerario guiado de 10 días | Hoteles 4 estrellas con media pensión`,
            meta: `Mes de salida: ${formData.tourMonth} | Duración: ${formData.tourDuration}`,
            price: formData.currency.includes('USD') ? 'U$S 1,890' : '$ 1,890,000',
            category: 'circuitos',
            promoted: true,
            checklistDetails: {
              baggage: 'Máximo 1 maleta de 20kg por persona en el portaequipajes del autobús.',
              identity: 'Requiere pasaporte con validez mayor a 90 días respecto a la salida de Europa.',
              cancelation: 'Cancelación sin penalidad hasta 30 días antes del inicio del viaje.'
            }
          }
        )
      } else if (c === 'cruceros') {
        mockResults.push(
          {
            id: 'crucero-1',
            title: `Caribe de Ensueño en Icon of the Seas`,
            description: `Crucero de 7 noches saliendo desde Miami | Cabina: ${formData.cabins}`,
            meta: `Naviera: ${formData.cruiseLine} | Mes de salida: ${formData.tourMonth || 'Mayo 2026'}`,
            price: formData.currency.includes('USD') ? 'U$S 1,480' : '$ 1,480,000',
            category: 'cruceros',
            promoted: true,
            checklistDetails: {
              baggage: 'Maletas etiquetadas serán entregadas en el camarote. Vestimenta formal para noche de gala.',
              identity: 'Pasaporte con validez de 6 meses + visado de EE.UU. (ESTA) obligatorio.',
              cancelation: 'Gastos de cancelación aplicables según anticipación al zarpe.'
            }
          }
        )
      }
      
      setResults(mockResults)
    }, 1500)
  }

  // Open checklist popup
  const handleVerifyOpen = (result) => {
    setSelectedResult(result)
    // Reset checklist state
    setChecklist({
      identity: false,
      dates: false,
      cancelation: false,
      baggage: false,
      terms: false
    })
  }

  // Toggle single checklist checkmark
  const toggleChecklist = (key) => {
    setChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  // Confirm booking and notify parent
  const handleConfirmReservation = () => {
    // Ensure everything is checked
    const allChecked = Object.values(checklist).every(val => val === true)
    if (!allChecked) return

    const newBooking = {
      id: `${selectedResult.id}-${Date.now()}`,
      title: selectedResult.title,
      description: selectedResult.description,
      meta: selectedResult.meta,
      price: selectedResult.price,
      category: selectedResult.category,
      verifiedAt: new Date().toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'verified'
    }

    onAddBooking(newBooking)
    setSelectedResult(null) // close popup
    
    // Add success flag to search results list
    setResults(prev => 
      prev.map(r => r.id === selectedResult.id ? { ...r, verified: true } : r)
    )
  }

  // Is booking confirmation allowed
  const isConfirmDisabled = !Object.values(checklist).every(val => val === true)

  return (
    <div className="booking-panel-wrapper">
      {/* 1. Categorías Menu Bar */}
      <div className="booking-glass-card" style={{ padding: '0.5rem 1rem' }}>
        <div className="category-nav-bar">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  setResults(null)
                }}
                className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
              >
                <Icon className="category-tab-icon" />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Formulario de Reserva */}
      <div className="booking-glass-card">
        <form onSubmit={handleSearchSubmit}>
          {activeCategory === 'vuelos' && (
            <>
              <div className="form-header-container">
                <h3 className="form-title">Encontrá los mejores vuelos con reserva flexible.</h3>
                <div className="form-sub-options">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="flightOption" 
                      className="radio-input" 
                      checked={formData.flightOption === 'ida-vuelta'}
                      onChange={() => handleChange('flightOption', 'ida-vuelta')}
                    />
                    Ida y vuelta
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="flightOption" 
                      className="radio-input"
                      checked={formData.flightOption === 'solo-ida'}
                      onChange={() => handleChange('flightOption', 'solo-ida')}
                    />
                    Solo ida
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="flightOption" 
                      className="radio-input"
                      checked={formData.flightOption === 'multidestino'}
                      onChange={() => handleChange('flightOption', 'multidestino')}
                    />
                    Multidestino
                  </label>
                  <button type="button" className="pill-button" onClick={() => setActiveCategory('alojamientos')}>
                    + Agregar Alojamiento
                  </button>
                </div>
              </div>

              <div className="input-row-container">
                <div className="input-block">
                  <label className="input-block-label">Salgo de</label>
                  <input 
                    type="text" 
                    className="input-block-value" 
                    placeholder="Ingresá una ciudad" 
                    value={formData.origin}
                    onChange={(e) => handleChange('origin', e.target.value)}
                  />
                </div>
                
                <div className="swap-icon-container">
                  <button type="button" onClick={handleSwap} className="swap-button" title="Intercambiar orígen y destino">
                    <ArrowLeftRight size={16} />
                  </button>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Voy a</label>
                  <input 
                    type="text" 
                    className="input-block-value" 
                    placeholder="Ingresá una ciudad" 
                    value={formData.destination}
                    onChange={(e) => handleChange('destination', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Salida</label>
                  <input 
                    type="date" 
                    className="input-block-value" 
                    value={formData.departureDate}
                    onChange={(e) => handleChange('departureDate', e.target.value)}
                  />
                </div>

                {formData.flightOption === 'ida-vuelta' && (
                  <div className="input-block">
                    <label className="input-block-label">Regreso</label>
                    <input 
                      type="date" 
                      className="input-block-value" 
                      value={formData.returnDate}
                      onChange={(e) => handleChange('returnDate', e.target.value)}
                    />
                  </div>
                )}

                <div className="input-block">
                  <label className="input-block-label">Personas</label>
                  <select 
                    className="input-block-value"
                    value={formData.passengers}
                    onChange={(e) => handleChange('passengers', e.target.value)}
                  >
                    <option>1 Persona</option>
                    <option>2 Personas</option>
                    <option>3 Personas</option>
                    <option>4 Personas</option>
                    <option>Familia (5+)</option>
                  </select>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Clase</label>
                  <select 
                    className="input-block-value"
                    value={formData.classType}
                    onChange={(e) => handleChange('classType', e.target.value)}
                  >
                    <option>Todas</option>
                    <option>Turista</option>
                    <option>Premium Economy</option>
                    <option>Business</option>
                    <option>Primera clase</option>
                  </select>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Moneda</label>
                  <select 
                    className="input-block-value"
                    value={formData.currency}
                    onChange={(e) => handleChange('currency', e.target.value)}
                  >
                    <option>$ Pesos (ARS)</option>
                    <option>U$S Dólares (USD)</option>
                    <option>€ Euros (EUR)</option>
                  </select>
                </div>

                <div className="search-button-container">
                  <button type="submit" className="search-submit-btn">
                    <Search size={18} />
                    Buscar
                  </button>
                </div>
              </div>

              <div className="form-footer-container">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    className="checkbox-input"
                    checked={formData.flexibleDates}
                    onChange={(e) => handleChange('flexibleDates', e.target.checked)}
                  />
                  Todavía no tengo fecha definida
                </label>
              </div>
            </>
          )}

          {activeCategory === 'alojamientos' && (
            <>
              <div className="form-header-container">
                <h3 className="form-title">Encontrá los mejores alojamientos para tu estadía.</h3>
                <div className="form-sub-options">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      className="radio-input"
                      checked={formData.hotelType === 'hoteles'}
                      onChange={() => handleChange('hotelType', 'hoteles')}
                    />
                    Hoteles
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      className="radio-input"
                      checked={formData.hotelType === 'deptos'}
                      onChange={() => handleChange('hotelType', 'deptos')}
                    />
                    Departamentos
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      className="radio-input"
                      checked={formData.hotelType === 'resorts'}
                      onChange={() => handleChange('hotelType', 'resorts')}
                    />
                    Resorts
                  </label>
                  <button type="button" className="pill-button" onClick={() => setActiveCategory('vuelos')}>
                    + Agregar Vuelo
                  </button>
                </div>
              </div>

              <div className="input-row-container">
                <div className="input-block" style={{ flex: '2 1 200px' }}>
                  <label className="input-block-label">Voy a</label>
                  <input 
                    type="text" 
                    className="input-block-value" 
                    placeholder="Ingresá un destino, ciudad o atracción" 
                    value={formData.destination}
                    onChange={(e) => handleChange('destination', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Check-In</label>
                  <input 
                    type="date" 
                    className="input-block-value" 
                    value={formData.departureDate}
                    onChange={(e) => handleChange('departureDate', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Check-Out</label>
                  <input 
                    type="date" 
                    className="input-block-value" 
                    value={formData.returnDate}
                    onChange={(e) => handleChange('returnDate', e.target.value)}
                  />
                </div>

                <div className="input-block" style={{ flex: '1.5 1 150px' }}>
                  <label className="input-block-label">Huéspedes y Habitaciones</label>
                  <select 
                    className="input-block-value"
                    value={formData.hotelGuests}
                    onChange={(e) => handleChange('hotelGuests', e.target.value)}
                  >
                    <option>1 Persona, 1 Hab.</option>
                    <option>2 Personas, 1 Hab.</option>
                    <option>3 Personas, 1 Hab.</option>
                    <option>4 Personas, 2 Hab.</option>
                    <option>Grupo grande (5+)</option>
                  </select>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Moneda</label>
                  <select 
                    className="input-block-value"
                    value={formData.currency}
                    onChange={(e) => handleChange('currency', e.target.value)}
                  >
                    <option>$ Pesos (ARS)</option>
                    <option>U$S Dólares (USD)</option>
                    <option>€ Euros (EUR)</option>
                  </select>
                </div>

                <div className="search-button-container">
                  <button type="submit" className="search-submit-btn">
                    <Search size={18} />
                    Buscar
                  </button>
                </div>
              </div>
            </>
          )}

          {activeCategory === 'paquetes' && (
            <>
              <div className="form-header-container">
                <h3 className="form-title">Combiná vuelo + alojamiento y ahorrá en tu viaje.</h3>
                <div className="form-sub-options">
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>✔ Vuelo + Hotel incluído</span>
                </div>
              </div>

              <div className="input-row-container">
                <div className="input-block">
                  <label className="input-block-label">Origen</label>
                  <input 
                    type="text" 
                    className="input-block-value" 
                    value={formData.origin}
                    onChange={(e) => handleChange('origin', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Destino</label>
                  <input 
                    type="text" 
                    className="input-block-value" 
                    value={formData.destination}
                    onChange={(e) => handleChange('destination', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Salida</label>
                  <input 
                    type="date" 
                    className="input-block-value" 
                    value={formData.departureDate}
                    onChange={(e) => handleChange('departureDate', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Regreso</label>
                  <input 
                    type="date" 
                    className="input-block-value" 
                    value={formData.returnDate}
                    onChange={(e) => handleChange('returnDate', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Pasajeros/Habitaciones</label>
                  <select 
                    className="input-block-value"
                    value={formData.hotelGuests}
                    onChange={(e) => handleChange('hotelGuests', e.target.value)}
                  >
                    <option>1 Persona, 1 Hab.</option>
                    <option>2 Personas, 1 Hab.</option>
                    <option>3 Personas, 1 Hab.</option>
                    <option>4 Personas, 2 Hab.</option>
                  </select>
                </div>

                <div className="search-button-container">
                  <button type="submit" className="search-submit-btn">
                    <Search size={18} />
                    Buscar
                  </button>
                </div>
              </div>
            </>
          )}

          {activeCategory === 'actividades' && (
            <>
              <div className="form-header-container">
                <h3 className="form-title">Descubrí excursiones y paseos inolvidables.</h3>
              </div>

              <div className="input-row-container">
                <div className="input-block" style={{ flex: '2 1 200px' }}>
                  <label className="input-block-label">Destino de la actividad</label>
                  <input 
                    type="text" 
                    className="input-block-value" 
                    placeholder="Ingresá una ciudad o país" 
                    value={formData.destination}
                    onChange={(e) => handleChange('destination', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Fecha del viaje</label>
                  <input 
                    type="date" 
                    className="input-block-value" 
                    value={formData.departureDate}
                    onChange={(e) => handleChange('departureDate', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Cantidad de personas</label>
                  <select 
                    className="input-block-value"
                    value={formData.passengers}
                    onChange={(e) => handleChange('passengers', e.target.value)}
                  >
                    <option>1 Persona</option>
                    <option>2 Personas</option>
                    <option>3 Personas</option>
                    <option>4 Personas</option>
                    <option>5+ Personas</option>
                  </select>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Categoría</label>
                  <select 
                    className="input-block-value"
                    value={formData.activityCategory}
                    onChange={(e) => handleChange('activityCategory', e.target.value)}
                  >
                    <option>Todas</option>
                    <option>Aventura e Deportes</option>
                    <option>Visitas Guiadas</option>
                    <option>Gastronomía</option>
                    <option>Shows & Entretenimiento</option>
                  </select>
                </div>

                <div className="search-button-container">
                  <button type="submit" className="search-submit-btn">
                    <Search size={18} />
                    Buscar
                  </button>
                </div>
              </div>
            </>
          )}

          {activeCategory === 'assistcard' && (
            <>
              <div className="form-header-container">
                <h3 className="form-title">Viajá protegido con la mejor cobertura internacional.</h3>
                <div className="form-sub-options">
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>✔ Cobertura médica, equipaje y Covid-19</span>
                </div>
              </div>

              <div className="input-row-container">
                <div className="input-block" style={{ flex: '1.5 1 150px' }}>
                  <label className="input-block-label">Destino de asistencia</label>
                  <select className="input-block-value">
                    <option>Europa & Resto del Mundo</option>
                    <option>América Latina & Caribe</option>
                    <option>Estados Unidos & Canadá</option>
                  </select>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Salida</label>
                  <input 
                    type="date" 
                    className="input-block-value" 
                    value={formData.departureDate}
                    onChange={(e) => handleChange('departureDate', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Regreso</label>
                  <input 
                    type="date" 
                    className="input-block-value" 
                    value={formData.returnDate}
                    onChange={(e) => handleChange('returnDate', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Edades de viajeros</label>
                  <input 
                    type="text" 
                    className="input-block-value" 
                    placeholder="Ej: 28, 30" 
                    value={formData.ages}
                    onChange={(e) => handleChange('ages', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Plan Sugerido</label>
                  <select 
                    className="input-block-value"
                    value={formData.insurancePlan}
                    onChange={(e) => handleChange('insurancePlan', e.target.value)}
                  >
                    <option>Básico (AC 60)</option>
                    <option>Premium (AC 150)</option>
                    <option>Máximo (AC 250)</option>
                  </select>
                </div>

                <div className="search-button-container">
                  <button type="submit" className="search-submit-btn">
                    <Search size={18} />
                    Cotizar
                  </button>
                </div>
              </div>
            </>
          )}

          {activeCategory === 'autos' && (
            <>
              <div className="form-header-container">
                <h3 className="form-title">Alquilá un auto y explorá a tu propio ritmo.</h3>
              </div>

              <div className="input-row-container">
                <div className="input-block">
                  <label className="input-block-label">Retiro en</label>
                  <input 
                    type="text" 
                    className="input-block-value" 
                    placeholder="Aeropuerto o Ciudad" 
                    value={formData.origin}
                    onChange={(e) => handleChange('origin', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Devolución en</label>
                  <input 
                    type="text" 
                    className="input-block-value" 
                    placeholder="Igual al retiro" 
                    value={formData.destination}
                    onChange={(e) => handleChange('destination', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Fecha Retiro</label>
                  <input 
                    type="date" 
                    className="input-block-value" 
                    value={formData.departureDate}
                    onChange={(e) => handleChange('departureDate', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Hora Retiro</label>
                  <input 
                    type="time" 
                    className="input-block-value" 
                    value={formData.carPickTime}
                    onChange={(e) => handleChange('carPickTime', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Fecha Devolución</label>
                  <input 
                    type="date" 
                    className="input-block-value" 
                    value={formData.returnDate}
                    onChange={(e) => handleChange('returnDate', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Hora Devolución</label>
                  <input 
                    type="time" 
                    className="input-block-value" 
                    value={formData.carDropTime}
                    onChange={(e) => handleChange('carDropTime', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Categoría Vehículo</label>
                  <select 
                    className="input-block-value"
                    value={formData.carType}
                    onChange={(e) => handleChange('carType', e.target.value)}
                  >
                    <option>Económico</option>
                    <option>Compacto / Mediano</option>
                    <option>SUV / Camioneta</option>
                    <option>Lujo / Convertible</option>
                  </select>
                </div>

                <div className="search-button-container">
                  <button type="submit" className="search-submit-btn">
                    <Search size={18} />
                    Buscar
                  </button>
                </div>
              </div>
            </>
          )}

          {activeCategory === 'disney' && (
            <>
              <div className="form-header-container">
                <h3 className="form-title">Viví la magia de Walt Disney World Resort.</h3>
                <div className="form-sub-options">
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>✔ Distribuidores Oficiales de Tickets</span>
                </div>
              </div>

              <div className="input-row-container">
                <div className="input-block" style={{ flex: '1.5 1 150px' }}>
                  <label className="input-block-label">Tipo de Pase</label>
                  <select 
                    className="input-block-value"
                    value={formData.ticketType}
                    onChange={(e) => handleChange('ticketType', e.target.value)}
                  >
                    <option>Base (1 Parque por Día)</option>
                    <option>Park Hopper (Múltiples Parques)</option>
                    <option>Park Hopper Plus (Incluye Parques Acuáticos)</option>
                  </select>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Fecha de Inicio</label>
                  <input 
                    type="date" 
                    className="input-block-value" 
                    value={formData.departureDate}
                    onChange={(e) => handleChange('departureDate', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Días de Entrada</label>
                  <select 
                    className="input-block-value"
                    value={formData.disneyDays}
                    onChange={(e) => handleChange('disneyDays', e.target.value)}
                  >
                    <option>1 Día</option>
                    <option>2 Días</option>
                    <option>3 Días</option>
                    <option>4 Días</option>
                    <option>5 Días</option>
                    <option>7 Días</option>
                    <option>10 Días</option>
                  </select>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Visitantes</label>
                  <select 
                    className="input-block-value"
                    value={formData.passengers}
                    onChange={(e) => handleChange('passengers', e.target.value)}
                  >
                    <option>1 Adulto</option>
                    <option>2 Adultos</option>
                    <option>2 Adultos, 1 Niño</option>
                    <option>2 Adultos, 2 Niños</option>
                    <option>Grupo Familiar (5+)</option>
                  </select>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Moneda</label>
                  <select 
                    className="input-block-value"
                    value={formData.currency}
                    onChange={(e) => handleChange('currency', e.target.value)}
                  >
                    <option>$ Pesos (ARS)</option>
                    <option>U$S Dólares (USD)</option>
                  </select>
                </div>

                <div className="search-button-container">
                  <button type="submit" className="search-submit-btn">
                    <Search size={18} />
                    Cotizar
                  </button>
                </div>
              </div>
            </>
          )}

          {activeCategory === 'universal' && (
            <>
              <div className="form-header-container">
                <h3 className="form-title">Experimentá la emoción de Universal Orlando Resort.</h3>
              </div>

              <div className="input-row-container">
                <div className="input-block" style={{ flex: '1.5 1 150px' }}>
                  <label className="input-block-label">Tipo de Ticket</label>
                  <select className="input-block-value">
                    <option>Pase Promo: 3 Parques al precio de 2</option>
                    <option>Pase 2 Parques (Park-to-Park)</option>
                    <option>Tickets de 1 Día (Parque a Parque)</option>
                  </select>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Fecha de Inicio</label>
                  <input 
                    type="date" 
                    className="input-block-value" 
                    value={formData.departureDate}
                    onChange={(e) => handleChange('departureDate', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Días de Entrada</label>
                  <select 
                    className="input-block-value"
                    value={formData.disneyDays}
                    onChange={(e) => handleChange('disneyDays', e.target.value)}
                  >
                    <option>2 Días</option>
                    <option>3 Días</option>
                    <option>4 Días</option>
                    <option>5 Días</option>
                  </select>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Visitantes</label>
                  <select 
                    className="input-block-value"
                    value={formData.passengers}
                    onChange={(e) => handleChange('passengers', e.target.value)}
                  >
                    <option>1 Persona</option>
                    <option>2 Personas</option>
                    <option>3 Personas</option>
                    <option>4 Personas</option>
                    <option>5+ Personas</option>
                  </select>
                </div>

                <div className="search-button-container">
                  <button type="submit" className="search-submit-btn">
                    <Search size={18} />
                    Cotizar
                  </button>
                </div>
              </div>
            </>
          )}

          {activeCategory === 'circuitos' && (
            <>
              <div className="form-header-container">
                <h3 className="form-title">Viajes grupales diseñados con itinerarios exclusivos.</h3>
              </div>

              <div className="input-row-container">
                <div className="input-block" style={{ flex: '1.8 1 180px' }}>
                  <label className="input-block-label">Destino / Región</label>
                  <select className="input-block-value">
                    <option>Europa (España, Italia, Francia y más)</option>
                    <option>Medio Oriente (Egipto, Jordania, Turquía)</option>
                    <option>Asia (Japón, China, Sudeste Asiático)</option>
                    <option>Sudamérica (Patagonia, Machu Picchu)</option>
                  </select>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Mes de viaje</label>
                  <select 
                    className="input-block-value"
                    value={formData.tourMonth}
                    onChange={(e) => handleChange('tourMonth', e.target.value)}
                  >
                    <option>Mayo 2026</option>
                    <option>Junio 2026</option>
                    <option>Septiembre 2026</option>
                    <option>Octubre 2026</option>
                  </select>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Duración aproximada</label>
                  <select 
                    className="input-block-value"
                    value={formData.tourDuration}
                    onChange={(e) => handleChange('tourDuration', e.target.value)}
                  >
                    <option>1 semana</option>
                    <option>2 semanas</option>
                    <option>3 semanas o más</option>
                  </select>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Pasajeros</label>
                  <select 
                    className="input-block-value"
                    value={formData.passengers}
                    onChange={(e) => handleChange('passengers', e.target.value)}
                  >
                    <option>1 Pasajero</option>
                    <option>2 Pasajeros</option>
                    <option>3 Pasajeros</option>
                    <option>4 Pasajeros</option>
                  </select>
                </div>

                <div className="search-button-container">
                  <button type="submit" className="search-submit-btn">
                    <Search size={18} />
                    Buscar
                  </button>
                </div>
              </div>
            </>
          )}

          {activeCategory === 'cruceros' && (
            <>
              <div className="form-header-container">
                <h3 className="form-title">Navegá por los mares más hermosos del mundo.</h3>
              </div>

              <div className="input-row-container">
                <div className="input-block" style={{ flex: '1.5 1 150px' }}>
                  <label className="input-block-label">Destino / Puerto</label>
                  <select className="input-block-value">
                    <option>Caribe (Oriental, Occidental, Bahamas)</option>
                    <option>Mediterráneo (Italia, Grecia, España)</option>
                    <option>Fiordos Noruegos & Norte de Europa</option>
                    <option>Cruceros transatlánticos</option>
                  </select>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Mes de salida</label>
                  <select 
                    className="input-block-value"
                    value={formData.tourMonth}
                    onChange={(e) => handleChange('tourMonth', e.target.value)}
                  >
                    <option>Mayo 2026</option>
                    <option>Junio 2026</option>
                    <option>Julio 2026</option>
                    <option>Agosto 2026</option>
                    <option>Diciembre 2026</option>
                  </select>
                </div>

                <div className="input-block">
                  <label className="input-block-label">Naviera / Crucero</label>
                  <select 
                    className="input-block-value"
                    value={formData.cruiseLine}
                    onChange={(e) => handleChange('cruiseLine', e.target.value)}
                  >
                    <option>Royal Caribbean</option>
                    <option>MSC Cruceros</option>
                    <option>Costa Cruceros</option>
                    <option>Celebrity Cruises</option>
                  </select>
                </div>

                <div className="input-block" style={{ flex: '1.2 1 120px' }}>
                  <label className="input-block-label">Cabinas</label>
                  <select 
                    className="input-block-value"
                    value={formData.cabins}
                    onChange={(e) => handleChange('cabins', e.target.value)}
                  >
                    <option>1 Cabina Interna</option>
                    <option>1 Cabina Exterior</option>
                    <option>1 Balcón al mar</option>
                    <option>Suite Premium (2+ pers.)</option>
                  </select>
                </div>

                <div className="search-button-container">
                  <button type="submit" className="search-submit-btn">
                    <Search size={18} />
                    Buscar
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>

      {/* 3. Micro-animación de carga */}
      {searching && (
        <div className="booking-glass-card search-loading-container">
          <div className="loading-spinner"></div>
          <span className="loading-text">Buscando las mejores ofertas de Horus...</span>
        </div>
      )}

      {/* 4. Resultados de Búsqueda y Acción de Verificación */}
      {results && !searching && (
        <div className="search-results-wrapper">
          <div className="booking-glass-card">
            <h4 className="results-header-title">
              <CheckCircle2 size={18} color="#2dd4bf" />
              Verificá y confirmá las opciones disponibles:
            </h4>
            
            <div className="results-grid">
              {results.map((result) => (
                <div 
                  key={result.id} 
                  className={`result-item-card ${result.promoted ? 'promoted' : ''}`}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span className="card-header-badge">{result.category}</span>
                      {result.verified && (
                        <span style={{ color: '#2dd4bf', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          ✓ Verificado
                        </span>
                      )}
                    </div>
                    <h5 className="card-main-title">{result.title}</h5>
                    <p className="card-detail-text" style={{ fontWeight: '500', color: '#ffffff' }}>{result.description}</p>
                    <p className="card-detail-text" style={{ fontSize: '0.8rem', opacity: 0.7 }}>{result.meta}</p>
                  </div>
                  
                  <div className="card-price-container">
                    <div>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Precio Final</span>
                      <div className="card-price-value">{result.price}</div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handleVerifyOpen(result)}
                      className="card-verify-btn"
                      disabled={result.verified}
                    >
                      {result.verified ? 'Verificado' : 'Verificar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Panel/Checklist de Verificación Detallada */}
      {selectedResult && (
        <div className="verification-drawer-backdrop" onClick={() => setSelectedResult(null)}>
          <div className="verification-drawer-container" onClick={(e) => e.stopPropagation()}>
            <div className="verification-drawer-header">
              <div className="verification-drawer-title">Verificación de Reserva</div>
              <button className="close-drawer-btn" onClick={() => setSelectedResult(null)}>
                <X size={18} />
              </button>
            </div>

            <div>
              <div className="card-header-badge" style={{ marginBottom: '0.5rem' }}>{selectedResult.category}</div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem' }}>
                {selectedResult.title}
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                {selectedResult.description}
              </p>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                {selectedResult.meta}
              </p>
            </div>

            <div style={{ padding: '1rem', background: 'rgba(255, 215, 0, 0.05)', border: '1px solid rgba(255, 215, 0, 0.15)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#ffd700', fontWeight: '600' }}>Importe a Confirmar:</span>
                <span style={{ fontSize: '1.2rem', color: '#ffd700', fontWeight: 'bold' }}>{selectedResult.price}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.4)', fontWeight: 'bold' }}>
                Lista de Verificación Obligatoria:
              </span>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', margin: '0 0 0.5rem 0' }}>
                Por favor, compruebe cada ítem para asegurar que los datos del viaje sean 100% correctos.
              </p>

              <div className="verification-checklist-container">
                {/* Check 1 */}
                <div 
                  className={`verification-check-item ${checklist.identity ? 'checked' : ''}`}
                  onClick={() => toggleChecklist('identity')}
                >
                  <div className="verify-checkbox-box"></div>
                  <div>
                    <div className="verify-check-label">Identificación de Viajeros</div>
                    <div className="verify-check-desc">{selectedResult.checklistDetails?.identity}</div>
                  </div>
                </div>

                {/* Check 2 */}
                <div 
                  className={`verification-check-item ${checklist.dates ? 'checked' : ''}`}
                  onClick={() => toggleChecklist('dates')}
                >
                  <div className="verify-checkbox-box"></div>
                  <div>
                    <div className="verify-check-label">Fechas e Itinerario</div>
                    <div className="verify-check-desc">Coincide con salida el {formData.departureDate} {formData.returnDate ? `y regreso el ${formData.returnDate}` : ''}.</div>
                  </div>
                </div>

                {/* Check 3 */}
                <div 
                  className={`verification-check-item ${checklist.baggage ? 'checked' : ''}`}
                  onClick={() => toggleChecklist('baggage')}
                >
                  <div className="verify-checkbox-box"></div>
                  <div>
                    <div className="verify-check-label">Políticas de Equipaje y Franquicia</div>
                    <div className="verify-check-desc">{selectedResult.checklistDetails?.baggage}</div>
                  </div>
                </div>

                {/* Check 4 */}
                <div 
                  className={`verification-check-item ${checklist.cancelation ? 'checked' : ''}`}
                  onClick={() => toggleChecklist('cancelation')}
                >
                  <div className="verify-checkbox-box"></div>
                  <div>
                    <div className="verify-check-label">Políticas de Cambio y Cancelación</div>
                    <div className="verify-check-desc">{selectedResult.checklistDetails?.cancelation}</div>
                  </div>
                </div>

                {/* Check 5 */}
                <div 
                  className={`verification-check-item ${checklist.terms ? 'checked' : ''}`}
                  onClick={() => toggleChecklist('terms')}
                >
                  <div className="verify-checkbox-box"></div>
                  <div>
                    <div className="verify-check-label">Aceptación de Términos y Tarifas</div>
                    <div className="verify-check-desc">Confirmo que he leído y acepto los términos de intermediación del operador.</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleConfirmReservation}
              disabled={isConfirmDisabled}
              className="search-submit-btn"
              style={{
                width: '100%',
                justifyContent: 'center',
                background: isConfirmDisabled ? 'rgba(255, 255, 255, 0.05)' : 'linear-gradient(135deg, #10b981, #059669)',
                color: isConfirmDisabled ? 'rgba(255, 255, 255, 0.25)' : '#ffffff',
                boxShadow: isConfirmDisabled ? 'none' : '0 4px 15px rgba(16, 185, 129, 0.3)',
                cursor: isConfirmDisabled ? 'not-allowed' : 'pointer',
                border: isConfirmDisabled ? '1px solid rgba(255,255,255,0.05)' : 'none'
              }}
            >
              <CheckSquare size={18} />
              Confirmar y Registrar Reserva
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
