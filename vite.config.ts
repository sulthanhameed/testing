import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  root: __dirname,
  base: "./",
  publicDir: false,
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
    target: "es2020",
    cssMinify: true,
    minify: "esbuild",
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
    },
  },
  // Don't fail the build on warnings
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
