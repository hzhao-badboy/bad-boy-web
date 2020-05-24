const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: './',
  // gzip 配置
  configureWebpack: config => {
    return {
      plugins: [new CompressionWebpackPlugin({
        test: /\.js$|\.html$|\.css/, // 匹配文件名
        threshold: 1024, // 文件压缩阈值，对超过1k的进行压缩
        deleteOriginalAssets: false // 是否删除源文件
      })]
    };
  }
};
