module.exports = function (api) {
    api.cache(true)
    return {
      sourceType: 'unambiguous', // 解决错误：ES Modules may not assign module.exports or exports.*, Use ESM export syntax
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime']
    }
  }
  