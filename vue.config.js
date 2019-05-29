module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
    }
  },
  pwa: {
    iconPaths: {
      favicon16: 'icons/16.png',
      favicon32: 'icons/32.png',
      msTileImage: 'icons/144.png',
      appleTouchIcon: 'icons/152.png',
      maskIcon: 'icons/safari-pinned-tab.svg'
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
}
