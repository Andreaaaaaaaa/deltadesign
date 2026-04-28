const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  pages: {
    index: {
      entry: 'src/index.ts',
      // template: 'public/index.html',
      // filename: 'index.html',
    },
  },
  transpileDependencies: true,
  // 强制内联CSS
  css: {
    extract: false,
  },
  chainWebpack: (config) => {
    config.resolve.extensions.add('ts');
  },
});
