const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const crypto = require('crypto');


router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = User.find({ email });
    const salt = user.salt;
})


router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;

    await User.create({
        fullName,
        email,
        password
    });

    res.redirect('/');
});

module.exports = router;