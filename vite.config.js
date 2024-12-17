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
      reporter: ["text", "json", "lcov", "json-summary"],
      include: ["src/**/*.js", "src/**/*.jsx"],
      exclude: [
        "src/main.jsx",
        "src/App.jsx",
        "src/router.jsx",
        "src/views/Booking.jsx",
        "src/views/Confirmation.jsx",
        "src/components/BookingInfo/BookingInfo.jsx",
        "src/components/ErrorMessage/ErrorMessage.jsx",
        "src/components/Input/Input.jsx",
        "src/components/Navigation/Navigation.jsx",
        "src/components/Shoes/Shoes.jsx",
        "src/components/Top/Top.jsx",
      ],
      reportsDirectory: "./coverage",
    },
  },
});
