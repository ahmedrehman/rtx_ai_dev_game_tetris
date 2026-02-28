import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  root: "src/client",
  publicDir: "../../public",
  build: {
    outDir: "../../dist/client",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/client/index.html"),
        modern: resolve(__dirname, "src/client/modern/index.html"),
      },
    },
  },
  server: {
    port: 3131,
    proxy: {
      "/api": "http://localhost:3131",
    },
  },
});
