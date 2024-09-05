import { fileURLToPath, URL } from 'node:url'

import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
  const env = loadEnv(mode,process.cwd())
  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server:{
      proxy:{
        [env.VITE_APP_BASE_API]:{
          target:env.VITE_SERVE,
          changeOrigin:true,
        }
      }
    }
  }
})
