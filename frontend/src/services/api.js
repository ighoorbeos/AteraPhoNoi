import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ==================== AUTH API ====================
export const authService = {
  /**
   * POST /api/v1/auth/login
   * Login with username and password
   */
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password })
    if (response.data.success) {
      const { accessToken, user } = response.data.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('user', JSON.stringify(user))
    }
    return response.data
  },

  /**
   * POST /api/v1/auth/register
   * Register new user
   */
  register: (data) => api.post('/auth/register', data),

  /**
   * Logout - clear local storage
   */
  logout: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
  },

  /**
   * Get current user from local storage
   */
  getCurrentUser: () => {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken')
  },
}

// ==================== CONTACT API ====================
export const contactService = {
  /**
   * POST /api/v1/contacts
   * Submit contact form (public)
   */
  submitContact: (data) => api.post('/contacts', data),

  /**
   * GET /api/v1/contacts
   * Get all contacts (requires auth: ADMIN, SALES)
   */
  getAllContacts: (page = 0, size = 20) => 
    api.get(`/contacts?page=${page}&size=${size}`),

  /**
   * GET /api/v1/contacts/{id}
   * Get contact by ID (requires auth: ADMIN, SALES)
   */
  getContactById: (id) => api.get(`/contacts/${id}`),

  /**
   * GET /api/v1/contacts/status/{status}
   * Get contacts by status (requires auth: ADMIN, SALES)
   * Status: NEW, CONTACTED, INTERESTED, MEETING_SCHEDULED, CONVERTED, NOT_INTERESTED, SPAM
   */
  getContactsByStatus: (status, page = 0, size = 20) => 
    api.get(`/contacts/status/${status}?page=${page}&size=${size}`),

  /**
   * PATCH /api/v1/contacts/{id}/status
   * Update contact status (requires auth: ADMIN, SALES)
   */
  updateContactStatus: (id, data) => api.patch(`/contacts/${id}/status`, data),

  /**
   * GET /api/v1/contacts/statistics
   * Get contact statistics (requires auth: ADMIN)
   */
  getStatistics: () => api.get('/contacts/statistics'),

  /**
   * DELETE /api/v1/contacts/{id}
   * Delete contact (requires auth: ADMIN)
   */
  deleteContact: (id) => api.delete(`/contacts/${id}`),
}

// ==================== PROJECT API ====================
export const projectService = {
  /**
   * GET /api/v1/public/project
   * Get active project info (public)
   */
  getProjectInfo: () => api.get('/public/project'),

  /**
   * GET /api/v1/projects/{id}
   * Get project by ID (public)
   */
  getProjectById: (id) => api.get(`/projects/${id}`),
}

export default api
