import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePrerender from 'vite-plugin-prerender'
import path from 'path'
import { STATIC_ROUTES } from './src/config/routes.js'

export default defineConfig({
  plugins: [
    react(),
    vitePrerender({
      staticDir: path.join(__dirname, 'dist'),
      // Automatically sync prerender routes with the SSOT
      routes: STATIC_ROUTES.map(route => route.path),
    }),
  ],
})
