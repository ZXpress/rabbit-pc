const path = require('path')

module.exports = {
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    }
  },

  lintOnSave: false,

  // 使用vuecli的style-resoures-loader插件来完成自动注入到每个less文件或者vue组件中style标签中。
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 需要哪些文件自动引入,使用绝对路径
      // 需要使用path.join来拼接完整路径
      patterns: [
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  }
}
