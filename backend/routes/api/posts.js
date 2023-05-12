const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Tag = mongoose.model("Tag");
const keys = require("../../config/keys");
const { requireUser } = require("../../config/passport");
const validatePostInput = require("../../validations/posts");
const tags = ["tag1", "tag2"];
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: keys.openAIKey,
});
const openai = new OpenAIApi(configuration);

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
      //   const completion = await openai.createCompletion({
      //     model: "text-davinci-003",
      //     prompt: req.body.text,
      //     temperature: 0.6,
      // });
      // console.log("COMPLETION", completion)

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

router.post("/open-ai", async (req, res, next) => {
    try {
        const { prompt } = req.body;
        console.log("PROMPT", prompt);
        // const response = await fetch("https://openai.com/v1/completions", {
        //     method: "POST",
        //     headers: {
        //         Authorization:
        //             "Bearer " + keys.openAIKey
        //     },
        //     body: {
        //         model: "text-davinci-003",
        //         prompt: "hi there",
        //     },
        // });

        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0.6,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
        //
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
