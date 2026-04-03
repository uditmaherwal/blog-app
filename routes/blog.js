const { Router } = require('express');
const Blog = require('../models/blog');
const multer = require('multer');
const path = require('path');
const router = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
    return res.render("addBlog", {
        user: req.user,
    });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
    const { title, content } = req.body;
    const blog = await Blog.create({
        title,
        content,
        coverImageUrl: `/uploads/${req.file.filename}`,
        createdBy: req.user._id
    });
    return res.redirect(`/blog/${blog._id}`);
});

router.get("/:id", async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    return res.render("blog", {
        user: req.user,
        blog
    });
});

module.exports = router;