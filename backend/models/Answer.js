const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answerSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        parentPost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
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

// Export the model for use in other parts of the application
module.exports = Answer;
// module.exports = mongoose.model("Answer", answerSchema);
