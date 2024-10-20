<template>
  <div>
    <h1>Ürünler</h1>

    <!-- Confirmation Modal for Deletion -->
    <ClientOnly>
      <ConfirmationModal 
        v-if="showDeleteModal" 
        :showModal="showDeleteModal" 
        title="Ürünü Sil" 
        message="Bu ürünü silmek istediğinize emin misiniz?"
        @confirm="deleteProduct"
        @cancel="cancelDelete"
      />
    </ClientOnly>

    <!-- Confirmation Modal for Deletion -->
    <ClientOnly>
      <ConfirmationModal 
        v-if="showProductStockEditModal" 
        :showModal="showProductStockEditModal" 
        title="Ürün stock degisikligi" 
        message="Bu ürünün stogunu degistirmek istediginize emin misiniz?"
        @confirm="editStock"
        @cancel="cancelStockEdit"
      />
    </ClientOnly>

    <!-- Add New Product Section -->
    <div class="add-product-section">
      <h3>Yeni Ürün Ekle</h3>
      <input v-model="newProduct.ürün_numarasi" placeholder="Ürün numarasi" />
      <input v-model="newProduct.ürün_ismi" placeholder="Ürün ismi" />
      <input v-model="newProduct.ürün_fiyati" placeholder="Ürün fiyati"/>
      <input v-model="newProduct.ürün_adedi" placeholder="Ürün adedi"/>
      <button @click="addProduct">Ürün Ekle</button>
    </div>

    <!-- Feedback message for successful product creation -->
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <h3>Ürün Listesi</h3>

    <!-- Search products -->
    <input 
      v-model="searchQuery" 
      placeholder="Ürün numarasi, Ürün Adı, Ürün fiyiti, kayit tarihi ara"
      @keyup.enter="submitSearch"
      class="search-input"
    />
    <table>
      <thead>
        <tr>
          <th>Kayitli ürün listesi ({{ products.length }} kayitli ürün bulunmaktadır) - Filtrelenen ürün sayısı: {{ filteredProducts.length }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(product, index) in paginatedProducts" :key="index">
          <tr @click="toggleDetails(product.ürün_numarasi)">
            <td class="table-row" title="Ürün bilgilerini göstermek için tıkla">
              <div class="arrow-wrapper">
                <span class="row-element-first arrow">{{ expandedProductId === product.ürün_numarasi ? '↑' : '↓' }}</span>
              </div>
              <span class="row-element">Ürün numarasi: {{ product.ürün_numarasi }}</span>
              <span class="row-element">{{ product.ürün_ismi }}</span>
              <span class="row-element">TL: {{ product.ürün_fiyati }}</span>
              <span class="row-element">Stok: {{ product.ürün_adedi }}</span>
              <button class="row-element row-element-last remove-button" @click.stop="confirmDelete(product.ürün_numarasi)">Ürünü Sil</button>
            </td>
          </tr>
          <tr v-if="expandedProductId === product.ürün_numarasi" class="details-row">
            <td colspan="1">
              <!-- Display additional product details here -->
              <div>
                <p><strong>Ürün Adı:</strong> {{ product.ürün_ismi }}</p>
                <p><strong>Fiyat:</strong> {{ product.ürün_fiyati }} TL</p>
                <p><strong>Stok Miktarı:</strong> {{ product.ürün_adedi }}</p>
                <p><strong>Kayıt Tarihi:</strong> {{ product.ürün_kayit_tarihi }}</p>

                <!-- Input fields to add and decrease stock -->
                <span>Ürün stogunu düzenle: </span>
                <div class="stock-adjustment">
                  <input
                   type="number"
                   v-model.number="productEditCount"
                  placeholder="Miktar"
                  min="1"
                  class="stock-input"
                />
                  <button @click="increaseStock(product.ürün_numarasi)" class="stock-button">Ürün stogunu artır</button>
                  <button @click="decreaseStock(product.ürün_numarasi)" class="stock-button">Ürün stogune azalt</button>
                </div>
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
          v-if="hasMoreProducts" 
          @click="loadMore" 
          class="load-more-btn"
        >
          Daha fazla ürün göster
        </button>

        <button 
          v-if="hasLessProducts" 
          @click="loadLess" 
          class="load-less-btn"
        >
          Daha az ürün göster
        </button>
      </div>
    </div>

    <ClientOnly>
      <ErrorModal v-if="showError" :showModal="showError" :errorMessage="errorMessage" @close="closeErrorModal" />
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ErrorModal from '~/components/ErrorModal.vue';
import ConfirmationModal from '~/components/ConfirmationModal.vue';

const products = ref([]);
const newProduct = ref({ ürün_numarasi: '', ürün_ismi: '', ürün_fiyati: '', ürün_adedi: '' });
const successMessage = ref('');
const expandedProductId = ref(null);
const showDeleteModal = ref(false);
const showProductStockEditModal = ref(false);
const stockEditAction = ref(null);
const productToEdit = ref(null);
const productEditCount = ref(0);
const productToDelete = ref(null);
const searchQuery = ref('');
const itemsPerPage = ref(10);
const currentPage = ref(1);
const showError = ref(false);
const errorMessage = ref('');
const stockAdjustment = ref([]); // To hold stock adjustment input values

const toggleDetails = (ürün_numarasi) => {
  expandedProductId.value = expandedProductId.value === ürün_numarasi ? null : ürün_numarasi;
};

const closeErrorModal = () => {
  showError.value = false;
};

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const search = searchQuery.value.toLowerCase();

    return (
      product?.ürün_numarasi?.toLowerCase().includes(search) ||
      product?.ürün_ismi?.toLowerCase().includes(search) ||
      product?.ürün_kayit_tarihi?.toLowerCase().includes(search) ||
      product?.ürün_fiyati?.toString().toLowerCase().includes(search)
    );
  });
});

