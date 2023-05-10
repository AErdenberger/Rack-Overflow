const express = require('express');
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const Answer = mongoose.model('Answer');
// const User = mongoose.model('User');
// const Post = mongoose.model('Post');
const { requireUser } = require('../../config/passport');
// const validatePostInput = require('../../validations/posts');
const validateAnswerInput = require('../../validations/posts');
 

// In development, allow developers to access the CSRF token to test the
  // server endpoints in Postman.
  router.get("/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.status(200).json({
      'CSRF-Token': csrfToken
    });
  });


  
router.get('/', async (req, res) => {
   console.log("I'm in Answers routes", req.params)
   const id = req.params.postId;
   try {
    const answers = await Answer.find({ parentPost: id })
    .populate("parentPost", "id post")
    .sort({ createdAt: -1 });
  return res.json(answers);
  }
  catch(err) {
    return res.json([]);
  }
});

router.post('/', requireUser, validateAnswerInput, async (req, res, next) => {
// router.post('/', requireUser, async (req, res, next) => {
    const id = req.params.postId;
    try {
      const newAnswer = new Answer({
        text: req.body.text,
        author: req.user._id,
        parentPost: req.params.postId,
        voteCount: req.body.voteCount
      });
  
      let answer = await newAnswer.save();
      answer = await answer.populate('author', '_id username');
      return res.json(answer);
    }
    catch(err) {
      next(err);
    }
  });


module.exports = router;