const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const { requireUser } = require("../../config/passport");
const Answer = mongoose.model("Answer");
const Post = mongoose.model("Post");
const AnswerVote = mongoose.model("AnswerVote");
const PostVote = mongoose.model("PostVote");

//ALWAYS RETURN TOTAL NUMBER OF VOTES FOR ALL END POINTS

router.get('/votecount/:postId', requireUser, async (req, res, next) => {

    const {postId} = req.params

    let allVotesForPost = await PostVote.find()
    

});

router.post('/:postId', requireUser, async (req, res, next) => {

    
    const {postId} = req.params
    console.log(postId,'postIDDDD')

    let postVoteByUser = await PostVote.findOne({
                                                authorId: req.user._id,
                                                postId: postId
                                            })
                                            console.log(postVoteByUser,'postVOSTBYA USERSEERRRR')
    if(postVoteByUser){
      
      postVoteByUser.vote = req.body.vote;

      await postVoteByUser.save();
    
      
    }
    else{
        const postVote = new PostVote({ 
            vote: req.body.vote,
            authorId: req.user._id,
            postId: postId
        })
        await postVote.save()
                
        return awaitres.json(postVote)
    }
    // let allVotesForPost = await PostVote.find({
    //                                               postId: postId
    //                                            })
    //  for(let userVote = 0; userVote < allVotesForPost)                                          
    return res.json()
});

module.exports = router;
