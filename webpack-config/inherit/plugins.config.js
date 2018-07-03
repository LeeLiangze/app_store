const webpack = require('webpack');
const configPlugins = [
	/* 全局shimming */
	new webpack.ProvidePlugin({
		$: 'jquery',
		jQuery: 'jquery',
		'window.jQuery': 'jquery',
		'window.$': 'jquery'
	}),
	/* 抽取出所有通用的部分 */
	new webpack.optimize.CommonsChunkPlugin({
		name: 'common',      // 需要注意的是，chunk的name不能相同！！！
		filename: 'public/js/[name].js',
		minChunks: function (module, count) {
			return count > 5 || (/@cmos\\web|cmos-web|handlebars/).test(module.resource);
		}
	})
];

module.exports = configPlugins;