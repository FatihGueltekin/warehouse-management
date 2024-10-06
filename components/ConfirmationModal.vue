<template>
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        <div class="modal-buttons">
          <button @click="confirmAction">Evet</button>
          <button @click="cancelAction">Hayır</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    showModal: Boolean,
    title: String,
    message: String,
  });
  
  const emit = defineEmits(['confirm', 'cancel']);
  
  const confirmAction = () => {
    emit('confirm');
  };
  
  const cancelAction = () => {
    emit('cancel');
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    max-width: 400px;
    width: 100%;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
  </style>
  