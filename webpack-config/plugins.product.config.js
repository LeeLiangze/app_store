const webpack = require('webpack');
const pluginsConfig = require('./inherit/plugins.config.js');

/* webpack1下，用了压缩插件会导致所有loader添加min配置，而autoprefixser也被定格到某个browers配置 */
// pluginsConfig.push(new webpack.optimize.UglifyJsPlugin({
//   compress: {
//     warnings: false,
//   },
// }));

pluginsConfig.push(new webpack.DefinePlugin({
  __DEV__: false,
  __PRODUCT__: true
}));

pluginsConfig.push(new webpack.NoEmitOnErrorsPlugin()); // 配合CLI的--bail，一出error就终止webpack的编译进程

module.exports = pluginsConfig;
