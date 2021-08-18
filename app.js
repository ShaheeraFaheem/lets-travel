//initialize express
let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
//initializing after installing npm i cookie-parser
let cookieParser = require('cookie-parser');
//importing router from posts.js file
let postsRouter = require('./routes/posts');
let callbackRequestsRouter = require('./routes/callback-requests');
let emailsRouter = require('./routes/emails');
let usersRouter = require('./routes/users');
let Post = require('./models/posts').Post;
let auth = require('./controllers/auth');

//template engine
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/travels', { useNewUrlParser: true });
//converting to json
app.use(express.json());
let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)
})

app.use(multer({storage: imageStorage}).single('imageFile'));


//to open let's travel homepage on localhost:3000
app.use(express.static('public'));

app.use(cookieParser());

//redirecting to routes->posts.js
app.use('/posts',postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);

app.get('/sight', async (req, resp) => {
    let id = req.query.id;
    let post = await Post.findOne({id: id});
    resp.render('sight', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
})

//only letting access to admin page when user registered
//let isLoggedIn = false;

app.get('/admin', (req, resp) => {
    //server reading token from cookie (cookie-parser install)
    let token = req.cookies['auth_token'];
    if (token && auth.checkToken(token)){
        resp.render('admin');
    } else{ 
         //when admin clicked, redirected web path to /login (sign in page)
        resp.redirect('/login');
    }
})
app.get('/login', (req, resp) => {
   resp.render('login');
})
app.listen(3000, ()=> console.log('Listening 3000...'));