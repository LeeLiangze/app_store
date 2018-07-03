
var webDate = require('@cmos/web/date');
var DateObj = webDate["default"];

module.exports = function(v) {
	if ( ! v) {return "";}
	return new DateObj(v).format('YYYY-MM-DD hh:mm:ss');
};