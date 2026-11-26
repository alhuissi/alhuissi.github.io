import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  publicDir: false,
  plugins: [{
    name: 'island-source-entry',
    apply: 'serve',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace('./island-runtime/app.js', '/src/main.ts'),
    },
  }],
  build: {
    outDir: 'island-runtime',
    emptyOutDir: true,
    target: 'es2022',
    chunkSizeWarningLimit: 600, // The lazy Three.js chunk is about 146 kB gzipped.
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        entryFileNames: 'app.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        manualChunks: (id) => id.includes('/node_modules/three/') ? 'three' : undefined,
      },
    },
  },
});
