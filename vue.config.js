module.exports = {
  // publicPath: './',
  // devServer: {
  //   proxy: 'http://localhost:3000'
  // },
  devServer: {
    disableHostCheck: true,
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "./src/assets/style/mixin.scss";`
      }
    }
  }
}