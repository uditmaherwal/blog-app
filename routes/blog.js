const { Router } = require('express');
const Blog = require('../models/blog');
const multer = require('multer');
const path = require('path');
const router = Router();

router.get('/add-new', (req, res) => {
    res.render('addBlog', {
        user: req.user,
    });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('./public/uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('coverImage'), async (req, res) => {
    const { title, content } = req.body;
    const coverImage = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const newBlog = new Blog({
            title,
            content,
            coverImage,
            createdBy: req.user._id
        });
        await newBlog.save();
        return res.redirect(`/blog/${newBlog._id}`);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
});


module.exports = router;