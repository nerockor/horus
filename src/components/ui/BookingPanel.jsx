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
  CheckSquare,
  Music
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
  { id: 'conciertos', label: 'Conciertos', icon: Music },
  { id: 'autos', label: 'Autos', icon: Car },
  { id: 'disney', label: 'Disney', icon: DisneyIcon },
  { id: 'universal', label: 'Universal', icon: Globe },
  { id: 'circuitos', label: 'Circuitos', icon: Route },
  { id: 'cruceros', label: 'Cruceros', icon: Ship },
]

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
    id: 'p-vuelo-miami-promo',
    category: 'vuelos',
    name: '🌴 ¡MIAMI TE ESPERA! 🌴',
    location: 'Miami, EE.UU.',
    startDate: '2026-06-01',
    endDate: '2026-12-31',
    duration: 'Ida y Vuelta (Escalas/Directo)',
    imageUrl: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=600&q=80',
    price: '450',
    bonus: '0',
    targetAudience: 'Todo Público',
    description: '¿Sueñas con caminar por South Beach, hacer compras en Dolphin Mall o visitar Disney World? Vuela desde Caracas, Barcelona, Maracaibo o Barquisimeto con American Airlines, Laser, Copa o United Airlines. Incluye gestión de documentación y atención 24/7 con Horus Tours.',
    checklistDetails: {
      baggage: 'Equipaje de mano y maleta de bodega incluidos según la aerolínea seleccionada (Laser, Copa, American, United).',
      identity: 'Pasaporte vigente y Visa Americana (B1/B2) obligatoria para el ingreso a EE.UU. Gestión de documentación incluida.',
      cancelation: 'Tarifa promocional sujeta a disponibilidad de plazas. Cambios de fecha permitidos con penalidad según la regulación de la tarifa aérea.'
    }
  },
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
    id: 'p-dubai-vip',
    category: 'alojamientos',
    name: '✨ DUBÁI EXCLUSIVO VIP – Burj Khalifa & Desierto ✨',
    location: 'Dubái, Emiratos Árabes Unidos',
    startDate: '2026-06-01',
    endDate: '2026-12-31',
    duration: '8 Días / 7 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    price: '1450',
    bonus: '0',
    targetAudience: 'Todo Público',
    description: '¿Te imaginas despertar frente al Burj Khalifa, hacer safari en el desierto y perder la noción del tiempo en los mercados de Dubái? Te llevamos desde Caracas con todo resuelto: vuelos con conexiones optimizadas, gestión de visa, hoteles seleccionados, traslados privados, tours y asistencia 24/7.',
    checklistDetails: {
      baggage: 'Vuelos ida/vuelta desde Caracas con equipaje de bodega y de mano incluidos en todas las conexiones.',
      identity: 'Pasaporte vigente por al menos 6 meses. Trámite y costo de visa para Emiratos Árabes Unidos incluidos en el paquete.',
      cancelation: 'Reserva flexible con cupos limitados por vuelo. Descuentos especiales por early booking y opciones de financiamiento.'
    }
  },
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
  // 5. Conciertos
  {
    id: 'p-karol-g',
    category: 'conciertos',
    name: '🎤✨ KAROL G – Viajando por el Mundo TROPITOUR – Bogotá ✨🎤',
    location: 'Bogotá, Colombia',
    startDate: '2026-12-03',
    endDate: '2026-12-06',
    duration: '4 Días / 3 Noches',
    imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=600&q=80',
    price: '735',
    bonus: '0',
    targetAudience: '2 Adultos',
    description: 'Concierto el 04 de diciembre de 2026. Incluye: Vuelos ida y vuelta con Láser Airlines, Hospedaje en NH Royal Urban 26 con desayuno, traslados privados y entrada al concierto (Opciones: Preferencial USD 735, Oriental Baja USD 769, VIP Oriental USD 1110).',
    checklistDetails: {
      baggage: 'Vuelos ida/vuelta CCS (08:30) ↔ BOG (09:10) / BOG (10:20) ↔ CCS (13:00). Traslado privado aeropuerto/hotel/aeropuerto.',
      identity: 'Pasaporte vigente al menos por 6 meses. Entrada nominativa al concierto según la opción de entrada seleccionada.',
      cancelation: 'Tarifas no reembolsables ni transferibles. Ingreso permitido solo a mayores de 10 años. Menores deben ir acompañados por un adulto (+18).'
    }
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

export default function BookingPanel({ activeBookings = [], onAddBooking }) {
  const [activeCategory, setActiveCategory] = useState('vuelos')
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState(null)
  const [selectedResult, setSelectedResult] = useState(null)

  // Get latest created package/service for active category to show as quick access
  const storedPackagesList = (() => {
    let list = JSON.parse(localStorage.getItem('horus_packages') || '[]');
    if (list.length === 0 || list.some(p => p.category === 'assistcard') || !list.some(p => p.id === 'p-karol-g') || !list.some(p => p.id === 'p-vuelo-miami-promo') || !list.some(p => p.id === 'p-dubai-vip')) {
      list = SEED_PACKAGES;
      localStorage.setItem('horus_packages', JSON.stringify(SEED_PACKAGES));
    }
    return list;
  })()
  const categoryPackagesList = storedPackagesList.filter(p => (p.category || 'paquetes') === activeCategory)
  const latestPkg = categoryPackagesList.length > 0 ? categoryPackagesList[categoryPackagesList.length - 1] : null

  // Package inquiry calculator states
  const [calcPackage, setCalcPackage] = useState(null)
  const [passengerCount, setPassengerCount] = useState(2)
  const [calcClientName, setCalcClientName] = useState('')
  const [calcClientContact, setCalcClientContact] = useState('')
  
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

  // Update default destination and fields based on the latest package of the active category, and load previews automatically
  useEffect(() => {
    let storedPackages = JSON.parse(localStorage.getItem('horus_packages') || '[]')
    
    // Seed database with mock packages if it's empty
    if (storedPackages.length === 0) {
      storedPackages = SEED_PACKAGES
      localStorage.setItem('horus_packages', JSON.stringify(SEED_PACKAGES))
    }

    const categoryPackages = storedPackages.filter(p => (p.category || 'paquetes') === activeCategory)
    
    if (categoryPackages.length > 0) {
      const latest = categoryPackages[categoryPackages.length - 1]
      setFormData(prev => ({
        ...prev,
        destination: latest.location || latest.name || prev.destination,
        departureDate: latest.startDate || prev.departureDate,
        returnDate: latest.endDate || prev.returnDate,
      }))
    }

    // Load preview results immediately for the active category
    const mockResults = []
    categoryPackages.forEach(p => {
      const discount = parseFloat(p.bonus || '0')
      const originalPrice = parseFloat(p.price || '0')
      const finalPrice = discount > 0 ? originalPrice * (1 - discount/100) : originalPrice

      mockResults.push({
        id: p.id,
        title: p.name,
        description: `Servicio en ${p.location}`,
        meta: `Duración: ${p.duration} | Promoción hasta: ${p.endDate} | Público: ${p.targetAudience}`,
        price: `$ ${finalPrice.toLocaleString('es-AR', { maximumFractionDigits: 0 })}`,
        originalPriceRaw: originalPrice,
        finalPriceRaw: finalPrice,
        discountRaw: discount,
        durationRaw: p.duration,
        imageUrlRaw: p.imageUrl,
        locationRaw: p.location,
        audienceRaw: p.targetAudience,
        category: p.category || 'paquetes',
        promoted: discount > 0,
        checklistDetails: {
          baggage: 'Sujeto a las condiciones particulares del servicio adquirido.',
          identity: 'Es obligatorio presentar DNI o Pasaporte vigente al momento de viajar.',
          cancelation: 'Verificar políticas de cancelación específicas para esta tarifa.'
        }
      })
    })

    // Append custom query option
    mockResults.push({
      id: `custom-query-${activeCategory}`,
      title: `¿No encontrás lo que buscás?`,
      description: `Hacé una consulta personalizada para la categoría ${activeCategory.toUpperCase()} y un agente te contactará a la brevedad con una cotización a tu medida.`,
      meta: `Respuesta rápida (Menos de 24hs)`,
      price: 'A cotizar',
      category: activeCategory,
      promoted: false,
      isCustomQuery: true,
      checklistDetails: {
        baggage: 'A coordinar con el agente de ventas.',
        identity: 'Los datos requeridos se informarán en la cotización.',
        cancelation: 'Condiciones sujetas al servicio que contrates.'
      }
    })

    setResults(mockResults)
  }, [activeCategory])

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
    if (e && e.preventDefault) e.preventDefault()
    setSearching(true)
    setResults(null)
    
    setTimeout(() => {
      setSearching(false)
      
      // Search results depending on the active category
      const mockResults = []
      const c = activeCategory
      
      let storedPackages = JSON.parse(localStorage.getItem('horus_packages') || '[]')
      let filtered = storedPackages.filter(p => (p.category || 'paquetes') === c)

      // Filter by destination search query if typed
      const searchDest = formData.destination.trim().toLowerCase()
      if (searchDest) {
        filtered = filtered.filter(p => 
          (p.location && p.location.toLowerCase().includes(searchDest)) ||
          (p.name && p.name.toLowerCase().includes(searchDest))
        )
      }
      
      filtered.forEach(p => {
        const discount = parseFloat(p.bonus || '0')
        const originalPrice = parseFloat(p.price || '0')
        const finalPrice = discount > 0 ? originalPrice * (1 - discount/100) : originalPrice

        mockResults.push({
          id: p.id,
          title: p.name,
          description: `Servicio en ${p.location}`,
          meta: `Duración: ${p.duration} | Promoción hasta: ${p.endDate} | Público: ${p.targetAudience}`,
          price: `$ ${finalPrice.toLocaleString('es-AR', { maximumFractionDigits: 0 })}`,
          originalPriceRaw: originalPrice,
          finalPriceRaw: finalPrice,
          discountRaw: discount,
          durationRaw: p.duration,
          imageUrlRaw: p.imageUrl,
          locationRaw: p.location,
          audienceRaw: p.targetAudience,
          category: p.category || 'paquetes',
          promoted: discount > 0,
          checklistDetails: {
            baggage: 'Sujeto a las condiciones particulares del servicio adquirido.',
            identity: 'Es obligatorio presentar DNI o Pasaporte vigente al momento de viajar.',
            cancelation: 'Verificar políticas de cancelación específicas para esta tarifa.'
          }
        })
      })

      // Always append a "Consulta Personalizada" card at the end
      mockResults.push({
        id: `custom-query-${c}`,
        title: `¿No encontrás lo que buscás?`,
        description: `Hacé una consulta personalizada para la categoría ${c.toUpperCase()} y un agente te contactará a la brevedad con una cotización a tu medida.`,
        meta: `Respuesta rápida (Menos de 24hs)`,
        price: 'A cotizar',
        category: c,
        promoted: false,
        isCustomQuery: true,
        checklistDetails: {
          baggage: 'A coordinar con el agente de ventas.',
          identity: 'Los datos requeridos se informarán en la cotización.',
          cancelation: 'Condiciones sujetas al servicio que contrates.'
        }
      })
      
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

    const hasRawPrice = selectedResult.finalPriceRaw !== undefined
    const finalPriceVal = hasRawPrice 
      ? `$ ${(selectedResult.finalPriceRaw * passengerCount).toLocaleString('es-AR', { maximumFractionDigits: 0 })}` 
      : selectedResult.price
    const finalDesc = hasRawPrice
      ? `${selectedResult.description} | Pasajeros: ${passengerCount}`
      : selectedResult.description

    const newBooking = {
      id: `${selectedResult.id}-${Date.now()}`,
      title: selectedResult.title,
      description: finalDesc,
      meta: selectedResult.meta,
      price: finalPriceVal,
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

    // Save to localStorage for Admin Panel
    const existingBookings = JSON.parse(localStorage.getItem('horus_bookings') || '[]')
    localStorage.setItem('horus_bookings', JSON.stringify([newBooking, ...existingBookings]))

    // Add query to Admin Panel
    const newQuery = {
      id: `q-p-${Date.now()}`,
      clientName: `Reserva / Consulta Cliente`,
      contact: `Sugerido por buscador`,
      message: selectedResult.isCustomQuery
        ? `Solicita consulta personalizada para la categoría ${selectedResult.category.toUpperCase()}.`
        : `Consulta por "${selectedResult.title}" para ${passengerCount} pasajeros. Total cotizado: ${finalPriceVal}.`,
      date: new Date().toLocaleString('es-ES'),
      status: 'Pendiente',
      category: selectedResult.category
    }
    const existingQueries = JSON.parse(localStorage.getItem('horus_queries') || '[]')
    localStorage.setItem('horus_queries', JSON.stringify([newQuery, ...existingQueries]))

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
      <div 
        className="booking-glass-card sticky-category-container" 
        style={{ padding: '0.5rem 1rem' }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
        }}
        onMouseDown={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
          e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
        }}
        onTouchMove={(e) => {
          if (e.touches && e.touches[0]) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
            e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
          }
        }}
        onTouchStart={(e) => {
          if (e.touches && e.touches[0]) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.touches[0].clientX - rect.left;
            const y = e.touches[0].clientY - rect.top;
            e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
            e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
          }
        }}
      >
        <div className="category-nav-bar">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                }}
                className={`category-tab category-tab-${cat.id} ${activeCategory === cat.id ? 'active' : ''}`}
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

          {activeCategory === 'conciertos' && (
            <>
              <div className="form-header-container">
                <h3 className="form-title">Viví los mejores shows y conciertos del mundo.</h3>
                <div className="form-sub-options">
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>✔ Entradas oficiales garantizadas, vuelos, hospedaje y traslados incluidos.</span>
                </div>
              </div>

              <div className="input-row-container">
                <div className="input-block" style={{ flex: '1.5 1 150px' }}>
                  <label className="input-block-label">Destino / Concierto</label>
                  <select className="input-block-value">
                    <option>Bogotá, Colombia (Karol G)</option>
                    <option>Buenos Aires, Argentina</option>
                    <option>Santiago, Chile</option>
                    <option>Miami, EE.UU.</option>
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
                  <label className="input-block-label">Pasajeros</label>
                  <input 
                    type="text" 
                    className="input-block-value" 
                    placeholder="Ej: 2 adultos" 
                    value={formData.ages}
                    onChange={(e) => handleChange('ages', e.target.value)}
                  />
                </div>

                <div className="input-block">
                  <label className="input-block-label">Ubicación de Entrada</label>
                  <select 
                    className="input-block-value"
                    value={formData.insurancePlan}
                    onChange={(e) => handleChange('insurancePlan', e.target.value)}
                  >
                    <option>Preferencial (De pie)</option>
                    <option>Oriental Baja (Asiento)</option>
                    <option>VIP Oriental (De pie)</option>
                  </select>
                </div>

                <div className="search-button-container">
                  <button type="submit" className="search-submit-btn">
                    <Search size={18} />
                    Buscar Shows
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
        {latestPkg && (
          <div style={{ 
            marginTop: '1.25rem', 
            paddingTop: '0.85rem', 
            borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
            fontSize: '0.85rem', 
            color: 'rgba(255,255,255,0.7)', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.6rem',
            flexWrap: 'wrap'
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#ffd700', fontWeight: '600' }}>
              ★ Acceso rápido recomendado:
            </span>
            <button
              type="button"
              onClick={() => {
                setFormData(prev => ({
                  ...prev,
                  destination: latestPkg.location || latestPkg.name,
                  departureDate: latestPkg.startDate || prev.departureDate,
                  returnDate: latestPkg.endDate || prev.returnDate,
                }));
                
                // Automatically run handleSearchSubmit
                setSearching(true);
                setResults(null);
                
                setTimeout(() => {
                  setSearching(false);
                  const mockResults = [];
                  const c = activeCategory;
                  
                  let storedPackages = JSON.parse(localStorage.getItem('horus_packages') || '[]');
                  let filtered = storedPackages.filter(p => (p.category || 'paquetes') === c);

                  const searchDest = (latestPkg.location || latestPkg.name).trim().toLowerCase();
                  if (searchDest) {
                    filtered = filtered.filter(p => 
                      (p.location && p.location.toLowerCase().includes(searchDest)) ||
                      (p.name && p.name.toLowerCase().includes(searchDest))
                    );
                  }

                  filtered.forEach(p => {
                    const discount = parseFloat(p.bonus || '0');
                    const originalPrice = parseFloat(p.price || '0');
                    const finalPrice = discount > 0 ? originalPrice * (1 - discount/100) : originalPrice;

                    mockResults.push({
                      id: p.id,
                      title: p.name,
                      description: `Servicio en ${p.location}`,
                      meta: `Duración: ${p.duration} | Promoción hasta: ${p.endDate} | Público: ${p.targetAudience}`,
                      price: `$ ${finalPrice.toLocaleString('es-AR', { maximumFractionDigits: 0 })}`,
                      originalPriceRaw: originalPrice,
                      finalPriceRaw: finalPrice,
                      discountRaw: discount,
                      durationRaw: p.duration,
                      imageUrlRaw: p.imageUrl,
                      locationRaw: p.location,
                      audienceRaw: p.targetAudience,
                      category: p.category || 'paquetes',
                      promoted: discount > 0,
                      checklistDetails: {
                        baggage: 'Sujeto a las condiciones particulares del servicio adquirido.',
                        identity: 'Es obligatorio presentar DNI o Pasaporte vigente al momento de viajar.',
                        cancelation: 'Verificar políticas de cancelación específicas para esta tarifa.'
                      }
                    });
                  });

                  mockResults.push({
                    id: `custom-query-${c}`,
                    title: `¿No encontrás lo que buscás?`,
                    description: `Hacé una consulta personalizada para la categoría ${c.toUpperCase()} y un agente te contactará a la brevedad con una cotización a tu medida.`,
                    meta: `Respuesta rápida (Menos de 24hs)`,
                    price: 'A cotizar',
                    category: c,
                    promoted: false,
                    isCustomQuery: true,
                    checklistDetails: {
                      baggage: 'A coordinar con el agente de ventas.',
                      identity: 'Los datos requeridos se informarán en la cotización.',
                      cancelation: 'Condiciones sujetas al servicio que contrates.'
                    }
                  });

                  setResults(mockResults);
                }, 1000);
              }}
              style={{
                background: 'rgba(255, 215, 0, 0.12)',
                border: '1px solid rgba(255, 215, 0, 0.3)',
                color: '#ffd700',
                padding: '0.3rem 0.8rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                transition: 'all 0.2s',
                fontFamily: 'Outfit, sans-serif'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 215, 0, 0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 215, 0, 0.12)'}
            >
              {latestPkg.name} (Destino: {latestPkg.location || 'Consultar'})
            </button>
          </div>
        )}
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
              {results.map((result) => {
                if (!result.isCustomQuery) {
                  return (
                    <div key={result.id} className="despegar-package-card" style={{ position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', bottom: '-20px', right: '-10px', fontSize: '140px', opacity: 0.03, pointerEvents: 'none', zIndex: 0, color: 'var(--dark-text)', lineHeight: 1 }}>
                        {['☥', '𓊵', '𓄤', '𓂀'][result.id.charCodeAt(result.id.length - 1) % 4]}
                      </div>
                      <div className="despegar-img-container" style={{ position: 'relative', zIndex: 1 }}>
                        <img src={result.imageUrlRaw || 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80'} alt={result.title} className="despegar-img" />
                        <div className="despegar-duration-badge">{(result.durationRaw || 'Consultar').toUpperCase()}</div>
                      </div>
                      <div className="despegar-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="despegar-label">{result.category ? result.category.toUpperCase() : 'PAQUETE'}</span>
                          <div className="despegar-rating-container">
                            <span className="despegar-rating-badge">8.8</span>
                            <span className="despegar-stars">★★★</span>
                          </div>
                        </div>
                        <h5 className="despegar-title">{result.title}</h5>
                        <p className="despegar-location">Saliendo desde {result.locationRaw || 'Buenos Aires'}</p>
                        <p className="despegar-includes">
                          {result.category === 'paquetes' ? 'Hotel + Vuelo' : 
                           result.category === 'vuelos' ? 'Vuelo Directo / Escalas' :
                           result.category === 'alojamientos' ? 'Estadía Completa' : 
                           result.category === 'actividades' ? 'Actividad / Tour' : 
                           `${result.category ? result.category.charAt(0).toUpperCase() + result.category.slice(1) : 'Servicio Especial'}`}
                        </p>
                        
                        <div style={{ display: 'flex', gap: '0.4rem', margin: '0.4rem 0', flexWrap: 'wrap' }}>
                          <span className="despegar-tag purple">Oferta Imbatible</span>
                          {result.discountRaw > 0 && (
                            <span className="despegar-tag green">
                              Ahorrás $ {(result.originalPriceRaw - result.finalPriceRaw).toLocaleString('es-AR', { maximumFractionDigits: 0 })}
                            </span>
                          )}
                          {result.verified && (
                            <span style={{ color: '#2dd4bf', fontSize: '0.75rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.2rem', marginLeft: 'auto' }}>
                              ✓ Verificado
                            </span>
                          )}
                        </div>

                        <div className="despegar-price-section">
                          <span className="despegar-price-label">Precio final por persona</span>
                          {result.discountRaw > 0 && (
                            <span className="despegar-old-price">$ {result.originalPriceRaw.toLocaleString('es-AR', { maximumFractionDigits: 0 })}</span>
                          )}
                          <div className="despegar-final-price">
                            <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{(result.category === 'conciertos' || result.finalPriceRaw < 5000) ? 'USD $' : '$ '}</span>
                            {result.finalPriceRaw.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
                          </div>
                          <p className="despegar-tax-notice">No vas a pagar Percepción RG5617</p>
                        </div>

                        <div className="despegar-points-footer">
                          <span className="despegar-passport-icon">🎟</span>
                          <span>Pasaporte Horus: Sumarías <strong>{(result.category === 'conciertos' || result.finalPriceRaw < 5000) ? (result.finalPriceRaw * 1.5).toFixed(0) : (result.finalPriceRaw / 1000).toFixed(0)} puntos</strong></span>
                        </div>

                        <button 
                          type="button" 
                          onClick={() => {
                            setPassengerCount(2);
                            handleVerifyOpen(result);
                          }}
                          className="despegar-consult-btn"
                          disabled={result.verified}
                          style={{
                            width: '100%',
                            marginTop: '0.75rem',
                          }}
                        >
                          {result.verified ? 'Verificado' : 'Consultar'}
                        </button>
                      </div>
                    </div>
                  )
                }

                return (
                  <div 
                    key={result.id} 
                    className={`result-item-card ${result.promoted ? 'promoted' : ''}`}
                    style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(45, 212, 191, 0.1) 0%, rgba(13, 148, 136, 0.1) 100%)', borderColor: 'rgba(45, 212, 191, 0.3)' }}
                  >
                    <div style={{ position: 'absolute', bottom: '-20px', right: '-10px', fontSize: '140px', opacity: 0.05, pointerEvents: 'none', zIndex: 0, color: 'var(--sea-blue)', lineHeight: 1 }}>
                      {['☥', '𓊵', '𓄤', '𓂀'][result.id.charCodeAt(result.id.length - 1) % 4]}
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="card-header-badge" style={{ backgroundColor: 'rgba(45, 212, 191, 0.2)', color: '#2dd4bf' }}>CONSULTA PERSONALIZADA</span>
                        {result.verified && (
                          <span style={{ color: '#2dd4bf', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                            ✓ Enviada
                          </span>
                        )}
                      </div>
                      <h5 className="card-main-title">{result.title}</h5>
                      <p className="card-detail-text" style={{ fontWeight: '500', color: '#ffffff' }}>{result.description}</p>
                      <p className="card-detail-text" style={{ fontSize: '0.8rem', opacity: 0.7 }}>{result.meta}</p>
                    </div>
                    
                    <div className="card-price-container">
                      <div>
                        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>Cotización</span>
                        <div className="card-price-value" style={{ color: '#2dd4bf' }}>{result.price}</div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleVerifyOpen(result)}
                        className="card-verify-btn"
                        disabled={result.verified}
                      >
                        {result.verified ? 'Consulta Enviada' : 'Consultar Ahora'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* 5. Panel/Checklist de Verificación Detallada */}
      {selectedResult && (
        <div className="verification-drawer-backdrop" onClick={() => setSelectedResult(null)}>
          <div className="verification-drawer-container" style={{ position: 'relative', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '400px', opacity: 0.03, pointerEvents: 'none', zIndex: 0, color: 'var(--dark-text)' }}>
              𓊵
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
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

              {selectedResult.finalPriceRaw !== undefined && (
                <div style={{ padding: '0.75rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>Cantidad de Pasajeros / Personas:</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <button 
                      type="button" 
                      onClick={() => setPassengerCount(prev => Math.max(1, prev - 1))}
                      style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'transparent', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                    >-</button>
                    <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{passengerCount}</span>
                    <button 
                      type="button" 
                      onClick={() => setPassengerCount(prev => prev + 1)}
                      style={{ width: '28px', height: '28px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'transparent', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                    >+</button>
                    <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>(Precio por persona: {(selectedResult.category === 'conciertos' || selectedResult.finalPriceRaw < 5000) ? 'USD $' : '$ '} {selectedResult.finalPriceRaw.toLocaleString('es-AR', { maximumFractionDigits: 0 })})</span>
                  </div>
                </div>
              )}

              <div style={{ padding: '1rem', background: 'rgba(255, 215, 0, 0.05)', border: '1px solid rgba(255, 215, 0, 0.15)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: '#ffd700', fontWeight: '600' }}>
                    {selectedResult.finalPriceRaw !== undefined ? 'Importe Total Estimado:' : 'Importe a Confirmar:'}
                  </span>
                  <span style={{ fontSize: '1.2rem', color: '#ffd700', fontWeight: 'bold' }}>
                    {selectedResult.finalPriceRaw !== undefined 
                      ? `${(selectedResult.category === 'conciertos' || selectedResult.finalPriceRaw < 5000) ? 'USD $' : '$ '} ${(selectedResult.finalPriceRaw * passengerCount).toLocaleString('es-AR', { maximumFractionDigits: 0 })}`
                      : selectedResult.price
                    }
                  </span>
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
                }}
              >
                <CheckSquare size={18} />
                Confirmar y Registrar Reserva
              </button>
            </div>


          </div>
        </div>
      )}
    </div>
  )
}
