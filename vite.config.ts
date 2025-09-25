import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Main app runs on port 3100 for development
  server: {
    port: 3100,
    host: '0.0.0.0',
    strictPort: true,
    allowedHosts: true, // Allow any host for Replit preview
    hmr: {
      overlay: false
    }
  },
  preview: {
    allowedHosts: true // Also needed for preview mode
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
