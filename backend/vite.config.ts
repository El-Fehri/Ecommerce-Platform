import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.js', 'resources/css/app.css'],
      refresh: true,
    }),
    vue(),
  ],
  
  resolve: {
    alias: {
      '@': resolve(__dirname, 'resources/js'),
      '@components': resolve(__dirname, 'resources/js/components'),
      '@views': resolve(__dirname, 'resources/js/views'),
      '@stores': resolve(__dirname, 'resources/js/stores'),
      '@router': resolve(__dirname, 'resources/js/router'),
      '@composables': resolve(__dirname, 'resources/js/composables'),
      '@types': resolve(__dirname, 'resources/js/types'),
      '@utils': resolve(__dirname, 'resources/js/utils'),
      '@assets': resolve(__dirname, 'resources/js/assets'),
      '@layouts': resolve(__dirname, 'resources/js/layouts'),
    },
  },
  
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      host: 'localhost',
    },
  },
  
  build: {
    outDir: 'public/build',
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
});
