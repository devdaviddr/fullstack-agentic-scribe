import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    include: [
      `${__dirname}/src/**/*.test.ts`,
      `${__dirname}/tests/**/*.test.ts`,
    ],
    coverage: {
      reporter: ['text', 'lcov'],
      reportsDirectory: path.resolve(__dirname, '../../coverage/server'),
      all: true,
      include: ['src/**/*.ts'],
    },
  },
});
