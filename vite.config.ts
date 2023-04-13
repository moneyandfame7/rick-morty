import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true
  },
  appType: 'spa',
  resolve: {
    alias: {
      '@application': '/src/application',
      '@features': '/src/features',
      '@shared': '/src/shared'
    }
  }
})
