import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  publicDir: false,
  plugins: [{
    name: 'island-source-entry',
    apply: 'serve',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace(/\.\/island-runtime\/app\.js(\?v=\w+)?/, '/src/main.ts'),
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
        // index.html loads app.js?v=<hash>, so chunks must never import from app.js: a bare
        // "../app.js" is a second module URL and would run the whole entry again.
        manualChunks: (id) => {
          if (/\/node_modules\/three\/(src|build)\//.test(id)) return 'three';
          if (id.includes('preload-helper') || /\/src\/(destinations|journal|runtime\/quality)\.ts$/.test(id)) return 'shared';
          return undefined;
        },
      },
    },
  },
});
