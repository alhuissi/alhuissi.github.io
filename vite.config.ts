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
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        entryFileNames: 'app.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        manualChunks: (id) => /\/node_modules\/three\/(src|build)\//.test(id) ? 'three' : undefined,
      },
    },
  },
});
