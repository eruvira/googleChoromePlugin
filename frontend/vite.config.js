import { resolve } from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { chromeExtension } from "vite-plugin-chrome-extension";
import ViteComponents from "vite-plugin-components";

import ViteIcons, { ViteIconsResolver } from "vite-plugin-icons";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "frontend")
    }
  },
  build: {
    rollupOptions: {
      input: "manifest.json",
      output: {
        manualChunks: {
          'group': [
            './src/views/Home.vue',
            './src/views/HelloWorld.vue'
          ],
        },
    },
    }
  },
  plugins: [
    vue(),
    ViteComponents({
      extensions: ["vue"],
      // auto import icons
      customComponentResolvers: [
        // https://github.com/antfu/vite-plugin-icons
        ViteIconsResolver({
          componentPrefix: ""
          // enabledCollections: ['carbon']
        })
      ]
    }),
    ViteIcons(),
    chromeExtension()
  ]
});