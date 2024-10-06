<template>
    <div class="layout">
      <!-- Menu -->
      <nav class="menu">
        <ul>
          <li><NuxtLink to="/">Ana sayfa</NuxtLink></li>
          <li><NuxtLink to="/araclar">Araclar</NuxtLink></li>
          <li><NuxtLink to="/urunler">Ürünler</NuxtLink></li>
          <li><NuxtLink to="/satislar">Satislar</NuxtLink></li>
        </ul>
      </nav>
  
      <!-- Page Content -->
      <main>
        <NuxtPage />
      </main>
  
      <!-- Footer -->
      <footer>
        <p>&copy; 2024</p>
      </footer>
    </div>
  </template>
  
  <style scoped>
  .layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .menu {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    background-color: #333;
    padding: 15px;
  }
  
  .menu ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 15px;
  }
  
  .menu ul li {
    display: inline;
  }
  
  .menu ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  
  main {
    flex: 1;
    padding: 20px;
    background-color: #f5f5f5;
  }
  
  footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 10px 0;
  }
  </style>
  