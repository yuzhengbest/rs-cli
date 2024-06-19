const { defineConfig } = require('@vue/cli-service');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
          // include: /node_modules/@stomp/
          include: resolve('node_modules/@stomp/stompjs/esm6'),
        },
      ],
    },
  },
  chainWebpack(config) {
    config.plugins.delete(`prefetch-index`).delete(`preload-index`);

    const scss = config.module.rule('scss').toConfig();
    const useable = { ...scss.oneOf[3], test: /\.useable.scss$/ };
    useable.use = [...useable.use];
    useable.use[0] = { loader: 'style-loader', options: { injectType: 'lazySingletonStyleTag' } };
    config.module.rule('scss').merge({ oneOf: [useable] });

    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
  productionSourceMap: false,
  devServer: {
    port: 3000,
    proxy: {},
  },
});
