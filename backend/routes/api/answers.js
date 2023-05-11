const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const Answer = mongoose.model("Answer");
const Post = mongoose.model("Post");
const Tag = mongoose.model("Tag");
// const User = mongoose.model('User');
// const Post = mongoose.model('Post');
const { requireUser } = require("../../config/passport");
// const validatePostInput = require('../../validations/posts');
const validateAnswerInput = require("../../validations/posts");

// In development, allow developers to access the CSRF token to test the
// server endpoints in Postman.
router.get("/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.status(200).json({
        "CSRF-Token": csrfToken,
    });
});

router.get("/", async (req, res) => {
    console.log("I'm in Answers routes", req.params);
    const id = req.params.postId;
    try {
        const answers = await Answer.find({ parentPost: id })
            .populate("parentPost", "id post")
            .sort({ createdAt: -1 });
        return res.json(answers);
    } catch (err) {
        return res.json([]);
    }
});

router.post("/:id", requireUser, validateAnswerInput, async (req, res, next) => {

    const postId = req.params.id;
    const { text, title, voteCount, tags } = req.body;
    const post = await Post.findById(postId);
    console.log('posttttt', post)
    console.log('postttttIIIIDDDDDDD', postId)
    try {
        let ans = [];
        let reqTags = req.body.tags;
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

        await reqTags.forEach(async (el) => {
            await tagProcess(el);
        });
        
        const newAnswer = new Answer({
            text: req.body.text,
            author: req.user._id,
            parentPost: post.id,
            tags: ans,
        });

        let answer = await newAnswer.save();
        answer = await answer.populate("author", "_id username");
        answer.tags = ans;
        answer = await newAnswer.save();
        return await res.json(answer);
       
    } catch (err) {
        next(err);
    }
});

router.patch("/:id", requireUser, validateAnswerInput, async (req, res, next) => {
    try {
        const answerId = req.params.id;
        const { text, voteCount, tags } = req.body;
        const answer = await Answer.findById(answerId);
        let ans = [];
        // let reqTags = req.body.tags;

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

        await tags.forEach(async (el) => {
            await tagProcess(el);
        });

        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }
        if (!answer.author.equals(req.user._id)) {
            return res
                .status(403)
                .json({ message: "You are not authorized to edit this answer" });
        }
        await answer.save();
        answer.text = text;
        answer.voteCount = voteCount;
        answer.tags = ans;
        await answer.save();
        // await answer.populate('author', '_id username').execPopulate();
        answer.tags = ans;
        return res.json(answer);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
