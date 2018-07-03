module.exports = {
	// 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
	alias: {
		// 'handlebars': 'handlebars/dist/handlebars.js',
		'handlebars/handlebars.runtime': 'handlebars/runtime',
		'jquery-ui/ui/widget': 'blueimp-file-upload/js/vendor/jquery.ui.widget.js'
	},

	// 当require的模块找不到时，尝试添加这些后缀后进行寻找
	extensions: ['.ts', '.js']
};
