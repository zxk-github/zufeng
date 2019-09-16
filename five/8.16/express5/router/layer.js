const pathToRegExp = require('path-to-regexp');
function Layer(path, handler) {
    this.path = path;
    this.handler = handler;
    // :id/:name ==> [{name: 'id'}, {name: 'name'}]
    this.regExp = pathToRegExp(this.path, this.keys = []);
}

Layer.prototype.match = function(pathname) {
    // return this.path = pathname;
    if(this.regExp.test(pathname)) {
        // console.log(this.keys)
        let matches = pathname.match(this.regExp);
        console.log(matches);
        this.params = this.keys.reduce((memo, current, index) => (
            memo[current.name] = matches[index+1], memo
        ), {})
        return true;
    }
    if(this.path === pathname) {
        return true;
    }
    if(!this.route) {
        if(this.path === '/') {
            return true;
        }
        return pathname.startsWith(this.path + '/')
    }
}

module.exports = Layer;