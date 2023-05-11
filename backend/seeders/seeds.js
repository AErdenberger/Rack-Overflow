const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const Post = require("../models/Post.js");
const Tag = require("../models/Tag.js");
const Answer = require("../models/Answer");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");

const NUM_SEED_USERS = 10;
const NUM_SEED_POSTS = 30;
const NUM_SEED_ANSWERS = 10;
const NUM_SEED_TAGS = 20;
const NUM_SEED_POST_TAGS = 3;

// Create users
const users = [];

users.push(
    new User({
        username: "demo-user",
        email: "demo@user.com",
        hashedPassword: bcrypt.hashSync("password", 10),
    })
);
users.push(
    new User({
        username: "ggg",
        email: "g@g.com",
        hashedPassword: bcrypt.hashSync("gggggg", 10),
    })
);

for (let i = 1; i < NUM_SEED_USERS; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    users.push(
        new User({
            username: faker.internet.userName(firstName, lastName),
            email: faker.internet.email(firstName, lastName),
            hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
        })
    );
}

// Create Tags
const tags = [];
for (let i = 0; i < NUM_SEED_TAGS; i++) {
    tags.push(
        new Tag({
            tag: faker.lorem.words(2),
        })
    );
}

// Create posts
const posts = [];

for (let i = 0; i < NUM_SEED_POSTS; i++) {
    const postTags = [];
    for (let i = 0; i < NUM_SEED_POST_TAGS; i++) {
        postTags.push(tags[Math.floor(Math.random() * NUM_SEED_TAGS)]._id);
    }

    posts.push(
        new Post({
            text: faker.hacker.phrase(),
            author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
            title: faker.hacker.phrase(10),
            voteCount: Math.floor(Math.random() * 10),
            tags: postTags,
        })
    );
}

// Create answers
const answers = [];
for (let i = 0; i < NUM_SEED_ANSWERS; i++) {
    answers.push(
        new Answer({
            text: faker.hacker.phrase(),
            parentPost: posts[Math.floor(Math.random() * NUM_SEED_POSTS)]._id,
            voteCount: Math.floor(Math.random() * 10),
        })
    );
}

// Connect to database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log("Connected to MongoDB successfully");
        insertSeeds();
    })
    .catch((err) => {
        console.error(err.stack);
        process.exit(1);
    });

const insertSeeds = () => {
    console.log("Resetting db and seeding users and posts...");

    User.collection
        .drop()
        .then(() => Post.collection.drop())
        .then(() => Tag.collection.drop())
        .then(() => Answer.collection.drop())
        .then(() => User.insertMany(users))
        .then(() => Post.insertMany(posts))
        .then(() => Answer.insertMany(answers))
        .then(() => Tag.insertMany(tags))
        .then(() => {
            console.log("Done!");
            //  mongoose.disconnect();
        })
        .catch((err) => {
            console.error(err.stack);
            process.exit(1);
        });
};
