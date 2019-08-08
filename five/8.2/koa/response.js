const response = {
    _body: '',  // 意味着不希望别人访问到
    get body() {
        return this._body;
    },
    set body(val) {
        this._body = val;
    }

}
module.exports = response;