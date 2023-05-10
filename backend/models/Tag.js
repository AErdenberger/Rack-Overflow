const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema(
    {
        tag: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Answer = mongoose.model("Tag", tagSchema);

// Export the model for use in other parts of the application
// module.exports = Tag;
module.exports = mongoose.model("Tag", tagSchema);
