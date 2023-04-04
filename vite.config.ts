import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const aliases = {
  shared: 'src/shared',
  application: 'src/application',
  features: 'src/features'
}
const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [key, resolve(__dirname, value)])
)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  resolve: {
    alias: {
      ...resolvedAliases
    }
  }
})
