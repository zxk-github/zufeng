const Application = require('./application');
const Router = require('./router');
const path = require('path');
const fs = require('fs');

createApplication.Router = Router;
createApplication.static = (dirname) => {
    return function(req, res, next) {
        let filePath = path.join(dirname, req.url);
        fs.stat(filePath, (err, stats) => {
            if(err) {
                next();
            }
            if(stats.isFile()) {
                fs.createReadStream(filePath).pipe(res);
            }
        })
    }
}
function createApplication() {
    return new Application();
}


module.exports = createApplication;