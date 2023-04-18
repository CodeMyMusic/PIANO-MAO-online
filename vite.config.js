import { defineConfig, loadEnv, ConfigEnv } from "vite"
import pugPlugin from "vite-plugin-pug"
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  plugins: [pugPlugin(), injectHTML()],
  resolve: {
    alias: {
      '@' : process.cwd()
    }
  },
},   ({ command, mode }) => {
    // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV,
    },
  }
}, (_configEnv) => {
  return {
      server: {
          port: 3000,
          strictPort: true,
          hmr: {
               protocol: 'ws',
               host: 'localhost'
          },
      },
      base: './'    
  }})

