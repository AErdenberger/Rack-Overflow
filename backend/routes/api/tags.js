const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const User = mongoose.model('User');
// const Post = mongoose.model('Post');
const Tag = mongoose.model("Tag");
const { requireUser } = require("../../config/passport");
const validateTagInput = require("../../validations/posts");

router.post("/", requireUser, validateTagInput, async (req, res, next) => {
    try {
        const newTag = new Tag({
            tag: req.body.tag,
        });
        let tag = await newTag.save();
        return res.json(tag);
    } catch (err) {
        next(err);
    }
});

router.get("/", async (req, res) => {
    try {
        // const tag = await Tag.find({tag: req.query.tag});
        const tag = await Tag.findOne({ tag: req.query.tag }).exec();
        if (tag) {
            return res.json({ _id: tag._id });
        } else {
            tag = new Tag({ tag: req.query.tag });
            await tag.save();
            return res.json({ _id: tag._id });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// router.get("/", async (req, res) => {
//     const tags = await Tag.find();
//     try {
//         return res.json(tags);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// });
module.exports = router;
