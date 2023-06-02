const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        parentPost: {
            type: Schema.Types.ObjectId,
            ref: "Post",
        },
        text: {
            type: String,
            required: true,
        },
        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],

        voteCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
