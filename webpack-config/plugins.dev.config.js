const webpack = require('webpack');
const pluginsConfig = require('./inherit/plugins.config.js');

pluginsConfig.push(new webpack.DefinePlugin({
  __DEV__: true,
  __PRODUCT__: false
}));

module.exports = pluginsConfig;
