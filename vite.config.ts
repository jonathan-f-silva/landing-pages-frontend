/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'text', 'html', 'json'],
      all: true,
      include: ['src/**/*.tsx'],
      exclude: ['src/main.tsx'],
    }
  },
});
