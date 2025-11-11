import { defineStore } from 'pinia'
import { authAPI } from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token')
  }),

  actions: {
    async login(credentials) {
      try {
        const response = await authAPI.login(credentials)
        const { token, id, correo, nombre } = response.data
        
        this.token = token
        this.user = { id, correo, nombre }
        this.isAuthenticated = true
        
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(this.user))
        
        return { success: true }
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Error de conexión' }
      }
    },

    async register(userData) {
      try {
        const response = await authAPI.register(userData)
        const { token, id, correo, nombre } = response.data
        
        this.token = token
        this.user = { id, correo, nombre }
        this.isAuthenticated = true
        
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(this.user))
        
        return { success: true }
      } catch (error) {
        return { success: false, error: error.response?.data?.error || 'Error de conexión' }
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },

    initializeAuth() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      
      console.log('Inicializando auth:', { hasToken: !!token, hasUser: !!user })
      
      if (token && user) {
        try {
          this.token = token
          this.user = JSON.parse(user)
          this.isAuthenticated = true
          console.log('Usuario autenticado:', this.user)
        } catch (error) {
          console.error('Error parsing user data:', error)
          this.logout()
        }
      } else {
        console.log('No hay datos de autenticación')
      }
    }
  }
})