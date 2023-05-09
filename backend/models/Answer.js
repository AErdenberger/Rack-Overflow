const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postAnswer = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  text: {
    type: String,
    required: true
  },
  tags: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);