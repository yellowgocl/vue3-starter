import path from 'path'

export const PROJECT_ROOT = path.resolve(process.cwd())
export const PROJECT_SRC = path.resolve(PROJECT_ROOT, 'src')
export const PROJECT_VIEWS = path.resolve(PROJECT_SRC, 'views')
export const PROJECT_SERVICES = path.resolve(PROJECT_SRC, 'services')

export const OUTPUT_DIR = 'dist'

export const PROXY_CONFIG = {
  '/api': {
    target: 'http://localhost:3000',
    changeOrigin: true,
    rewrite: (path) => path.replace(new RegExp('^/api'), ''),
  },
}
