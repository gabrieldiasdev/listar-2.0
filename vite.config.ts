import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  build: {
    // Firebase alone is ~600 kB minified; it is split into its own long-cached chunk.
    chunkSizeWarningLimit: 700,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'firebase', test: /node_modules[\\/]@?firebase/ },
            { name: 'react', test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/ },
          ],
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      pwaAssets: { config: true },
      manifest: {
        name: 'Listar — Lista de compras',
        short_name: 'Listar',
        description: 'A lista de compras da casa, partilhada com a família',
        lang: 'pt',
        theme_color: '#047857',
        background_color: '#f8fafc',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
        globIgnores: ['og-image.png'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/__\//],
      },
    }),
  ],
})
