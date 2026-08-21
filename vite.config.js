import { defineConfig } from 'vite';

// Pure front-end demo — no framework plugins needed.
export default defineConfig({
  root: '.',
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
