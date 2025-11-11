<template>
  <div class="profile-page">
    <div class="container">
      <!-- Hero Profile Section -->
      <div class="profile-hero">
        <div class="profile-avatar">
          <div class="avatar-circle">
            <i class="pi pi-user"></i>
          </div>
        </div>
        <div class="profile-info">
          <h1>¡Hola, {{ authStore.user?.nombre }}!</h1>
          <p class="profile-subtitle">Emprendedora de Cajamarca</p>
          <div class="profile-stats">
            <div class="stat-item">
              <span class="stat-number">{{ myProducts.length }}</span>
              <span class="stat-label">Productos</span>
            </div>
            <div class="stat-item">
              <span class="stat-number">{{ totalViews }}</span>
              <span class="stat-label">Vistas</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard Cards -->
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <div class="card-icon">
            <i class="pi pi-user"></i>
          </div>
          <div class="card-content">
            <div class="card-header">
              <h3>Mi Información</h3>
              <button @click="showEditProfile = true" class="btn-edit-info">
                <i class="pi pi-pencil"></i>
                Editar
              </button>
            </div>
            <div class="info-list">
              <div class="info-row">
                <span class="info-label">Nombre completo:</span>
                <span class="info-value">{{ userProfile?.nombre }} {{ userProfile?.apellido }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Edad:</span>
                <span class="info-value">{{ userProfile?.edad }} años</span>
              </div>
              <div class="info-row">
                <span class="info-label">Correo electrónico:</span>
                <span class="info-value">{{ userProfile?.correo }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="dashboard-card">
          <div class="card-icon">
            <i class="pi pi-chart-line"></i>
          </div>
          <div class="card-content">
            <h3>Estadísticas</h3>
            <div class="stats-grid">
              <div class="mini-stat">
                <span class="mini-stat-number">{{ myProducts.length }}</span>
                <span class="mini-stat-label">Productos activos</span>
              </div>
              <div class="mini-stat">
                <span class="mini-stat-number">{{ totalViews }}</span>
                <span class="mini-stat-label">Total de vistas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
        
      <!-- Products Section -->
      <div class="products-section">
        <div class="section-header">
          <div class="section-title">
            <h2>Mis Productos</h2>
            <p>Gestiona tu catálogo de productos</p>
          </div>
          <button @click="showCreateForm = true" class="btn btn-primary btn-create">
            <i class="pi pi-plus"></i>
            Nuevo Producto
          </button>
        </div>
          
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner">
            <i class="pi pi-spin pi-spinner"></i>
          </div>
          <p>Cargando tus productos...</p>
        </div>
        
        <div v-else-if="myProducts.length === 0" class="empty-state">
          <div class="empty-icon">
            <i class="pi pi-shopping-bag"></i>
          </div>
          <h3>¡Comienza tu negocio!</h3>
          <p>Aún no tienes productos publicados. Crea tu primer producto y empieza a vender.</p>
          <button @click="showCreateForm = true" class="btn btn-primary btn-lg">
            <i class="pi pi-plus"></i>
            Crear mi primer producto
          </button>
        </div>
          
        <div v-else class="products-grid">
          <div v-for="product in myProducts" :key="product.id" class="product-item">
            <ProductCard :product="product" />
            <div class="product-actions">
              <button @click="editProduct(product)" class="action-btn edit-btn">
                <i class="pi pi-pencil"></i>
                <span>Editar</span>
              </button>
              <button @click="deleteProduct(product.id)" class="action-btn delete-btn">
                <i class="pi pi-trash"></i>
                <span>Eliminar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Enhanced Modal -->
    <div v-if="showCreateForm" class="modal-overlay" @click="closeModal">
      <div class="enhanced-modal" @click.stop>
        <div class="modal-header">
          <div class="modal-title">
            <i class="pi" :class="editingProduct ? 'pi-pencil' : 'pi-plus'"></i>
            <h3>{{ editingProduct ? 'Editar Producto' : 'Crear Nuevo Producto' }}</h3>
          </div>
          <button @click="closeModal" class="close-btn">
            <i class="pi pi-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="saveProduct" class="enhanced-form">
            <div class="form-section">
              <h4 class="section-title">Información Básica</h4>
              
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">
                    <i class="pi pi-tag"></i>
                    Nombre del producto *
                  </label>
                  <input 
                    v-model="productForm.nombre" 
                    type="text" 
                    required 
                    class="form-input"
                    placeholder="Ej: Artesanía de cerámica"
                  >
                </div>
              </div>
              
              <div class="form-group">
                <label class="form-label">
                  <i class="pi pi-align-left"></i>
                  Descripción del producto *
                </label>
                <textarea 
                  v-model="productForm.detalle" 
                  required 
                  class="form-input form-textarea" 
                  rows="4"
                  placeholder="Describe tu producto, materiales, técnicas utilizadas..."
                ></textarea>
                <small class="form-hint">Máximo 500 caracteres</small>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">
                    <i class="pi pi-dollar"></i>
                    Precio (COP $) *
                  </label>
                  <div class="price-input">
                    <span class="currency">$</span>
                    <input 
                      v-model.number="productForm.valor" 
                      type="number" 
                      step="1" 
                      min="100"
                      required 
                      class="form-input"
                      placeholder="15000"
                    >
                  </div>
                  <small class="form-hint">Ingresa el precio en pesos colombianos (sin decimales)</small>
                </div>
              </div>
            </div>

            <div class="form-section">
              <h4 class="section-title">Contacto y Imagen</h4>
              
              <div class="form-group">
                <label class="form-label">
                  <i class="pi pi-whatsapp"></i>
                  WhatsApp de contacto *
                </label>
                <input 
                  v-model="productForm.contactoUrl" 
                  type="url" 
                  required 
                  class="form-input" 
                  placeholder="https://wa.me/51987654321"
                >
                <small class="form-hint">Los clientes te contactarán por este WhatsApp</small>
              </div>
              
              <div class="form-group">
                <label class="form-label">
                  <i class="pi pi-image"></i>
                  Imagen del producto
                </label>
                <div class="image-upload-area">
                  <input 
                    @change="handleImageUpload" 
                    type="file" 
                    accept="image/*" 
                    class="file-input"
                    id="imageUpload"
                  >
                  <label for="imageUpload" class="upload-label">
                    <div v-if="!productForm.imagen" class="upload-placeholder">
                      <i class="pi pi-cloud-upload"></i>
                      <span>Haz clic para subir una imagen</span>
                      <small>JPG, PNG o WEBP (máx. 5MB)</small>
                    </div>
                    <div v-else class="image-preview">
                      <img :src="productForm.imagen" alt="Preview">
                      <div class="image-overlay">
                        <i class="pi pi-pencil"></i>
                        <span>Cambiar imagen</span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="button" @click="closeModal" class="btn btn-outline btn-lg">
                <i class="pi pi-times"></i>
                Cancelar
              </button>
              <button type="submit" :disabled="saving" class="btn btn-primary btn-lg">
                <i v-if="saving" class="pi pi-spin pi-spinner"></i>
                <i v-else class="pi" :class="editingProduct ? 'pi-check' : 'pi-plus'"></i>
                {{ saving ? 'Guardando...' : (editingProduct ? 'Actualizar Producto' : 'Crear Producto') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal Editar Perfil -->
    <div v-if="showEditProfile" class="modal-overlay" @click="closeProfileModal">
      <div class="enhanced-modal" @click.stop>
        <div class="modal-header">
          <div class="modal-title">
            <i class="pi pi-user-edit"></i>
            <h3>Editar Mi Información</h3>
          </div>
          <button @click="closeProfileModal" class="close-btn">
            <i class="pi pi-times"></i>
          </button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="saveProfile" class="enhanced-form">
            <div class="form-section">
              <h4 class="section-title">Información Personal</h4>
              
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">
                    <i class="pi pi-user"></i>
                    Nombre (opcional)
                  </label>
                  <input 
                    v-model="profileForm.nombre" 
                    type="text" 
                    class="form-input"
                    placeholder="Dejar vacío para no cambiar"
                  >
                </div>
                <div class="form-group">
                  <label class="form-label">
                    <i class="pi pi-user"></i>
                    Apellido (opcional)
                  </label>
                  <input 
                    v-model="profileForm.apellido" 
                    type="text" 
                    class="form-input"
                    placeholder="Dejar vacío para no cambiar"
                  >
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">
                    <i class="pi pi-calendar"></i>
                    Edad (opcional)
                  </label>
                  <input 
                    v-model.number="profileForm.edad" 
                    type="number" 
                    min="18" 
                    max="100" 
                    class="form-input"
                    placeholder="Dejar vacío para no cambiar"
                  >
                </div>
                <div class="form-group">
                  <label class="form-label">
                    <i class="pi pi-envelope"></i>
                    Correo electrónico (opcional)
                  </label>
                  <input 
                    v-model="profileForm.correo" 
                    type="email" 
                    class="form-input"
                    placeholder="Dejar vacío para no cambiar"
                  >
                </div>
              </div>
              
              <div class="form-group">
                <label class="form-label">
                  <i class="pi pi-lock"></i>
                  Nueva contraseña (opcional)
                </label>
                <input 
                  v-model="profileForm.contrasena" 
                  type="password" 
                  minlength="6" 
                  class="form-input"
                  placeholder="Dejar vacío para mantener actual"
                >
                <small class="form-hint">Solo completa si deseas cambiar tu contraseña</small>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="button" @click="closeProfileModal" class="btn btn-outline btn-lg">
                <i class="pi pi-times"></i>
                Cancelar
              </button>
              <button type="submit" :disabled="savingProfile" class="btn btn-primary btn-lg">
                <i v-if="savingProfile" class="pi pi-spin pi-spinner"></i>
                <i v-else class="pi pi-check"></i>
                {{ savingProfile ? 'Guardando...' : 'Actualizar Información' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { productsAPI, userAPI } from '../services/api'
import { useAuthStore } from '../stores/auth'
import { useModal } from '../composables/useModal'
import ProductCard from '../components/ProductCard.vue'

const router = useRouter()
const authStore = useAuthStore()
const { showAlert, showError, showSuccess, showConfirm } = useModal()
const myProducts = ref([])
const loading = ref(false)
const showCreateForm = ref(false)
const editingProduct = ref(null)
const saving = ref(false)
const showEditProfile = ref(false)
const savingProfile = ref(false)
const userProfile = ref(null)

const totalViews = computed(() => {
  return myProducts.value.length * 15 // Simulación de vistas
})

const productForm = ref({
  nombre: '',
  detalle: '',
  valor: '',
  contactoUrl: '',
  imagen: ''
})

const profileForm = ref({
  nombre: '',
  apellido: '',
  edad: '',
  correo: '',
  contrasena: ''
})

const fetchMyProducts = async () => {
  loading.value = true
  try {
    const response = await productsAPI.getMyProducts()
    myProducts.value = response.data
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    loading.value = false
  }
}

const fetchUserProfile = async () => {
  try {
    const response = await userAPI.getProfile()
    userProfile.value = response.data
  } catch (error) {
    console.error('Error fetching profile:', error)
  }
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido')
      return
    }
    
    // Validar tamaño (máx 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es muy grande. Máximo 5MB permitido.')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      productForm.value.imagen = e.target.result
      console.log('Imagen cargada, tamaño:', e.target.result.length, 'caracteres')
    }
    reader.onerror = () => {
      alert('Error al cargar la imagen')
    }
    reader.readAsDataURL(file)
  }
}

const saveProduct = async () => {
  // Validar formulario antes de enviar
  if (!productForm.value.nombre || !productForm.value.detalle || !productForm.value.valor || !productForm.value.contactoUrl) {
    await showError('Por favor completa todos los campos obligatorios')
    return
  }
  
  if (productForm.value.valor <= 0) {
    await showError('El precio debe ser mayor a 0 pesos')
    return
  }
  
  if (productForm.value.valor < 100) {
    await showError('El precio mínimo es de $100 COP')
    return
  }
  

  
  saving.value = true
  try {
    // Preparar datos para envío
    const productData = {
      nombre: productForm.value.nombre.trim(),
      detalle: productForm.value.detalle.trim(),
      valor: parseInt(productForm.value.valor),
      contactoUrl: productForm.value.contactoUrl.trim(),
      imagen: productForm.value.imagen || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='
    }
    

    
    console.log('Enviando producto:', {
      ...productData,
      imagen: productData.imagen.substring(0, 100) + '... (' + productData.imagen.length + ' caracteres)'
    })
    
    if (editingProduct.value) {
      await productsAPI.update(editingProduct.value.id, productData)
    } else {
      await productsAPI.create(productData)
    }
    
    await fetchMyProducts()
    closeModal()
  } catch (error) {
    console.error('Error saving product:', error)
    
    let errorMessage = 'Error al guardar el producto'
    if (error.response?.data?.error) {
      errorMessage = error.response.data.error
    } else if (error.response?.status === 400) {
      errorMessage = 'Datos inválidos. Verifica que todos los campos estén correctos.'
    } else if (error.response?.status === 401) {
      errorMessage = 'Sesión expirada. Por favor inicia sesión nuevamente.'
    }
    
    await showError(errorMessage)
  } finally {
    saving.value = false
  }
}

const editProduct = (product) => {
  editingProduct.value = product
  productForm.value = { ...product }
  showCreateForm.value = true
}

const deleteProduct = async (id) => {
  const confirmed = await showConfirm('¿Estás segura de que quieres eliminar este producto?', 'Eliminar Producto')
  if (confirmed) {
    try {
      await productsAPI.delete(id)
      await fetchMyProducts()
      await showSuccess('Producto eliminado correctamente')
    } catch (error) {
      console.error('Error deleting product:', error)
      await showError('Error al eliminar el producto')
    }
  }
}

const saveProfile = async () => {
  savingProfile.value = true
  try {
    const profileData = {}
    
    // Solo incluir campos que tienen valor
    if (profileForm.value.nombre && profileForm.value.nombre.trim()) {
      profileData.nombre = profileForm.value.nombre.trim()
    }
    if (profileForm.value.apellido && profileForm.value.apellido.trim()) {
      profileData.apellido = profileForm.value.apellido.trim()
    }
    if (profileForm.value.edad) {
      profileData.edad = parseInt(profileForm.value.edad)
    }
    if (profileForm.value.correo && profileForm.value.correo.trim()) {
      profileData.correo = profileForm.value.correo.trim()
    }
    if (profileForm.value.contrasena && profileForm.value.contrasena.trim()) {
      profileData.contrasena = profileForm.value.contrasena.trim()
    }
    
    // Verificar que al menos un campo se va a actualizar
    if (Object.keys(profileData).length === 0) {
      await showError('Por favor completa al menos un campo para actualizar')
      return
    }
    
    await userAPI.updateProfile(profileData)
    
    await fetchUserProfile()
    if (profileData.nombre) {
      authStore.user.nombre = profileData.nombre
      localStorage.setItem('user', JSON.stringify(authStore.user))
    }
    
    closeProfileModal()
    await showSuccess('Información actualizada correctamente')
  } catch (error) {
    console.error('Error updating profile:', error)
    await showError('Error al actualizar la información')
  } finally {
    savingProfile.value = false
  }
}

const closeModal = () => {
  showCreateForm.value = false
  editingProduct.value = null
  productForm.value = {
    nombre: '',
    detalle: '',
    valor: '',
    contactoUrl: '',
    imagen: ''
  }
}

const closeProfileModal = () => {
  showEditProfile.value = false
  profileForm.value = {
    nombre: '',
    apellido: '',
    edad: '',
    correo: '',
    contrasena: ''
  }
}

onMounted(() => {
  console.log('Profile mounted. Auth status:', {
    isAuthenticated: authStore.isAuthenticated,
    user: authStore.user,
    token: authStore.token ? authStore.token.substring(0, 50) + '...' : null
  })
  
  if (!authStore.isAuthenticated) {
    console.error('Usuario no autenticado')
    router.push('/login')
    return
  }
  
  fetchMyProducts()
  fetchUserProfile()
})
</script>

<style scoped>
.profile-page {
  padding: 2rem 0 6rem 0;
  min-height: calc(100vh - 200px);
}

/* Profile Hero Section */
.profile-hero {
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-color));
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.profile-avatar {
  flex-shrink: 0;
}

.avatar-circle {
  width: 100px;
  height: 100px;
  background: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  box-shadow: var(--shadow-hover);
}

.profile-info h1 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.profile-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.profile-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-color);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

/* Dashboard Cards */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.dashboard-card {
  background: var(--surface-color);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--shadow);
  transition: transform 0.3s, box-shadow 0.3s;
}

