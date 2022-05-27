import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  plugins: [svelte()],
  server: {
    open: 'index.html',
    proxy: {
      '/api/triplet': {
        target: 'http://localhost:5000'
      },
      '/api/rating': {
        target: 'http://localhost:5000'
      },
      '/api/proxy': {
        target: 'http://localhost:5000'
      }
    }
  },
  build: {
    sourcemap: true
  }
})