const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const { requireUser } = require("../../config/passport");
const Answer = mongoose.model("Answer");
const Post = mongoose.model("Post");
const AnswerVote = mongoose.model("AnswerVote");
const PostVote = mongoose.model("PostVote");

//ALWAYS RETURN TOTAL NUMBER OF VOTES FOR ALL END POINTS

async function voteTotal(postId) {
  try {
    let allPostVotes = await PostVote.find({ postId }).exec();
    let totalVoteCount = 0;

    for (let i = 0; i < allPostVotes.length; i++) {
      totalVoteCount += allPostVotes[i].vote;
    }
    return {voteTotal: totalVoteCount};

  } catch (error) {
    console.error(error);
  }
}
router.get('/:postId/user/:userId', requireUser, async (req, res, next) => {
  const { postId, userId } = req.params
  const userVote = await PostVote.findOne({authorId: userId, postId: postId});
  return res.json(userVote);
});

router.get('/votecount/:postId', requireUser, async (req, res, next) => {

  const { postId } = req.params
  const data = await voteTotal(postId);
  return res.json(data);

});

router.post('/:postId', requireUser, async (req, res, next) => {
  const { postId } = req.params

  let postVoteByUser = await PostVote.findOne({
    authorId: req.user._id,
    postId: postId
  })

  if (postVoteByUser) {

      postVoteByUser.vote = req.body.vote;

      await postVoteByUser.save();
    }
    else {

      const postVote = new PostVote({
        vote: req.body.vote,
        authorId: req.user._id,
        postId: postId
      })
      await postVote.save()

    }

  const data = await voteTotal(postId);
  return res.json(data);
});

module.exports = router;
