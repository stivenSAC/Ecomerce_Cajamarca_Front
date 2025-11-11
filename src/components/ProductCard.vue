<template>
  <div class="product-card">
    <div class="product-image">
      <img :src="product.imagen" :alt="product.nombre" />
    </div>
    
    <div class="product-info">
      <h3 class="product-name">{{ product.nombre }}</h3>
      <p class="product-detail">{{ product.detalle }}</p>
      <div class="product-price">$ {{ product.valor.toLocaleString('es-CO') }} COP</div>
      
      <div class="product-seller">
        <span>Por: {{ product.user.nombre }} {{ product.user.apellido }}</span>
      </div>
      
      <a 
        :href="product.contactoUrl" 
        target="_blank" 
        class="contact-btn"
      >
        <i class="pi pi-whatsapp"></i>
        Contactar por WhatsApp
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.product-card {
  background: var(--surface-color);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.product-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.product-detail {
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 1rem;
  flex: 1;
}

.product-price {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 0.75rem;
}

.product-seller {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-style: italic;
}

.contact-btn {
  background: #25d366;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.3s;
  margin-top: auto;
}

.contact-btn:hover {
  background: #20b954;
}

.contact-btn i {
  font-size: 1.1rem;
}
</style>