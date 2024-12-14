import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/properties": {
        target: "https://fake-api-listings.vercel.app",
        changeOrigin: true,
      },
    },
  },
});
