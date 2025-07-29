import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    outDir: "dist",
  },
  base: "/",
  plugins: [react()],
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});
