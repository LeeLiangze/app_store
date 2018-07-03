
// const cors = require('koa-cors');

module.exports = app => {
  app.get('/', 'client.index');

  // auth
  app.post('/appdist/login', 'user.login');
  app.get('/appdist/imgVerification','user.imgVerification');
  app.get('/success', 'user.success');

  // app.all('/user/grant', app.oauth.grant());
  // app.get('/user/check', app.oauth.authorise(), 'user.index');

  // upload
  app.post('/appdist/upload', 'uploadfile');

  // user
  app.get('/appdist/users', 'user.users');
  app.get('/appdist/users/:id', 'user.user');
  app.post('/appdist/logout', 'user.logout');
  app.post('/appdist/users', 'user.register');
  app.put('/appdist/users/:id', 'user.update');
  app.del('/appdist/users/:id', 'user.del');
  //登录后获取用户信息
  app.get('/appdist/userloginfo', 'user.userLogInfo');
 
  app.get('/appdist/getplist/:filename', 'appinfo.getPlist');
  // post
  app.get('/appdist/posts', 'post.posts');
  app.get('/appdist/posts/:id', 'post.post');
  app.post('/appdist/users/:user_id/posts', 'post.create');
  app.put('/appdist/users/:user_id/posts/:id', 'post.update');
  app.del('/appdist/users/:user_id/posts/:id', 'post.del');

  //appinfo
  //基本信息-基本信息展示
  app.get('/appdist/app/:id', 'appinfo.find');
  //我的主页-app列表
  app.get('/appdist/app/findbyuid', 'appinfo.findByUid');
  //我的主页-删除app应用
  app.del('/appdist/app/appdel/:id', 'appinfo.del'); 
  //查询app版本列表
  app.get('/appdist/applist/:bundleid', 'appinfo.getAppList');
  //修改App信息
  app.post('/appdist/appinfoedit/:id', 'appinfo.editAppInfo');
  //上传后增加App信息
  app.post('/appdist/addappinfo', 'appinfo.addinfo');
  
  //downloads
  app.get('/appdist/getappinfo/:id', 'appinfo.getAppinfo');
  app.post('/appdist/downloads/add', 'downloads.add');
  app.get('/appdist/downloads/:id', 'downloads.find');
  app.get('/appdist/downloads/lateldownloas/:id/:days', 'downloads.latelyDownloads');
  app.get('/appdist/downloads/dailyDownloads/:id/:day', 'downloads.dailyDownloads');
  //userCenter
  app.get('/appdist/userCenter/:id', 'user.userInfo');
  app.put('/appdist/userUpdate', 'user.userUpdate');
  app.put('/appdist/passUpdate', 'user.passUpdate');
};