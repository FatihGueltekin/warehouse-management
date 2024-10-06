<template>
  <div>
    <h1>Araclar</h1>

    <!-- Confirmation Modal for Deletion -->
    <ClientOnly>
      <ConfirmationModal 
        v-if="showDeleteModal" 
        :showModal="showDeleteModal" 
        title="Aracı Sil" 
        message="Bu aracı silmek istediğinize emin misiniz?"
        @confirm="deleteCar"
        @cancel="cancelDelete"
      />
    </ClientOnly>

    <!-- Add New Car Section -->
    <div class="add-car-section">
      <h3>Yeni Arac Ekle</h3>
      <input v-model="newCar.arac_id" placeholder="Arac plakasi" />
      <input v-model="newCar.arac_sahibi" placeholder="Arac Sahibi" />
      <input v-model="newCar.adres" placeholder="Adres" />
      <input v-model="newCar.arac_markasi" placeholder="Arac Markası" />
      <button @click="addCar">Arac Ekle</button>
    </div>

    <!-- Feedback message for successful car creation -->
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <h3>Arac Listesi</h3>

    <!-- Search cars -->
    <input 
      v-model="searchQuery" 
      placeholder="Arac plakasi, arac sahibi, arac markasi, adres, tarih ara"
      @keyup.enter="submitSearch"
      class="search-input"
    />
    <table>
    <thead>
      <tr>
        <th>Kayitli arac listesi. ({{ cars.length }} kayitli arac blunmaktadir) - Filtrelenen arac sayisi: {{ filteredCars.length }}: </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(car, index) in paginatedCars" :key="index" >
        <tr
          @click="toggleDetails(car.arac_id)"
        >
          <td class="table-row" title="Arac biligilerini göstermek icin tikla">
            <div class="arrow-wrapper">
              <span class="row-element-first arrow">{{ expandedCarId === car.arac_id ? '↑' : '↓' }}</span>
            </div>
            <span class="row-element">{{ car.arac_id }}</span>
            <button class="row-element row-element-last remove-button" @click.stop="confirmDelete(car.arac_id)">Araci Sil</button>
          </td>
        </tr>
        <tr v-if="expandedCarId === car.arac_id" class="details-row">
          <td colspan="1">
            <!-- Display additional car details here -->
            <div>
              <p><strong>Arac Sahibi:</strong> {{ car.arac_sahibi }}</p>
              <p><strong>Adres:</strong> {{ car.adres }}</p>
              <p><strong>Kayıt Tarihi:</strong> {{ car.kayit_tarihi }}</p>
              <p><strong>Arac Markası:</strong> {{ car.arac_markasi }}</p>
            </div>
          </td>
        </tr>
      </template>
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

    <ClientOnly>
      <ErrorModal v-if="showError" :showModal="showError" :errorMessage="errorMessage" @close="closeErrorModal" />
    </ClientOnly>
  </div>
</template>

<script setup>
  import ErrorModal from '~/components/ErrorModal.vue';
  import ConfirmationModal from '~/components/ConfirmationModal.vue';
  const cars = ref([]);
  const newCar = ref({ arac_id: '', arac_sahibi: '', adres: '', arac_markasi: '' });
  const successMessage = ref(''); // Feedback message for successful creation
  const expandedCarId = ref(null); // Holds the ID of the expanded car
  const showDeleteModal = ref(false);
  const carToDelete = ref(null);
    
  // Search input value
  const searchQuery = ref('');

  // Number of cars to display initially
  const itemsPerPage = ref(10);
  const currentPage = ref(1);

  // Error handling
  const showError = ref(false)
  const errorMessage = ref('')

  const toggleDetails = (arac_id) => {
    expandedCarId.value = expandedCarId.value === arac_id ? null : arac_id;
  };

  const closeErrorModal = () => {
    showError.value = false
  }

  const filteredCars = computed(() => {
    return cars.value.filter(car => {
      const search = searchQuery.value.toLowerCase();

      return (
        car?.arac_id?.toLowerCase().includes(search) ||
        car?.arac_sahibi?.toLowerCase().includes(search) ||
        car?.adres?.toLowerCase().includes(search) ||
        car?.arac_markasi?.toLowerCase().includes(search) ||
        car?.kayit_tarihi?.toLowerCase().includes(search)
      );
    });
  });


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

  // Function to format the current date as "YYYY-MM-DD"
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Function to save the updated cars array to araclar.json
  const saveToDatabase = async () => {
    try {
      await $fetch('/api/cars', {
        method: 'POST',
        body: cars.value,
      });
    } catch (error) {
      showError.value = true;
      errorMessage.value = 'Veritabanı güncellenemedi';
    }
  };

  // Function to add a new car
  const addCar = async () => {
    // Validate input fields
    if (!newCar.value.arac_id || !newCar.value.arac_sahibi || !newCar.value.adres || !newCar.value.arac_markasi) {
      showError.value = true;
      errorMessage.value = 'Lütfen tüm alanları doldurun';
      return;
    }

    // Add new car to the list
    cars.value.unshift({ ...newCar.value, kayit_tarihi: getCurrentDate() });

    // Save to araclar.json
    await saveToDatabase();

    // Show success message
    successMessage.value = 'Yeni arac (plakasi: ' + newCar.value.arac_id +') başarıyla eklendi ve kaydedildi!';

    // Remove the message after a delay (e.g., 3 seconds)
    setTimeout(() => {
      successMessage.value = '';
    }, 60000);

    // Clear the input fields
    newCar.value = { arac_id: '', arac_sahibi: '', adres: '', arac_markasi: '' };
  };

  // Trigger the modal for confirmation
  const confirmDelete = (arac_id) => {
    carToDelete.value = arac_id;
    showDeleteModal.value = true;
  };

  // Function to cancel deletion
  const cancelDelete = () => {
    showDeleteModal.value = false;
    carToDelete.value = null;
  };
  
  // Function to delete the car
  const deleteCar = () => {
    cars.value = cars.value.filter(car => car.arac_id !== carToDelete.value);
    showDeleteModal.value = false;
    carToDelete.value = null;
    saveToDatabase();  // Save the updated list to the database
  };

  onMounted(async () => {
    try {
      const carsResponse = await fetch('/api/cars');

      if (carsResponse.ok) {
        cars.value = await carsResponse.json();
      }
    } catch (error) {
      showError.value = true
      errorMessage.value = 'arac verlieri yüklenemedi.'
    }
  });
</script>
<style scoped>
  /* Add Car Section Styling */
  .add-car-section {
    margin-bottom: 20px;
  }
  
  .add-car-section input {
    margin: 5px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .remove-button,
  .add-car-section button {
    padding: 10px 20px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  remove-button,
  .add-car-section button:hover {
    background-color: darkgreen;
  }

  .success-message {
    color: green;
    font-weight: bold;
    margin-top: 10px;
  }

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

  .table-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 50px;
    height: 50px;
  }

  .row-element {
    width: 200px;
  }

  .row-element-last {
    width: 200px;
    margin-left: auto;
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

  .arrow {
    font-weight: bold;  /* Make the arrow bold */
  }

  .arrow-wrapper {
    background-color: #007BFF;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: 1px solid black;
    border-radius: 4px;
  }

  .details-row {
    background-color: #f9f9f9; /* Light background for the details row */
  }
</style>