const ExtractTextPlugin = require('extract-text-webpack-plugin');

const moduleConfig = require('./inherit/module.config.js');

moduleConfig.loaders.push({
  test: /\.css$/,
  exclude: /node_modules/,
  loader: ExtractTextPlugin.extract('css?minimize'),
});

module.exports = moduleConfig;
