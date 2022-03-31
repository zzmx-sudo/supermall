module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "http://119.91.232.180:8920",
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
}