# Rack-Overflow
![Project Logo](https://rack-overflow.s3.us-west-1.amazonaws.com/Rack-Overflow-Logo-Transparent.png)

## Description

What if Stack Overflow was for individuals lookingto work out? That is the question we set out to answer with [Rack Overflow](https://rack-overflow-q59q.onrender.com/). Lots of times when people are looking to exercise in a more substantial manner they are often lost and have to wade through the blogs of "fitness buffs", workouts made for a general audience, or pay a lot of money for personal trainers.

Rack Overflow's goal is to be a crowd sourced discussion forum for folks who want to work out but value their questions answered by fellow gym goers, or folks who have similar circumstances to them.

Some example questions:

> I am a forty year old male currently training to run a marathon. I have about ten hours a week to train. I am looking to increase my stamina and work my way up to long distance running. How much and how often should I be increasing my run distance, and what other exercises can I do to increase my stamina?

> I am a thiry-two year old post natal woman. I want to lose my baby weight, but I am worried about what exercises I can, and cannot do. Are there any other women out there who have been or are in a similar position as me that can help out?


## Technologies Used

* `MongoDB` - Our backend database which holds our data on users, comments, posts, and tags
* `Express` - Middleware
* `React` - Frontend library creating compnents viewable on the site
* `Nodejs`- Code environment
* `AmazonS3` - Storage for images used on the website such as our site's logo, favicon, and other images used on the site
* `Render` - Public website deployment
* `OpenAI` - AI responses to posts made by users

## The Team

 1. Alex Erdenberger - Team Lead and Flex
 2. David Gudeman - Backend Developer and AI Integration
 3. David Lai - Backend Developer
 4. Josh van Eyken - Frontend Developer
 5. Steven Zabala - Frontend Developer

## Code Snippets

Filter down the posts by their tags
```js
router.get(“/”, async (req, res) => {
    const queryString = req.query.tags;
      try {
          if (queryString) {
              const tags = queryString.split(“,”); // Split the tags into an array
              const tagObjects = await Tag.find({ tag: { $in: tags } }); // Find tag objects based on the provided tags
              const tagIds = tagObjects.map((tag) => tag._id); // Extract the tag IDs from the tag objects
              if(tags.length !== tagObjects.length){
                console.log(‘There are no Posts with those combined tags’)
                 return res.status(404).send(`<h1>There are no Posts with those combined tags</h1>`);
                return res.json([]);
              }
              const query = {
                tags: { $all: tagIds }
              };
               const posts = await Post.find(query)
                .populate(“author”, “_id username”)
                .populate(“tags”, “_id tag”)
                .sort({ createdAt: -1 });
              const postObj = {};
              posts.forEach((post) => {
                postObj[post._id] = post;
              });
              return res.json(postObj);
          } else {
              const posts = await Post.find()
                  .populate(“author”, “_id username”)
                  .populate(“tags”, “_id tag”)
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
  ```
  
  Changing color of the loading comments label
  ```js
  const colors = ["tomato", "brown", "salmon", "cyan",
    "green", "orange", "gold", "violet", "pink"
  ]
  const changeColor = e => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const color = colors[randomIndex];
    const label = document.getElementById("label-loading-post");
    if(label){
      label.style.color = color;
    }
  };
  setInterval(function(){
    changeColor();
  }, 1500);
  ```
