import { ref } from 'vue'

const showModal = ref(false)
const modalType = ref('info')
const modalTitle = ref('')
const modalMessage = ref('')
const modalResolve = ref(null)

export const useModal = () => {
  const showAlert = (message, title = 'Información') => {
    return new Promise((resolve) => {
      modalType.value = 'info'
      modalTitle.value = title
      modalMessage.value = message
      modalResolve.value = resolve
      showModal.value = true
    })
  }

  const showError = (message, title = 'Error') => {
    return new Promise((resolve) => {
      modalType.value = 'error'
      modalTitle.value = title
      modalMessage.value = message
      modalResolve.value = resolve
      showModal.value = true
    })
  }

  const showSuccess = (message, title = 'Éxito') => {
    return new Promise((resolve) => {
      modalType.value = 'success'
      modalTitle.value = title
      modalMessage.value = message
      modalResolve.value = resolve
      showModal.value = true
    })
  }

  const showConfirm = (message, title = 'Confirmar') => {
    return new Promise((resolve) => {
      modalType.value = 'confirm'
      modalTitle.value = title
      modalMessage.value = message
      modalResolve.value = resolve
      showModal.value = true
    })
  }

  const closeModal = (result = true) => {
    showModal.value = false
    if (modalResolve.value) {
      modalResolve.value(result)
      modalResolve.value = null
    }
  }

  return {
    showModal,
    modalType,
    modalTitle,
    modalMessage,
    showAlert,
    showError,
    showSuccess,
    showConfirm,
    closeModal
  }
}