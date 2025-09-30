import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  
    VitePWA({
      registerType: 'autoUpdate',
      // manifest: {
      //   name: 'FarmSoko Marketplace',
      //   short_name: 'FarmSoko',
      //   theme_color: '#4CAF50',
      //   background_color: '#ffffff',
      //   display: 'standalone',
      //   icons: [
      //     {
      //       src: 'icons/icon-192x192.png',
      //       sizes: '192x192',
      //       type: 'image/png'
      //     },
      //     {
      //       src: 'icons/icon-512x512.png',
      //       sizes: '512x512',
      //       type: 'image/png'
      //     }
      //   ]
      // }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    setupFiles: './src/setupTests.js',
    environment: 'jsdom'
  }
})
