const express = require('express');
const path = require('path');
const userRouter = require('./routes/user');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authenticationMiddleware = require('./middlewares/authentication');

const app = express();
const PORT = 8000;
const databaseUrl = 'mongodb://localhost:27017/blogify';

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authenticationMiddleware('token')); // Replace 'token' with the actual cookie name

app.get('/', (req, res) => {
    res.render('home', {
        user: req.user,
    });
});

app.use('/user', userRouter);

mongoose.connect(databaseUrl).then((e) => {
    console.log("MongoDB is now connected to your server");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});