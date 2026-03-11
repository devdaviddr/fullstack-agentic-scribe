import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@shared': path.resolve(__dirname, '../shared/src') },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [
      // absolute path avoids CWD confusion when running from repo root
      path.resolve(__dirname, 'src/setupTests.ts'),
    ],
    // resolve patterns relative to this config file so tests are found
    // regardless of the current working directory.
    include: [
      `${__dirname}/src/**/*.test.{ts,tsx}`,
    ],
    coverage: {
      reporter: ['text', 'lcov'],
      reportsDirectory: path.resolve(__dirname, '../../coverage/client'),
      all: true,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    },
  },
});
