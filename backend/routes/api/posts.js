const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Tag = mongoose.model("Tag");
const { requireUser } = require("../../config/passport");
const validatePostInput = require("../../validations/posts");
const keys = require('../../config/keys');
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: keys.openAIKey,
});
const openai = new OpenAIApi(configuration);

router.post("/open-ai", async (req, res, next) => {
    try {
        const  prompt  = req.body;
        const maxTokens = 2049;
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt.prompt,
            temperature: 0.6,
            max_tokens: maxTokens, 
        });
        res.status(200).json({ result: completion.data.choices[0].text });
        //
    } catch (err) {
        console.error("Error in /open-ai:", err);

    // Extract specific properties from the error object
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    const stack = err.stack || null;

    // Respond with the error details
    res.status(status).json({ error: message, stack });
  }
});
// In development, allow developers to access the CSRF token to test the
// server endpoints in Postman.
router.get("/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.status(200).json({
        "CSRF-Token": csrfToken,
    });
});


router.get("/user/:userId", async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.userId);
    } catch (err) {
        const error = new Error("User not found");
        error.statusCode = 404;
        error.errors = { message: "No user found with that id" };
        return next(error);
    }
    try {
        const posts = await Post.find({ author: user._id })
            .sort({ createdAt: -1 })
            .populate("author", "_id username")
            .populate("tags", "_id tag");
        return res.json(posts);
    } catch (err) {
        return res.json([]);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate(
            "author",
            "_id username"
        )
        .populate("tags", "_id tag");
        return res.json(post);
    } catch (err) {
        const error = new Error("post not found");
        error.statusCode = 404;
        error.errors = { message: "No post found with that id" };
        return next(error);
    }
});

// Attach requireUser as a middleware before the route handler to gain access
// to req.user. (requireUser will return an error response if there is no
// current user.) Also attach validatepostInput as a middleware before the
// route handler.
router.post("/", requireUser, validatePostInput, async (req, res, next) => {
    try {
        let ans = [];
        let reqTags = req.body.selectedTags;
        const tagProcess = async (el) => {
            const tag = await Tag.findOne({ tag: el.tag }); 
            if (tag) {
                ans = ans.concat(tag._id);
            } else {
                const tagNew = new Tag({ tag: el.tag });
                await tagNew.save();
                ans = ans.concat(tagNew._id);
            }
        };

        for(let el = 0; el < reqTags.length; el++){
            await tagProcess(reqTags[el]);
        };

        const newPost = new Post({
            title: req.body.title,
            text: req.body.text,
            author: req.user._id,
            tags: ans,
        });

        let post = await newPost.save();
        post = await post.populate("author", "_id username");
        post = await post.populate("tags", "_id tag");
        post.tags = ans;
        post = await newPost.save();
        return await res.json(post);
    } catch (err) {
        next(err);
    }
});

router.patch("/:id", requireUser, validatePostInput, async (req, res, next) => {
    try {
        const postId = req.params.id;
        const { text, title, voteCount, tags } = req.body;
        let post = await Post.findById(postId);
        let ans = [];

        const tagProcess = async (el) => {
            const tag = await Tag.findOne({ tag: el.tag });

            if (tag) {
                ans = ans.concat(tag._id);
            } else {
                tag = new Tag({ tag: el.tag });
                await tag.save();
                ans = ans.concat(tag._id);
            }
        };

         for(let el = 0; el < tags.length; el++) {
            await tagProcess(tags[el]);
        };

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        if (!post.author.equals(req.user._id)) {
            return res
                .status(403)
                .json({ message: "You are not authorized to edit this post" });
        }
        post.text = text;
        post.title = title;
        post.voteCount = voteCount;
        post.tags = ans;
        
        post = await post.save();
        post = await post.populate("tags", "_id tag");
        return res.json(post);
    } catch (err) {
        next(err);
    }
});
router.get("/", async (req, res) => {
    const queryString = req.query.tags;
     
      try {
          if (queryString) {
              const tags = queryString.split(","); 
              // converts tags to regular expressions, the i is to ignore case
              // this will find multiple tags seperated by a comma
              const regexTags = tags.map(tag => new RegExp(tag, 'i'));
              const tagObjects = await Tag.find({ tag: { $in: regexTags } }); 
              const tagIds = tagObjects.map((tag) => tag._id); 

              if(tags.length !== tagObjects.length){
                //There are no Posts with those combined tags'
                return res.json([]);
              }
            
              const query = {
                tags: { $all: tagIds }
              };
            
               const posts = await Post.find(query)
                .populate("author", "_id username")
                .populate("tags", "_id tag")
                .sort({ createdAt: -1 });
              const postObj = {};
              posts.forEach((post) => {
                postObj[post._id] = post;
              });
              return res.json(postObj);
          } else {
              const posts = await Post.find()
                  .populate("author", "_id username")
                  .populate("tags", "_id tag")
                  .sort({ createdAt: -1 });
  
              const postObj = {};
              posts.forEach((post) => {
                  postObj[post._id] = post;
              });
              return res.json(postObj);
          }
      } catch (err) {
          return res.json([]);
      }
  });


router.delete("/:id", requireUser, async (req, res, next) => {
    try {
        const post = await Post.deleteOne({ _id: req.params.id });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(204).json("Post successfully deleted");
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", requireUser, async (req, res, next) => {
    try {
        const post = await Post.deleteOne({ _id: req.params.id });
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(204).json("Post successfully deleted");
    } catch (err) {
        next(err);
    }
});

module.exports = router;
