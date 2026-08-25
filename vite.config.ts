import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  base: "./",
  server: {
    port: 5173,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(root, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