.dashboard-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

.card-icon {
  width: 60px;
  height: 60px;
  background: var(--primary-color);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.card-icon i {
  font-size: 1.5rem;
  color: white;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-content h3 {
  color: var(--text-primary);
  font-size: 1.3rem;
  margin: 0;
}

.btn-edit-info {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s;
}

.btn-edit-info:hover {
  background: var(--primary-dark);
}

.card-content h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--background-color);
  border-radius: 8px;
}

.info-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.info-value {
  color: var(--text-primary);
  font-weight: 500;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.mini-stat {
  text-align: center;
  padding: 1rem;
  background: var(--background-color);
  border-radius: 8px;
}

.mini-stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-color);
}

.mini-stat-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
}

.section-title h2 {
  color: var(--text-primary);
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.section-title p {
  color: var(--text-secondary);
  font-size: 1rem;
}

.btn-create {
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 12px;
  box-shadow: var(--shadow);
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 12px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.product-item {
  display: flex;
  flex-direction: column;
}

.product-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  justify-content: center;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}

.edit-btn {
  background: var(--primary-color);
  color: white;
  border: 2px solid var(--primary-color);
}

.edit-btn:hover {
  background: var(--primary-dark);
  color: white;
}

.delete-btn {
  background: #fee;
  color: #dc3545;
  border: 2px solid #dc3545;
}

.delete-btn:hover {
  background: #dc3545;
  color: white;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(45, 27, 61, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
}

.enhanced-modal {
  background: var(--surface-color);
  border-radius: 20px;
  width: 95%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(45, 27, 61, 0.3);
}

.modal-header {
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-color));
  padding: 2rem;
  border-bottom: none;
}

