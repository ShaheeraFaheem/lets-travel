let Post = require('../models/posts').Post;
//initialized uniqid then displaying it
let uniqid = require('uniqid');
//console.log(uniqid());
//connecting express to posts.js since server only runs app.js file, it redirects to posts.js to get,create,delete,edit.
let express = require('express');
let router = express.Router(); //object router assigned to variable router
let authMiddleware = require('../middleware/auth');

//get post access to all
//backend part of database to get posts from database to webpage
router.get('/', async (req, resp) => {
    let posts = await Post.find();
    resp.send(posts);
})
router.get('/:id', async (req, resp) => {
    let id = req.params.id;
    let post = await Post.findOne({id: id});
    resp.send(post);
})

//create post (only admin access)
router.post('/', authMiddleware, async (req, resp) => {
    let reqBody = req.body;
    let imgPath;
    if(reqBody.imageURL) {
        imgPath = reqBody.imageURL;
    } else {
        imgPath = req.file.path.substring(req.file.path.indexOf('/'), req.file.path.length);
    }

    let newPost = new Post({
        id: uniqid(),
        title: reqBody.title,
        date: new Date(),
        description: reqBody.description,
        text: reqBody.text,
        country: reqBody.country,
        imageURL: imgPath
    })
    await newPost.save();
    resp.send('Created');
})

//delete post (admin can access only)
router.delete('/:id', authMiddleware, async (req, resp) => {
    await Post.deleteOne({id: req.params.id});
    resp.send('Deleted!');
});

//update post (only admin access)
router.put('/:id', authMiddleware, async (req, resp) => {
    let id = req.params.id;
    await Post.updateOne({id: id}, req.body);
    resp.send('Updated!');
})

//exporting router to use in app.js file
module.exports = router;