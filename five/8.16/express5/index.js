const Application = require('./application');
const Router = require('./router');

createApplication.Router = Router;
function createApplication() {
    return new Application();
}


module.exports = createApplication;