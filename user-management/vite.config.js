import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  // 用于配置模块解析
  resolve: {
    // 别名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
