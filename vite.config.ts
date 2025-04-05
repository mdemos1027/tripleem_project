import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [react(), UnoCSS()],
  build: {
    outDir: 'build', // Change this to 'build' instead of 'dist'
  }
})
