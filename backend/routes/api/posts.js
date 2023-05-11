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

// tag & title filtering endpoint
// tags comes in as a comma separated string
router.get("/posts", async (req, res) => {
    const tags = req.query.tags;
    let searchResults = {};


    try {
      const tagsArray = tags.split(',');
        // const posts = await Post.find({ tags: { $in: [tag] } });
   // Build the query to find posts that contain all three tags
   const query = { $and: tagsArray.map(tag => ({ tags: tag })) };

   const posts = await Post.find(query);
   searchResults = posts;
 
   const x = res.json(searchResults);
   console.log('xxxxxxx', x)
   return x;
 } catch (error) {
   console.error(error);
   res.status(500).json({ message: 'Internal server error' });
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

        const postObj = {};
        posts.forEach((post) => {
            postObj[post._id] = post;
        });
        return res.json(postObj);
    } catch (err) {
        return res.json([]);
    }
});

router.delete("/:id", requireUser, async (req, res, next) => {
    console.log(req.user, "request");
    try {
        const post = await Post.deleteOne({ _id: req.params.id });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(204).json("Post successfully deleted");
    } catch (err) {
        next(err);
    }
});

module.exports = router;
