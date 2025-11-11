<template>
  <div v-if="showModal" class="modal-overlay" @click="handleOverlayClick">
    <div class="custom-modal" @click.stop>
      <div class="modal-header" :class="modalType">
        <div class="modal-icon">
          <i class="pi" :class="getIcon()"></i>
        </div>
        <h3>{{ modalTitle }}</h3>
      </div>
      
      <div class="modal-body">
        <p>{{ modalMessage }}</p>
      </div>
      
      <div class="modal-actions">
        <button v-if="modalType === 'confirm'" @click="closeModal(false)" class="btn btn-outline">
          Cancelar
        </button>
        <button @click="closeModal(true)" class="btn" :class="getButtonClass()">
          {{ getButtonText() }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModal } from '../composables/useModal'

const { showModal, modalType, modalTitle, modalMessage, closeModal } = useModal()

const getIcon = () => {
  switch (modalType.value) {
    case 'success': return 'pi-check-circle'
    case 'error': return 'pi-times-circle'
    case 'confirm': return 'pi-question-circle'
    default: return 'pi-info-circle'
  }
}

const getButtonClass = () => {
  switch (modalType.value) {
    case 'success': return 'btn-success'
    case 'error': return 'btn-danger'
    case 'confirm': return 'btn-primary'
    default: return 'btn-primary'
  }
}

const getButtonText = () => {
  switch (modalType.value) {
    case 'confirm': return 'Confirmar'
    default: return 'Aceptar'
  }
}

const handleOverlayClick = () => {
  if (modalType.value !== 'confirm') {
    closeModal(false)
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(45, 27, 61, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  animation: fadeIn 0.3s ease;
}

.custom-modal {
  background: var(--surface-color);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(45, 27, 61, 0.3);
  animation: slideUp 0.3s ease;
  max-width: 450px;
  width: 90%;
}

.modal-header {
  padding: 2rem;
  text-align: center;
}

.modal-header.success {
  background: linear-gradient(135deg, #d4edda, #c3e6cb);
}

.modal-header.error {
  background: linear-gradient(135deg, #f8d7da, #f5c6cb);
}

.modal-header.confirm {
  background: linear-gradient(135deg, #fff3cd, #ffeaa7);
}

.modal-header.info {
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-color));
}

.modal-icon {
  margin-bottom: 1rem;
}

.modal-icon i {
  font-size: 3rem;
}

.success .modal-icon i {
  color: #28a745;
}

.error .modal-icon i {
  color: #dc3545;
}

.confirm .modal-icon i {
  color: #ffc107;
}

.info .modal-icon i {
  color: var(--primary-color);
}

.modal-header h3 {
  color: var(--text-primary);
  font-size: 1.5rem;
  margin: 0;
}

.modal-body {
  padding: 1.5rem 2rem;
}

.modal-body p {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  text-align: center;
}

.modal-actions {
  padding: 1.5rem 2rem 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 12px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-success:hover {
  background: #218838;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-danger:hover {
  background: #c82333;
}

.btn-outline {
  background: transparent;
  color: var(--text-secondary);
  border: 2px solid var(--border-color);
}

.btn-outline:hover {
  background: var(--background-color);
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