export default defineNuxtConfig({
  css: ['~/assets/style.css'],

  app: {
    head: {
      title: 'Warehouse Manager',
      meta: [
        { name: 'description', content: 'Warehouse management system for spare parts' }
      ]
    }
  },

  compatibilityDate: '2024-09-29'
})