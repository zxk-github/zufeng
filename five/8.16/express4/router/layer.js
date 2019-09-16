function Layer(path, handler) {
    this.path = path;
    this.handler = handler;
}

Layer.prototype.match = function(pathname) {
    // return this.path = pathname;
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