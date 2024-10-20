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

      <SuccessModal
        v-if="showSuccessModal"
        header="Islem uygulandi!"
        text="Satilan ürünler basariyla sisteme islende."
        :visible="showSuccessModal"
        @close="showSuccessModal = false"
      />
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
  const showSuccessModal = ref(false);

  const newSale = ref({
    satis_numarasi: '',
    satis_tarihi: '',
    satis_yili: '',
    satis_ayi: '',
    satis_günü: '',
    satilan_ürünler: [],
    satis_plakasi: '',
    satis_iptal_edildi: false,
    satis_iptal_tarihi: null,
  })

  // Function to select a car
  const selectCar = (car) => {
    selectedCar.value = car
  }
  
  // Add a new sale
  const addSale = async (partIds) => {
    console.log("addSale - partIds: ", partIds)
    // Split the products sold input string into an array
    newSale.value.satilan_ürünler = partIds;

    console.log("newSale.value.satilan_ürünler: ", newSale.value.satilan_ürünler)

    const currentDate = new Date();

    // Extract the year, month, and day from the current date
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so +1
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    newSale.value.satis_tarihi = `${year}-${month}-${day}`
    newSale.value.satis_yili = year
    newSale.value.satis_ayi = month
    newSale.value.satis_günü = day
    const timestampInSeconds = Math.floor(Date.now() / 1000);
    newSale.value.satis_numarasi = timestampInSeconds;
    newSale.value.satis_plakasi = selectedCar.value;
    newSale.value.satis_iptal_edildi = false;
    newSale.value.satis_iptal_tarihi = null;

    console.log("newSale: ", newSale.value);

    await $fetch('/api/sells', {
      method: 'POST',
      body: newSale.value
    })

    // Reset newSale object
    newSale.value = {
      satis_numarasi: '',
      satis_tarihi: '',
      satis_yili: '',
      satis_ayi: '',
      satis_günü: '',
      satilan_ürünler: [],
      satis_plakasi: '',
      satis_iptal_edildi: false,
      satis_iptal_tarihi: null,
    }
  }
  
  // Function to decrease stock of a part
  const decreaseStock = async (partsIds) => {
    console.log("partIds: ", partsIds)
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

    for (let i = 0; i < partsIds.length; i++) {
      const partId = partsIds[i];
      const part = allSpareParts.value.find(p => p.ürün_numarasi === partId);

      if (part && part.ürün_adedi > 0) {
        part.ürün_adedi -= 1;

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

      showSuccessModal.value = true;
    } catch (error) {
      showErrorModal('Ürünler sisteme eklenemedi.');

      return;
    }

    addSale(partsIds);
  };

  const closeErrorModal = () => {
    showError.value = false
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
  