.modal-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.modal-title i {
  font-size: 1.5rem;
  color: var(--primary-color);
}

.modal-title h3 {
  color: var(--text-primary);
  font-size: 1.5rem;
  margin: 0;
}

.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-primary);
  transition: background-color 0.3s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.modal-body {
  max-height: calc(90vh - 120px);
  overflow-y: auto;
}

.enhanced-form {
  padding: 2rem;
}

.form-section {
  margin-bottom: 2rem;
}

.section-title {
  color: var(--text-primary);
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-color);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
}

.form-label i {
  color: var(--primary-color);
}

.form-input {
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s;
  outline: none;
  background: var(--surface-color);
}

.form-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(177, 156, 217, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
}

.form-hint {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin-top: 0.5rem;
  display: block;
}

.price-input {
  position: relative;
  display: flex;
  align-items: center;
}

.currency {
  position: absolute;
  left: 1rem;
  color: var(--text-secondary);
  font-weight: 600;
  z-index: 1;
}

.price-input .form-input {
  padding-left: 2rem;
}

.image-upload-area {
  margin-top: 0.5rem;
}

.file-input {
  display: none;
}

.upload-label {
  display: block;
  cursor: pointer;
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  transition: all 0.3s;
}

.upload-label:hover {
  border-color: var(--primary-color);
  background: var(--primary-light);
}

