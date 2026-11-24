import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    // SPA fallback: all 404s from vite dev server return index.html
    historyApiFallback: true,
  },
  preview: {
    port: 4173,
  },
});
