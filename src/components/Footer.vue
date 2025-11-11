<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Mujer Raíz</h3>
          <p>Plataforma virtual que conecta a mujeres emprendedoras de Cajamarca, Tolima con el mundo, promoviendo sus productos artesanales y únicos.</p>
        </div>
        
        <div class="footer-section">
          <h4>Nuestra Misión</h4>
          <p>Empoderar a las mujeres emprendedoras de Cajamarca, Tolima brindándoles un espacio digital para mostrar y vender sus creaciones.</p>
        </div>
        
        <div class="footer-section">
          <h4>Contacto</h4>
          <p>📧 info@mujerraiz.pe</p>
          <p>📱 WhatsApp: +57 987 654 321</p>
          <p>📍 Cajamarca, Tolima, Colombia</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 Mujer Raíz. Plataforma virtual de apoyo a emprendedoras de Cajamarca, Tolima.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  color: white;
  margin-top: auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 3rem 0 2rem;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--secondary-color);
}

.footer-section h4 {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: var(--secondary-color);
}

.footer-section p {
  line-height: 1.6;
  opacity: 0.9;
  margin-bottom: 0.5rem;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem 0;
  text-align: center;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 1.5rem;
  }
}
</style>