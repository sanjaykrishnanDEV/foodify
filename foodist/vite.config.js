import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "test-fiw",
    project: "javascript-react"
  })],

  server: {
    proxy: {
      "/api": "localhost:8080",
    },
  },

  build: {
    sourcemap: true
  }
});