.upload-placeholder {
  padding: 3rem 2rem;
  text-align: center;
  color: var(--text-secondary);
}

.upload-placeholder i {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  display: block;
}

.upload-placeholder span {
  display: block;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.upload-placeholder small {
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.image-preview {
  position: relative;
  display: inline-block;
}

.image-preview img {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 12px;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-preview:hover .image-overlay {
  opacity: 1;
}

.image-overlay i {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
  margin-top: 2rem;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--surface-color);
  border-radius: 16px;
  box-shadow: var(--shadow);
}

.loading-spinner {
  margin-bottom: 1rem;
}

.loading-spinner i {
  font-size: 2.5rem;
  color: var(--primary-color);
}

.loading-state p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.empty-icon {
  margin-bottom: 2rem;
}

.empty-icon i {
  font-size: 4rem;
  color: var(--border-color);
}

.empty-state h3 {
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.empty-state p {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 2rem;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 768px) {
  .profile-hero {
    flex-direction: column;
    text-align: center;
    padding: 2rem;
  }
  
  .profile-stats {
    justify-content: center;
  }
  
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .products-grid {
    grid-template-columns: 1fr;
  }
  
  .enhanced-modal {
    width: 95%;
    margin: 1rem;
  }
  
  .enhanced-form {
    padding: 1.5rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
/* Modal de Éxito */
.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(45, 27, 61, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

.success-modal {
  background: var(--surface-color);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 20px 60px rgba(45, 27, 61, 0.3);
  animation: slideUp 0.3s ease;
  max-width: 400px;
}

.success-icon {
  margin-bottom: 1.5rem;
}

.success-icon i {
  font-size: 4rem;
  color: #28a745;
}

.success-modal h3 {
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.success-modal p {
  color: var(--text-secondary);
  font-size: 1rem;
  margin: 0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(30px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}
</style>