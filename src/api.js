// Centralized API Client to interact with Horus backend server

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = 'Error en la petición'
    try {
      const data = await response.json()
      errorMessage = data.error || errorMessage
    } catch (e) {
      // Ignorar si no es JSON
    }
    throw new Error(errorMessage)
  }
  return response.json()
}

export const api = {
  // 1. Auth
  async login(username, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    return handleResponse(res)
  },

  async logout() {
    const res = await fetch('/api/auth/logout', {
      method: 'POST'
    })
    return handleResponse(res)
  },

  // 2. Clients (CRUD)
  async getClients() {
    const res = await fetch('/api/clients')
    return handleResponse(res)
  },

  async createClient(clientData) {
    const res = await fetch('/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData)
    })
    return handleResponse(res)
  },

  async updateClient(id, clientData) {
    const res = await fetch(`/api/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData)
    })
    return handleResponse(res)
  },

  async deleteClient(id) {
    const res = await fetch(`/api/clients/${id}`, {
      method: 'DELETE'
    })
    return handleResponse(res)
  },

  // 3. Packages (CRUD)
  async getPackages() {
    const res = await fetch('/api/packages')
    return handleResponse(res)
  },

  async createPackage(packageData) {
    const res = await fetch('/api/packages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(packageData)
    })
    return handleResponse(res)
  },

  async updatePackage(id, packageData) {
    const res = await fetch(`/api/packages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(packageData)
    })
    return handleResponse(res)
  },

  async consultPackage(id) {
    const res = await fetch(`/api/packages/${id}/consult`, {
      method: 'POST'
    })
    return handleResponse(res)
  },

  async deletePackage(id) {
    const res = await fetch(`/api/packages/${id}`, {
      method: 'DELETE'
    })
    return handleResponse(res)
  },

  // 4. Queries (CRUD)
  async getQueries() {
    const res = await fetch('/api/queries')
    return handleResponse(res)
  },

  async createQuery(queryData) {
    const res = await fetch('/api/queries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(queryData)
    })
    return handleResponse(res)
  },

  async updateQuery(id, status) {
    const res = await fetch(`/api/queries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    return handleResponse(res)
  },

  async deleteQuery(id) {
    const res = await fetch(`/api/queries/${id}`, {
      method: 'DELETE'
    })
    return handleResponse(res)
  },

  // 5. Bookings (CRUD)
  async getBookings() {
    const res = await fetch('/api/bookings')
    return handleResponse(res)
  },

  async createBooking(bookingData) {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    })
    return handleResponse(res)
  },

  async updateBooking(id, statusData) {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(statusData) // paymentStatus, tripStatus
    })
    return handleResponse(res)
  },

  async deleteBooking(id) {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'DELETE'
    })
    return handleResponse(res)
  },

  // 6. Users Management (CRUD)
  async getUsers() {
    const res = await fetch('/api/users')
    return handleResponse(res)
  },

  async createUser(userData) {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    return handleResponse(res)
  },

  async deleteUser(id) {
    const res = await fetch(`/api/users/${id}`, {
      method: 'DELETE'
    })
    return handleResponse(res)
  },

  // 7. Site Content Config
  async getContent() {
    const res = await fetch('/api/content')
    return handleResponse(res)
  },

  async saveContent(contentData) {
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contentData)
    })
    return handleResponse(res)
  }
}
