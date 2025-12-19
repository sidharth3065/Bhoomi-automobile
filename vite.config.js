import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'home.html',
        about: 'about.html',
        vehicles: 'vehicles.html',
        gallery: 'gallery.html',
        contact: 'contact.html',
      },
    },
  },
})