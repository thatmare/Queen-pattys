import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ registerType: "autoUpdate", 
    injectRegister: "auto", 
    manifest:{
      theme_color: "#1D2939",
      icons: [
        {
          src: "icon1024x1024.png",
          sizes: "1024x1024",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon521x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon384x384.png",
          sizes: "384x384",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon256x256.png",
          sizes: "256x256",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-20.png",
          sizes: "20x20",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon.png",
          sizes: "57x57",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-20@2x.png",
          sizes: "40x40",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-20@3x.png",
          sizes: "60x60",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-29.png",
          sizes: "29x29",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-29@2x.png",
          sizes: "58x58",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-29@3x.png",
          sizes: "87x87",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-40.png",
          sizes: "40x40",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-40@2x.png",
          sizes: "80x80",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-40@3x.png",
          sizes: "120x120",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-50.png",
          sizes: "50x50",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-50@2x.png",
          sizes: "100x100",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-50@3x.png",
          sizes: "150x150",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-57.png",
          sizes: "57x57",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-57@2x.png",
          sizes: "114x114",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-57@3x.png",
          sizes: "171x171",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-60.png",
          sizes: "60x60",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-60@2x.png",
          sizes: "120x120",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-60@3x.png",
          sizes: "180x180",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-72.png",
          sizes: "72x72",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-72@2x.png",
          sizes: "144x144",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-72@3x.png",
          sizes: "216x216",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-76.png",
          sizes: "76x76",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-76@2x.png",
          sizes: "152x152",
          type: "image/png",
          purpose:"any maskable"
        },
        {
          src: "icon-76@3x.png",
          sizes: "228x228",
          type: "image/png",
          purpose:"any maskable"
        }
      ]
    } }),
  ],
});
