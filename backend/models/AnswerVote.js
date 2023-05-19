const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerVoteSchema = new Schema(
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
        answerId:{
            type: Schema.Types.ObjectId,
            ref: "Answer"
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("AnswerVote", answerVoteSchema);
