'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define('users', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: STRING(50),
    email: STRING(50),
    pno:INTEGER,
    department:STRING(20),
    pass: STRING(100),
    remember_token: (100),
    created_at: DATE,
    updated_at: DATE,
  });

  User.associate = function() {
    app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
//  app.model.User.hasMany(app.model.Appinfo, {as: 'app_info', foreignKey: 'uid'});
  };
  User.findByUser = function* (email) {
    return yield this.findOne({
      where: {email: email},
      attributes: ['id', 'username', 'email', 'pass']
    });
  };
  User.findByUserInfo = function* (id) {
    return yield this.findOne({
      where: {id: id},
      attributes: ['id', 'username', 'email', 'pno', 'department']
    });
  };
  User.findByPass = function* (id) {
    return yield this.findOne({
      where: {id: id},
      attributes: ['id', 'pass', 'username']
    });
  };
  return User;
};
