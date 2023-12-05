import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import vitePlugin from "vite-plugin-react-js-support";
import removeConsole from "vite-plugin-remove-console";

// https://vitejs.dev/config/
// export default defineConfig({
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: "/",
    define: {
      "process.env": { ...env },
    },
    resolve: {
      alias: {
        pages: path.resolve(__dirname, "./src/pages"),
        components: path.resolve(__dirname, "./src/components"),
        contexts: path.resolve(__dirname, "./src/contexts"),
        enums: path.resolve(__dirname, "./src/enums"),
        utils: path.resolve(__dirname, "./src/utils"),
      },
    },
    esbuild: {
      loader: "jsx",
      include: [
        "src/*.jsx",
        "src/**/*.jsx",
        "node_modules/**/*.jsx",
        "src/*.js",
        "src/**/*.js",
        "node_modules/**/*.js",
      ],
    },
    plugins: [
      react(),
      vitePlugin([], { jsxInject: true }),
      removeConsole({ includes: ["log", "warn", "clear", "info", "error"] }),
    ],
    build: {
      outDir: "build",
    },
  };
});
