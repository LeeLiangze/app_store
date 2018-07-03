const glob = require('glob');
const path = require('path');

const tsDir = path.resolve(process.cwd(), './src'); // 项目Ts文件目录
const globInstance = glob.sync(tsDir + '/*.ts');
module.exports = globInstance;