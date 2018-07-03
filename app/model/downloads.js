'use strict';

module.exports = app => {
	const {
		STRING,
		INTEGER,
		DATE,
		NOW
	} = app.Sequelize;
	//定义模型，告诉Sequelize如何映射数据库表，可以理解为每个属性对应一个表的字段：
	const DownLoads = app.model.define('app_download_detail', {
		id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		ip: STRING(100),
		proname:STRING(20),
		proid: INTEGER(11),
		appid: INTEGER(11),
		download_at:{ type: DATE, defaultValue: NOW },
	}, {
		timestamps: false
	});

	DownLoads.associate = function() {
		//在源模型中插入关联键，同时源模型增加getAppinfo、setAppinfo、createAppinfo方法
		//在源模型添加外键appid
		app.model.Downloads.belongsTo(app.model.Appinfo, {
			as: 'appinfo',
			foreignKey: 'appid'
		})
	};

	return DownLoads;
}