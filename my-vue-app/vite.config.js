import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData:  `@import "${path.resolve(__dirname, 'src/index.less')}";`
       }
      }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "components": path.resolve(__dirname, "src/components"),
      "styles": path.resolve(__dirname, "src/styles"),
      "plugins": path.resolve(__dirname, "src/plugins"),
      "views": path.resolve(__dirname, "src/views"),
      "layouts": path.resolve(__dirname, "src/layouts"),
      "utils": path.resolve(__dirname, "src/utils"),
      "apis": path.resolve(__dirname, "src/apis"),
      "dirs": path.resolve(__dirname, "src/directives"),
    },
  },
  devServer: {
    port: 7070,
    proxy: {
      '/api': {
        target: 'http://localhost:3030',
        changeOrigin: true,
        ws: true,  // 这一行很关键  表示是否开启  websocket
        secure: true,
        pathRewrite: {
          '^/api': '/',
        },
      },
    },
  },
  plugins: [vue()],

})
