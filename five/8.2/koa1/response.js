const response = {
    _body: '',  // 意味着不希望别人访问到
    get body() {
        console.log('----1----', this._body);
        return this._body;
    },
    set body(val) {
        this.res.statusCode = 200; // 如果调用了ctx.body = 12 就给200
        console.log('----2----', val);
        this._body = val;
    }

}
module.exports = response;