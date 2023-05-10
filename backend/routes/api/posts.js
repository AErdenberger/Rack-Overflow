const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Tag = mongoose.model("Tag");
const { requireUser } = require("../../config/passport");
const validatePostInput = require("../../validations/posts");


// In development, allow developers to access the CSRF token to test the
// server endpoints in Postman.
router.get("/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.status(200).json({
        "CSRF-Token": csrfToken,
    });
});

router.get("/posts", async (req, res) => {
    const tag = req.query.tags;
    console.log("tag", tag);

    try {
        // const posts = await Post.find({ tags: { $in: [tag] } });
        const posts = await Post.find({ tags: tag });

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/user/:userId", async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.userId);
    } catch (err) {
        const error = new Error("User not found");
        error.statusCode = 404;
        error.errors = { message: "No user found with that id" };
        return next(error);
    }
    try {
        const posts = await Post.find({ author: user._id })
            .sort({ createdAt: -1 })
            .populate("author", "_id username");
        return res.json(posts);
    } catch (err) {
        return res.json([]);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate(
            "author",
            "_id username"
        );
        return res.json(post);
    } catch (err) {
        const error = new Error("post not found");
        error.statusCode = 404;
        error.errors = { message: "No post found with that id" };
        return next(error);
    }
});

// Attach requireUser as a middleware before the route handler to gain access
// to req.user. (requireUser will return an error response if there is no
// current user.) Also attach validatepostInput as a middleware before the
// route handler.
router.post("/", requireUser, validatePostInput, async (req, res, next) => {
    try {
        let ans = [];
        let reqTags = req.body.tags;
        const tagProcess = async (el) => {
            const tag = await Tag.find({ tag: el });

            if (tag) {
                ans = ans.concat(tag);
            } else {
                tag = new Tag({ tag: el });
                await tag.save();
                ans = ans.concat(tag);
            }
        };

        await reqTags.forEach(async (el) => {
            await tagProcess(el);
        });

        const newPost = new Post({
            title: req.body.title,
            text: req.body.text,
            author: req.user._id,
            tags: ans,
        });

        let post = await newPost.save();
        post = await post.populate("author", "_id username");
        post.tags = ans;
        post = await newPost.save();
        return await res.json(post);
    } catch (err) {
        next(err);
    }
});

router.patch("/:id", requireUser, validatePostInput, async (req, res, next) => {
    try {
        const postId = req.params.id;
        const { text, title, voteCount, tags } = req.body;
        const post = await Post.findById(postId);
        let ans = [];
        // let reqTags = req.body.tags;

        const tagProcess = async (el) => {
            const tag = await Tag.find({ tag: el });

            if (tag) {
                ans = ans.concat(tag);
                console.log("iiiiffffff", ans);
            } else {
                tag = new Tag({ tag: el });
                console.log("eeeellllsssee", el);
                await tag.save();
                ans = ans.concat(tag);
            }
        };

        await tags.forEach(async (el) => {
            await tagProcess(el);
        });

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (!post.author.equals(req.user._id)) {
            return res
                .status(403)
                .json({ message: "You are not authorized to edit this post" });
        }
        await post.save();
        post.text = text;
        post.title = title;
        post.voteCount = voteCount;
        post.tags = ans;
        await post.save();
        // await post.populate('author', '_id username').execPopulate();
        post.tags = ans;
        return res.json(post);
    } catch (err) {
        next(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("author", "_id username")
            .sort({ createdAt: -1 });
        // return res.json(posts);
        return res.json(posts);
    } catch (err) {
        return res.json([]);
    }
});

module.exports = router;
