import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "images/**/*"],
      manifest: {
        name: "Weather App",
        short_name: "Weather",
        description: "Aplicación meteorológica progresiva",
        theme_color: "#1e90ff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/images/Logo_192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/images/Logo_512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    }) 
  ]
});
