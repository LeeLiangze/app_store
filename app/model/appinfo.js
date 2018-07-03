'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  //定义模型，告诉Sequelize如何映射数据库表，可以理解为每个属性对应一个表的字段：
  const AppInfo = app.model.define('app_info', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    uid: INTEGER(20),
    appname: STRING(20),
    bundleid: STRING(20),
    iconurl: STRING(120),
    version: STRING(20),
    platform: STRING(20),
    packtype: STRING(20),
    downurl: STRING(20),
    apkurl: STRING(255),
    ipaurl: STRING(255),
    size: STRING(10),
    qrcode: STRING(120),
    description: STRING,
    created_at: DATE,
    updated_at: DATE,
    packagename: INTEGER(100),
    build: INTEGER(20),
  });


  AppInfo.findByBundleId = function* (bundleid,uid) {
    return yield this.findAll({
        where: { bundleid: bundleid, uid: uid },
        order: [[this.sequelize.col('id'), 'desc']]
    })
  };

  AppInfo.associate = function () {
    //Appinfo是源模型，User是目标模型
    //belongsTo会向源模型中插入关联键,外键存在于源模型
    app.model.Appinfo.belongsTo(app.model.User, { as: 'user', foreignKey: 'uid' });
    //创建当前模型（源）到目标模型之间的关系，外键会被添加到目标模型中。
    app.model.Appinfo.hasMany(app.model.Downloads, { foreignKey: 'id' });
  };
  AppInfo.findByUid = function* (uid) {
    return yield this.findAll({
      where: { uid: uid },
    })
  };
  // AppInfo.findByUidAndId = function* (uid,id) {
  //   return yield this.findAll({
  //     where: { 
  //       uid: uid,
  //       id: id 
  //     },
  //   })
  // };
  return AppInfo;
};
