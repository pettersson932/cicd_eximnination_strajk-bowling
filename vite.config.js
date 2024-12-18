import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTests.js",
    coverage: {
      provider: "v8",
      css: false,
      reporter: ["text", "json", "html", "lcov", "json-summary"],
      include: ["src/**/*.js", "src/**/*.jsx"],
      all: true,
      exclude: ["./src/main.jsx", "./vite.config.js/", "./src/__mocks"],
      reportsDirectory: "./coverage",
    },
  },
});
