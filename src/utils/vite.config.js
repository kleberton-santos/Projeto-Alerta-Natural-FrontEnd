import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
      include: ['react', 'react-dom'],

      build: {
        rollupOptions: {
        input: './index.html' // Caminho para o arquivo index.html
    },
  },
    }
});
