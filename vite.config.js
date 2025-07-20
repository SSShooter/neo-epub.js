import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isMinified = mode === 'production';
  const fileName = isMinified ? 'epub.min' : 'epub';

  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/epub.js'),
        name: 'ePub',
        formats: ['umd', 'es'],
        fileName: (format) => `${fileName}.${format === 'es' ? 'mjs' : 'js'}`
      },
      rollupOptions: {
        external: ['jszip/dist/jszip'],
        output: {
          globals: {
            'jszip/dist/jszip': 'JSZip'
          },
          exports: 'default'
        }
      },
      sourcemap: !isMinified,
      minify: isMinified,
      outDir: 'dist',
      emptyOutDir: false,
      target: 'es2020'
    },
    resolve: {
      alias: {
        'path': 'path-webpack'
      }
    },
    server: {
      host: 'localhost',
      port: 8080,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode === 'development' ? 'development' : 'production')
    }
  };
});