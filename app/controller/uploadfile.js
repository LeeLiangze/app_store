

const fs = require('fs-extra');
const path = require('path');
const apkParser3 = require("cmos-apkparser");
const extract = require('ipa-extract-info');
const sendToWormhole = require('stream-wormhole');
const uuidV4 = require('uuid/v4');
const AdmZip = require("adm-zip");
require('shelljs/global');
let iconsDir;

module.exports = function* () {
  const stream = yield this.getFileStream();
  const saveFileName = new Date().getTime() + stream.filename;
  iconsDir = this.app.config.baseDir + "/app/public/uploads/icon";
  let filepath = path.join(this.app.config.baseDir, `app/public/uploads/${saveFileName}`);
  if (stream.fields.title === 'mock-error') {
    filepath = path.join(this.app.config.baseDir, `app/public/uploads/not-exists/dir/${saveFileName}`);
  } else if (stream.fields.title === 'mock-read-error') {
    filepath = path.join(this.app.config.baseDir, `app/public/uploads/read-error-${saveFileName}`);
  }
  this.logger.warn('Saving %s to %s', stream.filename, filepath);
  let appInfo = {};
  try {
    appInfo = yield saveStream(stream, filepath).then(function(){
       return parseApp(filepath,err => {
            console.info(err);
        });
    });
    appInfo["packagename"] = saveFileName;
    appInfo["size"] = yield getAppSize(filepath);
    appInfo["packageurl"]=saveFileName;
  } catch (err) {
    throw err;
  }
  this.body = {
    returnCode: 0,
    returnMessage: 'App上传解析成功',
    bean: appInfo
  }
};

/** 格式化输入字符串**/

//用法: "hello{0}".format('world')；返回'hello world'

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/\{(\d+)\}/g, function(s, i) {
      return args[i];
  });
}

function getAppSize(filepath){
    return new Promise((resolve, reject)=>{
        fs.stat(filepath, function(err, stats) {
            if (err) { reject(err);}
            let size = stats.size/1e6;
           resolve(size);
        })
    })
} 

function parseIpa(filename) {
  return new Promise(function(resolve, reject) {
      var fd = fs.openSync(filename, 'r');
      extract(fd, function(err, info, raw) {
          if (err) reject(err);
          var data = info[0];
          var info = {}
          info["platform"] = "ios"
          info["build"] = data.CFBundleVersion,
              info["bundleid"] = data.CFBundleIdentifier,
              info["version"] = data.CFBundleShortVersionString,
              info["appname"] = data.CFBundleName
          resolve(info)
      });
  });
}

function parseApk(filename) {
  return new Promise(function(resolve, reject) {
      apkParser3(filename, function(err, data) {
          var package = parseText(data.package)
          var info = {
              "appname": data["application-label"].replace(/'/g, ""),
              "build": package.versionCode,
              "bundleid": package.name,
              "version": package.versionName,
              "platform": "android"
          }
          resolve(info)
      });
  });
}

function parseApp(filePath,callback, errorCallback) {
  return new Promise((resolve, reject) => {
    let guid = uuidV4();
    let parse, extract
    if (path.extname(filePath) === ".ipa") {
        parse = parseIpa
        extract = extractIpaIcon
    } else if (path.extname(filePath) === ".apk") {
        parse = parseApk
        extract = extractApkIcon
    } else {
        errorCallback("params error")
        return;
    }
    Promise.all([parse(filePath), extract(filePath, guid)]).then(values => { 
      let info = values[0]
      info["iconurl"] = values[1].dir
      resolve(info)
    }, reason => {
      reject(reason);
    })
  });
}

function parseText(text) {
  var regx = /(\w+)='([\w\.\d]+)'/g
  var match = null,
      result = {}
  while (match = regx.exec(text)) {
      result[match[1]] = match[2]
  }
  return result
}

function saveStream(stream, filepath) {
  return new Promise((resolve, reject) => {
    if (filepath.indexOf('/read-error-') > 0) {
        stream.once('readable', () => {
        const buf = stream.read(10240);
        console.log('read %d bytes', buf.length);
        setTimeout(() => {
            reject(new Error('mock read error'));
        }, 1000);
        });
    } else {
        const ws = fs.createWriteStream(filepath);
        stream.pipe(ws);
        ws.on('error',reject);
        ws.on('finish',resolve);
    }
  });
}

function extractApkIcon(filename, guid) {
  return new Promise(function(resolve, reject) {
      apkParser3(filename, function(err, data) {
          var iconPath = false;
          [640, 320, 240, 160].every(i => {
              if (typeof data["application-icon-" + i] !== 'undefined') {
                  iconPath = data["application-icon-" + i];
                  return false;
              }
              return true;
          });
          if (!iconPath) {
              reject("can not find icon ");
          }

          iconPath = iconPath.replace(/'/g, "")
          var iconUrl = "/{0}.png".format(guid)
          var tmpOut = iconsDir + iconUrl
          var zip = new AdmZip(filename);
          var ipaEntries = zip.getEntries();
          var found = false
          ipaEntries.forEach(function(ipaEntry) {
              if (ipaEntry.entryName.indexOf(iconPath) != -1) {
                  var buffer = new Buffer(ipaEntry.getData());
                  if (buffer.length) {
                      found = true
                      fs.writeFile(tmpOut, buffer, function(err) {
                          if (err) {
                              reject(err)
                          }
                          resolve({ "success": true,"dir":"/uploads/icon"+iconUrl })
                      })
                  }
              }
          })
          if (!found) {
              reject("can not find icon ")
          }
      });
  })
}

function extractIpaIcon(filename, guid) {
  return new Promise(function(resolve, reject) {
      var iconUrl = "/{0}.png".format(guid)
      var tmpOut = iconsDir + iconUrl
      var zip = new AdmZip(filename);
      var ipaEntries = zip.getEntries();
      var exeName = '';
      if (process.platform == 'darwin') {
          exeName = 'pngdefry-osx';
      } else {
          exeName = 'pngdefry-linux';
      }
      var found = false;
      ipaEntries.forEach(function(ipaEntry) {
          if (ipaEntry.entryName.indexOf('AppIcon60x60@2x.png') != -1) {
              found = true;
              var buffer = new Buffer(ipaEntry.getData());
              if (buffer.length) {
                  fs.writeFile(tmpOut, buffer, function(err) {
                      if (err) {
                          reject(err)
                      } else {
                          var execResult = exec(path.join(__dirname, 'upload/bin', exeName + ' -s _tmp ') + ' ' + tmpOut)
                          if (execResult.stdout.indexOf('not an -iphone crushed PNG file') != -1) {
                              resolve({ "success": true,"dir":"/uploads/icon"+iconUrl })
                          } else {
                              fs.remove(tmpOut, function(err) {
                                  if (err) {
                                      reject(err)
                                  } else {
                                      var tmp_path = iconsDir + "/{0}_tmp.png".format(guid)
                                      fs.rename(tmp_path, tmpOut, function(err) {
                                          if (err) {
                                              reject(err)
                                          } else {
                                              resolve({ "success": true,"dir":"/uploads/icon"+iconUrl })
                                          }
                                      })
                                  }
                              })
                          }
                      }
                  })
              }
          }
      })
      if (!found) {
          reject("can not find icon ")
      }
  })
}
