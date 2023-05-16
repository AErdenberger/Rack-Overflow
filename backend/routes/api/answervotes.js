const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const { requireUser } = require("../../config/passport");
const Answer = mongoose.model("Answer");

const AnswerVote = mongoose.model("AnswerVote");


router.get('/', requireUser, async (req, res, next) => {

    
    const {answerId} = req.params
    
            
    
    
});

router.post('/:id', requireUser, async (req, res, next) => {

    
    const {answerId} = req.params
    

    ansVote = new AnswerVote({ 
        vote: 1,
        authorId: req.user._id,
        answerId: answerId
    })

    await ansVote.save()
            
    return res.json(ansVote)
    
});