const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const { requireUser } = require("../../config/passport");
const Answer = mongoose.model("Answer");

const AnswerVote = mongoose.model("AnswerVote");

async function voteTotal(answerId) {
    try {
      let allAnswerVotes = await AnswerVote.find({ answerId }).exec();
     
      let totalVoteCount = 0;
  
      for (let i = 0; i < allAnswerVotes.length; i++) {
        totalVoteCount += allAnswerVotes[i].vote;
      }
  
      return totalVoteCount;
  
    } catch (error) {
      console.error(error);
    }
  }


router.get('/votecount/:answerId', requireUser, async (req, res, next) => {

    const { answerId } = req.params
  
    return res.json(voteTotal(answerId))
  
  });

  router.post('/:answerId', requireUser, async (req, res, next) => {

    const { answerId } = req.params
  
    let answerVoteByUser = await AnswerVote.findOne({
      authorId: req.user._id,
      answerId: answerId
    })
  
    if (answerVoteByUser) {
  
        answerVoteByUser.vote = req.body.vote;
  
        await answerVoteByUser.save();
      }
      else {
  
        const answerVote = new AnswerVote({
          vote: req.body.vote,
          authorId: req.user._id,
          answerId: answerId
        })
        await answerVote.save()
  
      }
  
    return res.json(await voteTotal(answerId))
  });

module.exports = router;
