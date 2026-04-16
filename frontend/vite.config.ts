import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Configuración de Vite para el frontend React
 * SOLID: SRP - Solo configuración de build
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '127.0.0.1',
    cors: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
