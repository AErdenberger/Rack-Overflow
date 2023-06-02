const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
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
        chatFlag: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postSchema);
