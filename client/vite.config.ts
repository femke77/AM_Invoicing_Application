import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port:3000,
    // Use the proxy here to avoid CORS issues
    proxy: {
      '/api': {
        // target: 'http://localhost:3001',  // for local
       target: 'http://server:3001', // for docker
        changeOrigin: true,
      },
    },
  },
});
