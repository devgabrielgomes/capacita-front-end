import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    API_LINK: JSON.stringify('https://labsi2.ipbeja.pt/capacita-api/api/'),
    PT: JSON.stringify('/?set_locale=pt'),
    MAPS_API_KEY: JSON.stringify('AIzaSyAk_0EOtoPbFBVHBWzDJj0PpqbwK2C9vNo'),
  }
})