// Paginated products
const paginatedProducts = computed(() => {
  const start = 0;
  const end = currentPage.value * itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
});

// Check if there are more products to load
const hasMoreProducts = computed(() => {
  return currentPage.value * itemsPerPage.value < filteredProducts.value.length;
});

const hasLessProducts = computed(() => {
  return currentPage.value !== 1;
});

// Function to load more products
const loadMore = () => {
  currentPage.value++;
};

const loadLess = () => {
  currentPage.value--;
};

// Function to format the current date as "YYYY-MM-DD"
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Function to save the updated products array to products.json
const saveToDatabase = async () => {
  try {
    await $fetch('/api/parts', {
      method: 'POST',
      body: products.value,
    });
  } catch (error) {
    showError.value = true;
    errorMessage.value = 'Veritabanı güncellenemedi';
  }
};

// Function to add a new product
const addProduct = async () => {
  // Validate input fields
  if (!newProduct.value.ürün_numarasi || !newProduct.value.ürün_ismi || !newProduct.value.ürün_fiyati || !newProduct.value.ürün_adedi) {
    showError.value = true;
    errorMessage.value = 'Lütfen tüm alanları doldurun';
    return;
  }

  if (products.value.some((product) => product.ürün_numarasi === newProduct.value.ürün_numarasi)) {
    showError.value = true;
    errorMessage.value = 'Bu ürün numarasi kullanilmaktadir ' + newProduct.value.ürün_numarasi + '. Kullanilmayan bir ürün numarasi girin.';
    return;
  }

  // Add new product to the list
  products.value.unshift({ 
    ürün_numarasi: newProduct.value.ürün_numarasi,
    ürün_ismi: newProduct.value.ürün_ismi,
    ürün_fiyati: parseFloat(newProduct.value.ürün_fiyati).toFixed(2),
    ürün_adedi: parseInt(newProduct.value.ürün_adedi, 10), 
    ürün_kayit_tarihi: getCurrentDate()
  });

  // Save to products.json
  await saveToDatabase();

  // Show success message
  successMessage.value = 'Yeni ürün (Ürün numarasi: ' + newProduct.value.ürün_numarasi +') başarıyla eklendi ve kaydedildi!';

  // Remove the message after a delay (e.g., 3 seconds)
  setTimeout(() => {
    successMessage.value = '';
  }, 60000);

  // Clear the input fields
  newProduct.value = { ürün_numarasi: '', ürün_ismi: '', ürün_fiyati: '', ürün_adedi: '' };
};

