import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3030,
  },
  resolve: {
    alias: {
      // Алиас @/ указывает на папку src/
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
