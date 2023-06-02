const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Post = require('../models/Post.js');
const Answer = require('../models/Answer');
const Tag = require("../models/Tag.js")
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;
const NUM_SEED_POSTS = 30;
const NUM_SEED_ANSWERS =10;
const NUM_SEED_TAGS = 3;



const users = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo@user.com',
    hashedPassword: bcrypt.hashSync('password', 10)
  })
)
users.push(
  new User ({
    username: 'ggg',
    email: 'g@g.com',
    hashedPassword: bcrypt.hashSync('gggggg', 10)
  })
)
users.push(
  new User ({
    username: 'ChatBot',
    email: 'chat@bot.com',
    hashedPassword: bcrypt.hashSync('chatbot', 10)
  })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User ({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
    })
  )
}

const MEDICAL_TAGS = [
  "Hemochromatosis", //0
  "Diabetes Type II",
  "Hypertension",
  "Left Knee Injury",
  "B-cell Leukemia",
  "Schizophrenia", //5
  "COPD",
  "Obesity",
  "Arteriosclerosis",
  "Atherosclerosis",
  "Major Depression", //10
  "Heart Disease",
  "Asthma",
  "Arthritis",
  "Glomerulonephritis",
  "Cirrhosis", //15
  "Autistic Spectrum",
  "Lumbar Disc Disorder" //17
]
  

let medicalTagObjects = [];
for (let i = 0; i < MEDICAL_TAGS.length; i++) {
  medicalTagObjects.push(
    new Tag ({
      tag: MEDICAL_TAGS[i],   
    })
  )
}


const posts = [
  new Post ({
    text: "Hello I am brand new to working out and was wondering where is a good place to get started?",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Newbie Here!",
    voteCount: Math.floor(Math.random()*10),
    tags:[],
    chatFlag: false
  }),
  new Post ({
    text: "Hi there, I have Hemochromatosis and was wondering how this will effect the workout regimine I have been working on",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Hemochromatosis in the gym?",
    voteCount: Math.floor(Math.random()*10),
    tags:[medicalTagObjects[0]],
    chatFlag: false
  }),
  new Post ({
    text: "Recently I got an injury in my left knee and I was wondering what upper body workouts I could do that wouldn't be too much of a strain on my asthma either",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Recent Injury",
    voteCount: Math.floor(Math.random()*10),
    tags:[medicalTagObjects[3], medicalTagObjects[12]],
    chatFlag: false
  }),
  new Post ({
    text: "I want to turn my life around, I have been overweight my whole life and I hate the way I look in the mirror. I want to go to the gym and lose weight, where should I start, especially for someone my sized?",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Time to Change my Life!",
    voteCount: Math.floor(Math.random()*10),
    tags:[medicalTagObjects[7]],
    chatFlag: false
  }),
  new Post ({
    text: "I struggle with staying motivated at the gym, a lot of my mental illnesses hold me back. Are there any ways I can motivate myself to keep going even if my brain tricks me into thinking I'm not making any progress?",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Depression and Staying Motivated",
    voteCount: Math.floor(Math.random()*10),
    tags:[medicalTagObjects[10], medicalTagObjects[16]],
    chatFlag: false
  }),
  new Post ({
    text: "I have Arteriosclerosis. Are there specific exercises or training methods that can improve my cardiovascular health?",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Workouts to help Cardiovascular Health?",
    voteCount: Math.floor(Math.random()*10),
    tags:[medicalTagObjects[8]],
    chatFlag: false
  }),
  new Post ({
    text: "I have B-cell Leukemia, but I want to stay physically active. Any advice on exercises that can be beneficial for my condition?",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Can Working Out Help Me with This?",
    voteCount: Math.floor(Math.random()*10),
    tags:[medicalTagObjects[4]],
    chatFlag: false
  }),
  new Post ({
    text: "I have Arthritis and want to stay active. What are some low-impact exercises or modifications I can incorporate into my routine?",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Staying Active Despite My Joints",
    voteCount: Math.floor(Math.random()*10),
    tags:[medicalTagObjects[13]],
    chatFlag: false
  }),
  new Post ({
    text: "Can I engage in intense workouts if I have Hypertension? How can I exercise safely with this condition?",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Exercising Safely",
    voteCount: Math.floor(Math.random()*10),
    tags:[medicalTagObjects[2]],
    chatFlag: false
  }),
  new Post ({
    text: "I want to build muscle and strength. Should I focus on heavy weights and low reps or lighter weights and high reps?",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Heavy or Light?",
    voteCount: Math.floor(Math.random()*10),
    tags:[],
    chatFlag: false
  }),
  new Post ({
    text: "Can individuals with Atherosclerosis still participate in athletic events? How can I train effectively while considering this condition?",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Can I Still Participate?",
    voteCount: Math.floor(Math.random()*10),
    tags:[medicalTagObjects[9]],
    chatFlag: false
  }),
  new Post ({
    text: "I have COPD, but I want to incorporate exercise into my routine. What are some suitable exercises or precautions I should consider?",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "What Can I Still Do?",
    voteCount: Math.floor(Math.random()*10),
    tags:[medicalTagObjects[6]],
    chatFlag: false
  }),
  new Post ({
    text: "I am training for a marathon, how quickly should I ramp up the distance I practice as I get closer to the event?",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Marathon Training?",
    voteCount: Math.floor(Math.random()*10),
    tags:[],
    chatFlag: false
  }),
  new Post ({
    text: "My son is on the autism spectrum, he has shown some interest in wanting to exercise. Are there any helpful tools or resources out there to help him with exercising?",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Help With My Son's Disability",
    voteCount: Math.floor(Math.random()*10),
    tags:[medicalTagObjects[16]],
    chatFlag: false
  }),
  new Post ({
    text: "Concerned about proper nutrition for my workouts. What are some pre- and post-workout meal ideas to optimize performance?",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Nutrition and Exercise",
    voteCount: Math.floor(Math.random()*10),
    tags:[medicalTagObjects[7]],
    chatFlag: false
  }),
  new Post ({
    text: "Interested in incorporating yoga into my fitness routine. What are the physical and mental benefits of practicing yoga, and how hard will it be if I have just recovered from an injury?",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Incorporating Yoga",
    voteCount: Math.floor(Math.random()*10),
    tags:[medicalTagObjects[3]],
    chatFlag: false
  }),
  new Post ({
    text: "My psychologist has recommended that I exercise more. Is it safe for individuals with Schizophrenia to participate in certain sports or physical activities? Any recommendations for exercise routines?",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Exercising With Mental Disabilities",
    voteCount: Math.floor(Math.random()*10),
    tags:[medicalTagObjects[5]],
    chatFlag: false
  }),
  new Post ({
    text: "My college has a lot of recreational sports I was wondering if folks have recommendations for someone who isn't super active",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Recreational Sports Participation",
    voteCount: Math.floor(Math.random()*10),
    tags:[],
    chatFlag: false
  }),
  new Post ({
    text: "My college has a lot of recreational sports I was wondering if folks have recommendations for someone who isn't super active",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    title: "Recreational Sports Participation",
    voteCount: Math.floor(Math.random()*10),
    tags:[],
    chatFlag: false
  })
];

