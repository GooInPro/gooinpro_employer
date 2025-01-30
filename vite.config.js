import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/naver-auth": {
        target: "https://nid.naver.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/naver-auth/, ""),
      }
    }
  }
})


// const access_token_url = ``;
