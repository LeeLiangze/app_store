module.exports = () => {
    return function* (next) {
        yield next;
        if (this.status === 500 ) {
            this.ctx.body = yield this.ctx.renderView('500.html')
        }
    };
};