// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'FoodieBlog',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxtjs/google-fonts',
    '@nuxtjs/color-mode',
  ],

  googleFonts: {
    families: {
      'Playfair+Display': [400, 600, 700],
      Inter: [400, 500, 600],
    },
    display: 'swap',
  },
  colorMode: {
    classSuffix: '',
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          fontFamily: {
            heading: ['Playfair Display', 'serif'],
            sans: ['Inter', 'sans-serif'],
          },
        },
      },
    },
  },
  nitro: {
    // Enable API routes
    routeRules: {
      '/api/**': { cors: true },
    },
  },
});
