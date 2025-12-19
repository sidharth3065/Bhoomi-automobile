import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    {
      name: 'rewrite-root-to-home',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/') {
            req.url = '/home.html'
          }
          next()
        })
      }
    },
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