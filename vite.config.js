import { defineConfig, loadEnv } from 'vite'
import { createVitePlugins } from './build/plugin'
import {
  OUTPUT_DIR,
  PROJECT_ROOT,
  PROJECT_SERVICES,
  PROJECT_SRC,
  PROJECT_VIEWS,
  PROXY_CONFIG,
} from './build/constants'
import { convertEnv } from './build/utils'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = convertEnv(loadEnv(mode, PROJECT_ROOT))
  const { VITE_BASE_API, VITE_PORT, VITE_USE_PROXY } = env
  const isBuild = command === 'build'
  return {
    plugins: createVitePlugins(env, isBuild),
    resolve: {
      alias: {
        '~': PROJECT_ROOT,
        '@': PROJECT_SRC,
        '@views': PROJECT_VIEWS,
        '@services': PROJECT_SERVICES,
      },
    },
    server: {
      host: '0.0.0.0',
      port: VITE_PORT,
      open: false,
      proxy: VITE_USE_PROXY
        ? {
            [VITE_BASE_API]: PROXY_CONFIG[VITE_BASE_API],
          }
        : undefined,
    },
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR || 'dist',
      reportCompressedSize: false, // 启用/禁用 gzip 压缩大小报告
      chunkSizeWarningLimit: 1024, // chunk 大小警告的限制（单位kb）
    },
  }
})
