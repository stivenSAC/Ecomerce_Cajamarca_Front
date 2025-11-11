<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <router-link to="/" class="logo">
          <img src="/src/assets/images/mujerRaiz.png" alt="Mujer Raíz" class="logo-img">
        </router-link>
        
        <div class="search-bar">
          <input 
            v-model="searchQuery" 
            @keyup.enter="handleSearch"
            type="text" 
            placeholder="Buscar productos..."
            class="search-input"
          >
          <button @click="handleSearch" class="search-btn">
            <i class="pi pi-search"></i>
          </button>
        </div>

        <div class="auth-buttons">
          <router-link to="/" class="btn btn-home">
            <i class="pi pi-home"></i>
            Inicio
          </router-link>
          <template v-if="!authStore.isAuthenticated">
            <router-link to="/login" class="btn btn-outline">Iniciar Sesión</router-link>
            <router-link to="/register" class="btn btn-primary">Registrarse</router-link>
          </template>
          <template v-else>
            <router-link to="/profile" class="btn btn-outline">Mi Perfil</router-link>
            <button @click="logout" class="btn btn-secondary">Cerrar Sesión</button>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useProductsStore } from '../stores/products'

const router = useRouter()
const authStore = useAuthStore()
const productsStore = useProductsStore()
const searchQuery = ref('')

const handleSearch = () => {
  productsStore.searchProducts(searchQuery.value)
}

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.header {
  background: var(--surface-color);
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  gap: 2rem;
}

.logo {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo-img {
  height: 50px;
  width: auto;
  object-fit: contain;
}

.search-bar {
  display: flex;
  flex: 1;
  max-width: 400px;
  position: relative;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 25px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: var(--primary-color);
}

.search-btn {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background: var(--primary-dark);
}

.auth-buttons {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.btn {
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-outline {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
}

.btn-secondary {
  background: var(--text-secondary);
  color: white;
}

.btn-secondary:hover {
  background: var(--text-primary);
}

.btn-home {
  background: var(--secondary-color);
  color: var(--primary-color);
  border: 2px solid var(--primary-light);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-home:hover {
  background: var(--primary-light);
  color: var(--primary-dark);
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .search-bar {
    max-width: 100%;
  }
  
  .auth-buttons {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>