import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const defaultOptions = {
  changeOrigin: true,
  // Switch to true in production
  secure: true,
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    // Configure proxy for backend connection
    proxy: {
      '/auth': {
        target: 'http://localhost:3000',
        ...defaultOptions,
      },
      '/profile': {
        target: 'http://localhost:3000',
        ...defaultOptions,
      }
    }
  }

})
