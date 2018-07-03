const glob = require('glob');
const path = require('path');

const pageDir = path.resolve(process.cwd(), 'pages');
const globInstance = glob.sync(pageDir + '/*.html');

module.exports = globInstance;