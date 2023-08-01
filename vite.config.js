import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    TOKEN: JSON.stringify('Bearer 5|P6IZFoK7W770ifSN2aLPcQYlts0q9SkzoAvneciZ'),
    API: JSON.stringify('http://labsi2.ipbeja.pt/capacita-api/api/')
  }
})
