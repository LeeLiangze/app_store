'use strict';

const fs = require('fs');

// npm run dev DO NOT read this file
require('cmos').startCluster({
  baseDir: __dirname,
  port: 7001,
  https: true,
  key: 'server.key',
  cert: 'server.crt',
  // passphrase: 'appdist'
});