// for (let i = 0; i < NUM_SEED_POSTS; i++) {
//   const tags = [];

//   for (let i = 0; i < NUM_SEED_TAGS; i++) {
//     tags.push(
//       medicalTagObjects[Math.floor(Math.random() * medicalTagObjects.length)]    );
// }

 
  // posts.push(
  //   new Post ({
  //     text: faker.hacker.phrase(),
  //     author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
  //     title: faker.hacker.phrase(10),
  //     voteCount: Math.floor(Math.random()*10),
  //     tags:tags
      

  //   })
  // )
// }





const answers = [];
  answers.push(
    new Answer ({
      text: "That's interesting, have you tried...?",
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      parentPost: posts[Math.floor(Math.random() * posts.length)]._id,
      voteCount: Math.floor(Math.random()*10)
    }),
    new Answer ({
      text: "I have something similar, I usually do this...",
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      parentPost: posts[Math.floor(Math.random() * posts.length)]._id,
      voteCount: Math.floor(Math.random()*10)
    }),
    new Answer ({
      text: "I am in the same boat, I would be interested to see what others say!",
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      parentPost: posts[Math.floor(Math.random() * posts.length)]._id,
      voteCount: Math.floor(Math.random()*10)
    }),
    new Answer ({
      text: "I spoke to a professional recently about this, and they had this to say...",
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      parentPost: posts[Math.floor(Math.random() * posts.length)]._id,
      voteCount: Math.floor(Math.random()*10)
    }),
    new Answer ({
      text: "Just found this post! I actually know a lot about this, let me help out!",
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      parentPost: posts[Math.floor(Math.random() * posts.length)]._id,
      voteCount: Math.floor(Math.random()*10)
    }),
    new Answer ({
      text: "I don't exactly have that problem but I have something similar, have you tried...?",
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      parentPost: posts[Math.floor(Math.random() * posts.length)]._id,
      voteCount: Math.floor(Math.random()*10)
    }),
    new Answer ({
      text: "I have been experimenting with a couple things that I researched on the internet, how do you feel about trying...",
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      parentPost: posts[Math.floor(Math.random() * posts.length)]._id,
      voteCount: Math.floor(Math.random()*10)
    }),
    new Answer ({
      text: "I was at the gym the other day and a buddy of mine recommended this...",
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      parentPost: posts[Math.floor(Math.random() * posts.length)]._id,
      voteCount: Math.floor(Math.random()*10)
    }),
    new Answer ({
      text: "I was speaking to a personal trainer and they had this to say...",
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      parentPost: posts[Math.floor(Math.random() * posts.length)]._id,
      voteCount: Math.floor(Math.random()*10)
    }),
    new Answer ({
      text: "You should downvote me because I'm a hater!",
      author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
      parentPost: posts[Math.floor(Math.random() * posts.length)]._id,
      voteCount: Math.floor(Math.random()*10)
    })
  )






mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

  const insertSeeds = () => {
    console.log("Resetting db and seeding users and posts...");

    User.collection
        .drop()
        .then(() => Tag.collection.drop())
        .then(() => Post.collection.drop())
        .then(() => Answer.collection.drop())
        .then(() => User.insertMany(users))
        .then(() => Tag.insertMany(medicalTagObjects))
        .then(() => Post.insertMany(posts))
        .then(() => Answer.insertMany(answers))    
        .then(() => {
            console.log("Done!");
             mongoose.disconnect();
        })
        .catch((err) => {
            console.error(err.stack);
            process.exit(1);
        });
};
