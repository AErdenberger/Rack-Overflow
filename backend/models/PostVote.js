const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postVoteSchema = new Schema(
    {
        vote: {
            type: Number,
            default: 0,
            required: true,
        },
        authorId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        postId:{
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    },
    {
        timestamps: true,
    }
);

// const Tag = mongoose.model("Tag", tagSchema);

// Export the model for use in other parts of the application
// module.exports = Tag;
module.exports = mongoose.model("PostVote", postVoteSchema);
