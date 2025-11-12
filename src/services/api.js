import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log('Token enviado:', token.substring(0, 50) + '...')
  } else {
    console.warn('No hay token disponible')
  }
  
  // Log para depuración
  console.log('API Request:', {
    method: config.method,
    url: config.url,
    hasAuth: !!config.headers.Authorization,
    data: config.data ? (typeof config.data === 'string' ? config.data.substring(0, 200) + '...' : config.data) : null
  })
  
  return config
})

api.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.data)
    return response
  },
  error => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
      url: error.config?.url
    })
    
    // Si es error 401, limpiar autenticación
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    
    return Promise.reject(error)
  }
)

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData)
}

export const productsAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  search: (nombre) => api.get(`/products/search?nombre=${nombre}`),
  test: () => api.post('/products/test'),
  create: (product) => api.post('/products', product),
  update: (id, product) => api.put(`/products/${id}`, product),
  delete: (id) => api.delete(`/products/${id}`),
  getMyProducts: () => api.get('/products/my-products')
}

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (userData) => api.put('/users/profile', userData),
  updatePartialProfile: (userData) => api.patch('/users/profile', userData),
  deleteAccount: () => api.delete('/users/profile')
}

export const imagesAPI = {
  upload: (formData) => {
    const uploadApi = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const token = localStorage.getItem('token')
    if (token) {
      uploadApi.defaults.headers.Authorization = `Bearer ${token}`
    }
    return uploadApi.post('/images/upload', formData)
  },
  compress: (base64Data) => api.post('/images/compress', { image: base64Data })
}

export default api