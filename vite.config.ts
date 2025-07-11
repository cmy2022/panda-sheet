import { univerPlugin } from '@univerjs/vite-plugin'
import { defineConfig, loadEnv } from 'vite'
import packageJson from './package.json'

export default ({ mode }) => {
  // eslint-disable-next-line node/prefer-global/process
  const env = loadEnv(mode, process.cwd(), '')
  return defineConfig({
    server: {
      port: 5173,
      cors: true,
      proxy: {
        '/kpi': {
          target: 'http://localhost:8980',
          changeOrigin: true,
          rewrite: path => path,
        },
        '/universer-api': {
          target: 'http://localhost:8980',
          changeOrigin: true,
          rewrite: path => path,
        },
      },
    },
    plugins: [
      univerPlugin(),
    ],
    define: {
      'process.env.UNIVER_CLIENT_LICENSE': `"${env.UNIVER_CLIENT_LICENSE}"` || '"%%UNIVER_CLIENT_LICENSE_PLACEHOLDER%%"',
      'process.env.UNIVER_VERSION': `"${packageJson.dependencies['@univerjs/presets']}"`,
    },
  })
}
