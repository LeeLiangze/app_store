const addAppTpl = require('./addApp.tpl');


module.exports = function(v:any) {
    if ( ! v) {return "";}
    return addAppTpl(v);
};