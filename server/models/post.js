const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: 'Content is required',
    },
    image: {
      url: {
        type: String,
        default: 'https://via.placeholder.com/150?text=POST',
      },
      public_id: {},
    },
    postedBy: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
