const response = {
    _body: '',
    get() {
        return this._body;
    },
    set(val) {
        this._body = val;
    }
};


module.exports = response;