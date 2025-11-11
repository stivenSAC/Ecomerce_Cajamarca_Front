<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Descubre el Arte de Cajamarca</h1>
          <p>Conectamos a mujeres emprendedoras de Cajamarca con el mundo a través de sus productos únicos y artesanales.</p>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">{{ products.length }}</span>
              <span class="stat-label">Productos</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ uniqueSellers }}</span>
              <span class="stat-label">Emprendedoras</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="products-section">
      <div class="container">
        <h2>Productos Destacados</h2>
        
        <div v-if="productsStore.loading" class="loading">
          <i class="pi pi-spin pi-spinner"></i>
          Cargando productos...
        </div>
        
        <div v-else-if="products.length === 0" class="no-products">
          <i class="pi pi-shopping-bag"></i>
          <p>No hay productos disponibles en este momento.</p>
        </div>
        
        <div v-else class="products-grid">
          <ProductCard 
            v-for="product in products" 
            :key="product.id" 
            :product="product" 
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useProductsStore } from '../stores/products'
import ProductCard from '../components/ProductCard.vue'

const productsStore = useProductsStore()

const products = computed(() => productsStore.products)

const uniqueSellers = computed(() => {
  const sellers = new Set(products.value.map(p => p.user.id))
  return sellers.size
})

onMounted(() => {
  productsStore.fetchProducts()
})
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-color));
  padding: 4rem 0;
  text-align: center;
}

.hero-content h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 2rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-color);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.products-section {
  padding: 4rem 0;
}

.products-section h2 {
  text-align: center;
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 3rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.loading, .no-products {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.loading i {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.no-products i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--border-color);
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .hero-stats {
    gap: 2rem;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}
</style>