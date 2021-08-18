let auth = require('../controllers/auth');
//check if user has admin access in order to access certain routes
function checkAuth(req, resp, next) {
    let token = req.cookies['auth_token'];
    if(token && auth.checkToken(token)) {
        next();
    } else{
        resp.status(400);
        resp.send('Not authorized!');
    }
}

module.exports = checkAuth;