import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy' // 低版本浏览器不支持 vite ,此插件是为了兼容低版本浏览器
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]'
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  css: {
    devSourcemap: true, // 开发过程中是否启用sourcemap
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com', // 代理的目标地址
        changeOrigin: true, // 代理服务会把 origin 修改为目标地址 http://jsonplaceholder.typicode.com
        rewrite: (path) => path.replace(/^\/api/, '') // 重写目标路径
      }
    }
  }
})
