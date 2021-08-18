let User = require('../models/users').User;
let express = require('express');
let router = express.Router();
//install bcrypt(npm i bcrypt) to encode password on database
let bcrypt = require('bcrypt');
let auth = require('../controllers/auth');

router.post('/login', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    //look for user in database based on email and password
    let user = await User.find().where({email: email});
    if(user.length > 0) { //uptill here known this email is a registered user
        //matching password to encrypted password
        let comparisonResult = await bcrypt.compare(password, user[0].password);
        if(comparisonResult) {
            let token = auth.generateToken(user[0]);
            //saving token in cookies when user signs in 
            resp.cookie('auth_token', token);
            resp.send({
                //redirect to admin page itself as soon as user logs in
                redirectURL: '/admin'
            }); 
        } else {
            //http status error code for client error
            resp.status(400);
            resp.send('Rejected');
        }
    } else {
        resp.send('Rejected');
    }
})

//when user registers the submit email and password. checked whether email already registered

router.post('/register', async (req, resp) => {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.find().where({email: email});
    if(user.length === 0) {
        //initilalizing bcrypt since asynchronous
        let encryptedPass = await bcrypt.hash(password, 12);
        let newUser = new User({
            email: email,
            password: encryptedPass
        })
        await newUser.save();
        resp.send('Done');
    } else {
        resp.send('Rejected');
    }
})

module.exports = router;