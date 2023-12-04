import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import removeConsole from "vite-plugin-remove-console";
import jsonPathConfig from "./jsconfig.paths.json";
import vitePlugin from "vite-plugin-react-js-support";
import path from "path";

// https://vitejs.dev/config/
// export default defineConfig({
export default defineConfig(({ mode }) => {
  return {
    base: "/",
    // resolve: {
    //   alias: Object.entries(jsonPathConfig.compilerOptions.paths).map(
    //     ([k, v]) => {
    //       return {
    //         find: k,
    //         replacement: v[0].replace(/^\./, ""),
    //       };
    //     }
    //   ),
    // },

    resolve: {
      alias: {
        "@pages": path.resolve(__dirname, "./src/pages"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@contexts": path.resolve(__dirname, "./src/contexts"),
        "@constants": path.resolve(__dirname, "./src/constants"),
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
