import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-tests.js",
    coverage: {
      provider: "v8",
      reporter: ["json-summary", "lcov", "text"],
      include: ["src/**/*.jsx", "src/**/*.js"],
      exclude: ["src/__mocks", "src/App.jsx", "src/router.jsx", "src/main.jsx"],
      outputDirectory: "./coverage",
      all: true,
    },
  },
});
