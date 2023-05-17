const express = require("express");
const router = express.Router({ mergeParams: true });
const mongoose = require("mongoose");
const { requireUser } = require("../../config/passport");
const Answer = mongoose.model("Answer");
const Post = mongoose.model("Post");
const AnswerVote = mongoose.model("AnswerVote");
const PostVote = mongoose.model("PostVote");

//ALWAYS RETURN TOTAL NUMBER OF VOTES FOR ALL END POINTS
// function voteTotal(postId) {

//   let allPostVotes = PostVote.find({
//                                         postId: postId
//                                       }).exec();
//       console.log(allPostVotes, 'allPostVotessssssss')
//      let totalVoteCount = 0;      


//      for(let i = 0; i < allPostVotes.length; i++){
//         totalVoteCount += allPostVotes[i].vote;
//      }    

//      return totalVoteCount;
// }


async function voteTotal(postId) {
  try {
    let allPostVotes = await PostVote.find({ postId }).exec();
    console.log(allPostVotes, 'allPostVotes');
    let totalVoteCount = 0;

    for (let i = 0; i < allPostVotes.length; i++) {
      totalVoteCount += allPostVotes[i].vote;
    }

    return totalVoteCount;

  } catch (error) {
    console.error(error);
  }
}

router.get('/votecount/:postId', requireUser, async (req, res, next) => {

  const { postId } = req.params

  return res.json(voteTotal(postId))

});

router.post('/:postId', requireUser, async (req, res, next) => {


  const { postId } = req.params
  console.log(postId, 'postIDDDD')

  let postVoteByUser = await PostVote.findOne({
    authorId: req.user._id,
    postId: postId
  })
  // console.log(postVoteByUser,'postVOSTBYA USERSEERRRR')
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

  return res.json(await voteTotal(postId))
});

module.exports = router;
