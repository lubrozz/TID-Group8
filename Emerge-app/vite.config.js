import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      parse: "parse/dist/parse.min.js",
    },
  },
  optimizeDeps: {
    include: ["parse"],
  },
})
