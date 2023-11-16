import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import removeConsole from "vite-plugin-remove-console";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/portfolio/",
  plugins: [
    react(),
    removeConsole({ includes: ["log", "warn", "clear", "info", "error"] }),
  ],
  build: {
    outDir: "build",
  },
});
