import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import vitest from 'vitest';

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import rollupNodePolyFill from 'rollup-plugin-node-polyfills';

const testConfig: vitest.InlineConfig = {
  coverage: {
    provider: 'istanbul',
  },
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/tests/setup.ts',
};

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'node-fetch': 'isomorphic-fetch',
      stream: 'rollup-plugin-node-polyfills/polyfills/stream',
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },
  test: testConfig,
});
