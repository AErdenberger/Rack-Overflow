const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const { requireUser } = require("../../config/passport");
const Answer = mongoose.model("Answer");
const Post = mongoose.model("Post");
const AnswerVote = mongoose.model("AnswerVote");
const PostVote = mongoose.model("PostVote");


router.get('/', requireUser, async (req, res, next) => {

    const {postId} = req.params


});

router.post('/:id', requireUser, async (req, res, next) => {

    
    const {postId} = req.params
    

    postVote = new PostVote({ 
        vote: 1,
        authorId: req.user._id,
        postId: postId
    })

    await postVote.save()
            
    return res.json(postVote)
    
});