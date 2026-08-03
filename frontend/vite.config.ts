import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@views': resolve(__dirname, './src/views'),
      '@stores': resolve(__dirname, './src/stores'),
      '@router': resolve(__dirname, './src/router'),
      '@composables': resolve(__dirname, './src/composables'),
      '@types': resolve(__dirname, './src/types'),
      '@utils': resolve(__dirname, './src/utils'),
      '@assets': resolve(__dirname, './src/assets'),
      '@layouts': resolve(__dirname, './src/layouts'),
    },
  },
  
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://php:9000',
        changeOrigin: true,
      },
    },
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia', 'axios'],
          utils: ['lodash-es', 'dayjs', '@vueuse/core'],
          ui: ['@headlessui/vue', '@heroicons/vue', 'nprogress'],
        },
      },
    },
  },
  
  css: {
    postcss: './postcss.config.js',
  },
  
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTL_PRODUCER__: false,
  },
  
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'axios',
      '@vueuse/core',
      '@headlessui/vue',
      '@heroicons/vue/20/solid',
      '@heroicons/vue/24/outline',
      'lodash-es',
      'dayjs',
    ],
  },
})
