const path = require('path');
module.exports = {
	loaders: [
		{
			test: /\.ts$/,
			loader: 'ts-loader',
			options: {
				transpileOnly: true
			}
		},
		{
			test: /\.tpl$/,
			loader: 'handlebars-loader?runtime=handlebars/runtime'
		},
		{
			test: /\.json$/,
			loader: 'json-loader'
		},
		{
			// 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
			// 将小于8192byte的图片转成base64码
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=8192&name=public/img/[name].[ext]'
		},
		{
			// 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
			test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
			loader: 'file-loader?name=public/css/fonts/[name].[ext]'
		}
	]
};
