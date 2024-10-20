<template>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Hata</h3>
        <p>{{ errorMessage }}</p>
        <button @click="closeModal">Kapat</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
  showModal: {
    type: Boolean,
    required: true
  },
  errorMessage: {
    type: String,
    default: ''
  }
})
  
  const emit = defineEmits(['close'])
  
  const closeModal = () => {
    emit('close')
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
  </style>
  