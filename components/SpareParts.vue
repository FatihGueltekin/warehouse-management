<template>
    <div>
      <input 
        v-model="searchQuery" 
        placeholder="Parça ara - numara veya isim ara"
        @keyup.enter="submitSearch"
        class="search-input"
      />
  
      <table>
        <thead>
          <tr>
            <th>Ürün numarasi</th>
            <th>Ürün adi</th>
            <th>Stok adedi</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(part, index) in paginatedParts" 
            :key="index" 
          >
            <td>{{ part.ürün_numarasi }}</td>
            <td>{{ part.ürün_ismi }}</td>
            <td>{{ part.ürün_adedi }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Load More Button -->
      <div class="buttons">
        <div>
          <button 
            v-if="hasMoreParts" 
            @click="loadMore" 
            class="load-more-btn"
          >
            Daha fazla parça göster
          </button>
  
          <button 
            v-if="hasLessParts" 
            @click="loadLess" 
            class="load-less-btn"
          >
            Daha az parça göster
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['selectPart'])
  
  const props = defineProps({
    parts: {
      type: Array,
      required: true
    }
  })
  
  // Search input value
  const searchQuery = ref('')
  
  // Number of parts to display initially
  const itemsPerPage = ref(10)
  const currentPage = ref(1)
  
  // Emit and set the selected part
  
  // Computed property to filter parts based on searchQuery
  const filteredParts = computed(() => {
    return props.parts.filter(part =>
      part.ürün_numarasi.toString().includes(searchQuery.value.toLowerCase()) ||
      part.ürün_ismi.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
  
  // Paginated parts
  const paginatedParts = computed(() => {
    const start = 0
    const end = currentPage.value * itemsPerPage.value
    return filteredParts.value.slice(start, end)
  })
  
  // Check if there are more parts to load
  const hasMoreParts = computed(() => {
    return currentPage.value * itemsPerPage.value < filteredParts.value.length
  })
  
  const hasLessParts = computed(() => {
    return currentPage.value !== 1
  })
  
  // Function to load more parts
  const loadMore = () => {
    currentPage.value++
  }
  
  const loadLess = () => {
    currentPage.value--
  }
  
  // Function to trigger search on enter key
  const submitSearch = () => {
    if (!searchQuery.value.trim()) {
      searchQuery.value = ''
    }
    currentPage.value = 1 // Reset to the first page when searching
  }
  </script>
  
  <style scoped>
  .search-input {
    width: 100%;
    padding: 12px 20px;
    margin: 10px 0;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  .search-input:focus {
    border-color: #007BFF;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.5);
    outline: none;
  }
  
  /* Highlight the selected part's row */
  .selected-part {
    background-color: #007BFF;
    color: white;
  }
  
  tbody tr {
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  tbody tr:hover {
    background-color: rgb(95, 130, 19);
    color: white;
  }
  
  .load-more-btn {
    margin: 15px auto;
    padding: 10px 20px;
    margin-right: 20px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .load-more-btn:hover {
    background-color: #0056b3;
  }
  
  .load-less-btn {
    margin: 15px auto;
    padding: 10px 20px;
    margin-right: 20px;
    background-color: #20b1c4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .load-less-btn:hover {
    background-color: #0056b3;
  }
  
  .buttons {
    width: auto;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
  }
  </style>
  