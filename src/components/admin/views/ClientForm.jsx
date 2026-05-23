import { Plus, Edit2 } from 'lucide-react'

export default function ClientForm({
  isEditing, handleSubmit, handleCancelEdit,
  name, setName, email, setEmail, phone, setPhone, address, setAddress,
  passportNumber, setPassportNumber, passportIssueDate, setPassportIssueDate,
  passportExpiryDate, setPassportExpiryDate, birthDate, setBirthDate,
  frequentFlyerAirline, setFrequentFlyerAirline, frequentFlyerNumber, setFrequentFlyerNumber,
  dietaryRestrictions, setDietaryRestrictions, preferredBed, setPreferredBed,
  approvalStatus, setApprovalStatus, paymentStatus, setPaymentStatus,
  debtAmount, setDebtAmount
}) {
  const inputStyle = { width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontSize: '0.75rem', fontWeight: '500', color: '#4b5563', marginBottom: '0.25rem' }

  return (
    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {isEditing ? <Edit2 size={18} style={{ color: '#f59e0b' }} /> : <Plus size={18} style={{ color: '#2563eb' }} />}
        {isEditing ? 'Editar Pasajero' : 'Registrar Nuevo Pasajero'}
      </h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        
        {/* Sección 1: Datos Personales */}
        <div>
          <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#2563eb', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>
            Datos de Contacto
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>Nombre Completo *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Juan Pérez" style={inputStyle} required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="juan@example.com" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Teléfono</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+54 11..." style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Dirección</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Calle 123, Ciudad" style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Sección 2: Documentación Obligatoria */}
        <div>
          <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#eab308', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>
            Documentación Obligatoria
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={labelStyle}>Nº Pasaporte</label>
                <input type="text" value={passportNumber} onChange={(e) => setPassportNumber(e.target.value)} placeholder="Ej. ARG12345" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>F. Nacimiento</label>
                <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={labelStyle}>Emisión Pasaporte</label>
                <input type="date" value={passportIssueDate} onChange={(e) => setPassportIssueDate(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Vencimiento Pasaporte</label>
                <input type="date" value={passportExpiryDate} onChange={(e) => setPassportExpiryDate(e.target.value)} style={inputStyle} />
              </div>
            </div>
          </div>
        </div>

        {/* Sección 3: Preferencias del Pasajero */}
        <div>
          <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#10b981', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>
            Preferencias del Pasajero
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={labelStyle}>Aerolínea Frecuente</label>
                <input type="text" value={frequentFlyerAirline} onChange={(e) => setFrequentFlyerAirline(e.target.value)} placeholder="Ej. LATAM" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Nº de Socio</label>
                <input type="text" value={frequentFlyerNumber} onChange={(e) => setFrequentFlyerNumber(e.target.value)} placeholder="LA-12345" style={inputStyle} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={labelStyle}>Restricciones Comida</label>
                <select value={dietaryRestrictions} onChange={(e) => setDietaryRestrictions(e.target.value)} style={{ ...inputStyle, backgroundColor: 'white' }}>
                  <option value="Sin restricciones">Sin restricciones</option>
                  <option value="Sin TACC (Celíaco)">Sin TACC (Celíaco)</option>
                  <option value="Vegetariana">Vegetariana</option>
                  <option value="Vegana">Vegana</option>
                  <option value="Intolerancia a la lactosa">Intolerancia a la lactosa</option>
                  <option value="Bajo en sodio">Bajo en sodio</option>
                  <option value="Keto">Keto</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Tipo de Cama</label>
                <select value={preferredBed} onChange={(e) => setPreferredBed(e.target.value)} style={{ ...inputStyle, backgroundColor: 'white' }}>
                  <option value="Matrimonial">Matrimonial (Double)</option>
                  <option value="King">King Size</option>
                  <option value="Twin">Camas Individuales (Twin)</option>
                  <option value="Single">Cama Simple (Single)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Sección 4: Estado y Financiamiento */}
        <div style={{ marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#2563eb', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>
            Estado y Finanzas
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <div>
                <label style={labelStyle}>Aprobación</label>
                <select value={approvalStatus} onChange={(e) => setApprovalStatus(e.target.value)} style={{ ...inputStyle, backgroundColor: 'white' }}>
                  <option value="approved">Aprobado</option>
                  <option value="pending">Pendiente</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Estado de Pago</label>
                <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} style={{ ...inputStyle, backgroundColor: 'white' }}>
                  <option value="paid">Al día / Abonado</option>
                  <option value="debt">Con Deuda</option>
                </select>
              </div>
            </div>
            {paymentStatus === 'debt' && (
              <div>
                <label style={labelStyle}>Monto Adeudado (USD)</label>
                <input type="number" value={debtAmount} onChange={(e) => setDebtAmount(e.target.value)} placeholder="Ej. 450" style={inputStyle} />
              </div>
            )}
          </div>
        </div>

        {/* Botones de acción del formulario */}
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <button type="submit" style={{
            flex: 1, backgroundColor: isEditing ? '#f59e0b' : '#2563eb', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s'
          }}>
            {isEditing ? 'Guardar Cambios' : 'Registrar Pasajero'}
          </button>
          {isEditing && (
            <button type="button" onClick={handleCancelEdit} style={{
              backgroundColor: '#6b7280', color: 'white', padding: '0.75rem', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer'
            }}>
              Cancelar
            </button>
          )}
        </div>

      </form>
    </div>
  )
}
