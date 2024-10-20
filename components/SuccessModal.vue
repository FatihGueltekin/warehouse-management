<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal">
        <h2 class="modal-header">{{ header }}</h2>
        <p class="modal-text">{{ text }}</p>
        <button class="modal-close" @click="closeModal">Kapat</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  
  const props = defineProps({
    header: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  });
  
  const emits = defineEmits(['close']);
  const isVisible = ref(props.visible);
  
  watch(() => props.visible, (newValue) => {
    isVisible.value = newValue;
  });
  
  const closeModal = () => {
    isVisible.value = false;
    emits('close');
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .modal {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    width: 100%;
    text-align: center;
  }
  
  .modal-header {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  .modal-text {
    margin-bottom: 20px;
  }
  
  .modal-close {
    background: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    font-size: 1rem;
  }
  
  .modal-close:hover {
    background: #218838;
  }
  </style>
  