let Email = require('../models/emails').Email;
let uniqid = require('uniqid');
let express = require('express');
let router = express.Router();
//email access only to admins
let authMiddleware = require('../middleware/auth');
//get takes all emails from database and sends to client
router.get('/', authMiddleware, async (req, resp) => {
    resp.send(await Email.find());
});
//read the data sent to server
router.post('/', async (req, resp) => {
    let reqBody = req.body;
    let newEmail = new Email({
        id: uniqid(),
        name: reqBody.name,
        text: reqBody.text,
        email: reqBody.email,
        date: new Date()
    }) 
    await newEmail.save()
    resp.send('Accepted');
});
router.delete('/:id', authMiddleware, async (req, resp) => {
    await Email.deleteOne({id: req.params.id});
    resp.send('Deleted');
});

module.exports = router;