<template>
  <div class="input-container">
    <span class="baslik">Ürünleri plakaya isle: </span>
    <div class="input-wrapper">
      <input
        type="text"
        v-model="inputValue"
        @keyup.enter="submitPartIds"
        placeholder="Ürün numarasi ekle (virgülle ayir)"
        class="styled-input"
      />
      <!-- Clear button to reset the input -->
      <span v-if="inputValue" class="clear-button" @click="clearInput">X</span>
    </div>
    <button @click="submitPartIds" class="styled-button">Ürünleri isle</button>
  </div>
</template>

<script setup>
const emit = defineEmits(['submitPartIds'])
const inputValue = ref('')

// Emit the input value to the parent component
const submitPartIds = () => {
  if (inputValue.value.trim()) {
    emit('submitPartIds', inputValue.value.split(',').map(id => id.trim()))
  }
}

// Clear the input field
const clearInput = () => {
  inputValue.value = ''
}
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 20px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.styled-input {
  width: 400px;
  height: 30px;
  margin: 20px;
  padding: 10px;
  font-size: 18px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.clear-button {
  position: absolute;
  right: 30px;
  top: 35%;
  cursor: pointer;
  font-size: 18px;
  color: #888;
}

.clear-button:hover {
  color: #333;
}

.styled-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.styled-button:hover {
  background-color: #45a049;
}

.baslik {
  font-family: 'Arial', sans-serif;
  color: #333;
  text-transform: capitalize;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.2;
}
</style>
