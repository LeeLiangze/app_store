const path = require('path');
const jsArr = require('./base/js-entries.config.js');
const pageArr = require('./base/page-entries.config');
const configEntry = {};

//根据页面路径查找打包js入口路径
pageArr.map((pagePath) => {
	return path.parse(pagePath).name;
}).reduce((pre, pname) => {
	jsArr.some((jpath) => {
		if (path.parse(jpath).name === pname) {
			pre[pname] = jpath;
			return true;
		} else {
			return false;
		}
	});
	return configEntry;
}, configEntry);

// console.log('=====js=====', configEntry);
module.exports = configEntry;
