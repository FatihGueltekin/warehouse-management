<template>
    <div>
      <input 
        v-model="searchQuery" 
        placeholder="Arac plakasi ara"
        @keyup.enter="submitSearch"
        class="search-input"
      />
  
      <table>
        <thead>
          <tr>
            <th>Kayitli arac listesi. ({{cars.length}} kayitli arac blunmaktadir): </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(car, index) in paginatedCars" 
            :key="index" 
            @click="selectCar(car)"
            :class="{ 'selected-car': selectedCar && selectedCar.arac_id === car.arac_id }"
          >
            <td>{{ car.arac_id }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Load More Button -->
      <div class="buttons">
        <div>
          <button 
            v-if="hasMoreCars" 
            @click="loadMore" 
            class="load-more-btn"
          >
            Daha fazla arac göster
          </button>

          <button 
            v-if="hasLessCars" 
            @click="loadLess" 
            class="load-less-btn"
          >
            Daha az arac göster
        </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['selectCar'])
  
  const props = defineProps({
    cars: {
      type: Array,
      required: true
    }
  })
  
  // Search input value
  const searchQuery = ref('')
  
  // Store the selected car
  const selectedCar = ref(null)
  
  // Number of cars to display initially
  const itemsPerPage = ref(10)
  const currentPage = ref(1)
  
  // Emit and set the selected car
  const selectCar = (car) => {
    selectedCar.value = car
    emit('selectCar', car.arac_id)
  }
  
  // Computed property to filter cars based on searchQuery
  const filteredCars = computed(() => {
    return props.cars.filter(car =>
      car.arac_id.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
  
  // Paginated cars
  const paginatedCars = computed(() => {
    const start = 0;
    const end = currentPage.value * itemsPerPage.value
    return filteredCars.value.slice(start, end)
  })
  
  // Check if there are more cars to load
  const hasMoreCars = computed(() => {
    return currentPage.value * itemsPerPage.value < filteredCars.value.length
  })

  const hasLessCars = computed(() => {
    return currentPage.value !== 1
  })
  
  // Function to load more cars
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
  
  /* Highlight the selected car's row */
  .selected-car {
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
  