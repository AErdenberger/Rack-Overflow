const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const Answer = mongoose.model("Answer");
const Post = mongoose.model("Post");
const Tag = mongoose.model("Tag");
const { requireUser } = require("../../config/passport");
const validateAnswerInput = require("../../validations/posts");

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
router.post("/open-ai", async (req, res, next) => {
    console.log('I am HERE');
    try {
      const { prompt } = await req.body;
      console.log("req.body", req.body);
  
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.6,
      });
     console.log('COMPLETION', completion)
      res.status(200).json({ result: completion.data.choices[0].text });
    } catch (err) {
      console.error("An error occurred:", err);
      res.status(500).json({ error: "Internal server error" });
    }
})


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
        answer.tags = ans;
        return res.json(answer);
    } catch (err) {
        next(err);
    }
});

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
