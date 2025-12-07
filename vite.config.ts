import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/test2/',   // <<--- ต้องเป็นชื่อ repo ของคุณ
  plugins: [react()],
})
