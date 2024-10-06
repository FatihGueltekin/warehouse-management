export default defineNuxtConfig({
  css: ['~/assets/style.css'],

  app: {
    head: {
      title: 'Warehouse Manager',
      meta: [
        { name: 'description', content: 'Warehouse management system for spare parts' },
        {
          'http-equiv': 'Content-Security-Policy',
          content: "default-src 'self'; script-src 'self' 'unsafe-inline';"
        }
      ]
    },
  },

  router: {
    base: '/warehouse-management/',
  },

  compatibilityDate: '2024-09-29'
});
