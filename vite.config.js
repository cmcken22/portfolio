import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import removeConsole from "vite-plugin-remove-console";
import jsonPathConfig from "./jsconfig.paths.json";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/portfolio/",
  resolve: {
    alias: Object.entries(jsonPathConfig.compilerOptions.paths).map(
      ([k, v]) => {
        return {
          find: k,
          replacement: v[0].replace(/^\./, ""),
        };
      }
    ),
  },
  plugins: [
    react(),
    removeConsole({ includes: ["log", "warn", "clear", "info", "error"] }),
  ],
  build: {
    outDir: "build",
  },
});
