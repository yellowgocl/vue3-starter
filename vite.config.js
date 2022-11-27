import { fileURLToPath, URL } from 'node:url'
import * as path from 'path'
import { viteVConsole } from 'vite-plugin-vconsole';
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

const PROD_MAP = ['production']

// https://vitejs.dev/config/
export default ({ mode }) => {
  const isProd = PROD_MAP.some(v => v === mode) 
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [
      vue(),
      viteVConsole({
        entry: path.resolve('src/main.js'),
        localEnabled: true,
        enabled: !isProd,
        config: {
          maxLogNumber: 1000,
          theme: 'dark'
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      minify: 'terser',
      terserOptions: {
          compress: {
              drop_console: true,
              drop_debugger: true,
          },
      },
    },
  })
}
