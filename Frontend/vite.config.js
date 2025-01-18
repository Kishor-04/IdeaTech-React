import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    "/": {
      target:"https://ideatech-react.onrender.com",
      changeOrigin: true
    }
  }
})
// This is the configuration file for Vite. It is a build tool that is used to bundle our React application.