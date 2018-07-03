const path = require('path');
const moduleExports = {};

// 源文件目录
moduleExports.staticRootDir = path.resolve(__dirname, '../../'); // 项目根目录
moduleExports.pagesDir = path.resolve(moduleExports.staticRootDir, './pages'); // 存放各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等
moduleExports.jsDir = path.resolve(moduleExports.staticRootDir, './src'); //存放js

// 生成文件目录
moduleExports.buildDir = path.resolve(moduleExports.staticRootDir, './app'); // 存放编译后生成的所有代码、资源（图片、字体等，虽然只是简单的从源目录迁移过来）

module.exports = moduleExports;
