require('dotenv').config();

const express = require('express');
const path = require('path');
const userRouter = require('./routes/user');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authenticationMiddleware = require('./middlewares/authentication');
const blogRouter = require('./routes/blog');
const Blog = require('./models/blog');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authenticationMiddleware('token'));
app.use(express.static(path.resolve('./public')));

app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render('home', {
        user: req.user,
        blogs: allBlogs
    });
});

app.use('/user', userRouter);
app.use('/blog', blogRouter);

mongoose.connect(process.env.MONGODB_URL).then((e) => {
    console.log("MongoDB is now connected to your server");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});