const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
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

router.get("/getAllTags", requireUser, async (req, res, next) =>{
    try{
        const tags = await Tag.find();
        return res.json(tags);
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not access Tags" });
    }
});


router.get("/getTagName", async(req,res,next) =>{//FINDS TAG NAME TO DISPLAY ON POSTBOX, QUESTIONSHOW
    try{
        const tag = await Tag.findById(req.body.tagId);
        return res.json(tag)
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: "Could not find this Tag name" });
    }
})

router.get("/", async (req, res) => {
    try {
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

module.exports = router;
