const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/Mihael-Tin-banda.github.io/' : '/',
  outputDir: 'dist',
  devServer: {
    historyApiFallback: true,
  },
  chainWebpack: config => {
    config.module
      .rule('txt')
      .test(/\.txt$/)
      .use('raw-loader')
        .loader('raw-loader')
        .end();
  },
});