const {
  override,
  fixBabelImports,
  overrideDevServer,
  addBabelPlugin,
  watchAll,
  useEslintRc,
} = require('customize-cra')
const path = require('path')

// const rewireLess = require('react-app-rewire-less')

module.exports = {
  webpack: override(
    //useEslintRc(path.resolve(__dirname, '.eslintrc')),
    // eslint-disable-next-line no-param-reassign
    addBabelPlugin('@babel/plugin-proposal-optional-chaining'),
    // eslint-disable-next-line no-param-reassign
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),

    // eslint-disable-next-line no-param-reassign
    // config = rewireLess.withLoaderOptions({
    //   modifyVars: { '@primary-color': '#439F46' },
    //   javascriptEnabled: true,
    // })(config, env)
    // return config
  ),
  devServer: overrideDevServer(config => ({
    ...config,
    proxy: {
      '/api': {
        target: process.env.REACT_APP_SOLVER_API,
        changeOrigin: true,
        secure: false
      },
      '/event': {
        target: process.env.REACT_APP_SOLVER_API,
        changeOrigin: true,
        secure: false
      }
    },

    compress: false

  }), watchAll()),
}
