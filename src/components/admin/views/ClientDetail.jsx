import {
  Mail, Phone, MapPin, Calendar, CreditCard, ShieldAlert,
  DollarSign, PlaneTakeoff, Award, Utensils, Bed, Briefcase, PlusCircle, Trash2
} from 'lucide-react'
import { getPassportStatus, getAge } from './clientsUtils'

export default function ClientDetail({
  selectedClient,
  getLinkedQueries,
  getLinkedBookings,
  handleRemoveManualTrip,
  handleAddManualTrip,
  newTripDest, setNewTripDest,
  newTripDate, setNewTripDate,
  newTripPrice, setNewTripPrice,
  newTripStatus, setNewTripStatus
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', alignItems: 'start' }}>
      
      {/* Ficha: Datos y Preferencias */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Profile Overview Card */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', textAlign: 'center', position: 'relative' }}>
          
          {/* Badge Passport Status */}
          <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
            {(() => {
              const passStatus = getPassportStatus(selectedClient.passportExpiryDate)
              return (
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  backgroundColor: passStatus.bg,
                  color: passStatus.color
                }}>
                  <passStatus.icon size={12} />
                  {passStatus.label.replace(' ✅', '').replace(' ⚠️', '').replace(' ❌', '')}
                </span>
              )
            })()}
          </div>

          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#eff6ff', color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '2rem', margin: '0 auto 1rem auto' }}>
            {selectedClient.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', margin: '0 0 0.25rem 0' }}>{selectedClient.name}</h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0 0 1rem 0' }}>Ficha de Pasajero</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left', borderTop: '1px solid #f1f5f9', paddingTop: '1rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563' }}>
              <Mail size={16} style={{ color: '#9ca3af' }} />
              <span>{selectedClient.email || 'Email no registrado'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563' }}>
              <Phone size={16} style={{ color: '#9ca3af' }} />
              <span>{selectedClient.phone || 'Teléfono no registrado'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563' }}>
              <MapPin size={16} style={{ color: '#9ca3af' }} />
              <span>{selectedClient.address || 'Dirección no registrada'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563' }}>
              <Calendar size={16} style={{ color: '#9ca3af' }} />
              <span>Edad: {getAge(selectedClient.birthDate)}</span>
            </div>
          </div>
        </div>

        {/* Estado y Finanzas Card */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
            <DollarSign size={18} style={{ color: '#2563eb' }} /> Estado y Financiamiento
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span style={{ color: '#64748b' }}>Estado Aprobación:</span>
              <span style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '700',
                backgroundColor: (selectedClient.approvalStatus || 'approved') === 'approved' ? '#dcfce7' : '#fef3c7',
                color: (selectedClient.approvalStatus || 'approved') === 'approved' ? '#166534' : '#854d0e'
              }}>
                {(selectedClient.approvalStatus || 'approved') === 'approved' ? 'APROBADO' : 'PENDIENTE'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
              <span style={{ color: '#64748b' }}>Estado Pago:</span>
              <span style={{
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '700',
                backgroundColor: (selectedClient.paymentStatus || 'paid') === 'paid' ? '#e0f2fe' : '#fee2e2',
                color: (selectedClient.paymentStatus || 'paid') === 'paid' ? '#0369a1' : '#991b1b'
              }}>
                {(selectedClient.paymentStatus || 'paid') === 'paid' ? 'AL DÍA' : 'CON DEUDA'}
              </span>
            </div>
            {(selectedClient.paymentStatus || 'paid') === 'debt' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                <span style={{ color: '#64748b', fontWeight: 'bold' }}>Monto Deuda:</span>
                <span style={{ fontWeight: 'bold', color: '#ef4444' }}>
                  USD ${selectedClient.debtAmount || 0}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Passport Documentation Card */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
            <CreditCard size={18} style={{ color: '#eab308' }} /> Documentación de Viaje
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ffffff', paddingBottom: '0.5rem' }}>
              <span style={{ color: '#64748b' }}>Número de Pasaporte:</span>
              <span style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{selectedClient.passportNumber || 'No Registrado'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ffffff', paddingBottom: '0.5rem' }}>
              <span style={{ color: '#64748b' }}>Fecha de Emisión:</span>
              <span style={{ fontWeight: '500' }}>
                {selectedClient.passportIssueDate ? new Date(selectedClient.passportIssueDate).toLocaleDateString('es-ES') : 'No Registrada'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #ffffff', paddingBottom: '0.5rem' }}>
              <span style={{ color: '#64748b' }}>Fecha de Vencimiento:</span>
              <span style={{ fontWeight: 'bold', color: getPassportStatus(selectedClient.passportExpiryDate).color }}>
                {selectedClient.passportExpiryDate ? new Date(selectedClient.passportExpiryDate).toLocaleDateString('es-ES') : 'No Registrada'}
              </span>
            </div>

            {/* Expiry alerts */}
            {selectedClient.passportExpiryDate && (() => {
              const passStatus = getPassportStatus(selectedClient.passportExpiryDate)
              if (passStatus.code !== 'valid') {
                return (
                  <div style={{
                    marginTop: '0.5rem',
                    backgroundColor: passStatus.bg,
                    border: `1px solid ${passStatus.color}`,
                    borderRadius: '8px',
                    padding: '0.75rem',
                    color: passStatus.color,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.5rem'
                  }}>
                    <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>¡ATENCIÓN ANTES DE EMITIR VIAJE!</div>
                      <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                        El pasaporte del pasajero {passStatus.code === 'expired' ? 'está vencido.' : 'vence en menos de 6 meses.'} {passStatus.desc}. Es obligatorio renovarlo antes de emitir tickets internacionales.
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            })()}

          </div>
        </div>

        {/* Preferences Card */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
            <Award size={18} style={{ color: '#10b981' }} /> Preferencias y Perfil
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #ffffff', paddingBottom: '0.5rem' }}>
              <PlaneTakeoff size={16} style={{ color: '#64748b' }} />
              <div>
                <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block' }}>Programa de Viajero Frecuente</span>
                <span style={{ fontWeight: '500' }}>
                  {selectedClient.frequentFlyerAirline ? `${selectedClient.frequentFlyerAirline} (${selectedClient.frequentFlyerNumber || 'Socio s/n'})` : 'No registra'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #ffffff', paddingBottom: '0.5rem' }}>
              <Utensils size={16} style={{ color: '#64748b' }} />
              <div>
                <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block' }}>Restricciones Alimenticias</span>
                <span style={{ fontWeight: '600', color: selectedClient.dietaryRestrictions !== 'Sin restricciones' ? '#f59e0b' : '#334155' }}>
                  {selectedClient.dietaryRestrictions || 'Sin restricciones'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bed size={16} style={{ color: '#64748b' }} />
              <div>
                <span style={{ color: '#64748b', fontSize: '0.75rem', display: 'block' }}>Preferencia de Cama en Hotel</span>
                <span style={{ fontWeight: '500' }}>{selectedClient.preferredBed || 'Matrimonial'}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Historial Consolidado: Consultas y Viajes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* TAB: Consultas / Cotizaciones */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
            <Mail size={18} style={{ color: '#3b82f6' }} /> Historial de Consultas y Cotizaciones (Sincronizado)
          </h3>

          {(() => {
            const linkedQueries = getLinkedQueries(selectedClient)
            if (linkedQueries.length === 0) {
              return (
                <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748b', fontSize: '0.875rem' }}>
                  No se encontraron consultas registradas en Horus que coincidan con este pasajero.
                </div>
              )
            }

            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {linkedQueries.map(q => (
                  <div key={q.id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', backgroundColor: '#ffffff' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600' }}>{q.date}</span>
                      <span style={{
                        padding: '0.15rem 0.4rem',
                        borderRadius: '9999px',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        backgroundColor: q.status === 'Pendiente' ? '#fef3c7' : '#dcfce7',
                        color: q.status === 'Pendiente' ? '#d97706' : '#15803d'
                      }}>
                        {q.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#1e293b', fontWeight: '600', marginBottom: '0.25rem', textTransform: 'capitalize' }}>
                      Interés en: {q.category || 'General'}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#4b5563', margin: 0, fontStyle: 'italic', lineHeight: '1.4' }}>
                      "{q.message}"
                    </p>
                  </div>
                ))}
              </div>
            )
          })()}
        </div>

        {/* TAB: Historial de Viajes */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
            <Briefcase size={18} style={{ color: '#2563eb' }} /> Historial de Viajes Realizados y Activos
          </h3>

          {/* Linked active bookings */}
          {(() => {
            const linkedBookings = getLinkedBookings(selectedClient)
            if (linkedBookings.length > 0) {
              return (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                    Reservas Activas en el Sistema
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {linkedBookings.map(b => (
                      <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #dcfce7', backgroundColor: '#f0fdf4', borderRadius: '8px', padding: '0.75rem' }}>
                        <div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#15803d' }}>{b.title}</div>
                          <div style={{ fontSize: '0.75rem', color: '#4b5563' }}>{b.description}</div>
                          <div style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '0.25rem' }}>Fecha: {b.verifiedAt}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#16a34a' }}>{b.price}</div>
                          <span style={{ fontSize: '0.65rem', backgroundColor: '#bbf7d0', color: '#15803d', padding: '0.15rem 0.4rem', borderRadius: '9999px', fontWeight: 'bold' }}>
                            Reservado
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
            return null
          })()}

          {/* Manual History Trips */}
          <div>
            <h4 style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Historial de Viajes Anteriores
            </h4>

            {(!selectedClient.manualTrips || selectedClient.manualTrips.length === 0) ? (
              <div style={{ padding: '1rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem', border: '1px dashed #e2e8f0', borderRadius: '8px', marginBottom: '1.5rem' }}>
                No hay viajes pasados registrados manualmente para este cliente.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {selectedClient.manualTrips.map(t => (
                  <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem', backgroundColor: 'white' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>{t.destination}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Fecha: {new Date(t.date).toLocaleDateString('es-ES')}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#334155' }}>{t.price}</div>
                        <span style={{
                          fontSize: '0.65rem',
                          backgroundColor: t.status === 'Realizado' ? '#e2e8f0' : '#fee2e2',
                          color: t.status === 'Realizado' ? '#475569' : '#b91c1c',
                          padding: '0.15rem 0.4rem',
                          borderRadius: '9999px',
                          fontWeight: '600'
                        }}>
                          {t.status}
                        </span>
                      </div>
                      <button 
                        onClick={() => handleRemoveManualTrip(t.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem' }}
                        title="Eliminar del historial"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Form to add manual trip history */}
            <form onSubmit={handleAddManualTrip} style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <PlusCircle size={14} style={{ color: '#2563eb' }} /> Agregar Viaje Pasado o Externo al Historial
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Ej. Río de Janeiro, Brasil" 
                  value={newTripDest}
                  onChange={(e) => setNewTripDest(e.target.value)}
                  style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.75rem' }}
                  required
                />
                <input 
                  type="date" 
                  value={newTripDate}
                  onChange={(e) => setNewTripDate(e.target.value)}
                  style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.75rem' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  placeholder="Ej. 1200 USD o $350.000" 
                  value={newTripPrice}
                  onChange={(e) => setNewTripPrice(e.target.value)}
                  style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.75rem' }}
                  required
                />
                <select 
                  value={newTripStatus}
                  onChange={(e) => setNewTripStatus(e.target.value)}
                  style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.75rem', backgroundColor: 'white' }}
                >
                  <option value="Realizado">Realizado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>

              <button 
                type="submit"
                style={{
                  backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer'
                }}
              >
                Guardar Viaje en Historial
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  )
}