// Trigger the modal for confirmation
const confirmDelete = (ürün_numarasi) => {
  productToDelete.value = ürün_numarasi;
  showDeleteModal.value = true;
};

// Function to cancel deletion
const cancelDelete = () => {
  showDeleteModal.value = false;
  productToDelete.value = null;
};

// Trigger the modal for confirmation
const editStock = () => {
  const editingProduct = products.value.find(product => product.ürün_numarasi === productToEdit.value);

  // If the product doesn't exist, return early
  if (!editingProduct) {
    return;
  }

  const { ürün_adedi } = editingProduct; // Destructure for clarity
  const count = productEditCount.value;

  if (stockEditAction.value === 'increase') {
    editingProduct.ürün_adedi += count; // Increase stock
  } else if (stockEditAction.value === 'decrease') {
    editingProduct.ürün_adedi = Math.max(0, ürün_adedi - count); // Decrease stock, ensuring it doesn't go below 0
  }

  saveToDatabase();
  showProductStockEditModal.value = false;
};


// Function to cancel deletion
const cancelStockEdit = () => {
  showDeleteModal.value = false;
  productToEdit.value = null;
};

// Function to delete the product
const deleteProduct = () => {
  products.value = products.value.filter(product => product.ürün_numarasi !== productToDelete.value);
  showDeleteModal.value = false;
  productToDelete.value = null;
  saveToDatabase(); // Save the updated list to the database
};

const increaseStock = (ürün_numarasi) => {
  productToEdit.value = ürün_numarasi;
  showProductStockEditModal.value = true;
  stockEditAction.value = "increase";
};

const decreaseStock = (ürün_numarasi) => {
  productToEdit.value = ürün_numarasi;
  showProductStockEditModal.value = true;
  stockEditAction.value = "decrease";
};

onMounted(async () => {
  try {
    const productsResponse = await fetch('/api/parts');

    if (productsResponse.ok) {
      products.value = await productsResponse.json();

      products.value.sort((a, b) => {
        return a.ürün_numarasi - b.ürün_numarasi;
      });
    }
  } catch (error) {
    showError.value = true;
    errorMessage.value = 'Ürün verileri yüklenemedi.';
  }
});
</script>

<style scoped>
.add-product-section {
  margin-bottom: 20px;
}

.add-product-section input {
  margin: 5px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.remove-button,
.add-product-section button {
  padding: 10px 20px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.remove-button,
.add-product-section button:hover {
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
  border-color: #4a90e2;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.5);
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
  width: 150px;
}

.row-element-last {
  width: 200px;
  margin-left: auto;
}

.details-row {
  background-color: #f9f9f9;
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

.stock-adjustment {
  display: flex;
  align-items: center;
  gap: 10px; /* Space between elements */
  margin-top: 10px; /* Space above the stock adjustment section */
}

.stock-input {
  width: 80px; /* Width of the input field */
  padding: 5px; /* Padding inside the input field */
  border: 1px solid #ccc; /* Border style */
  border-radius: 4px; /* Rounded corners */
  font-size: 16px; /* Font size */
}

.stock-button {
  padding: 6px 12px; /* Padding for the buttons */
  background-color: #4CAF50; /* Green background color */
  color: white; /* White text color */
  border: none; /* Remove border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s; /* Smooth background color transition */
}

.stock-button:hover {
  background-color: #45a049; /* Darker green on hover */
}

.row-element {
  margin-right: 10px; /* Space between row elements */
}
</style>
