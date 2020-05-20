const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  publicPath: './',
  devServer: { // 配置开发服务器
    host: "0.0.0.0",
    hot: true, // 是否启用热加载，就是每次更新代码，是否需要重新刷新浏览器才能看到新代码效果
    port: "9999", // 服务启动端口
    open: true, // 是否自动打开浏览器默认为false
    proxy: { // 配置http代理
      "/api": { // 如果ajax请求的地址是https://api.yuming.com/api1那么你就可以在jajx中使用/@url/api1路径,其请求路径会解析
        // https://api.yuming.com/@url/api1，当然你在浏览器上开到的还是http://localhost:8080/@url/api1;
        // target: "http://back.bad-boy.xyz",
        target: "http://localhost:8088",
        changeOrigin: true, // 是否允许跨域，这里是在开发环境会起作用，但在生产环境下，还是由后台去处理，所以不必太在意
        pathRewrite: {
          "/@url": "" // 把解析出来的接口地址中的多出来的@url替换成空字符，其目的就是去掉多余的它，不然地址上多了一个@url时无法正确访问的。
          // 当然如果你的接口地址上本来就有@url，解析之后认识争取的
        }
      }
    }
  },
  chainWebpack: config => {
    // 清除css，js版本号
    config.output.filename('js/[name].js').end();
    config.output.chunkFilename('js/[name].js').end();
    // 为生产环境修改配置...
    config.plugin('extract-css').tap(args => [{
      filename: `css/[name].css`,
      chunkFilename: `css/[name].css`
    }]);
  },
  // gzip 配置
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产环境
      return {
        plugins: [new CompressionWebpackPlugin({
          test: /\.js$|\.html$|\.css/, // 匹配文件名
          threshold: 1024, // 文件压缩阈值，对超过10k的进行压缩
          deleteOriginalAssets: false // 是否删除源文件
        })]
      };
    }
  }
};
