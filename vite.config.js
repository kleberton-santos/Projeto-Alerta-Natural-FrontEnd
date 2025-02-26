import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy para a Visual Crossing
      '/visualcrossing-api': {
        target: 'https://weather.visualcrossing.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/visualcrossing-api/, ''),
      },
      // Proxy para o OpenWeatherMap
      '/openweather-api': {
        target: 'https://api.openweathermap.org/data/2.5', // URL da API do OpenWeatherMap
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/openweather-api/, ''),
        secure: false, // Desativa a verificação de certificado SSL (opcional)
      },
    },
  },
});
