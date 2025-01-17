import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Ensure the app knows the correct base path
  plugins: [react()],
  build: {
    outDir: 'dist', // or your specific output directory
  },
})
