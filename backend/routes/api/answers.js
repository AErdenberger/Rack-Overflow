const express = require('express');
const router = express.Router({ mergeParams: true });
const mongoose = require('mongoose');
const Answer = mongoose.model('Answer');
// const User = mongoose.model('User');
// const Post = mongoose.model('Post');
// const { requireUser } = require('../../config/passport');
// const validatePostInput = require('../../validations/posts');
 

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

router.post('/', (req, res) => {
   
});


module.exports = router;