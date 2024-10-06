<template>
    <div>
      <!-- Arac Tablosu -->
      <h2>Araclar</h2>

      <h3>Bir arac seciniz (Plaka): 
        <span 
          :class="{'car-selected': selectedCar, 'car-not-selected': !selectedCar}"
        >
          {{ selectedCar ? selectedCar : 'Arac Secilmedi' }}
        </span>
      </h3>
  
      <SparePartInput @submitPartIds="decreaseStock" />

      <ClientOnly>
        <ErrorModal v-if="showError" :showModal="showError" :errorMessage="errorMessage" @close="closeErrorModal" />
      </ClientOnly>

      <!-- License Plates Table -->
      <h3>Arac Plakasi sec</h3>
      <CarsSearch :cars="cars" @selectCar="selectCar" />
      <h3>Ürün listesi: </h3>
      <SpareParts :parts="allSpareParts" />
    </div>
  </template>
  
  <script setup>
  import SparePartInput from '~/components/SparePartInput.vue';
  import ErrorModal from '~/components/ErrorModal.vue';
  import CarsSearch from '~/components/CarsSearch.vue';
  import SpareParts from '~/components/SpareParts.vue';

  // Refs to hold cars and spare parts data
  const cars = ref([]);
  const allSpareParts = ref([]);
  const selectedCar = ref(null)

  // Error handling
  const showError = ref(false)
  const errorMessage = ref('')

  // Function to select a car
  const selectCar = (car) => {
    selectedCar.value = car
  }
  
  // Function to fetch cars and spare parts data
  onMounted(async () => {
    try {
      const carsResponse = await fetch('/api/cars');
      const partsResponse = await fetch('/api/parts');

      if (carsResponse.ok) {
        cars.value = await carsResponse.json();
      }

      if (partsResponse.ok) {
        allSpareParts.value = await partsResponse.json();
        allSpareParts.value.sort((a, b) => {
          return a.ürün_numarasi - b.ürün_numarasi;
        });
      }
    } catch (error) {
      console.error('Verlier yüklenemedi.:', error);
      showError.value = true
      errorMessage.value = 'Verlier yüklenemedi.'
    }
  });
  
  // Function to decrease stock of a part
  const decreaseStock = async (partsIds) => {
    console.log("partsId: ", partsIds)
    // Check if no license plate is selected
    if (!selectedCar.value) {
      showError.value = true
      errorMessage.value = 'Arac (Plaka) secilme. Lütfe bir arac secin'
      return
    }

    // Validate if part IDs are provided
    if (!partsIds.length || partsIds.some(id => !id)) {
      showError.value = true
      errorMessage.value = 'Ürün numarasi bulunamadi. Gecerli ürün numarasi ekleyin.'
      return
    }

    console.log("partIds: ", partsIds);

    for (let i = 0; i < partsIds.length; i++) {
      const partId = partsIds[i];
      const part = allSpareParts.value.find(p => p.ürün_numarasi === partId);

      if (part && part.adet > 0) {
        part.adet -= 1;

        if (part.adet < 0) {
          showError.value = true;
          errorMessage.value = `${partId} yeterli stogu bulunmamaktadir.`;
          break; // Break out of the loop
        }
      } else {
        showError.value = true;
        errorMessage.value = `${partId} numarasinda bir ürün bulunamadi.`;
        break; // Break out of the loop
      }
    }

    if (showError.value) {
      return;
    }

    // Save the updated parts data back to the file
    try {
      await $fetch('/api/parts', {
        method: 'POST',
        body: allSpareParts.value,
      });
    } catch (error) {
      showErrorModal('Ürünler sisteme eklenemedi.');
    }
  };

  const closeErrorModal = () => {
    showError.value = false
  }
  </script>
  <style scoped>
  .menu {
    position: absolute;
    top: 0;
    right: 200px;
    display: flex;
    gap: 20px;
    padding: 10px;
  }
  
  .menu a {
    color: green;
    font-weight: bold;
    text-decoration: none;
  }
  
  .menu a:hover {
    text-decoration: underline;
  }

  .car-selected {
    color: green;
  }

  .car-not-selected {
    color: red;
  }
  </style>
  