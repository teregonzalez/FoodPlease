import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Configuración de Vite para el frontend React
 * SOLID: SRP - Solo configuración de build
 * 
 * Los módulos de Capacitor se marcan como externos porque se cargan
 * en tiempo de ejecución en aplicaciones nativas, no durante el build.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '127.0.0.1',
    cors: true,
  },
  base: '/FoodPlease/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      external: [
        '@capacitor/core',
        '@capacitor/preferences',
        '@capacitor/local-notifications',
        '@capacitor/geolocation',
        '@capacitor/camera',
      ],
      output: {
        // En el navegador, Capacitor no está disponible, por eso ignoramos los módulos externos
        globals: {
          '@capacitor/core': 'Capacitor',
          '@capacitor/preferences': 'Capacitor',
          '@capacitor/local-notifications': 'Capacitor',
          '@capacitor/geolocation': 'Capacitor',
          '@capacitor/camera': 'Capacitor',
        },
      },
    },
  },
})
