import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  exportdefault:defineConfig({
    server: {
      host: '0.0.0.0',  // Isso permitirá conexões de outras máquinas na rede
      port: 5173,        // Ou a porta que você estiver utilizando
    },
  }),
  
})


