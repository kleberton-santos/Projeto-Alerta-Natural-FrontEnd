import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.openweathermap.org/data/2.5', // URL da API do OpenWeatherMap
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false, // Desativa a verificação de certificado SSL (opcional)
      },
    },
  },
});