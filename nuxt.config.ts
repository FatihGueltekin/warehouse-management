export default defineNuxtConfig({
  css: ['~/assets/style.css'],

  app: {
    head: {
      title: 'Warehouse Manager',
      meta: [
        {
          content: "default-src 'self'; script-src 'self' 'unsafe-inline';"
        },
        { 
          name: 'description', content: 'Warehouse management system for spare parts' 
        },
      ],
    },
    baseURL: '/warehouse-management/', // This is the correct place to set the base URL
  },

  compatibilityDate: '2024-09-29',
});
