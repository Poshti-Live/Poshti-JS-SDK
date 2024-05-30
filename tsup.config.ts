import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.js'],
  splitting: false,
  sourcemap: true,
  clean: true,
  shims: true,
  format: ['cjs', 'esm'],
});
