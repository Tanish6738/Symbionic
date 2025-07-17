// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import glsl from 'vite-plugin-glsl';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    glsl(),          // GLSL shader support
    tailwindcss(),   // Tailwind support
  ],
  assetsInclude: ['**/*.glsl'], // Optional: if using external .glsl files
  define: {
    global: 'globalThis',
    'process.env': {},
  },
  resolve: {
    alias: {
      'process': 'process/browser',
      'path': 'path-browserify',
      'os': 'os-browserify/browser',
      'util': 'util',
    },
  },
  optimizeDeps: {
    include: ['process', 'path-browserify', 'os-browserify', 'util'],
  },
  esbuild: {
    define: {
      global: 'globalThis',
    },
  },
});
