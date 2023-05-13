import { defineConfig } from "vite";
import { esbuildCommonjs, viteCommonjs } from "@originjs/vite-plugin-commonjs";
import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteCommonjs(),
    react({
      babel: {
        plugins: [
          "react-native-web",
          "react-native-paper/babel",
          "@babel/plugin-proposal-export-namespace-from",
          "react-native-reanimated/plugin",
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-object-rest-spread",
        ],
        //presets: ["@babel/preset-react"],
      },
    }),
  ],
  optimizeDeps: {
    esbuildOptions: {
      mainFields: ["module", "main"],
      resolveExtensions: [".web.js", ".js", ".ts"],
      plugins: [esbuildCommonjs(["react-native-reanimated"])],
      loader: {
        ".js": "jsx",
      },
    },
  },
  resolve: {
    extensions: [".web.tsx", ".web.jsx", ".web.js", ".tsx", ".ts", ".js"],
    alias: {
      "react-native": "react-native-web",
    },
  },
  define: {
    // Some libraries use the global object, even though it doesn't exist in the browser.
    // Alternatively, we could add `<script>window.global = window;</script>` to index.html.
    // https://github.com/vitejs/vite/discussions/5912
    global: "window",
  },
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  esbuild: {
    loader: "tsx",
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ["VITE_", "TAURI_"],
  build: {
    // Tauri supports es2021
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,

    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
