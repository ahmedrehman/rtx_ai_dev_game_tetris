import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  root: "src/client",
  publicDir: "../../public",
  build: {
    outDir: "../../dist/client",
    emptyOutDir: true,
  },
  server: {
    port: 3131,
    proxy: {
      "/api": "http://localhost:3131",
    },
  },
});
