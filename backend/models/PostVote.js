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


module.exports = mongoose.model("PostVote", postVoteSchema);
