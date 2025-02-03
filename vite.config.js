import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  server: {
    proxy: {
      "/google-auth": {
        target: "https://oauth2.googleapis.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/google-auth/, ""),
      }
    }
  }
})