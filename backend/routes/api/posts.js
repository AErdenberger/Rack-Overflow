const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Tag = mongoose.model("Tag");
const { requireUser } = require("../../config/passport");
const validatePostInput = require("../../validations/posts");

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
        console.log(reqTags, 'reqTags')
        const tagProcess = async (el) => {
            console.log(el, 'elllllll')
            const tag = await Tag.findOne({ tag: el.tag }); 
            // const tag = await Tag.findOne({ tag: el});
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
        // let reqTags = req.body.tags;

        const tagProcess = async (el) => {
            const tag = await Tag.findOne({ tag: el.tag });

            if (tag) {
                // console.log(tag, 'tag')
                ans = ans.concat(tag._id);
                // console.log("iiiiffffff", ans);
            } else {
                tag = new Tag({ tag: el.tag });
                // console.log("eeeellllsssee", el);
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
        // await post.save();
        post.text = text;
        post.title = title;
        post.voteCount = voteCount;
        console.log(ans, 'ans')
        post.tags = ans;
        
        post = await post.save();
        post = await post.populate("tags", "_id tag");
        // await post.populate('author', '_id username').execPopulate();
        // post.tags = ans;
        return res.json(post);
    } catch (err) {
        next(err);
    }
});
router.get("/", async (req, res) => {
    const queryString = req.query.tags;
     
      try {
          if (queryString) {
              // let searchResults = {};
  
              // const tagsArray = tags.split(",");
              // // const posts = await Post.find({ tags: { $in: [tag] } });
              // // Build the query to find posts that contain all three tags
              // const query = { $and: tagsArray.map((tag) => ({ tags: tag })) };
  
              // const posts = await Post.find(query);
              // searchResults = posts;
  
              // const x = res.json(searchResults);
              // console.log("xxxxxxx", x);
              // return x;
              const tags = queryString.split(","); // Split the tags into an array
            
              const tagObjects = await Tag.find({ tag: { $in: tags } }); // Find tag objects based on the provided tags
            
              const tagIds = tagObjects.map((tag) => tag._id); // Extract the tag IDs from the tag objects

              if(tags.length !== tagObjects.length){
                console.log('There are no Posts with those combined tags')
                // return res.status(404).send(`<h1>There are no Posts with those combined tags</h1>`);
                return res.json([]);
              }
            //   console.log('tagggssIIIDDSSSS', tagIds)
            //   console.log('tagObjects', tagObjects)
            //   const query = { $and: tagIds.map(tag => { console.log('tttttaaaagggg', tag.toString()); return tag.toString() })} ;
              const query = {
                tags: { $all: tagIds }
              };
            //   console.log('queerrrry', query)
              // const posts = await Post.find({
              //   tags: { $in: tagIds } // Search for posts that have any of the specified tag IDs
              // })
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

// router.get("/", async (req, res) => {
//     try {
//         const posts = await Post.find()
//             .populate("author", "_id username")
//             .sort({ createdAt: -1 });

//         const postObj = {};
//         posts.forEach((post) => {
//             postObj[post._id] = post;
//         });
//         return res.json(postObj);
//     } catch (err) {
//         return res.json([]);
//     }
// });

router.delete("/:id", requireUser, async (req, res, next) => {
    console.log(req.user, "request");
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
    console.log(req.user, "request");
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
