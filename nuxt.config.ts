// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@hypernym/nuxt-anime',
    '@pinia/nuxt',
  ],
  imports: {
    dirs: ['./stores'],
  }
})
