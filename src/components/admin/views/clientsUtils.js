import { CheckCircle, AlertTriangle, AlertCircle, HelpCircle } from 'lucide-react'

export const getPassportStatus = (expiryDateStr) => {
  if (!expiryDateStr) return { label: 'Sin registrar', color: '#64748b', bg: '#f1f5f9', icon: HelpCircle, code: 'empty' }
  const expiry = new Date(expiryDateStr)
  const today = new Date('2026-05-19')
  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return { label: 'VENCIDO ❌', color: '#ef4444', bg: '#fee2e2', icon: AlertCircle, code: 'expired', desc: `Venció hace ${Math.abs(diffDays)} días` }
  } else if (diffDays <= 180) {
    return { label: 'ALERTA: Vence pronto ⚠️', color: '#f97316', bg: '#ffedd5', icon: AlertTriangle, code: 'warning', desc: `Vence en ${diffDays} días (${Math.round(diffDays / 30)} meses)` }
  } else {
    return { label: 'VIGENTE ✅', color: '#22c55e', bg: '#dcfce7', icon: CheckCircle, code: 'valid', desc: `Válido por ${Math.round(diffDays / 365)} años más` }
  }
}

export const getAge = (birthDateStr) => {
  if (!birthDateStr) return 'No registrada'
  const birth = new Date(birthDateStr)
  const today = new Date('2026-05-19')
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return `${age} años (${birth.toLocaleDateString('es-ES')})`
}

export const MOCK_CLIENTS = [
  {
    id: 'c-1', name: 'Juan Pérez', email: 'juan.perez@example.com', phone: '+54 11 9999-8888',
    address: 'Av. Cabildo 1500, CABA', passportNumber: 'ARG1234567',
    passportIssueDate: '2018-06-15', passportExpiryDate: '2028-06-15', birthDate: '1985-04-12',
    frequentFlyerAirline: 'Aerolíneas Argentinas', frequentFlyerNumber: 'AR-992100',
    dietaryRestrictions: 'Sin restricciones', preferredBed: 'Matrimonial',
    approvalStatus: 'approved', paymentStatus: 'paid', debtAmount: 0,
    manualTrips: [{ id: 'mt-1', destination: 'Madrid, España', date: '2025-10-10', price: '1200 USD', status: 'Realizado' }]
  },
  {
    id: 'c-2', name: 'María Gomez', email: 'maria.gomez@example.com', phone: '+54 11 5555-1234',
    address: 'Calle Florida 200, CABA', passportNumber: 'ARG7654321',
    passportIssueDate: '2016-08-10', passportExpiryDate: '2026-08-10', birthDate: '1990-11-20',
    frequentFlyerAirline: 'LATAM', frequentFlyerNumber: 'LA-778811',
    dietaryRestrictions: 'Vegetariana', preferredBed: 'King',
    approvalStatus: 'pending', paymentStatus: 'paid', debtAmount: 0, manualTrips: []
  },
  {
    id: 'c-3', name: 'Carlos Bilardo', email: 'carlos.bilardo@doctor.com', phone: '+54 11 4444-3333',
    address: 'Estudiantes de La Plata, Bs As', passportNumber: 'ARG5555555',
    passportIssueDate: '2015-02-10', passportExpiryDate: '2025-02-10', birthDate: '1938-03-16',
    frequentFlyerAirline: 'Iberia', frequentFlyerNumber: 'IB-121212',
    dietaryRestrictions: 'Sin TACC (Celíaco)', preferredBed: 'Twin',
    approvalStatus: 'approved', paymentStatus: 'debt', debtAmount: 450,
    manualTrips: [{ id: 'mt-2', destination: 'México DF', date: '1986-06-29', price: '500 USD', status: 'Realizado' }]
  },
  {
    id: 'c-4', name: 'Diego Maradona', email: 'diego@10.com', phone: '+54 11 1010-1010',
    address: 'Villa Fiorito, Buenos Aires', passportNumber: 'ARG10101010',
    passportIssueDate: '2020-10-30', passportExpiryDate: '2030-10-30', birthDate: '1960-10-30',
    frequentFlyerAirline: 'Napoli Airways', frequentFlyerNumber: 'NAP-1010',
    dietaryRestrictions: 'Sin restricciones', preferredBed: 'King',
    approvalStatus: 'pending', paymentStatus: 'debt', debtAmount: 1500, manualTrips: []
  }
]
