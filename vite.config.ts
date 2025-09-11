import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  // Main app runs on port 5000 for Replit
  server: {
    port: 5000,
    host: '0.0.0.0',
    strictPort: true,
    hmr: {
      overlay: false
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
