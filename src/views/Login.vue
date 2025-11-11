<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-card">
        <h2>Iniciar Sesión</h2>
        <p class="auth-subtitle">Accede a tu cuenta de emprendedora</p>
        
        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group">
            <label for="correo">Correo electrónico</label>
            <input 
              id="correo"
              v-model="form.correo" 
              type="email" 
              required 
              class="form-input"
              placeholder="tu@email.com"
            >
          </div>
          
          <div class="form-group">
            <label for="contrasena">Contraseña</label>
            <input 
              id="contrasena"
              v-model="form.contrasena" 
              type="password" 
              required 
              class="form-input"
              placeholder="Tu contraseña"
            >
          </div>
          
          <div v-if="error" class="error-message">
            {{ error }}
          </div>
          
          <button type="submit" :disabled="loading" class="btn btn-primary btn-full">
            <i v-if="loading" class="pi pi-spin pi-spinner"></i>
            {{ loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
          </button>
        </form>
        
        <div class="auth-footer">
          <p>¿No tienes cuenta? 
            <router-link to="/register" class="auth-link">Regístrate aquí</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  correo: '',
  contrasena: ''
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  const result = await authStore.login(form.value)
  
  if (result.success) {
    router.push('/')
  } else {
    error.value = result.error
  }
  
  loading.value = false
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.auth-card {
  max-width: 400px;
  margin: 0 auto;
  background: var(--surface-color);
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: var(--shadow-hover);
}

.auth-card h2 {
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.auth-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.form-input {
  padding: 0.875rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.95rem;
  transition: border-color 0.3s;
  outline: none;
}

.form-input:focus {
  border-color: var(--primary-color);
}

.error-message {
  background: #fee;
  color: #c33;
  padding: 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
}

.btn-full {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.auth-footer {
  text-align: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border-color);
}

.auth-footer p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.auth-link {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
}

.auth-link:hover {
  text-decoration: underline;
}
</style>