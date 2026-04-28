import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import fs from 'fs';
// import dts from './plugins/dts';
// import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus';

export default defineConfig({
  resolve: {
    alias: {
      // /@/xxxx => src/xxxx
      '@': 'src/',
    },
  },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    cssCodeSplit: true,
    minify: true,
    assetsDir: './assets',
    lib: {
      entry: './src/index.ts',
      name: 'DeltaUI',
      fileName: (format: string) => `delta-ui.${format}.js`,
    },
    rollupOptions: {
      // 确保外部化处理那些想打包进库的依赖
      external: ['vue'],
      output: {
        exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  plugins: [
    vue(),
    dts({
      skipDiagnostics: false,
      logDiagnostics: true,
    }),
  ],
});
