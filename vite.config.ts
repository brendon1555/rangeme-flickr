/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy the requests to the Flickr API as Flickr does not support CORS
      "/images": {
        target: "https://api.flickr.com/services/feeds/photos_public.gne",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/images/, ""),
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/setup.ts",
  },
});
