import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 改回 0.0.0.0 以允许所有网络接口访问
    port: 4000,
    strictPort: true,
    open: false, // 关闭自动打开浏览器
    cors: true,
    hmr: {
      host: '0.0.0.0', // 热更新也允许所有网络接口
      port: 4000
    },
    proxy: {
      // 配置代理
      '/api': {
        target: 'http://localhost:5174',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
