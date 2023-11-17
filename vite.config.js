import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import removeConsole from "vite-plugin-remove-console";

const paths = {
  "@components": ["./src/components"],
  "@contexts": ["./src/contexts"],
  "@constants": ["./src/constants"],
};

// https://vitejs.dev/config/
export default defineConfig({
  base: "/portfolio/",
  resolve: {
    alias: Object.entries(paths).map(([k, v]) => {
      return {
        find: k.replace(/^@/, ""),
        replacement: v[0].replace(/^\./, ""),
      };
    }),
  },
  plugins: [
    react(),
    removeConsole({ includes: ["log", "warn", "clear", "info", "error"] }),
  ],
  build: {
    outDir: "build",
  },
});
