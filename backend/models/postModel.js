const { Schema, default: mongoose } = require("mongoose");

const postSchema = new Schema({
  userName: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  likes: [
    {
      user: {
        type: String,
        required: true,
      },
    },
  ],
  comments: [
    {
      user: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
    },
  ],
});

const PostModel = mongoose.model("posts", postSchema);

module.exports = PostModel;
