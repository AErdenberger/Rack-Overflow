const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const Answer = mongoose.model("Answer");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Tag = mongoose.model("Tag");
const { requireUser } = require("../../config/passport");
const validateAnswerInput = require("../../validations/answers");

// In development, allow developers to access the CSRF token to test the
// server endpoints in Postman.
router.get("/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.status(200).json({
        "CSRF-Token": csrfToken,
    });
});

router.get("/:postId", async (req, res) => {
    const id = req.params.postId;
    try {
        const answers = await Answer.find({ parentPost: id })
            .populate("parentPost", "id post")
            .populate("author", "_id username")
            .sort({ createdAt: -1 });
        const answerObj = {};
        answers.forEach((answer) => {
            answerObj[answer._id] = answer;
        });
        return res.json(answerObj);
    } catch (err) {
        return res.json([]);
    }
});


/// The next two function are so that the ChatBot authorshipe
/// is shown for the first comment
async function getComments(parentPost) {
    try {
        const comments = await Answer.find({ parentPost: parentPost });
        return comments;
    } catch (err) {
        console.error("Error:", err);
        throw err;
    }
}

async function processComments(parentPost, req, post, ans, res) {
    try {
        const result = await getComments(parentPost);
        const post = await Post.findById(parentPost);
        console.log("Comments:", post);
      
        let authorId;
        if (result.length < 1 && post.chatFlag) {
            post.chatFlag = false;
            const user = await User.findOne({
                $or: [{ email: "chat@bot.com" }, { username: "ChatBot" }],
            });
            authorId = user._id;
        } else {
            authorId = req.user._id;
        }
        const newAnswer = new Answer({
            text: req.body.text,
            author: authorId,
            parentPost: post.id,
            tags: ans,
        });
        let answer = await newAnswer.save();
        answer = await answer.populate("author", "_id username");
        answer.tags = ans;
        answer = await newAnswer.save();
        return await res.json(answer);
    } catch (err) {
       console.log(err)
    }
}
router.post("/", requireUser, validateAnswerInput, async (req, res, next) => {
    const { parentPost, text, voteCount, tags } = req.body;

    const post = await Post.findById(parentPost);
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
        // process authorship and return the response
        processComments(parentPost, req, post, ans, res);
    } catch (err) {
        console.log(err);
    }
});

router.patch(
    "/:id",
    requireUser,
    validateAnswerInput,
    async (req, res, next) => {
        try {
            const answerId = req.params.id;
            const { text, voteCount, tags } = req.body;
            const answer = await Answer.findById(answerId);
            let ans = [];

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
                return res.status(403).json({
                    message: "You are not authorized to edit this answer",
                });
            }
            await answer.save();
            answer.text = text;
            answer.voteCount = voteCount;
            answer.tags = ans;
            await answer.save();
            answer.tags = ans;
            return res.json(answer);
        } catch (err) {
            next(err);
        }
    }
);

router.delete("/:id", requireUser, async (req, res, next) => {
    try {
        const answer = await Answer.deleteOne({ _id: req.params.id });
        if (!answer) {
            return res.status(404).json({ message: "Answer not found" });
        }
        return res.status(204).json(" Answer successfully deleted");
    } catch (err) {
        next(err);
    }
});

module.exports = router;
