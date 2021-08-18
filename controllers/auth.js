//npm i jsonwebtoken
let jwt = require('jsonwebtoken');
let secret = 'gew67dfiew';
//generate key
function generateToken(user) {
    let payload = {
        email: user.email,
        password: user.password
    }
    return jwt.sign(payload, secret);
}
//check key, returns true or false
function checkToken(token) {
    return jwt.verify(token, secret);
}
//export to use result in other files too
module.exports = { generateToken, checkToken };