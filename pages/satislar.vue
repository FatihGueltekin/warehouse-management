<template>
  <div class="container">
    <h1 class="page-title">Sales Management</h1>

    <!-- Sales List Table -->
    <table class="sales-table" v-if="sales.length">
      <thead>
        <tr>
          <th>Sale Number</th>
          <th>Date</th>
          <th>Customer</th>
          <th>License Plate</th>
          <th>Products</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sale in sales" :key="sale.satis_numarasi">
          <td>{{ sale.satis_numarasi }}</td>
          <td>{{ sale.satis_tarihi }}</td>
          <td>{{ sale.satis_müsteri_adi }}</td>
          <td>{{ sale.satis_plakasi }}</td>
          <td>{{ sale.satilan_ürünler?.join(', ') ?? '' }}</td>
          <td><button @click="removeSale(sale.satis_numarasi)" class="btn-remove">Remove</button></td>
        </tr>
      </tbody>
    </table>
    <p v-else>No sales found.</p>

    <!-- Add Sale Section -->
    <div class="add-sale-section">
      <h2>Add New Sale</h2>
      <div class="input-grid">
        <div class="input-group">
          <label>Sale Number:</label>
          <input v-model="newSale.satis_numarasi" type="text" required />
        </div>

        <div class="input-group">
          <label>Sale Date (YYYY-MM-DD):</label>
          <input v-model="newSale.satis_tarihi" type="date" required />
        </div>

        <div class="input-group">
          <label>Customer Name:</label>
          <input v-model="newSale.satis_müsteri_adi" type="text" required />
        </div>

        <div class="input-group">
          <label>Car Plate:</label>
          <input v-model="newSale.satis_plakasi" type="text" required />
        </div>

        <div class="input-group">
          <label>Products Sold (comma separated):</label>
          <input v-model="newSale.satilan_ürünler" type="text" placeholder="e.g., 1,2,3" />
        </div>

        <button @click="addSale" class="btn-add">Add Sale</button>
      </div>
    </div>
  </div>
</template>

<script setup>
// States for sales data and new sale input
const sales = ref([])
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
  satis_müsteri_adi: ''
})

// Fetch sales data on page load
const fetchSales = async () => {
  const sellsResponse = await fetch('/api/sells');

  if (sellsResponse.ok) {
    sales.value = await sellsResponse.json() || [];
  }
}

// Add a new sale
const addSale = async () => {
  // Split the products sold input string into an array
  newSale.value.satilan_ürünler = newSale.value.satilan_ürünler
    .split(',')
    .map(product => product.trim()) // Trim whitespace around each product

  const satis_tarihi = newSale.value.satis_tarihi
  const [year, month, day] = satis_tarihi.split('-')
  newSale.value.satis_yili = year
  newSale.value.satis_ayi = month
  newSale.value.satis_günü = day

  await $fetch('/api/sells', {
    method: 'POST',
    body: newSale.value
  })

  await fetchSales()

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
    satis_müsteri_adi: ''
  }
}

// Remove a sale by satis_numarasi
const removeSale = async (saleNumber) => {
  sales.value = sales.value.filter(sale => sale.satis_numarasi !== saleNumber)

  await $fetch('/api/sells', {
    method: 'POST',
    body: sales.value
  })

  await fetchSales()
}

onMounted(async () => {
  try {
    // Initialize fetch on mounted
    fetchSales();
  } catch (error) {
    showError.value = true;
    errorMessage.value = 'Ürün verileri yüklenemedi.';
  }
});
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 24px;
  color: #333;
}

.sales-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;
}

.sales-table th, .sales-table td {
  border: 1px solid #ddd;
  padding: 10px;
}

.sales-table th {
  background-color: #f5f5f5;
  text-align: left;
  font-weight: bold;
}

.sales-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.sales-table tr:hover {
  background-color: #e1e1e1;
}

.btn-remove {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.btn-remove:hover {
  background-color: #d43d3d;
}

.add-sale-section {
  margin-top: 40px;
}

h2 {
  font-size: 20px;
  margin-bottom: 20px;
}

.input-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

input[type="text"], input[type="date"] {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
}

.btn-add {
  grid-column: 1 / -1;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
}

.btn-add:hover {
  background-color: #45a049;
}
</style>
