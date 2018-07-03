const headerTpl = require('./header.tpl');

module.exports = function(v:any) {
    if ( ! v) {return "";}
    return headerTpl(v);
};